import React, { useState } from 'react';
import {
  Settings,
  Globe,
  Type,
  Volume2,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { useApp } from '../context/AppContext';

interface SettingsViewProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
  fontSize?: 'normal' | 'large' | 'xlarge';
  onFontSizeChange?: (size: 'normal' | 'large' | 'xlarge') => void;
  highContrast?: boolean;
  onHighContrastChange?: (enabled: boolean) => void;
  onClearSessionData?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentLang: propLang,
}) => {
  const {
    selectedLanguage,
    setSelectedLanguage,
    settings,
    setFontSize,
    setHighContrast,
    setSpeechSpeed,
    clearAllLocalData,
  } = useApp();

  const lang = propLang || selectedLanguage;
  const t = translations[lang];

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [clearedNotice, setClearedNotice] = useState(false);

  const handleExecuteClear = () => {
    clearAllLocalData();
    setShowClearConfirm(false);
    setClearedNotice(true);
    setTimeout(() => setClearedNotice(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20">
            Accessibility & Preferences
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C]">
          {t.dashboard.tabs.settings}
        </h2>
        <p className="text-sm text-[#68756C] max-w-2xl">
          Customize reading sizes, high-contrast display, voice speed, and manage your local session data safely.
        </p>
      </div>

      {clearedNotice && (
        <div className="p-4 rounded-2xl bg-[#F0F8F2] border border-[#16834A]/30 text-xs text-[#105C38] font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#16834A]" />
          <span>
            {lang === 'mr' ? 'स्थानिक डेटा आणि संभाषण इतिहास यशस्वीरित्या हटवला गेला.' : lang === 'hi' ? 'स्थानीय डेटा और बातचीत इतिहास सफलतापूर्वक हटा दिया गया।' : 'Local data and history successfully cleared.'}
          </span>
        </div>
      )}

      {/* Settings Grid */}
      <div className="space-y-6">
        {/* 1. Language Preference */}
        <div className="bg-white rounded-3xl border border-[#E2EAE3] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F0F8F2] text-[#16834A] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17231C]">
                {t.settings.languageTitle}
              </h3>
              <p className="text-xs text-[#68756C]">
                {t.settings.languageSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              { id: 'mr' as Language, label: 'मराठी (Marathi)', desc: 'महाराष्ट्र शासकीय दाखले व सेतू' },
              { id: 'hi' as Language, label: 'हिंदी (Hindi)', desc: 'उत्तर प्रदेश, बिहार व राष्ट्रीय योजना' },
              { id: 'en' as Language, label: 'English', desc: 'Central & State Government Portals' },
            ].map((item) => {
              const isSelected = selectedLanguage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedLanguage(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                    isSelected
                      ? 'border-[#16834A] bg-[#F0F8F2] shadow-2xs'
                      : 'border-[#CBD5E1] bg-white hover:border-[#16834A]/40'
                  }`}
                >
                  <span className="font-bold text-sm block text-[#17231C]">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-[#68756C] block leading-tight">
                    {item.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Text Sizing */}
        <div className="bg-white rounded-3xl border border-[#E2EAE3] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F0F8F2] text-[#16834A] flex items-center justify-center">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17231C]">
                {t.settings.textSizeTitle}
              </h3>
              <p className="text-xs text-[#68756C]">
                {t.settings.textSizeSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              { id: 'normal' as const, label: t.settings.fontStandard, sample: '15px — Default' },
              { id: 'large' as const, label: t.settings.fontLarge, sample: '17px — Recommended for Seniors' },
              { id: 'xlarge' as const, label: t.settings.fontExtraLarge, sample: '19px — High Readability' },
            ].map((size) => {
              const isSelected = settings.fontSize === size.id;
              return (
                <button
                  key={size.id}
                  onClick={() => setFontSize(size.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                    isSelected
                      ? 'border-[#16834A] bg-[#F0F8F2] shadow-2xs'
                      : 'border-[#CBD5E1] bg-white hover:border-[#16834A]/40'
                  }`}
                >
                  <span className="font-bold text-sm block text-[#17231C]">
                    {size.label}
                  </span>
                  <span className="text-[11px] text-[#68756C] block">
                    {size.sample}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. High Contrast Mode */}
        <div className="bg-white rounded-3xl border border-[#E2EAE3] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#17231C]">
                {t.settings.highContrastTitle}
              </h3>
              <p className="text-xs text-[#68756C]">
                {t.settings.highContrastSubtitle}
              </p>
            </div>

            <button
              onClick={() => setHighContrast(!settings.highContrast)}
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                settings.highContrast ? 'bg-[#16834A]' : 'bg-[#CBD5E1]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.highContrast ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 4. Speech Speed */}
        <div className="bg-white rounded-3xl border border-[#E2EAE3] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F0F8F2] text-[#16834A] flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17231C]">
                {t.settings.speechRateTitle}
              </h3>
              <p className="text-xs text-[#68756C]">
                {t.settings.speechRateSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { val: 0.85, label: t.settings.speedSlow },
              { val: 1.0, label: t.settings.speedNormal },
              { val: 1.15, label: t.settings.speedFast },
            ].map((spd) => {
              const isSelected = Math.abs(settings.speechSpeed - spd.val) < 0.05;
              return (
                <button
                  key={spd.val}
                  onClick={() => setSpeechSpeed(spd.val)}
                  className={`py-3 px-4 rounded-2xl border text-center font-bold text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#16834A] bg-[#F0F8F2] text-[#105C38] shadow-2xs'
                      : 'border-[#CBD5E1] bg-white text-[#17231C] hover:border-[#16834A]/40'
                  }`}
                >
                  {spd.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Privacy & Data Reset */}
        <div className="bg-white rounded-3xl border border-[#E2EAE3] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17231C]">
                {t.settings.sessionTitle}
              </h3>
              <p className="text-xs text-[#68756C]">
                {t.settings.sessionSubtitle}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFCFA] border border-[#E2EAE3] text-xs text-[#68756C] space-y-2">
            <span className="font-bold text-[#17231C] block">
              What gets cleared:
            </span>
            <ul className="list-disc list-inside space-y-1">
              <li>All chat history and audio conversations</li>
              <li>Form analysis extractions and uploaded metadata</li>
              <li>Guided preparation checklist answers</li>
              <li>Checked status of required documents</li>
            </ul>
          </div>

          <button
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 cursor-pointer transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t.settings.buttonClearSession}</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E2EAE3] shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#17231C]">
              {lang === 'mr' ? 'सर्व स्थानिक डेटा हटवायचा आहे का?' : lang === 'hi' ? 'क्या आप सारा स्थानीय डेटा हटाना चाहते हैं?' : 'Delete All Saved Local Data?'}
            </h3>
            <p className="text-xs text-[#68756C] leading-relaxed">
              {lang === 'mr'
                ? 'हे केल्याने तुमची सर्व संभाषणाची माहिती, फॉर्म स्पष्टीकरणे आणि चेकलिस्ट लगेच साफ होतील. ही कृती पूर्ववत करता येणार नाही.'
                : lang === 'hi'
                ? 'इससे आपकी सभी बातचीत, फॉर्म स्पष्टीकरण और चेकलिस्ट तुरंत साफ हो जाएगी। यह क्रिया पूर्ववत नहीं की जा सकती।'
                : 'This will delete all conversation history, scanned form records, and checklist marks from this browser. This action cannot be undone.'}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#68756C] hover:bg-[#F0F8F2] cursor-pointer"
              >
                {lang === 'mr' ? 'रद्द करा' : lang === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={handleExecuteClear}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer shadow-xs"
              >
                {lang === 'mr' ? 'होय, सर्व हटवा' : lang === 'hi' ? 'हाँ, सब हटाएं' : 'Yes, Delete Everything'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
