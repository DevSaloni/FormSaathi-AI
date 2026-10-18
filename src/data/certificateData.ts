import { CertificateInfo, DocumentChecklistItem, GuidedStage } from '../types';

export interface CertificateData {
  info: CertificateInfo;
  checklist: DocumentChecklistItem[];
  stages: GuidedStage[];
  suggestedQuestions: {
    mr: string[];
    hi: string[];
    en: string[];
  };
}

export const supportedCertificates: Record<string, CertificateData> = {
  income_cert: {
    info: {
      id: 'income_cert',
      title: {
        en: 'Income Certificate (तहसील उत्पन्न दाखला)',
        hi: 'आय प्रमाण पत्र (Income Certificate)',
        mr: 'उत्पन्नाचा दाखला (Income Certificate)',
      },
      shortDescription: {
        en: 'Certifies annual family income issued by Tahsildar / Executive Magistrate for scholarships, fee concessions, and state welfare schemes.',
        hi: 'छात्रवृत्ति, कॉलेज फीस छूट और सरकारी योजनाओं के लिए तहसीलदार द्वारा जारी वार्षिक पारिवारिक आय प्रमाण पत्र।',
        mr: 'शिष्यवृत्ती, कॉलेज फी सवलत आणि शासकीय योजनांसाठी तहसीलदार/कार्यकारी दंडाधिकारी यांच्या स्वाक्षरीने दिला जाणारा वार्षिक कौटुंबिक उत्पन्नाचा दाखला.',
      },
      department: {
        en: 'Revenue & Forest Department',
        hi: 'राजस्व विभाग (Revenue Dept)',
        mr: 'महसूल व वन विभाग (Revenue Department)',
      },
      standardIssuingAuthority: {
        en: 'Tahsildar / Sub-Divisional Officer (SDO)',
        hi: 'तहसीलदार / उप-विभागीय अधिकारी (एसडीएम)',
        mr: 'तहसीलदार / उपविभागीय अधिकारी (SDO)',
      },
      typicalDeliveryDays: 15,
      officialFee: '₹ 33.60 (Aaple Sarkar / CSC charges)',
      validityDuration: {
        en: '1 Year or 3 Financial Years (Based on certificate format)',
        hi: '१ वर्ष या ३ वित्तीय वर्ष (प्रारूप के अनुसार)',
        mr: '१ वर्ष किंवा ३ आर्थिक वर्षे (दाखल्याच्या नमुन्यानुसार)',
      },
      officialPortalName: 'Aaple Sarkar / State Citizen Portal',
      officialPortalUrl: 'https://aaplesarkar.mahaonline.gov.in',
      sampleFormId: 'income_cert',
    },
    checklist: [
      {
        id: 'inc_aadhaar',
        title: {
          en: 'Applicant Aadhaar Card (Mobile Linked)',
          hi: 'आवेदक का आधार कार्ड (मोबाइल लिंक)',
          mr: 'अर्जदाराचे आधार कार्ड (चालू मोबाईल नंबर लिंक असलेले)',
        },
        description: {
          en: 'Mandatory primary identity proof required across all state revenue portals for digital authentication.',
          hi: 'डिजिटल सत्यापन और पहचान हेतु सभी सरकारी पोर्टलों पर अनिवार्य पहचान पत्र।',
          mr: 'डिजिटल पडताळणी आणि ओळखीचा प्राथमिक पुरावा म्हणून सर्व शासकीय पोर्टल्सवर अनिवार्य.',
        },
        whyNeeded: {
          en: 'Required by government e-governance rules for OTP identity verification.',
          hi: 'ओटीपी सत्यापन और आवेदक की पहचान सुनिश्चित करने हेतु।',
          mr: 'ऑनलाइन अर्ज करताना ओटीपी प्रमाणीकरण आणि अर्जदाराची खरी ओळख निश्चित करण्यासाठी आवश्यक.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        officialAuthority: 'UIDAI / State Revenue Portals',
        officialPortalUrl: 'https://myaadhaar.uidai.gov.in',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'inc_ration_card',
        title: {
          en: 'Ration Card (True Copy with Family Listing)',
          hi: 'राशन कार्ड (परिवार विवरण सहित सत्यापित प्रति)',
          mr: 'रेशन कार्डची सत्यप्रत (कुटुंबप्रमुख व सदस्यांचे नाव असलेले पान)',
        },
        description: {
          en: 'Shows head of family, all dependent members, and 12-digit Ration Card identification number.',
          hi: 'परिवार के मुखिया और सभी आश्रित सदस्यों की संख्या प्रमाणित करने के लिए।',
          mr: 'कुटुंबप्रमुख आणि कुटुंबातील एकूण सदस्यांची संख्या सिद्ध करण्यासाठी महसूल विभागास लागते.',
        },
        whyNeeded: {
          en: 'Determines whether family is counted as single economic unit for total income.',
          hi: 'परिवार की कुल संयुक्त आय का आकलन करने के लिए।',
          mr: 'संपूर्ण कुटुंबाचे एकत्रित वार्षिक उत्पन्न निश्चित करण्यासाठी आवश्यक.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        officialAuthority: 'Food & Civil Supplies Department',
        officialPortalUrl: 'https://nfsa.gov.in',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'inc_address_proof',
        title: {
          en: 'Residence Proof (Electricity Bill / Property Tax Receipt)',
          hi: 'निवास प्रमाण (बिजली बिल / संपत्ति कर रसीद)',
          mr: 'रहिवासी पत्ता पुरावा (मागील ३ महिन्यांतील लाईट बिल / घरपट्टी पावती)',
        },
        description: {
          en: 'Utility bill issued within past 3 months in the name of head of household.',
          hi: 'परिवार के मुखिया के नाम पर हाल ही का बिजली बिल (3 माह के अंदर) या कर रसीद।',
          mr: 'कुटुंबप्रमुखाच्या नावावर असलेले मागील ३ महिन्यांतील लाईट बिल किंवा स्थानिक ग्रामपंचायत/नगरपालिका घरपट्टी पावती.',
        },
        whyNeeded: {
          en: 'Establishes jurisdiction of local Tahsil and revenue circle office.',
          hi: 'स्थानीय तहसील और राजस्व क्षेत्र का अधिकार क्षेत्र निर्धारित करने के लिए।',
          mr: 'अर्जदाराचे कार्यक्षेत्र संबंधित तालुक्यातच मोडते हे सिद्ध करण्यासाठी.',
        },
        category: 'address',
        requirementType: 'required',
        isOfficiallyVerified: true,
        officialAuthority: 'State Revenue Department Rules',
        officialPortalUrl: 'https://aaplesarkar.mahaonline.gov.in',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'inc_talathi_report',
        title: {
          en: 'Talathi / Lekhpal / Patwari Income Inquiry Report',
          hi: 'पटवारी / लेखपाल आय जांच रिपोर्ट (Talathi Verification Report)',
          mr: 'तलाठी यांचा उत्पन्न चौकशी अहवाल (किंवा ग्रामसेवक अहवाल)',
        },
        description: {
          en: 'Official field verification report from local village accountant confirming agriculture or unorganized income.',
          hi: 'ग्रामीण/कस्बाई क्षेत्र में जमीन, फसल और मजदूरी की आय का स्थानीय राजस्व अधिकारी द्वारा सत्यापन।',
          mr: 'ग्रामीण किंवा निमशहरी भागात शेती, पीक पाहणी अथवा मजुरी उत्पन्नाची स्थानिक तलाठ्याकडून प्रत्यक्ष पडताळणी.',
        },
        whyNeeded: {
          en: 'Legal basis for Tahsildar to issue certificate for unorganized/informal earners.',
          hi: 'गैर-नौकरीपेशा नागरिकों के लिए तहसीलदार द्वारा आय जारी करने का कानूनी आधार।',
          mr: 'असंघटित कामगार किंवा शेतकरी कुटुंबांचे उत्पन्न प्रमाणित करण्याचा मुख्य शासकीय आधार.',
        },
        category: 'income',
        requirementType: 'required',
        isOfficiallyVerified: true,
        officialAuthority: 'Revenue Circle Office / Tahsil',
        officialPortalUrl: 'https://serviceonline.gov.in',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'inc_photo',
        title: {
          en: 'Recent Passport-size Photograph (White Background)',
          hi: 'नवीनतम पासपोर्ट साइज फोटो (सफेद पृष्ठभूमि)',
          mr: 'नुकताच काढलेला पासपोर्ट साईज फोटो (पांढरी पार्श्वभूमी)',
        },
        description: {
          en: 'Digital photograph (20KB - 50KB JPEG) printed directly on the issued certificate.',
          hi: 'ऑनलाइन पोर्टल पर अपलोड के लिए 20KB से 50KB का जेपीईजी फोटो।',
          mr: 'दाखल्यावर छापण्यासाठी २० ते ५० केबी साईजमधील स्पष्ट फोटो.',
        },
        whyNeeded: {
          en: 'Printed on digital certificate with security QR code.',
          hi: 'डिजिटल प्रमाण पत्र और क्यूआर कोड सुरक्षा के साथ प्रिंट करने के लिए।',
          mr: 'तहसीलदारांच्या डिजिटल स्वाक्षरीसह दाखल्यावर फोटो छापला जातो.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        officialAuthority: 'e-Governance Standards Portal',
        officialPortalUrl: 'https://www.india.gov.in',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'inc_self_declaration',
        title: {
          en: 'Official Self-Declaration Affidavit (स्वयंघोषणापत्र)',
          hi: 'विहित प्रारूप में स्व-घोषणा पत्र / शपथ पत्र',
          mr: 'विहित नमुन्यातील स्वयंघोषणापत्र (Self-Declaration Format)',
        },
        description: {
          en: 'Signed affidavit declaring annual family income under penalty of Indian legal rules.',
          hi: 'आधिकारिक प्रारूप में हस्ताक्षरित घोषणा पत्र, जिसमें आय का वास्तविक ब्यौरा दर्ज हो।',
          mr: 'शासनाच्या विहित नमुन्यातील स्वाक्षरी केलेले प्रतिज्ञापत्र (आपले सरकार पोर्टलवर डाउनलोड करता येते).',
        },
        whyNeeded: {
          en: 'Legal declaration affirming accuracy of figures.',
          hi: 'आय के आंकड़ों की सत्यता की कानूनी पुष्टि के लिए।',
          mr: 'नोंदवलेली माहिती खोटी नसल्याचे कायदेशीर हमीपत्र.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        officialAuthority: 'Revenue Department Standard Formats',
        officialPortalUrl: 'https://aaplesarkar.mahaonline.gov.in',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'inc_salary_slip',
        title: {
          en: 'Employer Salary Slip / Form 16 (If formally employed)',
          hi: 'वेतन पर्ची / फॉर्म 16 (यदि परिवार में कोई नौकरीपेशा हो)',
          mr: 'नोकरीत असल्यास पगार पावती (Salary Slip / Form 16)',
        },
        description: {
          en: 'Last 3 months salary slips or Form 16 issued by employer for government or private salaried individuals.',
          hi: 'संगठित क्षेत्र में कार्यरत होने पर पिछले 3 महीनों की वेतन पर्ची।',
          mr: 'अर्जदार किंवा पालक खाजगी अथवा शासकीय नोकरीत असल्यास मागील ३ महिन्यांची पगार पावती.',
        },
        whyNeeded: {
          en: 'Mandatory proof only if applicant or parent is formally employed.',
          hi: 'केवल औपचारिक वेतनभोगी आवेदकों के लिए अनिवार्य।',
          mr: 'केवळ पगारी नोकरदारांसाठी आवश्यक; शेतकरी किंवा रोजंदारी मजुरांना लागत नाही.',
        },
        category: 'income',
        requirementType: 'conditional',
        isOfficiallyVerified: true,
        officialAuthority: 'Income Tax Dept / Employer',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'inc_land_record',
        title: {
          en: '7/12 Extract or 8-A Record (If owning agricultural land)',
          hi: '7/12 भू-अभिलेख / खतौनी नकल (यदि कृषि भूमि हो)',
          mr: '७/१२ उतारा व ८-अ उतारा (शेती जमीन असल्यास)',
        },
        description: {
          en: 'Digitally signed landholding extract from Mahabhulekh to confirm agricultural earnings and crop pattern.',
          hi: 'कृषि जोत और फसल विवरण प्रमाणित करने के लिए डिजिटल हस्ताक्षरित भू-अभिलेख।',
          mr: 'शेतीचे उत्पन्न सिद्ध करण्यासाठी महाभूमी पोर्टलवरून डिजिटल स्वाक्षरी असलेला ७/१२ उतारा.',
        },
        whyNeeded: {
          en: 'Talathi verifies crop yields against declared agricultural income.',
          hi: 'पटवारी द्वारा कृषि आय के सत्यापन हेतु।',
          mr: 'तलाठी शेती उत्पन्नाची मोजणी जमिनीच्या क्षेत्रफळानुसार करतात.',
        },
        category: 'income',
        requirementType: 'conditional',
        isOfficiallyVerified: true,
        officialAuthority: 'Mahabhulekh / State Land Records',
        officialPortalUrl: 'https://bhulekh.mahabhumi.gov.in',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
    ],
    stages: [
      {
        id: 'inc_stage_1',
        stageNumber: 1,
        stageKey: 'purpose',
        title: {
          en: 'Understand Purpose of Income Certificate',
          hi: 'आय प्रमाण पत्र का उद्देश्य समझें',
          mr: 'उत्पन्नाच्या दाखल्याचा मुख्य उद्देश समजून घ्या',
        },
        summary: {
          en: 'An Income Certificate is an official document issued by the Tahsildar declaring the total annual family income. It is needed for college scholarships, fee concessions, admission quotas, and social schemes.',
          hi: 'आय प्रमाण पत्र तहसीलदार द्वारा जारी किया गया आधिकारिक दस्तावेज है जो परिवार की वार्षिक आय प्रमाणित करता है। यह छात्रवृत्ति, फीस माफी और सरकारी योजनाओं के लिए आवश्यक है।',
          mr: 'उत्पन्नाचा दाखला हा तहसीलदार यांच्या स्वाक्षरीने दिला जाणारा अधिकृत पुरावा आहे. हा दाखला कॉलेज शिष्यवृत्ती, फी सवलत, वसतिगृह प्रवेश आणि विविध शासकीय योजनांसाठी लागतो.',
        },
        keyDetails: {
          en: [
            'Usually valid for 1 financial year or 3 financial years (check institutional requirement).',
            'Counts entire family annual income from all sources (agriculture, business, wages, salary).',
            'Must be signed digitally by Tahsildar or Nayab Tahsildar.',
          ],
          hi: [
            'सामान्यतः १ वर्ष या ३ वित्तीय वर्षों के लिए मान्य होता है।',
            'परिवार के सभी स्रोतों (खेती, मजदूरी, व्यापार, वेतन) की आय जोड़ी जाती है।',
            'तहसीलदार या नायब तहसीलदार द्वारा डिजिटल रूप से हस्ताक्षरित होता है।',
          ],
          mr: [
            'साधारणपणे १ किंवा ३ आर्थिक वर्षांसाठी वैध असतो (संस्थेच्या नियमांनुसार तपासा).',
            'कुटुंबाच्या सर्व स्रोतांचे (शेती, व्यवसाय, मजुरी, नोकरी) एकत्रित उत्पन्न धरले जाते.',
            'तहसीलदार किंवा नायब तहसीलदार यांची डिजिटल स्वाक्षरी असते.',
          ],
        },
      },
      {
        id: 'inc_stage_2',
        stageNumber: 2,
        stageKey: 'jurisdiction',
        title: {
          en: 'Confirm State & Jurisdiction',
          hi: 'राज्य और अधिकार क्षेत्र की पुष्टि करें',
          mr: 'राज्य आणि कार्यक्षेत्राची खात्री करा',
        },
        summary: {
          en: 'Your application must be submitted to the Tahsil where your permanent residence or ancestral address is located.',
          hi: 'आपका आवेदन उसी तहसील में जमा होना चाहिए जहां आपका स्थायी निवास या पुश्तैनी पता दर्ज है।',
          mr: 'ज्या तालुक्यात तुमचे कायमचे राहण्याचे घर, रेशन कार्ड किंवा मूळ गाव आहे त्याच तहसील कार्यालयात अर्ज करावा लागतो.',
        },
        keyDetails: {
          en: [
            'Do not apply in hostel or temporary workplace tahsil.',
            'State portal routes your file to your circle Talathi automatically.',
          ],
          hi: [
            'अस्थाई हॉस्टल या किराए के पते की तहसील में आवेदन न करें।',
            'पोर्टल आपके आवेदन को आपके क्षेत्र के पटवारी को सीधे भेजता है।',
          ],
          mr: [
            'हॉस्टेल किंवा तात्पुरत्या भाड्याच्या रूमच्या पत्त्यावर अर्ज करू नये.',
            'ऑनलाइन पोर्टलवरून अर्ज तुमच्या गावातील तलाठ्याकडे चौकशीसाठी पाठवला जातो.',
          ],
        },
      },
      {
        id: 'inc_stage_3',
        stageNumber: 3,
        stageKey: 'process',
        title: {
          en: 'Application Process (Online & CSC)',
          hi: 'आवेदन प्रक्रिया (ऑनलाइन व जन सेवा केंद्र)',
          mr: 'अर्ज प्रक्रिया (आपले सरकार व सेतू केंद्र)',
        },
        summary: {
          en: 'You can apply online via Aaple Sarkar citizen portal or visit the nearest Setu / CSC center with original documents.',
          hi: 'आप आपले सरकार पोर्टल पर स्वयं ऑनलाइन आवेदन कर सकते हैं या नजदीकी सीएससी/सेतु केंद्र पर जा सकते हैं।',
          mr: 'तुम्ही स्वतः आपले सरकार पोर्टलवर (aaplesarkar.mahaonline.gov.in) ऑनलाइन अर्ज करू शकता किंवा जवळच्या सेतू सुविधा केंद्रावर जाऊन अर्ज भरू शकता.',
        },
        keyDetails: {
          en: [
            'Step 1: Create Citizen Login with Aadhaar OTP on Aaple Sarkar.',
            'Step 2: Fill Revenue Department -> Income Certificate form.',
            'Step 3: Upload Aadhaar, Ration Card, Address Proof, and Talathi Report.',
            'Step 4: Pay statutory fee ₹33.60 online.',
            'Step 5: Download digitally signed certificate after verification within 15 days.',
          ],
          hi: [
            'चरण १: आपले सरकार पोर्टल पर आधार ओटीपी से नागरिक लॉगिन बनाएं।',
            'चरण २: राजस्व विभाग -> आय प्रमाण पत्र सेवा चुनें।',
            'चरण ३: दस्तावेज (आधार, राशन कार्ड, निवास प्रमाण, पटवारी रिपोर्ट) अपलोड करें।',
            'चरण ४: ₹३३.६० का आधिकारिक सरकारी शुल्क भरें।',
            'चरण ५: १५ दिनों में डिजिटल हस्ताक्षरित प्रमाण पत्र डाउनलोड करें।',
          ],
          mr: [
            'पायरी १: आपले सरकार पोर्टलवर आधार ओटीपीने नागरिक नोंदणी (Citizen Login) करा.',
            'पायरी २: महसूल विभाग निवडून उत्पन्नाचा दाखला सेवा निवडा.',
            'पायरी ३: आधार कार्ड, रेशन कार्ड, पत्ता पुरावा व तलाठी अहवाल अपलोड करा.',
            'पायरी ४: ₹ ३३.६०/- अधिकृत शासकीय शुल्क ऑनलाइन भरा.',
            'पायरी ५: १५ दिवसांत डिजिटल स्वाक्षरी असलेला दाखला ऑनलाइन डाउनलोड करा.',
          ],
        },
      },
      {
        id: 'inc_stage_4',
        stageNumber: 4,
        stageKey: 'eligibility',
        title: {
          en: 'Eligibility & Income Limits',
          hi: 'पात्रता एवं आय सीमा',
          mr: 'पात्रता अटी व उत्पन्न मर्यादा',
        },
        summary: {
          en: 'Any resident citizen residing within the Tahsil jurisdiction can apply. Income thresholds determine welfare scheme benefits.',
          hi: 'तहसील क्षेत्र का कोई भी स्थायी निवासी आवेदन कर सकता है। आय सीमा के आधार पर योजनाओं के लाभ तय होते हैं।',
          mr: 'तालुक्यातील कोणताही कायम रहिवासी नागरिक अर्ज करू शकतो. दाखल्यावरील रकमेवर योजनांची पात्रता ठरते.',
        },
        keyDetails: {
          en: [
            'EBC / Scholarship limit: Usually family income up to ₹ 8,00,000 per year for Maharashtra schemes.',
            'Ration Card / BPL criteria: Typically under ₹ 1,00,000 per year for rural/urban subsidies.',
            'Minor student applications: Father/Mother is recorded as the primary earning applicant.',
          ],
          hi: [
            'ईबीसी / छात्रवृत्ति: सामान्यतः वार्षिक आय ₹ ८,००,००० तक मान्य होती है।',
            'राशन कार्ड / बीपीएल: सामान्यतः ₹ १,००,००० से कम वार्षिक आय।',
            'नाबालिग छात्र के लिए: पिता या अभिभावक को मुख्य अर्जदार बनाया जाता है।',
          ],
          mr: [
            'EBC व महाडीबीटी शिष्यवृत्ती: साधारणपणे वार्षिक कौटुंबिक उत्पन्न ₹ ८ लाखांपर्यंत चालते.',
            'पिवळे/केशरी रेशन कार्ड योजना: वार्षिक उत्पन्न ₹ १ लाखांपेक्षा कमी असावे लागते.',
            '१८ वर्षांखालील विद्यार्थ्यांसाठी अर्ज करताना वडील किंवा पालक हे मुख्य अर्जदार असतात.',
          ],
        },
      },
      {
        id: 'inc_stage_5',
        stageNumber: 5,
        stageKey: 'documents',
        title: {
          en: 'Verify Required Documents',
          hi: 'आवश्यक दस्तावेजों की जांच',
          mr: 'आवश्यक कागदपत्रांची पडताळणी',
        },
        summary: {
          en: 'Assemble all 6 mandatory documents before filing: Aadhaar Card, Ration Card, Light Bill, Talathi Report, Photo, and Self-Declaration.',
          hi: 'आवेदन से पूर्व सभी ६ आवश्यक दस्तावेज तैयार रखें: आधार, राशन कार्ड, बिजली बिल, पटवारी रिपोर्ट, फोटो और स्व-घोषणा पत्र।',
          mr: 'अर्ज करण्यापूर्वी ६ मुख्य कागदपत्रे तयार ठेवा: आधार कार्ड, रेशन कार्ड, लाईट बिल, तलाठी अहवाल, पासपोर्ट फोटो आणि स्वयंघोषणापत्र.',
        },
        keyDetails: {
          en: [
            'All scanned files must be below 256 KB (PDF or JPEG) for portal upload.',
            'Photograph must be between 20 KB and 50 KB.',
          ],
          hi: [
            'सभी स्कैन की गई फाइलें 256 KB से कम साइज की होनी चाहिए।',
            'फोटो की साइज 20 KB से 50 KB के बीच होनी चाहिए।',
          ],
          mr: [
            'अपलोड करण्यासाठी सर्व कागदपत्रांची साईज २५६ केबी पेक्षा कमी असावी.',
            'फोटोची साईज २० ते ५० केबी दरम्यान असावी.',
          ],
        },
      },
      {
        id: 'inc_stage_6',
        stageNumber: 6,
        stageKey: 'form_fields',
        title: {
          en: 'Fill Application Form Details',
          hi: 'आवेदन पत्र के मुख्य विवरण भरें',
          mr: 'अर्जातील मुख्य रकाने व माहिती भरणे',
        },
        summary: {
          en: 'Review and confirm the exact information needed in the revenue form fields.',
          hi: 'राजस्व फॉर्म में भरी जाने वाली आवश्यक जानकारी की समीक्षा करें।',
          mr: 'अर्जात भरायची माहिती तपासून घ्या, जेणेकरून स्पेलिंग किंवा आकडेवारीत चूक होणार नाही.',
        },
        keyDetails: {
          en: [
            'Applicant full name: Exact match with School Leaving Certificate & Aadhaar.',
            'Annual income figure: Must match the Talathi inquiry report or salary slip.',
            'Purpose: State clearly (e.g. College Scholarship / Admission).',
          ],
          hi: [
            'आवेदक का पूरा नाम: स्कूल लीविंग सर्टिफिकेट और आधार से मेल खाना चाहिए।',
            'वार्षिक आय: पटवारी रिपोर्ट या वेतन पर्ची से मेल खानी चाहिए।',
            'उद्देश्य: स्पष्ट रूप से लिखें (जैसे कॉलेज छात्रवृत्ति / प्रवेश)।',
          ],
          mr: [
            'अर्जदाराचे पूर्ण नाव: आधार कार्ड व शाळा सोडल्याच्या दाखल्याप्रमाणे अचूक लिहा.',
            'वार्षिक उत्पन्नाचा आकडा: तलाठी अहवाल किंवा पगार पावतीशी तंतोतंत जुळला पाहिजे.',
            'दाखल्याचे कारण: स्पष्ट लिहा (उदा. कॉलेज प्रवेश व शिष्यवृत्तीसाठी).',
          ],
        },
        questions: [
          {
            id: 'inc_q_applicant_name',
            label: 'Applicant Full Name',
            category: 'applicant',
            required: true,
            simplifiedQuestion: {
              en: 'What is the full name of the applicant as per Aadhaar / School LC?',
              hi: 'आधार या स्कूल रिकॉर्ड के अनुसार आवेदक का पूरा नाम क्या है?',
              mr: 'आधार कार्ड किंवा शाळेच्या दाखल्याप्रमाणे अर्जदाराचे पूर्ण नाव काय आहे?',
            },
            explanation: {
              en: 'Enter full name without initials to avoid discrepancy at college or exam desks.',
              hi: 'पूरा नाम लिखें ताकि छात्रवृत्ति या प्रवेश में कोई समस्या न आए।',
              mr: 'नाव, वडिलांचे नाव आणि आडनाव पूर्ण लिहा; स्पेलिंग चूक करू नका.',
            },
            exampleAnswer: {
              en: 'Ramesh Tukaram Shinde [Fictional Example]',
              hi: 'राजेश कुमार शर्मा [काल्पनिक उदाहरण]',
              mr: 'रमेश तुकाराम शिंदे [काल्पनिक उदाहरण]',
            },
            cautionNote: {
              en: 'Do not use nicknames or abbreviations.',
              hi: 'उपनाम या संक्षिप्त रूप न लिखें।',
              mr: 'टोपणनाव किंवा संक्षेप वापरू नका.',
            },
            placeholder: {
              en: 'First Name Middle Name Surname',
              hi: 'नाम पिता का नाम उपनाम',
              mr: 'नाव वडिलांचे नाव आडनाव',
            },
          },
          {
            id: 'inc_q_income_amount',
            label: 'Annual Family Income (₹)',
            category: 'income',
            required: true,
            simplifiedQuestion: {
              en: 'What is the total annual family income in ₹ from all sources?',
              hi: 'सभी स्रोतों से परिवार की कुल वार्षिक आय (रुपये में) कितनी है?',
              mr: 'कुटुंबाचे सर्व मार्गांतून मिळणारे एकूण वार्षिक उत्पन्न (रुपयांमध्ये) किती आहे?',
            },
            explanation: {
              en: 'This figure must match your Talathi inquiry report or salary certificate.',
              hi: 'यह राशि पटवारी रिपोर्ट या सैलरी स्लिप से मेल खानी चाहिए।',
              mr: 'ही रक्कम तलाठी उत्पन्नाचा दाखला किंवा पगार पावतीशी तंतोतंत जुळली पाहिजे.',
            },
            exampleAnswer: {
              en: '₹ 65,000 [Fictional Example]',
              hi: '₹ 65,000 [काल्पनिक उदाहरण]',
              mr: '₹ ६५,०००/- [काल्पनिक उदाहरण]',
            },
            cautionNote: {
              en: 'Entering false figures on affidavits is a legal offense.',
              hi: 'शपथ पत्र पर गलत आंकड़े दर्ज करना कानूनी अपराध है।',
              mr: 'खोटे उत्पन्न दाखवणे कायद्याने गुन्हा आहे. खरी माहितीच नोंदवा.',
            },
            placeholder: {
              en: 'e.g. 60000',
              hi: 'उदा. 60000',
              mr: 'उदा. ६००००',
            },
          },
          {
            id: 'inc_q_purpose',
            label: 'Purpose of Certificate',
            category: 'purpose',
            required: true,
            simplifiedQuestion: {
              en: 'Where will this income certificate be submitted?',
              hi: 'यह आय प्रमाण पत्र कहाँ जमा किया जाएगा?',
              mr: 'हा उत्पन्नाचा दाखला तुम्ही कुठे सादर करणार आहात?',
            },
            explanation: {
              en: 'This exact reason will be printed on the official certificate.',
              hi: 'यह कारण प्रमाण पत्र पर मुद्रित किया जाता है।',
              mr: 'हे कारण दाखल्यावर तहसीलदार कार्यालयाकडून थेट छापून येते.',
            },
            exampleAnswer: {
              en: 'College Admission & MahaDBT Scholarship [Fictional Example]',
              hi: 'पॉलिटेक्निक प्रवेश एवं छात्रवृत्ति [काल्पनिक उदाहरण]',
              mr: 'कॉलेज ॲडमिशन आणि महाडीबीटी शिष्यवृत्तीसाठी [काल्पनिक उदाहरण]',
            },
            cautionNote: {
              en: 'Specify clearly if needed for fee concessions.',
              hi: 'फीस छूट या एडमिशन हेतु स्पष्ट उल्लेख करें।',
              mr: 'फी माफी किंवा शिष्यवृत्तीचा स्पष्ट उल्लेख करा.',
            },
            placeholder: {
              en: 'e.g. Scholarship and College Fee Concession',
              hi: 'उदा. छात्रवृत्ति एवं कॉलेज प्रवेश',
              mr: 'उदा. शासकीय शिष्यवृत्ती व फी सवलत',
            },
          },
        ],
      },
      {
        id: 'inc_stage_7',
        stageNumber: 7,
        stageKey: 'review',
        title: {
          en: 'Review Preparation Checklist',
          hi: 'तैयारी का अंतिम अवलोकन',
          mr: 'तयारीचा आढावा व तपासणी',
        },
        summary: {
          en: 'Verify that your details and document checklist are complete before applying.',
          hi: 'आवेदन से पूर्व अपने विवरण और दस्तावेज सूची की अंतिम जांच करें।',
          mr: 'अर्ज करण्यापूर्वी सर्व माहिती आणि कागदपत्रांची अंतिम खात्री करा.',
        },
        keyDetails: {
          en: [
            'All checked documents are readily scanned.',
            'Aadhaar phone number is active for OTP verification.',
          ],
          hi: [
            'सभी आवश्यक दस्तावेज स्कैन कर तैयार हैं।',
            'आधार से जुड़ा मोबाइल नंबर ओटीपी के लिए सक्रिय है।',
          ],
          mr: [
            'सर्व कागदपत्रांची डिजिटल कॉपी (स्कॅन) तयार आहे.',
            'आधारशी जोडलेला मोबाईल नंबर ओटीपीसाठी चालू आहे.',
          ],
        },
      },
      {
        id: 'inc_stage_8',
        stageNumber: 8,
        stageKey: 'next_steps',
        title: {
          en: 'Next Steps & Official Portal Link',
          hi: 'अगले कदम और आधिकारिक पोर्टल लिंक',
          mr: 'पुढील पावले आणि थेट अधिकृत पोर्टल लिंक',
        },
        summary: {
          en: 'Your preparation is complete! Proceed to Aaple Sarkar or visit the nearest Setu Suvidha Kendra.',
          hi: 'आपकी तैयारी पूरी हो गई है! अब आप सीधे अधिकृत पोर्टल पर आवेदन कर सकते हैं।',
          mr: 'तुमची तयारी पूर्ण झाली आहे! आता अधिकृत आपले सरकार पोर्टलवर किंवा सेतू केंद्रावर जाऊन अर्ज सादर करा.',
        },
        keyDetails: {
          en: [
            'Official Portal: https://aaplesarkar.mahaonline.gov.in',
            'Statutory Delivery Period: 15 days.',
            'Track Application Status with your 15-digit Application ID.',
          ],
          hi: [
            'आधिकारिक पोर्टल: https://aaplesarkar.mahaonline.gov.in',
            'सरकारी समय सीमा: १५ कार्य दिवस।',
            'आवेदन क्रमांक से स्थिति ट्रैक करें।',
          ],
          mr: [
            'अधिकृत संकेतस्थळ: https://aaplesarkar.mahaonline.gov.in',
            'दाखला मिळण्याचा कायदेशीर कालावधी: १५ दिवस.',
            'मिळालेल्या १५ अंकी अर्ज क्रमांकावरून अर्जाची स्थिती तपासा.',
          ],
        },
        officialNotice: {
          en: 'FormSaathi AI is an informational civic guide. Always apply on certified .gov.in state portals and pay only official fees.',
          hi: 'फॉर्मसाथी AI एक स्वतंत्र नागरिक मार्गदर्शक है। हमेशा आधिकारिक सरकारी पोर्टल पर ही आवेदन करें।',
          mr: 'फॉर्मसाथी AI हे नागरिकांना मदत करणारे स्वतंत्र साधन आहे. दाखल्यासाठी नेहमी अधिकृत शासकीय पोर्टलचाच वापर करा.',
        },
      },
    ],
    suggestedQuestions: {
      mr: [
        'उत्पन्नाचा दाखला काढण्यासाठी कोणती कागदपत्रे लागतात?',
        'माझ्याकडे रेशन कार्ड आहे. आता आणखी काय लागेल?',
        'मला अर्ज कुठे करायचा आहे?',
        'या प्रक्रियेला कोणते टप्पे आहेत आणि किती दिवस लागतात?',
      ],
      hi: [
        'आय प्रमाण पत्र बनवाने के लिए कौन से दस्तावेज लगते हैं?',
        'मेरे पास राशन कार्ड है, अब और क्या चाहिए?',
        'मुझे आवेदन कहाँ करना होगा?',
        'इस प्रक्रिया में कितने दिन लगते हैं और सरकारी फीस क्या है?',
      ],
      en: [
        'What documents are required for an Income Certificate?',
        'I have a ration card. What else do I need to submit?',
        'Where should I submit the application form?',
        'What are the official steps and processing timeline?',
      ],
    },
  },

  domicile_cert: {
    info: {
      id: 'domicile_cert',
      title: {
        en: 'Domicile & Age-Nationality Certificate (अधिवास दाखला)',
        hi: 'अधिवास प्रमाण पत्र (Domicile Certificate)',
        mr: 'अधिवास दाखला (Domicile Certificate)',
      },
      shortDescription: {
        en: 'Proves 15 years continuous residence in the state; essential for Maharashtra state quota in medical, engineering, government jobs, and police recruitment.',
        hi: 'राज्य में १५ वर्षों के निरंतर निवास का आधिकारिक प्रमाण; मेडिकल, इंजीनियरिंग, सरकारी नौकरियों और पुलिस भर्ती में राज्य कोटा पाने के लिए अनिवार्य।',
        mr: 'राज्यात १५ वर्षे सलग वास्तव्याचा कायदेशीर पुरावा; इंजिनिअरिंग, मेडिकल, पोलीस भरती आणि शासकीय नोकऱ्यांमधील राज्य कोट्यासाठी अनिवार्य.',
      },
      department: {
        en: 'Revenue & Home Department',
        hi: 'राजस्व विभाग (Revenue Dept)',
        mr: 'महसूल विभाग (Revenue Department)',
      },
      standardIssuingAuthority: {
        en: 'Executive Magistrate / Tahsildar / SDO',
        hi: 'कार्यकारी दंडाधिकारी / तहसीलदार',
        mr: 'कार्यकारी दंडाधिकारी / तहसीलदार / उपविभागीय अधिकारी',
      },
      typicalDeliveryDays: 15,
      officialFee: '₹ 33.60',
      validityDuration: {
        en: 'Lifetime Validity (unless canceled)',
        hi: 'आजीवन मान्य (जब तक रद्द न हो)',
        mr: 'आयुष्यभरासाठी वैध (Life Time Validity)',
      },
      officialPortalName: 'Aaple Sarkar / Revenue Portal',
      officialPortalUrl: 'https://aaplesarkar.mahaonline.gov.in',
    },
    checklist: [
      {
        id: 'dom_aadhaar',
        title: {
          en: 'Applicant Aadhaar Card',
          hi: 'आवेदक का आधार कार्ड',
          mr: 'अर्जदाराचे आधार कार्ड (चालू मोबाईल लिंक असलेले)',
        },
        description: {
          en: 'Primary identity proof and age verification.',
          hi: 'पहचान और आयु का मुख्य आधिकारिक दस्तावेज।',
          mr: 'ओळख व वयाचा प्राथमिक पुरावा.',
        },
        whyNeeded: {
          en: 'Required for OTP login and biometric authentication.',
          hi: 'ऑनलाइन पोर्टल पर पहचान सत्यापन हेतु।',
          mr: 'ऑनलाइन अर्जासाठी आधार प्रमाणीकरण आवश्यक.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        officialAuthority: 'UIDAI',
        officialPortalUrl: 'https://myaadhaar.uidai.gov.in',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'dom_school_lc',
        title: {
          en: 'School Leaving Certificate (शाळा सोडल्याचा दाखला - LC/TC)',
          hi: 'स्कूल लीविंग सर्टिफिकेट / टीसी (जन्म स्थान सहित)',
          mr: 'शाळा सोडल्याचा दाखला (LC / TC - जन्मस्थळ व शाळा नोंद असलेला)',
        },
        description: {
          en: 'Must clearly state birthplace and continuous school education within Maharashtra.',
          hi: 'इसमें जन्म स्थान और राज्य में विद्यालयी शिक्षा स्पष्ट रूप से दर्ज होनी चाहिए।',
          mr: 'यावर जन्म ठिकाण (महाराष्ट्रातील) आणि शाळेतील शिक्षण कालावधी स्पष्ट नमूद असावा.',
        },
        whyNeeded: {
          en: 'Proves birth and schooling within state borders.',
          hi: 'राज्य में जन्म और शिक्षा प्रमाणित करने हेतु आवश्यक।',
          mr: 'महाराष्ट्रात जन्म व शिक्षण सिद्ध करणारा सर्वात महत्त्वाचा पुरावा.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        officialAuthority: 'Education Department / School Board',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'dom_residence_15yrs',
        title: {
          en: 'Proof of 15 Years Continuous Residence',
          hi: '१५ वर्षों के निरंतर निवास का प्रमाण (राशन कार्ड / बिजली बिल / हाउस टैक्स)',
          mr: '१५ वर्षे सलग वास्तव्याचा पुरावा (रेशन कार्ड / जुनी लाईट बिले / घरपट्टी)',
        },
        description: {
          en: 'Electricity bills spanning past 15 years, old ration card, municipal tax receipts, or voter list entries.',
          hi: 'पिछले १५ वर्षों के बिजली बिल, पुराना राशन कार्ड, या मतदाता सूची में नाम।',
          mr: 'मागील १५ वर्षांतील जुने रेशन कार्ड, लाईट बिल, ग्रामपंचायत/नगरपालिका घरपट्टी किंवा मतदार यादीतील नोंद.',
        },
        whyNeeded: {
          en: 'Statutory Maharashtra government requirement for Domicile is strictly 15 years continuous living.',
          hi: 'महाराष्ट्र अधिवास नियमों के अनुसार १५ वर्ष का निरंतर निवास अनिवार्य है।',
          mr: 'अधिवास दाखल्यासाठी किमान १५ वर्षे महाराष्ट्रात राहणे कायद्याने बंधनकारक आहे.',
        },
        category: 'address',
        requirementType: 'required',
        isOfficiallyVerified: true,
        officialAuthority: 'Revenue Dept 15-Year Rule',
        officialPortalUrl: 'https://aaplesarkar.mahaonline.gov.in',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'dom_birth_cert',
        title: {
          en: 'Birth Certificate (वय व जन्माचा दाखला)',
          hi: 'जन्म प्रमाण पत्र (Birth Certificate)',
          mr: 'जन्म नोंद प्रमाणपत्र (महानगरपालिका / ग्रामपंचायत दाखला)',
        },
        description: {
          en: 'Official birth certificate issued by Municipal Corporation or Gram Panchayat.',
          hi: 'नगर निगम या ग्राम पंचायत द्वारा जारी जन्म प्रमाण पत्र।',
          mr: 'स्थानिक स्वराज्य संस्थेने जारी केलेले जन्म प्रमाणपत्र.',
        },
        whyNeeded: {
          en: 'Required to prove age and exact birthplace.',
          hi: 'आयु और जन्म स्थान प्रमाणित करने के लिए।',
          mr: 'वय आणि जन्माचे अचूक ठिकाण सिद्ध करण्यासाठी.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        officialAuthority: 'Civil Registration System (CRS)',
        officialPortalUrl: 'https://crsorgi.gov.in',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'dom_photo',
        title: {
          en: 'Passport Photograph & Signature',
          hi: 'पासपोर्ट फोटो और हस्ताक्षर',
          mr: 'पासपोर्ट साईज फोटो व स्वाक्षरी',
        },
        description: {
          en: 'Clear white background photograph (20KB - 50KB).',
          hi: 'सफेद बैकग्राउंड वाला स्पष्ट फोटो।',
          mr: 'दाखल्यावर छापण्यासाठी पांढऱ्या पार्श्वभूमीवरील फोटो.',
        },
        whyNeeded: {
          en: 'Printed on digital Domicile Certificate.',
          hi: 'डिजिटल प्रमाण पत्र पर मुद्रण हेतु।',
          mr: 'डिजिटल दाखल्यावर फोटो छापला जातो.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'dom_self_declaration',
        title: {
          en: 'Self-Declaration for 15-Year Residence (स्वयंघोषणापत्र)',
          hi: '१५ वर्ष निवास का विहित स्व-घोषणा पत्र',
          mr: '१५ वर्षे सलग वास्तव्याचे विहित स्वयंघोषणापत्र',
        },
        description: {
          en: 'Affidavit declaring 15 years uninterrupted residence in Maharashtra under penalty of law.',
          hi: 'राज्य में १५ वर्ष निवास का विधिक शपथ पत्र।',
          mr: 'महाराष्ट्रात सलग १५ वर्षे राहत असल्याचे कायदेशीर प्रतिज्ञापत्र.',
        },
        whyNeeded: {
          en: 'Mandatory attachment on Aaple Sarkar.',
          hi: 'पोर्टल पर अनिवार्य घोषणा पत्र।',
          mr: 'आपले सरकार पोर्टलवर अपलोड करणे अनिवार्य आहे.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        officialAuthority: 'Revenue Dept Standard Format',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'dom_father_domicile',
        title: {
          en: 'Father’s Domicile / Ancestral Land Record (If minor applicant)',
          hi: 'पिता का अधिवास प्रमाण पत्र या पैतृक भूमि अभिलेख (नाबालिग हेतु)',
          mr: 'वडिलांचा अधिवास दाखला किंवा ७/१२ उतारा (विद्यार्थी/अल्पवयीन असल्यास)',
        },
        description: {
          en: 'If applicant is a student under 18 or lacking independent 15-year proofs, father’s domicile proves eligibility.',
          hi: 'विद्यार्थी के पास स्वतंत्र १५ वर्ष का प्रमाण न होने पर पिता का अधिवास मान्य होता है।',
          mr: 'विद्यार्थी लहान असल्यास वडिलांचा दाखला किंवा जुने ७/१२ उतारे चालतात.',
        },
        whyNeeded: {
          en: 'Substitutes 15-year independent documentary gap for students.',
          hi: 'छात्रों के लिए १५ वर्ष के स्वतंत्र दस्तावेजों की कमी को पूरा करता है।',
          mr: 'विद्यार्थ्यांसाठी वास्तव्याची साखळी सिद्ध करण्यासाठी उपयोगी.',
        },
        category: 'proof',
        requirementType: 'conditional',
        isOfficiallyVerified: true,
        officialAuthority: 'Revenue Department',
        lastVerifiedDate: 'October 2026',
        checked: false,
      },
      {
        id: 'dom_police_patil',
        title: {
          en: 'Police Patil / Sarpanch Residence Certificate (Rural verification)',
          hi: 'पुलिस पाटिल / ग्राम प्रधान रहिवासी प्रमाण पत्र (ग्रामीण जांच)',
          mr: 'पोलीस पाटील किंवा सरपंच यांचा रहिवासी दाखला (गाव पातळीवरील पडताळणी)',
        },
        description: {
          en: 'Confirms continuous living in rural village.',
          hi: 'ग्रामीण क्षेत्र में निरंतर निवास की स्थानीय पुष्टि।',
          mr: 'गावात सलग वास्तव्याची स्थानिक पातळीवर खात्री करण्यासाठी.',
        },
        whyNeeded: {
          en: 'Local circle officer may require field verification in doubtful cases.',
          hi: 'स्थानीय राजस्व जांच के दौरान मांगा जा सकता है।',
          mr: 'तलाठी चौकशी दरम्यान ग्रामीण भागात मागितले जाते.',
        },
        category: 'proof',
        requirementType: 'verification',
        isOfficiallyVerified: false,
        officialAuthority: 'Local Gram Panchayat / Police Patil',
        lastVerifiedDate: 'Requires local check',
        checked: false,
      },
    ],
    stages: [
      {
        id: 'dom_stage_1',
        stageNumber: 1,
        stageKey: 'purpose',
        title: {
          en: 'Understand Purpose of Domicile Certificate',
          hi: 'अधिवास प्रमाण पत्र का उद्देश्य समझें',
          mr: 'अधिवास (डोमिसाईल) दाखल्याचा मुख्य उद्देश समजून घ्या',
        },
        summary: {
          en: 'Domicile certifies that you have been residing in the state for at least 15 consecutive years. It is valid for a lifetime and grants access to state reservation quotas.',
          hi: 'अधिवास प्रमाण पत्र प्रमाणित करता है कि आप कम से कम १५ वर्षों से राज्य में रह रहे हैं। यह आजीवन मान्य होता है और राज्य कोटे के लाभ दिलाता है।',
          mr: 'डोमिसाईल दाखला हा तुम्ही महाराष्ट्रात सलग १५ वर्षे राहत असल्याचा कायदेशीर पुरावा आहे. हा दाखला आयुष्यभरासाठी वैध असतो आणि राज्य कोट्यातील जागांसाठी अनिवार्य असतो.',
        },
        keyDetails: {
          en: [
            'Essential for MHT-CET, NEET state quota (85%), and CAP engineering rounds.',
            'Required for Maharashtra Police Recruitment, MPSC, and state government jobs.',
            'Lifetime validity — you do not need to renew it every year.',
          ],
          hi: [
            'नीट राज्य कोटा (85%), एमएचटी-सीईटी और इंजीनियरिंग प्रवेश में अनिवार्य।',
            'महाराष्ट्र पुलिस भर्ती, एमपीएससी और सरकारी नौकरियों में अनिवार्य।',
            'आजीवन वैधता — हर साल दोबारा बनवाने की आवश्यकता नहीं होती।',
          ],
          mr: [
            'NEET राज्य कोटा (८५%), MHT-CET व इंजिनिअरिंग प्रवेशासाठी अनिवार्य.',
            'महाराष्ट्र पोलीस भरती, MPSC व राज्य शासकीय नोकऱ्यांसाठी आवश्यक.',
            'आयुष्यभरासाठी वैध — दरवर्षी नवीन काढण्याची गरज नसते.',
          ],
        },
      },
      {
        id: 'dom_stage_2',
        stageNumber: 2,
        stageKey: 'jurisdiction',
        title: {
          en: 'Confirm State & Residence Jurisdiction',
          hi: 'राज्य और निवास क्षेत्र की पुष्टि',
          mr: 'राज्य आणि १५ वर्षांच्या वास्तव्याचे कार्यक्षेत्र',
        },
        summary: {
          en: 'Must be applied in the Tahsil where you have resided continuously for the past 15 years.',
          hi: 'उसी तहसील में आवेदन करें जहां आप पिछले १५ वर्षों से निवास कर रहे हैं।',
          mr: 'ज्या तालुक्यात तुम्ही सलग १५ वर्षे राहत आहात त्याच तहसील कार्यालयात अर्ज करावा लागतो.',
        },
        keyDetails: {
          en: ['Permanent home address determines your Tahsil jurisdiction.'],
          hi: ['स्थायी घर का पता आपकी तहसील का निर्धारण करता है।'],
          mr: ['कायम पत्त्यावरून तुमचा तालुका व सेतू केंद्र ठरते.'],
        },
      },
      {
        id: 'dom_stage_3',
        stageNumber: 3,
        stageKey: 'process',
        title: {
          en: 'Application Steps on Aaple Sarkar',
          hi: 'आपले सरकार पोर्टल पर आवेदन के चरण',
          mr: 'आपले सरकार पोर्टलवरील अर्ज प्रक्रिया',
        },
        summary: {
          en: 'Submit online at aaplesarkar.mahaonline.gov.in under Revenue Department -> Age, Nationality and Domicile Certificate.',
          hi: 'राजस्व विभाग -> आयु, राष्ट्रीयता एवं अधिवास प्रमाण पत्र सेवा चुनकर ऑनलाइन आवेदन करें।',
          mr: 'महसूल विभाग -> वय, अधिवास व राष्ट्रीयत्व प्रमाणपत्र सेवा निवडून ऑनलाइन अर्ज करा.',
        },
        keyDetails: {
          en: [
            'Official delivery timeline: 15 working days.',
            'Statutory Fee: ₹ 33.60.',
          ],
          hi: [
            'सरकारी समय सीमा: १५ कार्य दिवस।',
            'शासकीय शुल्क: ₹ ३३.६०।',
          ],
          mr: [
            'कायदेशीर कालावधी: १५ दिवस.',
            'शासकीय शुल्क: ₹ ३३.६०/-.',
          ],
        },
      },
      {
        id: 'dom_stage_4',
        stageNumber: 4,
        stageKey: 'eligibility',
        title: {
          en: 'Eligibility: 15-Year Rule in Maharashtra',
          hi: 'पात्रता: महाराष्ट्र में १५ वर्ष निवास का नियम',
          mr: 'पात्रता: महाराष्ट्रातील १५ वर्षांची वास्तव्याची अट',
        },
        summary: {
          en: 'Strict criteria: Applicant or parents must have continuously lived in Maharashtra for at least 15 continuous years.',
          hi: 'कड़ा नियम: आवेदक या माता-पिता का महाराष्ट्र में कम से कम १५ वर्ष निरंतर निवास होना आवश्यक है।',
          mr: 'कडक नियम: अर्जदार किंवा त्यांच्या पालकांचे महाराष्ट्रात किमान १५ वर्षे सलग वास्तव्य असणे कायद्याने बंधनकारक आहे.',
        },
        keyDetails: {
          en: [
            'Birth in Maharashtra + 15 years education proofs = direct eligibility.',
            'Born outside but lived 15+ years = verified proof of residence required.',
          ],
          hi: [
            'महाराष्ट्र में जन्म + १५ वर्ष शिक्षा के दस्तावेज = सीधे पात्र।',
            'बाहर जन्म लेकिन १५+ वर्ष से निवास = निवास के पुख्ता प्रमाण आवश्यक।',
          ],
          mr: [
            'महाराष्ट्रात जन्म + १५ वर्षांचे शालेय पुरावे = थेट पात्र.',
            'जन्माचे ठिकाण बाहेर असल्यास सलग १५ वर्षांचे भक्कम पुरावे लागतात.',
          ],
        },
      },
      {
        id: 'dom_stage_5',
        stageNumber: 5,
        stageKey: 'documents',
        title: {
          en: 'Checklist of 15-Year Residence Documents',
          hi: '१५ वर्ष निवास दस्तावेजों की सूची',
          mr: '१५ वर्षांच्या पुराव्यांची कागदपत्र पडताळणी',
        },
        summary: {
          en: 'Ensure you have School LC, Birth Certificate, and at least two solid residence proofs spanning 15 years.',
          hi: 'स्कूल टीसी, जन्म प्रमाण पत्र और १५ वर्ष पुराने निवास प्रमाण तैयार रखें।',
          mr: 'शाळा सोडल्याचा दाखला, जन्म दाखला आणि १५ वर्षांचे किमान दोन जुने रहिवासी पुरावे तयार ठेवा.',
        },
        keyDetails: {
          en: ['Old ration card or electricity bills from 15 years ago are best evidence.'],
          hi: ['१५ वर्ष पुराना राशन कार्ड या बिजली बिल सबसे मजबूत प्रमाण माना जाता है।'],
          mr: ['१५ वर्षांपूर्वीचे जुने रेशन कार्ड किंवा जुने लाईट बिल हा सर्वात भक्कम पुरावा ठरतो.'],
        },
      },
      {
        id: 'dom_stage_6',
        stageNumber: 6,
        stageKey: 'form_fields',
        title: {
          en: 'Key Form Fields for Domicile',
          hi: 'अधिवास फॉर्म के मुख्य विवरण',
          mr: 'अधिवास अर्जातील मुख्य माहिती भरणे',
        },
        summary: {
          en: 'Verify birthplace, schooling years, and exact continuous residency period.',
          hi: 'जन्म स्थान, स्कूली शिक्षा के वर्ष और निवास की अवधि की जांच करें।',
          mr: 'जन्मस्थळ, शाळा शिकलेली वर्षे आणि वास्तव्याचा अचूक कालावधी तपासा.',
        },
        keyDetails: {
          en: [
            'Name must exactly match Class 10/12 marksheet and School LC.',
            'Residence period: Enter exact years (e.g. 2011 to 2026).',
          ],
          hi: [
            'नाम १०वीं/१२वीं मार्कशीट और टीसी से पूर्णतः मेल खाना चाहिए।',
            'निवास अवधि: वास्तविक वर्ष (उदा. २०११ से २०२६) दर्ज करें।',
          ],
          mr: [
            'नाव १०वी/१२वी गुणपत्रिका आणि शाळा सोडल्याच्या दाखल्याशी तंतोतंत जुळले पाहिजे.',
            'वास्तव्याचा कालावधी: अचूक वर्षे (उदा. २०११ ते २०२६) नोंदवा.',
          ],
        },
        questions: [
          {
            id: 'dom_q_name',
            label: 'Applicant Name',
            category: 'applicant',
            required: true,
            simplifiedQuestion: {
              en: 'What is the full name of the applicant as per School Leaving Certificate?',
              hi: 'स्कूल लीविंग सर्टिफिकेट के अनुसार आवेदक का पूरा नाम क्या है?',
              mr: 'शाळा सोडल्याच्या दाखल्याप्रमाणे (LC) अर्जदाराचे पूर्ण नाव काय आहे?',
            },
            explanation: {
              en: 'Matches admission records for college CAP admission.',
              hi: 'कॉलेज एडमिशन रिकॉर्ड से मिलान के लिए।',
              mr: 'कॉलेज कॅप राउंड व ॲडमिशनसाठी नाव तंतोतंत जुळणे गरजेचे असते.',
            },
            exampleAnswer: {
              en: 'Snehal Ashok Patil [Fictional Example]',
              hi: 'स्नेहल अशोक पाटिल [काल्पनिक उदाहरण]',
              mr: 'स्नेहल अशोक पाटील [काल्पनिक उदाहरण]',
            },
            cautionNote: {
              en: 'Must match School LC exact spelling.',
              hi: 'स्पेलिंग टीसी से बिल्कुल मेल खानी चाहिए।',
              mr: 'शाळेच्या दाखल्यावरील स्पेलिंगप्रमाणेच लिहा.',
            },
            placeholder: {
              en: 'First Name Father Name Surname',
              hi: 'नाम पिता का नाम उपनाम',
              mr: 'नाव वडिलांचे नाव आडनाव',
            },
          },
          {
            id: 'dom_q_residence_years',
            label: 'Years of Residence in Maharashtra',
            category: 'purpose',
            required: true,
            simplifiedQuestion: {
              en: 'Since which year has the applicant or family lived in Maharashtra?',
              hi: 'आवेदक या परिवार किस वर्ष से महाराष्ट्र में रह रहा है?',
              mr: 'अर्जदार किंवा त्यांचे कुटुंब कोणत्या सालापासून महाराष्ट्रात सलग राहत आहे?',
            },
            explanation: {
              en: 'Must be at least 15 continuous years to qualify.',
              hi: 'पात्रता के लिए कम से कम १५ वर्ष आवश्यक हैं।',
              mr: 'दाखल्यासाठी किमान १५ वर्षे पूर्ण असणे आवश्यक आहे.',
            },
            exampleAnswer: {
              en: 'Since birth (2007 - 19 years) [Fictional Example]',
              hi: 'जन्मतः (२००७ से - १९ वर्ष) [काल्पनिक उदाहरण]',
              mr: 'जन्मापासून (२००७ पासून - १९ वर्षे) [काल्पनिक उदाहरण]',
            },
            cautionNote: {
              en: 'Do not state less than 15 years unless parent has government posting transfer exemption.',
              hi: '१५ वर्ष से कम होने पर आवेदन खारिज हो सकता है।',
              mr: '१५ वर्षांपेक्षा कमी असल्यास अर्ज नामंजूर होऊ शकतो.',
            },
            placeholder: {
              en: 'e.g. Since 2008 (18 years)',
              hi: 'उदा. 2008 से (18 वर्ष)',
              mr: 'उदा. २००८ पासून (१८ वर्षे)',
            },
          },
        ],
      },
      {
        id: 'dom_stage_7',
        stageNumber: 7,
        stageKey: 'review',
        title: {
          en: 'Review Checklist & Summary',
          hi: 'तैयारी की समीक्षा',
          mr: 'तयारीचा आढावा व पडताळणी',
        },
        summary: {
          en: 'Verify all 15-year residence evidence and birth details before finalizing.',
          hi: 'अंतिम रूप देने से पहले सभी १५ वर्षीय निवास प्रमाणों की जांच करें।',
          mr: 'अर्ज करण्यापूर्वी १५ वर्षांच्या वास्तव्याचे सर्व पुरावे तपासून घ्या.',
        },
        keyDetails: {
          en: ['Keep original School LC handy as Setu centers may inspect originals.'],
          hi: ['मूल टीसी साथ रखें, सेतु केंद्र पर मूल प्रति देखी जा सकती है।'],
          mr: ['मूळ शाळा सोडल्याचा दाखला सोबत ठेवा, सेतू केंद्रावर प्रत्यक्ष पडताळणी होऊ शकते.'],
        },
      },
      {
        id: 'dom_stage_8',
        stageNumber: 8,
        stageKey: 'next_steps',
        title: {
          en: 'Finalize & Apply Online',
          hi: 'ऑनलाइन आवेदन करें',
          mr: 'पुढील पावले व आपले सरकारवर अर्ज',
        },
        summary: {
          en: 'Proceed to Aaple Sarkar portal to file your Domicile application.',
          hi: 'आपले सरकार पोर्टल पर अधिवास प्रमाण पत्र हेतु आवेदन पूरा करें।',
          mr: 'आपले सरकार पोर्टलवर अधिवास प्रमाणपत्रासाठी अर्ज सादर करा.',
        },
        keyDetails: {
          en: ['Direct URL: https://aaplesarkar.mahaonline.gov.in'],
          hi: ['सीधा लिंक: https://aaplesarkar.mahaonline.gov.in'],
          mr: ['थेट पोर्टल लिंक: https://aaplesarkar.mahaonline.gov.in'],
        },
      },
    ],
    suggestedQuestions: {
      mr: [
        'अधिवास (डोमिसाईल) दाखल्यासाठी १५ वर्षांचा पुरावा काय लागतो?',
        'शाळा सोडल्याचा दाखला (LC) नसल्यास काय करावे?',
        'महाविद्यालयात ॲडमिशनसाठी डोमिसाईल कुठे काढावे?',
        'डोमिसाईल दाखल्याची वैधता किती वर्षे असते?',
      ],
      hi: [
        'अधिवास (Domicile) प्रमाण पत्र के लिए १५ वर्ष का क्या प्रमाण लगता है?',
        'अगर स्कूल टीसी न हो तो क्या विकल्प है?',
        'कॉलेज एडमिशन के लिए डोमिसाइल कहाँ से बनवाएं?',
        'डोमिसाइल सर्टिफिकेट की वैलिडिटी कितने साल होती है?',
      ],
      en: [
        'What documents prove 15 years continuous residence for Domicile?',
        'What if I do not have a School Leaving Certificate?',
        'Where do I apply for Domicile for college engineering/medical admissions?',
        'What is the validity period of a Domicile Certificate?',
      ],
    },
  },

  caste_cert: {
    info: {
      id: 'caste_cert',
      title: {
        en: 'Caste Certificate (जात प्रमाणपत्र - SC / ST / VJNT / OBC / SBC)',
        hi: 'जाति प्रमाण पत्र (Caste Certificate)',
        mr: 'जात प्रमाणपत्र (Caste Certificate)',
      },
      shortDescription: {
        en: 'Official revenue document certifying constitutional social category (SC, ST, VJNT, OBC, SBC) based on ancestral lineage and pre-cut-off year revenue proofs.',
        hi: 'संवैधानिक आरक्षण हेतु वंशावली और कट-ऑफ वर्ष के पूर्वज अभिलेखों के आधार पर जारी जाति प्रमाण पत्र।',
        mr: 'अनुसूचित जाती, जमाती, विमुक्त जाती, भटक्या जमाती, इतर मागास प्रवर्ग (OBC) आरक्षणासाठी पूर्वजांच्या जुन्या नोंदींवरून दिला जाणारा दाखला.',
      },
      department: {
        en: 'Social Justice & Special Assistance Department',
        hi: 'सामाजिक न्याय विभाग (Social Justice Dept)',
        mr: 'सामाजिक न्याय व विशेष सहाय्य विभाग',
      },
      standardIssuingAuthority: {
        en: 'Sub-Divisional Officer (SDO) / Deputy Collector',
        hi: 'उप-विभागीय अधिकारी (एसडीएम) / उप-कलेक्टर',
        mr: 'उपविभागीय अधिकारी (SDO) / उप जिल्हाधिकारी',
      },
      typicalDeliveryDays: 45,
      officialFee: '₹ 33.60',
      validityDuration: {
        en: 'Lifetime Validity (Requires separate Caste Validity for elections/professional admissions)',
        hi: 'आजीवन मान्य (उच्च शिक्षा व चुनाव हेतु जाति वैधता अलग से आवश्यक)',
        mr: 'आयुष्यभरासाठी वैध (व्यावसायिक शिक्षण व निवडणुकीसाठी जात वैधता प्रमाणपत्र वेगळे लागते)',
      },
      officialPortalName: 'Aaple Sarkar / Mahaonline',
      officialPortalUrl: 'https://aaplesarkar.mahaonline.gov.in',
    },
    checklist: [
      {
        id: 'caste_aadhaar',
        title: {
          en: 'Applicant Aadhaar Card',
          hi: 'आवेदक का आधार कार्ड',
          mr: 'अर्जदाराचे आधार कार्ड',
        },
        description: {
          en: 'Primary identity and age document.',
          hi: 'पहचान का प्राथमिक दस्तावेज।',
          mr: 'अर्जदाराची ओळख सिद्ध करण्यासाठी आधार कार्ड.',
        },
        whyNeeded: {
          en: 'Required for OTP registration on Aaple Sarkar.',
          hi: 'पोर्टल पर सत्यापन हेतु।',
          mr: 'ऑनलाइन अर्ज प्रमाणीकरणासाठी.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'caste_applicant_lc',
        title: {
          en: 'Applicant School Leaving Certificate (शाळा सोडल्याचा दाखला)',
          hi: 'आवेदक का स्कूल टीसी (जाति का स्पष्ट उल्लेख)',
          mr: 'अर्जदाराचा शाळा सोडल्याचा दाखला (जात व पोटजात स्पष्ट नोंद असलेला)',
        },
        description: {
          en: 'Must have caste and sub-caste clearly recorded in school admission register.',
          hi: 'विद्यालयी रजिस्टर में जाति और उप-जाति दर्ज होनी चाहिए।',
          mr: 'शाळेच्या जनरल रजिस्टरमध्ये जात व उपजातीची स्पष्ट नोंद असणे गरजेचे.',
        },
        whyNeeded: {
          en: 'Primary record showing social category since childhood.',
          hi: 'बचपन से जाति की निरंतरता प्रमाणित करने के लिए।',
          mr: 'लहानपणापासून शाळेत नोंदवलेली जात सिद्ध करण्यासाठी.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'caste_father_lc',
        title: {
          en: 'Father’s or Grandfather’s School LC / Kotwal Panji / Birth Proof',
          hi: 'पिता या दादाजी का स्कूल टीसी / कोतवाल पंजी नकल / जन्म अभिलेख',
          mr: 'वडिलांचा किंवा आजोबांचा शाळा सोडल्याचा दाखला / कोतवाल वही नोंद',
        },
        description: {
          en: 'Paternal blood relation proof with caste explicitly mentioned. Crucial for legal validity.',
          hi: 'पिता पक्ष का वंशावली प्रमाण जिसमें जाति का स्पष्ट उल्लेख हो।',
          mr: 'वडिलांच्या रक्ताच्या नात्यातील पुराव्यावर जात नोंद असणे कायदेशीरदृष्ट्या सक्तीचे आहे.',
        },
        whyNeeded: {
          en: 'Caste is inherited exclusively from paternal lineage under Indian law.',
          hi: 'भारतीय कानून में जाति केवल पिता पक्ष से तय होती है।',
          mr: 'कायद्यानुसार जात ही केवळ वडिलांच्या रक्ताच्या नात्यावरूनच ठरते.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'caste_cutoff_proof',
        title: {
          en: 'Pre-Cut-Off Year Proof (1950 for SC/ST, 1961 for VJNT, 1967 for OBC in Maharashtra)',
          hi: 'कट-ऑफ वर्ष का पूर्वज अभिलेख (SC/ST हेतु 1950, OBC हेतु 1967)',
          mr: 'संबंधित प्रवर्गाचा जुना पुरावा (SC/ST साठी १९५०, VJNT साठी १९६१, OBC साठी १९६७ पूर्वीचा)',
        },
        description: {
          en: 'Old 7/12 extract, birth register, death register, or revenue record of ancestor prior to prescribed cut-off year.',
          hi: 'कट-ऑफ वर्ष से पूर्व का भू-अभिलेख, जन्म-मृत्यु रजिस्टर नकल या राजस्व अभिलेख।',
          mr: 'कट-ऑफ वर्षापूर्वी आजोबा/पणजोबा यांच्या नावावर असलेली शेतजमीन, जन्म-मृत्यू नोंद किंवा हक्कनोंद उतारा.',
        },
        whyNeeded: {
          en: 'Mandatory statutory requirement under Maharashtra Caste Certificate Act.',
          hi: 'महाराष्ट्र जाति प्रमाण पत्र अधिनियम के तहत अनिवार्य शर्त।',
          mr: 'महाराष्ट्र जात प्रमाणपत्र अधिनियमानुसार कट-ऑफ पूर्वीचा पुरावा अनिवार्य आहे.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'caste_genealogy',
        title: {
          en: 'Affidavit of Paternal Family Tree / Vamshavali (वंशावळ प्रतिज्ञापत्र)',
          hi: 'पिता पक्ष की वंशावली का शपथ पत्र (Vamshavali Affidavit)',
          mr: 'वडिलांच्या बाजूची मूळ वंशावळ प्रतिज्ञापत्र (परिशिष्ट-१ वंशावळ)',
        },
        description: {
          en: 'Detailed family tree linking applicant to the ancestor whose pre-cut-off document is submitted.',
          hi: 'आवेदक से पुराने पूर्वज को जोड़ने वाली विस्तृत वंशावली।',
          mr: 'अर्जदारापासून ते जुन्या पुराव्यातील पूर्वजापर्यंत रक्ताचे नाते दाखवणारी वंशावळ.',
        },
        whyNeeded: {
          en: 'Connects applicant to grandfather’s old records legally.',
          hi: 'पुराने अभिलेखों से आवेदक का सीधा जैविक संबंध जोड़ने हेतु।',
          mr: 'जुना पुरावा अर्जदाराच्याच रक्ताच्या नातेवाईकाचा आहे हे सिद्ध करण्यासाठी.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'caste_validity_relative',
        title: {
          en: 'Paternal Relative’s Validated Caste Validity Certificate (If available)',
          hi: 'पिता पक्ष के किसी रिश्तेदार का जाति वैधता प्रमाण पत्र (यदि उपलब्ध हो)',
          mr: 'वडिलांच्या रक्ताच्या नात्यातील कोणाचे आधीच जात वैधता (Validity) झालेले असल्यास',
        },
        description: {
          en: 'Caste validity of real brother, sister, father, or paternal uncle greatly expedites approval.',
          hi: 'सगे भाई, बहन या पिता की जाति वैधता होने पर प्रक्रिया बहुत तेज होती है।',
          mr: 'सख्खा भाऊ, बहीण किंवा काकांचे आधीच व्हॅलिडिटी झालेले असल्यास अर्ज लवकर मंजूर होतो.',
        },
        whyNeeded: {
          en: 'Conclusive evidence under Scrutiny Committee rules.',
          hi: 'जांच समिति के नियमों के तहत निर्विवाद प्रमाण माना जाता है।',
          mr: 'जात पडताळणी समितीच्या नियमांनुसार भक्कम पुरावा मानला जातो.',
        },
        category: 'proof',
        requirementType: 'conditional',
        isOfficiallyVerified: true,
        checked: false,
      },
    ],
    stages: [
      {
        id: 'caste_stage_1',
        stageNumber: 1,
        stageKey: 'purpose',
        title: {
          en: 'Understand Caste Certificate Rules',
          hi: 'जाति प्रमाण पत्र के नियम समझें',
          mr: 'जात प्रमाणपत्राचे शासकीय नियम समजून घ्या',
        },
        summary: {
          en: 'Certifies reserved category (SC, ST, VJNT, OBC, SBC) issued by Sub-Divisional Officer. Requires paternal pre-cut-off revenue proofs.',
          hi: 'उप-विभागीय अधिकारी (एसडीएम) द्वारा जारी आधिकारिक जाति प्रमाण पत्र। इसके लिए पिता पक्ष के पुराने ऐतिहासिक अभिलेख अनिवार्य हैं।',
          mr: 'उपविभागीय अधिकारी (SDO) यांच्याकडून दिला जाणारा अधिकृत जातीचा दाखला. यासाठी वडिलांच्या रक्ताच्या नात्यातील जुन्या नोंदी बंधनकारक असतात.',
        },
        keyDetails: {
          en: [
            'Cut-off years in Maharashtra: SC/ST: 10 Aug 1950, VJNT: 21 Nov 1961, OBC/SBC: 13 Oct 1967.',
            'Caste can NEVER be inherited from mother’s side under Indian jurisprudence.',
            'Caste Validity Certificate is a separate mandatory step for degree admissions and elections.',
          ],
          hi: [
            'कट-ऑफ वर्ष: एससी/एसटी: १० अगस्त १९५०, वीजेएनटी: २१ नवंबर १९६१, ओबीसी: १३ अक्टूबर १९६७।',
            'जाति कभी भी ननिहाल या माता पक्ष से नहीं मिलती।',
            'इंजीनियरिंग, मेडिकल और चुनाव के लिए जाति वैधता (Caste Validity) अलग से करानी होती है।',
          ],
          mr: [
            'महाराष्ट्रातील कट-ऑफ तारखा: SC/ST: १० ऑगस्ट १९५०, VJNT: २१ नोव्हेंबर १९६१, OBC/SBC: १३ ऑक्टोबर १९६७.',
            'आईच्या किंवा आजोळच्या पुराव्यांवर जात प्रमाणपत्र मिळत नाही; केवळ वडिलांचे पुरावे लागतात.',
            'डिग्री ॲडमिशन आणि निवडणुकीसाठी नंतर जात पडताळणी (Caste Validity) वेगळी करावी लागते.',
          ],
        },
      },
      {
        id: 'caste_stage_2',
        stageNumber: 2,
        stageKey: 'jurisdiction',
        title: {
          en: 'Confirm Ancestral Jurisdiction',
          hi: 'पैतृक निवास क्षेत्र की पुष्टि',
          mr: 'मूळ गाव व कार्यक्षेत्राची खात्री',
        },
        summary: {
          en: 'Apply in the Sub-Division / Tahsil where your paternal ancestors originally resided on the prescribed cut-off date.',
          hi: 'उसी अनुभाग/तहसील में आवेदन करें जहां आपके पूर्वज कट-ऑफ तारीख को निवास करते थे।',
          mr: 'ज्या तालुक्यात तुमचे पूर्वज कट-ऑफ तारखेला राहत होते त्याच उपविभागात अर्ज करावा लागतो.',
        },
        keyDetails: {
          en: ['Circle revenue officer checks Kotwal Panji and village registers.'],
          hi: ['राजस्व अधिकारी ग्राम पंचायत व तहसील में पुरानी कोतवाल पंजी जांचते हैं।'],
          mr: ['तहसील कार्यालयातील जुनी कोतवाल वही व जन्म नोंद तपासली जाते.'],
        },
      },
      {
        id: 'caste_stage_3',
        stageNumber: 3,
        stageKey: 'process',
        title: {
          en: 'Application Workflow on Aaple Sarkar',
          hi: 'आपले सरकार पर आवेदन प्रक्रिया',
          mr: 'आपले सरकारवरील अर्ज प्रक्रिया',
        },
        summary: {
          en: 'File under Social Justice Department -> Caste Certificate on Aaple Sarkar.',
          hi: 'सामाजिक न्याय विभाग -> जाति प्रमाण पत्र सेवा में ऑनलाइन आवेदन करें।',
          mr: 'सामाजिक न्याय विभाग -> जात प्रमाणपत्र सेवा निवडून ऑनलाइन अर्ज सादर करा.',
        },
        keyDetails: {
          en: [
            'Delivery period: 45 working days.',
            'Requires inquiry by Talathi and Nayab Tahsildar.',
          ],
          hi: [
            'समय सीमा: ४५ कार्य दिवस।',
            'पटवारी और तहसीलदार द्वारा स्थलीय जांच की जाती है।',
          ],
          mr: [
            'कायदेशीर कालावधी: ४५ दिवस.',
            'तलाठी व नायब तहसीलदार यांच्याकडून चौकशी केली जाते.',
          ],
        },
      },
      {
        id: 'caste_stage_4',
        stageNumber: 4,
        stageKey: 'eligibility',
        title: {
          en: 'Eligibility & Pre-Cutoff Proof Check',
          hi: 'कट-ऑफ वर्ष के पूर्वज अभिलेख की जांच',
          mr: 'कट-ऑफ वर्षाच्या जुन्या पुराव्याची तपासणी',
        },
        summary: {
          en: 'Check if you have an ancestor birth, death, land, or school entry prior to 1950, 1961, or 1967.',
          hi: 'जांचें कि क्या आपके पास कट-ऑफ वर्ष से पूर्व का कोई सरकारी अभिलेख उपलब्ध है।',
          mr: 'तुमच्याकडे १९५०, १९६१ किंवा १९६७ पूर्वीचा रक्ताच्या नात्यातील पूर्वजांचा सरकारी पुरावा आहे का ते तपासा.',
        },
        keyDetails: {
          en: ['If private proof is missing, apply for Kotwal Panji extract at Tahsildar Record Room.'],
          hi: ['अभिलेख न मिलने पर तहसील के रिकॉर्ड रूम से पुरानी कोतवाल पंजी नकल निकालें।'],
          mr: ['पुरावा नसल्यास तहसील कार्यालयातील अभिलेख कक्षातून (Record Room) कोतवाल वही नकल काढावी.'],
        },
      },
      {
        id: 'caste_stage_5',
        stageNumber: 5,
        stageKey: 'documents',
        title: {
          en: 'Assemble Document Bundle',
          hi: 'दस्तावेज सेट तैयार करें',
          mr: 'कागदपत्रांची संचिका तयार करा',
        },
        summary: {
          en: 'Applicant LC, Father LC, Grandfather record, and Family Tree Affidavit.',
          hi: 'आवेदक टीसी, पिता टीसी, दादाजी का अभिलेख और वंशावली शपथ पत्र।',
          mr: 'अर्जदाराचा दाखला, वडिलांचा दाखला, आजोबांची नोंद आणि वंशावळ प्रतिज्ञापत्र.',
        },
        keyDetails: {
          en: ['Vamshavali must be notarized on non-judicial stamp paper.'],
          hi: ['वंशावली शपथ पत्र नोटरी से सत्यापित होना चाहिए।'],
          mr: ['वंशावळ प्रतिज्ञापत्र नोटरी करून घ्यावे लागते.'],
        },
      },
      {
        id: 'caste_stage_6',
        stageNumber: 6,
        stageKey: 'form_fields',
        title: {
          en: 'Form Details: Category & Caste Name',
          hi: 'प्रवर्ग एवं जाति का नाम',
          mr: 'जात प्रवर्ग व पोटजातीची अचूक माहिती',
        },
        summary: {
          en: 'Exact category selection (SC / ST / VJNT / OBC / SBC) and official serial number from state gazette.',
          hi: 'राज्य गजट के अनुसार सही श्रेणी और जाति का चयन करें।',
          mr: 'शासनाच्या अधिकृत यादीप्रमाणे जात व प्रवर्ग अचूक निवडा.',
        },
        keyDetails: {
          en: ['Sub-caste must match gazette entry word-for-word.'],
          hi: ['उपजाति का नाम सरकारी सूची के अनुसार सही लिखें।'],
          mr: ['शासकीय राजपत्रानुसार पोटजात अचूक लिहा.'],
        },
        questions: [
          {
            id: 'caste_q_category',
            label: 'Reserved Category',
            category: 'purpose',
            required: true,
            simplifiedQuestion: {
              en: 'Which reserved category (SC, ST, VJNT, OBC, SBC) are you applying for?',
              hi: 'आप किस आरक्षित श्रेणी (SC, ST, VJNT, OBC, SBC) के लिए आवेदन कर रहे हैं?',
              mr: 'तुम्ही नक्की कोणत्या प्रवर्गासाठी (SC, ST, VJNT, OBC, SBC) अर्ज करत आहात?',
            },
            explanation: {
              en: 'Selecting the correct category loads the appropriate statutory rules and cut-off date.',
              hi: 'सही श्रेणी चुनने से संबंधित नियम और कट-ऑफ लागू होते हैं।',
              mr: 'योग्य प्रवर्ग निवडल्याने त्या प्रवर्गाचे नियम व कट-ऑफ लागू होतात.',
            },
            exampleAnswer: {
              en: 'OBC - Other Backward Class (इतर मागास प्रवर्ग) [Fictional Example]',
              hi: 'ओबीसी (OBC) [काल्पनिक उदाहरण]',
              mr: 'इतर मागास प्रवर्ग (OBC) [काल्पनिक उदाहरण]',
            },
            cautionNote: {
              en: 'Ensure category matches state government list.',
              hi: 'राज्य सरकार की मान्य सूची के अनुसार ही चुनें।',
              mr: 'महाराष्ट्र शासनाच्या अधिकृत यादीनुसारच प्रवर्ग निवडा.',
            },
            placeholder: {
              en: 'e.g. OBC / SC / ST / VJNT',
              hi: 'उदा. OBC / SC / ST / VJNT',
              mr: 'उदा. OBC / SC / ST / VJNT',
            },
          },
          {
            id: 'caste_q_ancestor_cutoff',
            label: 'Cut-off Year Ancestor Document',
            category: 'proof',
            required: true,
            simplifiedQuestion: {
              en: 'What old proof prior to the cut-off year (1950/1961/1967) do you possess?',
              hi: 'कट-ऑफ वर्ष के पूर्व का आपके पास क्या सरकारी दस्तावेज उपलब्ध है?',
              mr: 'कट-ऑफ वर्षापूर्वीचा (१९५० / १९६१ / १९६७) तुमच्याकडे कोणता जुना पुरावा उपलब्ध आहे?',
            },
            explanation: {
              en: 'Mention document type: grandfather school entry, Kotwal Panji, or 7/12 land record.',
              hi: 'दस्तावेज का प्रकार बताएं: दादाजी का टीसी, कोतवाल पंजी, या 7/12 उतारा।',
              mr: 'पुराव्याचा प्रकार लिहा: आजोबांचा शाळा दाखला, जुनी कोतवाल वही किंवा ७/१२ नोंद.',
            },
            exampleAnswer: {
              en: 'Grandfather School Admission Register 1964 showing caste [Fictional Example]',
              hi: 'दादाजी की १९६४ की स्कूल प्रवेश रजिस्टर नकल [काल्पनिक उदाहरण]',
              mr: 'आजोबांचा १९६४ चा शाळा प्रवेश उतारा व जात नोंद [काल्पनिक उदाहरण]',
            },
            cautionNote: {
              en: 'Without pre-cut-off paternal proof, SDO rejection rate is very high.',
              hi: 'कट-ऑफ पूर्वज प्रमाण के बिना आवेदन खारिज होने की संभावना रहती है।',
              mr: 'कट-ऑफ पूर्वीचा पुरावा नसल्यास अर्ज नामंजूर होऊ शकतो.',
            },
            placeholder: {
              en: 'e.g. Grandfather 1965 School LC / Kotwal Panji',
              hi: 'उदा. दादाजी का 1965 टीसी / कोतवाल पंजी',
              mr: 'उदा. आजोबांचा १९६५ चा शाळा दाखला / कोतवाल वही नोंद',
            },
          },
        ],
      },
      {
        id: 'caste_stage_7',
        stageNumber: 7,
        stageKey: 'review',
        title: {
          en: 'Review Caste Application Dossier',
          hi: 'आवेदन संचिका का अंतिम अवलोकन',
          mr: 'जात प्रमाणपत्र अर्जाचा अंतिम आढावा',
        },
        summary: {
          en: 'Double check paternal lineage names and ensure cut-off proofs are clear.',
          hi: 'वंशावली के नामों और कट-ऑफ अभिलेखों की स्पष्टता पुनः जांचें।',
          mr: 'वंशावळीतील नावे आणि कट-ऑफ पुरावे स्पष्ट असल्याची खात्री करा.',
        },
        keyDetails: {
          en: ['Scan documents in high resolution (minimum 200 DPI).'],
          hi: ['अभिलेखों को स्पष्ट रूप से स्कैन करें।'],
          mr: ['कागदपत्रे स्पष्ट व वाचता येण्याजोगी स्कॅन करा.'],
        },
      },
      {
        id: 'caste_stage_8',
        stageNumber: 8,
        stageKey: 'next_steps',
        title: {
          en: 'Submit Application & Plan for Caste Validity',
          hi: 'आवेदन जमा करें और जाति वैधता की योजना बनाएं',
          mr: 'अर्ज सादर करा आणि जात पडताळणीची (Validity) तयारी ठेवा',
        },
        summary: {
          en: 'Submit online. Once issued, proceed to submit for Caste Validity Scrutiny Committee for professional college admissions.',
          hi: 'ऑनलाइन आवेदन करें। प्रमाण पत्र मिलने के बाद उच्च शिक्षा हेतु जाति वैधता समिति में आवेदन करें।',
          mr: 'आपले सरकारवर अर्ज करा. दाखला मिळाल्यावर कॉलेज ॲडमिशनसाठी जात पडताळणी समितीकडे (Validity) अर्ज करावा लागतो.',
        },
        keyDetails: {
          en: [
            'Official Portal: https://aaplesarkar.mahaonline.gov.in',
            'Caste Validity Portal (CCVIS): https://bartievalidity.maharashtra.gov.in',
          ],
          hi: [
            'जाति प्रमाण पत्र: https://aaplesarkar.mahaonline.gov.in',
            'जाति वैधता पोर्टल: https://bartievalidity.maharashtra.gov.in',
          ],
          mr: [
            'जात प्रमाणपत्र पोर्टल: https://aaplesarkar.mahaonline.gov.in',
            'जात पडताळणी पोर्टल: https://bartievalidity.maharashtra.gov.in',
          ],
        },
      },
    ],
    suggestedQuestions: {
      mr: [
        'जात प्रमाणपत्रासाठी १९६७ किंवा १९५० पूर्वीचा पुरावा कोणता लागतो?',
        'वडिलांचे जात प्रमाणपत्र नसेल तर अर्ज कसा करावा?',
        'कोतवाल वही (Kotwal Panji) नकल कुठून काढायची?',
        'जात पडताळणी (Caste Validity) प्रमाणपत्र कसे मिळवायचे?',
      ],
      hi: [
        'जाति प्रमाण पत्र के लिए 1967 या 1950 का क्या प्रमाण लगता है?',
        'यदि पिता का जाति प्रमाण पत्र न हो तो क्या करें?',
        'कोतवाल पंजी की नकल कहाँ से निकाली जाती है?',
        'जाति वैधता (Caste Validity) कैसे बनती है?',
      ],
      en: [
        'What documents qualify as pre-cut-off year proof for Caste Certificate?',
        'How do I apply if my father does not have a Caste Certificate?',
        'Where can I obtain an old Kotwal Panji extract from Tahsil?',
        'What is the procedure for Caste Validity Certificate?',
      ],
    },
  },

  ration_card: {
    info: {
      id: 'ration_card',
      title: {
        en: 'Ration Card (नवीन रेशन कार्ड / नाव समाविष्ट करणे)',
        hi: 'राशन कार्ड (नया राशन कार्ड / नाम जोड़ना)',
        mr: 'नवीन रेशन कार्ड (New Ration Card & Member Addition)',
      },
      shortDescription: {
        en: 'Official subsidized food grains booklet and family entitlement record issued by Food, Civil Supplies and Consumer Protection Department.',
        hi: 'खाद्य एवं नागरिक आपूर्ति विभाग द्वारा जारी सब्सिडी खाद्यान्न और पारिवारिक राशन कार्ड।',
        mr: 'अन्न, नागरी पुरवठा व ग्राहक संरक्षण विभागाकडून दिले जाणारे अधिकृत रेशन कार्ड (नवीन कार्ड किंवा सदस्याचे नाव समाविष्ट करणे).',
      },
      department: {
        en: 'Food, Civil Supplies & Consumer Protection Department',
        hi: 'खाद्य एवं नागरिक आपूर्ति विभाग',
        mr: 'अन्न, नागरी पुरवठा व ग्राहक संरक्षण विभाग',
      },
      standardIssuingAuthority: {
        en: 'District Supply Officer (DSO) / Food Distribution Officer (FDO) / Tahsildar',
        hi: 'जिला आपूर्ति अधिकारी / खाद्य वितरण अधिकारी / तहसीलदार',
        mr: 'जिल्हा पुरवठा अधिकारी / अन्नधान्य वितरण अधिकारी / तहसीलदार',
      },
      typicalDeliveryDays: 30,
      officialFee: '₹ 20 - ₹ 50',
      validityDuration: {
        en: 'Valid until modified or canceled',
        hi: 'संशोधन या निरस्तीकरण तक मान्य',
        mr: 'बदल किंवा रद्द होईपर्यंत कायम वैध',
      },
      officialPortalName: 'Aaple Sarkar / National Food Security Portal',
      officialPortalUrl: 'https://rcms.mahafood.gov.in',
    },
    checklist: [
      {
        id: 'rc_head_aadhaar',
        title: {
          en: 'Head of Family Aadhaar Card (Senior woman member preferred under NFSA)',
          hi: 'परिवार के मुखिया का आधार कार्ड (NFSA नियमानुसार वरिष्ठ महिला मुखिया)',
          mr: 'कुटुंबप्रमुखाचे आधार कार्ड (NFSA कायद्यानुसार घरातील ज्येष्ठ महिला कुटुंबप्रमुख)',
        },
        description: {
          en: 'Primary cardholder identity with active mobile linking.',
          hi: 'कार्डधारक मुखिया का आधार कार्ड।',
          mr: 'रेशन कार्डवरील मुख्य अर्जदार महिलेचे आधार कार्ड.',
        },
        whyNeeded: {
          en: 'Required by National Food Security Act (NFSA) for female empowerment.',
          hi: 'राष्ट्रीय खाद्य सुरक्षा कानून के तहत महिला मुखिया अनिवार्य।',
          mr: 'अन्न सुरक्षा कायद्यानुसार घरातील १८ वर्षांवरील ज्येष्ठ महिलेच्या नावे रेशन कार्ड निघते.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'rc_all_members_aadhaar',
        title: {
          en: 'Aadhaar Cards of All Family Members to be included',
          hi: 'शामिल किए जाने वाले सभी सदस्यों के आधार कार्ड',
          mr: 'नाव समाविष्ट करावयाच्या सर्व कुटुंबातील सदस्यांचे आधार कार्ड',
        },
        description: {
          en: '100% Aadhaar seeding is mandatory to prevent duplicate bogus ration allocations.',
          hi: 'सभी सदस्यों का आधार अनिवार्य है ताकि दोहरे राशन कार्ड रोके जा सकें।',
          mr: 'रेशन कार्डमधील प्रत्येक सदस्याचे आधार लिंकिंग (e-KYC) सक्तीचे आहे.',
        },
        whyNeeded: {
          en: 'Government biometrics mandate for ration allocation.',
          hi: 'सरकारी राशन वितरण में बायोमेट्रिक सत्यापन के लिए।',
          mr: 'रास्त भाव दुकानावर अंगठा लावून धान्य मिळण्यासाठी.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'rc_deletion_cert',
        title: {
          en: 'Surrender / Deletion Certificate from previous Ration Card (नाव वगळल्याचा दाखला)',
          hi: 'पुराने राशन कार्ड से नाम कटने का प्रमाण पत्र (Deletion Certificate)',
          mr: 'मागील रेशन कार्डमधून नाव वगळल्याचा दाखला (Deletion Certificate)',
        },
        description: {
          en: 'Mandatory for newly married daughter-in-law or individuals separating from parental family.',
          hi: 'विवाहित महिला या नए परिवार के लिए मायके या पुराने कार्ड से नाम कटना अनिवार्य।',
          mr: 'नवीन लग्न झालेल्या सुनेचे माहेरच्या रेशन कार्डमधून नाव वगळल्याचा अधिकृत दाखला.',
        },
        whyNeeded: {
          en: 'Strict criminal penalty under Essential Commodities Act for duplicate ration cards.',
          hi: 'दोहरा राशन कार्ड रखना आवश्यक वस्तु अधिनियम के तहत दंडनीय है।',
          mr: 'दोन ठिकाणी रेशन कार्डवर नाव असणे कायद्याने गुन्हा आहे.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'rc_lpg_declaration',
        title: {
          en: 'LPG Gas Connection Booklet (17-Digit Consumer ID or Non-Connection Affidavit)',
          hi: 'एलपीजी गैस कनेक्शन पासबुक या कनेक्शन न होने का शपथ पत्र',
          mr: 'घरगुती गॅस पासबुक (१७ अंकी ग्राहक क्रमांक) किंवा गॅस नसल्याचे प्रतिज्ञापत्र',
        },
        description: {
          en: 'Determines kerosene and subsidized fuel quota entitlement.',
          hi: 'केरोसिन या गैस सब्सिडी पात्रता तय करने के लिए।',
          mr: 'रॉकेल कोटा आणि सिलिंडर सबसिडी पडताळणीसाठी गॅस जोडणी क्रमांक लागतो.',
        },
        whyNeeded: {
          en: 'Cross-verified against national petroleum database.',
          hi: 'पेट्रोलियम मंत्रालय के डेटाबेस से मिलान के लिए।',
          mr: 'राष्ट्रीय पेट्रोलियम डेटाबेसशी पडताळणी केली जाते.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'rc_residence_proof',
        title: {
          en: 'Address Proof (Electricity Bill / Municipal Tax / Registered Rent Deed)',
          hi: 'निवास प्रमाण (बिजली बिल / मकान कर / पंजीकृत किरायानामा)',
          mr: 'रहिवासी पत्ता पुरावा (लाईट बिल / घरपट्टी पावती / भाडेकरार)',
        },
        description: {
          en: 'Proves residence in local fair price shop distribution area.',
          hi: 'स्थानीय उचित दर दुकान (राशन कोटेदार) के क्षेत्र में निवास की पुष्टि।',
          mr: 'स्थानिक रास्त भाव दुकानाच्या (Fair Price Shop) कार्यक्षेत्रातील वास्तव्याचा पुरावा.',
        },
        whyNeeded: {
          en: 'Assigns nearest ration shop for grain collection.',
          hi: 'नजदीकी राशन दुकान आबंटित करने हेतु।',
          mr: 'जवळचे स्वस्त धान्य दुकान निश्चित करण्यासाठी.',
        },
        category: 'address',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'rc_income_proof',
        title: {
          en: 'Income Proof / Talathi Report (For BPL / Antyodaya / Priority Card)',
          hi: 'आय प्रमाण पत्र / पटवारी रिपोर्ट (बीपीएल / अंत्योदय / प्राथमिकता कार्ड हेतु)',
          mr: 'उत्पन्नाचा दाखला किंवा तलाठी अहवाल (पिवळे/केशरी दारिद्र्यरेषेखालील कार्डसाठी)',
        },
        description: {
          en: 'Determines whether family is allotted Yellow (BPL/AAY), Saffron (APL Priority), or White (Above ₹1 Lakh) card.',
          hi: 'राशन कार्ड का रंग (पीला, केसरी, या सफेद) तय करने के लिए।',
          mr: 'कार्डचा रंग (पिवळे, केशरी किंवा पांढरे) आणि मोफत धान्याची पात्रता ठरवण्यासाठी.',
        },
        whyNeeded: {
          en: 'Mandatory for food grain subsidy qualification.',
          hi: 'सब्सिडी खाद्यान्न पात्रता हेतु आवश्यक।',
          mr: 'सरकारी धान्याची सवलत मिळवण्यासाठी उत्पन्नाचा दाखला आवश्यक असतो.',
        },
        category: 'income',
        requirementType: 'conditional',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'rc_family_photo',
        title: {
          en: 'Joint Family Photograph with Head of Household',
          hi: 'परिवार के मुखिया के साथ संयुक्त पारिवारिक फोटो',
          mr: 'कुटुंबप्रमुखासह सर्व सदस्यांचा एकत्रित पासपोर्ट साईज फोटो',
        },
        description: {
          en: 'Combined family photograph pasted on original physical booklet.',
          hi: 'भौतिक राशन पत्रिका पर चस्पा करने हेतु संयुक्त फोटो।',
          mr: 'रेशन कार्ड पुस्तिकेवर लावण्यासाठी सर्व सदस्यांचा एकत्रित फोटो.',
        },
        whyNeeded: {
          en: 'Physical inspection by supply inspector.',
          hi: 'राशन निरीक्षक द्वारा सत्यापन हेतु।',
          mr: 'पुरवठा निरीक्षकाकडून प्रत्यक्ष पडताळणीसाठी.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
    ],
    stages: [
      {
        id: 'rc_stage_1',
        stageNumber: 1,
        stageKey: 'purpose',
        title: {
          en: 'Understand Ration Card Types & Purpose',
          hi: 'राशन कार्ड के प्रकार एवं उद्देश्य समझें',
          mr: 'रेशन कार्डचे प्रकार आणि उद्देश समजून घ्या',
        },
        summary: {
          en: 'Ration card provides subsidized monthly food grains (rice, wheat) under Pradhan Mantri Garib Kalyan Anna Yojana and serves as recognized address and family proof.',
          hi: 'राशन कार्ड मासिक रियायती खाद्यान्न दिलाता है और एक महत्वपूर्ण पारिवारिक व निवास पहचान दस्तावेज है।',
          mr: 'रेशन कार्ड हे अन्न सुरक्षा योजनेअंतर्गत स्वस्त किंवा मोफत धान्य मिळवण्यासाठी आणि अधिकृत पत्ता व कुटुंब पुरावा म्हणून वापरले जाते.',
        },
        keyDetails: {
          en: [
            'Antyodaya (Yellow): Poorest families (₹15,000/yr) — 35 kg food grains.',
            'Priority Household (Saffron): Income up to ₹59,000 rural / ₹1 Lakh urban — 5 kg per person.',
            'APL White Card: Family income above ₹1 Lakh — non-subsidized civic identity document.',
          ],
          hi: [
            'अंत्योदय (पीला कार्ड): अत्यंत गरीब परिवार — ३५ किलो खाद्यान्न प्रतिमाह।',
            'प्राथमिकता (केसरी कार्ड): १ लाख तक आय — ५ किलो प्रति सदस्य प्रतिमाह।',
            'सफेद कार्ड: १ लाख से अधिक आय — बिना सब्सिडी वाला पहचान पत्र।',
          ],
          mr: [
            'पिवळे कार्ड (अंत्योदय / दारिद्र्यरेषेखालील): अत्यंत गरीब कुटुंबे — दरमहा ३५ किलो धान्य.',
            'केशरी कार्ड (प्राधान्य कुटुंब): उत्पन्न १ लाखांपर्यंत — प्रति सदस्य ५ किलो मोफत/सवलतीचे धान्य.',
            'पांढरे कार्ड: वार्षिक उत्पन्न १ लाखांपेक्षा जास्त असल्यास — केवळ ओळख व पत्ता पुरावा.',
          ],
        },
      },
      {
        id: 'rc_stage_2',
        stageNumber: 2,
        stageKey: 'jurisdiction',
        title: {
          en: 'Select Fair Price Shop & Jurisdiction',
          hi: 'उचित दर दुकान और तहसील का चयन',
          mr: 'रास्त भाव दुकान (Fair Price Shop) व तहसील कार्यक्षेत्र',
        },
        summary: {
          en: 'Assigned to your nearest village or ward fair price shop (ration dukan).',
          hi: 'आपके वार्ड या गांव की नजदीकी सरकारी राशन दुकान से संबद्ध किया जाता है।',
          mr: 'तुमच्या गावातील किंवा प्रभागातील जवळच्या अधिकृत स्वस्त धान्य दुकानाशी कार्ड जोडले जाते.',
        },
        keyDetails: {
          en: ['One Nation One Ration Card (ONORC) allows inter-state lifting once seeded with Aadhaar.'],
          hi: ['आधार सीडिंग के बाद वन नेशन वन राशन कार्ड से किसी भी दुकान से राशन ले सकते हैं।'],
          mr: ['आधार लिंक झाल्यावर वन नेशन वन रेशन कार्ड योजनेमुळे देशभरात कोठूनही धान्य घेता येते.'],
        },
      },
      {
        id: 'rc_stage_3',
        stageNumber: 3,
        stageKey: 'process',
        title: {
          en: 'Application Workflow on RCMS Portal',
          hi: 'आरसीएमएस पोर्टल पर आवेदन प्रक्रिया',
          mr: 'आरसीएमएस (RCMS) व तहसीलदार कार्यालयातील अर्ज प्रक्रिया',
        },
        summary: {
          en: 'Apply online at rcms.mahafood.gov.in or submit physical Form 1 / Form B at local Tahsil Food Supply Office.',
          hi: 'rcms.mahafood.gov.in पर ऑनलाइन या तहसील आपूर्ति शाखा में फॉर्म जमा करें।',
          mr: 'rcms.mahafood.gov.in वर ऑनलाइन किंवा तहसीलदार कार्यालयातील पुरवठा शाखेत नमुना-अ किंवा नमुना-ब अर्ज सादर करा.',
        },
        keyDetails: {
          en: [
            'Statutory timeline: 30 days.',
            'Requires spot verification by Food Supply Inspector.',
          ],
          hi: [
            'समय सीमा: ३० कार्य दिवस।',
            'खाद्य आपूर्ति निरीक्षक द्वारा सत्यापन किया जाता है।',
          ],
          mr: [
            'कालावधी: ३० दिवस.',
            'पुरवठा निरीक्षकाकडून प्रत्यक्ष जागेवर जाऊन खात्री केली जाते.',
          ],
        },
      },
      {
        id: 'rc_stage_4',
        stageNumber: 4,
        stageKey: 'eligibility',
        title: {
          en: 'Avoid Dual Registration (Deletion Proof)',
          hi: 'दोहरी प्रविष्टि से बचें (नाम कटने का प्रमाण)',
          mr: 'नाव वगळल्याचा दाखला (Deletion Certificate) खात्री',
        },
        summary: {
          en: 'No family member can be registered on two cards anywhere in India simultaneously.',
          hi: 'देश भर में किसी भी सदस्य का नाम दो राशन कार्डों में एक साथ नहीं हो सकता।',
          mr: 'कुटुंबातील कोणत्याही सदस्याचे नाव आधीच्या रेशन कार्डमध्ये शिल्लक असता कामा नये.',
        },
        keyDetails: {
          en: ['Get Deletion Certificate from previous Tahsil before applying for addition.'],
          hi: ['नाम जुड़वाने से पूर्व पिछली तहसील से डिलीशन सर्टिफिकेट प्राप्त करें।'],
          mr: ['नवीन नाव जोडण्यापूर्वी आधीच्या तालुक्यातून नाव वगळल्याचा दाखला अवश्य घ्या.'],
        },
      },
      {
        id: 'rc_stage_5',
        stageNumber: 5,
        stageKey: 'documents',
        title: {
          en: 'Check Documents for All Family Members',
          hi: 'सभी सदस्यों के दस्तावेजों की जांच',
          mr: 'सर्व सदस्यांच्या कागदपत्रांची पडताळणी',
        },
        summary: {
          en: 'Aadhaar for every single member, Deletion certificate for daughter-in-law, and LPG booklet.',
          hi: 'सभी सदस्यों के आधार कार्ड, नई बहू हेतु डिलीशन सर्टिफिकेट और गैस पासबुक।',
          mr: 'प्रत्येक सदस्याचे आधार कार्ड, सुनेचा नाव वगळल्याचा दाखला आणि घरगुती गॅस पासबुक.',
        },
        keyDetails: {
          en: ['Children under 5 require Birth Certificate + Father Aadhaar.'],
          hi: ['५ वर्ष से छोटे बच्चों के लिए जन्म प्रमाण पत्र और पिता का आधार लगेगा।'],
          mr: ['५ वर्षांखालील मुलांसाठी जन्म दाखला व वडिलांचे आधार कार्ड लागते.'],
        },
      },
      {
        id: 'rc_stage_6',
        stageNumber: 6,
        stageKey: 'form_fields',
        title: {
          en: 'Form Fields: Head of Family & Members',
          hi: 'फॉर्म विवरण: मुखिया एवं परिवार के सदस्य',
          mr: 'अर्जातील माहिती: कुटुंबप्रमुख महिला व सदस्य यादी',
        },
        summary: {
          en: 'Enter senior woman as head of household, followed by husband, sons, daughters-in-law, and children.',
          hi: 'वरिष्ठ महिला को मुखिया दर्ज करें और सभी सदस्यों का संबंध स्पष्ट लिखें।',
          mr: 'घरातील ज्येष्ठ महिलेचे नाव कुटुंबप्रमुख म्हणून नोंदवा, त्यानंतर इतर सदस्यांची माहिती भरा.',
        },
        keyDetails: {
          en: ['Accurately state family monthly income to assign appropriate card tier.'],
          hi: ['सही आय दर्ज करें ताकि उचित रंग का कार्ड जारी हो सके।'],
          mr: ['उत्पन्नाची खरी नोंद करा जेणेकरून योग्य कार्ड मिळेल.'],
        },
        questions: [
          {
            id: 'rc_q_head_name',
            label: 'Head of Family Name (Female)',
            category: 'applicant',
            required: true,
            simplifiedQuestion: {
              en: 'What is the full name of the senior female head of household as per Aadhaar?',
              hi: 'आधार के अनुसार परिवार की वरिष्ठ महिला मुखिया का पूरा नाम क्या है?',
              mr: 'आधार कार्डाप्रमाणे घरातील ज्येष्ठ महिला कुटुंबप्रमुखाचे पूर्ण नाव काय आहे?',
            },
            explanation: {
              en: 'National Food Security Act designates the oldest adult female as head of household.',
              hi: 'राष्ट्रीय खाद्य सुरक्षा कानून के तहत महिला मुखिया दर्ज होती है।',
              mr: 'अन्न सुरक्षा कायद्यानुसार घरातील ज्येष्ठ महिलेच्या नावे रेशन कार्ड निघते.',
            },
            exampleAnswer: {
              en: 'Parvatibai Tukaram Shinde [Fictional Example]',
              hi: 'पार्वती देवी [काल्पनिक उदाहरण]',
              mr: 'पार्वतीबाई तुकाराम शिंदे [काल्पनिक उदाहरण]',
            },
            cautionNote: {
              en: 'If no adult woman exists in family, senior male member can be head.',
              hi: 'यदि परिवार में बालिग महिला न हो तभी पुरुष मुखिया हो सकते हैं।',
              mr: 'कुटुंबात सज्ञान महिला नसल्यासच पुरुष कुटुंबप्रमुख होऊ शकतात.',
            },
            placeholder: {
              en: 'Full name of female head',
              hi: 'महिला मुखिया का पूरा नाम',
              mr: 'कुटुंबप्रमुख महिलेचे पूर्ण नाव',
            },
          },
          {
            id: 'rc_q_member_count',
            label: 'Total Family Members',
            category: 'family',
            required: true,
            simplifiedQuestion: {
              en: 'How many total members are to be included on this ration card?',
              hi: 'इस राशन कार्ड में कुल कितने सदस्यों के नाम जोड़े जाने हैं?',
              mr: 'या रेशन कार्डवर एकूण किती सदस्यांची नावे समाविष्ट करायची आहेत?',
            },
            explanation: {
              en: 'Count all adults and children whose Aadhaar cards are available.',
              hi: 'उन सभी सदस्यों की संख्या जिनकी आधार प्रतियां उपलब्ध हैं।',
              mr: 'ज्या सर्वांचे आधार कार्ड उपलब्ध आहे अशा सर्व सदस्यांची एकूण संख्या.',
            },
            exampleAnswer: {
              en: '5 members (Head, Husband, 2 Children, 1 Daughter-in-law) [Fictional Example]',
              hi: '5 सदस्य [काल्पनिक उदाहरण]',
              mr: '५ सदस्य (कुटुंबप्रमुख, पती, २ मुले, १ सून) [काल्पनिक उदाहरण]',
            },
            cautionNote: {
              en: 'Every member must be physically present for e-KYC biometric at least once.',
              hi: 'प्रत्येक सदस्य को एक बार ई-केवाईसी अंगूठा लगाना होगा।',
              mr: 'प्रत्येक सदस्याचे रास्त भाव दुकानावर e-KYC अंगठा प्रमाणीकरण होते.',
            },
            placeholder: {
              en: 'e.g. 4 or 5 members',
              hi: 'उदा. 4 सदस्य',
              mr: 'उदा. ५ सदस्य',
            },
          },
        ],
      },
      {
        id: 'rc_stage_7',
        stageNumber: 7,
        stageKey: 'review',
        title: {
          en: 'Review Member Listing & LPG Details',
          hi: 'सदस्य सूची और एलपीजी विवरण की समीक्षा',
          mr: 'सदस्य यादी व गॅस जोडणी तपशील पडताळणी',
        },
        summary: {
          en: 'Verify that names and ages match Aadhaar cards exactly.',
          hi: 'जांचें कि सभी नाम और उम्र आधार से मेल खाते हों।',
          mr: 'सर्व नावे व जन्मतारखा आधार कार्डाशी जुळल्याची खात्री करा.',
        },
        keyDetails: {
          en: ['Ensure deletion certificate is attached for any newly added family member.'],
          hi: ['नए जोड़े गए सदस्य का डिलीशन सर्टिफिकेट संलग्न अवश्य करें।'],
          mr: ['नवीन समाविष्ट केलेल्या सदस्याचा नाव वगळल्याचा दाखला सोबत जोडला असल्याची खात्री करा.'],
        },
      },
      {
        id: 'rc_stage_8',
        stageNumber: 8,
        stageKey: 'next_steps',
        title: {
          en: 'Submit Application to Tahsil Food Branch',
          hi: 'तहसील खाद्य शाखा में आवेदन जमा करें',
          mr: 'तहसीलदार कार्यालयातील पुरवठा शाखेत अर्ज जमा करा',
        },
        summary: {
          en: 'Submit online at rcms.mahafood.gov.in or deliver physical dossier with original photo to Tahsil Food Branch.',
          hi: 'ऑनलाइन आवेदन करें या तहसील आपूर्ति शाखा में फॉर्म जमा करें।',
          mr: 'rcms.mahafood.gov.in वर ऑनलाइन अर्ज करा किंवा तहसील कार्यालयातील पुरवठा शाखेत कागदपत्रे जमा करा.',
        },
        keyDetails: {
          en: ['Official Portal: https://rcms.mahafood.gov.in'],
          hi: ['पोर्टल: https://rcms.mahafood.gov.in'],
          mr: ['अधिकृत पोर्टल: https://rcms.mahafood.gov.in'],
        },
      },
    ],
    suggestedQuestions: {
      mr: [
        'नवीन रेशन कार्डसाठी कोणते कुटुंब पुरावे लागतात?',
        'रेशन कार्डमध्ये नवीन सदस्याचे (उदा. सून किंवा बाळ) नाव कसे जोडावे?',
        'माहेरच्या रेशन कार्डमधून नाव वगळल्याचा दाखला (Deletion Certificate) कसा मिळतो?',
        'पिवळे किंवा केशरी रेशन कार्ड मिळवण्यासाठी उत्पन्न किती असावे लागते?',
      ],
      hi: [
        'नए राशन कार्ड के लिए कौन-से दस्तावेज लगते हैं?',
        'राशन कार्ड में नए सदस्य (बहू या बच्चे) का नाम कैसे जोड़ें?',
        'पुराने राशन कार्ड से नाम कटवाने का प्रमाण पत्र (Deletion Certificate) कैसे मिलता है?',
        'पीला या केसरी राशन कार्ड पाने के लिए पारिवारिक आय की क्या सीमा है?',
      ],
      en: [
        'What documents are required for a new Ration Card?',
        'How do I add a new family member to the existing ration card?',
        'Where do I get the Deletion Certificate (नाव वगळल्याचा दाखला)?',
        'What is the income eligibility limit for BPL Yellow / Orange ration cards?',
      ],
    },
  },

  non_creamy_layer: {
    info: {
      id: 'non_creamy_layer',
      title: {
        en: 'Non-Creamy Layer Certificate (नॉन-क्रिमिलेअर दाखला)',
        hi: 'नॉन-क्रीमी लेयर प्रमाण पत्र (Non-Creamy Layer)',
        mr: 'नॉन-क्रिमिलेअर प्रमाणपत्र (उन्नत व प्रगत गट वगळता)',
      },
      shortDescription: {
        en: 'Mandatory for OBC, VJNT, and SBC candidates to claim reservation in state/central jobs, MPSC/UPSC, NEET/JEE admissions, and fee concessions.',
        hi: 'ओबीसी, वीजेएनटी और एसबीसी उम्मीदवारों के लिए कॉलेज प्रवेश और सरकारी नौकरियों में आरक्षण पाने हेतु अनिवार्य।',
        mr: 'OBC, VJNT आणि SBC उमेदवारांना शैक्षणिक प्रवेश, नोकरी आरक्षण आणि परीक्षा फी सवलतीसाठी मागील ३ वर्षांच्या उत्पन्नावर दिला जाणारा दाखला.',
      },
      department: {
        en: 'Revenue & Social Justice Department',
        hi: 'राजस्व एवं सामाजिक न्याय विभाग',
        mr: 'महसूल व सामाजिक न्याय विभाग (महाराष्ट्र शासन)',
      },
      standardIssuingAuthority: {
        en: 'Sub-Divisional Officer (SDO) / Tahsildar',
        hi: 'उपविभागीय अधिकारी (एसडीएम) / तहसीलदार',
        mr: 'उपविभागीय अधिकारी (SDO) / तहसीलदार',
      },
      typicalDeliveryDays: 21,
      officialFee: '₹ 33.60 (Aaple Sarkar / CSC fee)',
      validityDuration: {
        en: '3 Financial Years (Ending 31st March of 3rd Year)',
        hi: '३ वित्तीय वर्ष (३१ मार्च तक मान्य)',
        mr: '३ आर्थिक वर्षे (३१ मार्च रोजी मुदत संपते)',
      },
      officialPortalName: 'Aaple Sarkar / Mahaonline',
      officialPortalUrl: 'https://aaplesarkar.mahaonline.gov.in',
    },
    checklist: [
      {
        id: 'ncl_aadhaar',
        title: {
          en: 'Applicant Aadhaar Card',
          hi: 'आवेदक का आधार कार्ड',
          mr: 'अर्जदाराचे आधार कार्ड (चालू मोबाईल लिंक असलेले)',
        },
        description: {
          en: 'Primary identity verification.',
          hi: 'पहचान का प्राथमिक दस्तावेज।',
          mr: 'ओळख पडताळणीसाठी आधार कार्ड.',
        },
        whyNeeded: {
          en: 'Required for Aaple Sarkar citizen portal OTP.',
          hi: 'ओटीपी सत्यापन हेतु।',
          mr: 'ऑनलाइन अर्ज पडताळणीसाठी.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'ncl_caste_cert',
        title: {
          en: 'Original Caste Certificate of Applicant or Father',
          hi: 'आवेदक या पिता का मूल जाति प्रमाण पत्र',
          mr: 'अर्जदाराचा किंवा वडिलांचा मूळ जातीचा दाखला (Caste Certificate)',
        },
        description: {
          en: 'Must clearly state recognized OBC, VJNT, or SBC category.',
          hi: 'ओबीसी, वीजेएनटी या एसबीसी प्रवर्ग प्रमाणित करने हेतु।',
          mr: 'जात सिद्ध करणारा अधिकृत दाखला आवश्यक.',
        },
        whyNeeded: {
          en: 'Non-creamy layer can only be issued to valid backward category holders.',
          hi: 'आरक्षित वर्ग के बिना यह प्रमाण पत्र जारी नहीं होता।',
          mr: 'जातीचा दाखला असल्याशिवाय नॉन-क्रिमिलेअर निघत नाही.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'ncl_3yr_income',
        title: {
          en: 'Last 3 Consecutive Years Income Proof (Form 16 / ITR / Tahsildar Income Cert)',
          hi: 'पिछले ३ वर्षों का आय प्रमाण पत्र (तहसीलदार रिपोर्ट या आईटीआर)',
          mr: 'मागील सलग ३ वर्षांचा अधिकृत उत्पन्नाचा दाखला (किंवा फॉर्म १६ / ITR)',
        },
        description: {
          en: 'Gross annual income must be below ₹8 Lakhs for all 3 preceding financial years.',
          hi: 'पारिवारिक वार्षिक आय लगातार ३ वर्षों तक ₹८ लाख से कम होनी चाहिए।',
          mr: 'कुटुंबाचे वार्षिक उत्पन्न सलग ३ वर्षे ८ लाखांच्या मर्यादेत असल्याचे सिद्ध करणारा पुरावा.',
        },
        whyNeeded: {
          en: 'Statutory income ceiling prescribed by Government of India and State of Maharashtra.',
          hi: 'क्रीमी लेयर सीमा परीक्षण हेतु अनिवार्य।',
          mr: 'उन्नत व प्रगत गटात मोडत नसल्याची कायदेशीर अट.',
        },
        category: 'income',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'ncl_residence_proof',
        title: {
          en: 'Residence Proof (Electricity Bill / Ration Card)',
          hi: 'निवास प्रमाण (बिजली बिल / राशन कार्ड)',
          mr: 'रहिवासी पुरावा (लाईट बिल / रेशन कार्ड / अधिवास दाखला)',
        },
        description: {
          en: 'Confirms jurisdiction of issuing revenue circle.',
          hi: 'स्थानीय तहसील अधिकार क्षेत्र का प्रमाण।',
          mr: 'स्थानिक रहिवासी असल्याचे सिद्ध करण्यासाठी.',
        },
        whyNeeded: {
          en: 'Determines Tahsil and SDO jurisdiction.',
          hi: 'अधिकार क्षेत्र निर्धारण हेतु।',
          mr: 'तहसील कार्यक्षेत्र ठरवण्यासाठी.',
        },
        category: 'address',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'ncl_self_declaration',
        title: {
          en: 'Self-Declaration Form परिशिष्ट-क (Affidavit of Non-Creamy Layer)',
          hi: 'परिशिष्ट-क प्रारूप में स्व-घोषणा पत्र (शपथ पत्र)',
          mr: 'परिशिष्ट-क मधील विहित स्वयंघोषणापत्र (Self Declaration Affidavit)',
        },
        description: {
          en: 'Affidavit affirming that neither parent holds constitutional post or Class-I/II government post.',
          hi: 'संवैधानिक पद या प्रथम/द्वितीय श्रेणी पद न होने का शपथ पत्र।',
          mr: 'पालक घटनात्मक पदावर अथवा वर्ग-१/२ अधिकारी नसल्याचे अधिकृत प्रतिज्ञापत्र.',
        },
        whyNeeded: {
          en: 'Legal requirement under Supreme Court Indra Sawhney ruling.',
          hi: 'कानूनी घोषणा हेतु अनिवार्य।',
          mr: 'कायदेशीर हमीपत्र.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
    ],
    stages: [
      {
        id: 'ncl_st_1',
        stageNumber: 1,
        stageKey: 'purpose',
        title: {
          en: 'Understand Non-Creamy Layer Rules',
          hi: 'नॉन-क्रीमी लेयर नियम समझें',
          mr: 'नॉन-क्रिमिलेअर नियम व पात्रता समजून घ्या',
        },
        summary: {
          en: 'NCL certificate certifies that applicant does not belong to creamy layer (wealthy section) and is entitled to reservation.',
          hi: 'यह प्रमाण पत्र प्रमाणित करता है कि आप संपन्न वर्ग में नहीं आते और आरक्षण के पात्र हैं।',
          mr: 'हा दाखला सिद्ध करतो की तुमचे कुटुंब श्रीमंत (क्रीमी लेयर) वर्गात येत नाही आणि तुम्ही शैक्षणिक व नोकरी आरक्षणास पात्र आहात.',
        },
        keyDetails: {
          en: ['Valid for 3 years (upto March 31 of 3rd FY).', 'Gross annual income must be under ₹8 Lakh.'],
          hi: ['३ वित्तीय वर्षों तक मान्य।', 'वार्षिक आय ८ लाख से कम होनी चाहिए।'],
          mr: ['३ वर्षांसाठी वैध राहतो (तिसऱ्या वर्षाच्या ३१ मार्चपर्यंत).', 'वार्षिक उत्पन्न ८ लाखांपेक्षा कमी असणे आवश्यक.'],
        },
      },
      {
        id: 'ncl_st_2',
        stageNumber: 2,
        stageKey: 'documents',
        title: {
          en: 'Gather 3-Year Income & Caste Records',
          hi: '३ वर्ष की आय एवं जाति प्रमाण पत्र एकत्र करें',
          mr: 'मागील ३ वर्षांचे उत्पन्न व जातीचे पुरावे गोळा करा',
        },
        summary: {
          en: 'Obtain 3-year Tahsildar income certificate or IT returns, applicant caste certificate, and Aadhaar.',
          hi: 'तहसीलदार से ३ वर्ष का आय प्रमाण पत्र या आईटीआर तैयार रखें।',
          mr: 'तहसीलदारांकडून मागील ३ वर्षांचा उत्पन्नाचा दाखला किंवा नोकरीत असल्यास फॉर्म-१६/ITR प्रत तयार ठेवा.',
        },
        keyDetails: {
          en: ['Salary and agricultural income calculation rules apply as per state GR.'],
          hi: ['शासकीय नियमानुसार कृषि आय व वेतन की गणना की जाती है।'],
          mr: ['सरकारी नियमांनुसार शेती व वेतनावरील उत्पन्न तपासले जाते.'],
        },
      },
      {
        id: 'ncl_st_3',
        stageNumber: 3,
        stageKey: 'apply',
        title: {
          en: 'Submit on Aaple Sarkar or Setu Kendra',
          hi: 'आपले सरकार या सेतू केंद्र पर आवेदन करें',
          mr: 'आपले सरकार पोर्टल किंवा सेतू केंद्रावर अर्ज करा',
        },
        summary: {
          en: 'Apply under Revenue Department > Non-Creamy Layer Certificate service on Aaple Sarkar portal.',
          hi: 'आपले सरकार पोर्टल पर राजस्व विभाग में नॉन-क्रीमी लेयर सेवा चुनें।',
          mr: 'aaplesarkar.mahaonline.gov.in वर महसूल विभाग > नॉन-क्रिमिलेअर प्रमाणपत्र निवडून अर्ज दाखल करा.',
        },
        keyDetails: {
          en: ['Government processing fee is ₹33.60.', 'Delivery within 21 working days.'],
          hi: ['सरकारी शुल्क ₹३३.६० है।', '२१ कार्य दिवसों में डिजिटल हस्ताक्षर सहित जारी।'],
          mr: ['शासकीय शुल्क ₹ ३३.६० आहे.', '२१ दिवसांत तहसीलदारांच्या डिजिटल स्वाक्षरीने दाखला मिळतो.'],
        },
      },
    ],
    suggestedQuestions: {
      mr: [
        'नॉन-क्रिमिलेअर काढण्यासाठी मागील किती वर्षांचे उत्पन्न दाखवावे लागते?',
        'नॉन-क्रिमिलेअरची मुदत किती वर्षांची असते?',
        '८ लाख उत्पन्नाची मर्यादा कोणासाठी लागू आहे?',
        'वडिलांच्या उत्पन्नाचा दाखला लागतो की स्वतःचा?',
      ],
      hi: [
        'नॉन-क्रीमी लेयर के लिए कितने वर्ष की आय दिखानी होती है?',
        'इस प्रमाण पत्र की वैधता कितने समय की होती है?',
        '८ लाख की आय सीमा की गणना कैसे होती है?',
        'पिता का आय प्रमाण पत्र लगेगा या स्वयं का?',
      ],
      en: [
        'How many years of income proof are required for NCL?',
        'What is the validity period of a Non-Creamy Layer certificate?',
        'What is the ₹8 Lakh income threshold rule?',
        'Is father’s income counted or student’s own income?',
      ],
    },
  },

  ews_cert: {
    info: {
      id: 'ews_cert',
      title: {
        en: 'Economically Weaker Section (EWS) Certificate',
        hi: 'आर्थिक रूप से कमजोर वर्ग (EWS) प्रमाण पत्र',
        mr: 'आर्थिक दुर्बल घटक (EWS) प्रमाणपत्र (१०% आरक्षण)',
      },
      shortDescription: {
        en: 'Provides 10% reservation in central and state educational admissions and government recruitment for general category candidates with family income under ₹8 Lakh.',
        hi: 'सामान्य वर्ग के उन उम्मीदवारों के लिए १०% आरक्षण हेतु प्रमाण पत्र जिनकी पारिवारिक आय ₹८ लाख से कम है।',
        mr: 'खुला प्रवर्ग (General Category) मधील ज्या कुटुंबांचे वार्षिक उत्पन्न ८ लाखांपेक्षा कमी आहे अशांसाठी १०% आरक्षणाचा अधिकृत दाखला.',
      },
      department: {
        en: 'Revenue Department',
        hi: 'राजस्व विभाग',
        mr: 'महसूल व वन विभाग (महाराष्ट्र शासन)',
      },
      standardIssuingAuthority: {
        en: 'Tahsildar / Sub-Divisional Officer (SDO)',
        hi: 'तहसीलदार / उप-विभागीय अधिकारी',
        mr: 'तहसीलदार / उपविभागीय अधिकारी (SDO)',
      },
      typicalDeliveryDays: 15,
      officialFee: '₹ 33.60',
      validityDuration: {
        en: '1 Financial Year (Valid till 31st March)',
        hi: '१ वित्तीय वर्ष (३१ मार्च तक मान्य)',
        mr: '१ आर्थिक वर्ष (प्रत्येक वर्षी ३१ मार्चला नूतनीकरण आवश्यक)',
      },
      officialPortalName: 'Aaple Sarkar / Mahaonline',
      officialPortalUrl: 'https://aaplesarkar.mahaonline.gov.in',
    },
    checklist: [
      {
        id: 'ews_aadhaar',
        title: {
          en: 'Aadhaar Card of Applicant and Parents',
          hi: 'आवेदक एवं माता-पिता का आधार कार्ड',
          mr: 'अर्जदार आणि आई-वडिलांचे आधार कार्ड',
        },
        description: {
          en: 'Establishes identity of applicant and family unit.',
          hi: 'पारिवारिक इकाई की पहचान हेतु।',
          mr: 'ओळख सिद्ध करण्यासाठी.',
        },
        whyNeeded: {
          en: 'Mandatory e-governance identifier.',
          hi: 'ओटीपी सत्यापन के लिए।',
          mr: 'ऑनलाइन अर्जासाठी अनिवार्य.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'ews_income_cert',
        title: {
          en: 'Current Financial Year Income Certificate (Under ₹8 Lakh)',
          hi: 'सक्षम अधिकारी द्वारा जारी वार्षिक आय प्रमाण पत्र (८ लाख से कम)',
          mr: 'तहसीलदारांचा चालू वर्षाचा कौटुंबिक उत्पन्नाचा दाखला (८ लाखांच्या आत)',
        },
        description: {
          en: 'Gross annual family income from all sources must be strictly below ₹8,00,000.',
          hi: 'परिवार की सभी स्रोतों से कुल वार्षिक आय ८ लाख से कम होनी चाहिए।',
          mr: 'शेती, पगार, व्यवसाय अशा सर्व मार्गांतून मिळणारे वार्षिक उत्पन्न ८ लाखांपेक्षा कमी असणे बंधनकारक.',
        },
        whyNeeded: {
          en: 'Basic constitutional criterion for 10% EWS quota eligibility.',
          hi: 'ईडब्ल्यूएस पात्रता का मुख्य आधार।',
          mr: 'EWS आरक्षणाची मूलभूत पात्रता.',
        },
        category: 'income',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'ews_property_proof',
        title: {
          en: 'Property & Agricultural Land Proof (7/12 Extract / Municipal Tax)',
          hi: 'कृषि भूमि एवं आवासीय संपत्ति प्रमाण (७/१२ खतौनी / मकान कर)',
          mr: 'शेतजमीन ७/१२ उतारा किंवा शहरी घराची घरपट्टी पावती',
        },
        description: {
          en: 'Verifies property ceiling: Agricultural land less than 5 acres, residential flat under 1000 sq ft.',
          hi: '५ एकड़ से कम कृषि भूमि और १००० वर्ग फीट से कम आवास की शर्त जांच हेतु।',
          mr: '५ एकरांपेक्षा जास्त शेती किंवा १००० चौरस फुटांपेक्षा मोठा फ्लॅट नसल्याची खात्री.',
        },
        whyNeeded: {
          en: 'Asset ceiling check prescribed in Central/State EWS guidelines.',
          hi: 'संपत्ति सीमा परीक्षण हेतु।',
          mr: 'मालमत्ता मर्यादा तपासणीसाठी.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'ews_caste_lc',
        title: {
          en: 'School LC Proving General (Non-Reserved) Category',
          hi: 'स्कूल टीसी (सामान्य/अनारक्षित वर्ग सिद्ध करने हेतु)',
          mr: 'शाळा सोडल्याचा दाखला (अर्जदार SC, ST किंवा OBC नसल्याचा पुरावा)',
        },
        description: {
          en: 'EWS is strictly meant for persons not covered under SC, ST, or OBC reservation.',
          hi: 'ईडब्ल्यूएस केवल उन नागरिकों के लिए है जो एससी, एसटी, या ओबीसी में नहीं आते।',
          mr: 'अर्जदार SC, ST किंवा OBC आरक्षणात मोडत नसल्याचा पुरावा.',
        },
        whyNeeded: {
          en: 'Candidates already availing SC/ST/OBC quota cannot apply for EWS.',
          hi: 'दोहरा आरक्षण रोकने के लिए।',
          mr: 'दुहेरी आरक्षण टाळण्यासाठी.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
    ],
    stages: [
      {
        id: 'ews_st_1',
        stageNumber: 1,
        stageKey: 'criteria',
        title: {
          en: 'Understand 10% EWS Eligibility Criteria',
          hi: 'ईडब्ल्यूएस पात्रता एवं नियम समझें',
          mr: 'EWS आरक्षण निकष व पात्रता समजून घ्या',
        },
        summary: {
          en: 'EWS quota is exclusively for general category citizens whose family income is below ₹8 Lakh.',
          hi: 'ईडब्ल्यूएस आरक्षण केवल सामान्य वर्ग के नागरिकों के लिए है जिनकी आय ८ लाख से कम है।',
          mr: 'EWS १०% आरक्षण केवळ खुल्या प्रवर्गातील गरीब कुटुंबांसाठी आहे. SC/ST/OBC प्रवर्गातील व्यक्ती यासाठी पात्र नसतात.',
        },
        keyDetails: {
          en: ['Family income < ₹8,00,000.', 'Agriculture land < 5 acres.', 'Residential flat < 1000 sq ft.'],
          hi: ['पारिवारिक आय < ८ लाख।', 'कृषि भूमि ५ एकड़ से कम।', 'आवासीय फ्लैट १००० वर्ग फीट से कम।'],
          mr: ['एकूण कौटुंबिक उत्पन्न ८ लाखांपेक्षा कमी.', 'शेतजमीन ५ एकरांपेक्षा कमी.', 'शहरी निवासी फ्लॅट १००० चौ.फू. पेक्षा कमी.'],
        },
      },
      {
        id: 'ews_st_2',
        stageNumber: 2,
        stageKey: 'portal_apply',
        title: {
          en: 'Apply on Aaple Sarkar or District Tahsil',
          hi: 'आपले सरकार पोर्टल पर ऑनलाइन आवेदन करें',
          mr: 'आपले सरकार पोर्टलवर ऑनलाइन अर्ज दाखल करा',
        },
        summary: {
          en: 'Login to aaplesarkar.mahaonline.gov.in > Revenue Department > Economically Weaker Section Certificate.',
          hi: 'आपले सरकार पोर्टल पर ईडब्ल्यूएस प्रमाण पत्र सेवा चुनें।',
          mr: 'aaplesarkar.mahaonline.gov.in वर महसूल विभागांतर्गत ईडब्ल्यूएस प्रमाणपत्र अर्ज दाखल करा.',
        },
        keyDetails: {
          en: ['Delivery within 15 working days.', 'Official fee ₹33.60.'],
          hi: ['१५ कार्य दिवसों में जारी।', 'शुल्क ₹३३.६०।'],
          mr: ['१५ दिवसांत दाखला मिळतो.', 'शासकीय शुल्क ₹ ३३.६० आहे.'],
        },
      },
    ],
    suggestedQuestions: {
      mr: [
        'EWS दाखला कोणाला मिळतो? OBC व्यक्ती EWS काढू शकते का?',
        'EWS दाखल्याची मुदत किती असते?',
        'EWS साठी उत्पन्नाची मर्यादा किती आहे?',
        'EWS दाखला NEET आणि MPSC साठी चालतो का?',
      ],
      hi: [
        'ईडब्ल्यूएस प्रमाण पत्र किसे मिलता है? क्या ओबीसी व्यक्ति इसे बनवा सकता है?',
        'ईडब्ल्यूएस की वैधता कितने समय की होती है?',
        'ईडब्ल्यूएस के लिए संपत्ति की क्या शर्तें हैं?',
        'क्या यह नीट और सरकारी नौकरियों में मान्य है?',
      ],
      en: [
        'Who is eligible for EWS? Can OBC candidates apply for EWS?',
        'What is the validity period of EWS certificate?',
        'What are the property and land ceilings for EWS?',
        'Is EWS valid for Central NEET admissions and UPSC jobs?',
      ],
    },
  },

  senior_citizen_cert: {
    info: {
      id: 'senior_citizen_cert',
      title: {
        en: 'Senior Citizen Identity Card & Certificate (वय ६०+)',
        hi: 'वरिष्ठ नागरिक पहचान पत्र (Senior Citizen Card)',
        mr: 'ज्येष्ठ नागरिक ओळखपत्र व प्रमाणपत्र (वय ६० वर्षे पूर्ण)',
      },
      shortDescription: {
        en: 'Official identity card for citizens aged 60 and above for MSRTC ST bus 50%-100% fare concessions, railway concessions, hospital fast-track, and old age pension schemes.',
        hi: '६० वर्ष और अधिक उम्र के नागरिकों के लिए बस छूट, रेलवे वरीयता और सरकारी योजनाओं हेतु आधिकारिक पहचान पत्र।',
        mr: '६० वर्षे पूर्ण झालेल्या नागरिकांसाठी एसटी बस मोफत/५०% सवलत, रुग्णालय सेवा, श्रावणबाळ योजना आणि ज्येष्ठ नागरिक ओळखपत्रासाठी.',
      },
      department: {
        en: 'Social Justice & Special Assistance Department',
        hi: 'सामाजिक न्याय विभाग',
        mr: 'सामाजिक न्याय विभाग व जिल्हा समाजकल्याण अधिकारी कार्यालय',
      },
      standardIssuingAuthority: {
        en: 'Tahsildar / District Social Welfare Officer',
        hi: 'तहसीलदार / जिला समाज कल्याण अधिकारी',
        mr: 'तहसीलदार / जिल्हा समाजकल्याण अधिकारी',
      },
      typicalDeliveryDays: 10,
      officialFee: 'Free / ₹ 33.60 (Online service charges)',
      validityDuration: {
        en: 'Lifetime Validity',
        hi: 'आजीवन मान्य',
        mr: 'आयुष्यभरासाठी वैध',
      },
      officialPortalName: 'Aaple Sarkar / Mahaonline',
      officialPortalUrl: 'https://aaplesarkar.mahaonline.gov.in',
    },
    checklist: [
      {
        id: 'sc_age_proof',
        title: {
          en: 'Age Proof Showing 60+ Years (Aadhaar / School LC / Birth Cert / Voter ID)',
          hi: 'आयु प्रमाण पत्र (आधार कार्ड, स्कूल टीसी या जन्म प्रमाण पत्र)',
          mr: 'वय ६० वर्षे पूर्ण असल्याचे सिद्ध करणारा पुरावा (आधार कार्ड / शाळा दाखला / मतदान कार्ड)',
        },
        description: {
          en: 'Must show date of birth clearly confirming completed age of 60 years.',
          hi: 'जिसमें जन्म तिथि स्पष्ट रूप से ६० वर्ष की पुष्टि करे।',
          mr: 'जन्मतारीख स्पष्ट नोंद असणारा अधिकृत पुरावा.',
        },
        whyNeeded: {
          en: 'Primary eligibility criterion under Senior Citizen Act.',
          hi: 'आयु सत्यापन हेतु अनिवार्य।',
          mr: '६० वर्षे वयाची कायदेशीर पडताळणी.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'sc_residence_proof',
        title: {
          en: 'Residence Proof (Ration Card / Electricity Bill)',
          hi: 'निवास प्रमाण (राशन कार्ड या बिजली बिल)',
          mr: 'रहिवासी पत्ता पुरावा (रेशन कार्ड / लाईट बिल)',
        },
        description: {
          en: 'Confirms local residence in the district.',
          hi: 'जिले में स्थायी निवास की पुष्टि हेतु।',
          mr: 'स्थानिक रहिवासी असल्याचा पुरावा.',
        },
        whyNeeded: {
          en: 'Ensures local district administration jurisdiction.',
          hi: 'तहसील कार्यक्षेत्र तय करने के लिए।',
          mr: 'जिल्हा कार्यक्षेत्र निश्चित करण्यासाठी.',
        },
        category: 'address',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'sc_medical_fitness',
        title: {
          en: 'Doctor Blood Group & Medical Certificate (Optional / Recommended)',
          hi: 'रक्त समूह (ब्लड ग्रुप) एवं स्वास्थ्य प्रमाण पत्र',
          mr: 'ब्लड ग्रुप (रक्तगट) दाखला व वैद्यकीय प्रमाणपत्र (पर्यायी)',
        },
        description: {
          en: 'Blood group is printed on senior citizen card for emergency medical response.',
          hi: 'आपातकालीन चिकित्सा सहायता हेतु कार्ड पर रक्त समूह मुद्रित किया जाता है।',
          mr: 'आपत्कालीन प्रसंगी मदतीसाठी ओळखपत्रावर रक्तगट छापला जातो.',
        },
        whyNeeded: {
          en: 'Emergency medical care.',
          hi: 'आपातकालीन सहायता हेतु।',
          mr: 'तातडीच्या उपचारासाठी उपयोगी.',
        },
        category: 'proof',
        requirementType: 'conditional',
        isOfficiallyVerified: true,
        checked: false,
      },
    ],
    stages: [
      {
        id: 'sc_st_1',
        stageNumber: 1,
        stageKey: 'benefits',
        title: {
          en: 'Senior Citizen Privileges & Schemes',
          hi: 'वरिष्ठ नागरिक लाभ और योजनाएं समझें',
          mr: 'ज्येष्ठ नागरिक सवलती व योजनांची माहिती',
        },
        summary: {
          en: 'Entitles to 50% discount in MSRTC buses (100% free for 75+ अमृत ज्येष्ठ नागरिक), bank higher interest, and pension schemes.',
          hi: 'महाराष्ट्र में एसटी बसों में ५०% से १००% छूट, अस्पतालों में प्राथमिकता और पेंशन हेतु।',
          mr: 'एसटी बस प्रवासात ५०% ते १००% सवलत (७५ वर्षांवरील नागरिकांना मोफत एसटी प्रवास), सरकारी रुग्णालयात प्राधान्य आणि श्रावणबाळ निवृत्तीवेतन योजना.',
        },
        keyDetails: {
          en: ['Age 60 to 74: 50% concession in state transport.', 'Age 75+: 100% free travel in Maharashtra ST.'],
          hi: ['६० से ७४ वर्ष: एसटी बस में ५०% छूट।', '७५+ वर्ष: पूर्णतः निशुल्क एसटी यात्रा।'],
          mr: ['६० ते ७४ वर्षे: एसटी बसमध्ये ५०% सवलत.', '७५ वर्षांपुढील नागरिकांना मोफत एसटी प्रवास (अमृत ज्येष्ठ नागरिक योजना).'],
        },
      },
      {
        id: 'sc_st_2',
        stageNumber: 2,
        stageKey: 'apply',
        title: {
          en: 'Apply Online on Aaple Sarkar or Tahsil Office',
          hi: 'आपले सरकार या तहसील कार्यालय में आवेदन',
          mr: 'आपले सरकार पोर्टल किंवा तहसील सेतू केंद्रात अर्ज करा',
        },
        summary: {
          en: 'Submit Aadhaar, 2 passport photos, and address proof online or at local Tahsil Setu Kendra.',
          hi: 'आधार, २ फोटो और निवास प्रमाण के साथ आवेदन करें।',
          mr: 'आधार कार्ड, २ पासपोर्ट फोटो आणि पत्त्याच्या पुराव्यासह १० दिवसांत ओळखपत्र प्राप्त करा.',
        },
        keyDetails: {
          en: ['Delivery within 10 days.', 'Official fee ₹33.60.'],
          hi: ['१० दिनों में जारी।'],
          mr: ['१० दिवसांत ओळखपत्र मिळते.'],
        },
      },
    ],
    suggestedQuestions: {
      mr: [
        'ज्येष्ठ नागरिक ओळखपत्रासाठी किमान वय किती लागते?',
        '७५ वर्षांवरील नागरिकांना एसटी बस प्रवास मोफत कसा मिळतो?',
        'श्रावणबाळ पेन्शन योजनेसाठी ज्येष्ठ नागरिक कार्ड लागते का?',
      ],
      hi: [
        'सीनियर सिटीजन कार्ड के लिए न्यूनतम उम्र क्या है?',
        'महाराष्ट्र में बुजुर्गों को बस छूट कैसे मिलती है?',
        'पेंशन योजना के लिए कौन-से दस्तावेज लगते हैं?',
      ],
      en: [
        'What is the minimum age to apply for Senior Citizen Card?',
        'How do seniors get free travel in MSRTC buses in Maharashtra?',
        'Can this card be used for Old Age Pension (Shravanbal Yojana)?',
      ],
    },
  },

  disability_cert: {
    info: {
      id: 'disability_cert',
      title: {
        en: 'Disability Certificate & UDID Card (दिव्यांगत्व प्रमाणपत्र / UDID)',
        hi: 'दिव्यांगता प्रमाण पत्र एवं यूडीआईडी कार्ड',
        mr: 'दिव्यांगत्व प्रमाणपत्र व स्वावलंबन (UDID) कार्ड',
      },
      shortDescription: {
        en: 'Universal ID for Persons with Disabilities (UDID) issued by District Civil Surgeon / Medical Board for reservations, pension, motorized tricycle, and bus/train rail concessions.',
        hi: 'जिला सिविल सर्जन द्वारा जारी दिव्यांगता प्रमाण पत्र एवं स्वावलंबन कार्ड।',
        mr: 'जिल्हा शल्यचिकित्सक (सिव्हिल सर्जन) यांच्या वैद्यकीय मंडळाकडून जारी केलेले दिव्यांग प्रमाणपत्र व युडीआयडी कार्ड.',
      },
      department: {
        en: 'Department of Empowerment of Persons with Disabilities (DEPwD)',
        hi: 'दिव्यांगजन सशक्तिकरण विभाग',
        mr: 'दिव्यांग कल्याण विभाग, महाराष्ट्र शासन व केंद्र सरकार',
      },
      standardIssuingAuthority: {
        en: 'Civil Surgeon / Medical Board (District Hospital)',
        hi: 'सिविल सर्जन / मेडिकल बोर्ड (जिला अस्पताल)',
        mr: 'जिल्हा शल्यचिकित्सक (सिव्हिल सर्जन) / वैद्यकीय मंडळ',
      },
      typicalDeliveryDays: 30,
      officialFee: 'Free of Cost (शासकीय शुल्क नाही)',
      validityDuration: {
        en: 'Permanent (for permanent conditions) or 5 Years (temporary review)',
        hi: 'स्थायी या ५ वर्ष (पुनर्परीक्षण हेतु)',
        mr: 'कायमस्वरूपी (Permanent) किंवा ५ वर्षे (तात्पुरते)',
      },
      officialPortalName: 'Unique Disability ID (UDID) Portal',
      officialPortalUrl: 'https://swavlambancard.gov.in',
    },
    checklist: [
      {
        id: 'dis_aadhaar',
        title: {
          en: 'Aadhaar Card of Person with Disability',
          hi: 'दिव्यांग व्यक्ति का आधार कार्ड',
          mr: 'दिव्यांग व्यक्तीचे आधार कार्ड',
        },
        description: {
          en: 'Mandatory identity proof for UDID national register.',
          hi: 'राष्ट्रीय रजिस्टर में पहचान हेतु।',
          mr: 'ओळख पडताळणीसाठी.',
        },
        whyNeeded: {
          en: 'National biometric verification.',
          hi: 'सत्यापन के लिए।',
          mr: 'राष्ट्रीय स्वावलंबन नोंदणीसाठी.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'dis_hospital_records',
        title: {
          en: 'Previous Hospital Treatment Records & Doctor Reports',
          hi: 'अस्पताल के पुराने उपचार पर्चे एवं डॉक्टर रिपोर्ट',
          mr: 'रुग्णालयातील जुने उपचारांचे कागदपत्रे व तज्ज्ञ डॉक्टरांचा अहवाल',
        },
        description: {
          en: 'Surgical notes, X-ray, audiometry, or clinical evaluation records.',
          hi: 'एक्स-रे, ऑडियोमेट्री या विशेषज्ञ जांच रिपोर्ट।',
          mr: 'एक्स-रे, ऐकण्याच्या क्षमतेचा अहवाल किंवा वैद्यकीय तपासणी कागदपत्रे.',
        },
        whyNeeded: {
          en: 'Assists Medical Board during assessment.',
          hi: 'मेडिकल बोर्ड द्वारा जांच के समय आवश्यक।',
          mr: 'वैद्यकीय मंडळाला टक्केवारी ठरवण्यासाठी उपयुक्त.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'dis_full_photo',
        title: {
          en: 'Photograph Showing Disability / Posture Clearly',
          hi: 'दिव्यांगता स्पष्ट दर्शाने वाला फोटो',
          mr: 'दिव्यांगत्व स्पष्ट दिसेल असा संपूर्ण फोटो (पासपोर्ट साईजसह)',
        },
        description: {
          en: 'Required by government guidelines for UDID physical identity validation.',
          hi: 'यूडीआईडी कार्ड पर प्रिंट हेतु।',
          mr: 'स्वावलंबन कार्डवर छापण्यासाठी.',
        },
        whyNeeded: {
          en: 'Medical Board rule.',
          hi: 'कार्ड पर मुद्रण हेतु।',
          mr: 'शासकीय ओळख पडताळणीसाठी.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
    ],
    stages: [
      {
        id: 'dis_st_1',
        stageNumber: 1,
        stageKey: 'udid_apply',
        title: {
          en: 'Register on Swavlamban Portal (UDID)',
          hi: 'स्वावलंबन पोर्टल पर ऑनलाइन पंजीकरण',
          mr: 'swavlambancard.gov.in वर ऑनलाइन नोंदणी',
        },
        summary: {
          en: 'Fill online application on central portal swavlambancard.gov.in and select your District Civil Hospital.',
          hi: 'swavlambancard.gov.in पर फॉर्म भरें और अपने जिले का अस्पताल चुनें।',
          mr: 'swavlambancard.gov.in पोर्टलवर ऑनलाइन अर्ज भरून जिल्हा रुग्णालय (सिव्हिल हॉस्पिटल) निवडा.',
        },
        keyDetails: {
          en: ['System generates an Application Enrollment Number.', 'Completely free service.'],
          hi: ['आवेदन क्रमांक प्राप्त होगा।', 'पूर्णतः निशुल्क।'],
          mr: ['नोंदणी क्रमांक प्राप्त होतो.', 'कोणतेही शुल्क नाही.'],
        },
      },
      {
        id: 'dis_st_2',
        stageNumber: 2,
        stageKey: 'assessment',
        title: {
          en: 'Visit District Hospital for Medical Board Assessment',
          hi: 'जिला अस्पताल में मेडिकल बोर्ड के समक्ष उपस्थित हों',
          mr: 'जिल्हा रुग्णालयात वैद्यकीय मंडळासमोर प्रत्यक्ष तपासणी',
        },
        summary: {
          en: 'Appear on the designated day at Civil Hospital for specialist evaluation to determine disability percentage.',
          hi: 'अस्पताल जाकर विशेषज्ञ डॉक्टरों से दिव्यांगता प्रतिशत का निर्धारण कराएं।',
          mr: 'जिल्हा रुग्णालयात जाऊन डॉक्टरांच्या मंडळाकडून दिव्यांगत्वाची टक्केवारी (४०% किंवा त्याहून अधिक) निश्चित करून घ्या.',
        },
        keyDetails: {
          en: ['40% and above disability qualifies for all government concessions and Sanjay Gandhi Niradhar pension.'],
          hi: ['४०% या अधिक होने पर सभी सरकारी सुविधाएं व पेंशन मान्य होती हैं।'],
          mr: ['४०% पेक्षा जास्त दिव्यांगत्व असल्यास सर्व शासकीय सवलती व पेन्शन मिळते.'],
        },
      },
    ],
    suggestedQuestions: {
      mr: [
        'UDID कार्डसाठी ऑनलाइन अर्ज कुठे करावा?',
        'सरकारी योजनांसाठी दिव्यांगत्वाची किती टक्केवारी लागते?',
        'संजय गांधी निराधार योजना किंवा दिव्यांग पेन्शन कशी मिळते?',
      ],
      hi: [
        'यूडीआईडी कार्ड कैसे बनता है?',
        'सरकारी योजनाओं के लिए न्यूनतम कितनी दिव्यांगता प्रतिशत चाहिए?',
        'दिव्यांग पेंशन के लिए कैसे आवेदन करें?',
      ],
      en: [
        'How to apply online for a UDID Disability Card?',
        'What is the minimum disability percentage for government benefits?',
        'How to get Sanjay Gandhi Niradhar monthly pension for disabled citizens?',
      ],
    },
  },

  character_cert: {
    info: {
      id: 'character_cert',
      title: {
        en: 'Character & Police Clearance Certificate (PCC)',
        hi: 'चारित्र्य प्रमाण पत्र / पुलिस सत्यापन (PCC)',
        mr: 'चारित्र्य पडताळणी दाखला / पोलीस क्लिअरन्स (PCC)',
      },
      shortDescription: {
        en: 'Issued by District Superintendent of Police (SP) / Police Commissioner confirming no criminal records; required for government jobs, school teaching, defense recruitment, and transport licenses.',
        hi: 'सरकारी नौकरी, सुरक्षा और लाइसेंस हेतु पुलिस अधीक्षक/आयुक्त द्वारा जारी अनापत्ति प्रमाण पत्र।',
        mr: 'शासकीय नोकरी, पोलीस भरती, शिक्षक भरती व परवाना कामासाठी पोलीस अधीक्षक / आयुक्त कार्यालयाकडून दिला जाणारा चारित्र्य दाखला.',
      },
      department: {
        en: 'Home Department / Maharashtra Police',
        hi: 'गृह विभाग / महाराष्ट्र पुलिस',
        mr: 'गृह विभाग, महाराष्ट्र पोलीस',
      },
      standardIssuingAuthority: {
        en: 'Superintendent of Police (SP) / Commissioner of Police',
        hi: 'पुलिस अधीक्षक (एसपी) / पुलिस कमिश्नर',
        mr: 'पोलीस अधीक्षक (SP) / पोलीस आयुक्त',
      },
      typicalDeliveryDays: 21,
      officialFee: '₹ 123.60 (Online verification charges)',
      validityDuration: {
        en: '6 Months to 1 Year',
        hi: '६ माह से १ वर्ष',
        mr: '६ महिने ते १ वर्ष',
      },
      officialPortalName: 'Maharashtra Police Citizen Portal (pcs.mahaonline.gov.in)',
      officialPortalUrl: 'https://pcs.mahaonline.gov.in',
    },
    checklist: [
      {
        id: 'pcc_aadhaar',
        title: {
          en: 'Aadhaar Card (Linked to Mobile Number)',
          hi: 'आधार कार्ड (सक्रिय मोबाइल नंबर सहित)',
          mr: 'अर्जदाराचे आधार कार्ड',
        },
        description: {
          en: 'Primary biometric identity record.',
          hi: 'ओटीपी सत्यापन के लिए।',
          mr: 'ओळख पडताळणीसाठी आधार.',
        },
        whyNeeded: {
          en: 'Identity verification.',
          hi: 'पहचान सत्यापन।',
          mr: 'ऑनलाइन अर्जासाठी.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'pcc_residence_proof',
        title: {
          en: 'Local Residence Proof of Current Police Station Area',
          hi: 'स्थानीय पुलिस थाना क्षेत्र का निवास प्रमाण (लाईट बिल / राशन कार्ड)',
          mr: 'सध्याच्या पोलीस स्टेशन हद्दीतील वास्तव्याचा पुरावा (लाईट बिल / रेशन कार्ड)',
        },
        description: {
          en: 'Must establish minimum 1 year residence within the local police station limits.',
          hi: 'संबंधित थाने के क्षेत्र में कम से कम १ वर्ष का निवास सिद्ध होना चाहिए।',
          mr: 'संबंधित पोलीस ठाण्याच्या कार्यक्षेत्रात किमान १ वर्ष वास्तव्याचा पुरावा.',
        },
        whyNeeded: {
          en: 'Local police inquiry happens at this address.',
          hi: 'स्थानीय पुलिस जांच हेतु आवश्यक।',
          mr: 'पोलीस प्रत्यक्ष घरी येऊन चौकशी करतात.',
        },
        category: 'address',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'pcc_reputable_referees',
        title: {
          en: 'Names, Mobile Numbers & Aadhaar of Two Local Responsible Referees',
          hi: 'क्षेत्र के दो सम्मानित नागरिकों के नाम, पते व फोन नंबर',
          mr: 'परिसरातील दोन प्रतिष्ठित व्यक्तींची नावे, पत्ते व मोबाईल क्रमांक (जमीनदार/सरपंच/शिक्षक)',
        },
        description: {
          en: 'Local police visit or call these two referees to vouch for applicant’s conduct.',
          hi: 'पुलिस इन दोनों से आपके आचरण के संबंध में पूछताछ करती है।',
          mr: 'पोलीस या दोन साक्षीदारांची स्वाक्षरी व जबाब घेतात.',
        },
        whyNeeded: {
          en: 'Standard police verification protocol.',
          hi: 'सत्यापन नियम।',
          mr: 'चारित्र्य पडताळणी नियमावली.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
    ],
    stages: [
      {
        id: 'pcc_st_1',
        stageNumber: 1,
        stageKey: 'apply',
        title: {
          en: 'Apply on pcs.mahaonline.gov.in',
          hi: 'महाराष्ट्र पुलिस पोर्टल पर ऑनलाइन फॉर्म भरें',
          mr: 'pcs.mahaonline.gov.in वर पोलीस क्लिअरन्स अर्ज दाखल करा',
        },
        summary: {
          en: 'Create account on Police Clearance Services portal, choose your local police station, and upload photo and Aadhaar.',
          hi: 'pcs.mahaonline.gov.in पर पंजीकरण करें और स्थानीय थाना चुनें।',
          mr: 'pcs.mahaonline.gov.in वर नोंदणी करून तुमचे स्थानिक पोलीस ठाणे निवडा व कागदपत्रे अपलोड करा.',
        },
        keyDetails: {
          en: ['Pay government fee of ₹123.60 online.', 'Application sent to local police station.'],
          hi: ['सरकारी फीस का ऑनलाइन भुगतान करें।'],
          mr: ['शासकीय शुल्क भरल्यानंतर अर्ज थेट स्थानिक पोलीस ठाण्याकडे जातो.'],
        },
      },
      {
        id: 'pcc_st_2',
        stageNumber: 2,
        stageKey: 'inquiry',
        title: {
          en: 'Local Police Station Physical Verification',
          hi: 'स्थानीय थाने में प्रत्यक्ष सत्यापन एवं गवाह',
          mr: 'स्थानिक पोलीस ठाण्यात प्रत्यक्ष हजेरी व साक्षीदार तपासणी',
        },
        summary: {
          en: 'Beat constable contacts applicant to verify documents and takes statements of two referees.',
          hi: 'बीट कांस्टेबल दस्तावेजों की जांच करता है और दो पड़ोसियों की गवाही लेता है।',
          mr: 'पोलीस अंमलदार मूळ कागदपत्रांची पाहणी करतात आणि दोन साक्षीदारांचे जबाब नोंदवतात.',
        },
        keyDetails: {
          en: ['Digital certificate downloadable after SP office digital approval.'],
          hi: ['एसपी कार्यालय से डिजिटल हस्ताक्षर के बाद पोर्टल से डाउनलोड करें।'],
          mr: ['एसपी कार्यालयाची मंजुरी मिळाल्यावर पोर्टलवरून डिजिटल स्वाक्षरीचा दाखला डाउनलोड करता येतो.'],
        },
      },
    ],
    suggestedQuestions: {
      mr: [
        'चारित्र्य पडताळणीसाठी किती दिवस लागतात?',
        'पोलीस व्हेरिफिकेशनसाठी साक्षीदार कोण लागतात?',
        'दाखला ऑनलाइन डाउनलोड कसा करायचा?',
      ],
      hi: [
        'पुलिस वेरिफिकेशन में कितने दिन लगते हैं?',
        'गवाह के रूप में किसे प्रस्तुत करना होता है?',
        'डिजिटल प्रमाण पत्र कैसे डाउनलोड होता है?',
      ],
      en: [
        'How many days does police character verification take?',
        'Who can be given as local referees for police inquiry?',
        'How to download digitally signed Police Clearance Certificate?',
      ],
    },
  },

  farmer_cert: {
    info: {
      id: 'farmer_cert',
      title: {
        en: 'Farmer / Small Landholder Certificate (शेतकरी दाखला / अल्पभूधारक)',
        hi: 'किसान प्रमाण पत्र / लघु-सीमांत कृषक प्रमाण पत्र',
        mr: 'शेतकरी दाखला / अल्पभूधारक शेतकरी प्रमाणपत्र',
      },
      shortDescription: {
        en: 'Issued by Tahsildar confirming agricultural landholder status; required to purchase agricultural land in Maharashtra, apply for solar pump schemes, crop loan subsidies, and farmer quota in agricultural universities.',
        hi: 'तहसीलदार द्वारा जारी कृषक प्रमाण पत्र; कृषि भूमि क्रय, कुसुम सोलर पंप, फसल बीमा और कृषि कॉलेज कोटा हेतु आवश्यक।',
        mr: 'शेतजमीन खरेदी करणे, महाकृषी सौर पंप योजना, पिक कर्ज सवलत आणि कृषी पदवी प्रवेशातील शेतकरी कोट्यासाठी तहसीलदार जारी करत असलेला दाखला.',
      },
      department: {
        en: 'Revenue & Agriculture Department',
        hi: 'राजस्व एवं कृषि विभाग',
        mr: 'महसूल व कृषी विभाग, महाराष्ट्र शासन',
      },
      standardIssuingAuthority: {
        en: 'Tahsildar / Talathi (Village Officer)',
        hi: 'तहसीलदार / पटवारी',
        mr: 'तहसीलदार / तलाठी',
      },
      typicalDeliveryDays: 15,
      officialFee: '₹ 33.60',
      validityDuration: {
        en: '1 Financial Year / Subject to current land ownership',
        hi: '१ वर्ष (भूमि स्वामित्व के अधीन)',
        mr: '१ वर्ष / जमिनीच्या चालू मालकी हक्कानुसार',
      },
      officialPortalName: 'Aaple Sarkar / Mahabhulekh',
      officialPortalUrl: 'https://aaplesarkar.mahaonline.gov.in',
    },
    checklist: [
      {
        id: 'frm_712',
        title: {
          en: 'Digitally Signed 7/12 & 8-A Extract (चालू वर्षाचा डिजिटल ७/१२ व ८-अ)',
          hi: 'डिजिटल हस्ताक्षरित ७/१२ खतौनी एवं ८-अ खाता',
          mr: 'चालू वर्षाचा डिजिटल स्वाक्षरी असलेला ७/१२ आणि ८-अ उतारा (mahabhumi.gov.in)',
        },
        description: {
          en: 'Shows applicant’s or parent’s name as registered landholder with total holding in hectares.',
          hi: 'भूमि के क्षेत्रफल और मालिकाना हक का प्राथमिक साक्ष्य।',
          mr: 'स्वतःच्या किंवा वडिलांच्या नावावर शेतजमीन असल्याची अधिकृत नोंद.',
        },
        whyNeeded: {
          en: 'Conclusive ownership record under Maharashtra Land Revenue Code.',
          hi: 'भूमि स्वामित्व निर्धारण हेतु।',
          mr: 'शेतकरी असण्याचा मूलभूत पुरावा.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'frm_talathi_ahwal',
        title: {
          en: 'Talathi Crop Inspection & Holding Report (तलाठी पीक पाहणी अहवाल)',
          hi: 'पटवारी जांच रिपोर्ट (फसल एवं भूमि रकबा रिपोर्ट)',
          mr: 'स्थानिक तलाठ्यांचा पंचनामा व पीक पाहणी अहवाल',
        },
        description: {
          en: 'Confirms active farming activity and calculates total holding (under 2 hectares for small farmer).',
          hi: 'लघु कृषक (२ हेक्टेयर से कम) पात्रता निर्धारण हेतु।',
          mr: '२ हेक्टरपेक्षा कमी जमीन असल्यास अल्पभूधारक शेतकरी सवलतीसाठी आवश्यक.',
        },
        whyNeeded: {
          en: 'Required by Tahsildar to issue small farmer certificate.',
          hi: 'योजना पात्रता हेतु।',
          mr: 'शासकीय सवलतींसाठी आवश्यक अहवाल.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: 'frm_aadhaar',
        title: {
          en: 'Applicant Aadhaar & Bank Passbook (Aadhaar Seeded)',
          hi: 'आधार कार्ड एवं बैंक पासबुक (डीबीटी सक्रिय)',
          mr: 'अर्जदाराचे आधार कार्ड व आधार लिंक बँक पासबुक प्रत',
        },
        description: {
          en: 'For direct benefit transfer of farm subsidies.',
          hi: 'सब्सिडी सीधे खाते में पाने हेतु।',
          mr: 'शासकीय अनुदान थेट खात्यात जमा होण्यासाठी.',
        },
        whyNeeded: {
          en: 'DBT verification.',
          hi: 'डीबीटी सत्यापन।',
          mr: 'बँक खात्याची पडताळणी.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
    ],
    stages: [
      {
        id: 'frm_st_1',
        stageNumber: 1,
        stageKey: 'criteria',
        title: {
          en: 'Check Farmer Status & Land Holding',
          hi: 'कृषक पात्रता एवं भूमि रकबा जांचें',
          mr: 'शेतकरी पात्रता व जमिनीचे क्षेत्र तपासा',
        },
        summary: {
          en: 'Small landholder (अल्पभूधारक) requires holding under 2 hectares (5 acres) dry-crop land.',
          hi: '२ हेक्टेयर (५ एकड़) से कम कृषि भूमि होने पर लघु-सीमांत कृषक लाभ मिलते हैं।',
          mr: 'जिरायती जमीन २ हेक्टरपर्यंत (५ एकर) असल्यास अल्पभूधारक दाखला मिळतो. यावर सौर पंप व विहीर अनुदान मिळते.',
        },
        keyDetails: {
          en: ['Small farmer: up to 2.0 hectares.', 'Marginal farmer: up to 1.0 hectare.'],
          hi: ['लघु किसान: २ हेक्टेयर तक।'],
          mr: ['अल्पभूधारक: २ हेक्टरपर्यंत जमीन.', 'अतिअल्पभूधारक: १ हेक्टरपर्यंत जमीन.'],
        },
      },
      {
        id: 'frm_st_2',
        stageNumber: 2,
        stageKey: 'apply',
        title: {
          en: 'Apply on Aaple Sarkar or Visit Tahsil Circle Office',
          hi: 'आपले सरकार या तहसील कार्यालय में आवेदन',
          mr: 'आपले सरकार किंवा तहसील कार्यालयात अर्ज सादर करा',
        },
        summary: {
          en: 'Submit digital 7/12, 8-A, and Talathi report online on aaplesarkar.mahaonline.gov.in under Revenue Department.',
          hi: 'राजस्व विभाग में कृषक प्रमाण पत्र हेतु आवेदन करें।',
          mr: 'aaplesarkar.mahaonline.gov.in वर महसूल विभाग > शेतकरी दाखला निवडून डिजिटल अर्ज करा.',
        },
        keyDetails: {
          en: ['Delivery timeline: 15 days.', 'Official fee: ₹33.60.'],
          hi: ['१५ दिनों में जारी।'],
          mr: ['१५ दिवसांत तहसीलदार स्वाक्षरीने दाखला मिळतो.'],
        },
      },
    ],
    suggestedQuestions: {
      mr: [
        'शेतकरी दाखला कोणाला मिळतो? अल्पभूधारक शेतकरी म्हणजे काय?',
        'शेतजमीन खरेदी करण्यासाठी शेतकरी दाखला लागतो का?',
        'सौर कृषी पंप योजनेसाठी शेतकरी दाखला कसा काढावा?',
      ],
      hi: [
        'किसान प्रमाण पत्र कैसे बनता है? अल्पभूधारक की परिभाषा क्या है?',
        'कृषि भूमि खरीदने के लिए किसान प्रमाण पत्र क्यों जरूरी है?',
        'कुसुम सोलर पंप योजना के लिए कौन-से दस्तावेज लगते हैं?',
      ],
      en: [
        'What is a Small Landholder (Alpabhudharak) Farmer Certificate?',
        'Is a farmer certificate mandatory to buy agricultural land in Maharashtra?',
        'How to apply for solar pump schemes with this certificate?',
      ],
    },
  },
};

export const defaultCertificateId = 'income_cert';

/**
 * Creates dynamic, high-fidelity CertificateData for any custom civic requirement
 * entered by the citizen (e.g. Ladki Bahin Yojana, Solvency, Legal Heir, etc.)
 */
export function createCustomCertificateData(params: {
  id: string;
  name: string;
  department?: string;
  description?: string;
}): CertificateData {
  const cleanId = params.id.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_') || `custom_${Date.now()}`;
  const cleanName = params.name.trim() || 'Custom Government Requirement';
  const cleanDept = params.department?.trim() || 'District Collectorate / Civic Administration';
  const cleanDesc = params.description?.trim() || `Tailored civic guidance for ${cleanName}.`;

  return {
    info: {
      id: cleanId,
      title: {
        en: `${cleanName} (Custom Requirement)`,
        hi: `${cleanName} (कस्टम योजना / प्रमाण पत्र)`,
        mr: `${cleanName} (नागरिक योजना / दाखला)`,
      },
      shortDescription: {
        en: cleanDesc,
        hi: cleanDesc,
        mr: cleanDesc,
      },
      department: {
        en: cleanDept,
        hi: cleanDept,
        mr: cleanDept,
      },
      standardIssuingAuthority: {
        en: 'Competent Authority / Tahsildar / Designated Officer',
        hi: 'सक्षम प्राधिकारी / तहसीलदार / अधिकृत अधिकारी',
        mr: 'सक्षम प्राधिकारी / तहसीलदार / संबंधित विभाग अधिकारी',
      },
      typicalDeliveryDays: 15,
      officialFee: '₹ 33.60 (Official citizen portal standard fee)',
      validityDuration: {
        en: 'As per official government notification',
        hi: 'सरकारी अधिसूचना के अनुसार',
        mr: 'अधिकृत शासकीय नियमांनुसार',
      },
      officialPortalName: 'Aaple Sarkar / State Citizen Portal',
      officialPortalUrl: 'https://aaplesarkar.mahaonline.gov.in',
    },
    checklist: [
      {
        id: `${cleanId}_aadhaar`,
        title: {
          en: 'Applicant Aadhaar Card (Active Mobile Linked)',
          hi: 'आवेदक का आधार कार्ड (मोबाइल लिंक)',
          mr: 'अर्जदाराचे आधार कार्ड (चालू मोबाईल नंबर लिंक असलेले)',
        },
        description: {
          en: 'Mandatory identity verification across all Indian civic portals.',
          hi: 'ओटीपी सत्यापन और पहचान का प्राथमिक प्रमाण।',
          mr: 'डिजिटल पडताळणी आणि ओळखीचा प्राथमिक पुरावा म्हणून सर्व शासकीय पोर्टल्सवर अनिवार्य.',
        },
        whyNeeded: {
          en: 'OTP identity verification.',
          hi: 'ओटीपी सत्यापन हेतु।',
          mr: 'ऑनलाइन प्रमाणीकरणासाठी आवश्यक.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: `${cleanId}_residence`,
        title: {
          en: 'Residence Proof (Electricity Bill / Ration Card / Domicile)',
          hi: 'निवास प्रमाण पत्र (बिजली बिल / राशन कार्ड / मूल निवास)',
          mr: 'रहिवासी पुरावा (लाईट बिल / रेशन कार्ड / अधिवास दाखला)',
        },
        description: {
          en: 'Proves continuous residence in local jurisdiction.',
          hi: 'स्थानीय अधिकार क्षेत्र में निवास का प्रमाण।',
          mr: 'स्थानिक कार्यक्षेत्रात वास्तव्याचा पुरावा.',
        },
        whyNeeded: {
          en: 'Determines local jurisdiction.',
          hi: 'कार्यक्षेत्र निर्धारण हेतु।',
          mr: 'स्थानिक कार्यालय निश्चित करण्यासाठी.',
        },
        category: 'address',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: `${cleanId}_self_declaration`,
        title: {
          en: 'Signed Self-Declaration Affidavit (स्वयंघोषणापत्र)',
          hi: 'हस्ताक्षरित स्व-घोषणा पत्र / शपथ पत्र',
          mr: 'विहित नमुन्यातील स्वाक्षरी केलेले स्वयंघोषणापत्र (प्रतिज्ञापत्र)',
        },
        description: {
          en: 'Legal affidavit confirming accuracy of submitted information under penalty of law.',
          hi: 'प्रस्तुत की गई जानकारी की सत्यता का शपथ पत्र।',
          mr: 'दिलेली माहिती खरी असल्याचे हमीपत्र.',
        },
        whyNeeded: {
          en: 'Legal accountability.',
          hi: 'कानूनी घोषणा।',
          mr: 'कायदेशीर हमी.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: `${cleanId}_photo`,
        title: {
          en: 'Recent Passport-size Photograph (White Background)',
          hi: 'नवीनतम पासपोर्ट साइज फोटो',
          mr: 'नुकताच काढलेला पासपोर्ट साईज फोटो',
        },
        description: {
          en: 'Clear photograph for digital application registration.',
          hi: 'डिजिटल पंजीकरण हेतु फोटो।',
          mr: 'दाखल्यावर किंवा अर्जावर लावण्यासाठी स्पष्ट फोटो.',
        },
        whyNeeded: {
          en: 'Printed on digital certificate or civic passbook.',
          hi: 'प्रमाण पत्र पर मुद्रण हेतु।',
          mr: 'दाखल्यावर छापण्यासाठी.',
        },
        category: 'identity',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
      {
        id: `${cleanId}_supporting_doc`,
        title: {
          en: `Specific Supporting Evidence for ${cleanName}`,
          hi: `${cleanName} से संबंधित विशिष्ट सहायक दस्तावेज`,
          mr: `${cleanName} शी संबंधित विशिष्ट पुरावे (उदा. बँक पासबुक, उत्पन्न किंवा संबंधित कागदपत्रे)`,
        },
        description: {
          en: 'Previous government documents, passbook, or eligibility proof relevant to this request.',
          hi: 'इस योजना अथवा प्रमाण पत्र से जुड़े पुराने अभिलेख।',
          mr: 'या दाखल्याशी अथवा योजनेशी संबंधित चालू कागदपत्रे.',
        },
        whyNeeded: {
          en: 'Substantiates custom scheme or certificate eligibility.',
          hi: 'पात्रता सिद्ध करने हेतु।',
          mr: 'पात्रता सिद्ध करण्यासाठी.',
        },
        category: 'proof',
        requirementType: 'required',
        isOfficiallyVerified: true,
        checked: false,
      },
    ],
    stages: [
      {
        id: `${cleanId}_st_1`,
        stageNumber: 1,
        stageKey: 'purpose',
        title: {
          en: `Understand Purpose & Rules of ${cleanName}`,
          hi: `${cleanName} का उद्देश्य एवं नियम समझें`,
          mr: `${cleanName} चा उद्देश व नियम समजून घ्या`,
        },
        summary: {
          en: cleanDesc,
          hi: cleanDesc,
          mr: cleanDesc,
        },
        keyDetails: {
          en: [
            `Verify eligibility rules on official portal or nearest Tahsil/Collectorate.`,
            `Do not pay any unauthorized agents or intermediaries.`,
          ],
          hi: [
            `आधिकारिक सरकारी पोर्टल या तहसील से नियमों की पुष्टि करें।`,
            `किसी भी अनधिकृत दलाल को पैसे न दें।`,
          ],
          mr: [
            `अधिकृत शासकीय पोर्टलवर किंवा जवळच्या सेतू केंद्रावर जाऊन नियमांची खात्री करा.`,
            `कोणत्याही अनधिकृत मध्यस्थास अथवा एजंटला पैसे देऊ नका.`,
          ],
        },
      },
      {
        id: `${cleanId}_st_2`,
        stageNumber: 2,
        stageKey: 'documents',
        title: {
          en: 'Gather & Verify All Required Documents',
          hi: 'सभी आवश्यक दस्तावेज एकत्र करें',
          mr: 'सर्व आवश्यक कागदपत्रे गोळा करून पडताळा',
        },
        summary: {
          en: 'Ensure Aadhaar, address proof, self-declaration, and specific supporting records are scanned clearly.',
          hi: 'आधार, निवास प्रमाण, शपथ पत्र और संबंधित दस्तावेज स्पष्ट रूप से स्कैन करें।',
          mr: 'आधार कार्ड, रहिवासी दाखला, स्वयंघोषणापत्र व आवश्यक कागदपत्रे स्पष्ट स्कॅन करून ठेवा.',
        },
        keyDetails: {
          en: ['Scan documents in PDF or JPEG under 256 KB.'],
          hi: ['२५६ केबी से कम साइज में पीडीएफ या जेपीईजी स्कैन करें।'],
          mr: ['कागदपत्रे २५६ केबीच्या आत स्पष्ट स्कॅन करा.'],
        },
      },
      {
        id: `${cleanId}_st_3`,
        stageNumber: 3,
        stageKey: 'submit',
        title: {
          en: 'Submit on Official Portal or Citizen Service Centre',
          hi: 'अधिकृत पोर्टल या नागरिक सेवा केंद्र पर जमा करें',
          mr: 'अधिकृत पोर्टल किंवा सेतू केंद्रावर अर्ज सादर करा',
        },
        summary: {
          en: 'Apply on Aaple Sarkar or relevant department window and obtain an official acknowledgment receipt with application tracking ID.',
          hi: 'पोर्टल पर आवेदन करें और पावती रसीद प्राप्त करें।',
          mr: 'आपले सरकार पोर्टलवर किंवा संबंधित शासकीय कार्यालयात अर्ज सादर करून पावती व ट्रॅकिंग नंबर घ्या.',
        },
        keyDetails: {
          en: ['Always retain the 15-digit Application Tracking Number.'],
          hi: ['१५ अंकों का आवेदन क्रमांक सुरक्षित रखें।'],
          mr: ['१५ अंकी अर्ज क्रमांक जपून ठेवा जेणेकरून अर्जाची स्थिती तपासता येईल.'],
        },
      },
    ],
    suggestedQuestions: {
      mr: [
        `${cleanName} साठी कोणती कागदपत्रे लागतात?`,
        `हा अर्ज कुठे सादर करावा लागतो?`,
        `या प्रक्रियेला किती दिवस लागतात आणि शासकीय शुल्क किती असते?`,
      ],
      hi: [
        `${cleanName} के लिए कौन से दस्तावेज लगेंगे?`,
        `इसका आवेदन कहाँ जमा करना होगा?`,
        `इसकी प्रक्रिया में कितना समय लगता है?`,
      ],
      en: [
        `What documents are needed for ${cleanName}?`,
        `Where should I submit the application for ${cleanName}?`,
        `What are the typical processing days and official fees?`,
      ],
    },
  };
}

export function getCertificateData(id: string): CertificateData {
  return supportedCertificates[id] || supportedCertificates[defaultCertificateId];
}

