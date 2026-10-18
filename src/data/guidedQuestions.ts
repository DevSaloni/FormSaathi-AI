import { GuidedQuestion } from '../types';

export const guidedIncomeQuestions: GuidedQuestion[] = [
  {
    id: 'step_cert_type',
    label: 'Application Type',
    category: 'purpose',
    required: true,
    simplifiedQuestion: {
      en: 'What specific application or certificate are you preparing for?',
      hi: 'आप किस प्रकार के आवेदन या प्रमाण पत्र की तैयारी कर रहे हैं?',
      mr: 'तुम्ही नक्की कोणत्या दाखल्यासाठी किंवा अर्जासाठी तयारी करत आहात?',
    },
    explanation: {
      en: 'Understanding your exact goal helps us advise the correct documents and fee structure.',
      hi: 'आपका सही उद्देश्य जानने से हम आवश्यक दस्तावेज और सही प्रक्रिया बता सकते हैं।',
      mr: 'दाखल्याचा नेमका प्रकार ठरवल्याने कोणती कागदपत्रे लागतील हे लगेच स्पष्ट होते.',
    },
    exampleAnswer: {
      en: 'Tahsil Income Certificate for College Scholarship [Fictional Example]',
      hi: 'कॉलेज छात्रवृत्ति हेतु तहसील आय प्रमाण पत्र [काल्पनिक उदाहरण]',
      mr: 'कॉलेज फी सवलत व शिष्यवृत्तीसाठी उत्पन्नाचा दाखला [काल्पनिक उदाहरण]',
    },
    cautionNote: {
      en: 'State rules vary. An income certificate for scholarships is usually valid for 1 or 3 financial years depending on your state.',
      hi: 'छात्रवृत्ति के लिए आय प्रमाण पत्र सामान्यतः १ से ३ वित्तीय वर्षों के लिए मान्य होता है।',
      mr: 'शिष्यवृत्तीसाठी बहुतांश ठिकाणी ३ वर्षांचा किंवा १ वर्षाचा दाखला मागितला जातो.',
    },
    placeholder: {
      en: 'e.g. Tahsil Income Certificate for Scholarship',
      hi: 'उदा. छात्रवृत्ति हेतु आय प्रमाण पत्र',
      mr: 'उदा. शिष्यवृत्तीसाठी उत्पन्नाचा दाखला',
    },
  },
  {
    id: 'step_state',
    label: 'State & Jurisdiction',
    category: 'address',
    required: true,
    simplifiedQuestion: {
      en: 'In which State and District/Tahsil is your permanent residence located?',
      hi: 'आपका स्थायी निवास किस राज्य और जिले/तहसील में स्थित है?',
      mr: 'तुमचे कायमचे राहण्याचे गाव/शहर कोणत्या राज्य व तालुक्यात/जिल्ह्यात आहे?',
    },
    explanation: {
      en: 'Certificate portals and revenue authorities are organized by state and district.',
      hi: 'राजस्व विभाग और ऑनलाइन पोर्टल राज्य और जिले के अनुसार अलग-अलग होते हैं।',
      mr: 'प्रत्येक राज्याचे आणि जिल्ह्याचे सेतू किंवा आपले सरकार केंद्र वेगवेगळे असते.',
    },
    exampleAnswer: {
      en: 'Maharashtra, District Pune, Haveli Tahsil [Fictional Example]',
      hi: 'उत्तर प्रदेश, जिला वाराणसी, तहसील पिंडरा [काल्पनिक उदाहरण]',
      mr: 'महाराष्ट्र, जिल्हा छत्रपती संभाजीनगर, तालुका गंगापूर [काल्पनिक उदाहरण]',
    },
    cautionNote: {
      en: 'Always apply in the tahsil where your family possesses permanent residency or ancestral address.',
      hi: 'उसी तहसील में आवेदन करें जहां आपका स्थायी निवास या राशन कार्ड दर्ज है।',
      mr: 'ज्या तालुक्यात तुमचे रेशन कार्ड किंवा घर आहे त्याच तालुक्यात अर्ज करा.',
    },
    placeholder: {
      en: 'e.g. Maharashtra, Pune, Haveli',
      hi: 'उदा. महाराष्ट्र, पुणे, हवेली',
      mr: 'उदा. महाराष्ट्र, पुणे, हवेली',
    },
  },
  {
    id: 'step_full_name',
    label: 'Applicant Full Name',
    category: 'applicant',
    required: true,
    simplifiedQuestion: {
      en: 'What is the full name of the person in whose name the certificate is needed?',
      hi: 'जिस व्यक्ति के नाम पर प्रमाण पत्र बनना है, उनका पूरा नाम क्या है?',
      mr: 'ज्या व्यक्तीच्या नावावर दाखला काढायचा आहे त्यांचे पूर्ण नाव काय आहे?',
    },
    explanation: {
      en: 'Write the exact name as it appears on official records (School Leaving Certificate or Aadhaar Card). Avoid abbreviations.',
      hi: 'स्कूल लीविंग सर्टिफिकेट या आधार कार्ड के अनुसार सही स्पेलिंग में पूरा नाम लिखें।',
      mr: 'शाळेच्या दाखल्याप्रमाणे किंवा आधार कार्डाप्रमाणे नाव अचूक लिहा. स्पेलिंग चूक करू नका.',
    },
    exampleAnswer: {
      en: 'Ramesh Tukaram Shinde [Fictional Example]',
      hi: 'राजेश कुमार शर्मा [काल्पनिक उदाहरण]',
      mr: 'रमेश तुकाराम शिंदे [काल्पनिक उदाहरण]',
    },
    cautionNote: {
      en: 'If applying for a minor student, usually the father/guardian is the main applicant, but check local rules.',
      hi: 'नाबालिग छात्र के मामले में अक्सर माता-पिता या अभिभावक मुख्य आवेदक होते हैं।',
      mr: 'विद्यार्थी १८ वर्षांखालील असल्यास अर्जदार म्हणून वडिलांचे किंवा पालकांचे नाव लागते.',
    },
    placeholder: {
      en: 'e.g. First Name, Father/Husband Name, Surname',
      hi: 'उदा. नाम, पिता/पति का नाम, उपनाम',
      mr: 'उदा. पहिले नाव, वडिलांचे/पतीचे नाव, आडनाव',
    },
  },
  {
    id: 'step_address',
    label: 'Residential Address',
    category: 'address',
    required: true,
    simplifiedQuestion: {
      en: 'What is the complete permanent residential address, including village/ward and PIN code?',
      hi: 'पिन कोड सहित आपका पूरा स्थायी पता क्या है?',
      mr: 'पिनकोडसह तुमचा राहण्याचा संपूर्ण पत्ता काय आहे?',
    },
    explanation: {
      en: 'Address proof (electricity bill, ration card, or voter card) must match this location.',
      hi: 'बिजली बिल, राशन कार्ड या निवास प्रमाण पत्र इसी पते से मेल खाना चाहिए।',
      mr: 'लाईट बिल किंवा रेशन कार्डवरील पत्त्याशी हा पत्ता जुळला पाहिजे. पिनकोड आवश्यक आहे.',
    },
    exampleAnswer: {
      en: 'Plot 14, Datta Colony, Waluj, Taluka Gangapur, Dist. Sambhajinagar - 431133 [Fictional Example]',
      hi: 'मकान नं. 45, गांधी नगर, पोस्ट पिंडरा, जिला वाराणसी - 221206 [काल्पनिक उदाहरण]',
      mr: 'घर नं. १४, दत्त कॉलनी, वाळुंज, तालुका गंगापूर, जिल्हा संभाजीनगर - ४३११३३ [काल्पनिक उदाहरण]',
    },
    cautionNote: {
      en: 'Never enter temporary hostel or rented lodge addresses as permanent residence.',
      hi: 'हॉस्टल या किराए के अस्थाई कमरे का पता स्थायी पते के रूप में न भरें।',
      mr: 'हॉस्टेल किंवा तात्पुरत्या भाड्याच्या खोलीचा पत्ता कायम पत्ता म्हणून लिहू नका.',
    },
    placeholder: {
      en: 'House/Street, Village/City, PIN Code',
      hi: 'मकान/गली, गाँव/शहर, पिन कोड',
      mr: 'घर क्र./गल्ली, गाव/शहर, पिनकोड',
    },
  },
  {
    id: 'step_income_source',
    label: 'Income Sources & Total',
    category: 'income',
    required: true,
    simplifiedQuestion: {
      en: 'What are your family income sources (farming, daily labor, business, salary) and total annual amount in ₹?',
      hi: 'परिवार की आय का साधन (खेती, मजदूरी, व्यापार, नौकरी) और कुल वार्षिक आय (रुपये में) क्या है?',
      mr: 'कुटुंबाच्या उत्पन्नाचे मुख्य साधन (शेती, मजुरी, व्यवसाय, नोकरी) आणि वार्षिक एकूण रक्कम (₹) किती आहे?',
    },
    explanation: {
      en: 'This figure must match your supporting proof (Talathi verification report, employer salary slip, or self-declaration).',
      hi: 'यह राशि पटवारी/लेखपाल रिपोर्ट, वेतन पर्ची या स्व-घोषणा पत्र से मेल खानी चाहिए।',
      mr: 'तलाठी उत्पन्नाचा दाखला किंवा पगार पावती याच्याशी ही रक्कम तंतोतंत जुळली पाहिजे.',
    },
    exampleAnswer: {
      en: 'Farming & Agricultural Labor: ₹ 65,000 per year [Fictional Example]',
      hi: 'कृषि मजदूरी व अल्प खेती: ₹ 65,000 प्रति वर्ष [काल्पनिक उदाहरण]',
      mr: 'अल्पभूधारक शेती व मजुरी: वार्षिक ₹ ६५,०००/- [काल्पनिक उदाहरण]',
    },
    cautionNote: {
      en: 'Falsifying income on official revenue affidavits is a punishable offense under Indian law.',
      hi: 'शपथ पत्र पर गलत आय दर्शाना कानूनन दंडनीय है। वास्तविक आय ही दर्ज करें।',
      mr: 'खोटे उत्पन्न दाखवणे कायद्याने गुन्हा आहे. खरी व योग्य माहितीच नोंदवा.',
    },
    placeholder: {
      en: 'e.g. Farming / Small shop: ₹ 60,000 per year',
      hi: 'उदा. खेती/मजदूरी: ₹ 60,000 प्रति वर्ष',
      mr: 'उदा. शेती/मजुरी: वार्षिक ₹ ६०,०००/-',
    },
  },
  {
    id: 'step_purpose',
    label: 'Purpose of Certificate',
    category: 'purpose',
    required: true,
    simplifiedQuestion: {
      en: 'Where will you submit this certificate (e.g. college admission, government scholarship, pension)?',
      hi: 'आप यह प्रमाण पत्र कहाँ जमा करेंगे (जैसे कॉलेज एडमिशन, छात्रवृत्ति, पेंशन)?',
      mr: 'हा दाखला तुम्ही नक्की कुठे सादर करणार आहात (उदा. कॉलेज ॲडमिशन, शिष्यवृत्ती, पेन्शन)?',
    },
    explanation: {
      en: 'The purpose is printed directly on the certificate by the Tahsildar.',
      hi: 'तहसीलदार द्वारा जारी प्रमाण पत्र पर यह उद्देश्य स्पष्ट रूप से दर्ज किया जाता है।',
      mr: 'तहसीलदार कार्यालयाकडून दाखल्यावर हे कारण थेट छापून येते.',
    },
    exampleAnswer: {
      en: 'Engineering College Admission & Post-Matric Scholarship [Fictional Example]',
      hi: 'पॉलिटेक्निक कॉलेज प्रवेश एवं राज्य छात्रवृत्ति [काल्पनिक उदाहरण]',
      mr: 'अभियांत्रिकी महाविद्यालय प्रवेश व पोस्ट-मॅट्रिक शिष्यवृत्तीसाठी [काल्पनिक उदाहरण]',
    },
    cautionNote: {
      en: 'Ensure this purpose matches the institution you plan to submit it to.',
      hi: 'सुनिश्चित करें कि यह उद्देश्य आपके संबंधित संस्थान से मेल खाता है।',
      mr: 'ज्या संस्थेत दाखला द्यायचा आहे तेच कारण नमूद करा.',
    },
    placeholder: {
      en: 'e.g. Government Scholarship & Fee Concession',
      hi: 'उदा. सरकारी छात्रवृत्ति एवं फीस छूट',
      mr: 'उदा. शासकीय शिष्यवृत्ती व फी माफी',
    },
  },
];
