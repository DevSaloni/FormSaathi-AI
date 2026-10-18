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
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Decorative ambient background blur */}
      <div className="absolute -top-6 -right-6 w-64 h-64 bg-[#16834A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#105C38]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card representing the actual application UI */}
      <div className="relative bg-white rounded-3xl border border-[#E2EAE3] shadow-xl overflow-hidden transition-all hover:shadow-2xl">
        {/* Mock Application Top Bar */}
        <div className="bg-[#F0F8F2] px-5 py-3.5 border-b border-[#E2EAE3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E2EAE3]" />
            <div className="w-3 h-3 rounded-full bg-[#E2EAE3]" />
            <div className="w-3 h-3 rounded-full bg-[#16834A]" />
            <span className="text-xs font-semibold text-[#105C38] ml-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#16834A]" />
              {previewLabels.liveExplain}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-[#16834A] border border-[#16834A]/30">
              {currentLang.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Mini Sample Form Paper Preview */}
          <div className="bg-[#FAFCFA] rounded-2xl border border-[#E2EAE3] p-4 relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2EAE3]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#16834A]" />
                <h4 className="text-xs font-bold text-[#17231C] truncate max-w-[240px]">
                  {previewLabels.formHeader}
                </h4>
              </div>
              <span className="text-[10px] font-semibold text-[#68756C] bg-white px-2 py-0.5 rounded border border-[#E2EAE3]">
                Form 1
              </span>
            </div>

            {/* Field breakdown item inside form */}
            <div className="mt-3 bg-white rounded-xl p-3 border border-[#16834A]/30 shadow-xs relative">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#105C38]">
                    FIELD #1 (MANDATORY)
                  </span>
                  <p className="text-xs font-semibold text-[#17231C] mt-0.5">
                    {previewLabels.field1Title}
                  </p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F0F8F2] text-[#16834A]">
                  Verified
                </span>
              </div>

              {/* Green AI Explanation Box */}
              <div className="mt-2.5 p-2.5 rounded-lg bg-[#F0F8F2] border border-[#16834A]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#105C38]">
                    <Sparkles className="w-3.5 h-3.5 text-[#16834A]" />
                    <span>AI Saathi Guide:</span>
                  </div>
                  <button
                    onClick={handleSimulateVoice}
                    className={`p-1 rounded-md text-[#105C38] hover:bg-[#16834A]/10 transition-colors cursor-pointer ${
                      isPlayingAudio ? 'animate-pulse text-[#16834A]' : ''
                    }`}
                    title="Listen to audio"
                    aria-label="Listen to audio"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-[#17231C] mt-1 leading-relaxed">
                  {previewLabels.field1Help}
                </p>
                <div className="mt-2 inline-block text-[11px] font-medium text-[#105C38] bg-white px-2 py-0.5 rounded border border-[#16834A]/20">
                  {previewLabels.exampleTag}
                </div>
              </div>
            </div>
          </div>

          {/* Small Interactive Document Checklist Preview */}
          <div className="bg-white rounded-2xl border border-[#E2EAE3] p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-xs font-bold text-[#17231C] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16834A]" />
                {previewLabels.docTitle}
              </h5>
              <span className="text-[11px] font-bold text-[#105C38] bg-[#F0F8F2] px-2 py-0.5 rounded-full">
                {Object.values(activeChecklist).filter(Boolean).length}/3 Ready
              </span>
            </div>

            <div className="space-y-2">
              {[
                { id: 'c1', text: previewLabels.doc1 },
                { id: 'c2', text: previewLabels.doc2 },
                { id: 'c3', text: previewLabels.doc3 },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs text-[#17231C] hover:bg-[#F0F8F2] transition-colors cursor-pointer border border-transparent hover:border-[#E2EAE3]"
                >
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                      activeChecklist[item.id]
                        ? 'bg-[#16834A] border-[#16834A] text-white'
                        : 'border-[#CBD5E1] bg-white'
                    }`}
                  >
                    {activeChecklist[item.id] && <Check className="w-3 h-3 stroke-[3]" />}
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

          {/* Interactive Voice Assistant Bar */}
          <div className="bg-[#105C38] rounded-2xl p-3.5 text-white flex items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenVoice}
                className="w-10 h-10 rounded-xl bg-white text-[#105C38] flex items-center justify-center hover:bg-[#F0F8F2] active:scale-95 transition-all shadow-sm cursor-pointer"
                title="Tap to speak"
                aria-label="Tap to speak"
              >
                <Mic className="w-5 h-5 text-[#16834A]" />
              </button>
              <div className="overflow-hidden">
                <span className="text-[10px] font-semibold text-emerald-200 uppercase tracking-wider block">
                  Voice Guide
                </span>
                <p className="text-xs text-white/95 truncate font-medium max-w-[210px] sm:max-w-[260px]">
                  {previewLabels.voicePrompt}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenExplainer}
              className="text-xs font-bold text-white hover:text-emerald-200 flex items-center gap-0.5 cursor-pointer shrink-0"
            >
              Try <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
