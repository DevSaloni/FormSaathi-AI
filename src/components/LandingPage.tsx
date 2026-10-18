import React, { useState } from 'react';
import {
  FileText,
  Mic,
  Languages,
  CheckCircle2,
  FileCheck2,
  Compass,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  Users,
  Eye,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  PhoneCall,
  Volume2
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { HeroPreview } from './HeroPreview';
import { FooterModals } from './FooterModals';

interface LandingPageProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onGetStarted: () => void;
  onOpenExplainer: () => void;
  onOpenVoice: () => void;
  onOpenWizard: () => void;
  onOpenChecklist: () => void;
  onOpenPortals: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentLang,
  onLanguageChange,
  onGetStarted,
  onOpenExplainer,
  onOpenVoice,
  onOpenWizard,
  onOpenChecklist,
  onOpenPortals,
}) => {
  const t = translations[currentLang];
  const [activeModal, setActiveModal] = useState<'about' | 'privacy' | 'terms' | 'contact' | null>(null);

  const problemSolutions = [
    {
      problem: {
        en: 'Complicated English and Legal Jargon',
        hi: 'कठिन अंग्रेजी और कानूनी भाषा',
        mr: 'क्लिष्ट इंग्रजी व कायदेशीर शब्द',
      }[currentLang],
      problemDesc: {
        en: 'Terms like "Affidavit of Solvency" or "Annexure-B" intimidate first-time applicants.',
        hi: 'कठिन सरकारी शब्दावली आम नागरिकों को भयभीत कर देती है।',
        mr: 'अर्जांमधील अवघड सरकारी भाषेमुळे नागरिक घाबरून जातात किंवा चुकीची माहिती भरतात.',
      }[currentLang],
      solution: {
        en: 'Field-by-Field Simple Explanations',
        hi: 'कॉलम-दर-कॉलम सरल मातृभाषा व्याख्या',
        mr: 'प्रत्येक रकान्याचा सोप्या मराठीत अर्थ',
      }[currentLang],
      solutionDesc: {
        en: 'FormSaathi AI explains each box in everyday conversational words with fictional examples.',
        hi: 'फॉर्मसाथी प्रत्येक कॉलम को काल्पनिक उदाहरणों के साथ सरल हिंदी में समझाता है।',
        mr: 'काल्पनिक उदाहरणांसह घरगुती सोप्या भाषेत माहिती समजावून दिली जाते.',
      }[currentLang],
    },
    {
      problem: {
        en: 'Uncertainty About Required Documents',
        hi: 'आवश्यक दस्तावेजों को लेकर असमंजस',
        mr: 'कोणती कागदपत्रे लागतील याबद्दल संभ्रम',
      }[currentLang],
      problemDesc: {
        en: 'Missing a single Talathi report or utility bill means standing in office lines repeatedly.',
        hi: 'एक भी दस्तावेज छूट जाने पर बार-बार सरकारी दफ्तरों के चक्कर लगाने पड़ते हैं।',
        mr: 'एक कागदपत्र कमी असल्यास सेतू किंवा तहसील कार्यालयात पुन्हा पुन्हा फेऱ्या माराव्या लागतात.',
      }[currentLang],
      solution: {
        en: 'Verified Document Checklist',
        hi: 'सत्यापित दस्तावेज चेकलिस्ट',
        mr: 'पडताळलेली आवश्यक कागदपत्र यादी',
      }[currentLang],
      solutionDesc: {
        en: 'Clearly separates officially verified requirements from items to confirm locally.',
        hi: 'आधिकारिक आवश्यकताओं और स्थानीय स्तर पर पुष्टि योग्य बातों को अलग-अलग दिखाता है।',
        mr: 'अधिकृत कागदपत्रे कोणती आणि स्थानिक पातळीवर काय तपासावे हे स्पष्ट दाखवले जाते.',
      }[currentLang],
    },
    {
      problem: {
        en: 'Fear of Making Costly Application Mistakes',
        hi: 'फॉर्म भरते समय गलती होने का डर',
        mr: 'अर्जात चूक झाल्यास अर्ज बाद होण्याची भीती',
      }[currentLang],
      problemDesc: {
        en: 'Spelling errors or writing in office-only boxes often leads to form rejection.',
        hi: 'नाम की स्पेलिंग या गलत कॉलम भरने पर आवेदन खारिज हो जाता है।',
        mr: 'नावाच्या स्पेलिंगमधील चूक किंवा चुकीच्या रकान्यात माहिती भरल्यास दाखला नाकारला जातो.',
      }[currentLang],
      solution: {
        en: 'Guided Step-by-Step Preparation',
        hi: 'एक-एक प्रश्न की मार्गदर्शित तैयारी',
        mr: 'एक-एक पायरीनुसार मार्गदर्शित तयारी',
      }[currentLang],
      solutionDesc: {
        en: 'Answer one question at a time using your voice, review answers, and export a neat summary.',
        hi: 'बोलकर या लिखकर एक-एक उत्तर तैयार करें और सीएससी केंद्र जाने से पहले सारांश प्रिंट करें।',
        mr: 'बोलून किंवा लिहून आधीच माहिती तयार ठेवा आणि निर्धास्तपणे अधिकृत केंद्रावर जा.',
      }[currentLang],
    },
    {
      problem: {
        en: 'Predatory Middlemen & Unofficial Portals',
        hi: 'फर्जी वेबसाइट्स और बिचौलियों का डर',
        mr: 'फसव्या मध्यस्थ व अनधिकृत वेबसाईटची भीती',
      }[currentLang],
      problemDesc: {
        en: 'Citizens often get trapped by unofficial portals charging excessive fees.',
        hi: 'नागरिक अक्सर फर्जी वेबसाइटों के चक्कर में अधिक पैसे गंवा बैठते हैं।',
        mr: 'अनधिकृत संकेतस्थळांवर अवाजवी पैसे उकळले जातात किंवा डेटा चोरी होतो.',
      }[currentLang],
      solution: {
        en: 'Verified Official Government Links',
        hi: 'प्रामाणिक सरकारी पोर्टल डायरेक्ट लिंक',
        mr: 'अधिकृत शासकीय पोर्टलची थेट लिंक',
      }[currentLang],
      solutionDesc: {
        en: 'Direct navigation to genuine authenticated portals like Aaple Sarkar and ServicePlus.',
        hi: 'आपले सरकार और सर्विसप्लस जैसे केवल प्रामाणिक सरकारी पोर्टलों की सटीक जानकारी।',
        mr: 'केवळ खात्रीशीर शासकीय पोर्टलची थेट माहिती व सुरक्षित दिशादर्शन.',
      }[currentLang],
    },
  ];

  const steps = [
    {
      number: '01',
      title: {
        en: 'Choose Your Language',
        hi: 'अपनी भाषा चुनें',
        mr: 'तुमची भाषा निवडा',
      }[currentLang],
      desc: {
        en: 'Select Marathi, Hindi, or simple English for voice guidance and written explanations.',
        hi: 'मराठी, हिंदी या सरल अंग्रेजी में से अपनी पसंदीदा भाषा चुनें।',
        mr: 'मराठी, हिंदी किंवा सोप्या इंग्रजीपैकी तुम्हाला सोयीची भाषा निवडा.',
      }[currentLang],
      badge: 'Multi-lingual',
    },
    {
      number: '02',
      title: {
        en: 'Upload Form or Ask a Question',
        hi: 'फॉर्म का फोटो अपलोड करें या बोलें',
        mr: 'अर्जाचा फोटो अपलोड करा किंवा विचारा',
      }[currentLang],
      desc: {
        en: 'Take a clear photograph of any application form, or speak directly to the voice assistant.',
        hi: 'किसी भी आवेदन पत्र का फोटो लें या सीधे माइक बटन दबाकर अपना सवाल पूछें।',
        mr: 'कोणत्याही अर्जाचा फोटो निवडा किंवा माईक दाबून थेट तुमचा प्रश्न विचारा.',
      }[currentLang],
      badge: 'Multimodal AI',
    },
    {
      number: '03',
      title: {
        en: 'Listen to Simple Explanations',
        hi: 'सरल स्पष्टीकरण सुनें या पढ़ें',
        mr: 'सोपे स्पष्टीकरण ऐका किंवा वाचा',
      }[currentLang],
      desc: {
        en: 'Receive field-by-field instructions, caution notes, and tap "Read Aloud" to listen.',
        hi: 'प्रत्येक कॉलम की सरल व्याख्या, काल्पनिक उदाहरण और आवाज में सुनें।',
        mr: 'प्रत्येक रकान्याचा अर्थ, सावधगिरीच्या सूचना आणि आवाज ऐका.',
      }[currentLang],
      badge: 'Voice Synthesis',
    },
    {
      number: '04',
      title: {
        en: 'Prepare Answers & Checklist',
        hi: 'तैयारी करें और अगला कदम उठाएं',
        mr: 'उत्तरे तयार करा व पुढील पाऊल उचला',
      }[currentLang],
      desc: {
        en: 'Use the interactive checklist, print your preparation sheet, and visit official portals.',
        hi: 'दस्तावेज चेकलिस्ट पूरी करें, सारांश साथ रखें और आधिकारिक पोर्टल पर आवेदन करें।',
        mr: 'कागदपत्रे तपासा, तयारी पत्रक सोबत ठेवा आणि अधिकृत पोर्टलवर अर्ज करा.',
      }[currentLang],
      badge: 'Ready to Apply',
    },
  ];

  const features = [
    {
      icon: FileText,
      title: {
        en: 'AI Form Photo Explainer',
        hi: 'एआई फॉर्म फोटो एक्सप्लेनर',
        mr: 'अर्जाचा फोटो समजावून सांगणारा साहाय्यक',
      }[currentLang],
      desc: {
        en: 'Upload any physical form picture. Gemini AI identifies the purpose, unreadable portions, and breaks down every box.',
        hi: 'फॉर्म का फोटो अपलोड करें। AI हर कॉलम का सरल अर्थ और काल्पनिक उदाहरण प्रदान करेगा।',
        mr: 'अर्जाचा फोटो टाका. AI प्रत्येक रकाना, त्याचे नियम आणि अर्थ सोप्या भाषेत सांगेल.',
      }[currentLang],
      action: onOpenExplainer,
      ctaText: t.explainer.buttonAnalyze,
    },
    {
      icon: Mic,
      title: {
        en: 'Voice-First Assistant',
        hi: 'वॉयस-फर्स्ट असिस्टेंट',
        mr: 'बोलून प्रश्न विचारणारा आवाज साहाय्यक',
      }[currentLang],
      desc: {
        en: 'Speak in Marathi, Hindi, or English. Listen to spoken responses. Full keyboard input alternative always available.',
        hi: 'अपनी आवाज में पूछें और जवाब सुनें। टाइप करने का विकल्प भी हमेशा उपलब्ध है।',
        mr: 'माईक दाबून बोला आणि आवाज ऐका. टाईप करण्याचा पर्यायही कायम उपलब्ध आहे.',
      }[currentLang],
      action: onOpenVoice,
      ctaText: t.voice.title,
    },
    {
      icon: Languages,
      title: {
        en: 'Marathi, Hindi & English',
        hi: 'मराठी, हिंदी और सरल अंग्रेजी',
        mr: 'मराठी, हिंदी आणि सोपे इंग्रजी',
      }[currentLang],
      desc: {
        en: 'Authentic Unicode typography and Devanagari phonetics tailored for Indian rural and urban citizens.',
        hi: 'भारतीय नागरिकों के लिए अनुकूलित स्पष्ट देवनागरी लिपि और स्थानीय शब्दावली।',
        mr: 'ग्रामीण व शहरी नागरिकांसाठी अस्सल मराठी व देवनागरी लिपीतील सुलभ रचना.',
      }[currentLang],
      action: () => onLanguageChange(currentLang === 'mr' ? 'hi' : currentLang === 'hi' ? 'en' : 'mr'),
      ctaText: 'Switch Language',
    },
    {
      icon: Compass,
      title: {
        en: 'Guided Form Preparation',
        hi: 'मार्गदर्शित फॉर्म तैयारी विज़ार्ड',
        mr: 'पायरी-दर-पायरी अर्ज तयारी',
      }[currentLang],
      desc: {
        en: 'One-question-at-a-time interactive wizard. Review answers, catch missing details, and export a preparation sheet.',
        hi: 'एक समय में एक प्रश्न तैयार करें। गलतियों की जांच करें और सारांश पत्रक सहेजें।',
        mr: 'एका वेळी एकाच रकान्याची तयारी करा. चुका टाळा आणि सारांश पत्रक सोबत ठेवा.',
      }[currentLang],
      action: onOpenWizard,
      ctaText: t.wizard.title,
    },
    {
      icon: CheckCircle2,
      title: {
        en: 'Verified Document Checklist',
        hi: 'सत्यापित दस्तावेज चेकलिस्ट',
        mr: 'पडताळलेली आवश्यक कागदपत्र यादी',
      }[currentLang],
      desc: {
        en: 'Separates officially verified rules from items to confirm locally. Interactive check-off and printable checklist.',
        hi: 'आधिकारिक नियमों को स्पष्ट दर्शाता है ताकि तहसील में बार-बार चक्कर न लगाने पड़ें।',
        mr: 'सरकारी नियमांनुसार कोणती कागदपत्रे लागतील याची खात्रीशीर चेकलिस्ट.',
      }[currentLang],
      action: onOpenChecklist,
      ctaText: t.checklist.title,
    },
    {
      icon: ExternalLink,
      title: {
        en: 'Official Next Steps & Portals',
        hi: 'आधिकारिक पोर्टल व अगला कदम',
        mr: 'अधिकृत शासकीय पोर्टल्स व पुढील दिशा',
      }[currentLang],
      desc: {
        en: 'Curated directory of genuine government websites (Aaple Sarkar, ServicePlus, DigiLocker) with safety guidance.',
        hi: 'फर्जी वेबसाइट्स से बचें। केवल प्रामाणिक सरकारी पोर्टल्स की सीधी सुरक्षित जानकारी।',
        mr: 'फसव्या मध्यस्थांपासून दूर राहा. थेट अधिकृत शासकीय पोर्टलची माहिती घ्या.',
      }[currentLang],
      action: onOpenPortals,
      ctaText: t.portals.title,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0F8F2] flex flex-col">
      {/* SECTION B: HERO SECTION */}
      <section id="hero" className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2EAE3] shadow-xs text-xs font-semibold text-[#105C38]">
                <ShieldCheck className="w-4 h-4 text-[#16834A]" />
                <span>{t.hero.trustBadge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17231C] tracking-tight leading-[1.12]">
                {t.hero.headline}
              </h1>

              {/* Supporting Text */}
              <p className="text-lg sm:text-xl text-[#68756C] font-normal leading-relaxed max-w-2xl">
                {t.hero.supportingText}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onOpenExplainer}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base text-white bg-[#16834A] hover:bg-[#105C38] active:scale-98 transition-all shadow-md cursor-pointer"
                >
                  <FileText className="w-5 h-5" />
                  <span>{t.hero.explainCTA}</span>
                </button>

                <button
                  onClick={onOpenVoice}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-base text-[#105C38] bg-white hover:bg-[#F0F8F2] border border-[#E2EAE3] active:scale-98 transition-all shadow-xs cursor-pointer"
                >
                  <Mic className="w-5 h-5 text-[#16834A]" />
                  <span>{t.hero.voiceCTA}</span>
                </button>
              </div>

              {/* Reassurance pills */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 text-xs font-medium text-[#68756C]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16834A]" />
                  <span>No login or personal data needed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16834A]" />
                  <span>Marathi, Hindi & English</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16834A]" />
                  <span>100% Free Civic Resource</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Product Preview */}
            <div className="lg:col-span-5">
              <HeroPreview
                currentLang={currentLang}
                onOpenExplainer={onOpenExplainer}
                onOpenVoice={onOpenVoice}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: PROBLEM & SOLUTION SECTION */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20">
              Why FormSaathi Matters
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17231C]">
              Real Citizen Struggles, Solved with Empathy
            </h2>
            <p className="text-base text-[#68756C]">
              Applying for government documents should not require paying agents or feeling helpless. Here is how FormSaathi transforms the experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problemSolutions.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-[#E2EAE3] p-6 sm:p-8 bg-[#FAFCFA] hover:border-[#16834A]/30 transition-all shadow-xs space-y-5"
              >
                {/* Problem Box */}
                <div className="space-y-2 pb-4 border-b border-[#E2EAE3]">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wide">
                    <AlertTriangle className="w-4 h-4" />
                    <span>The Problem</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#17231C]">{item.problem}</h3>
                  <p className="text-sm text-[#68756C] leading-relaxed">{item.problemDesc}</p>
                </div>

                {/* Solution Box */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#105C38] font-bold text-xs uppercase tracking-wide">
                    <Sparkles className="w-4 h-4 text-[#16834A]" />
                    <span>FormSaathi Solution</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#105C38]">{item.solution}</h4>
                  <p className="text-sm text-[#17231C] leading-relaxed">{item.solutionDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: HOW IT WORKS (4 STEPS) */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-[#F0F8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-white px-3 py-1 rounded-full border border-[#E2EAE3]">
              Four Simple Steps
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17231C]">
              How FormSaathi AI Guides You
            </h2>
            <p className="text-base text-[#68756C]">
              No complicated setups. Get field-level clarity in less than two minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2EAE3] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-[#16834A] opacity-90">{st.number}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F0F8F2] text-[#105C38]">
                      {st.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#17231C] leading-snug">{st.title}</h3>
                  <p className="text-sm text-[#68756C] leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION E: FEATURES GRID (6 CARDS) */}
      <section id="features" className="py-16 sm:py-24 bg-white border-t border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20">
              Complete Feature Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17231C]">
              Every Tool You Need to Conquer Forms
            </h2>
            <p className="text-base text-[#68756C]">
              Designed specifically for accessibility, clarity, and peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, index) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={index}
                  className="rounded-3xl border border-[#E2EAE3] p-7 bg-[#FAFCFA] hover:bg-white hover:border-[#16834A]/40 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F0F8F2] border border-[#E2EAE3] text-[#16834A] flex items-center justify-center group-hover:bg-[#16834A] group-hover:text-white transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#17231C]">{feat.title}</h3>
                    <p className="text-sm text-[#68756C] leading-relaxed">{feat.desc}</p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E2EAE3]">
                    <button
                      onClick={feat.action}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#16834A] hover:text-[#105C38] cursor-pointer group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>{feat.ctaText}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION F: ACCESSIBILITY & TRUST SECTION */}
      <section id="about" className="py-16 sm:py-24 bg-[#F0F8F2] border-t border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#E2EAE3] p-8 sm:p-12 shadow-sm space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20">
                Accessibility First • Verified Ethics
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17231C]">
                Built for High Contrast, Voice, and Complete Honesty
              </h2>
              <p className="text-base text-[#68756C] leading-relaxed">
                Accessibility is not an afterthought — it is the entire mission of FormSaathi AI. We believe no citizen should be denied benefits due to confusing paperwork.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-[#FAFCFA] border border-[#E2EAE3] space-y-2">
                <div className="flex items-center gap-2 text-[#105C38] font-bold text-sm">
                  <Eye className="w-4 h-4 text-[#16834A]" />
                  <span>Large Controls & High Contrast</span>
                </div>
                <p className="text-xs text-[#68756C] leading-relaxed">
                  Generous 48px touch targets, clean typographic scale, and accessible focus outlines for elderly and low-vision citizens.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAFCFA] border border-[#E2EAE3] space-y-2">
                <div className="flex items-center gap-2 text-[#105C38] font-bold text-sm">
                  <Volume2 className="w-4 h-4 text-[#16834A]" />
                  <span>Voice & Text Alternatives</span>
                </div>
                <p className="text-xs text-[#68756C] leading-relaxed">
                  Every voice feature has a complete keyboard/touch equivalent so users without microphones or in loud environments are never stuck.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAFCFA] border border-[#E2EAE3] space-y-2">
                <div className="flex items-center gap-2 text-[#105C38] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#16834A]" />
                  <span>Independent & Trustworthy</span>
                </div>
                <p className="text-xs text-[#68756C] leading-relaxed">
                  Explicitly distinguishes verified rules from items to confirm. Never claims to issue certificates or approve applications.
                </p>
              </div>
            </div>

            {/* Prominent Civic Disclaimer Notice */}
            <div className="p-5 rounded-2xl bg-[#F0F8F2] border border-[#16834A]/30 text-xs sm:text-sm text-[#105C38] leading-relaxed">
              <strong>Transparent Citizen Notice:</strong> FormSaathi AI is an independent civic guide created to assist with form comprehension. It is not an official government agency and does not submit applications on your behalf. Always verify final requirements at your local Tahsil / Setu Suvidha Kendra and submit applications exclusively through authorized government portals.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G: FOOTER */}
      <footer className="mt-auto bg-white border-t border-[#E2EAE3] pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#16834A] flex items-center justify-center text-white">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-[#17231C]">
                  FormSaathi <span className="text-[#16834A]">AI</span>
                </span>
              </div>
              <p className="text-xs text-[#68756C] leading-relaxed">
                Your multilingual voice guide to citizen application forms in Marathi, Hindi, and English.
              </p>
            </div>

            {/* Col 2: Navigation */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#17231C] uppercase tracking-wider">Features</h4>
              <ul className="space-y-1.5 text-[#68756C]">
                <li>
                  <button onClick={onOpenExplainer} className="hover:text-[#16834A] cursor-pointer">
                    AI Form Explainer
                  </button>
                </li>
                <li>
                  <button onClick={onOpenVoice} className="hover:text-[#16834A] cursor-pointer">
                    Multilingual Voice Assistant
                  </button>
                </li>
                <li>
                  <button onClick={onOpenWizard} className="hover:text-[#16834A] cursor-pointer">
                    Guided Preparation Wizard
                  </button>
                </li>
                <li>
                  <button onClick={onOpenChecklist} className="hover:text-[#16834A] cursor-pointer">
                    Document Checklist
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Civic Resources */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#17231C] uppercase tracking-wider">Official Portals</h4>
              <ul className="space-y-1.5 text-[#68756C]">
                <li>
                  <button onClick={onOpenPortals} className="hover:text-[#16834A] cursor-pointer">
                    Aaple Sarkar (Maharashtra)
                  </button>
                </li>
                <li>
                  <button onClick={onOpenPortals} className="hover:text-[#16834A] cursor-pointer">
                    National Scholarship Portal
                  </button>
                </li>
                <li>
                  <button onClick={onOpenPortals} className="hover:text-[#16834A] cursor-pointer">
                    ServicePlus Platform
                  </button>
                </li>
                <li>
                  <button onClick={onOpenPortals} className="hover:text-[#16834A] cursor-pointer">
                    DigiLocker Digital Wallet
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Trust & Policies */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#17231C] uppercase tracking-wider">Information & Trust</h4>
              <ul className="space-y-1.5 text-[#68756C]">
                <li>
                  <button onClick={() => setActiveModal('about')} className="hover:text-[#16834A] cursor-pointer">
                    About FormSaathi AI
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('privacy')} className="hover:text-[#16834A] cursor-pointer">
                    Privacy Policy & Data Ethics
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('terms')} className="hover:text-[#16834A] cursor-pointer">
                    Terms & Civic Disclaimer
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('contact')} className="hover:text-[#16834A] cursor-pointer">
                    Helpline & Feedback
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E2EAE3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#68756C]">
            <p>© {new Date().getFullYear()} FormSaathi AI • Independent Citizen Assistance Project</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveModal('privacy')} className="hover:text-[#16834A] cursor-pointer">
                Privacy
              </button>
              <span>•</span>
              <button onClick={() => setActiveModal('terms')} className="hover:text-[#16834A] cursor-pointer">
                Terms
              </button>
              <span>•</span>
              <button onClick={() => setActiveModal('contact')} className="hover:text-[#16834A] cursor-pointer">
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessible Modals for Footer Links */}
      <FooterModals
        type={activeModal}
        onClose={() => setActiveModal(null)}
        language={currentLang}
      />
    </div>
  );
};
