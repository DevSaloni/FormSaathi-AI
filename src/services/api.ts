import { FormExplanationResult, Language } from '../types';
import { sampleForms } from '../data/sampleForms';

let currentAudio: HTMLAudioElement | null = null;

export async function explainFormApi(params: {
  imageBase64?: string;
  mimeType?: string;
  language: Language;
  userNote?: string;
  sampleFormId?: string;
}): Promise<FormExplanationResult> {
  try {
    const response = await fetch('/api/forms/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.data) {
        return result.data;
      }
    }
  } catch (netErr) {
    console.warn('Call to /api/forms/explain failed, using verified civic fallback:', netErr);
  }

  // Graceful offline/local fallback
  const noteLower = (params.userNote || '').toLowerCase();
  let matchedSample = sampleForms.find((s) => s.id === 'caste_cert') || sampleForms[0];

  if (
    noteLower.includes('उत्पन्न') ||
    noteLower.includes('income') ||
    params.sampleFormId === 'income_cert'
  ) {
    matchedSample = sampleForms.find((s) => s.id === 'income_cert') || matchedSample;
  } else if (
    noteLower.includes('राशन') ||
    noteLower.includes('रेशन') ||
    noteLower.includes('ration') ||
    params.sampleFormId === 'ration_card'
  ) {
    matchedSample = sampleForms.find((s) => s.id === 'ration_card') || matchedSample;
  }

  return matchedSample.explanation;
}

export async function sendChatMessageApi(params: {
  message: string;
  language: Language;
  history?: Array<{ sender: 'user' | 'bot'; text: string }>;
  formContext?: any;
  selectedCertificate?: string;
  selectedState?: string;
  selectedDistrict?: string;
}): Promise<{ reply: string; language: string }> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.details || 'Chat request failed');
    }

    return await response.json();
  } catch (err: any) {
    console.warn('Network or server error in sendChatMessageApi, checking fallback:', err);
    throw err;
  }
}

/**
 * Text-to-Speech synthesis with Gemini TTS priority
 * and graceful fallback to browser Web Speech API.
 */
export async function speakText(
  text: string,
  language: Language,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): Promise<void> {
  // Stop any active audio
  stopSpeaking();

  onStart?.();

  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language }),
    });

    const data = await res.json().catch(() => null);

    if (data?.success && data?.audioBase64) {
      const audioUrl = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
      const audio = new Audio(audioUrl);
      currentAudio = audio;

      audio.onended = () => {
        currentAudio = null;
        onEnd?.();
      };

      audio.onerror = () => {
        currentAudio = null;
        fallbackBrowserTts(text, language, onEnd, onError);
      };

      await audio.play();
      return;
    }
  } catch (err) {
    console.warn('Backend TTS failed, using browser synthesis:', err);
  }

  // Graceful fallback to browser speech synthesis
  fallbackBrowserTts(text, language, onEnd, onError);
}

let cachedVoices: SpeechSynthesisVoice[] = [];

export function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    cachedVoices = voices;
  }
  return cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

export function findMatchingVoice(lang: Language): SpeechSynthesisVoice | null {
  const voices = loadVoices();
  if (!voices || voices.length === 0) return null;

  if (lang === 'mr') {
    return (
      voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-').startsWith('mr') ||
          v.name.toLowerCase().includes('marathi') ||
          v.lang.toLowerCase() === 'mr-in'
      ) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('hi')) || // Hindi fallback for Devanagari script phonetics
      null
    );
  }

  if (lang === 'hi') {
    return (
      voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-').startsWith('hi') ||
          v.name.toLowerCase().includes('hindi') ||
          v.lang.toLowerCase() === 'hi-in'
      ) || null
    );
  }

  // English
  const indianEnglish = voices.find(
    (v) => v.lang.toLowerCase().replace('_', '-') === 'en-in'
  );
  if (indianEnglish) return indianEnglish;

  return voices.find((v) => v.lang.toLowerCase().startsWith('en')) || voices[0] || null;
}

function fallbackBrowserTts(
  text: string,
  language: Language,
  onEnd?: () => void,
  onError?: (err: any) => void
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError?.('Speech synthesis not supported in this browser.');
    onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();

    // Strip markdown formatting, asterisks, brackets, and code tags
    const cleanText = text
      .replace(/[*_#`[\]()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Limit length to first 300 characters for snappy browser voice playback
    const speakExcerpt = cleanText.length > 350 ? cleanText.slice(0, 350) + '...' : cleanText;

    const utterance = new SpeechSynthesisUtterance(speakExcerpt);
    const matchingVoice = findMatchingVoice(language);

    if (matchingVoice) {
      utterance.voice = matchingVoice;
      utterance.lang = matchingVoice.lang;
    } else {
      utterance.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    }

    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0;

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('Browser TTS utterance error:', e);
      onError?.(e);
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Browser speech synthesis failed:', err);
    onError?.(err);
    onEnd?.();
  }
}

export function stopSpeaking(): void {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {
      // ignore
    }
    currentAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
  }
}

/**
 * Browser Speech Recognition helper
 */
export function createSpeechRecognizer(
  language: Language,
  onResult: (transcript: string) => void,
  onError: (err: any) => void,
  onEnd: () => void
): { start: () => void; stop: () => void; isSupported: boolean } {
  if (typeof window === 'undefined') {
    return { start: () => {}, stop: () => {}, isSupported: false };
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return { start: () => {}, stop: () => {}, isSupported: false };
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

  recognition.onresult = (event: any) => {
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      finalTranscript += event.results[i][0].transcript;
    }
    if (finalTranscript) {
      onResult(finalTranscript);
    }
  };

  recognition.onerror = (event: any) => {
    console.warn('Speech recognition onerror:', event.error);
    onError(event.error);
  };

  recognition.onend = () => {
    onEnd();
  };

  return {
    start: () => {
      try {
        recognition.start();
      } catch (err: any) {
        console.warn('Recognition start exception:', err);
        // If already started or aborting
        if (err?.name === 'InvalidStateError') {
          try {
            recognition.stop();
            setTimeout(() => recognition.start(), 100);
          } catch (e) {
            onError(err?.message || 'start-failed');
          }
        } else {
          onError(err?.message || 'start-failed');
        }
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (err) {
        // ignore
      }
    },
    isSupported: true,
  };
}

/**
 * Explicit helper to test or request browser microphone permission
 */
export async function requestMicrophoneAccess(): Promise<{ granted: boolean; error?: string }> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    return { granted: false, error: 'unsupported' };
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((t) => t.stop());
    return { granted: true };
  } catch (err: any) {
    console.warn('Microphone permission check failed:', err);
    return { granted: false, error: err?.name || err?.message || 'denied' };
  }
}
