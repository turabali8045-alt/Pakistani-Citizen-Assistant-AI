import { GovService, EmergencyContact, SampleDocument } from '../types';

export const GOV_SERVICES: GovService[] = [
  {
    id: 'cnic-renewal',
    title: {
      en: 'CNIC Online Renewal & Modification',
      ur: 'شناختی کارڈ (CNIC) کی آن لائن تجدید اور تبدیلی',
    },
    category: 'nadra',
    department: 'NADRA (National Database and Registration Authority)',
    shortDesc: {
      en: 'Renew your expired Computerized National Identity Card (CNIC) or update address/marital status online through Pak-Identity portal.',
      ur: 'پاک آئی ڈینٹٹی پورٹل کے ذریعے اپنے میعاد ختم شدہ شناختی کارڈ کی تجدید یا پتہ/ازدواجی حیثیت تبدیل کریں۔',
    },
    eligibility: {
      en: [
        'Pakistani citizen aged 18 or above',
        'Hold an existing valid or expired CNIC/SNIC',
        'Pak-Identity app or website account',
      ],
      ur: [
        'پاکستانی شہری جس کی عمر 18 سال یا اس سے زیادہ ہو',
        'موجودہ شناختی کارڈ موجود ہو',
        'پاک آئی ڈینٹٹی اکاؤنٹ',
      ],
    },
    requiredDocuments: {
      en: [
        'Existing CNIC copy (front & back)',
        'Marriage certificate (Nikahnama) if updating marital status',
        'Proof of address (Electricity/Gas bill or Domicile) if updating address',
        'Passport size white background photograph',
        'Fingerprint attestation form (downloaded & uploaded via Pak-Identity app)',
      ],
      ur: [
        'موجودہ شناختی کارڈ کی کاپی',
        'نکاح نامہ (اگر ازدواجی حیثیت تبدیل کرنی ہو)',
        'رہائش کا ثبوت (بجلی/گیس کا بل یا ڈومیسائل)',
        'پاسپورٹ سائز سفید پس منظر والی تصویر',
        'فنگر پرنٹ فارم (پاک آئی ڈینٹٹی ایپ کے ذریعے)',
      ],
    },
    steps: {
      en: [
        'Download NADRA Pak-Identity app from Play Store/App Store or visit id.nadra.gov.pk',
        'Create an account using your mobile number and email',
        'Select "New Application" -> "CNIC / SNIC Renewal or Modification"',
        'Enter CNIC number, upload photograph and required scanned supporting documents',
        'Pay application fee online using Debit/Credit Card or EasyPaisa/JazzCash',
        'Download fingerprint form, apply ink impressions, scan/upload back or capture fingerprints directly inside Pak-Identity app',
        'Submit application and track status via tracking ID sent on SMS',
      ],
      ur: [
        'پلے اسٹور/ایپ اسٹور سے نادرا Pak-Identity ایپ ڈاؤن لوڈ کریں یا id.nadra.gov.pk پر جائیں',
        'اپنے موبائل نمبر اور ای میل کے ذریعے اکاؤنٹ بنائیں',
        'نیا درخواست والے بٹن پر کلک کریں اور CNIC تجدید کا انتخاب کریں',
        'شناختی کارڈ نمبر درج کریں، تصویر اور مطلوبہ دستاویزات اپ لوڈ کریں',
        'ڈیبٹ/کریڈٹ کارڈ یا ایزی پیسہ/جائز کیش سے فیس ادا کریں',
        'فنگر پرنٹ فارم اپ لوڈ کریں یا ایپ میں بلاواسطہ فنگر پرنٹس اسکین کریں',
        'درخواست جمع کروائیں اور ایس ایم ایس پر ملنے والے ٹریکنگ آئی ڈی سے صورتحال چیک کریں',
      ],
    },
    feeStructure: {
      en: 'Normal: PKR 750 (30 days) | Urgent: PKR 1,500 (15 days) | Executive: PKR 2,500 (7 days)',
      ur: 'نارمل: 750 روپے (30 دن) | ارجنٹ: 1,500 روپے (15 دن) | ایگزیکٹو: 2,500 روپے (7 دن)',
    },
    processingTime: {
      en: '7 to 30 Working Days depending on delivery type selected',
      ur: 'انتخاب کردہ کیٹیگری کے مطابق 7 سے 30 کاری دن',
    },
    officialUrl: 'https://id.nadra.gov.pk',
    helpline: '1777 (from Pakistan) / +92 51 111 786 100',
  },
  {
    id: 'passport-fasttrack',
    title: {
      en: 'e-Passport & Machine Readable Passport Renewal',
      ur: 'ای پاسپورٹ اور مشینی پاسپورٹ کا حصول اور تجدید',
    },
    category: 'passport',
    department: 'Directorate General of Immigration & Passports (DGI&P)',
    shortDesc: {
      en: 'Apply online for e-Passport or Machine Readable Passport (MRP) renewal with home delivery option.',
      ur: 'ای پاسپورٹ یا مشینی پاسپورٹ کی آن لائن تجدید اور ہوم ڈیلیوری حاصل کریں۔',
    },
    eligibility: {
      en: [
        'Valid CNIC / Smart National Identity Card',
        'Existing passport with validity less than 12 months remaining or expired',
        'No active criminal hold or ECL list tag',
      ],
      ur: [
        'میعاد والی نادرا سمارٹ کارڈ / CNIC',
        'موجودہ پاسپورٹ جس کی میعاد 12 ماہ سے کم رہ گئی ہو یا ختم ہو چکی ہو',
      ],
    },
    requiredDocuments: {
      en: [
        'Original valid CNIC / Smart Card and 1 photocopy',
        'Previous original passport and photocopies of first two pages',
        'NOC for Government employees',
        'Parents CNIC copy for applicants under 18 years',
        'Online Passport Fee Challan receipt',
      ],
      ur: [
        'اصل نادرا سمارٹ کارڈ اور 1 فوٹو کاپی',
        'پرانا اصل پاسپورٹ اور پہلے دو صفحات کی فوٹو کاپیاں',
        'سرکاری ملازمین کے لیے NOC',
        'آن لائن پاسپورٹ فیس چالان کی رسید',
      ],
    },
    steps: {
      en: [
        'Visit official portal onlinemrp.dgip.gov.pk or download Passport Fee Asani app to generate fee challan',
        'Pay fee through National Bank of Pakistan (NBP), ATM, Internet Banking, or e-Sahulat',
        'For online renewal, create an account on Directorate General Immigration & Passports portal',
        'Fill personal details, select delivery location (Home delivery or Passport Office pickup)',
        'Upload clear passport-style picture (white background) and scanned CNIC + Old Passport',
        'Submit fingerprint scan page if required and confirm submission',
      ],
      ur: [
        'onlinemrp.dgip.gov.pk پورٹل پر جائیں یا Passport Fee Asani ایپ سے چالان بنا لیں',
        'این بی پی، اے ٹی ایم یا آن لائن بینکنگ سے فیس ادا کریں',
        'پورٹل پر اکاؤنٹ بنا کر تمام ذاتی معلومات درج کریں',
        'پاسپورٹ سائز تصویر اور شناختی کارڈ/پاسپورٹ کے اسکین اپ لوڈ کریں',
        'درخواست جمع کروائیں اور ہوم ڈیلیوری کا انتخاب کریں',
      ],
    },
    feeStructure: {
      en: 'Normal (36 pgs, 5 yrs): PKR 4,500 | Urgent: PKR 7,500 | Fast-Track: PKR 12,500',
      ur: 'نارمل (36 صفحات، 5 سال): 4,500 روپے | ارجنٹ: 7,500 روپے | فاسٹ ٹریک: 12,500 روپے',
    },
    processingTime: {
      en: 'Fast Track: 2 Working Days | Urgent: 4 Days | Normal: 10-15 Working Days',
      ur: 'فاسٹ ٹریک: 2 دن | ارجنٹ: 4 دن | نارمل: 10 سے 15 دن',
    },
    officialUrl: 'https://onlinemrp.dgip.gov.pk',
    helpline: '051-111-344-777',
  },
  {
    id: 'fbr-tax-filer',
    title: {
      en: 'FBR NTN Registration & Active Taxpayer List (ATL) Filer Status',
      ur: 'ایف بی آر این ٹی این رجسٹریشن اور ٹیکس فائلر بننے کا طریقہ',
    },
    category: 'tax',
    department: 'Federal Board of Revenue (FBR) - Iris Portal',
    shortDesc: {
      en: 'Register for National Tax Number (NTN) and file Income Tax Return to become Active Taxpayer (Filer) and save on advance withholding taxes.',
      ur: 'ایف بی آر آئرس پورٹل پر این ٹی این بنائیں اور سالانہ ٹیکس گوشوارے جمع کرا کے فائلر بنیں۔',
    },
    eligibility: {
      en: [
        'Valid CNIC holder',
        'Active personal mobile number registered on applicant CNIC',
        'Salaried employee, business owner, freelancer, or property owner',
      ],
      ur: [
        'میعاد والی نادرا CNIC',
        'اپنے شناختی کارڈ پر رجسٹرڈ موبائل نمبر',
        'ملازمت پیشہ، تاجر، یا فری لانسر',
      ],
    },
    requiredDocuments: {
      en: [
        'CNIC copy',
        'Salary certificate or Employer tax deduction slip (Form 149)',
        'Bank statement for the tax year (July 1 to June 30)',
        'Utility bill of residence / business premises',
        'Proof of assets (Vehicle, Property, Savings certificates)',
      ],
      ur: [
        'شناختی کارڈ کی کاپی',
        'سیلری سرٹیفکیٹ یا ٹیکسٹ کٹوتی کا ثبوت',
        'مالیاتی سال کا بینک سٹیٹمنٹ (1 جولائی سے 30 جون)',
        'رہائش کا بجلی/گیس بل',
        'اثاثہ جات کا ثبوت (گاڑی، جائیداد)',
      ],
    },
    steps: {
      en: [
        'Go to iris.fbr.gov.pk and click "Registration for Unregistered Person"',
        'Enter CNIC, Mobile number (registered on your CNIC), and Email to receive OTP codes',
        'Log in with received password and complete basic profile setup to get NTN',
        'Select "Declaration" -> "114(1) Income Tax Return Form" for relevant Tax Year',
        'Enter annual salary/business income, tax withheld by bank/employer, and personal assets/liabilities in Wealth Statement (116)',
        'Verify numbers, click "Calculate", and submit Return',
        'Check Active Taxpayer List (ATL) status updated every Monday on FBR portal',
      ],
      ur: [
        'iris.fbr.gov.pk پر جائیں اور "Registration for Unregistered Person" پر کلک کریں',
        'شناختی کارڈ، اپنے نام پر رجسٹرڈ سم کا نمبر اور ای میل درج کریں',
        'پاس ورڈ حاصل کر کے لاگ ان کریں اور NTN بنالیں',
        'انکم ٹیکس ریٹرن فارم 114(1) کا انتخاب کریں',
        'سالانہ آمدن، بینک و ٹیکس کٹوتی، اور اپنے اثاثے (Wealth Statement) درج کریں',
        'محاسبہ کر کے جمع کروا دیں، ہر پیر کو اپ ڈیٹ ہونے والی ATL لسٹ میں نام چیک کریں',
      ],
    },
    feeStructure: {
      en: 'NTN Creation: FREE | Late Filing Surcharge (if filing after due date): PKR 1,000 for Salaried',
      ur: 'این ٹی این بنانا مفت ہے | تاریخ کے بعد فائل کرنے پر سرچارج: 1,000 روپے (ملازمت پیشہ)',
    },
    processingTime: {
      en: 'NTN: Instant | ATL Status update: Weekly on Mondays',
      ur: 'این ٹی این: فوری | اے ٹی ایل فہرست: ہر پیر کے روز اپ ڈیٹ',
    },
    officialUrl: 'https://iris.fbr.gov.pk',
    helpline: '051-111-772-772',
  },
  {
    id: 'driving-license',
    title: {
      en: 'Computerized Driving License & Learner Permit',
      ur: 'ڈرائیونگ لائسنس اور لرنر پرمٹ کے حصول کا طریقہ',
    },
    category: 'license',
    department: 'Excise & Taxation / Traffic Police DLIMS',
    shortDesc: {
      en: 'Apply for Learner License online via DLIMS Punjab/Sindh/KPK/ICT portal, sit for computerized traffic sign test, and schedule road driving test.',
      ur: 'لرنر پرمٹ آن لائن حاصل کریں، ٹریفک سائنز کمپیوٹرائزڈ ٹیسٹ اور ڈرائیونگ پریکٹیکل ٹیسٹ پاس کریں۔',
    },
    eligibility: {
      en: [
        'Age 18+ for Motorcar/Motorcycle | Age 21+ for LTV/HTV commercial',
        'Physical fitness and clear eye test',
        'Valid CNIC from concerned province',
      ],
      ur: [
        'موٹر سائیکل/کار کے لیے 18 سال یا زائد عمر',
        'طبی لحاظ سے تندرست اور بینائی کا درست ہونا',
      ],
    },
    requiredDocuments: {
      en: [
        'Original CNIC and 2 clear photocopies',
        '2 passport size photographs with blue background',
        'Medical fitness certificate (Form B signed by registered doctor)',
        'Learner Permit card (at least 42 days old before practical test)',
        'Challan fee paid receipt',
      ],
      ur: [
        'اصل شناختی کارڈ اور 2 فوٹو کاپیاں',
        '2 عدد پاسپورٹ سائز تصاویر',
        'میڈیکل فٹنس سرٹیفکیٹ',
        'لرنر پرمٹ (عملی ٹیسٹ سے 42 دن پرانا ہونا ضروری ہے)',
      ],
    },
    steps: {
      en: [
        'Visit DLIMS portal (dlims.punjab.gov.pk / dlims.sindh.gov.pk) or download DLIMS app',
        'Register account and apply for Learner Permit by uploading CNIC and Photo',
        'Pay learner permit fee (PKR 500) via PSID / e-Pay Punjab / EasyPaisa',
        'Download & print Learner Permit immediately',
        'Wait 42 days mandatory practice period while practicing driving',
        'Book test appointment at nearest Licensing Center for E-Sign test & Driving Track test',
        'Upon passing, permanent license is printed and mailed to your residential address',
      ],
      ur: [
        'DLIMS پورٹل (dlims.punjab.gov.pk) پر جائیں یا ایپ ڈاؤن لوڈ کریں',
        'شناختی کارڈ اور تصویر اپ لوڈ کر کے لرنر پرمٹ کی درخواست دیں',
        '500 روپے چالان بذریعہ ای پے پائیدار انداز میں ادا کریں',
        'لرنر پرمٹ پرنٹ کر لیں اور 42 دن کا انتظار کریں',
        'ٹرائیک/ای سائن کمپیوٹر ٹیسٹ کے لیے سینٹر تشریف لے جائیں اور پاس ہو کر ڈرائیونگ لائسنس ڈاک سے حاصل کریں',
      ],
    },
    feeStructure: {
      en: 'Learner Permit: PKR 500 | Regular License (5 Years): PKR 1,500 - 3,000 depending on vehicle class',
      ur: 'لرنر پرمٹ: 500 روپے | 5 سالہ باقاعدہ لائسنس: 1,500 سے 3,000 روپے',
    },
    processingTime: {
      en: 'Learner Permit: Instant Online | Permanent License: 42 Days after permit + test day delivery',
      ur: 'لرنر پرمٹ: آن لائن فوری | باقاعدہ لائسنس: 42 دن بعد بذریعہ ڈاک',
    },
    officialUrl: 'https://dlims.punjab.gov.pk',
    helpline: '15 (Traffic Police Helpline)',
  },
  {
    id: 'bisp-kafalat',
    title: {
      en: 'BISP 8171 Ehsaas Kafalat Financial Assistance',
      ur: 'بی آئی ایس پی (BISP) 8171 کفالت پروگرام میں شمولیت',
    },
    category: 'social',
    department: 'Benazir Income Support Programme (BISP)',
    shortDesc: {
      en: 'Check eligibility via 8171 SMS portal or conduct NSER dynamic survey at nearest Tehsil center for quarterly cash grant.',
      ur: '8171 ایس ایم ایس کے ذریعے اہلیت چیک کریں اور تحصیل سینٹر سے متحرک سروے کروائیں۔',
    },
    eligibility: {
      en: [
        'Deserving female head of household with valid CNIC',
        'Poverty Means Test (PMT) score below threshold (generally PMT <= 32)',
        'No active government employment or high-value vehicle/property registered in name',
      ],
      ur: [
        'مستحق مستورات جن کا اپنا میعاد والا نادرا CNIC ہو',
        'پوورٹی اسکور (PMT) طے شدہ حد سے کم ہونا',
        'کوئی سرکاری نوکری یا بڑی جائیداد نہ ہونا',
      ],
    },
    requiredDocuments: {
      en: [
        'Original CNIC of female household head',
        'B-Form / Child Registration Certificates (CRC) of all children for Taleemi Wazaif',
        'Active mobile phone number',
      ],
      ur: [
        'خاتون سربراہ کا اصل شناختی کارڈ',
        'بچوں کے نادرا ب فارم (تعلیمی وظائف کے لیے)',
        'فعال موبائل نمبر',
      ],
    },
    steps: {
      en: [
        'Send CNIC number (without dashes) via SMS to 8171 to check current status',
        'If status requests survey update, visit the nearest BISP Tehsil Registration Center along with CNIC and children B-Forms',
        'Undergo the NSER Dynamic Survey interview conducted by BISP survey officer',
        'Receive SMS confirmation from 8171 once dynamic survey data is processed',
        'Collect quarterly stipend (PKR 10,500+) from designated biometric ATM machines or campsite centers',
      ],
      ur: [
        'اپنا شناختی کارڈ نمبر 8171 پر ایس ایم ایس کریں اور اپنی صورتحال معلوم کریں',
        'اگر سروے کی ہدایت ہو تو قریبی بی آئی ایس پی تحصیل سینٹر تشریف لے جائیں',
        'این ایس ای آر متحرک ڈائنامک سروے کا اندراج کروائیں',
        '8171 سے تصدیقی ایس ایم ایس موصول ہونے پر نامزد ایچ بی ایل کنیکٹ / بینک الفلاح بائیو میٹرک اے ٹی ایم سے سہ ماہی قسط حاصل کریں',
      ],
    },
    feeStructure: {
      en: 'FREE - No application or survey fee. Beware of fake agents asking for money!',
      ur: 'مکمل مفت! کسی ایجنٹ کو پیسے نہ دیں۔ تمام خدمات مفت ہیں!',
    },
    processingTime: {
      en: 'Survey processing: 30-60 Days | Stipends disbursed quarterly',
      ur: 'سروے کا وقت: 30 سے 60 دن | رقم سہ ماہی بنیادوں پر ادا کی جاتی ہے',
    },
    officialUrl: 'https://8171.bisp.gov.pk',
    helpline: '0800-26477',
  },
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'rescue-1122',
    title: {
      en: 'Rescue 1122 (Ambulance, Fire, Emergency)',
      ur: 'ریسکیو 1122 (ایمبولینس، فائر بریگیڈ، ہنگامی امداد)',
    },
    number: '1122',
    department: 'Emergency Services Department',
    category: 'medical',
    description: {
      en: 'Primary 24/7 medical ambulance, fire rescue, building collapse, and water rescue service across Punjab, KPK, Balochistan & Azad Kashmir.',
      ur: 'پاکستان کی سب سے بڑی 24 گھنٹے مفت ایمبولینس، آگ بجھانے اور ہنگامی ریسکیو سروس۔',
    },
  },
  {
    id: 'police-15',
    title: {
      en: 'Police Emergency Helpline',
      ur: 'پولیس ایمرجنسی ہیلپ لائن 15',
    },
    number: '15',
    department: 'Pakistan Police',
    category: 'police',
    description: {
      en: 'Immediate emergency police response for crimes, robberies, accidents, street safety, and urgent law enforcement support.',
      ur: 'جرائم، ڈکیتی، سڑک حادثات اور ہنگامی قانون نافذ کرنے والی ہیلپ لائن۔',
    },
  },
  {
    id: 'edhi-115',
    title: {
      en: 'Edhi Foundation Emergency Service',
      ur: 'ایدھی فاؤنڈیشن ایمرجنسی سروس',
    },
    number: '115',
    department: 'Edhi Foundation',
    category: 'medical',
    description: {
      en: 'Nationwide welfare emergency ambulance network, air ambulance, burial services, and disaster response.',
      ur: 'پورے پاکستان میں پھیلی ہوئی سب سے بڑی ویلفیئر ایمبولینس اور ہنگامی ریلیف سروس۔',
    },
  },
  {
    id: 'women-1099',
    title: {
      en: 'National Women Helpline',
      ur: 'خواتین کے تحفظ کی قومی ہیلپ لائن',
    },
    number: '1099',
    department: 'Ministry of Human Rights',
    category: 'women',
    description: {
      en: 'Legal assistance, protection against domestic violence, harassment, and legal aid for women.',
      ur: 'خواتین کو گھریلو تشدد، ہراسانی اور قانونی تحفظ کی مفت سہولت فراہم کرتی ہے۔',
    },
  },
  {
    id: 'fia-cybercrime-1991',
    title: {
      en: 'FIA Cybercrime Helpline',
      ur: 'ایف آئی اے سائبر کرائم ہیلپ لائن',
    },
    number: '1991',
    department: 'Federal Investigation Agency (FIA)',
    category: 'cyber',
    description: {
      en: 'Report online harassment, financial scam, unauthorized access, fake social media accounts, and blackmails.',
      ur: 'آن لائن ہراسگی، مالیاتی فراڈ، بلیک میلنگ اور سائبر کرائم کی شکایت درج کروائیں۔',
    },
  },
  {
    id: 'child-1121',
    title: {
      en: 'Child Protection Helpline',
      ur: 'چائلڈ پروٹیکشن ہیلپ لائن',
    },
    number: '1121',
    department: 'Child Protection & Welfare Bureau',
    category: 'child',
    description: {
      en: 'Report child abuse, child labor, runaway children, or lost child rescue.',
      ur: 'بچوں سے مشقت، تشدد اور گمشدہ بچوں کی فوری حفاظت اور مدد کے لیے۔',
    },
  },
  {
    id: 'motorway-130',
    title: {
      en: 'National Highways & Motorway Police',
      ur: 'موٹروے پولیس ہیلپ لائن 130',
    },
    number: '130',
    department: 'NHMP',
    category: 'police',
    description: {
      en: 'Emergency vehicle breakdown assistance, accident help, and road condition status on highways & motorways.',
      ur: 'موٹروے اور قومی شاہراہوں پر گاڑی خراب ہونے یا حادثے کی صورت میں فوری امداد۔',
    },
  },
  {
    id: 'ndma-1070',
    title: {
      en: 'NDMA Disaster Relief Helpline',
      ur: 'این ڈی ایم اے قدرتی آفات و سیلاب ہیلپ لائن',
    },
    number: '1070',
    department: 'National Disaster Management Authority',
    category: 'disaster',
    description: {
      en: 'Flood updates, earthquake alerts, storm evacuation, and disaster relief coordination.',
      ur: 'سیلاب، زلزلے، طوفان اور قدرتی آفات کے لیے ہنگامی کنٹرول روم۔',
    },
  },
];

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    id: 'lesco-bill',
    title: {
      en: 'LESCO Electricity Bill Sample',
      ur: 'لیسکو بجلی کے بل کی مثال',
    },
    category: 'Electricity Bill',
    description: 'Sample LESCO bill showing 340 units, Fuel Price Adjustment (FPA), TV Fee, and Electricity Duty.',
    sampleText: `LAHORE ELECTRIC SUPPLY COMPANY (LESCO)
Reference No: 14-11234-5678901 U
Consumer Name: Muhammad Tariq
Address: House 45, Street 12, Gulberg III, Lahore
Tariff: A-1a(01) Single Phase Un-Protected
Units Consumed: 340 kWh
Billing Month: June 2026

CHARGE BREAKDOWN:
Electricity Cost (340 units): PKR 9,860.00
Fuel Price Adjustment (FPA): PKR 1,870.00
FC Surcharge: PKR 1,122.00
Quarter Tariff Adj (QTA): PKR 850.00
Electricity Duty: PKR 147.90
TV Fee: PKR 35.00
GST (18%): PKR 2,499.00
Total Amount Payable Within Due Date: PKR 16,383.90
Due Date: 12-JUL-2026
Late Payment Surcharge: PKR 1,200.00
Amount Payable After Due Date: PKR 17,583.90`,
  },
  {
    id: 'nadra-token',
    title: {
      en: 'NADRA Token Slip Sample',
      ur: 'نادرا ٹوکن سلپ کی مثال',
    },
    category: 'Identity Document',
    description: 'NADRA Executive counter token slip for Smart CNIC modification.',
    sampleText: `NATIONAL DATABASE & REGISTRATION AUTHORITY (NADRA)
Executive Center Liberty Lahore
Tracking ID: 8000-1234-5678
Applicant Name: Fatima Bibi
Service Type: Smart CNIC Marital Status Modification (Executive)
Application Date: 15-JUL-2026
Fee Paid: PKR 2,500.00 (Paid via EasyPaisa)
Status: Processing - Biometrics Completed

REQUIRED ACTION:
Please download Pak-Identity app within 7 days to verify applicant fingerprint & submit attester CNIC detail if required.
Estimated Delivery Date: 22-JUL-2026 via Pakistan Post Home Delivery.`,
  },
  {
    id: 'fbr-notice',
    title: {
      en: 'FBR Iris Tax Notice Sample',
      ur: 'ایف بی آر آئرس ٹیکس نوٹس',
    },
    category: 'Tax Notice',
    description: 'FBR Notice under Section 114(4) regarding un-filed tax return.',
    sampleText: `GOVERNMENT OF PAKISTAN - FEDERAL BOARD OF REVENUE
Office of the Commissioner Inland Revenue, Zone-I, Islamabad
Notice U/S 114(4) of the Income Tax Ordinance, 2001
Notice ID: 1000984721
Date: 10-JUN-2026

To: Ali Ahmed (NTN / CNIC: 35202-1234567-1)
Subject: NOTICE FOR FURNISHING RETURN OF INCOME FOR TAX YEAR 2025

WHEREAS, as per FBR Iris data records, financial transactions, vehicle purchase, or bank profit tax deductions exceed statutory limits, but no Income Tax Return has been submitted for Tax Year 2025.

YOU ARE HEREBY REQUIRED to furnish your Return of Income on or before 30-JUL-2026.
Failure to comply may result in ex-parte assessment U/S 121 and penalty U/S 182 (minimum PKR 40,000).`,
  },
];
