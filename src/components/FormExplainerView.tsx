import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  HelpCircle,
  FileText,
  RotateCcw,
  Camera,
  ChevronDown,
  ExternalLink,
  ShieldAlert,
  Info,
  ArrowRight,
  Compass
} from 'lucide-react';
import { FormExplanationResult, FormField, Language } from '../types';
import { translations } from '../data/translations';
import { sampleForms } from '../data/sampleForms';
import { explainFormApi, speakText, stopSpeaking } from '../services/api';
import { useApp } from '../context/AppContext';

import { CertificateIndicatorBanner } from './CertificateIndicatorBanner';
import { supportedCertificates } from '../data/certificateData';

interface FormExplainerViewProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
  onAskFollowUp: (formContext: FormExplanationResult, questionText?: string) => void;
}

export const FormExplainerView: React.FC<FormExplainerViewProps> = ({
  onAskFollowUp,
}) => {
  const {
    selectedLanguage,
    selectedCertificate,
    setSelectedCertificate,
    allCertificates,
    formExplainerState,
    setFormExplainerState,
    resetFormExplainer,
    setConversationFormContext,
    setDashboardTab,
  } = useApp();

  const lang = selectedLanguage;
  const t = translations[lang];
  const [syncNotice, setSyncNotice] = useState<{
    certId: string;
    previousCertId?: string;
  } | null>(null);

  // In-memory preview image for current session
  const [selectedImage, setSelectedImage] = useState<string | null>(
    () => formExplainerState.metadata?.previewSvg || null
  );
  const [selectedFileName, setSelectedFileName] = useState<string>(
    () => formExplainerState.metadata?.name || ''
  );
  const [mimeType, setMimeType] = useState<string>(
    () => formExplainerState.metadata?.mimeType || 'image/jpeg'
  );
  const [userNote, setUserNote] = useState<string>(
    () => formExplainerState.userNote || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [explanationResult, setExplanationResult] = useState<FormExplanationResult | null>(
    () => formExplainerState.result || null
  );
  const [activeSpeakingFieldId, setActiveSpeakingFieldId] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize if context changes externally
  useEffect(() => {
    if (formExplainerState.result) {
      setExplanationResult(formExplainerState.result);
    }
    if (formExplainerState.metadata?.previewSvg && !selectedImage) {
      setSelectedImage(formExplainerState.metadata.previewSvg);
    }
  }, [formExplainerState]);

  // Robust certificate type detection based on multimodal signals
  const detectCertificateType = (params: {
    sampleId?: string;
    formTitle?: string;
    apparentPurpose?: string;
    authorityOrDepartment?: string;
    fields?: FormField[];
    fileName?: string;
    userNote?: string;
  }): string | null => {
    if (params.sampleId && allCertificates[params.sampleId]) {
      return params.sampleId;
    }

    const combined = [
      params.formTitle || '',
      params.apparentPurpose || '',
      params.authorityOrDepartment || '',
      params.fileName || '',
      params.userNote || '',
      ...(params.fields || []).map((f) => `${f.originalLabel} ${f.simplifiedLabel} ${f.explanation}`)
    ].join(' ').toLowerCase();

    // 1. Caste Certificate
    if (
      combined.includes('जात') ||
      combined.includes('जातीचे') ||
      combined.includes('जातीचा') ||
      combined.includes('जाति') ||
      combined.includes('caste') ||
      combined.includes('अनुसूचित') ||
      combined.includes('ओबीसी') ||
      combined.includes('obc') ||
      combined.includes('sc') ||
      combined.includes('st') ||
      combined.includes('vjnt') ||
      combined.includes('sbc') ||
      combined.includes('कुणबी') ||
      combined.includes('वंशावळ') ||
      combined.includes('social justice') ||
      combined.includes('सामाजिक न्याय')
    ) {
      return 'caste_cert';
    }

    // 2. Ration Card
    if (
      combined.includes('राशन') ||
      combined.includes('रेशन') ||
      combined.includes('ration') ||
      combined.includes('शिधापत्रिका') ||
      combined.includes('अन्नधान्य') ||
      combined.includes('nfsa') ||
      combined.includes('food supply')
    ) {
      return 'ration_card';
    }

    // 3. Domicile
    if (
      combined.includes('अधिवास') ||
      combined.includes('डोमिसाईल') ||
      combined.includes('domicile') ||
      combined.includes('निवास') ||
      combined.includes('रहिवासी') ||
      combined.includes('वय व अधिवास')
    ) {
      return 'domicile_cert';
    }

    // 4. Scholarship
    if (
      combined.includes('शिष्यवृत्ती') ||
      combined.includes('छात्रवृत्ति') ||
      combined.includes('scholarship') ||
      combined.includes('nsp')
    ) {
      return 'scholarship_nsp';
    }

    // 5. Non-Creamy Layer
    if (
      combined.includes('नॉन क्रिमिलेअर') ||
      combined.includes('non-creamy') ||
      combined.includes('non creamy') ||
      combined.includes('उन्नत व प्रगत')
    ) {
      return 'non_creamy_layer';
    }

    // 6. EWS
    if (
      combined.includes('आर्थिक दुर्बल') ||
      combined.includes('ईडब्ल्यूएस') ||
      combined.includes('economically weaker') ||
      combined.includes('ews')
    ) {
      return 'ews_cert';
    }

    // 7. Birth Certificate
    if (
      combined.includes('जन्म प्रमाणपत्र') ||
      combined.includes('जन्म नोंद') ||
      combined.includes('birth certificate')
    ) {
      return 'birth_cert';
    }

    // 8. Income Certificate
    if (
      combined.includes('उत्पन्न') ||
      combined.includes('वार्षिक उत्पन्न') ||
      combined.includes('आय प्रमाण') ||
      combined.includes('income') ||
      combined.includes('तहसीलदार उत्पन्न') ||
      combined.includes('तलाठी अहवाल')
    ) {
      return 'income_cert';
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    setErrorMsg(null);
    setSelectedFileName(file.name);

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Unsupported file type. Please upload a PNG, JPEG, or WebP image.');
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 10 MB. Please upload a smaller photograph.');
      return;
    }

    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setSelectedImage(dataUrl);
      setExplanationResult(null);

      // Save metadata to persistent store
      setFormExplainerState({
        result: null,
        metadata: {
          name: file.name,
          size: file.size,
          mimeType: file.type,
          isSample: false,
          analyzedAt: Date.now(),
        },
        userNote,
      });
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read the selected file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async (sampleId?: string) => {
    if (!selectedImage && !sampleId) {
      setErrorMsg('Please upload an image or select a sample form.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    stopSpeaking();

    try {
      const result = await explainFormApi({
        imageBase64: selectedImage || undefined,
        mimeType,
        language: lang,
        userNote: userNote.trim() || undefined,
        sampleFormId: sampleId,
      });

      setExplanationResult(result);

      // Detect Certificate Type from all available multimodal signals
      const detectedCert = detectCertificateType({
        sampleId,
        formTitle: result.formTitle,
        apparentPurpose: result.apparentPurpose,
        authorityOrDepartment: result.authorityOrDepartment,
        fields: result.fields,
        fileName: selectedFileName,
        userNote,
      });

      const previousCert = selectedCertificate;
      const targetCert = detectedCert && allCertificates[detectedCert] ? detectedCert : selectedCertificate;

      // Persist results directly into target certificate workflow!
      setFormExplainerState({
        result,
        metadata: {
          name: formExplainerState.metadata?.name || (sampleId ? 'Sample Form' : (selectedFileName || 'Uploaded Form')),
          mimeType,
          isSample: !!sampleId,
          sampleId,
          previewSvg: sampleId ? sampleForms.find(s => s.id === sampleId)?.thumbnailSvg : undefined,
          analyzedAt: Date.now(),
        },
        userNote: userNote.trim(),
      }, targetCert);

      // Pass context to voice assistant
      setConversationFormContext(result);

      // Synchronize active certificate so Guided Preparation and Document Checklist immediately align!
      if (targetCert !== selectedCertificate) {
        setSelectedCertificate(targetCert);
        setSyncNotice({
          certId: targetCert,
          previousCertId: previousCert,
        });
      } else {
        setSyncNotice({
          certId: targetCert,
        });
      }
    } catch (err: any) {
      console.error('Error during form explanation:', err);
      setErrorMsg(err.message || 'Unable to analyze form. Please check your network or try another image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sampleId: string) => {
    const sample = sampleForms.find((s) => s.id === sampleId);
    if (sample) {
      setSelectedImage(sample.thumbnailSvg);
      setMimeType('image/svg+xml');
      setExplanationResult(sample.explanation);
      setErrorMsg(null);

      const previousCert = selectedCertificate;
      const targetCert = allCertificates[sample.id] ? sample.id : selectedCertificate;

      // Save directly to the sample certificate's workflow
      setFormExplainerState({
        result: sample.explanation,
        metadata: {
          isSample: true,
          sampleId: sample.id,
          name: sample.title[lang],
          previewSvg: sample.thumbnailSvg,
          analyzedAt: Date.now(),
        },
        userNote: '',
      }, targetCert);

      setConversationFormContext(sample.explanation);

      // Auto-switch selected certificate
      if (targetCert !== selectedCertificate) {
        setSelectedCertificate(targetCert);
        setSyncNotice({
          certId: targetCert,
          previousCertId: previousCert,
        });
      } else {
        setSyncNotice({
          certId: targetCert,
        });
      }
    }
  };

  const handleClearAnalysis = () => {
    resetFormExplainer();
    setSelectedImage(null);
    setExplanationResult(null);
    setUserNote('');
    setErrorMsg(null);
    stopSpeaking();
    setShowClearConfirm(false);
  };

  const handleReadAloudField = (field: FormField) => {
    if (activeSpeakingFieldId === field.id) {
      stopSpeaking();
      setActiveSpeakingFieldId(null);
      return;
    }

    const textToSpeak = `${field.simplifiedLabel}. ${field.explanation}. ${
      field.caution ? `सावधगिरी: ${field.caution}` : ''
    }`;

    speakText(
      textToSpeak,
      lang,
      () => setActiveSpeakingFieldId(field.id),
      () => setActiveSpeakingFieldId(null),
      () => setActiveSpeakingFieldId(null)
    );
  };

  const handleReadOverview = () => {
    if (!explanationResult) return;

    if (activeSpeakingFieldId === 'overview') {
      stopSpeaking();
      setActiveSpeakingFieldId(null);
      return;
    }

    const overviewText = `${explanationResult.formTitle}. ${explanationResult.overallSummary}`;
    speakText(
      overviewText,
      lang,
      () => setActiveSpeakingFieldId('overview'),
      () => setActiveSpeakingFieldId(null),
      () => setActiveSpeakingFieldId(null)
    );
  };

  const handleCopyExplanation = () => {
    if (!explanationResult) return;

    let text = `--- ${explanationResult.formTitle} ---\n`;
    text += `Purpose: ${explanationResult.apparentPurpose}\n\n`;
    text += `Summary: ${explanationResult.overallSummary}\n\n`;
    text += `FIELDS:\n`;
    explanationResult.fields.forEach((f, i) => {
      text += `${i + 1}. ${f.simplifiedLabel} (${f.originalLabel})\n   Explanation: ${f.explanation}\n   Example: ${f.fictionalExample}\n   Caution: ${f.caution}\n\n`;
    });
    if (explanationResult.requiredDocuments?.length) {
      text += `REQUIRED DOCUMENTS:\n`;
      explanationResult.requiredDocuments.forEach((d) => (text += `- ${d}\n`));
    }

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Shared Certificate Workspace Indicator */}
      <CertificateIndicatorBanner />

      {/* Auto-Synchronized Certificate Notification */}
      {syncNotice && (allCertificates[syncNotice.certId] || supportedCertificates[syncNotice.certId]) && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3 shadow-xs">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-extrabold text-sm text-emerald-900 block">
                {lang === 'mr'
                  ? `✓ ${(allCertificates[syncNotice.certId] || supportedCertificates[syncNotice.certId])?.info.title[lang]} ओळखले गेले!`
                  : lang === 'hi'
                  ? `✓ ${(allCertificates[syncNotice.certId] || supportedCertificates[syncNotice.certId])?.info.title[lang]} पहचाना गया!`
                  : `✓ ${(allCertificates[syncNotice.certId] || supportedCertificates[syncNotice.certId])?.info.title[lang]} Detected!`}
              </span>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {lang === 'mr'
                  ? `हा अर्ज "${(allCertificates[syncNotice.certId] || supportedCertificates[syncNotice.certId])?.info.title[lang]}" चा आहे. तुमचे संपूर्ण ॲप कार्यक्षेत्र (मार्गदर्शनाची तयारी, आवश्यक कागदपत्र चेकलिस्ट आणि आवाज सहाय्यक) या दाखल्यावर थेट सिंक्रोनाइझ केले आहे.`
                  : lang === 'hi'
                  ? `यह फॉर्म "${(allCertificates[syncNotice.certId] || supportedCertificates[syncNotice.certId])?.info.title[lang]}" का है। आपका पूरा कार्यक्षेत्र (मार्गदर्शन तैयारी, आवश्यक दस्तावेज चेकलिस्ट और वॉयस असिस्टेंट) इस प्रमाण पत्र पर स्वचालित रूप से संरेखित हो गया है।`
                  : `This form belongs to "${(allCertificates[syncNotice.certId] || supportedCertificates[syncNotice.certId])?.info.title[lang]}". Your entire workspace (Guided Preparation, Document Checklist, and Voice Assistant) is now synchronized with this certificate.`}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pl-8">
            <button
              onClick={() => setDashboardTab('wizard')}
              className="px-3.5 py-1.5 rounded-xl bg-[#16834A] hover:bg-[#105C38] text-white text-xs font-bold transition-all cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
            >
              <span>{lang === 'mr' ? 'मार्गदर्शनाची तयारी उघडा' : lang === 'hi' ? 'तैयारी शुरू करें' : 'Open Guided Preparation'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDashboardTab('checklist')}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100/50 text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{lang === 'mr' ? 'कागदपत्रांची पडताळणी पहा' : lang === 'hi' ? 'दस्तावेज चेकलिस्ट देखें' : 'View Document Checklist'}</span>
            </button>
            {syncNotice.previousCertId && allCertificates[syncNotice.previousCertId] && syncNotice.previousCertId !== syncNotice.certId && (
              <button
                onClick={() => {
                  setSelectedCertificate(syncNotice.previousCertId!);
                  setSyncNotice(null);
                }}
                className="px-3 py-1.5 rounded-xl border border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-medium cursor-pointer"
              >
                {lang === 'mr'
                  ? `मागील दाखल्यावर परत जा (${allCertificates[syncNotice.previousCertId].info.title[lang]})`
                  : `Revert to ${allCertificates[syncNotice.previousCertId].info.title[lang]}`}
              </button>
            )}
            <button
              onClick={() => setSyncNotice(null)}
              className="px-2.5 py-1 rounded-xl text-emerald-700 hover:text-emerald-900 text-xs font-medium cursor-pointer"
            >
              ✕ {lang === 'mr' ? 'बंद करा' : 'Dismiss'}
            </button>
          </div>
        </div>
      )}

      {/* Direct Active Certificate Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E2EAE3] shadow-2xs">
        <div className="flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-[#16834A]" />
          <span className="text-xs font-bold text-[#17231C]">
            {lang === 'mr' ? 'सध्या जोडलेला दाखला / योजना:' : lang === 'hi' ? 'संबद्ध प्रमाण पत्र / योजना:' : 'Active Form Target:'}
          </span>
          <span className="text-xs font-extrabold text-[#16834A] bg-[#F0F8F2] px-2.5 py-1 rounded-lg border border-[#16834A]/20">
            {allCertificates[selectedCertificate]?.info.title[lang] || 'Selected Certificate'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#68756C]">
            {lang === 'mr' ? 'दाखला बदला:' : lang === 'hi' ? 'बदलें:' : 'Switch:'}
          </span>
          <select
            value={selectedCertificate}
            onChange={(e) => setSelectedCertificate(e.target.value)}
            className="text-xs font-semibold bg-[#F0F8F2] text-[#17231C] border border-[#E2EAE3] rounded-xl px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-[#16834A] cursor-pointer"
          >
            {Object.values(allCertificates).map((c) => (
              <option key={c.info.id} value={c.info.id}>
                {c.info.title[lang]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20">
              Multimodal Form Vision
            </span>
            <span className="text-xs font-medium text-[#68756C]">
              {lang === 'mr' ? 'मराठी स्पष्टीकरण' : lang === 'hi' ? 'हिंदी स्पष्टीकरण' : 'English Explanations'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C]">
            {t.explainer.title}
          </h2>
          <p className="text-sm text-[#68756C] max-w-2xl">
            {t.explainer.subtitle}
          </p>
        </div>

        {explanationResult && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'नवीन फॉर्म स्कॅन करा' : lang === 'hi' ? 'नया फॉर्म स्कैन करें' : 'Scan New Form'}</span>
          </button>
        )}
      </div>

      {/* Upload & Preview Card */}
      <div className="bg-white rounded-3xl border border-[#E2EAE3] p-6 sm:p-8 shadow-xs space-y-6">
        {!selectedImage && !explanationResult ? (
          /* Dropzone */
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-[#16834A] bg-[#F0F8F2]'
                : 'border-[#CBD5E1] hover:border-[#16834A] bg-[#FAFCFA]'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F0F8F2] text-[#16834A] flex items-center justify-center mx-auto border border-[#E2EAE3]">
                <Upload className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#17231C]">
                  {t.explainer.uploadAreaTitle}
                </h3>
                <p className="text-xs text-[#68756C] mt-1">
                  {t.explainer.uploadAreaSubtitle}
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#16834A] hover:bg-[#105C38] shadow-xs">
                  <Camera className="w-4 h-4" />
                  {t.explainer.uploadButtonText}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Image Preview & Controls */
          <div className="space-y-4">
            {selectedImage ? (
              <div className="relative rounded-2xl border border-[#E2EAE3] overflow-hidden bg-[#FAFCFA] max-h-[380px] flex items-center justify-center p-2">
                <img
                  src={selectedImage}
                  alt="Uploaded form preview"
                  className="max-h-[350px] w-auto object-contain rounded-xl shadow-xs"
                />
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-rose-700 rounded-full shadow-md border border-[#E2EAE3] cursor-pointer"
                  title={t.explainer.buttonRemove}
                  aria-label={t.explainer.buttonRemove}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#F0F8F2] border border-[#16834A]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#16834A]" />
                  <div>
                    <span className="text-xs font-bold text-[#17231C]">
                      {formExplainerState.metadata?.name || 'Saved Form Analysis'}
                    </span>
                    <span className="block text-[11px] text-[#68756C]">
                      {lang === 'mr' ? 'मागील विश्लेषणाचे निकाल खाली उपलब्ध आहेत' : lang === 'hi' ? 'पूर्व विश्लेषण परिणाम नीचे उपलब्ध हैं' : 'Saved analysis restored'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-[#16834A] hover:underline cursor-pointer"
                >
                  {lang === 'mr' ? 'दुसरा फोटो अपलोड करा' : lang === 'hi' ? 'दूसरा फोटो अपलोड करें' : 'Upload Different Photo'}
                </button>
              </div>
            )}

            {/* Optional question / focus note */}
            <div className="space-y-2">
              <label htmlFor="user-note" className="block text-xs font-semibold text-[#17231C]">
                Do you have a specific question about this form? (Optional)
              </label>
              <input
                id="user-note"
                type="text"
                value={userNote}
                onChange={(e) => {
                  setUserNote(e.target.value);
                  setFormExplainerState({ userNote: e.target.value });
                }}
                placeholder="e.g. Which fields must be signed? What is the income limit?"
                className="w-full text-sm bg-white border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-[#17231C] placeholder-[#94A3B8] focus:border-[#16834A] focus:outline-hidden"
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold text-[#68756C] hover:text-[#17231C] underline cursor-pointer"
              >
                {t.explainer.buttonChangeImage}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />

              <button
                onClick={() => handleAnalyze()}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white bg-[#16834A] hover:bg-[#105C38] disabled:opacity-50 active:scale-98 transition-all shadow-sm cursor-pointer ml-auto"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.explainer.analyzingState}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{explanationResult ? (lang === 'mr' ? 'पुन्हा विश्लेषण करा' : lang === 'hi' ? 'पुनः विश्लेषण करें' : 'Re-analyze Form') : t.explainer.buttonAnalyze}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Error message if any */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Instant Sample Forms if no results yet */}
      {!explanationResult && !selectedImage && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#16834A]" />
            <h3 className="text-sm font-bold text-[#17231C]">
              {t.explainer.orChooseSample}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sampleForms.map((sf) => (
              <button
                key={sf.id}
                onClick={() => handleSelectSample(sf.id)}
                className="p-5 rounded-2xl bg-white border border-[#E2EAE3] hover:border-[#16834A] hover:bg-[#F0F8F2]/30 transition-all text-left space-y-2 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#105C38] uppercase bg-[#F0F8F2] px-2 py-0.5 rounded-full border border-[#16834A]/20">
                    {sf.department.split(',')[0]}
                  </span>
                  <span className="text-xs font-bold text-[#16834A] group-hover:underline">
                    Load & Explain →
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#17231C]">
                  {sf.title[lang]}
                </h4>
                <p className="text-xs text-[#68756C] line-clamp-2">
                  {sf.description[lang]}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Section */}
      {explanationResult && (
        <div className="space-y-6 animate-fade-in">
          {/* Form Overview Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#16834A]/20 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20">
                Form Identified
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReadOverview}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F0F8F2] hover:bg-[#E2EAE3] text-[#105C38] border border-[#16834A]/20 cursor-pointer"
                >
                  {activeSpeakingFieldId === 'overview' ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                      <span>{t.explainer.stopSpeaking}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#16834A]" />
                      <span>{t.explainer.readAloud}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleCopyExplanation}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F0F8F2] hover:bg-[#E2EAE3] text-[#105C38] border border-[#16834A]/20 cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#16834A]" />
                      <span>{t.explainer.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#16834A]" />
                      <span>{t.explainer.copyText}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#17231C]">
                {explanationResult.formTitle}
              </h3>
              {explanationResult.authorityOrDepartment && (
                <p className="text-xs font-medium text-[#105C38]">
                  {explanationResult.authorityOrDepartment}
                </p>
              )}
            </div>

            <p className="text-sm text-[#17231C] leading-relaxed bg-[#F0F8F2] p-4 rounded-2xl border border-[#16834A]/10">
              {explanationResult.overallSummary}
            </p>

            {/* Cross-Workflow Navigation Actions */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => onAskFollowUp(explanationResult, `मला या फॉर्मबद्दल विचारायचे आहे: "${explanationResult.formTitle}"`)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#16834A] hover:bg-[#105C38] cursor-pointer shadow-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.explainer.askFollowUp}</span>
              </button>

              <button
                onClick={() => setDashboardTab('wizard')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#105C38] bg-[#F0F8F2] hover:bg-[#E2EAE3] border border-[#16834A]/25 cursor-pointer transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-[#16834A]" />
                <span>{lang === 'mr' ? 'मार्गदर्शनाची तयारी करा' : lang === 'hi' ? 'मार्गदर्शन तैयारी' : 'Start Guided Prep'}</span>
                <ArrowRight className="w-3 h-3 text-[#16834A]" />
              </button>

              <button
                onClick={() => setDashboardTab('checklist')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#105C38] bg-[#F0F8F2] hover:bg-[#E2EAE3] border border-[#16834A]/25 cursor-pointer transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16834A]" />
                <span>{lang === 'mr' ? 'कागदपत्र चेकलिस्ट' : lang === 'hi' ? 'दस्तावेज चेकलिस्ट' : 'Document Checklist'}</span>
              </button>
            </div>
          </div>

          {/* Field Explanations List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#17231C] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#16834A]" />
                <span>Field-by-Field Simple Guidance ({explanationResult.fields.length} Fields)</span>
              </h3>
            </div>

            <div className="space-y-3">
              {explanationResult.fields.map((field, idx) => {
                const isSpeakingThis = activeSpeakingFieldId === field.id;
                return (
                  <div
                    key={field.id || idx}
                    className="p-5 rounded-2xl bg-white border border-[#E2EAE3] hover:border-[#16834A]/50 transition-all space-y-3 shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="w-6 h-6 rounded-full bg-[#16834A] text-white flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <h4 className="font-extrabold text-sm sm:text-base text-[#17231C]">
                            {field.simplifiedLabel}
                          </h4>
                          {field.isRequired && (
                            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#68756C] font-medium pl-8">
                          Original Label: <span className="text-[#17231C] italic">{field.originalLabel}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => handleReadAloudField(field)}
                        className={`p-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                          isSpeakingThis
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-[#F0F8F2] text-[#105C38] border-[#16834A]/20 hover:bg-[#E2EAE3]'
                        }`}
                        title={isSpeakingThis ? t.explainer.stopSpeaking : t.explainer.readAloud}
                      >
                        {isSpeakingThis ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="pl-8 space-y-2">
                      <p className="text-xs sm:text-sm text-[#17231C] leading-relaxed">
                        {field.explanation}
                      </p>

                      {/* Fictional example */}
                      {field.fictionalExample && (
                        <div className="p-3 rounded-xl bg-[#FAFCFA] border border-[#E2EAE3] text-xs text-[#17231C]">
                          <span className="font-bold text-[#105C38] block text-[11px] uppercase tracking-wider mb-0.5">
                            {t.explainer.exampleTitle}:
                          </span>
                          <span>{field.fictionalExample}</span>
                        </div>
                      )}

                      {/* Caution if any */}
                      {field.caution && (
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>{t.explainer.cautionTitle}:</strong> {field.caution}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Required Documents Listed on Form */}
          {explanationResult.requiredDocuments && explanationResult.requiredDocuments.length > 0 && (
            <div className="p-6 rounded-3xl bg-white border border-[#E2EAE3] shadow-xs space-y-3">
              <h3 className="text-base font-bold text-[#17231C] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16834A]" />
                <span>Documents Mentioned in Form</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#17231C]">
                {explanationResult.requiredDocuments.map((doc, i) => (
                  <li key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F0F8F2] border border-[#16834A]/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16834A] shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Official Verification Notices */}
          {explanationResult.importantVerificationNotes && explanationResult.importantVerificationNotes.length > 0 && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Official Processing Verification Notes</span>
              </div>
              <ul className="space-y-1 list-disc list-inside">
                {explanationResult.importantVerificationNotes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal to Clear / Scan New Form */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E2EAE3] shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#17231C]">
              {lang === 'mr' ? 'नवीन फॉर्म स्कॅन करायचा आहे का?' : lang === 'hi' ? 'क्या आप नया फॉर्म स्कैन करना चाहते हैं?' : 'Clear Current Analysis?'}
            </h3>
            <p className="text-xs text-[#68756C] leading-relaxed">
              {lang === 'mr'
                ? 'हे केल्याने सध्याचा फॉर्म डेटा साफ होईल आणि तुम्ही नवीन फोटो अपलोड करू शकता.'
                : lang === 'hi'
                ? 'इससे वर्तमान फॉर्म डेटा साफ हो जाएगा और आप एक नया फोटो अपलोड कर सकते हैं।'
                : 'This will clear the current form analysis so you can scan or upload a new application.'}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#68756C] hover:bg-[#F0F8F2] cursor-pointer"
              >
                {lang === 'mr' ? 'रद्द करा' : lang === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={handleClearAnalysis}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer shadow-xs"
              >
                {lang === 'mr' ? 'होय, नवीन स्कॅन करा' : lang === 'hi' ? 'हाँ, नया स्कैन करें' : 'Clear & Scan New'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
