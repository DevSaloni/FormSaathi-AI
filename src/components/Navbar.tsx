import React, { useState } from 'react';
import { FileText, Globe, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2EAE3] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-[#16834A] flex items-center justify-center text-white shadow-sm group-hover:bg-[#105C38] transition-colors">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-[#17231C]">
                  FormSaathi <span className="text-[#16834A]">AI</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-[#F0F8F2] text-[#105C38] border border-[#16834A]/20">
                  Civic Guide
                </span>
              </div>
              <p className="text-xs text-[#68756C] font-medium hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
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
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Dropdown Selector */}
            <div className="relative flex items-center bg-[#F0F8F2] rounded-lg p-1 border border-[#E2EAE3]">
              <Globe className="w-4 h-4 text-[#16834A] ml-2 mr-1" />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    currentLang === lang.code
                      ? 'bg-[#16834A] text-white shadow-xs'
                      : 'text-[#17231C] hover:text-[#16834A] hover:bg-white/60'
                  }`}
                  title={lang.label}
                >
                  {lang.native}
                </button>
              ))}
            </div>

            {/* Main Action Button */}
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#16834A] hover:bg-[#105C38] active:scale-98 transition-all shadow-sm cursor-pointer"
            >
              {isDashboardOpen ? t.nav.backToHome : t.nav.getStarted}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="text-xs font-bold bg-[#F0F8F2] text-[#105C38] border border-[#E2EAE3] rounded-lg px-2 py-1.5 focus:outline-hidden"
              aria-label="Select Language"
            >
              <option value="mr">मराठी</option>
              <option value="hi">हिंदी</option>
              <option value="en">English</option>
            </select>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#17231C] hover:bg-[#F0F8F2] border border-[#E2EAE3]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2EAE3] bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
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
