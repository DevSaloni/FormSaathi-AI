import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Trash2,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Plus,
  MessageSquare,
  Globe,
  X,
  Clock,
  History
} from 'lucide-react';
import { ChatMessage, FormExplanationResult, Language } from '../types';
import { translations } from '../data/translations';
import { useApp } from '../context/AppContext';
import {
  sendChatMessageApi,
  speakText,
  stopSpeaking,
  createSpeechRecognizer,
  requestMicrophoneAccess
} from '../services/api';

import { CertificateIndicatorBanner } from './CertificateIndicatorBanner';
import { supportedCertificates } from '../data/certificateData';
import { ChatMessageRenderer } from './ChatMessageRenderer';
import { getClientCivicFallback } from '../data/fallbackKnowledge';

interface VoiceAssistantViewProps {
  initialQuestion?: string;
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
  formContext?: FormExplanationResult | null;
}

export const VoiceAssistantView: React.FC<VoiceAssistantViewProps> = ({
  initialQuestion,
}) => {
  const {
    selectedLanguage,
    setSelectedLanguage,
    selectedCertificate,
    selectedState,
    selectedDistrict,
    conversations,
    activeConversationId,
    activeConversation,
    createNewConversation,
    switchConversation,
    deleteConversation,
    clearActiveConversation,
    addMessageToActiveConversation,
    formExplainerState,
  } = useApp();

  const t = translations[selectedLanguage];
  const certData = supportedCertificates[selectedCertificate] || supportedCertificates.income_cert;

  const [inputText, setInputText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [recognizedInterimText, setRecognizedInterimText] = useState<string>('');
  const [micError, setMicError] = useState<string | null>(null);
  const [showMicHelp, setShowMicHelp] = useState<boolean>(false);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const [showSessionDrawer, setShowSessionDrawer] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const recognizerRef = useRef<any>(null);

  // Starter questions mapped dynamically to the active certificate & language
  const starterQuestions = certData.suggestedQuestions[selectedLanguage] || [
    'या दाखल्यासाठी कोणती कागदपत्रे लागतात?',
    'मला अर्ज कुठे आणि कसा करावा लागेल?',
    'या प्रक्रियेला किती वेळ व शासकीय शुल्क लागते?',
  ];

  // Handle initial question passed from external triggers (e.g. Explainer)
  useEffect(() => {
    if (initialQuestion && initialQuestion.trim().length > 0) {
      handleSendMessage(initialQuestion);
    }
  }, [initialQuestion]);

  // Auto-scroll when messages or interim speech updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation.messages, isAiThinking, recognizedInterimText]);

  // Explicit mic permission request
  const handleRequestMicPermission = async () => {
    const res = await requestMicrophoneAccess();
    if (res.granted) {
      setMicError(null);
      setShowMicHelp(false);
      toggleRecording();
    } else {
      setShowMicHelp(true);
      setMicError(
        selectedLanguage === 'mr'
          ? 'मायक्रोफोन परवानगी नाकारली गेली. कृपया ब्राउझरमध्ये परवानगी द्या किंवा खाली टाईप करा.'
          : selectedLanguage === 'hi'
          ? 'माइक्रोफोन अनुमति अस्वीकृत हुई। कृपया माइक की अनुमति दें या नीचे अपना प्रश्न लिखें।'
          : 'Microphone permission was denied. Please allow microphone access or type your question below.'
      );
    }
  };

  // Toggle Recording
  const toggleRecording = () => {
    setMicError(null);
    setVoiceNotice(null);

    if (isRecording) {
      recognizerRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const recognizer = createSpeechRecognizer(
      selectedLanguage,
      (transcript) => {
        setRecognizedInterimText(transcript);
        setInputText(transcript);
      },
      (err) => {
        console.warn('Mic error:', err);
        setIsRecording(false);
        if (err === 'not-allowed' || err === 'permission-denied') {
          const micNotice = {
            mr: 'मायक्रोफोन परवानगी नाकारली गेली. कृपया ब्राउझर सेटिंग्जमध्ये मायक्रोफोन सुरू करा किंवा खाली टाईप करा.',
            hi: 'माइक्रोफोन अनुमति अस्वीकृत हुई। कृपया माइक की अनुमति दें या नीचे अपना प्रश्न लिखें।',
            en: 'Microphone permission was denied. Please allow microphone access or type your question below.',
          }[selectedLanguage];
          setMicError(micNotice);
          setShowMicHelp(true);
          setTimeout(() => textInputRef.current?.focus(), 150);
        } else {
          setMicError(
            selectedLanguage === 'mr'
              ? 'आवाज ओळखण्यात अडचण आली. कृपया खाली टाइप करा.'
              : selectedLanguage === 'hi'
              ? 'आवाज पहचानने में समस्या आई। कृपया नीचे टाइप करें।'
              : `Voice input notice (${err}). Please type your question below.`
          );
          setTimeout(() => textInputRef.current?.focus(), 150);
        }
      },
      () => {
        setIsRecording(false);
        setRecognizedInterimText('');
      }
    );

    if (!recognizer.isSupported) {
      setSpeechSupported(false);
      setMicError(
        selectedLanguage === 'mr'
          ? 'या ब्राउझरमध्ये व्हॉइस इनपुट उपलब्ध नाही. कृपया खाली टाइप करा.'
          : selectedLanguage === 'hi'
          ? 'इस ब्राउज़र में वॉयस इनपुट समर्थित नहीं है। कृपया नीचे टाइप करें।'
          : 'Speech recognition is not supported in this browser. Please type your query below.'
      );
      setTimeout(() => textInputRef.current?.focus(), 100);
      return;
    }

    recognizerRef.current = recognizer;
    setIsRecording(true);
    recognizer.start();
  };

  // Sending a message
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText.trim();
    if (!textToSend) return;

    if (isRecording) {
      recognizerRef.current?.stop();
      setIsRecording(false);
    }
    stopSpeaking();
    setCurrentlySpeakingId(null);
    setMicError(null);
    setVoiceNotice(null);

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: Date.now(),
      language: selectedLanguage,
    };

    // Store user message immediately in central persistent store
    addMessageToActiveConversation(userMsg);
    setInputText('');
    setRecognizedInterimText('');
    setIsAiThinking(true);

    try {
      const response = await sendChatMessageApi({
        message: textToSend,
        language: selectedLanguage,
        history: activeConversation.messages,
        formContext: formExplainerState.result || null,
        selectedCertificate,
        selectedState,
        selectedDistrict,
      });

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: response.reply,
        timestamp: Date.now(),
        language: selectedLanguage,
      };

      addMessageToActiveConversation(botMsg);
      handleSpeakMessage(botMsg);
    } catch (err: any) {
      console.warn('Chat request failed, providing high quality local answer:', err);

      // Deterministic encyclopedic fallback response in requested language
      const fallbackText = getClientCivicFallback(textToSend, selectedLanguage);

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: fallbackText,
        timestamp: Date.now(),
        language: selectedLanguage,
      };

      addMessageToActiveConversation(botMsg);
      handleSpeakMessage(botMsg);
    } finally {
      setIsAiThinking(false);
    }
  };

  // Play audio response with strict voice matching
  const handleSpeakMessage = (msg: ChatMessage) => {
    if (currentlySpeakingId === msg.id) {
      stopSpeaking();
      setCurrentlySpeakingId(null);
      return;
    }

    const speakLang = msg.language || selectedLanguage;

    speakText(
      msg.text,
      speakLang,
      () => {
        setCurrentlySpeakingId(msg.id);
        setVoiceNotice(null);
      },
      () => setCurrentlySpeakingId(null),
      (voiceErr) => {
        setCurrentlySpeakingId(null);
        if (typeof voiceErr === 'string' && voiceErr.includes('ऑडिओ व्हॉईस')) {
          setVoiceNotice(voiceErr);
        }
      }
    );
  };

  // Multiple Conversations UI helper
  const handleNewSession = () => {
    stopSpeaking();
    setCurrentlySpeakingId(null);
    createNewConversation(selectedLanguage);
  };

  const handleConfirmClearChat = () => {
    stopSpeaking();
    setCurrentlySpeakingId(null);
    clearActiveConversation();
    setShowClearConfirm(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Shared Certificate Workspace Indicator */}
      <CertificateIndicatorBanner />

      {/* Top Header: Sessions Bar & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2EAE3]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20">
              Voice-First Civic Guide
            </span>
            <span className="text-xs font-bold text-[#105C38] bg-white px-2.5 py-0.5 rounded-full border border-[#E2EAE3]">
              {selectedLanguage === 'mr' ? 'मराठी (mr-IN)' : selectedLanguage === 'hi' ? 'हिंदी (hi-IN)' : 'English (en-IN)'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C]">
            {t.voice.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#68756C]">
            {t.voice.subtitle}
          </p>
        </div>

        {/* Sessions Switcher & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleNewSession}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#16834A] hover:bg-[#105C38] rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
            title="Start New Conversation"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{selectedLanguage === 'mr' ? 'नवीन संभाषण' : selectedLanguage === 'hi' ? 'नई बातचीत' : 'New Chat'}</span>
          </button>

          {conversations.length > 1 && (
            <button
              onClick={() => setShowSessionDrawer(!showSessionDrawer)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#17231C] bg-white hover:bg-[#F0F8F2] border border-[#CBD5E1] rounded-xl cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-[#16834A]" />
              <span>{conversations.length} {selectedLanguage === 'mr' ? 'सत्रे' : selectedLanguage === 'hi' ? 'सत्र' : 'Chats'}</span>
            </button>
          )}

          <button
            onClick={() => setShowClearConfirm(true)}
            className="p-2 text-xs font-semibold text-[#68756C] hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border border-[#E2EAE3]"
            title="Clear this conversation"
            aria-label="Clear this conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Multi-Conversation Drawer / Switcher */}
      {showSessionDrawer && conversations.length > 1 && (
        <div className="p-4 bg-white border border-[#E2EAE3] rounded-2xl shadow-xs space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-[#17231C]">
            <span className="flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-[#16834A]" />
              Your Saved Conversations ({conversations.length})
            </span>
            <button
              onClick={() => setShowSessionDrawer(false)}
              className="text-[#68756C] hover:text-[#17231C]"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {conversations.map((c) => {
              const isActive = c.id === activeConversationId;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    switchConversation(c.id);
                    setShowSessionDrawer(false);
                  }}
                  className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-[#F0F8F2] border-[#16834A] text-[#105C38] font-bold shadow-2xs'
                      : 'bg-white border-[#E2EAE3] text-[#17231C] hover:bg-[#FAFCFA]'
                  }`}
                >
                  <div className="truncate mr-2">
                    <span className="truncate block">{c.title}</span>
                    <span className="text-[10px] text-[#68756C] font-normal">
                      {c.language.toUpperCase()} • {c.messages.length} messages
                    </span>
                  </div>
                  {conversations.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(c.id);
                      }}
                      className="p-1 text-[#68756C] hover:text-rose-600 rounded-md"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Clear Chat Confirmation Modal */}
      {showClearConfirm && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2 text-xs text-rose-900 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              {selectedLanguage === 'mr'
                ? 'हे संभाषण साफ करायचे आहे का? मागील उत्तरे निघून जातील.'
                : selectedLanguage === 'hi'
                ? 'क्या आप इस बातचीत को साफ करना चाहते हैं? पिछले संदेश हट जाएंगे।'
                : 'Are you sure you want to clear this conversation?'}
            </span>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-[#CBD5E1] text-[#17231C] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmClearChat}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
            >
              Clear Now
            </button>
          </div>
        </div>
      )}

      {/* Voice Warning Notice if browser voice is missing */}
      {voiceNotice && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-2 animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{voiceNotice}</span>
          </div>
          <button
            onClick={() => setVoiceNotice(null)}
            className="text-amber-800 font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Active Form Context Banner if loaded */}
      {formExplainerState.result && (
        <div className="p-3.5 rounded-2xl bg-[#F0F8F2] border border-[#16834A]/30 flex items-center justify-between text-xs text-[#105C38]">
          <div className="flex items-center gap-2 truncate">
            <Sparkles className="w-4 h-4 text-[#16834A] shrink-0" />
            <span className="font-bold">Active Form Context:</span>
            <span className="truncate">{formExplainerState.result.formTitle}</span>
          </div>
          <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-[#16834A]/20">
            {formExplainerState.result.fields.length} Fields Loaded
          </span>
        </div>
      )}

      {/* Main Conversation Container */}
      <div className="bg-white rounded-3xl border border-[#E2EAE3] shadow-xs flex flex-col h-[560px] sm:h-[620px] overflow-hidden">
        {/* Chat Container Pro Header */}
        <div className="bg-[#FAFCFA] border-b border-[#E2EAE3] px-4 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-[#105C38] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#16834A]" />
              {selectedLanguage === 'mr'
                ? 'फॉर्मसाथी अधिकृत व्हॉइस व चॅट मार्गदर्शक'
                : selectedLanguage === 'hi'
                ? 'फॉर्मसाथी आधिकारिक वॉयस व चैट गाइड'
                : 'FormSaathi Verified Civic Assistant'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#68756C]">
            <span className="hidden sm:inline bg-white px-2 py-0.5 rounded border border-[#E2EAE3]">
              RTS 2026 Rules Verified
            </span>
            <span className="bg-[#F0F8F2] text-[#16834A] font-medium px-2 py-0.5 rounded border border-[#16834A]/20">
              ⚡ 24x7 Active
            </span>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Welcoming Empty State Hero if no messages */}
          {activeConversation.messages.length === 0 && (
            <div className="my-auto py-6 px-4 text-center max-w-lg mx-auto space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#105C38] via-[#16834A] to-[#22C55E] text-white flex items-center justify-center mx-auto shadow-md">
                <Sparkles className="w-8 h-8 text-emerald-100" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-[#17231C]">
                  {selectedLanguage === 'mr'
                    ? 'नमस्कार! मी फॉर्मसाथी AI आहे'
                    : selectedLanguage === 'hi'
                    ? 'नमस्ते! मैं फॉर्मसाथी AI हूँ'
                    : 'Hello! I am FormSaathi AI'}
                </h3>
                <p className="text-xs sm:text-sm text-[#68756C] leading-relaxed">
                  {selectedLanguage === 'mr'
                    ? 'सरकारी दाखले, कागदपत्रे, लाडकी बहीण योजना, ७/१२ उतारा आणि रेशन कार्डबद्दल कोणताही प्रश्न विचारा — बोलून किंवा टाईप करून.'
                    : selectedLanguage === 'hi'
                    ? 'सरकारी प्रमाण पत्र, दस्तावेज, लाडकी बहिन योजना, ७/१२ खतौनी और राशन कार्ड के बारे में कोई भी प्रश्न पूछें — बोलकर या लिखकर।'
                    : 'Ask any question about government certificates, supporting documents, welfare schemes, 7/12 land records, or ration card.'}
                </p>
              </div>

              {/* Starter Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left pt-2">
                {[
                  {
                    icon: '📜',
                    q:
                      selectedLanguage === 'mr'
                        ? 'उत्पन्नाचा दाखला काढण्यासाठी कोणती कागदपत्रे लागतात?'
                        : selectedLanguage === 'hi'
                        ? 'आय प्रमाण पत्र के लिए कौन-से दस्तावेज चाहिए?'
                        : 'What documents are needed for an Income Certificate?',
                  },
                  {
                    icon: '🌸',
                    q:
                      selectedLanguage === 'mr'
                        ? 'माझी लाडकी बहीण योजनेसाठी कोणती कागदपत्रे लागतात?'
                        : selectedLanguage === 'hi'
                        ? 'माझी लाडकी बहिन योजना के नियम व दस्तावेज क्या हैं?'
                        : 'What are the rules and documents for Ladki Bahin Yojana?',
                  },
                  {
                    icon: '🌾',
                    q:
                      selectedLanguage === 'mr'
                        ? 'डिजिटल स्वाक्षरीत ७/१२ उतारा ऑनलाइन कसा काढायचा?'
                        : selectedLanguage === 'hi'
                        ? 'डिजिटल ७/१२ खतौनी ऑनलाइन कैसे निकालें?'
                        : 'How to download digitally signed 7/12 land extract?',
                  },
                  {
                    icon: '🪪',
                    q:
                      selectedLanguage === 'mr'
                        ? 'रेशन कार्डमध्ये नवीन नाव समाविष्ट कसे करावे?'
                        : selectedLanguage === 'hi'
                        ? 'राशन कार्ड में नए सदस्य का नाम कैसे जोड़ें?'
                        : 'How to add a new family member to Ration Card?',
                  },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.q)}
                    className="p-3 rounded-xl bg-[#FAFCFA] hover:bg-[#F0F8F2] border border-[#E2EAE3] hover:border-[#16834A]/40 text-xs text-[#17231C] font-medium transition-all cursor-pointer flex items-start gap-2 text-left shadow-2xs group"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="flex-1 line-clamp-2">{item.q}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formatted Messages */}
          {activeConversation.messages.map((msg) => (
            <ChatMessageRenderer
              key={msg.id}
              message={msg}
              isSpeaking={currentlySpeakingId === msg.id}
              onToggleSpeech={() => handleSpeakMessage(msg)}
              onSelectFollowUp={(q) => handleSendMessage(q)}
              currentLanguage={selectedLanguage}
            />
          ))}

          {/* AI Thinking Animation - Pro Design */}
          {isAiThinking && (
            <div className="flex gap-3 justify-start items-start animate-fade-in">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#105C38] via-[#16834A] to-[#22C55E] text-white flex items-center justify-center shrink-0 shadow-xs border border-white/20 mt-1">
                <Sparkles className="w-5 h-5 text-emerald-100 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div className="bg-white border border-[#E2EAE3] rounded-2xl rounded-tl-xs px-4 py-3.5 shadow-2xs space-y-2 max-w-[85%]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#105C38]">
                  <span className="w-2 h-2 rounded-full bg-[#16834A] animate-ping" />
                  <span>
                    {selectedLanguage === 'mr'
                      ? 'फॉर्मसाथी अधिकृत नियम व कागदपत्रे पडताळत आहे...'
                      : selectedLanguage === 'hi'
                      ? 'फॉर्मसाथी आधिकारिक नियम एवं दस्तावेज जांच रहा है...'
                      : 'FormSaathi is verifying official rules and documents...'}
                  </span>
                </div>
                {/* Skeleton shimmer bars */}
                <div className="space-y-1.5 w-48 sm:w-64 pt-1">
                  <div className="h-2 bg-[#F0F8F2] rounded-full animate-pulse w-full" />
                  <div className="h-2 bg-[#F0F8F2] rounded-full animate-pulse w-3/4" />
                </div>
              </div>
            </div>
          )}

          {/* Live recognized speech indicator */}
          {isRecording && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#F0F8F2] to-[#E2F0E5] border border-[#16834A]/40 text-xs text-[#105C38] flex items-center justify-between animate-pulse shadow-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
                <span className="font-bold">{t.voice.micListening}</span>
                {recognizedInterimText && (
                  <span className="italic truncate max-w-[200px] sm:max-w-md font-medium text-[#17231C]">
                    &quot;{recognizedInterimText}&quot;
                  </span>
                )}
              </div>
              <button
                onClick={toggleRecording}
                className="text-xs font-bold text-rose-700 bg-white px-2.5 py-1 rounded-lg border border-rose-200 hover:bg-rose-50 cursor-pointer"
              >
                {t.voice.micStop}
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with Direct Language Selector & Large Mic Button */}
        <div className="p-3.5 sm:p-4 bg-[#FAFCFA] border-t border-[#E2EAE3] space-y-3">
          {/* Permission Alert & Helper */}
          {micError && (
            <div className="text-xs text-amber-950 bg-amber-50 p-3.5 rounded-2xl border border-amber-200 space-y-2 animate-fade-in">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="font-bold block">{micError}</span>
                </div>
                <button
                  onClick={() => {
                    setMicError(null);
                    setShowMicHelp(false);
                  }}
                  className="text-amber-800 hover:text-amber-950 font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 pl-6">
                <button
                  onClick={handleRequestMicPermission}
                  className="px-3.5 py-1.5 rounded-xl font-bold bg-[#16834A] text-white hover:bg-[#105C38] transition-colors cursor-pointer text-xs shadow-2xs"
                >
                  {selectedLanguage === 'mr'
                    ? '🎙️ माईक परवानगी द्या (Allow Mic)'
                    : selectedLanguage === 'hi'
                    ? '🎙️ माइक अनुमति दें (Allow Mic)'
                    : '🎙️ Allow Microphone Access'}
                </button>

                <button
                  onClick={() => setShowMicHelp(!showMicHelp)}
                  className="px-3.5 py-1.5 rounded-xl font-semibold bg-white border border-amber-300 text-amber-900 hover:bg-amber-100/50 transition-colors cursor-pointer text-xs"
                >
                  {showMicHelp ? 'Hide Guide' : 'How to unblock in browser?'}
                </button>
              </div>

              {showMicHelp && (
                <div className="mt-2 p-3 bg-white/90 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1 pl-4 ml-6 leading-relaxed">
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Click the Lock (🔒) icon in the browser address bar.</li>
                    <li>Toggle Microphone to &apos;Allow&apos;.</li>
                    <li>Tap the green button above or type your question below.</li>
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* Language Switcher Bar directly attached to input */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#68756C]">
              <Globe className="w-3.5 h-3.5 text-[#16834A]" />
              <span>Speaking & Response Language:</span>
            </div>

            <div className="flex items-center gap-1 bg-white border border-[#CBD5E1] rounded-xl p-0.5">
              {[
                { code: 'mr' as Language, label: 'मराठी' },
                { code: 'hi' as Language, label: 'हिंदी' },
                { code: 'en' as Language, label: 'EN' },
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => setSelectedLanguage(item.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedLanguage === item.code
                      ? 'bg-[#16834A] text-white shadow-2xs'
                      : 'text-[#68756C] hover:text-[#17231C]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Row: Big Mic + Text Input */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleRecording}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-sm shrink-0 active:scale-95 ${
                isRecording
                  ? 'bg-rose-600 text-white ring-4 ring-rose-200 animate-pulse'
                  : 'bg-[#16834A] text-white hover:bg-[#105C38]'
              }`}
              title={isRecording ? t.voice.micStop : t.voice.micStart}
              aria-label={isRecording ? t.voice.micStop : t.voice.micStart}
            >
              {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            <div className="flex-1 relative">
              <input
                ref={textInputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.voice.inputPlaceholder}
                className="w-full text-sm bg-white border border-[#CBD5E1] rounded-2xl px-4 py-3 text-[#17231C] placeholder-[#94A3B8] focus:border-[#16834A] focus:outline-hidden pr-12 shadow-2xs"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isAiThinking}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl text-[#16834A] hover:bg-[#F0F8F2] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                title={t.voice.send}
                aria-label={t.voice.send}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Questions Section with Comprehensive Civic Topics */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-[#68756C] uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#16834A]" />
            <span>{t.voice.suggestedQuestionsTitle}</span>
          </h4>
          <span className="text-[11px] text-[#16834A] font-semibold bg-[#F0F8F2] px-2 py-0.5 rounded-full border border-[#16834A]/20">
            {selectedLanguage === 'mr' ? 'क्लिक करून विचारा' : selectedLanguage === 'hi' ? 'क्लिक करके पूछें' : 'Tap to Ask'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {starterQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(sq)}
              className="text-left p-3 rounded-2xl bg-white border border-[#E2EAE3] hover:border-[#16834A]/40 hover:bg-[#F0F8F2] text-xs font-medium text-[#17231C] transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
            >
              <span className="line-clamp-2">{sq}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#16834A] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

