import React, { useState } from 'react';
import {
  FileText,
  Mic,
  Compass,
  CheckCircle2,
  ExternalLink,
  Settings,
  Home,
  Globe,
  Upload,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Menu,
  X,
  ChevronRight,
  PlusCircle,
  RotateCcw,
  Trash2,
  AlertTriangle,
  MapPin,
  Check
} from 'lucide-react';
import { FormExplanationResult, Language } from '../types';
import { translations } from '../data/translations';
import { FormExplainerView } from './FormExplainerView';
import { VoiceAssistantView } from './VoiceAssistantView';
import { GuidedPreparationView } from './GuidedPreparationView';
import { DocumentChecklistView } from './DocumentChecklistView';
import { OfficialNextStepsView } from './OfficialNextStepsView';
import { SettingsView } from './SettingsView';
import { sampleForms } from '../data/sampleForms';
import { useApp, DashboardTab } from '../context/AppContext';

import { supportedCertificates } from '../data/certificateData';
import { FormSaathiLogo } from './FormSaathiLogo';

interface DashboardProps {
  onBackToLanding: () => void;
  // Optional legacy props supported for seamless compatibility
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
  initialTab?: DashboardTab;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onBackToLanding,
}) => {
  const {
    selectedLanguage,
    setSelectedLanguage,
    dashboardTab,
    setDashboardTab,
    settings,
    setFontSize,
    setHighContrast,
    selectedCertificate,
    setSelectedCertificate,
    allCertificates,
    addCustomCertificate,
    selectedState,
    setSelectedState,
    selectedDistrict,
    setSelectedDistrict,
    createNewConversation,
    clearAllLocalData,
    formExplainerState,
    setFormExplainerState,
  } = useApp();

  const t = translations[selectedLanguage];
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [initialVoiceQuestion, setInitialVoiceQuestion] = useState<string>('');
  const [showConfirmStartOver, setShowConfirmStartOver] = useState(false);
  const [showConfirmClearAll, setShowConfirmClearAll] = useState(false);

  const handleAskFollowUpFromExplainer = (formContext: FormExplanationResult, customQuestion?: string) => {
    if (customQuestion) {
      setInitialVoiceQuestion(customQuestion);
    }
    setDashboardTab('voice');
  };

  const navItems = [
    { id: 'home' as DashboardTab, label: t.dashboard.tabs.home, icon: Home },
    { id: 'explain' as DashboardTab, label: t.dashboard.tabs.explainForm, icon: FileText, badge: 'Multimodal' },
    { id: 'voice' as DashboardTab, label: t.dashboard.tabs.voiceAssistant, icon: Mic, badge: 'Voice' },
    { id: 'wizard' as DashboardTab, label: t.dashboard.tabs.guidedPrep, icon: Compass },
    { id: 'checklist' as DashboardTab, label: t.dashboard.tabs.checklist, icon: CheckCircle2 },
    { id: 'portals' as DashboardTab, label: t.dashboard.tabs.officialPortals, icon: ExternalLink },
    { id: 'settings' as DashboardTab, label: t.dashboard.tabs.settings, icon: Settings },
  ];

  const handleStartNewSession = () => {
    createNewConversation(selectedLanguage);
    setInitialVoiceQuestion('');
    setShowConfirmStartOver(false);
  };

  const handlePerformFullWipe = () => {
    clearAllLocalData();
    setShowConfirmClearAll(false);
  };

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

  const certificateOptions = Object.values(allCertificates).map((c) => ({
    id: c.info.id,
    label: c.info.title,
  }));

  return (
    <div
      className={`min-h-screen flex bg-[#F0F8F2] text-[#17231C] ${
        settings.fontSize === 'large'
          ? 'text-[17px]'
          : settings.fontSize === 'xlarge'
          ? 'text-[19px]'
          : 'text-[15px]'
      } ${settings.highContrast ? 'contrast-125 saturate-110 font-medium' : ''}`}
    >
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-[#E2EAE3] shrink-0 h-screen sticky top-0 z-30 justify-between">
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Logo */}
          <div>
            <button
              onClick={() => setDashboardTab('home')}
              className="text-left cursor-pointer group focus:outline-hidden"
              aria-label="FormSaathi AI Home"
            >
              <FormSaathiLogo size="md" tagline={t.tagline} />
            </button>
          </div>

          {/* Quick Start / New Session Action */}
          <div className="pt-1">
            <button
              onClick={() => setShowConfirmStartOver(true)}
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-[#F0F8F2] hover:bg-[#E2EAE3] text-[#105C38] border border-[#16834A]/25 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <PlusCircle className="w-4 h-4 text-[#16834A]" />
              <span>
                {selectedLanguage === 'mr' ? 'नवीन संभाषण सुरू करा' : selectedLanguage === 'hi' ? 'नई बातचीत शुरू करें' : 'Start New Session'}
              </span>
            </button>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = dashboardTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setDashboardTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#16834A] text-white shadow-xs'
                      : 'text-[#17231C] hover:bg-[#F0F8F2] hover:text-[#16834A]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#68756C]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#F0F8F2] text-[#105C38] border border-[#16834A]/20'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-[#E2EAE3] space-y-3 bg-[#FAFCFA]">
          <div className="flex items-center justify-between text-xs font-bold text-[#68756C]">
            <span>Language</span>
            <div className="flex items-center gap-1">
              {(['mr', 'hi', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setSelectedLanguage(l)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
                    selectedLanguage === l
                      ? 'bg-[#16834A] text-white'
                      : 'text-[#17231C] hover:bg-[#E2EAE3]'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onBackToLanding}
            className="w-full text-center text-xs font-bold text-[#16834A] hover:underline cursor-pointer block pt-1"
          >
            ← {t.nav.backToHome}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E2EAE3] px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-[#17231C] hover:bg-[#F0F8F2] border border-[#E2EAE3] cursor-pointer shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <span className="font-extrabold text-xs sm:text-base text-[#17231C] truncate max-w-[120px] xs:max-w-[180px] sm:max-w-none">
              {navItems.find((n) => n.id === dashboardTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* New Session Button */}
            <button
              onClick={() => setShowConfirmStartOver(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#105C38] bg-[#F0F8F2] hover:bg-[#E2EAE3] border border-[#16834A]/25 cursor-pointer"
              title="Start New Conversation"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#16834A]" />
              <span>{selectedLanguage === 'mr' ? 'नवीन संभाषण' : selectedLanguage === 'hi' ? 'नई बातचीत' : 'New Session'}</span>
            </button>

            {/* Language Quick Switcher */}
            <div className="flex items-center bg-[#F0F8F2] rounded-xl p-0.5 sm:p-1 border border-[#E2EAE3] text-[11px] sm:text-xs font-bold text-[#105C38]">
              <Globe className="w-3.5 h-3.5 text-[#16834A] ml-1.5 mr-1 hidden md:block" />
              <button
                onClick={() => setSelectedLanguage('mr')}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-all cursor-pointer ${
                  selectedLanguage === 'mr' ? 'bg-[#16834A] text-white' : 'hover:bg-white/60'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => setSelectedLanguage('hi')}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-all cursor-pointer ${
                  selectedLanguage === 'hi' ? 'bg-[#16834A] text-white' : 'hover:bg-white/60'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setSelectedLanguage('en')}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-all cursor-pointer ${
                  selectedLanguage === 'en' ? 'bg-[#16834A] text-white' : 'hover:bg-white/60'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={onBackToLanding}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#16834A] hover:bg-[#F0F8F2] border border-[#16834A]/30 cursor-pointer"
            >
              {t.nav.backToHome}
            </button>
          </div>
        </header>

        {/* Tab Content View */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {dashboardTab === 'home' && (
            <div className="space-y-8 max-w-5xl mx-auto pb-12">
              {/* Welcome Card */}
              <div className="bg-white rounded-3xl border border-[#E2EAE3] p-6 sm:p-10 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20">
                    FormSaathi AI Workspace
                  </span>
                  <span className="text-xs text-[#68756C] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#16834A]" />
                    {selectedLanguage === 'mr' ? 'प्रगती आपोआप सेव्ह होते' : selectedLanguage === 'hi' ? 'प्रगति स्वतः सुरक्षित रहती है' : 'Progress saved automatically'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#17231C]">
                  {t.dashboard.welcomeTitle}
                </h1>
                <p className="text-sm sm:text-base text-[#68756C] max-w-2xl leading-relaxed">
                  {t.dashboard.welcomeSubtitle}
                </p>

                {/* State, District & Certificate Selector (Persisted Application-Wide) */}
                <div className="pt-4 border-t border-[#E2EAE3] grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#17231C] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#16834A]" />
                      <span>{selectedLanguage === 'mr' ? 'राज्य (State)' : selectedLanguage === 'hi' ? 'राज्य (State)' : 'State / Jurisdiction'}</span>
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
                      <span>{selectedLanguage === 'mr' ? 'जिल्हा / तालुका (District)' : selectedLanguage === 'hi' ? 'जिला / तहसील' : 'District / Tahsil'}</span>
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

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#17231C] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#16834A]" />
                        <span>{selectedLanguage === 'mr' ? 'लक्ष्य दाखला / योजना' : selectedLanguage === 'hi' ? 'लक्षित प्रमाण पत्र / योजना' : 'Target Requirement'}</span>
                      </span>
                      <span className="text-[10px] text-[#16834A] font-extrabold">{certificateOptions.length} Options</span>
                    </label>
                    <select
                      value={selectedCertificate}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '__add_custom__') {
                          const promptMsg =
                            selectedLanguage === 'mr'
                              ? 'नवीन दाखल्याचे किंवा शासकीय योजनेचे नाव प्रविष्ट करा (उदा. माझी लाडकी बहीण योजना, वारस नोंद, Solvency Certificate):'
                              : selectedLanguage === 'hi'
                              ? 'नए प्रमाण पत्र या सरकारी योजना का नाम दर्ज करें:'
                              : 'Enter the name of your civic requirement / scheme:';
                          const name = window.prompt(promptMsg);
                          if (name && name.trim()) {
                            addCustomCertificate({ name: name.trim() });
                          }
                          return;
                        }
                        setSelectedCertificate(val);
                      }}
                      className="w-full bg-[#F0F8F2] border border-[#E2EAE3] rounded-xl px-3 py-2 text-xs font-semibold text-[#17231C] focus:outline-hidden focus:ring-2 focus:ring-[#16834A]"
                    >
                      {certificateOptions.map((c) => (
                        <option key={c.id} value={c.id}>{c.label[selectedLanguage]}</option>
                      ))}
                      <option value="__add_custom__">
                        {selectedLanguage === 'mr' ? '+ इतर दाखला किंवा योजना जोडा...' : selectedLanguage === 'hi' ? '+ अन्य प्रमाण पत्र या योजना जोड़ें...' : '+ Add Other Requirement / Scheme...'}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Four Primary Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Upload Form */}
                <button
                  onClick={() => setDashboardTab('explain')}
                  className="p-6 rounded-3xl bg-white border border-[#E2EAE3] hover:border-[#16834A] hover:shadow-md transition-all text-left space-y-4 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F0F8F2] text-[#16834A] flex items-center justify-center group-hover:bg-[#16834A] group-hover:text-white transition-colors">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#17231C]">
                      {t.dashboard.quickActionUpload}
                    </h3>
                    <p className="text-xs text-[#68756C] mt-1 leading-relaxed">
                      Take a photo or upload an image. Receive field-by-field explanations in your language.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16834A] group-hover:translate-x-1 transition-transform">
                    Start Scanning <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </button>

                {/* 2. Voice Assistant */}
                <button
                  onClick={() => setDashboardTab('voice')}
                  className="p-6 rounded-3xl bg-white border border-[#E2EAE3] hover:border-[#16834A] hover:shadow-md transition-all text-left space-y-4 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F0F8F2] text-[#16834A] flex items-center justify-center group-hover:bg-[#16834A] group-hover:text-white transition-colors">
                    <Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#17231C]">
                      {t.dashboard.quickActionVoice}
                    </h3>
                    <p className="text-xs text-[#68756C] mt-1 leading-relaxed">
                      Tap the large microphone to ask any question in Marathi, Hindi, or English.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16834A] group-hover:translate-x-1 transition-transform">
                    Speak Now <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </button>

                {/* 3. Guided Prep */}
                <button
                  onClick={() => setDashboardTab('wizard')}
                  className="p-6 rounded-3xl bg-white border border-[#E2EAE3] hover:border-[#16834A] hover:shadow-md transition-all text-left space-y-4 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F0F8F2] text-[#16834A] flex items-center justify-center group-hover:bg-[#16834A] group-hover:text-white transition-colors">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#17231C]">
                      {t.dashboard.quickActionWizard}
                    </h3>
                    <p className="text-xs text-[#68756C] mt-1 leading-relaxed">
                      Step-by-step 1-question-at-a-time preparation. Print a verified summary sheet.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16834A] group-hover:translate-x-1 transition-transform">
                    Start Wizard <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </button>

                {/* 4. Document Checklist */}
                <button
                  onClick={() => setDashboardTab('checklist')}
                  className="p-6 rounded-3xl bg-white border border-[#E2EAE3] hover:border-[#16834A] hover:shadow-md transition-all text-left space-y-4 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F0F8F2] text-[#16834A] flex items-center justify-center group-hover:bg-[#16834A] group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#17231C]">
                      {t.dashboard.quickActionChecklist}
                    </h3>
                    <p className="text-xs text-[#68756C] mt-1 leading-relaxed">
                      Check off mandatory identity, address, and revenue verification proofs.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16834A] group-hover:translate-x-1 transition-transform">
                    View Checklist <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>

              {/* Sample Forms Ready to Test */}
              <div className="bg-white rounded-3xl border border-[#E2EAE3] p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#17231C] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#16834A]" />
                    <span>Popular Citizen Form Templates (Test Instantly)</span>
                  </h3>
                  <button
                    onClick={() => setDashboardTab('explain')}
                    className="text-xs font-bold text-[#16834A] hover:underline cursor-pointer"
                  >
                    View in Explainer →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sampleForms.map((sf) => (
                    <div
                      key={sf.id}
                      onClick={() => {
                        if (sf.id && supportedCertificates[sf.id]) {
                          setSelectedCertificate(sf.id);
                        }
                        setFormExplainerState({
                          result: sf.explanation,
                          metadata: {
                            isSample: true,
                            sampleId: sf.id,
                            name: sf.title[selectedLanguage],
                            previewSvg: sf.thumbnailSvg,
                          },
                          userNote: '',
                        });
                        setDashboardTab('explain');
                      }}
                      className="p-4 rounded-2xl border border-[#E2EAE3] hover:border-[#16834A] hover:bg-[#F0F8F2]/40 transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#105C38] bg-[#F0F8F2] px-2.5 py-0.5 rounded-full border border-[#16834A]/20">
                          {sf.id === 'income_cert' ? 'Revenue Dept' : 'Food & Civil Supplies'}
                        </span>
                        <span className="text-[11px] font-bold text-[#16834A] group-hover:underline">
                          Scan Sample →
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-[#17231C]">
                        {sf.title[selectedLanguage]}
                      </h4>
                      <p className="text-[11px] text-[#68756C] line-clamp-2">
                        {sf.description[selectedLanguage]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {dashboardTab === 'explain' && (
            <FormExplainerView onAskFollowUp={handleAskFollowUpFromExplainer} />
          )}

          {dashboardTab === 'voice' && (
            <VoiceAssistantView initialQuestion={initialVoiceQuestion} />
          )}

          {dashboardTab === 'wizard' && (
            <GuidedPreparationView />
          )}

          {dashboardTab === 'checklist' && (
            <DocumentChecklistView />
          )}

          {dashboardTab === 'portals' && (
            <OfficialNextStepsView />
          )}

          {dashboardTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-white h-full shadow-2xl flex flex-col justify-between p-5 z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2EAE3]">
                <FormSaathiLogo size="sm" showText={true} />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-[#68756C] hover:bg-[#F0F8F2] cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  setShowConfirmStartOver(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-[#F0F8F2] text-[#105C38] border border-[#16834A]/25 text-xs font-bold"
              >
                <PlusCircle className="w-4 h-4 text-[#16834A]" />
                <span>
                  {selectedLanguage === 'mr' ? 'नवीन संभाषण' : selectedLanguage === 'hi' ? 'नई बातचीत' : 'New Session'}
                </span>
              </button>

              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const IconComp = item.icon;
                  const isActive = dashboardTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setDashboardTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#16834A] text-white shadow-xs'
                          : 'text-[#17231C] hover:bg-[#F0F8F2]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#68756C]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-[#F0F8F2] text-[#105C38]">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-[#E2EAE3] space-y-3">
              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  onBackToLanding();
                }}
                className="w-full text-center text-xs font-bold text-[#16834A]"
              >
                ← {t.nav.backToHome}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Start Over Confirmation Modal */}
      {showConfirmStartOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E2EAE3] shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F8F2] text-[#16834A] flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#17231C]">
              {selectedLanguage === 'mr' ? 'नवीन संभाषण सुरू करायचे आहे का?' : selectedLanguage === 'hi' ? 'क्या आप नई बातचीत शुरू करना चाहते हैं?' : 'Start a New Conversation?'}
            </h3>
            <p className="text-xs text-[#68756C] leading-relaxed">
              {selectedLanguage === 'mr'
                ? 'हे केल्याने नवीन चॅट सत्र सुरू होईल. तुमचे मागील सत्र इतिहासात सुरक्षित राहील.'
                : selectedLanguage === 'hi'
                ? 'इससे एक नया सत्र शुरू होगा। आपकी पिछली बातचीत सत्र इतिहास में सुरक्षित रहेगी।'
                : 'This will begin a fresh conversation session. Your previous conversations remain saved in session history.'}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmStartOver(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#68756C] hover:bg-[#F0F8F2] cursor-pointer"
              >
                {selectedLanguage === 'mr' ? 'रद्द करा' : selectedLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={handleStartNewSession}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#16834A] text-white hover:bg-[#105C38] cursor-pointer shadow-xs"
              >
                {selectedLanguage === 'mr' ? 'होय, नवीन संभाषण' : selectedLanguage === 'hi' ? 'हाँ, नई बातचीत' : 'Start Fresh'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
