import { CompanySettings, ServiceItem } from '../types';

import heroImg from '../assets/images/hero_sama_logistics_1793754450760.webp';
import oceanFreightImg from '../assets/images/service_ocean_freight_1793754466232.webp';
import airFreightImg from '../assets/images/service_air_freight_1793754453249.webp';
import customsImg from '../assets/images/service_customs_clearance_1793754453600.webp';
import logoImg from '../assets/images/sama_capital_brand_logo_1793754451811.webp';
import portAerialImg from '../assets/images/modern_cargo_port_aerial_1793755336369.webp';

export const INITIAL_COMPANY_SETTINGS: CompanySettings = {
  nameAr: 'سما كابيتال',
  nameEn: 'SAMA CAPITAL',
  taglineAr: 'الاستيراد وخدمات الشحن والتخليص الجمركي',
  taglineEn: 'Import, Shipping & Customs Clearance',
  phoneYemen: '+967783339992',
  phoneChina: '+8618629282407',
  whatsappNumber: '+967783339992',
  email: 'info@samacapital.ye',
  addressAr: 'صنعاء، دار سلم، أمام محطة الدار الحديث',
  addressEn: 'Sana\'a, Dar Salm, Opposite Al-Dar Al-Hadeeth Station',
  workingHoursAr: 'السبت - الخميس: 8:00 صباحاً - 8:00 مساءً',
  workingHoursEn: 'Sat - Thu: 8:00 AM - 8:00 PM',
  announcementAr: 'خدمات الشحن البحري والجوي المنتظمة من موانئ ومطارات الصين إلى جميع المحافظات اليمنية',
  announcementEn: 'Regular sea & air freight from China major hubs to all governorates across Yemen',
  isAnnouncementActive: true
};

export const IMAGES = {
  hero: heroImg,
  oceanFreight: oceanFreightImg,
  airFreight: airFreightImg,
  customs: customsImg,
  logo: logoImg,
  portAerial: portAerialImg,
};

export interface ShippingCorridor {
  id: string;
  originNameAr: string;
  originNameEn: string;
  originCode: string;
  destinationNameAr: string;
  destinationNameEn: string;
  destinationCode: string;
  mode: 'sea_fcl' | 'sea_lcl' | 'air';
  modeLabelAr: string;
  modeLabelEn: string;
  typicalDurationAr: string;
  typicalDurationEn: string;
  departureFrequencyAr: string;
  departureFrequencyEn: string;
  clearancePortAr: string;
  clearancePortEn: string;
}

export const SHIPPING_CORRIDORS: ShippingCorridor[] = [
  {
    id: 'corridor-1',
    originNameAr: 'نينغبو (Ningbo)',
    originNameEn: 'Ningbo Port',
    originCode: 'CNNGB',
    destinationNameAr: 'صنعاء (عبر ميناء عدن)',
    destinationNameEn: 'Sana\'a (via Aden)',
    destinationCode: 'YESAH',
    mode: 'sea_fcl',
    modeLabelAr: 'شحن بحري - حاوية كاملة (FCL)',
    modeLabelEn: 'Ocean Freight (FCL 20ft / 40ft)',
    typicalDurationAr: '18 - 24 يوماً بحرياً',
    typicalDurationEn: '18 - 24 Sea Transit Days',
    departureFrequencyAr: 'رحلات بحرية أسبوعية منتظمة',
    departureFrequencyEn: 'Regular Weekly Sailing',
    clearancePortAr: 'ميناء عدن للحاويات + نقل داخلي',
    clearancePortEn: 'Aden Container Port + Domestic Haulage'
  },
  {
    id: 'corridor-2',
    originNameAr: 'إيوو (Yiwu) مركز التجميع',
    originNameEn: 'Yiwu Consolidation Hub',
    originCode: 'CNYIW',
    destinationNameAr: 'صنعاء وعدن وجميع المحافظات',
    destinationNameEn: 'Sana\'a, Aden & All Governorates',
    destinationCode: 'YEYEM',
    mode: 'sea_lcl',
    modeLabelAr: 'شحن بحري مشترك جزئي (LCL)',
    modeLabelEn: 'Ocean Consolidation (LCL)',
    typicalDurationAr: '20 - 28 يوماً',
    typicalDurationEn: '20 - 28 Transit Days',
    departureFrequencyAr: 'تجميع أسبوعي مستمر',
    departureFrequencyEn: 'Ongoing Weekly Stuffing',
    clearancePortAr: 'تخليص جمركي موحد ونقل للمستودع',
    clearancePortEn: 'Unified Customs Entry & Warehouse Dispatch'
  },
  {
    id: 'corridor-3',
    originNameAr: 'غوانزو / شنجن (Guangzhou / Shenzhen)',
    originNameEn: 'Guangzhou / Shenzhen Air Gateway',
    originCode: 'CNCAN',
    destinationNameAr: 'صنعاء (مطار / مكتب الاستلام)',
    destinationNameEn: 'Sana\'a Air Terminal',
    destinationCode: 'YESAA',
    mode: 'air',
    modeLabelAr: 'شحن جوي سريع (Air Cargo)',
    modeLabelEn: 'Expedited Air Freight',
    typicalDurationAr: '4 - 7 أيام عمل',
    typicalDurationEn: '4 - 7 Business Days',
    departureFrequencyAr: 'رحلات جوية متكررة أسبوعياً',
    departureFrequencyEn: 'Multiple Flights Weekly',
    clearancePortAr: 'إجراءات جمركية جوية سريعة',
    clearancePortEn: 'Rapid Air Terminal Clearance'
  },
  {
    id: 'corridor-4',
    originNameAr: 'شنجن (Shenzhen Port)',
    originNameEn: 'Shenzhen Port',
    originCode: 'CNSZX',
    destinationNameAr: 'الحديدة والمحافظات الغربية',
    destinationNameEn: 'Hodeidah & Western Region',
    destinationCode: 'YEHOD',
    mode: 'sea_fcl',
    modeLabelAr: 'شحن بحري حاويات تجارية',
    modeLabelEn: 'Commercial Ocean Freight',
    typicalDurationAr: '20 - 25 يوماً',
    typicalDurationEn: '20 - 25 Transit Days',
    departureFrequencyAr: 'حجوزات مجدولة',
    departureFrequencyEn: 'Scheduled Vessel Bookings',
    clearancePortAr: 'تخليص مباشر ونقل للمستودعات',
    clearancePortEn: 'Direct Berth Discharge & Trucking'
  }
];


export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'import-services',
    slug: 'commercial-import',
    category: 'import',
    titleAr: 'خدمات الاستيراد والتوريد',
    titleEn: 'Commercial Import & Sourcing',
    shortDescAr: 'مساندة التجار والشركات في تنسيق استيراد البضائع، ومتابعة المصانع المعتمدة في الصين حتى وصول الشحنة.',
    shortDescEn: 'Assisting merchants and companies with sourcing coordination, verified Chinese suppliers, and complete import workflow.',
    fullDescAr: 'نوفر حلول استيراد متكاملة تبدأ من تأكيد مواصفات البضائع، والتواصل مع المصانع والموردين في الصين، والتأكد من سلامة تجهيز الشحنات ومطابقة الفواتير، وصولاً إلى استلامها في اليمن.',
    fullDescEn: 'Comprehensive import solutions covering product specification validation, liaison with manufacturers and suppliers in China, quality packing inspection, and complete cargo handoff in Yemen.',
    featuresAr: [
      'التنسيق مع المصانع والأسواق الرئيسية (إيوو، غوانزو، شنجن)',
      'مراجعة الفواتير وقوائم التعبئة لضمان مطابقة الشروط الجمركية',
      'تجميع الشحنات وتنسيق المستودعات قبل الإرسال',
      'متابعة وثائق المنشأ والمطابقة المعتمدة'
    ],
    featuresEn: [
      'Coordination with prime industrial hubs (Yiwu, Guangzhou, Shenzhen)',
      'Review of commercial invoices & packing lists to meet customs standards',
      'Cargo consolidation and secure staging prior to dispatch',
      'Verification of certificates of origin and compliant documentation'
    ],
    requirementsAr: [
      'وصف تفصيلي أو صور للمنتجات المطلوبة',
      'بيانات المورد الصيني (في حال وجوده مسبقاً)',
      'الكميات التقريبية والمواصفات الفنية'
    ],
    requirementsEn: [
      'Detailed item descriptions or product photos',
      'Chinese supplier contact details (if pre-selected)',
      'Estimated quantities and technical specifications'
    ],
    image: IMAGES.hero,
    isActive: true
  },
  {
    id: 'sea-freight',
    slug: 'ocean-freight',
    category: 'sea',
    titleAr: 'الشحن البحري للحاويات',
    titleEn: 'Ocean Container Freight',
    shortDescAr: 'شحن الحاويات الكاملة (FCL) والشحنات الجزئية (LCL) من الموانئ الصينية إلى الموانئ اليمنية والمنافذ المجاورة.',
    shortDescEn: 'Full Container Loads (FCL) and Less than Container Loads (LCL) from major Chinese seaports to Yemeni ports.',
    fullDescAr: 'خدمات شحن بحري موثوقة تلبي احتياجات مختلف أحجام البضائع التجارية، عبر خطوط ملاحية معتمدة، مع متابعة دقيقة لحركة الحاويات وجداول الإبحار.',
    fullDescEn: 'Dependable ocean shipping services for commercial cargo of all scales, utilizing established shipping lines with meticulous voyage tracking and container management.',
    featuresAr: [
      'شحن الحاويات الكاملة 20 قدم و 40 قدم و High Cube',
      'شحن الطرود الجزئية والمشتركة LCL بتكلفة مدروسة',
      'ربط مباشر بين موانئ نينغبو، شنغهاي، شنجن، وقوانغتشو',
      'تأمين ومتابعة دقيقة لمسار الحاوية'
    ],
    featuresEn: [
      'Full Container Loads: 20ft, 40ft & High Cube options',
      'Consolidated LCL shipments for cost-optimized smaller loads',
      'Direct links between Ningbo, Shanghai, Shenzhen, and Guangzhou ports',
      'Careful voyage surveillance and container safeguarding'
    ],
    requirementsAr: [
      'قائمة التعبئة (Packing List) متضمنة الأبعاد والوزن',
      'الفاتورة التجارية (Commercial Invoice)',
      'ميناء الشحن المطلوب وميناء الوصول المستهدف'
    ],
    requirementsEn: [
      'Packing List detailing dimensions and weights',
      'Commercial Invoice with cargo valuation',
      'Preferred port of loading and discharge port'
    ],
    image: IMAGES.oceanFreight,
    isActive: true
  },
  {
    id: 'air-freight',
    slug: 'air-cargo',
    category: 'air',
    titleAr: 'الشحن الجوي السريع',
    titleEn: 'Expedited Air Freight',
    shortDescAr: 'حلول شحن جوي آمنة وسريعة للشحنات التجارية العاجلة، العينات، البضائع الثمينة، وقطع الغيار.',
    shortDescEn: 'Fast and secure air freight solutions for urgent commercial cargo, samples, valuable commodities, and spare parts.',
    fullDescAr: 'نوفر خدمة شحن جوي متميزة تتيح نقل البضائع الحساسة للوقت من مطارات الصين الرئيسية بأسرع وقت وأعلى درجات الأمان ومتابعة دقيقة حتى التسليم.',
    fullDescEn: 'Premium air cargo service delivering time-sensitive shipments from prime Chinese airports with maximum transit velocity, secure handling, and real-time operational updates.',
    featuresAr: [
      'مناسب للشحنات العاجلة والطرود ذات القيمة العالية',
      'تجهيز فوري للبوالص الجوية (Air Waybills)',
      'إجراءات فحص أمني وتغليف مطابق لمعايير الطيران الدولي',
      'تنسيق استلام سريع فور الوصول للمطار'
    ],
    featuresEn: [
      'Optimized for rapid turnaround and high-value consignments',
      'Rapid air waybill generation and compliance clearance',
      'Security screening and packaging in line with IATA regulations',
      'Expedited ramp retrieval and terminal transfer'
    ],
    requirementsAr: [
      'طبيعة المادة وهل تحتوي على بطاريات أو سوائل',
      'الأبعاد الدقيقة والوزن الإجمالي والحجمي',
      'بوليصة ومستندات المنشأ والمصنع'
    ],
    requirementsEn: [
      'Material classification (noting any batteries, liquids, or magnets)',
      'Precise dimensions, gross weight, and volumetric data',
      'Commercial documentation and export clearances'
    ],
    image: IMAGES.airFreight,
    isActive: true
  },
  {
    id: 'customs-clearance',
    slug: 'customs-brokerage',
    category: 'clearance',
    titleAr: 'التخليص الجمركي المتخصص',
    titleEn: 'Professional Customs Clearance',
    shortDescAr: 'إنهاء المعاملات والإجراءات الجمركية باحترافية وسرعة في المنافذ والموانئ اليمنية والمنافذ البرية.',
    shortDescEn: 'Professional and swift customs processing across Yemeni seaports, land borders, and transit checkpoints.',
    fullDescAr: 'فريق متخصص يمتلك دراية دقيقة بالتعريفات الجمركية، واللوائح المنظمة للاستيراد في اليمن، لضمان إنهاء الإجراءات القانونية بدون تأخير وتفادي غرامات الأرضيات.',
    fullDescEn: 'Dedicated customs clearance team with in-depth knowledge of tariffs, HS codes, and import regulations in Yemen, ensuring rapid discharge and avoidance of unnecessary demurrage fees.',
    featuresAr: [
      'فحص وتدقيق الوثائق الجمركية قبل وصول الشحنة',
      'معالجة سريعة لشهادات الفحص والمقاييس',
      'حساب دقيق للرسوم والضرائب الجمركية المعتمدة',
      'متابعة لجان المعاينة والتفتيش الجمركي الرسمي'
    ],
    featuresEn: [
      'Pre-arrival document auditing to eliminate port bottlenecks',
      'Efficient liaison for standard and quality control certificates',
      'Accurate assessment of legitimate customs duties and tariffs',
      'On-site presence during physical inspection procedures'
    ],
    requirementsAr: [
      'بوليصة الشحن الأصلية (Bill of Lading / AWB)',
      'الفاتورة التجارية وقائمة التعبئة المعتمدة',
      'شهادة المنشأ الرسمية وأي تصاريح خاصة بنوع البضاعة'
    ],
    requirementsEn: [
      'Original Bill of Lading or Air Waybill',
      'Certified Commercial Invoice and detailed Packing List',
      'Certificate of Origin and any product-specific regulatory approvals'
    ],
    image: IMAGES.customs,
    isActive: true
  },
  {
    id: 'domestic-transport',
    slug: 'domestic-haulage',
    category: 'domestic',
    titleAr: 'النقل والتوزيع الداخلي في اليمن',
    titleEn: 'Domestic Haulage & Distribution',
    shortDescAr: 'أسطول نقل بضائع يغطي المحافظات والمدن اليمنية (صنعاء، عدن، الحديدة، تعز، حضرموت...) بأمان.',
    shortDescEn: 'Reliable freight transport network covering major Yemeni cities (Sana\'a, Aden, Hodeidah, Taiz, Hadramout...).',
    fullDescAr: 'خدمة نقل بري متكاملة لنقل الحاويات والبضائع المخلصة جمركياً من الموانئ والمنافذ وتسليمها إلى مستودعات العميل ومقراته في كافة أنحاء اليمن.',
    fullDescEn: 'Comprehensive domestic haulage taking cleared containers and cargo from discharge ports straight to customer warehouses, retail hubs, and depots across all Yemeni governorates.',
    featuresAr: [
      'تغطية واسعة تشمل صنعاء، عدن، الحديدة، مأرب، تعز، والمكلا',
      'شاحنات مخصصة لنقل الحاويات 20 و 40 قدم والطرود الكبيرة',
      'سائقون محترفون ذوو دراية بطرق النقل والسلامة',
      'تسليم مباشر إلى المستودع أو المتجر مع سند استلام رسمي'
    ],
    featuresEn: [
      'Wide network: Sana\'a, Aden, Hodeidah, Marib, Taiz, Mukalla, etc.',
      'Dedicated trailers for 20ft & 40ft containers and oversized cargo',
      'Experienced commercial drivers with route familiarity and cargo safety',
      'Direct warehouse and store delivery with formal proof of delivery'
    ],
    requirementsAr: [
      'إذن التسليم بعد اكتمال التخليص الجمركي',
      'عنوان المستودع ومسؤول الاستلام ورقم هاتفه',
      'أي متطلبات تفريغ خاصة (ونش، رافعة شوكية)'
    ],
    requirementsEn: [
      'Delivery order release following customs clearance',
      'Warehouse destination address and site contact credentials',
      'Offloading specifications (crane, forklift accessibility)'
    ],
    image: IMAGES.hero,
    isActive: true
  },
  {
    id: 'corporate-cargo',
    slug: 'commercial-cargo',
    category: 'corporate',
    titleAr: 'حلول شحن للشركات والمصانع',
    titleEn: 'Corporate & Industrial Logistics',
    shortDescAr: 'خدمات لوجستية متخصصة للتجار والمؤسسات والمصانع تشمل إدارة عقود التوريد وسلاسل الإمداد.',
    shortDescEn: 'Tailored logistics for enterprises and manufacturers, managing supply chains, regular replenishment, and priority scheduling.',
    fullDescAr: 'نوفر حلولاً استراتيجية للمصانع والشركات التجارية التي تعتمد على توريدات دورية، مع أسعار شحن تنافسية ومتابعة مخصصة عبر مدير حساب تنفيذي.',
    fullDescEn: 'Strategic enterprise logistics for manufacturers and trading houses requiring regular cargo flows, competitive volume pricing, and dedicated account management.',
    featuresAr: [
      'متابعة خاصة وتنسيق مباشر مع ممثلينا في اليمن والصين',
      'تقارير دورية وجداول شحن منتظمة لتفادي انقطاع المخزون',
      'حلول مرنة ومدروسة لتقليل التكاليف التشغيلية',
      'أولوية في ترتيبات التخليص والمناولة'
    ],
    featuresEn: [
      'Dedicated operational liaisons in both Yemen and China',
      'Regular schedule reports to ensure zero production downtime',
      'Cost-optimized consolidation and shipping schedules',
      'Priority clearance, staging, and dispatch handling'
    ],
    requirementsAr: [
      'السجل التجاري أو الترخيص الصناعي للمنشأة',
      'خطة التوريد وجداول الشحنات المتوقعة',
      'تحديد نوع البضائع والموانئ المستهدفة'
    ],
    requirementsEn: [
      'Commercial registration or industrial license',
      'Projected replenishment schedule and cargo volume',
      'Target origin and destination operational nodes'
    ],
    image: IMAGES.oceanFreight,
    isActive: true
  }
];

export const DESTINATIONS = [
  {
    countryAr: 'الصين',
    countryEn: 'China',
    role: 'origin',
    hubs: [
      { nameAr: 'غوانزو (Guangzhou)', nameEn: 'Guangzhou', type: 'port_airport', descAr: 'مركز تجميع وشحن رئيسي للبضائع العامة ومصانع الجنوب' },
      { nameAr: 'إيوو (Yiwu)', nameEn: 'Yiwu', type: 'logistics_hub', descAr: 'أكبر سوق للبضائع الاستهلاكية والصغيرة والتجميع' },
      { nameAr: 'شنجن (Shenzhen)', nameEn: 'Shenzhen', type: 'port_airport', descAr: 'ميناء وبوابة الإلكترونيات والتقنية المتقدمة' },
      { nameAr: 'نينغبو (Ningbo)', nameEn: 'Ningbo', type: 'seaport', descAr: 'أحد أكبر موانئ العالم لشحن الحاويات الثقيلة والصناعية' },
      { nameAr: 'شنغهاي (Shanghai)', nameEn: 'Shanghai', type: 'seaport', descAr: 'ميناء تجاري عالمي لربط مختلف المقاطعات الصينية' }
    ]
  },
  {
    countryAr: 'اليمن',
    countryEn: 'Yemen',
    role: 'destination',
    hubs: [
      { nameAr: 'صنعاء (Sana\'a)', nameEn: 'Sana\'a', type: 'hq_hub', descAr: 'المكتب الرئيسي، مستودعات الاستلام، ومركز التوزيع (دار سلم)' },
      { nameAr: 'عدن (Aden)', nameEn: 'Aden', type: 'seaport', descAr: 'ميناء الحاويات والتخليص الجمركي البحري' },
      { nameAr: 'الحديدة (Hodeidah)', nameEn: 'Hodeidah', type: 'seaport', descAr: 'منفذ بحري استراتيجي لخدمة المحافظات الشمالية والغربية' },
      { nameAr: 'المكلا - حضرموت', nameEn: 'Mukalla - Hadramout', type: 'seaport', descAr: 'ميناء حيوي يغطي المحافظات الشرقية والوسطى' },
      { nameAr: 'تعز وإب ومأرب وذمار', nameEn: 'Taiz, Ibb, Marib, Dhamar', type: 'distribution', descAr: 'شبكة نقل وتوزيع داخلي آمنة تسلم حتى باب العميل' }
    ]
  }
];

export const FAQS = [
  {
    categoryAr: 'خدمات الشحن',
    categoryEn: 'Shipping Services',
    questions: [
      {
        qAr: 'ما الفرق بين شحن الحاوية الكاملة (FCL) والشحن الجزئي (LCL)؟',
        qEn: 'What is the difference between Full Container (FCL) and Shared Container (LCL)?',
        aAr: 'شحن الحاوية الكاملة (FCL) يعني حجز حاوية كاملة (20 أو 40 قدم) مخصصة لبضائعك فقط. أما الشحن الجزئي (LCL) فيتيح لك شحن كميات أو طرود أصغر ضمن حاوية مشتركة مع بضائع أخرى، مما يقلل التكلفة بشكل كبير عند استيراد كميات غير كافية لحاوية كاملة.',
        aEn: 'FCL reserves an entire container (20ft or 40ft) exclusively for your goods. LCL consolidates smaller packages into a shared container with other shipments, significantly reducing costs for lower-volume orders.'
      },
      {
        qAr: 'كيف تضمنون سلامة البضائع أثناء النقل البحري أو الجوي؟',
        qEn: 'How do you safeguard cargo integrity during ocean or air transit?',
        aAr: 'نقوم بمراجعة أسلوب التغليف والتحميل مع الموردين في الصين، والتأكد من تثبيت البضائع داخل الحاويات وفق معايير الشحن الدولي، مع استخدام أختام الحاويات الرسمية وتوثيق حالة الشحنة قبل الإبحار.',
        aEn: 'We inspect packaging and stowing standards with suppliers in China, ensure proper cargo bracing in containers according to maritime standards, and apply official bolt seals with pre-departure photo documentation.'
      }
    ]
  },
  {
    categoryAr: 'التخليص الجمركي والوثائق',
    categoryEn: 'Customs & Documents',
    questions: [
      {
        qAr: 'ما هي الوثائق الأساسية المطلوبة لإتمام التخليص الجمركي في اليمن؟',
        qEn: 'What essential documents are required for customs clearance in Yemen?',
        aAr: 'المستندات الرئيسية تشمل: بوليصة الشحن الأصلية (B/L أو AWB)، الفاتورة التجارية الأصلية (Commercial Invoice)، قائمة التعبئة المفصلة (Packing List)، وشهادة المنشأ الرسمية (Certificate of Origin)، بالإضافة إلى أي تصاريح خاصة إذا كانت البضاعة خاضعة لجهات رقابية معينة.',
        aEn: 'The core documents include: Original Bill of Lading / AWB, Commercial Invoice, Packing List, Certificate of Origin, and any specialized regulatory approvals if cargo is subject to specific oversight.'
      },
      {
        qAr: 'هل يمكنكم المساعدة في تدقيق الفواتير قبل مغادرة البضاعة من الصين؟',
        qEn: 'Can you audit commercial documents before the cargo leaves China?',
        aAr: 'نعم، هذه إحدى أهم ميزاتنا. فريقنا يراجع مسودات الفواتير وقوائم التعبئة قبل مغادرة الشحنة للتأكد من مطابقتها لاشتراطات الجمارك اليمنية، لتفادي أي غرامات أو تعديلات مكلفة لاحقاً.',
        aEn: 'Yes, this is one of our key strengths. Our team audits draft invoices and packing lists prior to departure to verify full alignment with Yemeni customs stipulations, preventing costly delays or fines.'
      }
    ]
  },
  {
    categoryAr: 'الأسعار والطلبات',
    categoryEn: 'Quotes & Operations',
    questions: [
      {
        qAr: 'كيف يتم احتساب تكلفة الشحن؟',
        qEn: 'How is freight cost calculated?',
        aAr: 'تعتمد تكلفة الشحن على عدة عوامل: نوع النقل (بحري أو جوي)، حجم الشحنة بالمتر المكعب (CBM) أو الوزن بالكيلوجرام، ميناء التحميل وميناء الوصول، وما إذا كان الطلب يشمل التخليص الجمركي والنقل الداخلي. يمكنك طلب عرض سعر مفصل عبر النموذج في موقعنا وسنزودك بتكلفة دقيقة.',
        aEn: 'Freight cost depends on: transit mode (sea or air), volume in cubic meters (CBM) or weight in kg, port of origin and destination, and whether customs clearance and domestic haulage are included. Submit a quote request on our site for a tailored breakdown.'
      },
      {
        qAr: 'كيف أتواصل معكم للاستفسار المباشر عن شحنة أو طلب تسعير عاجل؟',
        qEn: 'How can I contact your team directly for urgent inquiries?',
        aAr: 'يمكنك الاتصال مباشرة بمكتب اليمن عبر الرقم +967783339992 (هاتف وواتساب)، أو بممثلنا في الصين على الرقم +8618629282407، أو زيارة مكتبنا في صنعاء: دار سلم، أمام محطة الدار الحديث.',
        aEn: 'You can directly call our Yemen office on +967783339992 (phone & WhatsApp), reach our China team at +8618629282407, or visit our Sana\'a office at Dar Salm, opposite Al-Dar Al-Hadeeth station.'
      }
    ]
  }
];
