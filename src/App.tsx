import React from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { useApp, DashboardTab } from './context/AppContext';

export default function App() {
  const {
    selectedLanguage,
    setSelectedLanguage,
    viewMode,
    setViewMode,
    dashboardTab,
    setDashboardTab,
    settings,
  } = useApp();

  const handleOpenDashboardWithTab = (tab: DashboardTab) => {
    setDashboardTab(tab);
    setViewMode('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (viewMode === 'dashboard') {
      setViewMode('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#F0F8F2] text-[#17231C] ${
        settings.fontSize === 'large'
          ? 'text-[17px]'
          : settings.fontSize === 'xlarge'
          ? 'text-[19px]'
          : 'text-[15px]'
      } ${settings.highContrast ? 'contrast-125 saturate-110 font-medium' : ''}`}
    >
      {viewMode === 'landing' ? (
        <>
          <Navbar
            currentLang={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            onGetStarted={() => handleOpenDashboardWithTab('home')}
            onNavigateSection={handleNavigateSection}
            isDashboardOpen={false}
          />
          <LandingPage
            currentLang={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            onGetStarted={() => handleOpenDashboardWithTab('home')}
            onOpenExplainer={() => handleOpenDashboardWithTab('explain')}
            onOpenVoice={() => handleOpenDashboardWithTab('voice')}
            onOpenWizard={() => handleOpenDashboardWithTab('wizard')}
            onOpenChecklist={() => handleOpenDashboardWithTab('checklist')}
            onOpenPortals={() => handleOpenDashboardWithTab('portals')}
          />
        </>
      ) : (
        <Dashboard
          onBackToLanding={() => {
            setViewMode('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
}
