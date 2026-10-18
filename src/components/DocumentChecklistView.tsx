import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Printer,
  ShieldCheck,
  Check,
  Filter,
  FileCheck2,
  Calendar,
  RotateCcw,
  HelpCircle,
  ShieldAlert,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { useApp } from '../context/AppContext';
import { supportedCertificates } from '../data/certificateData';
import { CertificateIndicatorBanner } from './CertificateIndicatorBanner';

interface DocumentChecklistViewProps {
  currentLang?: Language;
}

export const DocumentChecklistView: React.FC<DocumentChecklistViewProps> = ({ currentLang: propLang }) => {
  const {
    selectedLanguage,
    selectedCertificate,
    allCertificates,
    selectedState,
    selectedDistrict,
    checklistItems,
    toggleChecklistItem,
    resetChecklist,
  } = useApp();

  const lang = propLang || selectedLanguage;
  const t = translations[lang];

  const [filterType, setFilterType] = useState<'all' | 'required' | 'missing' | 'available'>('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const certData = allCertificates[selectedCertificate] || allCertificates.income_cert || supportedCertificates.income_cert;
  const certTitle = certData.info.title[lang];

  // Summary counts
  const totalCount = checklistItems.length;
  const availableCount = checklistItems.filter((i) => i.checked).length;
  const missingCount = checklistItems.filter((i) => !i.checked && i.requirementType === 'required').length;
  const verificationCount = checklistItems.filter(
    (i) => (!i.checked && i.requirementType === 'verification') || !i.isOfficiallyVerified
  ).length;

  const progressPercent = totalCount > 0 ? Math.round((availableCount / totalCount) * 100) : 0;

  const filteredItems = checklistItems.filter((item) => {
    if (filterType === 'required') return item.requirementType === 'required';
    if (filterType === 'missing') return !item.checked;
    if (filterType === 'available') return item.checked;
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleConfirmReset = () => {
    resetChecklist();
    setShowClearConfirm(false);
  };

  const getStatusBadge = (item: typeof checklistItems[0]) => {
    if (item.checked) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          <Check className="w-3 h-3 text-emerald-600" />
          {lang === 'mr' ? 'उपलब्ध आहे (Available)' : lang === 'hi' ? 'उपलब्ध (Available)' : 'Available'}
        </span>
      );
    }

    if (item.requirementType === 'verification') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
          <AlertCircle className="w-3 h-3 text-amber-600" />
          {lang === 'mr' ? 'पडताळणी आवश्यक (Needs Verification)' : lang === 'hi' ? 'पुष्टि आवश्यक (Needs Verification)' : 'Needs Verification'}
        </span>
      );
    }

    if (item.requirementType === 'conditional') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
          <Info className="w-3 h-3 text-sky-600" />
          {lang === 'mr' ? 'सशर्त / लागू असल्यास (Conditional)' : lang === 'hi' ? 'सशर्त (Conditional)' : 'Conditional'}
        </span>
      );
    }

    if (item.requirementType === 'optional') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
          {lang === 'mr' ? 'ऐच्छिक (Optional)' : lang === 'hi' ? 'वैकल्पिक (Optional)' : 'Optional'}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
        <AlertCircle className="w-3 h-3 text-rose-600" />
        {lang === 'mr' ? 'अपूर्ण / आवश्यक (Missing)' : lang === 'hi' ? 'अपूर्ण (Missing)' : 'Missing'}
      </span>
    );
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
              Verified Checklist • {selectedState.split(' ')[0]}
            </span>
            <span className="text-xs font-medium text-[#68756C]">
              {certData.info.department[lang]}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C]">
            {lang === 'mr' ? `तयारी: ${certTitle}` : lang === 'hi' ? `तैयारी: ${certTitle}` : `Preparing for: ${certTitle}`}
          </h2>
          <p className="text-sm text-[#68756C] max-w-xl">
            {lang === 'mr'
              ? 'हे कागदपत्रे संबंधित शासकीय नियमावलीनुसार तपासलेली आहेत. तुमच्याकडे असलेल्या कागदपत्रांवर टिकमार्क करा.'
              : lang === 'hi'
              ? 'यह दस्तावेज सूची सरकारी नियमों के अनुसार सत्यापित है। जो दस्तावेज तैयार हैं उन पर टिक करें।'
              : 'Official statutory document requirements for this specific certificate. Check off the documents you have ready.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {availableCount > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#68756C] hover:text-rose-700 bg-white hover:bg-rose-50 border border-[#E2EAE3] hover:border-rose-200 cursor-pointer transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'mr' ? 'खूणा साफ करा' : lang === 'hi' ? 'चेक हटाएं' : 'Reset Checks'}</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#105C38] bg-white hover:bg-[#F0F8F2] border border-[#E2EAE3] cursor-pointer shadow-2xs"
          >
            <Printer className="w-4 h-4 text-[#16834A]" />
            <span>{t.checklist.printList}</span>
          </button>
        </div>
      </div>

      {/* Completion Summary Card */}
      <div className="bg-white rounded-3xl border border-[#E2EAE3] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-[#105C38]">
            {availableCount} of {totalCount} documents marked available ({progressPercent}%)
          </span>
          <span className="text-[#68756C]">
            {availableCount === totalCount
              ? lang === 'mr' ? 'सर्व कागदपत्रे तयार आहेत!' : lang === 'hi' ? 'सभी दस्तावेज तैयार हैं!' : 'All documents ready!'
              : lang === 'mr' ? `${missingCount} कागदपत्रे अद्याप बाकी आहेत` : `${missingCount} documents still missing`}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#E2EAE3] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#16834A] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Three-Metric Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-left space-y-0.5">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              {lang === 'mr' ? 'उपलब्ध कागदपत्रे' : lang === 'hi' ? 'उपलब्ध दस्तावेज' : 'Documents Available'}
            </span>
            <span className="text-xl font-extrabold text-emerald-900">{availableCount}</span>
            <p className="text-[10px] text-emerald-700">Ready for scan and submission</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 text-left space-y-0.5">
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
              {lang === 'mr' ? 'अपूर्ण / आवश्यक' : lang === 'hi' ? 'अपूर्ण दस्तावेज' : 'Documents Missing'}
            </span>
            <span className="text-xl font-extrabold text-rose-900">{missingCount}</span>
            <p className="text-[10px] text-rose-700">Mandatory proofs not yet checked</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-left space-y-0.5">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
              {lang === 'mr' ? 'पडताळणी आवश्यक' : lang === 'hi' ? 'स्थानीय पुष्टि आवश्यक' : 'Needs Verification'}
            </span>
            <span className="text-xl font-extrabold text-amber-900">{verificationCount}</span>
            <p className="text-[10px] text-amber-700">Conditional or requires local tahsil check</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold text-[#68756C]">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
            filterType === 'all'
              ? 'bg-[#16834A] text-white shadow-2xs'
              : 'bg-white hover:bg-[#F0F8F2] text-[#17231C] border border-[#E2EAE3]'
          }`}
        >
          {lang === 'mr' ? `सर्व (${totalCount})` : lang === 'hi' ? `सभी (${totalCount})` : `All (${totalCount})`}
        </button>

        <button
          onClick={() => setFilterType('required')}
          className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
            filterType === 'required'
              ? 'bg-[#16834A] text-white shadow-2xs'
              : 'bg-white hover:bg-[#F0F8F2] text-[#17231C] border border-[#E2EAE3]'
          }`}
        >
          {lang === 'mr' ? 'अनिवार्य (Mandatory)' : lang === 'hi' ? 'अनिवार्य (Mandatory)' : 'Mandatory'}
        </button>

        <button
          onClick={() => setFilterType('missing')}
          className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
            filterType === 'missing'
              ? 'bg-[#16834A] text-white shadow-2xs'
              : 'bg-white hover:bg-[#F0F8F2] text-[#17231C] border border-[#E2EAE3]'
          }`}
        >
          {lang === 'mr' ? `अपूर्ण (${missingCount})` : lang === 'hi' ? `अपूर्ण (${missingCount})` : `Missing (${missingCount})`}
        </button>

        <button
          onClick={() => setFilterType('available')}
          className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
            filterType === 'available'
              ? 'bg-[#16834A] text-white shadow-2xs'
              : 'bg-white hover:bg-[#F0F8F2] text-[#17231C] border border-[#E2EAE3]'
          }`}
        >
          {lang === 'mr' ? `उपलब्ध (${availableCount})` : lang === 'hi' ? `उपलब्ध (${availableCount})` : `Available (${availableCount})`}
        </button>
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border transition-all ${
                item.checked
                  ? 'bg-white border-[#16834A]/40 shadow-xs'
                  : 'bg-white border-[#E2EAE3] hover:border-[#16834A]/30'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 cursor-pointer transition-colors border ${
                    item.checked
                      ? 'bg-[#16834A] border-[#16834A] text-white shadow-2xs'
                      : 'border-[#68756C]/40 hover:border-[#16834A] bg-[#F0F8F2]'
                  }`}
                  aria-label={`Toggle ${item.title[lang]}`}
                >
                  {item.checked && <Check className="w-4 h-4 text-white stroke-[3]" />}
                </button>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-[#17231C]">
                        {item.title[lang]}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div>{getStatusBadge(item)}</div>
                  </div>

                  {/* Simple Explanation */}
                  <p className="text-xs sm:text-sm text-[#17231C] leading-relaxed">
                    {item.description[lang]}
                  </p>

                  {/* Why it may be needed */}
                  {item.whyNeeded && (
                    <div className="p-3 rounded-2xl bg-[#F0F8F2]/70 border border-[#16834A]/15 text-xs text-[#105C38] flex items-start gap-2">
                      <HelpCircle className="w-3.5 h-3.5 text-[#16834A] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">
                          {lang === 'mr' ? 'हे कागदपत्र का लागते? ' : lang === 'hi' ? 'यह दस्तावेज क्यों आवश्यक है? ' : 'Why is this needed? '}
                        </span>
                        <span>{item.whyNeeded[lang]}</span>
                      </div>
                    </div>
                  )}

                  {/* Verification Source & Official Portal Link */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#E2EAE3]/70 text-[11px] text-[#68756C]">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#16834A]" />
                      <span>
                        {lang === 'mr' ? 'पडताळणी स्रोत: ' : lang === 'hi' ? 'सत्यापन स्रोत: ' : 'Source: '}
                        <strong className="text-[#17231C]">{item.officialAuthority || 'State Revenue Guidelines'}</strong>
                      </span>
                      {item.lastVerifiedDate && (
                        <span>({item.lastVerifiedDate})</span>
                      )}
                    </div>

                    {item.officialPortalUrl && (
                      <a
                        href={item.officialPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16834A] hover:underline"
                      >
                        <span>{lang === 'mr' ? 'अधिकृत पोर्टल तपासा' : lang === 'hi' ? 'आधिकारिक पोर्टल देखें' : 'Official Portal'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Disclaimer Card */}
      <div className="p-4 rounded-3xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">
            {lang === 'mr' ? 'कायदेशीर व शासकीय पडताळणी सूचना' : lang === 'hi' ? 'विधिक एवं सरकारी सत्यापन सूचना' : 'Official Statutory Disclaimer'}
          </span>
          <p className="leading-relaxed text-amber-800">
            {lang === 'mr'
              ? 'ही कागदपत्रांची यादी संबंधित राज्य शासनाच्या राजपत्रांनुसार व अधिकृत पोर्टल्सनुसार तयार केलेली आहे. स्थानिक तहसील कार्यालयातील उपविभागीय अधिकारी किंवा तलाठी विशिष्ट परिस्थितीनुसार अतिरिक्त पुरावे मागू शकतात.'
              : lang === 'hi'
              ? 'यह दस्तावेज सूची आधिकारिक राज्य गजट और ई-डिस्ट्रिक्ट नियमों पर आधारित है। स्थानीय आवश्यकतानुसार तहसीलदार अतिरिक्त शपथ पत्र या जांच रिपोर्ट मांग सकते हैं।'
              : 'This checklist is compiled strictly from official state revenue gazettes and citizen service rules. Local Tahsildars may request supplementary affidavits or field verification reports depending on individual circumstances.'}
          </p>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-[#E2EAE3] shadow-2xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="font-extrabold text-base text-[#17231C]">
                {lang === 'mr' ? 'सर्व खूणा साफ करायच्या?' : lang === 'hi' ? 'सभी चेक हटाएं?' : 'Reset All Checkmarks?'}
              </h4>
              <p className="text-xs text-[#68756C]">
                {lang === 'mr'
                  ? `यामुळे "${certTitle}" साठी केलेले टिकमार्क काढून टाकले जातील.`
                  : `This will reset all checked documents for "${certTitle}".`}
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
                {lang === 'mr' ? 'हो, साफ करा' : lang === 'hi' ? 'हाँ, हटाएं' : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
