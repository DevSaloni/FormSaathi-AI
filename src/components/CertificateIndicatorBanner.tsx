import React, { useState } from 'react';
import {
  FileText,
  MapPin,
  Globe,
  ChevronDown,
  X,
  Check,
  Plus,
  Sparkles,
  Search,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const CertificateIndicatorBanner: React.FC = () => {
  const {
    selectedCertificate,
    setSelectedCertificate,
    selectedState,
    setSelectedState,
    selectedDistrict,
    setSelectedDistrict,
    selectedLanguage,
    allCertificates,
    customCertificates,
    addCustomCertificate,
    deleteCustomCertificate,
  } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customDept, setCustomDept] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customError, setCustomError] = useState('');

  const currentCertInfo = allCertificates[selectedCertificate]?.info;
  const certTitle = currentCertInfo?.title[selectedLanguage] || selectedCertificate;

  const langLabel = {
    mr: 'मराठी (mr-IN)',
    hi: 'हिंदी (hi-IN)',
    en: 'English (en-IN)',
  }[selectedLanguage];

  const stateOptions = [
    'Maharashtra (महाराष्ट्र)',
    'Uttar Pradesh (उत्तर प्रदेश)',
    'Delhi (दिल्ली NCT)',
    'Madhya Pradesh (मध्य प्रदेश)',
    'Bihar (बिहार)',
    'Rajasthan (राजस्थान)',
    'Gujarat (गुजरात)',
    'All India / Central (अखिल भारतीय)'
  ];

  const districtOptions: Record<string, string[]> = {
    'Maharashtra (महाराष्ट्र)': [
      'Pune', 'Mumbai City', 'Mumbai Suburban', 'Thane', 'Nagpur', 'Nashik',
      'Chhatrapati Sambhajinagar', 'Solapur', 'Kolhapur', 'Amravati', 'Nanded',
      'Sangli', 'Jalgaon', 'Ahmednagar', 'Satara'
    ],
    'Uttar Pradesh (उत्तर प्रदेश)': ['Varanasi', 'Lucknow', 'Kanpur', 'Prayagraj', 'Agra', 'Gorakhpur'],
    'Delhi (दिल्ली NCT)': ['Central Delhi', 'New Delhi', 'North Delhi', 'South Delhi', 'East Delhi'],
  };

  const availableDistricts = districtOptions[selectedState] || ['District Headquarters', 'Central Ward'];

  // Filter certificates by search
  const filteredCertificates = Object.values(allCertificates).filter((cert) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const titleObj = cert.info.title;
    return (
      (titleObj.mr && titleObj.mr.toLowerCase().includes(q)) ||
      (titleObj.hi && titleObj.hi.toLowerCase().includes(q)) ||
      (titleObj.en && titleObj.en.toLowerCase().includes(q)) ||
      cert.info.id.toLowerCase().includes(q)
    );
  });

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) {
      setCustomError(
        selectedLanguage === 'mr'
          ? 'कृपया दाखल्याचे किंवा योजनेचे नाव प्रविष्ट करा.'
          : selectedLanguage === 'hi'
          ? 'कृपया प्रमाण पत्र या योजना का नाम दर्ज करें।'
          : 'Please enter the name of the certificate or scheme.'
      );
      return;
    }

    setCustomError('');
    const newId = addCustomCertificate({
      name: customName.trim(),
      department: customDept.trim() || undefined,
      description: customDesc.trim() || undefined,
    });

    setCustomName('');
    setCustomDept('');
    setCustomDesc('');
    setShowCustomForm(false);
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E2EAE3] p-3 sm:p-4 shadow-2xs mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#F0F8F2] border border-[#16834A]/25 text-[#105C38] font-bold">
            <FileText className="w-4 h-4 text-[#16834A]" />
            <span className="hidden sm:inline text-[11px] font-semibold text-[#68756C]">
              {selectedLanguage === 'mr' ? 'सक्रिय दाखला / योजना:' : selectedLanguage === 'hi' ? 'सक्रिय प्रमाण पत्र / योजना:' : 'Active Requirement:'}
            </span>
            <span className="text-[#17231C] font-extrabold">{certTitle}</span>
          </div>

          <div className="flex items-center gap-1 text-[#68756C] font-medium text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#16834A]" />
            <span>{selectedState.split(' ')[0]}</span>
            {selectedDistrict && <span>• {selectedDistrict}</span>}
          </div>

          <div className="flex items-center gap-1 text-[#68756C] font-medium text-xs">
            <Globe className="w-3.5 h-3.5 text-[#16834A]" />
            <span>{langLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#105C38] bg-[#F0F8F2] hover:bg-[#E2EAE3] border border-[#16834A]/30 cursor-pointer transition-all shadow-2xs"
          >
            <span>
              {selectedLanguage === 'mr' ? 'दाखला / योजना बदला (१०+ पर्याय)' : selectedLanguage === 'hi' ? 'प्रमाण पत्र बदलें (१०+ विकल्प)' : 'Change Requirement (10+ Options)'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#16834A]" />
          </button>
        </div>
      </div>

      {/* Modal for Switching Certificate & Jurisdiction */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E2EAE3] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E2EAE3]">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-2.5 py-0.5 rounded-full border border-[#16834A]/20">
                  Shared Civic Workspace
                </span>
                <h3 className="text-xl font-extrabold text-[#17231C]">
                  {selectedLanguage === 'mr'
                    ? 'दाखला, प्रमाणपत्र किंवा शासकीय योजना निवडा'
                    : selectedLanguage === 'hi'
                    ? 'प्रमाण पत्र या सरकारी योजना चुनें'
                    : 'Select Certificate or Government Scheme'}
                </h3>
                <p className="text-xs text-[#68756C]">
                  {selectedLanguage === 'mr'
                    ? 'सूचीतील कोणताही दाखला निवडा किंवा "+ इतर दाखला जोडा" वर क्लिक करून नवीन योजना तयार करा.'
                    : selectedLanguage === 'hi'
                    ? 'सूची में से चुनें या "+ नई योजना जोड़ें" पर क्लिक करके अपना प्रमाण पत्र जोड़ें।'
                    : 'Choose from official certificates or click "+ Add Custom Scheme" to analyze any government requirement.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowCustomForm(false);
                }}
                className="p-2 rounded-xl text-[#68756C] hover:bg-[#F0F8F2] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar & Custom Scheme Trigger */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-[#68756C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    selectedLanguage === 'mr'
                      ? 'दाखला शोधा (उदा. जात, उत्पन्न, EWS, रेशन, शेतकरी...)'
                      : selectedLanguage === 'hi'
                      ? 'प्रमाण पत्र खोजें (जाति, आय, ईडब्ल्यूएस, राशन...)'
                      : 'Search certificate (caste, income, EWS, ration...)'
                  }
                  className="w-full pl-9 pr-3 py-2 bg-[#F0F8F2] border border-[#E2EAE3] rounded-xl text-xs font-semibold text-[#17231C] focus:outline-hidden focus:ring-2 focus:ring-[#16834A]"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowCustomForm(!showCustomForm)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#16834A] hover:bg-[#105C38] cursor-pointer shadow-xs whitespace-nowrap transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {selectedLanguage === 'mr' ? '+ इतर दाखला / योजना जोडा' : selectedLanguage === 'hi' ? '+ नई योजना / प्रमाण पत्र' : '+ Add Custom Scheme'}
                </span>
              </button>
            </div>

            {/* Inline Custom Requirement Creation Form */}
            {showCustomForm && (
              <form onSubmit={handleCreateCustom} className="p-4 rounded-2xl bg-[#F0F8F2] border border-[#16834A]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#105C38] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#16834A]" />
                    {selectedLanguage === 'mr' ? 'नवीन दाखला / योजनेचे तपशील भरा:' : selectedLanguage === 'hi' ? 'नई योजना का विवरण दर्ज करें:' : 'Add Custom Requirement Details:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCustomForm(false)}
                    className="text-xs text-[#68756C] hover:text-[#17231C]"
                  >
                    ✕
                  </button>
                </div>

                {customError && (
                  <p className="text-xs text-red-600 font-semibold">{customError}</p>
                )}

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#17231C]">
                    {selectedLanguage === 'mr' ? 'दाखल्याचे किंवा योजनेचे नाव *' : selectedLanguage === 'hi' ? 'प्रमाण पत्र या योजना का नाम *' : 'Requirement / Scheme Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder={
                      selectedLanguage === 'mr'
                        ? 'उदा. माझी लाडकी बहीण योजना, वारसदार नोंद दाखला, संजय गांधी निराधार योजना...'
                        : selectedLanguage === 'hi'
                        ? 'उदा. लाडली बहना योजना, वारिस प्रमाण पत्र, पेंशन योजना...'
                        : 'e.g. Ladki Bahin Yojana, Legal Heir Certificate, Solvency Certificate...'
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E2EAE3] rounded-xl text-xs font-medium text-[#17231C] focus:outline-hidden focus:ring-2 focus:ring-[#16834A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#17231C]">
                      {selectedLanguage === 'mr' ? 'शासकीय विभाग / कार्यालय (पर्यायी)' : selectedLanguage === 'hi' ? 'विभाग / कार्यालय (वैकल्पिक)' : 'Issuing Department (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={customDept}
                      onChange={(e) => setCustomDept(e.target.value)}
                      placeholder={
                        selectedLanguage === 'mr'
                          ? 'उदा. महसूल विभाग / समाजकल्याण / नगरपालिका'
                          : selectedLanguage === 'hi'
                          ? 'उदा. राजस्व विभाग / समाज कल्याण'
                          : 'e.g. Revenue / Municipal / Social Welfare'
                      }
                      className="w-full px-3 py-2 bg-white border border-[#E2EAE3] rounded-xl text-xs font-medium text-[#17231C] focus:outline-hidden focus:ring-2 focus:ring-[#16834A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#17231C]">
                      {selectedLanguage === 'mr' ? 'थोडक्यात माहिती (पर्यायी)' : selectedLanguage === 'hi' ? 'संक्षिप्त विवरण (वैकल्पिक)' : 'Brief Description (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={customDesc}
                      onChange={(e) => setCustomDesc(e.target.value)}
                      placeholder={
                        selectedLanguage === 'mr'
                          ? 'उदा. दरमहा आर्थिक सहाय्य किंवा शेती जमिनीचे काम'
                          : selectedLanguage === 'hi'
                          ? 'उदा. मासिक सहायता या भूमि कार्य'
                          : 'e.g. Monthly financial assistance'
                      }
                      className="w-full px-3 py-2 bg-white border border-[#E2EAE3] rounded-xl text-xs font-medium text-[#17231C] focus:outline-hidden focus:ring-2 focus:ring-[#16834A]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#16834A] hover:bg-[#105C38] text-white text-xs font-bold cursor-pointer transition-all shadow-xs"
                  >
                    {selectedLanguage === 'mr' ? 'तयार करा आणि तयारी सुरू करा' : selectedLanguage === 'hi' ? 'बनाएं और तैयारी शुरू करें' : 'Create & Activate Workspace'}
                  </button>
                </div>
              </form>
            )}

            {/* Certificate Selection Cards */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#17231C] uppercase tracking-wider flex items-center justify-between">
                <span>{selectedLanguage === 'mr' ? 'उपलब्ध दाखले व योजना:' : selectedLanguage === 'hi' ? 'उपलब्ध प्रमाण पत्र:' : 'Available Certificates & Schemes:'}</span>
                <span className="text-[11px] text-[#16834A] font-semibold">{filteredCertificates.length} Available</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[46vh] overflow-y-auto pr-1">
                {filteredCertificates.map((cert) => {
                  const isSelected = cert.info.id === selectedCertificate;
                  const isCustom = !!customCertificates[cert.info.id];

                  return (
                    <div
                      key={cert.info.id}
                      onClick={() => {
                        setSelectedCertificate(cert.info.id);
                        setShowModal(false);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 relative group ${
                        isSelected
                          ? 'border-[#16834A] bg-[#F0F8F2] ring-2 ring-[#16834A]/20 shadow-xs'
                          : 'border-[#E2EAE3] hover:border-[#16834A]/50 hover:bg-[#FAFCFA]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-[#17231C]">
                          {cert.info.title[selectedLanguage]}
                        </span>
                        <div className="flex items-center gap-1">
                          {isCustom && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteCustomCertificate(cert.info.id);
                              }}
                              title="Delete custom scheme"
                              className="p-1 rounded-lg text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#16834A] text-white flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-[11px] text-[#68756C] line-clamp-2">
                        {cert.info.shortDescription[selectedLanguage]}
                      </p>

                      <div className="flex items-center gap-2 pt-1 text-[10px] font-bold text-[#105C38]">
                        <span>{cert.checklist.length} Documents</span>
                        <span>•</span>
                        <span>{cert.info.typicalDeliveryDays} Days</span>
                        {isCustom && (
                          <>
                            <span>•</span>
                            <span className="bg-[#16834A]/10 text-[#16834A] px-1.5 py-0.5 rounded-sm">Custom</span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* State & District Selectors */}
            <div className="pt-4 border-t border-[#E2EAE3] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#17231C] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#16834A]" />
                  <span>{selectedLanguage === 'mr' ? 'राज्य (State)' : selectedLanguage === 'hi' ? 'राज्य (State)' : 'State'}</span>
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-[#F0F8F2] border border-[#E2EAE3] rounded-xl px-3 py-2 text-xs font-semibold text-[#17231C] focus:outline-hidden focus:ring-2 focus:ring-[#16834A]"
                >
                  {stateOptions.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#17231C] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#16834A]" />
                  <span>{selectedLanguage === 'mr' ? 'जिल्हा / तालुका (District)' : selectedLanguage === 'hi' ? 'जिला / तहसील (District)' : 'District'}</span>
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-[#F0F8F2] border border-[#E2EAE3] rounded-xl px-3 py-2 text-xs font-semibold text-[#17231C] focus:outline-hidden focus:ring-2 focus:ring-[#16834A]"
                >
                  {availableDistricts.map((dst) => (
                    <option key={dst} value={dst}>{dst}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#E2EAE3] flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowCustomForm(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#16834A] hover:bg-[#105C38] text-white text-xs font-bold cursor-pointer transition-all shadow-xs"
              >
                {selectedLanguage === 'mr' ? 'पूर्ण झाले' : selectedLanguage === 'hi' ? 'पूर्ण' : 'Apply & Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

