import { QuoteRequest, ContactMessage, ShipmentRecord, AuditLogItem, CompanySettings } from '../types';
import { INITIAL_COMPANY_SETTINGS } from '../data/companyData';

const STORAGE_KEYS = {
  QUOTES: 'sama_capital_quotes_v1',
  MESSAGES: 'sama_capital_messages_v1',
  SETTINGS: 'sama_capital_settings_v1',
  AUDIT: 'sama_capital_audit_v1',
  SHIPMENTS: 'sama_capital_shipments_v1',
};

// Initial demonstrative active quotes & shipments
const SEED_QUOTES: QuoteRequest[] = [
  {
    id: 'quote-101',
    referenceNumber: 'SAMA-2026-N492',
    createdAt: '2026-11-02T10:30:00Z',
    updatedAt: '2026-11-03T09:15:00Z',
    serviceId: 'sea-freight',
    serviceName: 'الشحن البحري للحاويات',
    clientType: 'company',
    requestType: 'new_import',
    cargoDescription: 'حاوية 40 قدم قطع غيار سيارات ومعدات ورش',
    cargoCategory: 'قطع غيار وصناعي',
    originCountry: 'الصين',
    originCity: 'نينغبو (Ningbo)',
    destinationCity: 'صنعاء (عبر ميناء عدن)',
    shippingType: 'sea',
    weightKg: 18500,
    volumeCbm: 68,
    packagesCount: 1,
    readyDate: '2026-11-15',
    needsCustomsClearance: true,
    needsDomesticTransport: true,
    notes: 'نرجو توفير عرض يشمل التخليص الجمركي ونقل الحاوية إلى مستودعنا في صنعاء.',
    clientName: 'مؤسسة النجم الذهبي للتجارة',
    companyName: 'النجم الذهبي للمعدات',
    phone: '+967771234567',
    email: 'info@alnajm-trade.ye',
    preferredContact: 'whatsapp',
    preferredLanguage: 'ar',
    status: 'REVIEWING',
    quotedAmount: '$4,850 شامل التخليص والنقل الداخلي',
    assignedTo: 'أحمد الصلاحي - قسم الشحن البحري',
    internalNotes: [
      'تم الاتصال بالعميل عبر واتساب لتأكيد موعد جاهزية البضاعة في نينغبو.',
      'جارٍ التنسيق مع الخط الملاحي لحجز مساحة لحاوية 40HQ.'
    ]
  },
  {
    id: 'quote-102',
    referenceNumber: 'SAMA-2026-A815',
    createdAt: '2026-11-03T14:20:00Z',
    updatedAt: '2026-11-03T15:00:00Z',
    serviceId: 'air-freight',
    serviceName: 'الشحن الجوي السريع',
    clientType: 'merchant',
    requestType: 'new_import',
    cargoDescription: 'إلكترونيات وشواحن وملحقات هواتف ذكية (بدون بطاريات منفصلة)',
    cargoCategory: 'إلكترونيات واكسسوارات',
    originCountry: 'الصين',
    originCity: 'شنجن (Shenzhen)',
    destinationCity: 'صنعاء',
    shippingType: 'air',
    weightKg: 240,
    volumeCbm: 1.8,
    packagesCount: 12,
    readyDate: '2026-11-05',
    needsCustomsClearance: true,
    needsDomesticTransport: false,
    notes: 'شحنة عاجلة جداً مطلوب شحنها بأسرع رحلة جوية متاحة.',
    clientName: 'أكرم بن محفوظ',
    companyName: 'متجر سمارت تك',
    phone: '+967733445566',
    preferredContact: 'phone',
    preferredLanguage: 'ar',
    status: 'NEW',
    internalNotes: [
      'طلب جديد وارد قبل قليل - يحتاج مراجعة الوزن الحجمي والتأكد من تقارير MSDS للشواحن.'
    ]
  },
  {
    id: 'quote-103',
    referenceNumber: 'SAMA-2026-C304',
    createdAt: '2026-10-28T08:00:00Z',
    updatedAt: '2026-11-01T16:30:00Z',
    serviceId: 'customs-clearance',
    serviceName: 'التخليص الجمركي المتخصص',
    clientType: 'merchant',
    requestType: 'customs_only',
    cargoDescription: 'أقمشة ومنسوجات ملابس جاهزة',
    cargoCategory: 'أقمشة وملابس',
    originCountry: 'الصين',
    originCity: 'إيوو (Yiwu)',
    destinationCity: 'الحديدة',
    shippingType: 'sea',
    weightKg: 12000,
    volumeCbm: 45,
    packagesCount: 1,
    needsCustomsClearance: true,
    needsDomesticTransport: true,
    clientName: 'شركة الأفق للمنسوجات',
    phone: '+967780001122',
    preferredContact: 'whatsapp',
    preferredLanguage: 'ar',
    status: 'IN_PROGRESS',
    quotedAmount: '$1,900 رسوم وأتعاب التخليص والنقل',
    assignedTo: 'فؤاد المقطري - مخلص جمركي معتمد',
    internalNotes: [
      'تم استلام بوالص الشحن الأصلية وفحص الفواتير التجارية وتقديمها للجمارك.'
    ]
  }
];

const SEED_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-201',
    createdAt: '2026-11-03T11:45:00Z',
    name: 'موسى غالب الشميري',
    phone: '+967770112233',
    email: 'mousa.sh@gmail.com',
    subject: 'استفسار عن الشحن الجزئي LCL من إيوو إلى صنعاء',
    message: 'السلام عليكم، لدي حوالي 4 متر مكعب بضائع قرطاسية في إيوو، هل متاح تجميعها مع شحناتكم القادمة وما هو متوسط المدة؟ شكراً لكم.',
    status: 'UNREAD'
  },
  {
    id: 'msg-202',
    createdAt: '2026-11-02T16:10:00Z',
    name: 'عبدالله الحاشدي',
    phone: '+967711223344',
    subject: 'زيارة مكتبكم في صنعاء دار سلم',
    message: 'حياكم الله، هل مكتبكم في دار سلم يستقبل العملاء صباحاً لترتيب عقد استيراد مواد بناء؟ وشكراً.',
    status: 'REPLIED',
    notes: 'تم الرد هاتفياً والترحيب به في أوقات الدوام الرسمية من 8 صباحاً.'
  }
];

const SEED_SHIPMENTS: ShipmentRecord[] = [
  {
    trackingNumber: 'SAMA-TRK-78901',
    referenceNumber: 'SAMA-2026-N492',
    customerName: 'مؤسسة النجم الذهبي',
    origin: 'Ningbo, China',
    destination: 'Sana\'a, Yemen',
    serviceType: 'شحن بحري - حاوية 40HQ',
    estimatedArrival: '2026-11-28',
    currentStatusAr: 'تم تجهيز الحاوية وتأكيد حجز السفينة في ميناء نينغبو',
    currentStatusEn: 'Container consolidated & vessel booking confirmed at Ningbo Port',
    statusCode: 'IN_PROGRESS',
    lastUpdated: '2026-11-03T09:15:00Z',
    events: [
      {
        id: 'ev-1',
        date: '2026-11-01 14:00',
        titleAr: 'استلام البضاعة في مستودع نينغبو',
        titleEn: 'Cargo received at Ningbo warehouse',
        locationAr: 'نينغبو، الصين',
        locationEn: 'Ningbo, China',
        status: 'completed',
        detailsAr: 'تم مطابقة بوليصة التعبئة وسلامة الطرود والتغليف الخارجي.',
        detailsEn: 'Packing list verified, packaging integrity confirmed.'
      },
      {
        id: 'ev-2',
        date: '2026-11-03 09:15',
        titleAr: 'إصدار إذن التحميل وختم الحاوية',
        titleEn: 'Load order issued & container sealed',
        locationAr: 'رصيف ميناء نينغبو',
        locationEn: 'Ningbo Port Terminal',
        status: 'completed',
        detailsAr: 'تم تركيب الختم الملاحي المعتمد وجاهزة للصعود على ظهر الباخرة.',
        detailsEn: 'Official security bolt seal attached, staged for vessel loading.'
      },
      {
        id: 'ev-3',
        date: '2026-11-05 (متوقع)',
        titleAr: 'مغادرة السفينة الميناء وبدء الرحلة البحرية',
        titleEn: 'Vessel departure & ocean voyage initiation',
        locationAr: 'بحر الصين الشرقي',
        locationEn: 'East China Sea',
        status: 'pending',
        detailsAr: 'المسار الملاحي المباشر باتجاه مضيق باب المندب والموانئ اليمنية.',
        detailsEn: 'Direct maritime route heading to designated discharge port.'
      }
    ]
  },
  {
    trackingNumber: 'SAMA-TRK-88120',
    referenceNumber: 'SAMA-2026-C304',
    customerName: 'شركة الأفق للمنسوجات',
    origin: 'Yiwu / Aden Port',
    destination: 'Hodeidah, Yemen',
    serviceType: 'تخليص جمركي ونقل داخلي',
    estimatedArrival: '2026-11-07',
    currentStatusAr: 'قيد إجراءات المعاينة والتثمين الجمركي في الميناء',
    currentStatusEn: 'Under customs physical inspection & appraisal at port terminal',
    statusCode: 'IN_PROGRESS',
    lastUpdated: '2026-11-03T11:00:00Z',
    events: [
      {
        id: 'ev-10',
        date: '2026-10-30 08:30',
        titleAr: 'وصول الشحنة وتفريغ الحاوية',
        titleEn: 'Vessel arrival & container discharge',
        locationAr: 'رصيف الميناء',
        locationEn: 'Discharge Berth',
        status: 'completed',
        detailsAr: 'تم سحب إذن التسليم من الوكيل الملاحي.',
        detailsEn: 'Delivery order collected from shipping agent.'
      },
      {
        id: 'ev-11',
        date: '2026-11-02 10:00',
        titleAr: 'تقديم البيان الجمركي الرسمي',
        titleEn: 'Official customs declaration filed',
        locationAr: 'الدائرة الجمركية',
        locationEn: 'Customs Authority Terminal',
        status: 'completed',
        detailsAr: 'فحص المستندات والشهادات وفواتير المنشأ.',
        detailsEn: 'Verification of certificates of origin and invoices.'
      },
      {
        id: 'ev-12',
        date: '2026-11-03 11:00',
        titleAr: 'معاينة لجنة الفحص والرقابة',
        titleEn: 'Customs inspection in progress',
        locationAr: 'ساحة التفتيش الجمركي',
        locationEn: 'Customs Inspection Yard',
        status: 'in_progress',
        detailsAr: 'إنهاء الفحص الفعلي تمهيداً لسداد الرسوم وطباعة إذن الخروج.',
        detailsEn: 'Physical inspection wrapping up prior to duty settlement and release pass.'
      }
    ]
  }
];

export class AppStore {
  static getQuotes(): QuoteRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUOTES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(SEED_QUOTES));
        return SEED_QUOTES;
      }
      return JSON.parse(data);
    } catch {
      return SEED_QUOTES;
    }
  }

  static saveQuotes(quotes: QuoteRequest[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
    } catch (e) {
      console.error('Failed to save quotes', e);
    }
  }

  static addQuote(quoteData: Omit<QuoteRequest, 'id' | 'referenceNumber' | 'createdAt' | 'updatedAt' | 'status'>): QuoteRequest {
    const quotes = this.getQuotes();
    const timestamp = new Date().toISOString();
    // Generate secure, unique, non-sequential reference code e.g. SAMA-2026-X7K2
    const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceNumber = `SAMA-${new Date().getFullYear()}-${randomChars}`;

    const newQuote: QuoteRequest = {
      ...quoteData,
      id: 'quote-' + Date.now(),
      referenceNumber,
      createdAt: timestamp,
      updatedAt: timestamp,
      status: 'NEW',
      internalNotes: [`تم استلام الطلب آلياً عبر الموقع بتاريخ ${new Date().toLocaleDateString('ar-YE')}`]
    };

    quotes.unshift(newQuote);
    this.saveQuotes(quotes);

    this.addAuditLog('إنشاء طلب عرض سعر جديد', 'النظام', `تم تسجيل الطلب برقم ${referenceNumber} للعميل ${quoteData.clientName}`);
    return newQuote;
  }

  static updateQuoteStatus(id: string, status: QuoteRequest['status'], note?: string, quotedAmount?: string, assignedTo?: string): boolean {
    const quotes = this.getQuotes();
    const index = quotes.findIndex(q => q.id === id);
    if (index === -1) return false;

    const quote = quotes[index];
    const prevStatus = quote.status;
    quote.status = status;
    quote.updatedAt = new Date().toISOString();

    if (quotedAmount !== undefined) quote.quotedAmount = quotedAmount;
    if (assignedTo !== undefined) quote.assignedTo = assignedTo;

    if (!quote.internalNotes) quote.internalNotes = [];
    if (note) {
      quote.internalNotes.push(`[${new Date().toLocaleString('ar-YE')}] ${note}`);
    } else {
      quote.internalNotes.push(`[${new Date().toLocaleString('ar-YE')}] تم تغيير الحالة من ${prevStatus} إلى ${status}`);
    }

    quotes[index] = quote;
    this.saveQuotes(quotes);

    this.addAuditLog('تحديث حالة طلب', 'المسؤول', `تغيير حالة الطلب ${quote.referenceNumber} إلى ${status}`);
    return true;
  }

  // Contact Messages
  static getMessages(): ContactMessage[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(SEED_MESSAGES));
        return SEED_MESSAGES;
      }
      return JSON.parse(data);
    } catch {
      return SEED_MESSAGES;
    }
  }

  static addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const messages = this.getMessages();
    const newMessage: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'UNREAD'
    };
    messages.unshift(newMessage);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    this.addAuditLog('استلام رسالة تواصل جديدة', 'الزائر', `رسالة من ${msg.name}: ${msg.subject}`);
    return newMessage;
  }

  static updateMessageStatus(id: string, status: ContactMessage['status'], notes?: string): boolean {
    const messages = this.getMessages();
    const index = messages.findIndex(m => m.id === id);
    if (index === -1) return false;

    messages[index].status = status;
    if (notes) messages[index].notes = notes;
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    return true;
  }

  // Shipments & Tracking lookup
  static getShipments(): ShipmentRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SHIPMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SHIPMENTS, JSON.stringify(SEED_SHIPMENTS));
        return SEED_SHIPMENTS;
      }
      return JSON.parse(data);
    } catch {
      return SEED_SHIPMENTS;
    }
  }

  static findShipment(query: string): ShipmentRecord | null {
    const cleanQuery = query.trim().toUpperCase();
    if (!cleanQuery) return null;

    const shipments = this.getShipments();
    // Match by tracking number or reference number
    const found = shipments.find(
      s => s.trackingNumber.toUpperCase() === cleanQuery || s.referenceNumber.toUpperCase() === cleanQuery
    );
    if (found) return found;

    // Check if it corresponds to an existing quote in our system
    const quotes = this.getQuotes();
    const quote = quotes.find(q => q.referenceNumber.toUpperCase() === cleanQuery);
    if (quote) {
      // Build a verified shipment status card from the quote record
      return {
        trackingNumber: quote.referenceNumber,
        referenceNumber: quote.referenceNumber,
        customerName: quote.clientName,
        origin: `${quote.originCity}, ${quote.originCountry}`,
        destination: quote.destinationCity,
        serviceType: quote.serviceName,
        estimatedArrival: quote.readyDate || 'قيد الجدولة والتأكيد',
        currentStatusAr: `حالة المعاملة الحالية: ${quote.status}`,
        currentStatusEn: `Current Status: ${quote.status}`,
        statusCode: quote.status,
        lastUpdated: quote.updatedAt,
        events: [
          {
            id: 'ev-q1',
            date: quote.createdAt.split('T')[0],
            titleAr: 'تسجيل واستلام الطلب في نظام سما كابيتال',
            titleEn: 'Order received & registered in Sama Capital system',
            locationAr: 'مركز العمليات - صنعاء',
            locationEn: 'Operations Center - Sana\'a',
            status: 'completed',
            detailsAr: `طلب ${quote.serviceName} برقم مرجعي معتمد ${quote.referenceNumber}`,
            detailsEn: `Service requested with official reference code ${quote.referenceNumber}`
          },
          {
            id: 'ev-q2',
            date: quote.updatedAt.split('T')[0],
            titleAr: quote.status === 'NEW' ? 'قيد المراجعة الفنية' : 'متابعة تفاصيل الشحنة والتسعير',
            titleEn: quote.status === 'NEW' ? 'Technical specifications review' : 'Quotation & Operations Processing',
            locationAr: 'قسم العمليات الدولية',
            locationEn: 'International Freight Desk',
            status: quote.status === 'COMPLETED' ? 'completed' : 'in_progress',
            detailsAr: quote.quotedAmount ? `تم تجهيز العرض: ${quote.quotedAmount}` : 'فريق العمليات يقوم بمطابقة أفضل أسعار الشحن ومسارات النقل.',
            detailsEn: quote.quotedAmount ? `Quotation ready: ${quote.quotedAmount}` : 'Operations team aligning optimal freight routes and rates.'
          }
        ]
      };
    }

    return null;
  }

  // Company Settings
  static getSettings(): CompanySettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_COMPANY_SETTINGS));
        return INITIAL_COMPANY_SETTINGS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_COMPANY_SETTINGS;
    }
  }

  static updateSettings(settings: CompanySettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    this.addAuditLog('تحديث بيانات وإعدادات الشركة', 'المسؤول', 'تم تعديل أرقام التواصل أو العناوين في النظام');
  }

  // Audit Logs
  static getAuditLogs(): AuditLogItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUDIT);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  static addAuditLog(action: string, user: string, details: string): void {
    try {
      const logs = this.getAuditLogs();
      logs.unshift({
        id: 'audit-' + Date.now(),
        timestamp: new Date().toISOString(),
        action,
        user,
        details
      });
      // keep max 50 items
      localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(logs.slice(0, 50)));
    } catch (e) {
      console.error('Audit log write error', e);
    }
  }
}
