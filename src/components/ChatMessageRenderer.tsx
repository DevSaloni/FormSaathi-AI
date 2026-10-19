import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Copy,
  Check,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  FileText,
  Building2,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { ChatMessage, Language } from '../types';

interface ChatMessageRendererProps {
  message: ChatMessage;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  onSelectFollowUp?: (query: string) => void;
  currentLanguage: Language;
}

export const ChatMessageRenderer: React.FC<ChatMessageRendererProps> = ({
  message,
  isSpeaking,
  onToggleSpeech,
  onSelectFollowUp,
  currentLanguage,
}) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'helpful' | 'unhelpful' | null>(null);

  const isUser = message.sender === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Generate contextual follow-up quick prompts
  const getContextualFollowUps = (text: string, lang: Language): string[] => {
    const tLower = text.toLowerCase();
    const suggestions: string[] = [];

    if (lang === 'mr') {
      if (tLower.includes('कागदपत्रे') || tLower.includes('कागदपत्र')) {
        suggestions.push('शासकीय शुल्क आणि कालावधी किती आहे?');
        suggestions.push('ऑनलाइन अर्ज कुठे करायचा?');
      } else if (tLower.includes('अर्ज') || tLower.includes('पोर्टल')) {
        suggestions.push('कोणती कागदपत्रे जोडणे आवश्यक आहे?');
        suggestions.push('अर्ज नामंजूर झाल्यास काय करावे?');
      } else {
        suggestions.push('यासाठी कोणती कागदपत्रे लागतात?');
        suggestions.push('अर्ज कुठे आणि कसा करावा?');
        suggestions.push('शासकीय शुल्क किती आहे?');
      }
    } else if (lang === 'hi') {
      if (tLower.includes('दस्तावेज') || tLower.includes('कागजात')) {
        suggestions.push('सरकारी फीस और समय कितना लगता है?');
        suggestions.push('ऑनलाइन आवेदन पोर्टल का लिंक दें?');
      } else if (tLower.includes('आवेदन') || tLower.includes('पोर्टल')) {
        suggestions.push('अनिवार्य दस्तावेज कौन-कौन से हैं?');
        suggestions.push('आवेदन निरस्त होने पर क्या करें?');
      } else {
        suggestions.push('इसके लिए कौन-से दस्तावेज चाहिए?');
        suggestions.push('आवेदन कैसे और कहाँ करें?');
        suggestions.push('सरकारी शुल्क कितना है?');
      }
    } else {
      if (tLower.includes('document') || tLower.includes('proof')) {
        suggestions.push('What is the official fee and processing time?');
        suggestions.push('Where can I apply online?');
      } else if (tLower.includes('apply') || tLower.includes('portal')) {
        suggestions.push('What mandatory documents are required?');
        suggestions.push('What to do if application is rejected?');
      } else {
        suggestions.push('What documents are required?');
        suggestions.push('Where and how do I apply?');
        suggestions.push('What is the official fee?');
      }
    }

    return suggestions.slice(0, 3);
  };

  // Format inline text: bold, links, amounts, caution badges
  const renderInlineFormatted = (rawText: string) => {
    // Regex splits for bold (**text**), urls (https://...), and portals (xxx.gov.in)
    const parts = rawText.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+|[a-zA-Z0-9.-]+\.gov\.in[^\s]*)/g);

    return parts.map((part, idx) => {
      if (!part) return null;

      // Bold text
      if (part.startsWith('**') && part.endsWith('**')) {
        const content = part.slice(2, -2);
        return (
          <strong key={idx} className="font-bold text-[#17231C]">
            {content}
          </strong>
        );
      }

      // URLs
      if (part.startsWith('http://') || part.startsWith('https://')) {
        const url = part.replace(/[.,)]+$/, '');
        return (
          <a
            key={idx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#16834A] hover:text-[#105C38] underline decoration-[#16834A]/40 hover:decoration-[#16834A] mx-1 break-all"
          >
            <span>{url}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        );
      }

      // Gov Portal domain mention without http
      if (part.includes('.gov.in')) {
        const cleanDomain = part.replace(/[.,)]+$/, '');
        const fullUrl = `https://${cleanDomain}`;
        return (
          <a
            key={idx}
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#16834A] bg-[#F0F8F2] hover:bg-[#E2F0E5] px-1.5 py-0.5 rounded border border-[#16834A]/20 mx-1 text-xs transition-colors"
          >
            <span>{cleanDomain}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        );
      }

      return <span key={idx}>{part}</span>;
    });
  };

  // Parse structured blocks (Headings, Numbered Steps, Bullet Lists, Caution Callouts)
  const renderStructuredContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentBulletList: string[] = [];

    const flushBulletList = (keyPrefix: number) => {
      if (currentBulletList.length > 0) {
        elements.push(
          <div key={`bl-${keyPrefix}`} className="my-2 space-y-1.5 pl-1">
            {currentBulletList.map((bullet, bIdx) => (
              <div key={bIdx} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#2D3748]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#16834A] mt-2 shrink-0" />
                <div className="flex-1">{renderInlineFormatted(bullet)}</div>
              </div>
            ))}
          </div>
        );
        currentBulletList = [];
      }
    };

    lines.forEach((line, lineIdx) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushBulletList(lineIdx);
        return;
      }

      // Check for Caution / Warning blocks
      const isCautionLine =
        trimmed.startsWith('**सावधानी') ||
        trimmed.startsWith('**महत्त्वाची') ||
        trimmed.startsWith('**Caution') ||
        trimmed.startsWith('**Note') ||
        trimmed.startsWith('**टीप') ||
        trimmed.startsWith('⚠️') ||
        trimmed.toLowerCase().includes('never share') ||
        trimmed.toLowerCase().includes('ओटीपी कधीही शेअर');

      if (isCautionLine) {
        flushBulletList(lineIdx);
        elements.push(
          <div
            key={`alert-${lineIdx}`}
            className="my-3 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/90 text-amber-950 flex items-start gap-3 shadow-2xs"
          >
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed flex-1">
              {renderInlineFormatted(trimmed)}
            </div>
          </div>
        );
        return;
      }

      // Check for Headings (###, ##, or 1. **Heading**)
      if (trimmed.startsWith('###') || trimmed.startsWith('##')) {
        flushBulletList(lineIdx);
        const headingText = trimmed.replace(/^#{2,4}\s*/, '');
        elements.push(
          <div
            key={`h-${lineIdx}`}
            className="mt-4 mb-2 pb-1.5 border-b border-[#E2EAE3] flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-[#16834A]" />
            <h4 className="font-bold text-sm sm:text-base text-[#105C38]">
              {renderInlineFormatted(headingText)}
            </h4>
          </div>
        );
        return;
      }

      // Check for Numbered Steps (e.g., 1. or १. or 1)
      const numberedMatch = trimmed.match(/^([0-9]+|[१२३४५६७८९०]+)[\.\)]\s*(.*)$/);
      if (numberedMatch) {
        flushBulletList(lineIdx);
        const stepNum = numberedMatch[1];
        const stepContent = numberedMatch[2];

        elements.push(
          <div
            key={`step-${lineIdx}`}
            className="my-2.5 p-3 rounded-xl bg-white border border-[#E2EAE3] shadow-2xs flex items-start gap-3 hover:border-[#16834A]/30 transition-colors"
          >
            <div className="w-6 h-6 rounded-lg bg-[#F0F8F2] border border-[#16834A]/30 text-[#16834A] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              {stepNum}
            </div>
            <div className="flex-1 text-sm text-[#2D3748] leading-relaxed">
              {renderInlineFormatted(stepContent)}
            </div>
          </div>
        );
        return;
      }

      // Check for Bullet points (- or * or •)
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        const bulletContent = trimmed.replace(/^[-*•]\s+/, '');
        currentBulletList.push(bulletContent);
        return;
      }

      // Regular paragraph line
      flushBulletList(lineIdx);
      elements.push(
        <p key={`p-${lineIdx}`} className="my-1.5 text-sm leading-relaxed text-[#2D3748]">
          {renderInlineFormatted(trimmed)}
        </p>
      );
    });

    flushBulletList(lines.length);
    return elements;
  };

  const followUps = !isUser ? getContextualFollowUps(message.text, currentLanguage) : [];

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isUser) {
    return (
      <div className="flex justify-end gap-3 max-w-full">
        <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 bg-[#16834A] text-white rounded-tr-xs shadow-xs space-y-1">
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-medium">
            {message.text}
          </p>
          <div className="flex items-center justify-end gap-2 text-[10px] text-white/80 pt-1">
            <span>{formatTime(message.timestamp)}</span>
          </div>
        </div>
      </div>
    );
  }

  // Assistant Message - Professional Chatbot Card
  return (
    <div className="flex gap-3 justify-start max-w-full">
      {/* Bot Brand Emblem Avatar */}
      <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#105C38] via-[#16834A] to-[#22C55E] text-white flex items-center justify-center shrink-0 shadow-xs border border-white/20 mt-1">
        <Sparkles className="w-5 h-5 text-emerald-100" />
      </div>

      <div className="max-w-[92%] sm:max-w-[85%] space-y-2">
        {/* Main Response Box */}
        <div className="rounded-2xl p-4 sm:p-5 bg-white border border-[#E2EAE3] rounded-tl-xs shadow-xs space-y-3">
          {/* Top Metadata Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F1] text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#105C38] flex items-center gap-1">
                FormSaathi Civic Intelligence
                <ShieldCheck className="w-3.5 h-3.5 text-[#16834A]" />
              </span>
              <span className="text-[10px] bg-[#F0F8F2] text-[#16834A] font-semibold px-2 py-0.5 rounded-full border border-[#16834A]/20">
                {message.language === 'mr' ? 'मराठी' : message.language === 'hi' ? 'हिंदी' : 'English'}
              </span>
            </div>
            <span className="text-[10px] text-[#68756C]">{formatTime(message.timestamp)}</span>
          </div>

          {/* Formatted Content */}
          <div className="space-y-1">{renderStructuredContent(message.text)}</div>

          {/* Professional Action Toolbar */}
          <div className="flex items-center justify-between pt-3 border-t border-[#F0F4F1] text-xs flex-wrap gap-2">
            {/* Audio Voice Control with Waveform Indicator */}
            <button
              onClick={onToggleSpeech}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold text-xs cursor-pointer transition-all ${
                isSpeaking
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs'
                  : 'bg-[#F0F8F2] hover:bg-[#E2F0E5] text-[#105C38] border border-[#16834A]/20'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>
                    {currentLanguage === 'mr'
                      ? 'आवाज थांबवा'
                      : currentLanguage === 'hi'
                      ? 'आवाज रोकें'
                      : 'Stop Voice'}
                  </span>
                  {/* Animated sound bars */}
                  <div className="flex items-center gap-0.5 ml-1">
                    <span className="w-1 h-3 bg-rose-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-4 bg-rose-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-2 bg-rose-600 rounded-full animate-bounce" />
                  </div>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#16834A]" />
                  <span>
                    {currentLanguage === 'mr'
                      ? 'मोठ्याने ऐका'
                      : currentLanguage === 'hi'
                      ? 'बोलकर सुनें'
                      : 'Listen Out Loud'}
                  </span>
                </>
              )}
            </button>

            {/* Utility Actions: Copy & Feedback */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#F0F8F2] text-[#68756C] hover:text-[#105C38] border border-[#E2EAE3] text-xs font-medium transition-colors cursor-pointer"
                title="Copy answer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#16834A]" />
                    <span className="text-[#16834A] font-semibold">
                      {currentLanguage === 'mr' ? 'कॉपी झाले!' : currentLanguage === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>
                      {currentLanguage === 'mr' ? 'कॉपी' : currentLanguage === 'hi' ? 'कॉपी' : 'Copy'}
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center border border-[#E2EAE3] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setFeedback('helpful')}
                  className={`p-1.5 transition-colors cursor-pointer ${
                    feedback === 'helpful' ? 'bg-[#F0F8F2] text-[#16834A]' : 'text-[#68756C] hover:text-[#105C38]'
                  }`}
                  title="Helpful response"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <div className="w-[1px] h-3 bg-[#E2EAE3]" />
                <button
                  onClick={() => setFeedback('unhelpful')}
                  className={`p-1.5 transition-colors cursor-pointer ${
                    feedback === 'unhelpful' ? 'bg-rose-50 text-rose-600' : 'text-[#68756C] hover:text-rose-600'
                  }`}
                  title="Needs improvement"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Follow-up Prompt Pills */}
        {followUps.length > 0 && onSelectFollowUp && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 pl-1">
            <span className="text-[11px] font-semibold text-[#68756C] flex items-center gap-1 mr-1">
              <Sparkles className="w-3 h-3 text-[#16834A]" />
              {currentLanguage === 'mr'
                ? 'पुढील प्रश्न:'
                : currentLanguage === 'hi'
                ? 'अगला प्रश्न:'
                : 'Follow-up:'}
            </span>
            {followUps.map((q, qIdx) => (
              <button
                key={qIdx}
                onClick={() => onSelectFollowUp(q)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-white hover:bg-[#F0F8F2] text-[#17231C] hover:text-[#105C38] border border-[#E2EAE3] hover:border-[#16834A]/40 transition-all cursor-pointer shadow-2xs group text-left"
              >
                <span>{q}</span>
                <ArrowRight className="w-3 h-3 text-[#16834A] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
