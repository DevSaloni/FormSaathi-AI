import { OfficialPortal } from '../types';

export const officialPortals: OfficialPortal[] = [
  {
    id: 'aaple_sarkar',
    name: {
      en: 'Aaple Sarkar (Government of Maharashtra)',
      hi: 'आपले सरकार (महाराष्ट्र सरकार नागरिक पोर्टल)',
      mr: 'आपले सरकार पोर्टल (महाराष्ट्र शासन)',
    },
    jurisdiction: 'Maharashtra (महाराष्ट्र)',
    department: 'Revenue & Forest / Rural Development / Urban Development',
    url: 'https://aaplesarkar.mahaonline.gov.in',
    servicesProvided: [
      'Income Certificate (उत्पन्नाचा दाखला)',
      'Domicile & Nationality Certificate (अधिवास व राष्ट्रीयत्व दाखला)',
      'Caste Certificate & Non-Creamy Layer (जात प्रमाणपत्र)',
      'Age, Nationality & Domicile',
      'Senior Citizen Certificate',
    ],
    verificationDate: 'October 2026',
    safetyNotice: {
      en: 'Always verify the domain ends in .gov.in or .mahaonline.gov.in. Never pay extra cash above standard government processing fees (₹33.60).',
      hi: 'हमेशा सुनिश्चित करें कि वेबसाइट का डोमेन .gov.in है। आधिकारिक सरकारी शुल्क से अधिक किसी को न दें।',
      mr: 'वेबसाईटचे डोमेन .gov.in किंवा .mahaonline.gov.in असल्याचे तपासा. शासकीय शुल्कापेक्षा जास्त रक्कम देऊ नका.',
    },
  },
  {
    id: 'service_plus',
    name: {
      en: 'ServicePlus (National e-Governance Platform)',
      hi: 'सर्विसप्लस (राष्ट्रीय ई-गवर्नेंस सेवा मंच)',
      mr: 'सर्व्हिसप्लस (राष्ट्रीय ई-प्रशासन पोर्टल)',
    },
    jurisdiction: 'Multi-State / National (बहु-राज्य / राष्ट्रीय)',
    department: 'National Informatics Centre (NIC), Ministry of Electronics & IT',
    url: 'https://serviceonline.gov.in',
    servicesProvided: [
      'Income Certificate (Multiple States: Bihar, Jharkhand, Tripura, etc.)',
      'Caste & Community Certificates',
      'Character Certificate & Local Permissions',
      'Rural Panchayat Services',
    ],
    verificationDate: 'October 2026',
    safetyNotice: {
      en: 'Operated directly by National Informatics Centre (NIC). Free citizen registration with mobile OTP.',
      hi: 'राष्ट्रीय सूचना विज्ञान केंद्र (NIC) द्वारा संचालित। मोबाइल ओटीपी से मुफ्त नागरिक पंजीकरण।',
      mr: 'नॅशनल इन्फॉर्मेटिक्स सेंटर (NIC) द्वारे संचलित अधिकृत केंद्र शासन प्लॅटफॉर्म.',
    },
  },
  {
    id: 'nsp_scholarships',
    name: {
      en: 'National Scholarship Portal (NSP)',
      hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP)',
      mr: 'राष्ट्रीय शिष्यवृत्ती पोर्टल (NSP)',
    },
    jurisdiction: 'All India (अखिल भारतीय)',
    department: 'Ministry of Electronics & IT / Ministry of Education, Govt. of India',
    url: 'https://scholarships.gov.in',
    servicesProvided: [
      'Pre-Matric & Post-Matric Scholarships',
      'Top Class Education for SC/ST/OBC/Minority',
      'Merit-cum-Means Scholarships',
      'Central Sector Scheme of Scholarships for College Students',
    ],
    verificationDate: 'October 2026',
    safetyNotice: {
      en: 'Scholarship amounts are disbursed directly to student bank accounts via Aadhaar DBT. Never share your bank passwords or OTPs.',
      hi: 'छात्रवृत्ति सीधे आधार से जुड़े बैंक खाते (DBT) में भेजी जाती है। किसी एजेंट को पैसे न दें।',
      mr: 'शिष्यवृत्तीची रक्कम थेट विद्यार्थ्याच्या आधार-संलग्न बँक खात्यात (DBT) जमा केली जाते.',
    },
  },
  {
    id: 'digilocker',
    name: {
      en: 'DigiLocker (Official Digital Document Wallet)',
      hi: 'डिजिलॉकर (सरकारी डिजिटल दस्तावेज वॉलेट)',
      mr: 'डिजीलॉकर (अधिकृत डिजिटल कागदपत्र वॉलेट)',
    },
    jurisdiction: 'All India (अखिल भारतीय)',
    department: 'Ministry of Electronics and Information Technology (MeitY)',
    url: 'https://www.digilocker.gov.in',
    servicesProvided: [
      'Issued Aadhaar & PAN Card downloads',
      'Digital Income, Caste & Domicile Certificates',
      '10th & 12th Board Marksheets & Passing Certificates',
      'Driving License & Vehicle Registration',
    ],
    verificationDate: 'October 2026',
    safetyNotice: {
      en: 'Documents issued in DigiLocker are legally recognized at par with physical originals under Rule 9A of the IT Rules 2016.',
      hi: 'डिजिलॉकर में जारी दस्तावेज आईटी नियम 2016 के तहत मूल दस्तावेजों के समान कानूनी मान्यता प्राप्त हैं।',
      mr: 'डिजीलॉकरमधील कागदपत्रे माहिती तंत्रज्ञान कायद्यानुसार मूळ कागदपत्रांसारखीच ग्राह्य धरली जातात.',
    },
  },
  {
    id: 'pm_kisan',
    name: {
      en: 'PM-Kisan Samman Nidhi Portal',
      hi: 'पीएम किसान सम्मान निधि आधिकारिक पोर्टल',
      mr: 'पीएम-किसान सन्मान निधी पोर्टल',
    },
    jurisdiction: 'All India (अखिल भारतीय)',
    department: 'Ministry of Agriculture and Farmers Welfare',
    url: 'https://pmkisan.gov.in',
    servicesProvided: [
      'Farmer New Registration',
      'Beneficiary Status Check',
      'eKYC Verification (Aadhaar OTP / Biometric)',
      'Correction of Name as per Aadhaar',
    ],
    verificationDate: 'October 2026',
    safetyNotice: {
      en: 'Self eKYC on the official portal is 100% free. Beware of fraudulent SMS links asking for bank fees.',
      hi: 'आधिकारिक पोर्टल पर ई-केवाईसी पूरी तरह निःशुल्क है। फर्जी मैसेज और लिंक्स से सावधान रहें।',
      mr: 'अधिकृत पोर्टलवर ई-केवायसी पूर्णपणे मोफत आहे. संशयास्पद लिंकवर पैसे भरू नका.',
    },
  },
  {
    id: 'edistrict_up',
    name: {
      en: 'e-District Uttar Pradesh (ई-डिस्ट्रिक्ट उत्तर प्रदेश)',
      hi: 'ई-डिस्ट्रिक्ट उत्तर प्रदेश (e-District UP)',
      mr: 'ई-डिस्ट्रिक्ट उत्तर प्रदेश पोर्टल',
    },
    jurisdiction: 'Uttar Pradesh (उत्तर प्रदेश)',
    department: 'Centre for e-Governance, Government of Uttar Pradesh',
    url: 'https://edistrict.up.gov.in',
    servicesProvided: [
      'आय प्रमाण पत्र (Income Certificate)',
      'निवास प्रमाण पत्र (Domicile / Residence Certificate)',
      'जाति प्रमाण पत्र (Caste Certificate)',
      'खतौनी की नकल व राजस्व सेवाएं',
    ],
    verificationDate: 'October 2026',
    safetyNotice: {
      en: 'Apply via citizen login or visit authorized Jan Seva Kendra (CSC) in UP.',
      hi: 'नागरिक लॉगिन से आवेदन करें या नजदीकी जन सेवा केंद्र (CSC) पर जाएं। निर्धारित सरकारी शुल्क ही दें।',
      mr: 'उत्तर प्रदेशातील नागरिकांसाठी अधिकृत ई-डिस्ट्रिक्ट पोर्टल.',
    },
  },
];
