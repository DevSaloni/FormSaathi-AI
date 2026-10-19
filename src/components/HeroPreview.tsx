import React, { useState } from 'react';
import { Mic, Volume2, CheckCircle2, AlertCircle, Sparkles, FileText, Check, ChevronRight } from 'lucide-react';
import { Language } from '../types';

interface HeroPreviewProps {
  currentLang: Language;
  onOpenExplainer: () => void;
  onOpenVoice: () => void;
}

export const HeroPreview: React.FC<HeroPreviewProps> = ({
  currentLang,
  onOpenExplainer,
  onOpenVoice,
}) => {
  const [activeChecklist, setActiveChecklist] = useState<Record<string, boolean>>({
    c1: true,
    c2: true,
    c3: false,
  });
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleCheck = (id: string) => {
    setActiveChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const previewLabels = {
    mr: {
      formHeader: 'तहसील कार्यालय - उत्पन्न प्रमाणपत्रासाठी अर्ज',
      field1Title: 'अर्जदाराचे पूर्ण नाव (Applicant Full Name)',
      field1Help: 'तुमचे नाव शाळा सोडल्याच्या दाखल्याप्रमाणे किंवा आधारप्रमाणे अचूक लिहा.',
      exampleTag: 'काल्पनिक उदाहरण: गणेश तुकाराम शिंदे',
      docTitle: 'आवश्यक कागदपत्रे (Checklist)',
      doc1: 'आधार कार्ड (चालू मोबाईल नंबरसह)',
      doc2: 'रेशन कार्ड सत्यप्रत (१२ अंकी RC क्रमांक)',
      doc3: 'तलाठी उत्पन्न चौकशी अहवाल',
      voicePrompt: 'माईक दाबून बोला: "उत्पन्नाचा दाखला कसा काढायचा?"',
      liveExplain: 'AI स्पष्टीकरण सक्रिय',
    },
    hi: {
      formHeader: 'तहसील कार्यालय - आय प्रमाण पत्र आवेदन',
      field1Title: 'आवेदक का पूरा नाम (Applicant Full Name)',
      field1Help: 'स्कूल सर्टिफिकेट या आधार कार्ड के अनुसार सही स्पेलिंग में नाम लिखें।',
      exampleTag: 'काल्पनिक उदाहरण: राजेश कुमार शर्मा',
      docTitle: 'आवश्यक दस्तावेज (Checklist)',
      doc1: 'आधार कार्ड (सक्रिय मोबाइल नंबर सहित)',
      doc2: 'राशन कार्ड प्रति (मुखिया व सदस्य विवरण)',
      doc3: 'लेखपाल / पटवारी आय जांच आख्या',
      voicePrompt: 'माइक दबाकर बोलें: "आय प्रमाण पत्र के लिए क्या लगेगा?"',
      liveExplain: 'AI विश्लेषण सक्रिय',
    },
    en: {
      formHeader: 'Tahsil Office - Income Certificate Form',
      field1Title: 'Applicant Full Legal Name',
      field1Help: 'Enter name precisely as recorded on official school leaving or Aadhaar records.',
      exampleTag: 'Fictional Example: Ramesh K. Shinde',
      docTitle: 'Required Documents Checklist',
      doc1: 'Applicant Aadhaar Card (Mobile Linked)',
      doc2: 'Ration Card Copy (Family details)',
      doc3: 'Local Revenue / Talathi Verification Report',
      voicePrompt: 'Tap mic and ask: "How do I apply for an income certificate?"',
      liveExplain: 'AI Analysis Active',
    },
  }[currentLang];

  const handleSimulateVoice = () => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text =
        currentLang === 'mr'
          ? 'उत्पन्नाचा दाखला काढण्यासाठी आधार कार्ड, रेशन कार्ड आणि तलाठी अहवाल आवश्यक आहेत.'
          : currentLang === 'hi'
          ? 'आय प्रमाण पत्र के लिए आधार कार्ड, राशन कार्ड और पटवारी रिपोर्ट जरूरी हैं।'
          : 'To apply for an income certificate, you need Aadhaar, Ration Card, and Revenue Verification.';
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = currentLang === 'mr' ? 'mr-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-IN';
      utter.onend = () => setIsPlayingAudio(false);
      utter.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utter);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-[390px] xl:max-w-[420px]">
      {/* Decorative ambient background blur */}
      <div className="absolute -top-3 -right-3 w-36 h-36 bg-[#16834A]/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-4 -left-4 w-36 h-36 bg-[#105C38]/10 rounded-full blur-xl pointer-events-none" />

      {/* Main Container Card representing the actual application UI */}
      <div className="relative bg-white rounded-2xl border border-[#E2EAE3] shadow-md overflow-hidden transition-all hover:shadow-lg">
        {/* Mock Application Top Bar with Real Civic Service Tag */}
        <div className="bg-[#F0F8F2] px-3 py-1.5 border-b border-[#E2EAE3] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#16834A]" />
            <span className="text-[10px] font-bold text-[#105C38] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#16834A]" />
              {previewLabels.liveExplain}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white text-[#16834A] border border-[#16834A]/30">
              {currentLang.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Real-time Civic Photo Pill */}
        <div className="px-3 pt-2.5 pb-1 flex items-center gap-2.5 bg-gradient-to-r from-[#F0F8F2] to-white border-b border-[#E2EAE3]/60">
          <img
            src="/src/assets/images/citizen_scanning_form_1792418373793.jpg"
            alt="Citizen scanning form"
            className="w-8 h-8 rounded-lg object-cover border border-[#16834A]/30 shrink-0"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="min-w-0">
            <p className="text-[10.5px] font-bold text-[#105C38] leading-tight truncate">
              {currentLang === 'mr' ? 'सेतू / नागरिक सेवा केंद्र' : currentLang === 'hi' ? 'सीएससी / नागरिक सेवा केंद्र' : 'Citizen Assistance Center'}
            </p>
            <p className="text-[9.5px] text-[#68756C] truncate">
              {currentLang === 'mr' ? 'अर्जांचे थेट फोटो स्पष्टीकरण' : currentLang === 'hi' ? 'दस्तावेजों का सीधा मार्गदर्शन' : 'Live Document Scan & Voice Help'}
            </p>
          </div>
        </div>

        <div className="p-2.5 sm:p-3 space-y-2">
          {/* Field Breakdown Card inside Form */}
          <div className="bg-[#FAFCFA] rounded-xl border border-[#E2EAE3] p-2 relative">
            <div className="flex items-center justify-between pb-1 border-b border-[#E2EAE3]">
              <div className="flex items-center gap-1.5 min-w-0">
                <FileText className="w-3.5 h-3.5 text-[#16834A] shrink-0" />
                <h4 className="text-[10.5px] font-bold text-[#17231C] truncate">
                  {previewLabels.formHeader}
                </h4>
              </div>
              <span className="text-[9px] font-semibold text-[#105C38] bg-[#F0F8F2] px-1.5 py-0.2 rounded border border-[#16834A]/20 shrink-0 ml-1">
                Verified
              </span>
            </div>

            {/* Field breakdown item inside form */}
            <div className="mt-1 bg-white rounded-lg p-2 border border-[#16834A]/25 shadow-2xs">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[9px] uppercase font-bold tracking-wider text-[#105C38]">
                  FIELD #1 (MANDATORY)
                </span>
                <button
                  onClick={handleSimulateVoice}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold text-[#105C38] bg-[#F0F8F2] hover:bg-[#16834A]/10 transition-colors cursor-pointer ${
                    isPlayingAudio ? 'animate-pulse text-[#16834A] ring-1 ring-[#16834A]' : ''
                  }`}
                  title="Listen to audio guide"
                  aria-label="Listen to audio guide"
                >
                  <Volume2 className="w-3 h-3 text-[#16834A]" />
                  <span>{isPlayingAudio ? 'Playing...' : 'Audio'}</span>
                </button>
              </div>

              <p className="text-[11px] font-semibold text-[#17231C] mt-0.5 truncate">
                {previewLabels.field1Title}
              </p>

              {/* Green AI Explanation Box */}
              <div className="mt-1.5 p-1.5 rounded-md bg-[#F0F8F2] border border-[#16834A]/15 text-[10.5px] leading-snug text-[#17231C]">
                <p className="line-clamp-2">{previewLabels.field1Help}</p>
                <div className="mt-1 inline-block text-[9.5px] font-medium text-[#105C38] bg-white px-1.5 py-0.5 rounded border border-[#16834A]/20">
                  {previewLabels.exampleTag}
                </div>
              </div>
            </div>
          </div>

          {/* Small Interactive Document Checklist Preview */}
          <div className="bg-white rounded-xl border border-[#E2EAE3] p-2 sm:p-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <h5 className="text-[10.5px] sm:text-[11px] font-bold text-[#17231C] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#16834A]" />
                {previewLabels.docTitle}
              </h5>
              <span className="text-[9.5px] font-bold text-[#105C38] bg-[#F0F8F2] px-1.5 py-0.2 rounded-full">
                {Object.values(activeChecklist).filter(Boolean).length}/3 Ready
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {[
                { id: 'c1', text: previewLabels.doc1 },
                { id: 'c2', text: previewLabels.doc2 },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="w-full flex items-center gap-1.5 p-1 rounded-md text-left text-[10.5px] sm:text-[11px] text-[#17231C] hover:bg-[#F0F8F2] transition-colors cursor-pointer"
                >
                  <div
                    className={`w-3 h-3 rounded flex items-center justify-center border transition-all shrink-0 ${
                      activeChecklist[item.id]
                        ? 'bg-[#16834A] border-[#16834A] text-white'
                        : 'border-[#CBD5E1] bg-white'
                    }`}
                  >
                    {activeChecklist[item.id] && <Check className="w-2 h-2 stroke-[3]" />}
                  </div>
                  <span
                    className={`truncate ${
                      activeChecklist[item.id] ? 'line-through text-[#68756C]' : 'font-medium'
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Compact Voice Assistant Bar */}
          <div className="bg-[#105C38] rounded-xl p-2 sm:p-2.5 text-white flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={onOpenVoice}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white text-[#105C38] flex items-center justify-center hover:bg-[#F0F8F2] active:scale-95 transition-all shadow-2xs shrink-0 cursor-pointer"
                title="Tap to speak"
                aria-label="Tap to speak"
              >
                <Mic className="w-3.5 h-3.5 text-[#16834A]" />
              </button>
              <div className="overflow-hidden min-w-0">
                <span className="text-[8.5px] font-bold text-emerald-200 uppercase tracking-wider block">
                  Voice Guide
                </span>
                <p className="text-[10.5px] sm:text-[11px] text-white/95 truncate font-medium">
                  {previewLabels.voicePrompt}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenExplainer}
              className="text-[10.5px] sm:text-[11px] font-bold text-white hover:text-emerald-200 flex items-center gap-0.5 cursor-pointer shrink-0"
            >
              Try <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
