import React, { useState } from 'react';
import { Globe, Menu, X, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { FormSaathiLogo } from './FormSaathiLogo';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onGetStarted: () => void;
  onNavigateSection?: (sectionId: string) => void;
  isDashboardOpen?: boolean;
  onToggleDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onGetStarted,
  onNavigateSection,
  isDashboardOpen,
  onToggleDashboard,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const languages: Array<{ code: Language; label: string; native: string }> = [
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'en', label: 'English', native: 'English' },
  ];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (isDashboardOpen && onToggleDashboard) {
      onToggleDashboard(); // return to landing view
    }
    setTimeout(() => {
      onNavigateSection?.(sectionId);
    }, 50);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2EAE3] shadow-xs transition-all w-full">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-14 sm:h-18 gap-1.5 sm:gap-2">
          {/* Logo with Custom FormSaathi AI Branding */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center text-left cursor-pointer focus:outline-hidden shrink min-w-0"
            aria-label="FormSaathi AI Home"
          >
            <FormSaathiLogo size="md" tagline={t.tagline} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-sm font-medium text-[#17231C] hover:text-[#16834A] transition-colors cursor-pointer py-1"
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="text-sm font-medium text-[#17231C] hover:text-[#16834A] transition-colors cursor-pointer py-1"
            >
              {t.nav.features}
            </button>
            <button
              onClick={() => handleNavClick('guided-prep')}
              className="text-sm font-medium text-[#17231C] hover:text-[#16834A] transition-colors cursor-pointer py-1"
            >
              {t.nav.guidedPrep}
            </button>
            <button
              onClick={() => handleNavClick('checklists')}
              className="text-sm font-medium text-[#17231C] hover:text-[#16834A] transition-colors cursor-pointer py-1"
            >
              {t.nav.checklists}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-sm font-medium text-[#17231C] hover:text-[#16834A] transition-colors cursor-pointer py-1"
            >
              {t.nav.about}
            </button>
          </nav>

          {/* Right Controls: Language Selector & CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Desktop / Tablet Language Selector */}
            <div className="hidden sm:flex items-center bg-[#F0F8F2] rounded-lg p-0.5 sm:p-1 border border-[#E2EAE3]">
              <Globe className="w-3.5 h-3.5 text-[#16834A] ml-1.5 mr-1 hidden md:block" />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    currentLang === lang.code
                      ? 'bg-[#16834A] text-white shadow-2xs'
                      : 'text-[#17231C] hover:text-[#16834A] hover:bg-white/60'
                  }`}
                  title={lang.label}
                >
                  {lang.native}
                </button>
              ))}
            </div>

            {/* Mobile Compact Language Selector (Predictable, no OS select arrow bugs, fits 320px+) */}
            <div className="flex sm:hidden items-center bg-[#F0F8F2] rounded-lg p-0.5 border border-[#E2EAE3]">
              {(['mr', 'hi', 'en'] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => onLanguageChange(code)}
                  className={`px-1.5 py-0.5 text-[10px] font-bold rounded transition-all cursor-pointer ${
                    currentLang === code
                      ? 'bg-[#16834A] text-white shadow-2xs'
                      : 'text-[#17231C] hover:text-[#16834A]'
                  }`}
                  title={code === 'mr' ? 'मराठी' : code === 'hi' ? 'हिंदी' : 'English'}
                >
                  {code === 'mr' ? 'म' : code === 'hi' ? 'हि' : 'EN'}
                </button>
              ))}
            </div>

            {/* Main Action Button (desktop & tablet) */}
            <button
              onClick={onGetStarted}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 md:px-5 md:py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#16834A] hover:bg-[#105C38] active:scale-98 transition-all shadow-xs cursor-pointer shrink-0"
            >
              <span>{isDashboardOpen ? t.nav.backToHome : t.nav.getStarted}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Mobile & Tablet Menu Toggle Button (visible below lg: 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-[#17231C] hover:bg-[#F0F8F2] border border-[#E2EAE3] cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E2EAE3] bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17231C] hover:bg-[#F0F8F2]"
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17231C] hover:bg-[#F0F8F2]"
            >
              {t.nav.features}
            </button>
            <button
              onClick={() => handleNavClick('guided-prep')}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17231C] hover:bg-[#F0F8F2]"
            >
              {t.nav.guidedPrep}
            </button>
            <button
              onClick={() => handleNavClick('checklists')}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17231C] hover:bg-[#F0F8F2]"
            >
              {t.nav.checklists}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17231C] hover:bg-[#F0F8F2]"
            >
              {t.nav.about}
            </button>
          </div>

          <div className="pt-2 border-t border-[#E2EAE3]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGetStarted();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-white bg-[#16834A] hover:bg-[#105C38]"
            >
              {isDashboardOpen ? t.nav.backToHome : t.nav.getStarted}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
