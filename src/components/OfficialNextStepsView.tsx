import React from 'react';
import {
  Compass,
  ExternalLink,
  ShieldCheck,
  Search,
  Building2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Language, OfficialPortal } from '../types';
import { translations } from '../data/translations';
import { officialPortals } from '../data/officialPortals';
import { useApp } from '../context/AppContext';

import { CertificateIndicatorBanner } from './CertificateIndicatorBanner';

interface OfficialNextStepsViewProps {
  currentLang?: Language;
}

export const OfficialNextStepsView: React.FC<OfficialNextStepsViewProps> = ({ currentLang: propLang }) => {
  const {
    selectedLanguage,
    selectedState,
    setSelectedState,
    portalSearchQuery,
    setPortalSearchQuery,
  } = useApp();

  const lang = propLang || selectedLanguage;
  const t = translations[lang];

  const jurisdictions = [
    'all',
    'Maharashtra (महाराष्ट्र)',
    'Uttar Pradesh (उत्तर प्रदेश)',
    'All India (अखिल भारतीय)',
    'Multi-State / National (बहु-राज्य / राष्ट्रीय)'
  ];

  const filteredPortals = officialPortals.filter((portal) => {
    const matchesSearch =
      portal.name[lang].toLowerCase().includes(portalSearchQuery.toLowerCase()) ||
      portal.servicesProvided.some((s) => s.toLowerCase().includes(portalSearchQuery.toLowerCase())) ||
      portal.department.toLowerCase().includes(portalSearchQuery.toLowerCase());

    const matchesJurisdiction =
      selectedState === 'all' ||
      portal.jurisdiction === selectedState ||
      (selectedState.includes('Maharashtra') && portal.jurisdiction.includes('Maharashtra')) ||
      (selectedState.includes('Uttar Pradesh') && portal.jurisdiction.includes('Uttar Pradesh')) ||
      portal.jurisdiction.includes('All India');

    return matchesSearch && matchesJurisdiction;
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Shared Certificate Workspace Indicator */}
      <CertificateIndicatorBanner />
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20">
            Verified Government Directory
          </span>
          <span className="text-xs font-medium text-[#68756C]">
            Safe Official Portals Only
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C]">
          {t.portals.title}
        </h2>
        <p className="text-sm text-[#68756C] max-w-2xl">
          {t.portals.subtitle}
        </p>
      </div>

      {/* Safety Warning Card */}
      <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-800">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t.portals.safetyBannerTitle}</span>
        </div>
        <p className="leading-relaxed">
          {t.portals.safetyBannerText}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-[#E2EAE3] p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-[#68756C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={portalSearchQuery}
              onChange={(e) => setPortalSearchQuery(e.target.value)}
              placeholder={t.portals.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#17231C] placeholder-[#94A3B8] focus:border-[#16834A] focus:outline-hidden"
            />
          </div>

          {/* Jurisdiction Dropdown */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold text-[#17231C] focus:border-[#16834A] focus:outline-hidden"
          >
            <option value="all">{t.portals.filterAllStates}</option>
            {jurisdictions
              .filter((j) => j !== 'all')
              .map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Portals List */}
      <div className="space-y-4">
        {filteredPortals.length > 0 ? (
          filteredPortals.map((portal) => (
            <div
              key={portal.id}
              className="p-6 rounded-3xl bg-white border border-[#E2EAE3] hover:border-[#16834A]/40 transition-all space-y-4 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#105C38] bg-[#F0F8F2] px-2.5 py-0.5 rounded-full border border-[#16834A]/20">
                      {portal.jurisdiction}
                    </span>
                    <span className="text-[11px] text-[#68756C]">
                      Verified: {portal.verificationDate}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#17231C]">
                    {portal.name[lang]}
                  </h3>
                  <p className="text-xs text-[#105C38] font-semibold flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#16834A]" />
                    <span>{portal.department}</span>
                  </p>
                </div>

                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#16834A] hover:bg-[#105C38] shadow-xs cursor-pointer self-start sm:self-center transition-colors shrink-0"
                >
                  <span>{t.portals.buttonVisit}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Services offered */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-[#68756C] uppercase tracking-wider block">
                  {t.portals.servicesOffered}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {portal.servicesProvided.map((service, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[#FAFCFA] border border-[#E2EAE3] text-[#17231C]"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Safety notice specific to portal */}
              <div className="p-3 rounded-2xl bg-[#F0F8F2] border border-[#16834A]/10 text-xs text-[#17231C] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#16834A] shrink-0" />
                <span className="text-[11px] leading-relaxed">
                  {portal.safetyNotice[lang]}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-[#E2EAE3] text-[#68756C] space-y-2">
            <Compass className="w-8 h-8 text-[#94A3B8] mx-auto" />
            <h4 className="font-bold text-sm text-[#17231C]">
              No matching official portals found
            </h4>
            <p className="text-xs">
              Try adjusting your search query or state jurisdiction filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
