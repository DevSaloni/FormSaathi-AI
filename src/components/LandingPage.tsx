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
  Volume2,
  Check
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { HeroPreview } from './HeroPreview';
import { FooterModals } from './FooterModals';
import { FormSaathiLogo } from './FormSaathiLogo';

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

  // Complete Multilingual Civic Content for Landing Page & Footer
  const civic = {
    mr: {
      reassurancePills: [
        'लॉगिन किंवा खाजगी माहितीची गरज नाही',
        'मराठी, हिंदी आणि सोपे इंग्रजी आवाज साहाय्य',
        '१००% मोफत नागरिक साहाय्यता',
      ],
      problems: {
        badge: 'फॉर्मसाथी का आवश्यक आहे?',
        title: 'नागरिकांच्या प्रत्यक्ष अडचणींवर संवेदनशील उपाय',
        subtitle: 'सरकारी अर्जांसाठी मध्यस्थांना पैसे देणे किंवा असहाय्य वाटणे थांबले पाहिजे. फॉर्मसाथी कशाप्रकारे मदत करतो ते येथे पहा.',
        problemLabel: 'अडचण',
        solutionLabel: 'फॉर्मसाथी उपाय',
      },
      howItWorks: {
        badge: 'चार सोप्या पायऱ्या',
        title: 'फॉर्मसाथी AI कसे मार्गदर्शन करते',
        subtitle: 'कोणतीही किचकट प्रक्रिया नाही. दोन मिनिटांत प्रत्येक रकान्याची स्पष्टता मिळवा.',
      },
      features: {
        badge: 'संपूर्ण सुविधा संच',
        title: 'सरकारी फॉर्म सहज भरण्यासाठी सर्व साधने',
        subtitle: 'सुलभता, स्पष्टता आणि मानसिक समाधानासाठी विशेष रचना.',
      },
      accessibility: {
        badge: 'सुलभता आणि प्रामाणिक मार्गदर्शन • पडताळलेली नैतिकता',
        title: 'उच्च कॉन्ट्रास्ट, आवाज साहाय्य आणि संपूर्ण पारदर्शकता',
        subtitle: 'सुलभता ही केवळ एक सोय नाही — तर नागरिकांना अवघड कागदपत्रांमुळे सरकारी योजनांपासून वंचित राहावे लागू नये हेच फॉर्मसाथी AI चे मूळ उद्दिष्ट आहे.',
        card1Title: 'मोठे नियंत्रणे व उच्च कॉन्ट्रास्ट',
        card1Desc: 'ज्येष्ठ नागरिक आणि कमी दृष्टी असलेल्या नागरिकांसाठी स्पष्ट अक्षरे, मोठे बटन्स व सोपी नियंत्रणे.',
        card2Title: 'आवाज आणि मजकूर दोन्ही पर्याय',
        card2Desc: 'माईक नसल्यास किंवा गोंधळाच्या ठिकाणी पूर्णपणे लिहून किंवा वाचून वापरता येण्याची सोय.',
        card3Title: 'स्वतंत्र व विश्वासार्ह साहाय्यक',
        card3Desc: 'केवळ मार्गदर्शन करते. दाखले वाटप करत नाही किंवा अधिकृत सरकारी मंजुरीचा खोटा दावा करत नाही.',
        noticeTitle: 'पारदर्शक नागरिक सूचना:',
        noticeText: 'फॉर्मसाथी AI हा अर्ज समजण्यासाठी नागरिकांचा स्वतंत्र मार्गदर्शक आहे. ही कोणतीही सरकारी संस्था नाही आणि तुमच्या वतीने अर्ज दाखल करत नाही. अंतिम नियम नेहमी स्थानिक तहसील किंवा सेतू केंद्रात तपासावेत आणि केवळ अधिकृत सरकारी पोर्टलवरूनच अर्ज करावेत.',
      },
      footer: {
        tagline: 'मराठी, हिंदी आणि इंग्रजीत सरकारी अर्जांसाठी तुमचा बोलणारा साहाय्यक.',
        featuresTitle: 'सुविधा',
        featExplainer: 'AI फॉर्म फोटो स्पष्टीकरण',
        featVoice: 'बहुभाषिक आवाज साहाय्यक',
        featWizard: 'पायरी-दर-पायरी अर्ज तयारी',
        featChecklist: 'आवश्यक कागदपत्र यादी',
        portalsTitle: 'अधिकृत शासकीय पोर्टल्स',
        portalAaple: 'आपले सरकार (महाराष्ट्र)',
        portalNSP: 'राष्ट्रीय शिष्यवृत्ती पोर्टल',
        portalServicePlus: 'सर्व्हिसप्लस प्लॅटफॉर्म',
        portalDigiLocker: 'डिजीलॉकर डिजिटल वॉलेट',
        trustTitle: 'माहिती व विश्वास',
        aboutLink: 'फॉर्मसाथी AI बद्दल',
        privacyLink: 'गोपनीयता धोरण व डेटा नैतिकता',
        termsLink: 'अटी व नागरिक अस्वीकरण',
        contactLink: 'मदत व अभिप्राय',
        copyright: `© ${new Date().getFullYear()} फॉर्मसाथी AI • स्वतंत्र नागरिक साहाय्यता प्रकल्प`,
        privacy: 'गोपनीयता',
        terms: 'अटी',
        contact: 'संपर्क',
      },
    },
    hi: {
      reassurancePills: [
        'लॉगिन या व्यक्तिगत जानकारी की आवश्यकता नहीं',
        'मराठी, हिंदी और सरल अंग्रेजी वॉयस सहायता',
        '१००% निःशुल्क नागरिक सेवा',
      ],
      problems: {
        badge: 'फॉर्मसाथी क्यों जरूरी है?',
        title: 'नागरिकों की वास्तविक समस्याएं, संवेदनशीलता से समाधान',
        subtitle: 'सरकारी दस्तावेजों के लिए बिचौलियों को पैसे देने या असहाय महसूस करने की जरूरत नहीं। फॉर्मसाथी का सरल समाधान देखें।',
        problemLabel: 'समस्या',
        solutionLabel: 'फॉर्मसाथी समाधान',
      },
      howItWorks: {
        badge: 'चार सरल चरण',
        title: 'फॉर्मसाथी AI आपका मार्गदर्शन कैसे करता है',
        subtitle: 'कोई जटिल सेटअप नहीं। दो मिनट में हर कॉलम की स्पष्ट जानकारी प्राप्त करें।',
      },
      features: {
        badge: 'सम्पूर्ण सुविधा संग्रह',
        title: 'सरकारी फॉर्म आसानी से समझने के सभी साधन',
        subtitle: 'सुलभता, स्पष्टता और निश्चिंतता के लिए विशेष रूप से डिज़ाइन किया गया।',
      },
      accessibility: {
        badge: 'सुलभता और प्रामाणिक मार्गदर्शन • सत्यापित नैतिकता',
        title: 'उच्च कंट्रास्ट, वॉयस सहायता और पूर्ण पारदर्शिता के लिए निर्मित',
        subtitle: 'सुलभता कोई औपचारिकता नहीं — फॉर्मसाथी का मुख्य उद्देश्य यह सुनिश्चित करना है कि कोई भी नागरिक जटिल कागजी कार्रवाई के कारण सरकारी लाभों से वंचित न रहे।',
        card1Title: 'बड़े कंट्रोल्स और उच्च कंट्रास्ट',
        card1Desc: 'वरिष्ठ नागरिकों और कम दृष्टि वाले लोगों के लिए स्पष्ट अक्षर, बड़े बटन्स और आसान टच टारगेट्स।',
        card2Title: 'वॉयस और टेक्स्ट दोनों विकल्प',
        card2Desc: 'माइक न होने पर या शोर वाले वातावरण में टाइप करके या पढ़कर उपयोग की पूर्ण सुविधा।',
        card3Title: 'स्वतंत्र और विश्वसनीय साथी',
        card3Desc: 'केवल मार्गदर्शन प्रदान करता है। प्रमाण पत्र जारी करने या सरकारी मंजूरी का झूठा दावा कभी नहीं करता।',
        noticeTitle: 'पारदर्शी नागरिक सूचना:',
        noticeText: 'फॉर्मसाथी AI फॉर्म समझने में नागरिकों की सहायता के लिए एक स्वतंत्र मार्गदर्शक है। यह कोई आधिकारिक सरकारी एजेंसी नहीं है और आपकी ओर से आवेदन जमा नहीं करती। अंतिम आवश्यकताएं अपने स्थानीय तहसील या सीएससी केंद्र पर सत्यापित करें और केवल अधिकृत सरकारी पोर्टल से आवेदन करें।',
      },
      footer: {
        tagline: 'मराठी, हिंदी और अंग्रेजी में सरकारी आवेदनों के लिए आपका वॉयस गाइड।',
        featuresTitle: 'सुविधाएं',
        featExplainer: 'AI फॉर्म फोटो एक्सप्लेनर',
        featVoice: 'बहुभाषी वॉयस असिस्टेंट',
        featWizard: 'मार्गदर्शित तैयारी विज़ार्ड',
        featChecklist: 'दस्तावेज चेकलिस्ट',
        portalsTitle: 'आधिकारिक पोर्टल',
        portalAaple: 'आपले सरकार (महाराष्ट्र)',
        portalNSP: 'राष्ट्रीय छात्रवृत्ति पोर्टल',
        portalServicePlus: 'सर्विसप्लस प्लेटफॉर्म',
        portalDigiLocker: 'डिजिलॉकर डिजिटल वॉलेट',
        trustTitle: 'जानकारी व विश्वास',
        aboutLink: 'फॉर्मसाथी AI के बारे में',
        privacyLink: 'गोपनीयता नीति व डेटा नैतिकता',
        termsLink: 'नियम व नागरिक अस्वीकरण',
        contactLink: 'सहायता व फीडबैक',
        copyright: `© ${new Date().getFullYear()} फॉर्मसाथी AI • स्वतंत्र नागरिक सहायता परियोजना`,
        privacy: 'गोपनीयता',
        terms: 'नियम',
        contact: 'संपर्क',
      },
    },
    en: {
      reassurancePills: [
        'No login or personal data needed',
        'Marathi, Hindi & English Voice Guidance',
        '100% Free Civic Resource',
      ],
      problems: {
        badge: 'Why FormSaathi Matters',
        title: 'Real Citizen Struggles, Solved with Empathy',
        subtitle: 'Applying for government documents should not require paying agents or feeling helpless. Here is how FormSaathi transforms the experience.',
        problemLabel: 'The Problem',
        solutionLabel: 'FormSaathi Solution',
      },
      howItWorks: {
        badge: 'Four Simple Steps',
        title: 'How FormSaathi AI Guides You',
        subtitle: 'No complicated setups. Get field-level clarity in less than two minutes.',
      },
      features: {
        badge: 'Complete Feature Suite',
        title: 'Every Tool You Need to Conquer Forms',
        subtitle: 'Designed specifically for accessibility, clarity, and peace of mind.',
      },
      accessibility: {
        badge: 'Accessibility First • Verified Ethics',
        title: 'Built for High Contrast, Voice, and Complete Honesty',
        subtitle: 'Accessibility is not an afterthought — it is the entire mission of FormSaathi AI. We believe no citizen should be denied benefits due to confusing paperwork.',
        card1Title: 'Large Controls & High Contrast',
        card1Desc: 'Generous 48px touch targets, clean typographic scale, and accessible focus outlines for elderly and low-vision citizens.',
        card2Title: 'Voice & Text Alternatives',
        card2Desc: 'Every voice feature has a complete keyboard/touch equivalent so users without microphones or in loud environments are never stuck.',
        card3Title: 'Independent & Trustworthy',
        card3Desc: 'Explicitly distinguishes verified rules from items to confirm. Never claims to issue certificates or approve applications.',
        noticeTitle: 'Transparent Citizen Notice:',
        noticeText: 'FormSaathi AI is an independent civic guide created to assist with form comprehension. It is not an official government agency and does not submit applications on your behalf. Always verify final requirements at your local Tahsil / Setu Suvidha Kendra and submit applications exclusively through authorized government portals.',
      },
      footer: {
        tagline: 'Your multilingual voice guide to citizen application forms in Marathi, Hindi, and English.',
        featuresTitle: 'Features',
        featExplainer: 'AI Form Explainer',
        featVoice: 'Multilingual Voice Assistant',
        featWizard: 'Guided Preparation Wizard',
        featChecklist: 'Document Checklist',
        portalsTitle: 'Official Portals',
        portalAaple: 'Aaple Sarkar (Maharashtra)',
        portalNSP: 'National Scholarship Portal',
        portalServicePlus: 'ServicePlus Platform',
        portalDigiLocker: 'DigiLocker Digital Wallet',
        trustTitle: 'Information & Trust',
        aboutLink: 'About FormSaathi AI',
        privacyLink: 'Privacy Policy & Data Ethics',
        termsLink: 'Terms & Civic Disclaimer',
        contactLink: 'Helpline & Feedback',
        copyright: `© ${new Date().getFullYear()} FormSaathi AI • Independent Citizen Assistance Project`,
        privacy: 'Privacy',
        terms: 'Terms',
        contact: 'Contact',
      },
    },
  }[currentLang];

  return (
    <div className="min-h-screen bg-[#F0F8F2] flex flex-col">
      {/* SECTION B: HERO SECTION WITH REALISTIC CIVIC BACKGROUND (FITS VIEWPORT WITHOUT SCROLL) */}
      <section id="hero" className="relative py-4 sm:py-6 lg:py-4 xl:py-6 lg:min-h-[calc(100vh-4.5rem)] lg:flex lg:items-center overflow-hidden">
        {/* Realistic Civic Photographic Backdrop with Soft Emerald Overlay */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/src/assets/images/civic_hero_backdrop_1792418389946.jpg"
            alt="Citizen Service Center Assistance"
            aria-hidden="true"
            className="w-full h-full object-cover object-center lg:object-[center_35%] scale-105 opacity-[0.20] sm:opacity-[0.25] transition-opacity duration-500 filter saturate-[0.85]"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {/* Gentle emerald/white radiant gradient overlay guaranteeing 100% WCAG AAA readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F0F8F2]/98 via-[#F0F8F2]/92 to-[#F0F8F2]/82" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F0F8F2] via-transparent to-[#F0F8F2]" />
          {/* Subtle civic authority dot matrix */}
          <div className="absolute inset-0 bg-[radial-gradient(#16834A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4 lg:space-y-3.5 xl:space-y-4 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-[#E2EAE3] shadow-xs text-xs font-semibold text-[#105C38]">
                <ShieldCheck className="w-4 h-4 text-[#16834A]" />
                <span>{t.hero.trustBadge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[34px] xl:text-[42px] font-extrabold text-[#17231C] tracking-tight leading-[1.18]">
                {t.hero.headline}
              </h1>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base lg:text-[15px] xl:text-base text-[#68756C] font-normal leading-relaxed max-w-2xl">
                {t.hero.supportingText}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  onClick={onOpenExplainer}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#16834A] hover:bg-[#105C38] active:scale-98 transition-all shadow-md cursor-pointer"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{t.hero.explainCTA}</span>
                </button>

                <button
                  onClick={onOpenVoice}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#105C38] bg-white hover:bg-[#F0F8F2] border border-[#E2EAE3] active:scale-98 transition-all shadow-xs cursor-pointer"
                >
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-[#16834A]" />
                  <span>{t.hero.voiceCTA}</span>
                </button>
              </div>

              {/* Reassurance pills (Fully Localized) */}
              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 pt-1.5 text-xs font-medium text-[#68756C]">
                {civic.reassurancePills.map((pill, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16834A] shrink-0" />
                    <span>{pill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Product Preview (Optimized so it fits completely without scroll at 100% zoom) */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
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
      <section className="py-14 sm:py-20 bg-white border-y border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20">
              {civic.problems.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#17231C]">
              {civic.problems.title}
            </h2>
            <p className="text-sm sm:text-base text-[#68756C] leading-relaxed">
              {civic.problems.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {problemSolutions.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-[#E2EAE3] p-6 sm:p-8 bg-[#FAFCFA] hover:border-[#16834A]/30 transition-all shadow-xs space-y-5"
              >
                {/* Problem Box */}
                <div className="space-y-2 pb-4 border-b border-[#E2EAE3]">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wide">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{civic.problems.problemLabel}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#17231C]">{item.problem}</h3>
                  <p className="text-xs sm:text-sm text-[#68756C] leading-relaxed">{item.problemDesc}</p>
                </div>

                {/* Solution Box */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#105C38] font-bold text-xs uppercase tracking-wide">
                    <Sparkles className="w-4 h-4 text-[#16834A]" />
                    <span>{civic.problems.solutionLabel}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[#105C38]">{item.solution}</h4>
                  <p className="text-xs sm:text-sm text-[#17231C] leading-relaxed">{item.solutionDesc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Real-World Civic Assistance Photographic Banner */}
          <div className="mt-10 sm:mt-12 rounded-3xl overflow-hidden border border-[#E2EAE3] bg-gradient-to-br from-[#105C38] via-[#12683E] to-[#16834A] text-white p-6 sm:p-8 lg:p-10 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-xs inline-block">
                  {currentLang === 'mr' ? 'प्रत्यक्ष नागरिक अनुभव' : currentLang === 'hi' ? 'वास्तविक नागरिक अनुभव' : 'Real Citizen Experience'}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-snug">
                  {currentLang === 'mr'
                    ? 'घरी बसून फॉर्म समजून घ्या, सेतू केंद्रावर आत्मविश्वासाने जा'
                    : currentLang === 'hi'
                    ? 'घर बैठे फॉर्म समझें, पूरे आत्मविश्वास से सेवा केंद्र पहुंचें'
                    : 'Understand Every Form at Home, Visit the Center with Confidence'}
                </h3>
                <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-xl">
                  {currentLang === 'mr'
                    ? 'तहसील कार्यालय किंवा सेतू केंद्रात रांगेत उभे राहण्यापूर्वी तुमचा अर्ज आणि कागदपत्रे अचूक तयार ठेवा. फॉर्मसाथी AI तुम्हाला प्रत्येक रकान्याची खरी माहिती देते.'
                    : currentLang === 'hi'
                    ? 'तहसील या सीएससी केंद्र जाने से पहले अपने सभी दस्तावेज और जानकारी तैयार रखें। फॉर्मसाथी AI हर कॉलम का सही अर्थ आपकी अपनी भाषा में बताता है।'
                    : 'Before standing in government office queues, ensure your documents and fields are completely clear. FormSaathi AI gives you verified guidance in your mother tongue.'}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={onOpenExplainer}
                    className="px-4 sm:px-5 py-2.5 rounded-xl bg-white text-[#105C38] font-bold text-xs sm:text-sm hover:bg-[#F0F8F2] transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4 text-[#16834A]" />
                    <span>{currentLang === 'mr' ? 'अर्ज स्कॅन करून पहा' : currentLang === 'hi' ? 'फॉर्म स्कैन करके देखें' : 'Try Form Scanner'}</span>
                  </button>
                  <button
                    onClick={onOpenVoice}
                    className="px-4 sm:px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-colors border border-white/20 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Mic className="w-4 h-4" />
                    <span>{currentLang === 'mr' ? 'आवाजात प्रश्न विचारा' : currentLang === 'hi' ? 'बोलकर प्रश्न पूछें' : 'Ask with Voice'}</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white/20 group">
                  <img
                    src="/src/assets/images/citizen_scanning_form_1792418373793.jpg"
                    alt="Citizen scanning government form with smartphone"
                    className="w-full h-52 sm:h-60 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3.5 sm:p-4">
                    <div className="text-white text-xs space-y-0.5">
                      <p className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {currentLang === 'mr' ? 'मोबाईल कॅमेऱ्याने अर्ज स्कॅनिंग' : currentLang === 'hi' ? 'मोबाइल से फॉर्म स्कैनिंग' : 'Mobile Form Scan & Verification'}
                      </p>
                      <p className="text-[11px] text-white/80">
                        {currentLang === 'mr' ? 'मराठी, हिंदी व इंग्रजी अर्जांची सुलभ तपासणी' : currentLang === 'hi' ? 'मराठी, हिंदी और अंग्रेजी फॉर्म्स की सरल जांच' : 'Multi-lingual Form Analysis at Citizen Centers'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: HOW IT WORKS (4 STEPS) */}
      <section id="how-it-works" className="py-14 sm:py-20 bg-[#F0F8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-white px-3 py-1 rounded-full border border-[#E2EAE3]">
              {civic.howItWorks.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#17231C]">
              {civic.howItWorks.title}
            </h2>
            <p className="text-sm sm:text-base text-[#68756C]">
              {civic.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {steps.map((st, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2EAE3] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-black text-[#16834A] opacity-90">{st.number}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F0F8F2] text-[#105C38]">
                      {st.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#17231C] leading-snug">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-[#68756C] leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION E: FEATURES GRID (6 CARDS) */}
      <section id="features" className="py-14 sm:py-20 bg-white border-t border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20">
              {civic.features.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#17231C]">
              {civic.features.title}
            </h2>
            <p className="text-sm sm:text-base text-[#68756C]">
              {civic.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feat, index) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={index}
                  className="rounded-3xl border border-[#E2EAE3] p-6 sm:p-7 bg-[#FAFCFA] hover:bg-white hover:border-[#16834A]/40 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#F0F8F2] border border-[#E2EAE3] text-[#16834A] flex items-center justify-center group-hover:bg-[#16834A] group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#17231C]">{feat.title}</h3>
                    <p className="text-xs sm:text-sm text-[#68756C] leading-relaxed">{feat.desc}</p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#E2EAE3]">
                    <button
                      onClick={feat.action}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#16834A] hover:text-[#105C38] cursor-pointer group-hover:translate-x-0.5 transition-transform"
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

      {/* SECTION E2: GUIDED PREPARATION WIZARD (HOMEPAGE SHOWCASE WITH REAL IMAGES) */}
      <section id="guided-prep" className="py-14 sm:py-20 bg-[#F0F8F2] border-t border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-white px-3 py-1 rounded-full border border-[#E2EAE3] inline-flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#16834A]" />
              <span>
                {currentLang === 'mr' ? 'पायरी-दर-पायरी तयारी' : currentLang === 'hi' ? 'चरणबद्ध तैयारी' : 'Step-by-Step Preparation'}
              </span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#17231C]">
              {currentLang === 'mr'
                ? 'मार्गदर्शित अर्ज तयारी विझार्ड (Guided Preparation)'
                : currentLang === 'hi'
                ? 'मार्गदर्शित आवेदन तैयारी विज़ार्ड (Guided Preparation)'
                : 'Guided Application Preparation Wizard'}
            </h2>
            <p className="text-sm sm:text-base text-[#68756C] leading-relaxed">
              {currentLang === 'mr'
                ? 'सरकारी अर्जांमधील क्लिष्ट रकाने भरण्याची भीती वाटते? एका वेळी एकाच प्रश्नाचे साध्या मराठीत उत्तर द्या. बोलून किंवा लिहून माहिती तयार ठेवा आणि सेतू केंद्रासाठी स्वच्छ सारांश प्रिंट करा.'
                : currentLang === 'hi'
                ? 'कठिन सरकारी फॉर्म भरने का डर खत्म करें। एक समय में एक ही सवाल का जवाब अपनी भाषा में दें। बोलकर या लिखकर विवरण भरें और सीएससी केंद्र के लिए तैयार सारांश प्राप्त करें।'
                : 'Conquer form anxiety. Answer one plain-language question at a time using your voice or keyboard, and export an organized civic summary before visiting the Tahsil office.'}
            </p>
          </div>

          {/* Interactive Guided Preparation Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Columns: Step Walkthrough & Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    step: '01',
                    title: currentLang === 'mr' ? 'उद्देश व योजना निवड' : currentLang === 'hi' ? 'उद्देश्य व योजना चयन' : 'Purpose & Scheme',
                    desc: currentLang === 'mr' ? 'शिक्षणासाठी, नोकरीसाठी की शेती योजनेसाठी अर्ज आहे हे निवडा.' : currentLang === 'hi' ? 'शिक्षा, नौकरी या सरकारी योजना के अनुसार सही श्रेणी चुनें।' : 'Identify your specific need: education, employment, or subsidies.',
                  },
                  {
                    step: '02',
                    title: currentLang === 'mr' ? 'अधिकारक्षेत्र तपासणी' : currentLang === 'hi' ? 'अधिकार क्षेत्र पुष्टि' : 'Jurisdiction Check',
                    desc: currentLang === 'mr' ? 'तुमचा तालुका, जिल्हा व स्थानिक सेतू केंद्र निश्चित करा.' : currentLang === 'hi' ? 'अपना तहसील, अनुमंडल व स्थानीय सेवा केंद्र निर्धारित करें।' : 'Pinpoint your local Tahsil, CSC, or online portal authority.',
                  },
                  {
                    step: '03',
                    title: currentLang === 'mr' ? 'आवाजात सोपे प्रश्न-उत्तर' : currentLang === 'hi' ? 'बोलकर सरल प्रश्न-उत्तर' : 'Voice-Guided Questions',
                    desc: currentLang === 'mr' ? 'माईक दाबून घरगुती भाषेत उत्तरे सांगा. सिस्टीम योग्य रकान्यात नोंदवते.' : currentLang === 'hi' ? 'माइक दबाकर सरल उत्तर दें। सिस्टम सही कॉलम में विवरण तैयार करेगा।' : 'Answer plain questions by speaking; system structures official values.',
                  },
                  {
                    step: '04',
                    title: currentLang === 'mr' ? 'स्वच्छ सारांश डाऊनलोड' : currentLang === 'hi' ? 'तैयार सारांश डाउनलोड' : 'Printable Clean Summary',
                    desc: currentLang === 'mr' ? 'केंद्रात जाण्यापूर्वी संपूर्ण तयारीची छापील प्रत जवळ बाळगा.' : currentLang === 'hi' ? 'केंद्र जाने से पहले सभी उत्तरों की साफ पर्ची साथ रखें।' : 'Carry a neat field reference sheet to the operator with zero anxiety.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2EAE3] shadow-xs space-y-2 hover:border-[#16834A]/30 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#16834A] bg-[#F0F8F2] px-2 py-0.5 rounded-md border border-[#16834A]/20">
                        STEP {item.step}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-[#16834A]" />
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-[#17231C]">{item.title}</h4>
                    <p className="text-xs text-[#68756C] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onOpenWizard}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#16834A] hover:bg-[#105C38] active:scale-98 transition-all shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{currentLang === 'mr' ? 'मार्गदर्शित तयारी सुरू करा' : currentLang === 'hi' ? 'मार्गदर्शित तैयारी शुरू करें' : 'Launch Guided Prep Wizard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenVoice}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#105C38] bg-white hover:bg-[#F0F8F2] border border-[#E2EAE3] active:scale-98 transition-all shadow-xs cursor-pointer"
                >
                  <Mic className="w-4 h-4 text-[#16834A]" />
                  <span>{currentLang === 'mr' ? 'आवाजात मदत घ्या' : currentLang === 'hi' ? 'वॉयस सहायता लें' : 'Voice Assistance'}</span>
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Real Photographic Showcase with Live Context */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden border-2 border-white shadow-lg group">
                <img
                  src="/src/assets/images/guided_citizen_prep_1792419286982.jpg"
                  alt="Student and citizen preparing government documents with voice guidance"
                  className="w-full h-64 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-5">
                  <div className="text-white space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#16834A] text-white px-2 py-0.5 rounded-md">
                      {currentLang === 'mr' ? 'थेट तयारी उदाहरण' : currentLang === 'hi' ? 'लाइव तैयारी उदाहरण' : 'Active Preparation'}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold">
                      {currentLang === 'mr' ? 'विद्यार्थी व नागरिकांसाठी निर्धास्त अर्ज साहाय्य' : currentLang === 'hi' ? 'छात्रों व नागरिकों के लिए सरल आवेदन तैयारी' : 'Empowering Students & Citizens with Clear Answers'}
                    </h4>
                    <p className="text-xs text-white/80">
                      {currentLang === 'mr' ? 'कॉलेज प्रवेश, शिष्यवृत्ती किंवा दाखल्यांसाठी पूर्वतयारी' : currentLang === 'hi' ? 'छात्रवृत्ति व जाति/आय प्रमाण पत्र के लिए अग्रिम तैयारी' : 'Prepare exact answers before visiting official centers'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E3: VERIFIED DOCUMENT CHECKLIST (HOMEPAGE SHOWCASE WITH REAL IMAGES) */}
      <section id="checklists" className="py-14 sm:py-20 bg-white border-t border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20 inline-flex items-center gap-1.5 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16834A]" />
              <span>
                {currentLang === 'mr' ? 'पडताळलेली चेकलिस्ट' : currentLang === 'hi' ? 'सत्यापित चेकलिस्ट' : 'Verified Checklist'}
              </span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#17231C]">
              {currentLang === 'mr'
                ? 'अधिकृत कागदपत्र पडताळणी चेकलिस्ट (Document Checklist)'
                : currentLang === 'hi'
                ? 'आधिकारिक दस्तावेज सत्यापन चेकलिस्ट (Document Checklist)'
                : 'Official Document Verification Checklist'}
            </h2>
            <p className="text-sm sm:text-base text-[#68756C] leading-relaxed">
              {currentLang === 'mr'
                ? 'एक कागदपत्र कमी असल्यास सेतू किंवा तहसील कार्यालयात फेऱ्या माराव्या लागतात. अधिकृत सरकारी नियमांनुसार खात्रीशीर यादी तपासा. अनिवार्य व स्थानिक पातळीवर लागणारे कागदपत्रे स्पष्ट समजून घ्या.'
                : currentLang === 'hi'
                ? 'एक भी दस्तावेज छूट जाने पर बार-बार सरकारी दफ्तरों के चक्कर लगाने पड़ते हैं। आपले सरकार और राजस्व विभाग के नियमों के अनुसार हर प्रमाण पत्र की सटीक सूची देखें।'
                : 'Never stand in office lines repeatedly due to a missing document. FormSaathi distinguishes verified statutory requirements from items to confirm locally with revenue officers.'}
            </p>
          </div>

          {/* Interactive Checklist Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 5 Columns: Real Photographic Showcase of Official Documents & Stamp */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#E2EAE3] shadow-lg group">
                <img
                  src="/src/assets/images/document_checklist_desk_1792419263473.jpg"
                  alt="Official Indian revenue certificates, stamps, Aadhaar card, and checklist on desk"
                  className="w-full h-64 sm:h-76 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-5">
                  <div className="text-white space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#105C38] text-white px-2 py-0.5 rounded-md">
                      {currentLang === 'mr' ? 'महसूल पडताळणी मानके' : currentLang === 'hi' ? 'राजस्व विभाग मानक' : 'Official Revenue Standards'}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold">
                      {currentLang === 'mr' ? 'उत्पन्न, जात, अधिवास व रेशन कार्ड कागदपत्रे' : currentLang === 'hi' ? 'आय, जाति, निवास व राशन कार्ड दस्तावेज' : 'Income, Caste, Domicile & Ration Card Norms'}
                    </h4>
                    <p className="text-xs text-white/80">
                      {currentLang === 'mr' ? 'आधार, रेशन कार्ड, तलाठी अहवाल व प्रतिज्ञापत्राची खात्री' : currentLang === 'hi' ? 'आधार, राशन कार्ड, पटवारी रिपोर्ट व शपथ पत्र की सटीक जांच' : 'Cross-referenced with Aaple Sarkar & ServicePlus'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Callout */}
              <div className="p-3.5 rounded-2xl bg-[#FAFCFA] border border-[#E2EAE3] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#16834A] shrink-0" />
                <p className="text-xs text-[#17231C] leading-snug">
                  <strong>{currentLang === 'mr' ? 'स्थानिक फेरबदल स्पष्टता:' : currentLang === 'hi' ? 'स्थानीय नियम स्पष्टता:' : 'Local Norms Transparency:'}</strong>{' '}
                  {currentLang === 'mr'
                    ? 'स्थानिक तलाठी किंवा सेतू नियमांनुसार आवश्यक गोष्टी आधीच समजून घ्या.'
                    : currentLang === 'hi'
                    ? 'तहसील स्तर पर मांगी जाने वाली विशेष रिपोर्ट पहले ही समझें।'
                    : 'Clearly marks whether a report requires Tahsil or Patwari counter-signature.'}
                </p>
              </div>
            </div>

            {/* Right 7 Columns: Interactive Sample Checklist Card */}
            <div className="lg:col-span-7 bg-[#FAFCFA] rounded-3xl border border-[#E2EAE3] p-5 sm:p-7 space-y-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2EAE3]">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#17231C]">
                    {currentLang === 'mr' ? 'नमुना कागदपत्र यादी: उत्पन्न व जात दाखला' : currentLang === 'hi' ? 'नमूना दस्तावेज सूची: आय व जाति प्रमाण पत्र' : 'Interactive Sample: Income & Caste Certificate'}
                  </h3>
                  <p className="text-xs text-[#68756C]">
                    {currentLang === 'mr' ? 'अधिकृत सेतू केंद्र मार्गदर्शक नियमांनुसार' : currentLang === 'hi' ? 'अधिकृत सेवा केंद्र दिशानिर्देशानुसार' : 'Verified against Setu Suvidha Kendra guidelines'}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#105C38] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20 self-start sm:self-auto shrink-0">
                  {currentLang === 'mr' ? '१०+ अधिकृत दाखले उपलब्ध' : currentLang === 'hi' ? '१०+ प्रमाण पत्र उपलब्ध' : '10+ Official Forms'}
                </span>
              </div>

              {/* Sample Checklist items */}
              <div className="space-y-2.5">
                {[
                  {
                    name: currentLang === 'mr' ? 'अर्जदाराचे आधार कार्ड (चालू मोबाईल नंबर लिंक)' : currentLang === 'hi' ? 'आवेदक आधार कार्ड (सक्रिय मोबाइल नंबर सहित)' : 'Applicant Aadhaar Card (Mobile Linked)',
                    status: currentLang === 'mr' ? 'अनिवार्य ओळख पुरावा' : currentLang === 'hi' ? 'अनिवार्य पहचान प्रमाण' : 'Mandatory Identity Proof',
                    verified: true,
                  },
                  {
                    name: currentLang === 'mr' ? 'रेशन कार्ड सत्यप्रत (१२ अंकी RC क्रमांक व कुटुंब तपशील)' : currentLang === 'hi' ? 'राशन कार्ड प्रति (मुखिया व परिवार सदस्य विवरण)' : 'Ration Card Copy (12-digit RC & Family Details)',
                    status: currentLang === 'mr' ? 'अनिवार्य रहिवासी पुरावा' : currentLang === 'hi' ? 'अनिवार्य निवास प्रमाण' : 'Mandatory Address & Family Proof',
                    verified: true,
                  },
                  {
                    name: currentLang === 'mr' ? 'तलाठी उत्पन्न चौकशी अहवाल / सर्कल ऑफिसर स्वाक्षरी' : currentLang === 'hi' ? 'पटवारी / लेखपाल आय जांच आख्या' : 'Local Revenue Officer / Talathi Verification Report',
                    status: currentLang === 'mr' ? 'स्थानिक महसूल पुरावा' : currentLang === 'hi' ? 'स्थानीय राजस्व प्रमाण' : 'Local Revenue Verification',
                    verified: true,
                  },
                  {
                    name: currentLang === 'mr' ? 'स्वयंघोषणापत्र (Self Declaration Form)' : currentLang === 'hi' ? 'स्व-घोषणा पत्र (Self Declaration)' : 'Self-Declaration Form with Citizen Signature',
                    status: currentLang === 'mr' ? 'स्वाक्षरीसह' : currentLang === 'hi' ? 'हस्ताक्षर सहित' : 'With Signature',
                    verified: true,
                  },
                ].map((doc, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#E2EAE3] flex items-center justify-between gap-3 shadow-2xs hover:border-[#16834A]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-5 h-5 rounded-md bg-[#16834A] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-[#17231C] truncate">{doc.name}</p>
                        <p className="text-[11px] text-[#68756C]">{doc.status}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#105C38] bg-[#F0F8F2] px-2 py-0.5 rounded-md shrink-0">
                      {currentLang === 'mr' ? 'पडताळलेले' : currentLang === 'hi' ? 'सत्यापित' : 'Verified'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onOpenChecklist}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#16834A] hover:bg-[#105C38] active:scale-98 transition-all shadow-md cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{currentLang === 'mr' ? 'संपूर्ण चेकलिस्ट टूल उघडा' : currentLang === 'hi' ? 'सम्पूर्ण चेकलिस्ट टूल खोलें' : 'Open Full Checklist Tool'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenPortals}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-[#105C38] bg-white hover:bg-[#F0F8F2] border border-[#E2EAE3] active:scale-98 transition-all shadow-xs cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-[#16834A]" />
                  <span>{currentLang === 'mr' ? 'अधिकृत पोर्टल लिंक्स' : currentLang === 'hi' ? 'सरकारी पोर्टल लिंक्स' : 'Official Portal Links'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: ACCESSIBILITY, MISSION & TRUST SECTION (100% MULTILINGUAL) */}
      <section id="about" className="py-14 sm:py-20 bg-[#F0F8F2] border-t border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {/* Mission & Story Card with Real Civic Photo */}
          <div className="rounded-3xl border border-[#E2EAE3] bg-white p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20 inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16834A]" />
                  <span>{currentLang === 'mr' ? 'आमचे उद्दिष्ट व तत्त्वे' : currentLang === 'hi' ? 'हमारा उद्देश्य व सिद्धांत' : 'About & Mission'}</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C]">
                  {currentLang === 'mr'
                    ? 'प्रत्येक नागरिकाचा हक्क: सरकारी दाखल्यांची भीतीमुक्त तयारी'
                    : currentLang === 'hi'
                    ? 'हर नागरिक का अधिकार: सरकारी दस्तावेजों की भयमुक्त तैयारी'
                    : 'Democratizing Civic Paperwork with Dignity and Clarity'}
                </h2>
                <p className="text-sm sm:text-base text-[#68756C] leading-relaxed">
                  {currentLang === 'mr'
                    ? 'फॉर्मसाथी AI हा कोणत्याही एजंट किंवा मध्यस्थांशिवाय सर्वसामान्य नागरिकांना, शेतकऱ्यांना व विद्यार्थ्यांना स्वतःच्या मातृभाषेत सरकारी अर्जांची माहिती देण्यासाठी सुरू केलेला स्वतंत्र नागरिक उपक्रम आहे.'
                    : currentLang === 'hi'
                    ? 'फॉर्मसाथी AI किसी भी बिचौलिए के बिना आम नागरिकों, किसानों और छात्रों को उनकी मातृभाषा में सरकारी फॉर्म्स की सही जानकारी देने के लिए शुरू की गई एक स्वतंत्र नागरिक पहल है।'
                    : 'FormSaathi AI is an independent, non-commercial civic initiative built to bridge the literacy and language gap for official government forms in Maharashtra and across India.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#FAFCFA] border border-[#E2EAE3] space-y-1">
                    <p className="font-extrabold text-xs sm:text-sm text-[#105C38]">
                      {currentLang === 'mr' ? '१००% मोफत' : currentLang === 'hi' ? '१००% निःशुल्क' : '100% Free'}
                    </p>
                    <p className="text-[11px] text-[#68756C]">
                      {currentLang === 'mr' ? 'नागरिकांकडून कोणतीही फी घेतली जात नाही' : currentLang === 'hi' ? 'नागरिकों से कोई शुल्क नहीं लिया जाता' : 'No fees or hidden charges'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAFCFA] border border-[#E2EAE3] space-y-1">
                    <p className="font-extrabold text-xs sm:text-sm text-[#105C38]">
                      {currentLang === 'mr' ? 'डेटा गोपनीयता' : currentLang === 'hi' ? 'डेटा गोपनीयता' : 'Zero Data Stored'}
                    </p>
                    <p className="text-[11px] text-[#68756C]">
                      {currentLang === 'mr' ? 'आधार किंवा खाजगी माहिती साठवली जात नाही' : currentLang === 'hi' ? 'आधार या व्यक्तिगत डेटा एकत्र नहीं होता' : 'No personal data retention'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAFCFA] border border-[#E2EAE3] space-y-1">
                    <p className="font-extrabold text-xs sm:text-sm text-[#105C38]">
                      {currentLang === 'mr' ? 'अधिकृत पोर्टल' : currentLang === 'hi' ? 'अधिकृत पोर्टल' : 'Official Portals'}
                    </p>
                    <p className="text-[11px] text-[#68756C]">
                      {currentLang === 'mr' ? 'केवळ खात्रीशीर पोर्टलकडे दिशादर्शन' : currentLang === 'hi' ? 'केवल अधिकृत पोर्टल पर दिशा-निर्देश' : 'Direct links to Aaple Sarkar'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E2EAE3] group">
                  <img
                    src="/src/assets/images/citizen_forms_desk_1792418087637.jpg"
                    alt="Tahsil official assistance desk with certificates and stamps"
                    className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <p className="text-white text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {currentLang === 'mr' ? 'तहसील व सेतू कार्यालय पडताळणी' : currentLang === 'hi' ? 'तहसील व सीएससी कार्यालय सत्यापन' : 'Civic Standards & Ethics in Action'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E2EAE3] p-6 sm:p-10 lg:p-12 shadow-xs space-y-6 sm:space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16834A] bg-[#F0F8F2] px-3 py-1 rounded-full border border-[#16834A]/20">
                {civic.accessibility.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#17231C]">
                {civic.accessibility.title}
              </h2>
              <p className="text-sm sm:text-base text-[#68756C] leading-relaxed">
                {civic.accessibility.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-[#FAFCFA] border border-[#E2EAE3] space-y-2">
                <div className="flex items-center gap-2 text-[#105C38] font-bold text-sm">
                  <Eye className="w-4 h-4 text-[#16834A] shrink-0" />
                  <span>{civic.accessibility.card1Title}</span>
                </div>
                <p className="text-xs text-[#68756C] leading-relaxed">
                  {civic.accessibility.card1Desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAFCFA] border border-[#E2EAE3] space-y-2">
                <div className="flex items-center gap-2 text-[#105C38] font-bold text-sm">
                  <Volume2 className="w-4 h-4 text-[#16834A] shrink-0" />
                  <span>{civic.accessibility.card2Title}</span>
                </div>
                <p className="text-xs text-[#68756C] leading-relaxed">
                  {civic.accessibility.card2Desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAFCFA] border border-[#E2EAE3] space-y-2">
                <div className="flex items-center gap-2 text-[#105C38] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#16834A] shrink-0" />
                  <span>{civic.accessibility.card3Title}</span>
                </div>
                <p className="text-xs text-[#68756C] leading-relaxed">
                  {civic.accessibility.card3Desc}
                </p>
              </div>
            </div>

            {/* Visual Photographic Inclusion Highlight */}
            <div className="rounded-2xl overflow-hidden border border-[#E2EAE3] bg-[#FAFCFA] p-4 sm:p-5 flex flex-col md:flex-row items-center gap-5">
              <div className="w-full md:w-52 h-36 rounded-xl overflow-hidden shrink-0 border border-[#16834A]/20 shadow-xs">
                <img
                  src="/src/assets/images/voice_guide_citizen_1792418068688.jpg"
                  alt="Citizen using voice assistance with government application"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="space-y-1.5 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F0F8F2] text-[#105C38] text-[11px] font-bold border border-[#16834A]/25">
                  <Mic className="w-3.5 h-3.5 text-[#16834A]" />
                  <span>{currentLang === 'mr' ? 'नागरिक आवाज साहाय्य' : currentLang === 'hi' ? 'नागरिक वॉयस सहायता' : 'Voice-First Civic Assistance'}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#17231C]">
                  {currentLang === 'mr'
                    ? 'वाचता-लिहिता येत नसले तरीही बोलून अर्ज समजून घ्या'
                    : currentLang === 'hi'
                    ? 'पढ़ने-लिखने में कठिनाई होने पर भी बोलकर हर कॉलम समझें'
                    : 'Designed for Every Citizen: Speak & Listen in Everyday Words'}
                </h4>
                <p className="text-xs text-[#68756C] leading-relaxed">
                  {currentLang === 'mr'
                    ? 'ज्येष्ठ नागरिक किंवा ग्रामीण भागातील नागरिकांसाठी सोपी मराठी व हिंदी आवाज मदत. कोणताही अर्ज न घाबरता समजून घेता येतो.'
                    : currentLang === 'hi'
                    ? 'बुजुर्ग और ग्रामीण नागरिकों के लिए सहज हिंदी और मराठी आवाज में मार्गदर्शन। बिना किसी संकोच के सरकारी योजनाओं की तैयारी करें।'
                    : 'Empowering senior citizens and rural applicants across Maharashtra and India with respectful, clear audio guidance in Marathi, Hindi, and English.'}
                </p>
              </div>
            </div>

            {/* Prominent Civic Disclaimer Notice */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F0F8F2] border border-[#16834A]/30 text-xs sm:text-sm text-[#105C38] leading-relaxed">
              <strong>{civic.accessibility.noticeTitle}</strong> {civic.accessibility.noticeText}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G: FOOTER (100% MULTILINGUAL & BRAND LOGO INTEGRATED) */}
      <footer className="mt-auto bg-white border-t border-[#E2EAE3] pt-10 sm:pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Col 1: Custom FormSaathi AI Brand */}
            <div className="space-y-3 md:col-span-1">
              <FormSaathiLogo size="md" showText={true} />
              <p className="text-xs text-[#68756C] leading-relaxed pt-1">
                {civic.footer.tagline}
              </p>
            </div>

            {/* Col 2: Navigation Features */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#17231C] uppercase tracking-wider">{civic.footer.featuresTitle}</h4>
              <ul className="space-y-1.5 text-[#68756C]">
                <li>
                  <button onClick={onOpenExplainer} className="hover:text-[#16834A] cursor-pointer">
                    {civic.footer.featExplainer}
                  </button>
                </li>
                <li>
                  <button onClick={onOpenVoice} className="hover:text-[#16834A] cursor-pointer">
                    {civic.footer.featVoice}
                  </button>
                </li>
                <li>
                  <button onClick={onOpenWizard} className="hover:text-[#16834A] cursor-pointer">
                    {civic.footer.featWizard}
                  </button>
                </li>
                <li>
                  <button onClick={onOpenChecklist} className="hover:text-[#16834A] cursor-pointer">
                    {civic.footer.featChecklist}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Civic Resources */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#17231C] uppercase tracking-wider">{civic.footer.portalsTitle}</h4>
              <ul className="space-y-1.5 text-[#68756C]">
                <li>
                  <button onClick={onOpenPortals} className="hover:text-[#16834A] cursor-pointer">
                    {civic.footer.portalAaple}
                  </button>
                </li>
                <li>
                  <button onClick={onOpenPortals} className="hover:text-[#16834A] cursor-pointer">
                    {civic.footer.portalNSP}
                  </button>
                </li>
                <li>
                  <button onClick={onOpenPortals} className="hover:text-[#16834A] cursor-pointer">
                    {civic.footer.portalServicePlus}
                  </button>
                </li>
                <li>
                  <button onClick={onOpenPortals} className="hover:text-[#16834A] cursor-pointer">
                    {civic.footer.portalDigiLocker}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Trust & Policies */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#17231C] uppercase tracking-wider">{civic.footer.trustTitle}</h4>
              <ul className="space-y-1.5 text-[#68756C]">
                <li>
                  <button onClick={() => setActiveModal('about')} className="hover:text-[#16834A] cursor-pointer">
                    {civic.footer.aboutLink}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('privacy')} className="hover:text-[#16834A] cursor-pointer">
                    {civic.footer.privacyLink}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('terms')} className="hover:text-[#16834A] cursor-pointer">
                    {civic.footer.termsLink}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('contact')} className="hover:text-[#16834A] cursor-pointer">
                    {civic.footer.contactLink}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E2EAE3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#68756C]">
            <p>{civic.footer.copyright}</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveModal('privacy')} className="hover:text-[#16834A] cursor-pointer">
                {civic.footer.privacy}
              </button>
              <span>•</span>
              <button onClick={() => setActiveModal('terms')} className="hover:text-[#16834A] cursor-pointer">
                {civic.footer.terms}
              </button>
              <span>•</span>
              <button onClick={() => setActiveModal('contact')} className="hover:text-[#16834A] cursor-pointer">
                {civic.footer.contact}
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
