import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  nav: {
    home: string;
    howItWorks: string;
    features: string;
    guidedPrep: string;
    checklists: string;
    officialPortals: string;
    about: string;
    getStarted: string;
    openDashboard: string;
    backToHome: string;
  };
  hero: {
    headline: string;
    supportingText: string;
    explainCTA: string;
    voiceCTA: string;
    trustBadge: string;
  };
  dashboard: {
    tabs: {
      home: string;
      explainForm: string;
      voiceAssistant: string;
      guidedPrep: string;
      checklist: string;
      officialPortals: string;
      settings: string;
    };
    welcomeTitle: string;
    welcomeSubtitle: string;
    quickActionUpload: string;
    quickActionVoice: string;
    quickActionWizard: string;
    quickActionChecklist: string;
  };
  explainer: {
    title: string;
    subtitle: string;
    uploadAreaTitle: string;
    uploadAreaSubtitle: string;
    uploadButtonText: string;
    orChooseSample: string;
    dragDropText: string;
    analyzingState: string;
    analyzingHint: string;
    buttonAnalyze: string;
    buttonChangeImage: string;
    buttonRemove: string;
    resultsHeader: string;
    formPurposeTitle: string;
    fieldCardsTitle: string;
    simplifiedTitle: string;
    originalTitle: string;
    exampleTitle: string;
    cautionTitle: string;
    requiredDocsTitle: string;
    unclearTitle: string;
    verificationNotesTitle: string;
    readAloud: string;
    stopSpeaking: string;
    askFollowUp: string;
    simplifyMore: string;
    copyText: string;
    copied: string;
  };
  voice: {
    title: string;
    subtitle: string;
    micStart: string;
    micListening: string;
    micStop: string;
    micUnsupported: string;
    inputPlaceholder: string;
    send: string;
    suggestedQuestionsTitle: string;
    clearChat: string;
    stopVoice: string;
    replay: string;
  };
  wizard: {
    title: string;
    subtitle: string;
    stepCount: string;
    nextStep: string;
    prevStep: string;
    finishReview: string;
    yourAnswer: string;
    answerPlaceholder: string;
    exampleMark: string;
    cautionMark: string;
    speakAnswer: string;
    listening: string;
    reviewTitle: string;
    reviewSubtitle: string;
    editAnswer: string;
    printSummary: string;
    noAnswersNotice: string;
    completedStatus: string;
  };
  checklist: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterVerified: string;
    filterUnconfirmed: string;
    verifiedBadge: string;
    unconfirmedBadge: string;
    officialPortalLink: string;
    lastVerified: string;
    completedCount: string;
    printList: string;
  };
  portals: {
    title: string;
    subtitle: string;
    filterPlaceholder: string;
    officialTag: string;
    openSite: string;
    disclaimer: string;
    safetyBannerTitle: string;
    safetyBannerText: string;
    searchPlaceholder: string;
    filterAllStates: string;
    buttonVisit: string;
    servicesOffered: string;
  };
  settings: {
    languageTitle: string;
    languageSubtitle: string;
    textSizeTitle: string;
    textSizeSubtitle: string;
    fontStandard: string;
    fontLarge: string;
    fontExtraLarge: string;
    highContrastTitle: string;
    highContrastSubtitle: string;
    speechRateTitle: string;
    speechRateSubtitle: string;
    speedSlow: string;
    speedNormal: string;
    speedFast: string;
    sessionTitle: string;
    sessionSubtitle: string;
    buttonClearSession: string;
  };
  common: {
    disclaimer: string;
    fictionalNotice: string;
    required: string;
    optional: string;
    language: string;
    voiceActive: string;
    voiceMute: string;
    fontSize: string;
    contrast: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  mr: {
    appName: 'फॉर्मसाथी AI',
    tagline: 'अर्जांसाठी तुमचा आवाज मार्गदर्शक',
    nav: {
      home: 'मुख्य पान',
      howItWorks: 'कसे चालते',
      features: 'वैशिष्ट्ये',
      guidedPrep: 'मार्गदर्शित तयारी',
      checklists: 'कागदपत्र यादी',
      officialPortals: 'अधिकृत पोर्टल्स',
      about: 'माहिती',
      getStarted: 'सुरुवात करा',
      openDashboard: 'कार्यक्षेत्र उघडा',
      backToHome: 'मुख्य पानावर जा',
    },
    hero: {
      headline: 'कोणताही अर्ज समजून घ्या. तुमच्या मातृभाषेत.',
      supportingText: 'अर्जांमधील अवघड नियम समजून घेण्यासाठी, कागदपत्रे तयार करण्यासाठी आणि पुढील पावले उचलण्यासाठी तुमचा सोबती — बोला किंवा सोपे शब्द वाचा.',
      explainCTA: 'माझा अर्ज समजावून सांगा',
      voiceCTA: 'आवाज साहाय्यक वापरा',
      trustBadge: 'सोपे मार्गदर्शन. आपली भाषा. एक एक पायरी.',
    },
    dashboard: {
      tabs: {
        home: 'मुख्य पान',
        explainForm: 'अर्ज समजावून घ्या',
        voiceAssistant: 'आवाज साहाय्यक',
        guidedPrep: 'मार्गदर्शित तयारी',
        checklist: 'कागदपत्र यादी',
        officialPortals: 'अधिकृत संकेतस्थळे',
        settings: 'सेटिंग्ज व गोपनीयता',
      },
      welcomeTitle: 'नमस्कार! फॉर्मसाथी मध्ये आपले स्वागत आहे',
      welcomeSubtitle: 'सरकारी व इतर अर्जांची भाषा सोपी करा. खालील पर्यायांपैकी एक निवडा किंवा थेट प्रश्न विचारा.',
      quickActionUpload: 'अर्जाचा फोटो अपलोड करा',
      quickActionVoice: 'बोलून प्रश्न विचारा',
      quickActionWizard: 'दाखल्याची तयारी सुरू करा',
      quickActionChecklist: 'लागणारी कागदपत्रे पहा',
    },
    explainer: {
      title: 'अर्जाचा फोटो समजावून सांगणारा साहाय्यक',
      subtitle: 'कोणत्याही अर्जाचा फोटो किंवा स्क्रीनशॉट निवडा. आमचे AI प्रत्येक रकाना सोप्या मराठीत स्पष्ट करेल.',
      uploadAreaTitle: 'अर्जाचा फोटो येथे अपलोड करा',
      uploadAreaSubtitle: 'PNG, JPG, WebP फॉरमॅट (कमाल १० MB)',
      uploadButtonText: 'फाइल निवडा किंवा फोटो काढा',
      orChooseSample: 'किंवा खालीलपैकी एक तयार नमुना अर्ज निवडून पहा:',
      dragDropText: 'फाइल येथे आणून सोडा',
      analyzingState: 'अर्जाची पाहणी होत आहे...',
      analyzingHint: 'AI अर्जातील सर्व रकाने व नियम तपासून सोप्या मराठीत स्पष्टीकरण तयार करत आहे.',
      buttonAnalyze: 'हा अर्ज समजावून सांगा',
      buttonChangeImage: 'दुसरा फोटो निवडा',
      buttonRemove: 'काढून टाका',
      resultsHeader: 'अर्जाचे सविस्तर विश्लेषण',
      formPurposeTitle: 'हा अर्ज कशासाठी आहे?',
      fieldCardsTitle: 'रकान्यांचे सविस्तर स्पष्टीकरण',
      simplifiedTitle: 'सोपा अर्थ',
      originalTitle: 'मूळ मजकूर',
      exampleTitle: 'काल्पनिक उदाहरण',
      cautionTitle: 'काळजी घ्या',
      requiredDocsTitle: 'अर्जासोबत लागणारी कागदपत्रे',
      unclearTitle: 'अस्पष्ट किंवा वाचता न आलेले भाग',
      verificationNotesTitle: 'महत्त्वाची पडताळणी सूचना',
      readAloud: 'ऐका (Read Aloud)',
      stopSpeaking: 'आवाज थांबवा',
      askFollowUp: 'या अर्जाबद्दल प्रश्न विचारा',
      simplifyMore: 'अजून सोप्या शब्दांत सांगा',
      copyText: 'माहिती कॉपी करा',
      copied: 'कॉपी झाले!',
    },
    voice: {
      title: 'मराठी आवाज साहाय्यक',
      subtitle: 'माईकचे बटण दाबून थेट बोला किंवा टाइप करून विचारा. आम्ही सोप्या शब्दात मार्गदर्शन करू.',
      micStart: 'बोलण्यासाठी दाबा',
      micListening: 'ऐकत आहे... कृपया बोला',
      micStop: 'बोलणे संपले',
      micUnsupported: 'या ब्राउझरमध्ये थेट व्हॉईस रेकॉर्डिंग उपलब्ध नाही, कृपया खाली टाइप करा.',
      inputPlaceholder: 'येथे तुमचा प्रश्न लिहा किंवा बोला (उदा. उत्पन्नाचा दाखला कसा काढायचा?)...',
      send: 'पाठवा',
      suggestedQuestionsTitle: 'सामान्यपणे विचारले जाणारे प्रश्न:',
      clearChat: 'संभाषण साफ करा',
      stopVoice: 'आवाज थांबवा',
      replay: 'पुन्हा ऐका',
    },
    wizard: {
      title: 'मार्गदर्शित अर्ज तयारी (Step-by-Step Wizard)',
      subtitle: 'एका वेळी एकाच रकान्याची तयारी करा. चुका टाळा आणि आत्मविश्वासाने माहिती गोळा करा.',
      stepCount: 'पायरी',
      nextStep: 'पुढील प्रश्न',
      prevStep: 'मागे जा',
      finishReview: 'तयारीचे पुनरावलोकन करा',
      yourAnswer: 'तुमचे उत्तर / माहिती',
      answerPlaceholder: 'तुमचे उत्तर येथे लिहा किंवा बोला...',
      exampleMark: 'काल्पनिक उदाहरण:',
      cautionMark: 'महत्त्वाची सूचना:',
      speakAnswer: 'बोलून भरा',
      listening: 'ऐकत आहे...',
      reviewTitle: 'तुमची तयार झालेली माहिती',
      reviewSubtitle: 'अधिकृत केंद्रात जाण्यापूर्वी किंवा ऑनलाइन अर्ज भरताना ही माहिती सोबत ठेवा.',
      editAnswer: 'बदला',
      printSummary: 'तयारी पत्रक प्रिंट करा / सेव्ह करा',
      noAnswersNotice: 'अजून कोणतीही माहिती भरलेली नाही.',
      completedStatus: 'तयारी पूर्ण झाली!',
    },
    checklist: {
      title: 'कागदपत्रांची पडताळणी यादी (Document Checklist)',
      subtitle: 'शासकीय दाखले आणि योजनांसाठी आवश्यक कागदपत्रांची यादी तपासा.',
      filterAll: 'सर्व कागदपत्रे',
      filterVerified: 'अधिकृत पडताळलेले',
      filterUnconfirmed: 'स्थानिक पातळीवर तपासावे असे',
      verifiedBadge: 'अधिकृत स्रोत पडताळलेले',
      unconfirmedBadge: 'स्थानिक कार्यालयात तपासा',
      officialPortalLink: 'अधिकृत स्रोत संकेतस्थळ',
      lastVerified: 'शेवटची पडताळणी तारीख',
      completedCount: 'कागदपत्रे तयार',
      printList: 'चेकलिस्ट प्रिंट करा',
    },
    portals: {
      title: 'अधिकृत शासकीय संकेतस्थळे (Official Portals)',
      subtitle: 'फसव्या किंवा अनधिकृत संकेतस्थळांपासून सावध राहा. फक्त अधिकृत पोर्टल वापरा.',
      filterPlaceholder: 'संकेतस्थळ किंवा सेवा शोधा...',
      officialTag: 'अधिकृत शासकीय पोर्टल',
      openSite: 'पोर्टल उघडा',
      disclaimer: 'फॉर्मसाथी हे एक स्वतंत्र मदतनीस ॲप आहे. अर्ज सादर करण्यासाठी वरील अधिकृत संकेतस्थळांचाच वापर करा.',
      safetyBannerTitle: 'सुरक्षितता सूचना: बनावट पोर्टलपासून सावध राहा',
      safetyBannerText: 'नेहमी gov.in किंवा .nic.in ने संपणाऱ्या अधिकृत संकेतस्थळांवरच कागदपत्रे अपलोड करा. कोणालाही ओटीपी किंवा पासवर्ड देऊ नका.',
      searchPlaceholder: 'संकेतस्थळ किंवा सेवा शोधा...',
      filterAllStates: 'सर्व राज्ये व राष्ट्रीय पोर्टल्स',
      buttonVisit: 'पोर्टलवर जा',
      servicesOffered: 'उपलब्ध सेवा',
    },
    settings: {
      languageTitle: 'भाषा प्राधान्य (Language Preference)',
      languageSubtitle: 'अर्जांचे स्पष्टीकरण आणि आवाजासाठी तुमची सोयीची भाषा निवडा.',
      textSizeTitle: 'फॉन्ट व वाचनाचा आकार (Text Size)',
      textSizeSubtitle: 'स्क्रीनवरील अक्षरे मोठी करून सहज वाचा.',
      fontStandard: 'प्रमाणित (Standard)',
      fontLarge: 'मोठे (Large)',
      fontExtraLarge: 'अतिशय मोठे (Extra Large)',
      highContrastTitle: 'उच्च कॉन्ट्रास्ट मोड (High Contrast)',
      highContrastSubtitle: 'वाचण्यास सोपे जाण्यासाठी गडद रंग व ठळक मजकूर चालू करा.',
      speechRateTitle: 'आवाजाचा वेग (Speech Speed)',
      speechRateSubtitle: 'व्हॉइस असिस्टंटच्या बोलण्याचा वेग तुमच्या सोयीनुसार ठरवा.',
      speedSlow: 'हळू (0.85x)',
      speedNormal: 'सामान्य (1.0x)',
      speedFast: 'जलद (1.15x)',
      sessionTitle: 'स्थानिक डेटा आणि इतिहास पुसणे',
      sessionSubtitle: 'या ब्राउझरमधील सर्व संभाषण इतिहास आणि फॉर्म डेटा तात्काळ हटवा.',
      buttonClearSession: 'सर्व स्थानिक डेटा हटवा',
    },
    common: {
      disclaimer: 'सूचना: फॉर्मसाथी AI हे अर्ज समजून घेण्यासाठी एक स्वतंत्र साहाय्यक साधन आहे. हे कोणतेही दाखले जारी करत नाही किंवा अधिकृतपणे अर्ज सादर करत नाही. अधिकृत नियमांची सेतू किंवा तहसील कार्यालयात खात्री करा.',
      fictionalNotice: '[सर्व उदाहरणे केवळ समजावून सांगण्यासाठी काल्पनिक आहेत]',
      required: 'आवश्यक',
      optional: 'ऐच्छिक',
      language: 'भाषा',
      voiceActive: 'आवाज सुरू',
      voiceMute: 'आवाज मूक',
      fontSize: 'फॉन्ट आकार',
      contrast: 'उच्च कॉन्ट्रास्ट',
    },
  },
  hi: {
    appName: 'फॉर्मसाथी AI',
    tagline: 'फॉर्म के लिए आपका वॉयस गाइड',
    nav: {
      home: 'होम',
      howItWorks: 'यह कैसे काम करता है',
      features: 'विशेषताएं',
      guidedPrep: 'मार्गदर्शित तैयारी',
      checklists: 'दस्तावेज चेकलिस्ट',
      officialPortals: 'आधिकारिक पोर्टल्स',
      about: 'हमारे बारे में',
      getStarted: 'शुरू करें',
      openDashboard: 'डैशबोर्ड खोलें',
      backToHome: 'होम पेज पर जाएं',
    },
    hero: {
      headline: 'कोई भी फॉर्म समझें। अपनी सरल भाषा में।',
      supportingText: 'कठिन सरकारी व अन्य फॉर्म समझने, सही दस्तावेज तैयार करने और अगला कदम उठाने के लिए आपका मददगार साथी — अपनी आवाज से पूछें या सरल भाषा पढ़ें।',
      explainCTA: 'मेरा फॉर्म समझाएं',
      voiceCTA: 'वॉयस असिस्टेंट आजमाएं',
      trustBadge: 'सरल मार्गदर्शन। आपकी भाषा। एक-एक कदम।',
    },
    dashboard: {
      tabs: {
        home: 'होम',
        explainForm: 'फॉर्म समझें',
        voiceAssistant: 'वॉयस असिस्टेंट',
        guidedPrep: 'मार्गदर्शित तैयारी',
        checklist: 'दस्तावेज चेकलिस्ट',
        officialPortals: 'आधिकारिक वेबसाइट्स',
        settings: 'सेटिंग्स व गोपनीयता',
      },
      welcomeTitle: 'नमस्ते! फॉर्मसाथी में आपका स्वागत है',
      welcomeSubtitle: 'सरकारी और निजी फॉर्म्स को समझना अब हुआ आसान। नीचे दिए गए विकल्पों में से चुनें या बोलकर सवाल पूछें।',
      quickActionUpload: 'फॉर्म का फोटो अपलोड करें',
      quickActionVoice: 'बोलकर सवाल पूछें',
      quickActionWizard: 'तैयारी शुरू करें',
      quickActionChecklist: 'दस्तावेज सूची देखें',
    },
    explainer: {
      title: 'एआई फॉर्म फोटो एक्सप्लेनर',
      subtitle: 'किसी भी फॉर्म की फोटो या स्क्रीनशॉट चुनें। हमारा AI प्रत्येक कॉलम को सरल हिंदी में समझाएगा।',
      uploadAreaTitle: 'फॉर्म की फोटो यहां अपलोड करें',
      uploadAreaSubtitle: 'PNG, JPG, WebP (अधिकतम 10 MB)',
      uploadButtonText: 'फाइल चुनें या कैमरा इस्तेमाल करें',
      orChooseSample: 'या नीचे दिए गए किसी भी सैंपल फॉर्म को चुनकर टेस्ट करें:',
      dragDropText: 'फोटो यहां ड्रैग और ड्रॉप करें',
      analyzingState: 'फॉर्म का विश्लेषण हो रहा है...',
      analyzingHint: 'AI फॉर्म के सभी कॉलम और नियमों को सरल भाषा में तैयार कर रहा है।',
      buttonAnalyze: 'यह फॉर्म समझाएं',
      buttonChangeImage: 'दूसरी फोटो चुनें',
      buttonRemove: 'हटाएं',
      resultsHeader: 'फॉर्म का विस्तृत विवरण',
      formPurposeTitle: 'यह फॉर्म किस उद्देश्य के लिए है?',
      fieldCardsTitle: 'कॉलम-दर-कॉलम सरल विवरण',
      simplifiedTitle: 'सरल अर्थ',
      originalTitle: 'मूल शब्द',
      exampleTitle: 'काल्पनिक उदाहरण',
      cautionTitle: 'सावधानी व गलतियों से बचें',
      requiredDocsTitle: 'फॉर्म के साथ आवश्यक दस्तावेज',
      unclearTitle: 'अस्पष्ट या न पढ़े जा सकने वाले हिस्से',
      verificationNotesTitle: 'आधिकारिक सत्यापन निर्देश',
      readAloud: 'सुनें (Read Aloud)',
      stopSpeaking: 'आवाज रोकें',
      askFollowUp: 'इस फॉर्म पर सवाल पूछें',
      simplifyMore: 'और सरल शब्दों में बताएं',
      copyText: 'कॉपी करें',
      copied: 'कॉपी हो गया!',
    },
    voice: {
      title: 'हिंदी वॉयस असिस्टेंट',
      subtitle: 'माइक बटन दबाएं और बोलकर सवाल पूछें, या टाइप करें। हम सरल हिंदी में चरणबद्ध सहायता देंगे।',
      micStart: 'बोलने के लिए दबाएं',
      micListening: 'सुन रहे हैं... कृपया बोलें',
      micStop: 'बोलना समाप्त',
      micUnsupported: 'ब्राउज़र में वॉयस इनपुट उपलब्ध नहीं है, कृपया नीचे टाइप करें।',
      inputPlaceholder: 'यहाँ अपना प्रश्न लिखें या बोलें (उदा. आय प्रमाण पत्र कैसे बनवाएं?)...',
      send: 'भेजें',
      suggestedQuestionsTitle: 'सामान्य रूप से पूछे जाने वाले प्रश्न:',
      clearChat: 'बातचीत साफ करें',
      stopVoice: 'आवाज रोकें',
      replay: 'फिर से सुनें',
    },
    wizard: {
      title: 'मार्गदर्शित फॉर्म तैयारी (Step-by-Step Wizard)',
      subtitle: 'एक समय में केवल एक ही जानकारी तैयार करें। बिना घबराए और बिना गलती किए अपना फॉर्म समझें।',
      stepCount: 'चरण',
      nextStep: 'अगला प्रश्न',
      prevStep: 'पिछला प्रश्न',
      finishReview: 'तैयारी का रिव्यू करें',
      yourAnswer: 'आपका उत्तर / जानकारी',
      answerPlaceholder: 'अपनी जानकारी यहाँ लिखें या बोलें...',
      exampleMark: 'काल्पनिक उदाहरण:',
      cautionMark: 'जरूरी सूचना:',
      speakAnswer: 'बोलकर भरें',
      listening: 'सुन रहे हैं...',
      reviewTitle: 'आपकी तैयार जानकारी का सारांश',
      reviewSubtitle: 'सीएससी केंद्र या ऑनलाइन पोर्टल पर जाने से पहले इस सारांश को साथ रखें।',
      editAnswer: 'संपादित करें',
      printSummary: 'तैयारी सारांश प्रिंट करें / सहेजें',
      noAnswersNotice: 'अभी कोई जानकारी दर्ज नहीं की गई है।',
      completedStatus: 'तैयारी पूरी हुई!',
    },
    checklist: {
      title: 'दस्तावेज चेकलिस्ट (Document Checklist)',
      subtitle: 'विभिन्न प्रमाणपत्रों और योजनाओं के लिए आवश्यक दस्तावेजों की सूची।',
      filterAll: 'सभी दस्तावेज',
      filterVerified: 'आधिकारिक सत्यापित',
      filterUnconfirmed: 'स्थानीय कार्यालय में पुष्टि करें',
      verifiedBadge: 'आधिकारिक स्रोत सत्यापित',
      unconfirmedBadge: 'पुष्टि करने योग्य',
      officialPortalLink: 'आधिकारिक स्रोत वेबसाइट',
      lastVerified: 'सत्यापन तिथि',
      completedCount: 'दस्तावेज तैयार',
      printList: 'चेकलिस्ट प्रिंट करें',
    },
    portals: {
      title: 'आधिकारिक सरकारी पोर्टल्स (Official Portals)',
      subtitle: 'फर्जी वेबसाइट्स से बचें। केवल प्रामाणिक सरकारी पोर्टल पर ही आवेदन करें।',
      filterPlaceholder: 'पोर्टल या सेवा खोजें...',
      officialTag: 'आधिकारिक सरकारी पोर्टल',
      openSite: 'वेबसाइट खोलें',
      disclaimer: 'फॉर्मसाथी एक स्वतंत्र सहायक ऐप है। आवेदन प्रस्तुत करने के लिए केवल संबंधित आधिकारिक सरकारी पोर्टल का ही उपयोग करें।',
      safetyBannerTitle: 'सुरक्षा सूचना: फर्जी वेबसाइट्स और बिचौलियों से सावधान रहें',
      safetyBannerText: 'हमेशा .gov.in या .nic.in से समाप्त होने वाली आधिकारिक सरकारी वेबसाइट पर ही आवेदन करें। कभी भी किसी को ओटीपी या बैंक पासवर्ड न दें।',
      searchPlaceholder: 'पोर्टल या सेवा खोजें...',
      filterAllStates: 'सभी राज्य और राष्ट्रीय पोर्टल्स',
      buttonVisit: 'पोर्टल पर जाएं',
      servicesOffered: 'उपलब्ध सेवाएं',
    },
    settings: {
      languageTitle: 'भाषा प्राथमिकता (Language Preference)',
      languageSubtitle: 'फॉर्म समझाने और आवाज के लिए अपनी पसंदीदा भाषा चुनें।',
      textSizeTitle: 'फॉन्ट व पढ़ने का आकार (Text Size)',
      textSizeSubtitle: 'स्क्रीन पर अक्षरों का आकार बड़ा करके आसानी से पढ़ें।',
      fontStandard: 'मानक (Standard)',
      fontLarge: 'बड़ा (Large)',
      fontExtraLarge: 'बहुत बड़ा (Extra Large)',
      highContrastTitle: 'हाई कंट्रास्ट मोड (High Contrast)',
      highContrastSubtitle: 'आसानी से पढ़ने के लिए गहरा रंग व स्पष्ट टेक्स्ट सक्रिय करें।',
      speechRateTitle: 'आवाज की गति (Speech Speed)',
      speechRateSubtitle: 'वॉयस असिस्टेंट के बोलने की गति अपनी सुविधानुसार तय करें।',
      speedSlow: 'धीमी (0.85x)',
      speedNormal: 'सामान्य (1.0x)',
      speedFast: 'तेज (1.15x)',
      sessionTitle: 'स्थानीय डेटा और इतिहास साफ करें',
      sessionSubtitle: 'इस ब्राउज़र में संग्रहीत सभी बातचीत, फॉर्म डेटा और चेकलिस्ट तुरंत हटाएं।',
      buttonClearSession: 'सभी स्थानीय डेटा हटाएं',
    },
    common: {
      disclaimer: 'सूचना: फॉर्मसाथी AI एक स्वतंत्र मार्गदर्शक साधन है। यह प्रमाण पत्र जारी नहीं करता और न ही सरकारी सर्वर पर सीधे आवेदन जमा करता है। आधिकारिक नियमों की अपने तहसील या सेवा केंद्र पर पुष्टि करें।',
      fictionalNotice: '[सभी उदाहरण केवल समझाने के उद्देश्य से काल्पनिक हैं]',
      required: 'आवश्यक',
      optional: 'वैकल्पिक',
      language: 'भाषा',
      voiceActive: 'ध्वनि चालू',
      voiceMute: 'ध्वनि मूक',
      fontSize: 'फॉन्ट आकार',
      contrast: 'हाई कंट्रास्ट',
    },
  },
  en: {
    appName: 'FormSaathi AI',
    tagline: 'Your Voice Guide to Forms',
    nav: {
      home: 'Home',
      howItWorks: 'How It Works',
      features: 'Features',
      guidedPrep: 'Guided Prep',
      checklists: 'Document Checklist',
      officialPortals: 'Official Portals',
      about: 'About',
      getStarted: 'Get Started',
      openDashboard: 'Open Workspace',
      backToHome: 'Back to Home',
    },
    hero: {
      headline: 'Understand Any Form. In Your Language.',
      supportingText: 'Your friendly AI guide helps you understand confusing forms, prepare documents, and take the next step — using your voice or simple text.',
      explainCTA: 'Explain My Form',
      voiceCTA: 'Try Voice Assistant',
      trustBadge: 'Simple guidance. Your language. One step at a time.',
    },
    dashboard: {
      tabs: {
        home: 'Home',
        explainForm: 'Explain a Form',
        voiceAssistant: 'Voice Assistant',
        guidedPrep: 'Guided Preparation',
        checklist: 'Document Checklist',
        officialPortals: 'Official Portals',
        settings: 'Settings & Privacy',
      },
      welcomeTitle: 'Welcome to FormSaathi AI',
      welcomeSubtitle: 'Demystifying complex application forms for citizens. Select an action below or ask a voice question.',
      quickActionUpload: 'Upload Form Photo',
      quickActionVoice: 'Ask with Voice',
      quickActionWizard: 'Start Guided Prep',
      quickActionChecklist: 'Document Checklist',
    },
    explainer: {
      title: 'AI Form Photo Explainer',
      subtitle: 'Upload a photograph or screenshot of any civic application form to receive field-by-field guidance in plain language.',
      uploadAreaTitle: 'Upload your form image here',
      uploadAreaSubtitle: 'PNG, JPG, or WebP formats supported (up to 10 MB)',
      uploadButtonText: 'Choose File or Take Photo',
      orChooseSample: 'Or test instantly with a pre-loaded real-world sample form:',
      dragDropText: 'Drag and drop your image here',
      analyzingState: 'Analyzing form structure...',
      analyzingHint: 'AI is examining visible text, field labels, instructions, and required documents.',
      buttonAnalyze: 'Explain This Form',
      buttonChangeImage: 'Choose Different Image',
      buttonRemove: 'Remove',
      resultsHeader: 'Field-by-Field Breakdown',
      formPurposeTitle: 'What is this form for?',
      fieldCardsTitle: 'Field-by-Field Explanation',
      simplifiedTitle: 'Plain Meaning',
      originalTitle: 'Original Label',
      exampleTitle: 'Fictional Example',
      cautionTitle: 'Common Pitfalls & Cautions',
      requiredDocsTitle: 'Required Supporting Documents',
      unclearTitle: 'Unclear or Ambiguous Portions',
      verificationNotesTitle: 'Important Verification Notes',
      readAloud: 'Read Aloud',
      stopSpeaking: 'Stop Audio',
      askFollowUp: 'Ask a Follow-Up Question',
      simplifyMore: 'Explain in Simpler Words',
      copyText: 'Copy Summary',
      copied: 'Copied to Clipboard!',
    },
    voice: {
      title: 'Multilingual Voice Assistant',
      subtitle: 'Tap the large microphone button to speak naturally, or type your query in Marathi, Hindi, or English.',
      micStart: 'Tap to Speak',
      micListening: 'Listening... please speak now',
      micStop: 'Stop Speaking',
      micUnsupported: 'Browser voice recording is not available. Please type your query below.',
      inputPlaceholder: 'Type or speak your question (e.g. How do I get an Income Certificate?)...',
      send: 'Send',
      suggestedQuestionsTitle: 'Frequently Asked Citizen Questions:',
      clearChat: 'Clear Conversation',
      stopVoice: 'Stop Speaking',
      replay: 'Listen Again',
    },
    wizard: {
      title: 'Guided Form Preparation',
      subtitle: 'Prepare your application answers one question at a time without confusing paperwork anxiety.',
      stepCount: 'Step',
      nextStep: 'Next Question',
      prevStep: 'Previous',
      finishReview: 'Review Answers',
      yourAnswer: 'Your Information',
      answerPlaceholder: 'Type or speak your answer here...',
      exampleMark: 'Fictional Example:',
      cautionMark: 'Important Note:',
      speakAnswer: 'Speak Answer',
      listening: 'Listening...',
      reviewTitle: 'Application Preparation Summary',
      reviewSubtitle: 'Keep this verified summary ready before visiting your local CSC / Setu center or portal.',
      editAnswer: 'Edit',
      printSummary: 'Print / Save Preparation Sheet',
      noAnswersNotice: 'No information entered yet.',
      completedStatus: 'Preparation Completed!',
    },
    checklist: {
      title: 'Verified Document Checklist',
      subtitle: 'Keep your documents organized before applying to avoid multiple trips to government offices.',
      filterAll: 'All Documents',
      filterVerified: 'Officially Verified',
      filterUnconfirmed: 'Confirm Locally',
      verifiedBadge: 'Officially Verified Source',
      unconfirmedBadge: 'Confirm with Authority',
      officialPortalLink: 'Official Source Portal',
      lastVerified: 'Last Verified',
      completedCount: 'Documents Ready',
      printList: 'Print Checklist',
    },
    portals: {
      title: 'Verified Official Government Portals',
      subtitle: 'Avoid predatory middleman websites and scams. Use only verified government portals for submissions.',
      filterPlaceholder: 'Search portal or service name...',
      officialTag: 'Verified Official Portal',
      openSite: 'Visit Official Portal',
      disclaimer: 'FormSaathi AI is an independent civic guide. For final official submission, always use the authenticated portals listed above.',
      safetyBannerTitle: 'Safety Alert: Guard Against Fake Sites & Middlemen',
      safetyBannerText: 'Always submit documents and verify status strictly through authenticated portals ending in .gov.in or .nic.in. Never share your Aadhaar OTP or bank passwords.',
      searchPlaceholder: 'Search portal or certificate name...',
      filterAllStates: 'All States & National Portals',
      buttonVisit: 'Visit Portal',
      servicesOffered: 'Available Services',
    },
    settings: {
      languageTitle: 'Language Preference',
      languageSubtitle: 'Select your preferred language for explanations, voice guidance, and menus.',
      textSizeTitle: 'Text Size & Readability',
      textSizeSubtitle: 'Adjust on-screen font sizes for comfortable viewing without strain.',
      fontStandard: 'Standard (15px)',
      fontLarge: 'Large (17px)',
      fontExtraLarge: 'Extra Large (19px)',
      highContrastTitle: 'High Contrast Display',
      highContrastSubtitle: 'Enable enhanced contrast and bolder typography for maximum clarity.',
      speechRateTitle: 'Voice Speaking Speed',
      speechRateSubtitle: 'Adjust how quickly the AI voice assistant speaks instructions.',
      speedSlow: 'Slow (0.85x)',
      speedNormal: 'Normal (1.0x)',
      speedFast: 'Fast (1.15x)',
      sessionTitle: 'Clear Local Session & Data',
      sessionSubtitle: 'Wipe all conversation history, scanned form records, and checklist answers from this device.',
      buttonClearSession: 'Delete All Local Data',
    },
    common: {
      disclaimer: 'Notice: FormSaathi AI is an independent educational and civic assistance tool. It does not issue certificates, approve applications, or submit government forms directly. Always verify local rules at your nearest Tahsildar / Setu / CSC center.',
      fictionalNotice: '[All examples are fictional and intended solely for instructional guidance]',
      required: 'Required',
      optional: 'Optional',
      language: 'Language',
      voiceActive: 'Voice Sound On',
      voiceMute: 'Voice Muted',
      fontSize: 'Text Size',
      contrast: 'High Contrast',
    },
  },
};
