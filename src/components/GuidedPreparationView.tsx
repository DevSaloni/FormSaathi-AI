import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Mic,
  Volume2,
  VolumeX,
  Printer,
  Edit3,
  HelpCircle,
  FileText,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Check
} from 'lucide-react';
import { GuidedQuestion, Language, GuidedStage } from '../types';
import { translations } from '../data/translations';
import { supportedCertificates } from '../data/certificateData';
import { speakText, stopSpeaking, createSpeechRecognizer } from '../services/api';
import { useApp } from '../context/AppContext';
import { CertificateIndicatorBanner } from './CertificateIndicatorBanner';

interface GuidedPreparationViewProps {
  currentLang?: Language;
}

export const GuidedPreparationView: React.FC<GuidedPreparationViewProps> = ({ currentLang: propLang }) => {
  const {
    selectedLanguage,
    selectedCertificate,
    allCertificates,
    selectedState,
    setSelectedState,
    selectedDistrict,
    setSelectedDistrict,
    activeWorkflow,
    setGuidedAnswer,
    setGuidedStepIndex,
    setGuidedReviewMode,
    resetGuidedPrep,
    setDashboardTab,
  } = useApp();

  const lang = propLang || selectedLanguage;
  const t = translations[lang];

  const certData = allCertificates[selectedCertificate] || allCertificates.income_cert || supportedCertificates.income_cert;
  const certInfo = certData.info;
  const certTitle = certInfo.title[lang];

  const stages: GuidedStage[] = certData.stages;

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string>('');

  const currentStepIndex = Math.min(
    Math.max(0, activeWorkflow.guidedPreparationProgress.stepIndex || 0),
    stages.length - 1
  );

  const answers = activeWorkflow.collectedAnswers || {};
  const currentStage: GuidedStage = stages[currentStepIndex] || stages[0];
  const progressPercent = Math.round(((currentStepIndex + 1) / stages.length) * 100);

  const handleNext = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (currentStepIndex < stages.length - 1) {
      setGuidedStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (currentStepIndex > 0) {
      setGuidedStepIndex(currentStepIndex - 1);
    }
  };

  const handleJumpToStage = (idx: number) => {
    stopSpeaking();
    setIsSpeaking(false);
    setGuidedStepIndex(idx);
  };

  const handleVoiceAnswer = (questionId: string) => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setActiveQuestionId(questionId);
    const recognizer = createSpeechRecognizer(
      lang,
      (transcript) => {
        setGuidedAnswer(questionId, transcript);
      },
      (err) => {
        console.warn('Voice answer error:', err);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );

    if (recognizer.isSupported) {
      setIsRecording(true);
      recognizer.start();
    }
  };

  const handleReadAloudStage = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `${currentStage.title[lang]}. ${currentStage.summary[lang]}. ${currentStage.keyDetails[lang].join('. ')}`;
    speakText(
      textToSpeak,
      lang,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      (err) => {
        console.warn('TTS error:', err);
        setIsSpeaking(false);
      }
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleConfirmReset = () => {
    resetGuidedPrep();
    setShowClearConfirm(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Shared Certificate Workspace Indicator */}
      <CertificateIndicatorBanner />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20">
              Guided Step-by-Step Preparation
            </span>
            <span className="text-xs font-medium text-[#68756C]">
              Stage {currentStepIndex + 1} of {stages.length}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C]">
            {lang === 'mr' ? `तयारी: ${certTitle}` : lang === 'hi' ? `तैयारी: ${certTitle}` : `Preparing for: ${certTitle}`}
          </h2>
          <p className="text-sm text-[#68756C] max-w-xl">
            {lang === 'mr'
              ? 'हे मार्गदर्शन तुम्हाला अर्ज भरणे, कागदपत्रे गोळा करणे आणि अधिकृत सेतू केंद्रावर सादर करण्याच्या सर्व टप्प्यांत मदत करते.'
              : lang === 'hi'
              ? 'यह चरण-दर-चरण मार्गदर्शक आपको आवेदन तैयार करने, दस्तावेज जुटाने और पोर्टल पर जमा करने की पूरी प्रक्रिया समझाता है।'
              : 'A step-by-step organized preparation workflow. Answers and progress are saved automatically for this certificate.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#68756C] hover:text-rose-700 bg-white hover:bg-rose-50 border border-[#E2EAE3] hover:border-rose-200 cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'सुरुवातीपासून करा' : lang === 'hi' ? 'पुनः शुरू करें' : 'Start Over'}</span>
          </button>
        </div>
      </div>

      {/* 8-Stage Progress Navigation Bar */}
      <div className="bg-white rounded-3xl border border-[#E2EAE3] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-[#105C38]">
            Stage {currentStepIndex + 1}: {currentStage.title[lang]}
          </span>
          <span className="text-[#68756C]">{progressPercent}% Completed</span>
        </div>

        <div className="w-full bg-[#E2EAE3] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#16834A] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Clickable Stage Dots / Labels */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 pt-1">
          {stages.map((st, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <button
                key={st.id}
                onClick={() => handleJumpToStage(idx)}
                className={`p-1.5 rounded-xl text-center transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-[#16834A] text-white border-[#16834A] font-bold shadow-2xs'
                    : isDone
                    ? 'bg-[#F0F8F2] text-[#105C38] border-[#16834A]/30 font-semibold'
                    : 'bg-white text-[#68756C] border-[#E2EAE3] hover:bg-[#F0F8F2]'
                }`}
                title={st.title[lang]}
              >
                <span className="text-[10px] block font-extrabold">{idx + 1}</span>
                <span className="text-[9px] truncate block opacity-90">
                  {st.stageKey.replace('_', ' ')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Content Card */}
      <div className="bg-white rounded-3xl border border-[#E2EAE3] p-6 sm:p-8 shadow-xs space-y-6">
        {/* Stage Header with Read Aloud */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2EAE3]">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#16834A]">
              Stage {currentStepIndex + 1} of 8
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#17231C]">
              {currentStage.title[lang]}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleReadAloudStage}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              isSpeaking
                ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                : 'bg-[#F0F8F2] text-[#105C38] border border-[#16834A]/25 hover:bg-[#E2EAE3]'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-600" />
                <span>{lang === 'mr' ? 'आवाज थांबवा' : lang === 'hi' ? 'आवाज बंद करें' : 'Stop Audio'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#16834A]" />
                <span>{lang === 'mr' ? 'ऐका (Read Aloud)' : lang === 'hi' ? 'बोलकर सुनें' : 'Listen'}</span>
              </>
            )}
          </button>
        </div>

        {/* Stage Summary */}
        <div className="p-4 rounded-2xl bg-[#F0F8F2]/60 border border-[#16834A]/20">
          <p className="text-sm sm:text-base text-[#17231C] font-medium leading-relaxed">
            {currentStage.summary[lang]}
          </p>
        </div>

        {/* Key Points / Bullet Explanations */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#68756C]">
            {lang === 'mr' ? 'महत्त्वाचे नियम व मुद्दे:' : lang === 'hi' ? 'मुख्य नियम व बिंदु:' : 'Key Rules & Verified Details:'}
          </h4>
          <div className="space-y-2">
            {currentStage.keyDetails[lang].map((detail, dIdx) => (
              <div
                key={dIdx}
                className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAFCFA] border border-[#E2EAE3] text-xs sm:text-sm text-[#17231C]"
              >
                <div className="w-5 h-5 rounded-full bg-[#16834A]/10 text-[#16834A] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#16834A]" />
                </div>
                <span className="leading-relaxed">{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 2 Special: Jurisdiction Confirmation */}
        {currentStage.stageKey === 'jurisdiction' && (
          <div className="p-5 rounded-2xl bg-white border border-[#16834A]/30 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#16834A]" />
              <span className="font-extrabold text-sm text-[#17231C]">
                {lang === 'mr' ? 'सध्याचे निवडलेले कार्यक्षेत्र:' : lang === 'hi' ? 'वर्तमान चयनित कार्यक्षेत्र:' : 'Active Application Jurisdiction:'}
              </span>
            </div>
            <p className="text-xs text-[#68756C]">
              {lang === 'mr'
                ? 'हे कार्यक्षेत्र आधीच होम किंवा बॅनरवरून भरलेले आहे. आवश्यक असल्यास खाली बदलू शकता:'
                : lang === 'hi'
                ? 'यह क्षेत्र आपके चयनित राज्य और जिले के अनुसार स्वतः भरा गया है। आवश्यकतानुसार बदल सकते हैं:'
                : 'Auto-populated from your selected state and district. No need to re-enter unless changing jurisdiction:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#F0F8F2] border border-[#E2EAE3]">
                <span className="text-[11px] font-bold text-[#68756C] block">State</span>
                <span className="text-xs font-extrabold text-[#17231C]">{selectedState}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F0F8F2] border border-[#E2EAE3]">
                <span className="text-[11px] font-bold text-[#68756C] block">District / Tahsil</span>
                <span className="text-xs font-extrabold text-[#17231C]">{selectedDistrict}</span>
              </div>
            </div>
          </div>
        )}

        {/* Stage 5 Special: Quick Jump to Document Checklist */}
        {currentStage.stageKey === 'documents' && (
          <div className="p-4 rounded-2xl bg-[#F0F8F2] border border-[#16834A]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="font-extrabold text-xs text-[#105C38]">
                {activeWorkflow.documentChecklist.length} Verified Statutory Documents
              </span>
              <p className="text-[11px] text-[#68756C]">
                Check off Aadhaar, Ration Card, and local reports in the interactive checklist.
              </p>
            </div>
            <button
              onClick={() => setDashboardTab('checklist')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16834A] hover:bg-[#105C38] text-white text-xs font-bold cursor-pointer transition-all shadow-xs shrink-0"
            >
              <span>{lang === 'mr' ? 'कागदपत्र यादी पहा' : lang === 'hi' ? 'चेकलिस्ट खोलें' : 'Open Document Checklist'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Stage 6: Interactive Form Field Questions */}
        {currentStage.questions && currentStage.questions.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-[#E2EAE3]">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-[#16834A] uppercase tracking-wider">
                {lang === 'mr' ? 'अर्जातील मुख्य रकाने भरणे' : lang === 'hi' ? 'फॉर्म विवरण दर्ज करें' : 'Collect Your Form Answers'}
              </span>
              <p className="text-xs text-[#68756C]">
                {lang === 'mr'
                  ? 'येथे भरलेली माहिती आपोआप सेव्ह होते आणि सारांश पत्रकात तयार होते.'
                  : 'Answers entered here are automatically saved and prepared in your summary review sheet.'}
              </p>
            </div>

            {currentStage.questions.map((q) => {
              const currentVal = answers[q.id] || '';
              return (
                <div key={q.id} className="p-5 rounded-2xl bg-[#FAFCFA] border border-[#E2EAE3] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#17231C]">
                      {q.simplifiedQuestion[lang]}
                    </label>
                    {q.required && (
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        {lang === 'mr' ? 'अनिवार्य' : lang === 'hi' ? 'अनिवार्य' : 'Required'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#68756C]">{q.explanation[lang]}</p>

                  {/* Input with Voice dictation button */}
                  <div className="relative">
                    <input
                      type="text"
                      value={currentVal}
                      onChange={(e) => setGuidedAnswer(q.id, e.target.value)}
                      placeholder={q.placeholder[lang]}
                      className="w-full bg-white border border-[#E2EAE3] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#17231C] pr-12 focus:outline-hidden focus:ring-2 focus:ring-[#16834A]"
                    />
                    <button
                      type="button"
                      onClick={() => handleVoiceAnswer(q.id)}
                      className={`absolute right-2 top-2 p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isRecording && activeQuestionId === q.id
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'text-[#68756C] hover:text-[#16834A] hover:bg-[#F0F8F2]'
                      }`}
                      title="Speak answer via microphone"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Example & Caution */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-white border border-[#E2EAE3] text-[#68756C]">
                      <span className="font-bold text-[#16834A] block">
                        {lang === 'mr' ? 'काल्पनिक उदाहरण:' : lang === 'hi' ? 'काल्पनिक उदाहरण:' : 'Fictional Example:'}
                      </span>
                      <span>{q.exampleAnswer[lang]}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-800">
                      <span className="font-bold block">
                        {lang === 'mr' ? 'काळजी घ्या:' : lang === 'hi' ? 'सावधानी:' : 'Caution Note:'}
                      </span>
                      <span>{q.cautionNote[lang]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stage 7 Special: Review & Summary Sheet */}
        {currentStage.stageKey === 'review' && (
          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-white border border-[#16834A]/30 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-[#17231C] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#16834A]" />
                  <span>{lang === 'mr' ? 'तयारीचा एकत्रित सारांश' : lang === 'hi' ? 'तैयारी का संक्षिप्त विवरण' : 'Preparation Summary Sheet'}</span>
                </h4>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#105C38] bg-[#F0F8F2] border border-[#16834A]/25 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t.wizard.printSummary}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#FAFCFA] border border-[#E2EAE3]">
                  <span className="text-[#68756C] block">Certificate</span>
                  <span className="font-bold text-[#17231C]">{certTitle}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAFCFA] border border-[#E2EAE3]">
                  <span className="text-[#68756C] block">Jurisdiction</span>
                  <span className="font-bold text-[#17231C]">{selectedState} • {selectedDistrict}</span>
                </div>
              </div>

              {/* Answers review */}
              {Object.keys(answers).length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#E2EAE3]">
                  <span className="text-[11px] font-bold text-[#68756C] uppercase tracking-wider block">
                    Recorded Details:
                  </span>
                  {Object.entries(answers).map(([key, val]) => (
                    <div key={key} className="flex justify-between p-2 rounded-lg bg-[#F0F8F2] text-xs">
                      <span className="text-[#68756C]">{key.replace('inc_q_', '').replace('dom_q_', '').replace('caste_q_', '').replace('rc_q_', '')}:</span>
                      <strong className="text-[#17231C]">{val}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stage 8 Special: Next Steps & Direct Portal Link */}
        {currentStage.stageKey === 'next_steps' && (
          <div className="p-6 rounded-2xl bg-[#F0F8F2] border border-[#16834A]/30 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#16834A]" />
              <h4 className="font-extrabold text-base text-[#17231C]">
                {lang === 'mr' ? 'थेट अधिकृत सरकारी पोर्टलवर अर्ज करा' : lang === 'hi' ? 'सीधे आधिकारिक पोर्टल पर आवेदन करें' : 'Apply Directly on Official State Portal'}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[#105C38] leading-relaxed">
              Official processing fees are approximately <strong>{certInfo.officialFee}</strong> and statutory delivery timeline is <strong>{certInfo.typicalDeliveryDays} working days</strong>.
            </p>
            <div className="pt-2">
              <a
                href={certInfo.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#16834A] hover:bg-[#105C38] text-white text-xs sm:text-sm font-extrabold cursor-pointer transition-all shadow-md"
              >
                <span>{lang === 'mr' ? `उघडा: ${certInfo.officialPortalName}` : `Open ${certInfo.officialPortalName}`}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E2EAE3]">
          <button
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed text-[#68756C] bg-slate-100'
                : 'text-[#17231C] bg-white hover:bg-[#F0F8F2] border border-[#E2EAE3]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.wizard.prevStep}</span>
          </button>

          {currentStepIndex < stages.length - 1 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16834A] hover:bg-[#105C38] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <span>{t.wizard.nextStep}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setDashboardTab('checklist')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16834A] hover:bg-[#105C38] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <span>{lang === 'mr' ? 'कागदपत्र पडताळणीकडे जा' : lang === 'hi' ? 'दस्तावेज चेकलिस्ट पर जाएं' : 'Go to Document Checklist'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Start Over Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-[#E2EAE3] shadow-2xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="font-extrabold text-base text-[#17231C]">
                {lang === 'mr' ? 'तयारी पुन्हा सुरू करायची?' : lang === 'hi' ? 'तैयारी पुनः शुरू करें?' : 'Start Over Guided Prep?'}
              </h4>
              <p className="text-xs text-[#68756C]">
                {lang === 'mr'
                  ? `यामुळे "${certTitle}" साठी भरलेली उत्तरे व प्रगती पहिल्या टप्प्यावर जाईल.`
                  : `This will reset your answers and step progress for "${certTitle}".`}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl border border-[#E2EAE3] text-xs font-bold text-[#17231C] hover:bg-[#F0F8F2] cursor-pointer"
              >
                {lang === 'mr' ? 'रद्द करा' : lang === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
              >
                {lang === 'mr' ? 'हो, पुन्हा सुरू करा' : lang === 'hi' ? 'हाँ, शुरू करें' : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
