export type Language = 'ar' | 'en';

export type ServiceCategory = 'import' | 'sea' | 'air' | 'clearance' | 'domestic' | 'corporate';

export interface ServiceItem {
  id: string;
  slug: string;
  category: ServiceCategory;
  titleAr: string;
  titleEn: string;
  shortDescAr: string;
  shortDescEn: string;
  fullDescAr: string;
  fullDescEn: string;
  featuresAr: string[];
  featuresEn: string[];
  requirementsAr: string[];
  requirementsEn: string[];
  image: string;
  isActive: boolean;
}

export type QuoteStatus = 
  | 'NEW' 
  | 'REVIEWING' 
  | 'NEED_INFO' 
  | 'QUOTED' 
  | 'ACCEPTED' 
  | 'IN_PROGRESS' 
  | 'COMPLETED' 
  | 'CLOSED' 
  | 'CANCELLED';

export interface QuoteRequest {
  id: string;
  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
  serviceId: string;
  serviceName: string;
  clientType: 'individual' | 'company' | 'merchant' | 'other';
  requestType: 'new_import' | 'in_transit' | 'customs_only' | 'general_inquiry';
  cargoDescription: string;
  cargoCategory: string;
  originCountry: string;
  originCity: string;
  destinationCity: string;
  shippingType: 'sea' | 'air' | 'land' | 'undecided';
  weightKg?: number;
  volumeCbm?: number;
  packagesCount?: number;
  readyDate?: string;
  needsCustomsClearance: boolean;
  needsDomesticTransport: boolean;
  notes?: string;
  clientName: string;
  companyName?: string;
  phone: string;
  email?: string;
  preferredContact: 'phone' | 'whatsapp' | 'email';
  preferredLanguage: 'ar' | 'en';
  status: QuoteStatus;
  quotedAmount?: string;
  assignedTo?: string;
  internalNotes?: string[];
  attachments?: { name: string; size: string }[];
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'REPLIED' | 'CLOSED';
  notes?: string;
}

export interface TrackingEvent {
  id: string;
  date: string;
  titleAr: string;
  titleEn: string;
  locationAr: string;
  locationEn: string;
  status: 'pending' | 'in_progress' | 'completed';
  detailsAr: string;
  detailsEn: string;
}

export interface ShipmentRecord {
  trackingNumber: string;
  referenceNumber: string;
  customerName: string;
  origin: string;
  destination: string;
  serviceType: string;
  estimatedArrival?: string;
  currentStatusAr: string;
  currentStatusEn: string;
  statusCode: QuoteStatus;
  events: TrackingEvent[];
  lastUpdated: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
}

export interface CompanySettings {
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  phoneYemen: string;
  phoneChina: string;
  whatsappNumber: string;
  email: string;
  addressAr: string;
  addressEn: string;
  workingHoursAr: string;
  workingHoursEn: string;
  announcementAr: string;
  announcementEn: string;
  isAnnouncementActive: boolean;
}
