import { Language } from '../types';

export function getClientCivicFallback(query: string, language: Language): string {
  const q = (query || '').toLowerCase();

  // 1. Income Certificate
  if (q.includes('आय प्रमाण') || q.includes('उत्पन्न') || q.includes('income')) {
    if (language === 'hi') {
      return `### आय प्रमाण पत्र (Income Certificate) संपूर्ण मार्गदर्शिका

**कहाँ काम आता है:** छात्रवृत्ति, कॉलेज फीस में छूट, राशन कार्ड श्रेणी निर्धारण एवं सरकारी सब्सिडी योजनाओं के लिए।

### १. आवश्यक दस्तावेज़ (Mandatory Documents):
- **पहचान प्रमाण:** आवेदक का आधार कार्ड (सक्रिय मोबाइल नंबर से लिंक)
- **निवास प्रमाण:** राशन कार्ड की स्व-सत्यापित प्रति, हाल ही का बिजली बिल या नगरपालिका/ग्राम पंचायत कर रसीद
- **आय का साक्ष्य:** पटवारी / लेखपाल आय जांच आख्या (ग्रामीण) या नियोक्ता की अधिकृत वेतन पर्ची (फॉर्म १६)
- **अन्य:** नवीनतम पासपोर्ट साइज रंगीन फोटो एवं विहित प्रारूप में स्व-घोषणा पत्र (Self-Declaration)

### २. आवेदन कैसे करें (How to Apply):
- **ऑनलाइन (घर बैठे):** अपने राज्य के आधिकारिक ई-डिस्ट्रिक्ट पोर्टल या ServicePlus (serviceonline.gov.in) / आपले सरकार (aaplesarkar.mahaonline.gov.in) पर नागरिक लॉगिन से आवेदन करें।
- **ऑफलाइन:** नजदीकी जन सेवा केंद्र (CSC Center), सेतू सुविधा केंद्र या तहसील कार्यालय के आरटीएस लोक सेवा काउंटर पर जाएं।

### ३. कालावधी एवं आधिकारिक सरकारी शुल्क:
- **समय सीमा:** लोक सेवा गारंटी अधिनियम के तहत १० से १५ कार्य दिवस।
- **सरकारी शुल्क:** मात्र ₹ ३० से ₹ ३३.६०/- (Aaple Sarkar / CSC अधिकृत दर)।

**सावधानी:** कभी भी किसी अनाधिकृत एजेंट या बिचौलिए को अतिरिक्त पैसे न दें। अपना आधार ओटीपी या बैंक पासवर्ड किसी के साथ साझा न करें।`;
    } else if (language === 'mr') {
      return `### उत्पन्नाचा दाखला (Income Certificate) संपूर्ण मार्गदर्शक

**उपयोग:** ई-स्कॉलरशिप, कॉलेज फी सवलत, शासकीय अनुदाने आणि विविध कल्याणकारी योजनांसाठी वार्षिक उत्पन्नाचा दाखला आवश्यक असतो.

### १. आवश्यक कागदपत्रे (Required Documents):
- **ओळख व पत्ता पुरावा:** अर्जदाराचे आधार कार्ड (चालू मोबाईल नंबर लिंक असलेले)
- **कुटुंब पुरावा:** रेशन कार्डची सत्यप्रत (१२ अंकी आरसी नंबर व सर्व कुटुंबियांची नावे असलेले पान)
- **रहिवासी पुरावा:** मागील ३ महिन्यांतील लाईट बिल किंवा घरपट्टी पावती
- **उत्पन्नाचा प्राथमिक अहवाल:** गावचे तलाठी यांचा उत्पन्न चौकशी अहवाल किंवा ग्रामसेवक दाखला
- **इतर:** पासपोर्ट साईज फोटो आणि विहित नमुन्यातील स्वयंघोषणापत्र (Self-Declaration)

### २. अर्ज कसा करावा (How to Apply):
- **ऑनलाइन:** महाराष्ट्र शासनाच्या अधिकृत 'आपले सरकार' पोर्टलवर (aaplesarkar.mahaonline.gov.in) महसूल विभाग अंतर्गत 'उत्पन्नाचा दाखला' निवडून अर्ज करा.
- **ऑफलाइन:** जवळच्या सेतू सुविधा केंद्र (Setu Kendra) किंवा आपले सरकार सेवा केंद्रावर जाऊन मूळ कागदपत्रांसह अर्ज सादर करा.

### ३. कालावधी आणि शासकीय शुल्क:
- **कायदेशीर मुदत:** लोकसेवा हमी कायद्यानुसार १५ कार्य दिवस.
- **अधिकृत शासकीय शुल्क:** फक्त ₹ ३३.६०/-.

**महत्त्वाची काळजी:** कोणत्याही मध्यस्थ किंवा दलालाला जादा पैसे देऊ नका. केवळ अधिकृत शासकीय पोर्टलचाच वापर करा. ओटीपी कोणाशीही शेअर करू नका.`;
    } else {
      return `### Income Certificate (तहसील उत्पन्न दाखला) Step-by-Step Guide

**Purpose:** Essential for academic scholarships, university fee reimbursement, welfare subsidies, and government welfare benefits.

### 1. Mandatory Required Documents:
- **Identity Proof:** Applicant Aadhaar Card (linked to an active mobile number)
- **Family Proof:** True Copy of Ration Card (showing head of family & member list)
- **Address Proof:** Recent electricity bill or local municipal property tax receipt
- **Income Proof:** Talathi / Patwari inquiry report or employer salary slip (Form 16)
- **Additional:** Recent passport-size photograph & signed Self-Declaration Form

### 2. Application Procedure:
- **Online:** Log into state portal (e.g. Maharashtra Aaple Sarkar: aaplesarkar.mahaonline.gov.in or ServicePlus: serviceonline.gov.in) -> Select Revenue Department -> Income Certificate.
- **Offline:** Visit your local Setu Suvidha Kendra, Common Service Center (CSC), or Tahsil Citizen Counter.

### 3. Timeline & Statutory Fee:
- **Delivery Timeline:** 15 working days under the Right to Public Services Act.
- **Official Statutory Fee:** ₹ 33.60 standard portal processing fee.

**Safety Caution:** Always use authenticated .gov.in portals. Never share bank details or Aadhaar OTPs with unauthorized third parties.`;
    }
  }

  // 2. Domicile & Nationality Certificate
  if (q.includes('डोमिसाईल') || q.includes('अधिवास') || q.includes('domicile') || q.includes('निवास') || q.includes('nationality')) {
    if (language === 'hi') {
      return `### अधिवास एवं राष्ट्रीयत्व प्रमाण पत्र (Domicile & Nationality Certificate)

**महत्व:** मेडिकल (NEET), इंजीनियरिंग (MHT-CET), पुलिस भर्ती और राज्य सरकारी नौकरियों में राज्य कोटे का लाभ लेने हेतु अनिवार्य।

### १. आवश्यक दस्तावेज:
- **आयु एवं जन्म साक्ष्य:** स्कूल लीविंग सर्टिफिकेट (LC/TC) जिसमें जन्म स्थान अंकित हो, अथवा जन्म प्रमाण पत्र
- **पहचान व पता:** आधार कार्ड, राशन कार्ड और बिजली बिल
- **१५ वर्ष निवास का प्रमाण:** राज्य में लगातार १५ वर्ष रहने का प्रमाण (जैसे पिछले १५ वर्षों के स्कूल दस्तावेज, पुराना राशन कार्ड, या निवास कर रसीद)
- **फोटो व शपथपत्र:** पासपोर्ट साइज फोटो और विहित स्व-घोषणा पत्र

### २. आवेदन की प्रक्रिया:
- **ऑनलाइन:** आपले सरकार पोर्टल (aaplesarkar.mahaonline.gov.in) पर राजस्व विभाग -> 'Age, Nationality & Domicile' सेवा का चयन करें।
- **ऑफलाइन:** तहसील कार्यालय के सेतू केंद्र या सीएससी केंद्र पर मूल प्रतियों के साथ जमा करें।

### ३. समय सीमा एवं शुल्क:
- **कालावधी:** १५ कार्य दिवस।
- **वैधता:** यह प्रमाण पत्र आजीवन (Lifetime) वैध रहता है, इसे बार-बार नवीनीकृत करने की आवश्यकता नहीं होती।
- **सरकारी शुल्क:** ₹ ३३.६०/- मात्र।`;
    } else if (language === 'mr') {
      return `### वय, अधिवास व राष्ट्रीयत्व दाखला (Domicile Certificate)

**महत्व:** इंजिनिअरिंग, मेडिकल (NEET/CET), पोलीस भरती आणि सर्व शासकीय नोकऱ्यांमधील राज्य कोट्याच्या आरक्षणासाठी अनिवार्य.

### १. आवश्यक कागदपत्रे:
- **जन्म व जन्मस्थान पुरावा:** शाळा सोडल्याचा दाखला (LC) ज्यावर जन्मगाव स्पष्ट लिहिलेले असावे किंवा जन्म दाखला
- **ओळख व पत्ता पुरावा:** अर्जदाराचे आधार कार्ड आणि रेशन कार्ड
- **१५ वर्षे वास्तव्याचा पुरावा:** महाराष्ट्रात सलग १५ वर्षे राहत असल्याचे जुने पुरावे (मागील १५ वर्षांतील शाळा दाखले, जुने रेशन कार्ड, जुनी घरपट्टी किंवा लाईट बिले)
- **फोटो व स्वयंघोषणापत्र:** १ पासपोर्ट फोटो व स्वयंघोषणापत्र

### २. अर्ज कुठे करावा:
- **ऑनलाइन:** 'आपले सरकार' पोर्टलवर (aaplesarkar.mahaonline.gov.in) महसूल विभाग -> 'वय, अधिवास व राष्ट्रीयत्व प्रमाणपत्र'.
- **ऑफलाइन:** तालुका तहसीलदार कार्यालयातील सेतू केंद्र किंवा आपले सरकार सेवा केंद्र.

### ३. कालावधी, शुल्क व वैधता:
- **कालावधी:** १५ कार्य दिवस (लोकसेवा हमी कायदा).
- **शासकीय शुल्क:** ₹ ३३.६०/-.
- **वैधता:** हा दाखला एकदा काढल्यावर आयुष्यभरासाठी (Lifetime) वैध असतो. दरवर्षी नवीन काढण्याची गरज नसते.`;
    } else {
      return `### Age, Nationality & Domicile Certificate Guide

**Importance:** Mandatory for claiming state quota in NEET, CET, higher education admissions, and state government jobs.

### 1. Required Supporting Documents:
- **Birthplace Proof:** School Leaving Certificate (LC/TC) mentioning birthplace, or Birth Certificate
- **Identity & Address:** Applicant Aadhaar Card, Ration Card, and Electricity Bill
- **15-Year Continuous Residence Evidence:** Proof of living 15 consecutive years in the state (past 15-year school records, old utility bills, or municipal tax records)
- **Self-Declaration:** Passport size photo & notarized/portal self-declaration form

### 2. Application Process:
- **Online:** Visit Aaple Sarkar (aaplesarkar.mahaonline.gov.in) -> Revenue Department -> Age, Nationality & Domicile Certificate.
- **Offline:** Submit at your local Tahsildar Setu Suvidha Kendra or Citizen Service Center.

### 3. Timeline, Fee & Validity:
- **Statutory Delivery:** 15 working days.
- **Government Fee:** ₹ 33.60.
- **Validity:** Lifetime validity. No need for annual renewal.`;
    }
  }

  // 3. Caste Certificate
  if (q.includes('जात') || q.includes('जाति') || q.includes('caste') || q.includes('obc') || q.includes('sc') || q.includes('st') || q.includes('vjnt')) {
    if (language === 'hi') {
      return `### जाति प्रमाण पत्र (Caste Certificate - SC/ST/OBC/VJNT/SBC)

**उद्देश्य:** शैक्षणिक आरक्षण, छात्रवृत्ति, प्रतियोगी परीक्षाओं और सरकारी सेवाओं में संवैधानिक आरक्षण प्राप्त करने हेतु।

### १. अनिवार्य दस्तावेज:
- **आवेदक दस्तावेज:** स्कूल लीविंग सर्टिफिकेट (LC), आधार कार्ड एवं राशन कार्ड
- **पिता पक्ष के पूर्वज प्रमाण (कट-ऑफ वर्ष से पूर्व):**
  - **SC/ST:** १० अगस्त १९५० से पूर्व का जाति अंकित राजस्व या स्कूल रिकॉर्ड
  - **VJNT:** २१ नवंबर १९६१ से पूर्व का रिकॉर्ड
  - **OBC/SBC:** १३ अक्टूबर १९६७ से पूर्व का रिकॉर्ड (जैसे पिता/दादाजी का स्कूल दाखिला, ७/१२ या जन्म-मृत्यु रजिस्टर)
- **वंशावली प्रतिज्ञापत्र (Vamshavali):** आवेदक से पुराने पूर्वज तक का सीधा रक्तानुक्रम दर्शाने वाला शपथ पत्र

### २. आवेदन कैसे करें:
- **ऑनलाइन:** आपले सरकार पोर्टल पर सामाजिक न्याय विभाग -> 'Caste Certificate' में उपविभागीय अधिकारी (SDO) को आवेदन करें।
- **कालावधी व शुल्क:** ४५ कार्य दिवस; आधिकारिक शुल्क ₹ ३३.६०/-.

**विशेष ध्यान:** उच्च शिक्षा में अंतिम प्रवेश और नौकरी हेतु जाति प्रमाण पत्र के बाद अलग से **जाति वैधता प्रमाण पत्र (Caste Validity)** कराना अनिवार्य होता है।`;
    } else if (language === 'mr') {
      return `### जातीचा दाखला (Caste Certificate - SC/ST/VJNT/OBC/SBC)

**उद्देश्य:** शैक्षणिक आरक्षण, शिष्यवृत्ती आणि शासकीय नोकऱ्यांमधील आरक्षणासाठी उपविभागीय अधिकारी (SDO) यांच्याकडून मिळणारा अधिकृत दाखला.

### १. आवश्यक कागदपत्रे:
- **अर्जदाराची कागदपत्रे:** शाळा सोडल्याचा दाखला (LC), आधार कार्ड आणि रेशन कार्ड
- **वडिलांच्या बाजूचे कट-ऑफ वर्षापूर्वीचे जुने पुरावे:**
  - **SC/ST साठी:** १० ऑगस्ट १९५० पूर्वीचा पुरावा
  - **VJNT साठी:** २१ नोव्हेंबर १९६१ पूर्वीचा पुरावा
  - **OBC/SBC साठी:** १३ ऑक्टोबर १९६७ पूर्वीचा पुरावा (वडिलांचा/आजोबांचा शाळा दाखला, जुना ७/१२ उतारा किंवा कोतवाल नोंद वही उतारा)
- **वंशावळ प्रतिज्ञापत्र:** वडिलांकडील रक्ताच्या नात्यातील वंशावळ शपथपत्र (परिशिष्ट-१)

### २. अर्ज प्रक्रिया व कालावधी:
- **ऑनलाइन:** आपले सरकार पोर्टलवर (aaplesarkar.mahaonline.gov.in) सामाजिक न्याय विभाग निवडून उपविभागीय अधिकारी (SDO) यांच्याकडे अर्ज करावा.
- **कालावधी:** ४५ कार्य दिवस (लोकसेवा हमी कायदा).
- **शासकीय शुल्क:** ₹ ३३.६०/-.

**महत्त्वाची टीप:** जातीच्या दाखल्यासोबत व्यावसायिक अभ्यासक्रमांच्या (इंजिनिअरिंग, मेडिकल, विधी) अंतिम प्रवेशासाठी नंतर **जात पडताळणी प्रमाणपत्र (Caste Validity)** स्वतंत्रपणे करून घेणे आवश्यक असते.`;
    } else {
      return `### Caste Certificate (जातीचा दाखला) Official Procedure

**Purpose:** Essential for constitutional reservation in educational admissions, scholarships, and public sector employment.

### 1. Mandatory Required Documents:
- **Applicant Documents:** School Leaving Certificate (LC), Aadhaar Card, and Ration Card
- **Paternal Ancestral Cut-Off Proofs:**
  - **SC/ST Category:** Prior to 10 August 1950
  - **VJNT Category:** Prior to 21 November 1961
  - **OBC/SBC Category:** Prior to 13 October 1967 (School entry register, old 7/12 land records, or birth/death registry of father/grandfather)
- **Affidavit of Genealogy (Vamshavali):** Notarized family tree establishing direct paternal bloodline

### 2. Application Process:
- **Online:** Apply via Aaple Sarkar portal under Social Justice Department (Issuing Authority: Sub-Divisional Officer / SDO).
- **Statutory Timeline & Fee:** 45 working days; statutory fee ₹ 33.60.

**Key Caution:** For professional collegiate admissions and state employment, a separate **Caste Validity Certificate** is mandatory after obtaining this certificate.`;
    }
  }

  // 4. Ladki Bahin Yojana
  if (q.includes('लाडकी बहीण') || q.includes('ladki bahin') || q.includes('नारी') || q.includes('बहीण')) {
    if (language === 'hi') {
      return `### मुख्यमंत्री माझी लाडकी बहीण योजना (Ladki Bahin Yojana)

**लाभ:** पात्र महिला लाभार्थियों को प्रति माह ₹ १,५००/- की आर्थिक सहायता सीधे बैंक खाते में (DBT) दी जाती है।

### १. पात्रता नियम:
- महाराष्ट्र राज्य की मूल निवासी महिला (आयु २१ से ६५ वर्ष)
- परिवार की कुल वार्षिक आय ₹ २.५० लाख से कम हो (अथवा पीला/केसरी राशन कार्ड धारक)
- महिला का स्वयं का एकल बैंक खाता आधार से लिंक (Aadhaar Seeding / DBT Enabled) होना आवश्यक

### २. आवश्यक दस्तावेज:
- महिला का आधार कार्ड
- अधिवास प्रमाण पत्र (Domicile) अथवा १५ वर्ष पुराना राशन कार्ड / वोटर आईडी
- आय प्रमाण पत्र (वार्षिक आय ₹ २.५० लाख से कम) अथवा पीला/केसरी राशन कार्ड
- बैंक पासबुक (जिसमें खाता संख्या व IFSC कोड स्पष्ट हो)
- हमीपत्र (स्वयं-घोषणा पत्र)

### ३. आवेदन प्रक्रिया:
- **आधिकारिक पोर्टल / ऍप:** 'नारीशक्ती दूत' (Nari Shakti Doot) मोबाइल ऍप अथवा अधिकृत पोर्टल ladakibahin.maharashtra.gov.in.
- **सहायता केंद्र:** ग्राम पंचायत कार्यालय, आंगनवाड़ी सेविका अथवा सेतू केंद्र।`;
    } else if (language === 'mr') {
      return `### मुख्यमंत्री माझी लाडकी बहीण योजना संपूर्ण माहिती

**मिळणारा लाभ:** पात्र महिला लाभार्थ्यांना दरमहा ₹ १,५००/- थेट त्यांच्या आधार संलग्न बँक खात्यात (DBT द्वारे) जमा केले जातात.

### १. पात्रता निकष:
- महिला महाराष्ट्राची रहिवासी असावी (वय २१ ते ६५ वर्षे)
- कुटुंबाचे वार्षिक उत्पन्न ₹ २.५० लाखांपेक्षा जास्त नसावे (किंवा पिवळे/केशरी रेशन कार्ड असावे)
- महिलेचे स्वतःचे वैयक्तिक बँक खाते आधार कार्डशी जोडलेले (Aadhaar NPCI Seeding) असणे अनिवार्य

### २. आवश्यक कागदपत्रे:
- अर्जदार महिलेचे आधार कार्ड
- अधिवास दाखला (Domicile Certificate) किंवा १५ वर्षे वास्तव्याचा पुरावा (रेशन कार्ड / मतदार ओळखपत्र)
- उत्पन्नाचा दाखला (वार्षिक उत्पन्न ₹ २.५० लाखांपेक्षा कमी) किंवा पिवळे/केशरी रेशन कार्ड
- बँक पासबुकची प्रत (बँक खात्याशी आधार लिंक आवश्यक)
- विहित नमुन्यातील हमीपत्र (Self-declaration)

### ३. अर्ज कुठे करावा:
- **मोबाइल ऍप:** 'नारीशक्ती दूत' ऍप किंवा ladakibahin.maharashtra.gov.in पोर्टलवर.
- **ऑफलाइन मदत:** आपल्या गावातील अंगणवाडी सेविका, ग्रामपंचायत कार्यालय किंवा आपले सरकार सेवा केंद्र.`;
    } else {
      return `### Mukhyamantri Majhi Ladki Bahin Yojana Guide

**Financial Benefit:** Eligible women receive ₹ 1,500/- per month directly transferred to their Aadhaar-linked bank account (DBT).

### 1. Eligibility Criteria:
- Resident women of Maharashtra aged 21 to 65 years.
- Family annual income must be below ₹ 2.50 Lakhs (or holding a Yellow/Orange Ration Card).
- Must have an individual bank account seeded with Aadhaar (NPCI active).

### 2. Mandatory Documents:
- Applicant Aadhaar Card
- Domicile Certificate or 15-year old Ration Card / Voter ID
- Income Certificate (< ₹ 2.50 Lakhs) or Yellow/Orange Ration Card
- Bank Passbook with visible Account Number & IFSC
- Signed Self-declaration pledge (Hamipatra)

### 3. Application Route:
- Submit via Nari Shakti Doot App or official ladakibahin.maharashtra.gov.in portal.
- In-person guidance available at local Anganwadi workers and Gram Panchayat counters.`;
    }
  }

  // 5. Ration Card
  if (q.includes('राशन') || q.includes('रेशन') || q.includes('ration')) {
    if (language === 'hi') {
      return `### राशन कार्ड (Ration Card) - नया कार्ड व नाम जोड़ना

### १. राशन कार्ड में नया नाम जोड़ने हेतु दस्तावेज:
- **नवजात शिशु के लिए:** नगर निगम/ग्राम पंचायत का जन्म प्रमाण पत्र + बच्चे का आधार कार्ड
- **विवाहित महिला (बहू) के लिए:** विवाह पंजीकरण प्रमाण पत्र (Marriage Certificate) + आधार कार्ड + मायके के राशन कार्ड से नाम कटने का प्रमाण पत्र (Surrender / Deletion Certificate)
- वर्तमान मूल राशन कार्ड और परिवार मुखिया का आधार

### २. नया राशन कार्ड बनवाने के लिए:
- मुखिया का आधार कार्ड, पैन कार्ड, पासपोर्ट फोटो
- निवास प्रमाण: बिजली बिल या गैस कनेक्शन पासबुक
- पटवारी/तहसीलदार आय प्रमाण पत्र
- परिवार के सभी सदस्यों के आधार कार्ड

### ३. आवेदन प्रक्रिया:
- **ऑनलाइन:** राष्ट्रीय खाद्य सुरक्षा पोर्टल (rcms.mahafood.gov.in / nfsa.gov.in).
- **ऑफलाइन:** तहसील आपूर्ति कार्यालय (Food & Civil Supplies Counter) अथवा सीएससी केंद्र पर 'फॉर्म-ब' भरकर जमा करें।`;
    } else if (language === 'mr') {
      return `### रेशन कार्ड (Ration Card) - नवीन कार्ड व नाव समाविष्ट करणे

### १. रेशन कार्डमध्ये नवीन नाव समाविष्ट करण्यासाठी:
- **लहान बाळ असल्यास:** अधिकृत जन्म दाखला + बाळाचे आधार कार्ड
- **नवीन लग्न झालेली सून असल्यास:** विवाह नोंदणी दाखला + आधार कार्ड + माहेरच्या रेशन कार्डमधून नाव वगळल्याचा दाखला (Deletion Certificate)
- कुटुंबाचे चालू मूळ रेशन कार्ड आणि अर्जदाराचे आधार कार्ड

### २. नवीन रेशन कार्ड काढण्यासाठी:
- कुटुंब प्रमुखाचे आधार कार्ड, फोटो व रहिवासी पुरावा (लाईट बिल)
- तलाठी उत्पन्नाचा दाखला
- कुटुंबातील सर्व सदस्यांची आधार कार्डे
- पूर्वी कोणत्याही रेशन कार्डमध्ये नाव नसल्याचा दाखला

### ३. अर्ज कुठे करावा:
- **ऑफलाइन:** संबंधित तालुका तहसीलदार कार्यालय किंवा अन्नधान्य वितरण अधिकारी (FDO) कार्यालयात 'नमुना-ब' अर्ज सादर करावा.
- **ऑनलाइन:** rcms.mahafood.gov.in वर RCMS सिटीझन पोर्टलवर अर्ज करू शकता.`;
    } else {
      return `### Ration Card Guidelines (New Card & Member Addition)

### 1. Documents for Adding a Family Member:
- **For Newborn Child:** Official Birth Certificate + Child's Aadhaar Card
- **For Newly Married Spouse:** Marriage Registration Certificate + Aadhaar Card + Name Deletion Certificate from parents' ration card
- Original current Ration Card & Head of Family's Aadhaar

### 2. Documents for New Ration Card:
- Head of Family Aadhaar, passport photograph, and electricity bill
- Income verification certificate from Tahsil
- Aadhaar cards of all dependent family members

### 3. Application Process:
- Submit Form B at the local Tahsildar / Food & Civil Supplies Department or online via state food portal (rcms.mahafood.gov.in / nfsa.gov.in).`;
    }
  }

  // 6. Land records (Satbara 7/12)
  if (q.includes('सातबारा') || q.includes('७/१२') || q.includes('7/12') || q.includes('जमीन') || q.includes('फेरफार')) {
    if (language === 'hi') {
      return `### डिजिटल ७/१२ उतारा, ८-अ एवं फेरफार नोंद (Land Records)

**महत्व:** जमीन की कानूनी मिल्कियत, क्षेत्रफल, फसल का प्रकार, बैंक ऋण और रजिस्ट्री के लिए अधिकृत सरकारी दस्तावेज।

### १. डिजिटल हस्ताक्षरित (Digital Signed) ७/१२ कैसे निकालें:
- **आधिकारिक वेबसाइट:** महाभूमि डिजिटल पोर्टल (digitalsatbara.mahabhumi.gov.in).
- **प्रक्रिया:** पोर्टल पर नागरिक खाता बनाएं -> जिला, तालुका, गांव और सर्वे नंबर/गट नंबर चुनें -> मात्र ₹ १५/- सरकारी शुल्क का भुगतान करें।
- **वैधता:** डिजिटल हस्ताक्षर (Digital Signature) युक्त ७/१२ पर किसी तलाठी या अधिकारी की मुहर की आवश्यकता नहीं होती, यह सभी बैंकों व अदालतों में कानूनी रूप से मान्य है।`;
    } else if (language === 'mr') {
      return `### डिजिटल स्वाक्षरीत ७/१२ (सातबारा), ८-अ व फेरफार नोंद

**महत्व:** शेतजमिनीची मालकी, क्षेत्रफळ, पोटखराबा, पीक पाहणी आणि बँक कर्जासाठी ७/१२ व ८-अ उतारा हा सर्वात महत्त्वाचा महसूल दस्तऐवज आहे.

### १. डिजिटल ७/१२ कसा मिळवावा:
- **अधिकृत पोर्टल:** महाभूमीचे अधिकृत पोर्टल (digitalsatbara.mahabhumi.gov.in).
- **पायऱ्या:** पोर्टलवर लॉगिन करा -> जिल्हा, तालुका, गाव निवडा -> गट नंबर किंवा सर्व्हे नंबर टाका -> अवघ्या ₹ १५/- शासकीय शुल्कात डिजिटल स्वाक्षरी असलेला अधिकृत उतारा डाउनलोड करा.
- **वैधता:** या डिजिटल स्वाक्षरीत उताऱ्यावर तलाठी किंवा तहसीलदारांच्या सही-शिक्क्याची आवश्यकता नसते; हा सर्व बँका, न्यायालये व शासकीय कामांसाठी १००% कायदेशीर मान्य आहे.`;
    } else {
      return `### Digitally Signed 7/12 Extract, 8A & Mutation (Ferfar) Guide

**Significance:** Official land revenue document evidencing ownership, survey area, crop details, and encumbrances.

### 1. How to Download Digitally Signed 7/12:
- **Official Portal:** Visit Mahabhumi Digital Portal (digitalsatbara.mahabhumi.gov.in).
- **Steps:** Register citizen account -> Select District, Tahsil, Village -> Enter Survey/Gat Number -> Pay nominal ₹ 15 fee.
- **Legal Validity:** Digitally signed extracts with QR code require no physical stamp or Talathi signature and are 100% legally valid across all banks and courts.`;
    }
  }

  // 7. General Fallback
  if (language === 'hi') {
    return `### फॉर्मसाथी नागरिक सेवा मार्गदर्शक (FormSaathi AI)

नमस्ते! फॉर्मसाथी AI सभी प्रकार के सरकारी प्रमाण पत्रों, राजस्व अभिलेखों एवं कल्याणकारी योजनाओं की सटीक जानकारी प्रदान करता है।

### सामान्य नागरिक दिशा-निर्देश:
1. **प्राथमिक दस्तावेज सदैव तैयार रखें:**
   - आधार कार्ड (सक्रिय मोबाइल नंबर से लिंक होना अनिवार्य)
   - राशन कार्ड (परिवार के सभी सदस्यों के नाम सहित)
   - निवास एवं आयु प्रमाण (बिजली बिल, स्कूल टीसी, जन्म प्रमाण पत्र)
   - आय का साक्ष्य (पटवारी आख्या या वेतन पर्ची)
2. **आधिकारिक पोर्टल पर ही आवेदन करें:**
   - महाराष्ट्र: आपले सरकार (aaplesarkar.mahaonline.gov.in)
   - भारत सरकार: ServicePlus (serviceonline.gov.in), डिजीलॉकर (digilocker.gov.in)
3. **ऑफलाइन सुविधा:**
   - नजदीकी अधिकृत सेतू केंद्र, ग्राम पंचायत अथवा जन सेवा केंद्र (CSC) पर जाएं।

**कृपया बताएं:** आप किस प्रमाण पत्र (जैसे आय, जाति, अधिवास, राशन कार्ड, लाडकी बहीण या ७/१२ उतारा) के संबंध में विस्तृत सहायता चाहते हैं?`;
  } else if (language === 'mr') {
    return `### फॉर्मसाथी शासकीय सेवा मार्गदर्शक (FormSaathi AI)

नमस्कार! फॉर्मसाथी AI सर्व शासकीय दाखले, महसूल नोंदी, शिष्यवृत्ती आणि लोककल्याणकारी योजनांबद्दल अधिकृत व सोपी माहिती देतो.

### मूलभूत शासकीय पायऱ्या:
१. **नेहमी आवश्यक असणारी प्राथमिक कागदपत्रे:**
   - अर्जदाराचे आधार कार्ड (चालू मोबाईल नंबर लिंक असलेले)
   - रेशन कार्डची सत्यप्रत (१२ अंकी आरसी नंबर व कुटुंबियांची नावे)
   - रहिवासी व जन्माचा पुरावा (लाईट बिल, शाळा सोडल्याचा दाखला - LC)
   - उत्पन्नाचा अधिकृत दाखला (तलाठी किंवा सक्षम प्राधिकारी अहवाल)
२. **अधिकृत शासकीय पोर्टलवरच अर्ज करा:**
   - महाराष्ट्र शासन: आपले सरकार (aaplesarkar.mahaonline.gov.in)
   - केंद्र शासन / बहुराज्यीय: ServicePlus (serviceonline.gov.in), महाभूमी (mahabhumi.gov.in), महाडीबीटी (mahadbt.maharashtra.gov.in)
३. **ऑफलाइन सुविधा:**
   - आपल्या गावातील ग्रामपंचायत, तलाठी कार्यालय, सेतू सुविधा केंद्र किंवा आपले सरकार सेवा केंद्रात संपर्क साधा.

**आपणास कोणत्या दाखल्याबद्दल किंवा योजनेबद्दल सविस्तर माहिती हवी आहे?** (उदा. उत्पन्नाचा दाखला, जातीचा दाखला, अधिवास, लाडकी बहीण योजना, रेशन कार्ड किंवा ७/१२ उतारा)`;
  } else {
    return `### FormSaathi Civic Services Intelligence Guide

Hello! FormSaathi AI is your verified guide for all government certificates, revenue records, welfare schemes, and public application procedures.

### Core Citizen Preparation Steps:
1. **Keep Primary Supporting Proofs Ready:**
   - Applicant Aadhaar Card (linked to an active mobile number)
   - Ration Card copy (showing family member enumeration)
   - Address & Birth Proof (Recent utility bill, School Leaving Certificate)
   - Income Proof (Talathi inquiry report or salary slip)
2. **Always Use Authorized State & Central Portals:**
   - State Portals: Aaple Sarkar (aaplesarkar.mahaonline.gov.in), ServicePlus (serviceonline.gov.in)
   - National Portals: DigiLocker (digilocker.gov.in), Parivahan (parivahan.gov.in), UIDAI (uidai.gov.in)
3. **Authorized Physical Counters:**
   - Tahsil Setu Suvidha Kendra, Common Service Center (CSC), or Gram Panchayat citizen counters.

**What specific certificate or welfare scheme can I assist you with today?** (e.g. Income Certificate, Caste Certificate, Domicile, Ladki Bahin Yojana, Ration Card, or 7/12 Land Records)`;
  }
}
