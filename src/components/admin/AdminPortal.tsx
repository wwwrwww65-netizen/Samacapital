import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  User, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileText, 
  MessageSquare, 
  Settings, 
  History, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  X,
  Phone,
  Building,
  Save,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Language, QuoteRequest, ContactMessage, CompanySettings, QuoteStatus } from '../../types';
import { translations } from '../../i18n/translations';
import { AppStore } from '../../services/store';

interface AdminPortalProps {
  lang: Language;
  onNavigateHome: () => void;
  settings: CompanySettings;
  onUpdateSettings: (newSettings: CompanySettings) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ 
  lang, 
  onNavigateHome,
  settings,
  onUpdateSettings
}) => {
  const t = translations[lang].admin;
  const isRtl = lang === 'ar';

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('admin@samacapital.ye');
  const [password, setPassword] = useState<string>('sama2026');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'quotes' | 'messages' | 'settings' | 'audit'>('quotes');
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Filter & Search
  const [quoteSearch, setQuoteSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  // Quote editing inside drawer
  const [editStatus, setEditStatus] = useState<QuoteStatus>('NEW');
  const [editQuoteAmount, setEditQuoteAmount] = useState<string>('');
  const [editAssignedTo, setEditAssignedTo] = useState<string>('');
  const [newInternalNote, setNewInternalNote] = useState<string>('');

  // Editable settings form
  const [formSettings, setFormSettings] = useState<CompanySettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, [isAuthenticated]);

  const loadData = () => {
    setQuotes(AppStore.getQuotes());
    setMessages(AppStore.getMessages());
    setAuditLogs(AppStore.getAuditLogs());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'admin@samacapital.ye') && 
      password === 'sama2026'
    ) {
      setIsAuthenticated(true);
      setLoginError(null);
      AppStore.addAuditLog('تسجيل دخول المسؤول', 'المسؤول الرئيسي', 'تم تسجيل الدخول بنجاح إلى لوحة الإدارة');
    } else {
      setLoginError(t.loginError);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    AppStore.addAuditLog('تسجيل خروج', 'المسؤول', 'تم تسجيل الخروج من لوحة التحكم');
  };

  const handleOpenQuoteDrawer = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setEditStatus(quote.status);
    setEditQuoteAmount(quote.quotedAmount || '');
    setEditAssignedTo(quote.assignedTo || '');
    setNewInternalNote('');
  };

  const handleSaveQuoteChanges = () => {
    if (!selectedQuote) return;

    AppStore.updateQuoteStatus(
      selectedQuote.id,
      editStatus,
      newInternalNote.trim() || undefined,
      editQuoteAmount.trim() || undefined,
      editAssignedTo.trim() || undefined
    );

    loadData();
    // Update active selected
    const updated = AppStore.getQuotes().find(q => q.id === selectedQuote.id);
    setSelectedQuote(updated || null);
    setNewInternalNote('');
  };

  const handleExportCsv = () => {
    const allQuotes = AppStore.getQuotes();
    const headers = [
      'Reference',
      'Date',
      'Status',
      'Client Name',
      'Company',
      'Phone',
      'Service',
      'Cargo',
      'Origin',
      'Destination',
      'Weight(kg)',
      'Volume(cbm)',
      'Quoted Amount'
    ];

    const rows = allQuotes.map(q => [
      `"${q.referenceNumber}"`,
      `"${q.createdAt}"`,
      `"${q.status}"`,
      `"${q.clientName.replace(/"/g, '""')}"`,
      `"${(q.companyName || '').replace(/"/g, '""')}"`,
      `"${q.phone}"`,
      `"${q.serviceName.replace(/"/g, '""')}"`,
      `"${q.cargoDescription.replace(/"/g, '""')}"`,
      `"${q.originCity}"`,
      `"${q.destinationCity}"`,
      `"${q.weightKg || ''}"`,
      `"${q.volumeCbm || ''}"`,
      `"${(q.quotedAmount || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sama_capital_quotes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    AppStore.addAuditLog('تصدير بيانات', 'المسؤول', 'تم تصدير ملف الطلبات كـ CSV');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    AppStore.updateSettings(formSettings);
    onUpdateSettings(formSettings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const filteredQuotes = quotes.filter(q => {
    const matchesSearch = 
      q.referenceNumber.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.clientName.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.phone.includes(quoteSearch) ||
      (q.companyName && q.companyName.toLowerCase().includes(quoteSearch.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'NEW':
        return <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded text-xs font-semibold">جديد NEW</span>;
      case 'REVIEWING':
        return <span className="text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded text-xs font-semibold">قيد المراجعة</span>;
      case 'NEED_INFO':
        return <span className="text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded text-xs font-semibold">بانتظار معلومات</span>;
      case 'QUOTED':
        return <span className="text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded text-xs font-semibold">تم التسعير</span>;
      case 'IN_PROGRESS':
        return <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded text-xs font-semibold">قيد الشحن/التخليص</span>;
      case 'COMPLETED':
        return <span className="text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded text-xs font-semibold">مكتمل</span>;
      case 'CLOSED':
      case 'CANCELLED':
        return <span className="text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded text-xs font-semibold">{status}</span>;
      default:
        return <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold">{status}</span>;
    }
  };

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-[#F4F7FA]">
        <div className="bg-white rounded-3xl border border-[#E1E9F0] shadow-xl max-w-md w-full p-6 sm:p-8">
          
          <div className="w-12 h-12 rounded-2xl bg-[#0B3158] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Shield className="w-6 h-6 text-[#F39A16]" />
          </div>

          <h2 className="text-xl font-bold text-center text-[#0B3158]">
            {t.loginTitle}
          </h2>
          <p className="text-xs text-center text-slate-500 mt-1 mb-6">
            {t.loginSubtitle}
          </p>

          {/* Quick Demo Access Box */}
          <div className="mb-6 p-4 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] text-xs text-slate-800">
            <span className="font-bold block mb-1 text-[#0876C9]">🔑 {t.demoCredsPrompt}</span>
            <div className="space-y-0.5 font-mono text-[11px]">
              <div><span className="text-slate-500">User:</span> <strong className="text-[#0B3158]">admin@samacapital.ye</strong></div>
              <div><span className="text-slate-500">Password:</span> <strong className="text-[#0B3158]">sama2026</strong></div>
            </div>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.usernameLabel}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#E1E9F0] bg-[#F1F6FA] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0876C9] font-mono text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.passwordLabel}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#E1E9F0] bg-[#F1F6FA] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0876C9] font-mono text-xs sm:text-sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#0876C9] hover:bg-[#0B3158] text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {t.loginBtn}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onNavigateHome}
              className="text-xs text-slate-500 hover:text-[#0876C9] underline cursor-pointer"
            >
              {lang === 'ar' ? 'العودة للموقع الرئيسي' : 'Return to Main Website'}
            </button>
          </div>

        </div>
      </div>
    );
  }

  // KPIs calculations
  const totalQuotesCount = quotes.length;
  const newQuotesCount = quotes.filter(q => q.status === 'NEW').length;
  const inProgressCount = quotes.filter(q => q.status === 'IN_PROGRESS' || q.status === 'REVIEWING').length;
  const unreadMessagesCount = messages.filter(m => m.status === 'UNREAD').length;

  return (
    <div className="min-h-screen bg-[#F4F7FA] text-slate-900 pb-16">
      
      {/* Admin Header */}
      <header className="bg-[#0B3158] text-white border-b border-[#144272] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F39A16] text-slate-950 flex items-center justify-center font-bold">
              SC
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base text-white block">
                {t.portalTitle}
              </span>
              <span className="text-[10px] text-slate-300">
                {lang === 'ar' ? 'إدارة العمليات والتسعير والتخليص الجمركي' : 'Operations, Freight & Brokerage Console'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer hidden sm:block"
            >
              {lang === 'ar' ? 'عرض الموقع' : 'View Public Site'}
            </button>

            <button
              onClick={handleLogout}
              className="text-xs text-rose-300 hover:text-rose-100 px-3 py-1.5 rounded bg-rose-950/40 border border-rose-800/40 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.logoutBtn}</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto text-xs font-semibold py-2">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'quotes' ? 'bg-[#0876C9] text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.tabQuotes} ({totalQuotesCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'messages' ? 'bg-[#0876C9] text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.tabMessages} {unreadMessagesCount > 0 && `(${unreadMessagesCount})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'settings' ? 'bg-[#0876C9] text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{t.tabSettings}</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'audit' ? 'bg-[#0876C9] text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>{t.tabAudit}</span>
          </button>
        </div>
      </header>

      {/* KPI Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E1E9F0] shadow-2xs hover:shadow-sm transition-all">
            <span className="text-xs text-slate-500 font-medium block">{t.kpiTotalQuotes}</span>
            <span className="text-2xl font-black text-[#0B3158] font-mono mt-1 block">{totalQuotesCount}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200/80 bg-amber-50/30 shadow-2xs hover:shadow-sm transition-all">
            <span className="text-xs text-amber-700 font-medium block">{t.kpiNewQuotes}</span>
            <span className="text-2xl font-black text-amber-800 font-mono mt-1 block">{newQuotesCount}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E1E9F0] shadow-2xs hover:shadow-sm transition-all">
            <span className="text-xs text-slate-500 font-medium block">{t.kpiActiveShipments}</span>
            <span className="text-2xl font-black text-emerald-700 font-mono mt-1 block">{inProgressCount}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E1E9F0] shadow-2xs hover:shadow-sm transition-all">
            <span className="text-xs text-slate-500 font-medium block">{t.kpiMessages}</span>
            <span className="text-2xl font-black text-[#0876C9] font-mono mt-1 block">{unreadMessagesCount}</span>
          </div>
        </div>
      </div>

      {/* TAB 1: QUOTES MANAGEMENT */}
      {activeTab === 'quotes' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {/* Controls: Search, Filter, Export */}
          <div className="bg-white p-4 rounded-2xl border border-[#E1E9F0] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 w-full">
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
                <input
                  type="text"
                  value={quoteSearch}
                  onChange={(e) => setQuoteSearch(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full ps-10 pe-3.5 py-2.5 text-xs rounded-xl border border-[#E1E9F0] bg-[#F1F6FA] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0876C9]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs py-2.5 px-3.5 rounded-xl border border-[#E1E9F0] bg-[#F1F6FA] focus:bg-white focus:outline-hidden text-slate-800 font-medium"
                >
                  <option value="ALL">{t.allStatuses}</option>
                  <option value="NEW">جديد (NEW)</option>
                  <option value="REVIEWING">قيد المراجعة (REVIEWING)</option>
                  <option value="QUOTED">تم التسعير (QUOTED)</option>
                  <option value="IN_PROGRESS">قيد الشحن/التخليص (IN_PROGRESS)</option>
                  <option value="COMPLETED">مكتمل (COMPLETED)</option>
                  <option value="CLOSED">مغلق (CLOSED)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleExportCsv}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#0B3158] hover:bg-[#0876C9] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.exportCsv}</span>
            </button>
          </div>

          {/* Quotes Table */}
          <div className="bg-white rounded-2xl border border-[#E1E9F0] shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead className="bg-[#F1F6FA] border-b border-[#E1E9F0] text-slate-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 text-start">{t.tableRef}</th>
                    <th className="py-3.5 px-4 text-start">{t.tableClient}</th>
                    <th className="py-3.5 px-4 text-start">{t.tableService}</th>
                    <th className="py-3.5 px-4 text-start">{t.tableDate}</th>
                    <th className="py-3.5 px-4 text-start">{t.tableStatus}</th>
                    <th className="py-3.5 px-4 text-center">{t.tableActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E9F0]/60">
                  {filteredQuotes.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        {lang === 'ar' ? 'لا توجد طلبات تطابق معايير البحث.' : 'No quotation records matching criteria.'}
                      </td>
                    </tr>
                  ) : (
                    filteredQuotes.map((q) => (
                      <tr key={q.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#0B3158]">
                          {q.referenceNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-900 block">{q.clientName}</span>
                          <span className="text-[11px] text-slate-500 font-mono block" dir="ltr">{q.phone}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-slate-800 block">{q.serviceName}</span>
                          <span className="text-[11px] text-slate-500 block">{q.originCity} ➔ {q.destinationCity}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 font-mono">
                          {q.createdAt.split('T')[0]}
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(q.status)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleOpenQuoteDrawer(q)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#0876C9] hover:bg-[#0B3158] text-white font-medium text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{t.viewDetails}</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      )}

      {/* TAB 2: CONTACT MESSAGES */}
      {activeTab === 'messages' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-[#E1E9F0] text-center text-slate-500 text-xs">
                {lang === 'ar' ? 'لا توجد رسائل واردة حالياً.' : 'No messages in inbox.'}
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="bg-white p-6 rounded-2xl border border-[#E1E9F0] shadow-2xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E1E9F0]/70 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-[#0B3158]">{msg.subject}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="font-semibold text-slate-800">{msg.name}</span>
                        <span>·</span>
                        <a href={`tel:${msg.phone}`} className="font-mono text-[#0876C9]" dir="ltr">{msg.phone}</a>
                        {msg.email && (
                          <>
                            <span>·</span>
                            <span className="font-mono">{msg.email}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-slate-400">
                        {new Date(msg.createdAt).toLocaleString(lang === 'ar' ? 'ar-YE' : 'en-US')}
                      </span>

                      {msg.status === 'UNREAD' ? (
                        <button
                          onClick={() => {
                            AppStore.updateMessageStatus(msg.id, 'REPLIED');
                            loadData();
                          }}
                          className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-100 cursor-pointer border border-emerald-200"
                        >
                          {t.markReplied}
                        </button>
                      ) : (
                        <span className="text-slate-500 bg-[#F1F6FA] border border-[#E1E9F0] px-2.5 py-0.5 rounded-lg text-xs">
                          {msg.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-[#F1F6FA] p-4 rounded-xl border border-[#E1E9F0]">
                    {msg.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </main>
      )}

      {/* TAB 3: COMPANY SETTINGS */}
      {activeTab === 'settings' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E1E9F0] shadow-2xs">
            <h3 className="text-base font-bold text-[#0B3158] mb-1">
              {lang === 'ar' ? 'تعديل بيانات وإعدادات الشركة' : 'Edit Company Coordinates & Settings'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {lang === 'ar' 
                ? 'أي تعديل هنا ينعكس فوراً على الترويسة، التذييل، وصفحة التواصل للموقع بأكمله.' 
                : 'Updates here immediately populate site header, footer, and contact touchpoints.'}
            </p>

            {settingsSaved && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'ar' ? 'تم حفظ التحديثات بنجاح!' : 'Settings updated successfully!'}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'هاتف اليمن (مكالمات وواتساب)' : 'Yemen Phone'}
                  </label>
                  <input
                    type="text"
                    value={formSettings.phoneYemen}
                    onChange={(e) => setFormSettings({ ...formSettings, phoneYemen: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9F0] bg-[#F1F6FA] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0876C9] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'هاتف التنسيق في الصين' : 'China Liaison Phone'}
                  </label>
                  <input
                    type="text"
                    value={formSettings.phoneChina}
                    onChange={(e) => setFormSettings({ ...formSettings, phoneChina: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9F0] bg-[#F1F6FA] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0876C9] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'العنوان المعتمد في صنعاء' : 'Official Address'}
                </label>
                <input
                  type="text"
                  value={formSettings.addressAr}
                  onChange={(e) => setFormSettings({ ...formSettings, addressAr: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9F0] bg-[#F1F6FA] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0876C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'شريط الإعلان الترويجي في الموقع' : 'Site Announcement Banner'}
                </label>
                <input
                  type="text"
                  value={formSettings.announcementAr}
                  onChange={(e) => setFormSettings({ ...formSettings, announcementAr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9F0] bg-[#F1F6FA] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0876C9]"
                />
              </div>

              <div className="pt-4 border-t border-[#E1E9F0] flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0876C9] hover:bg-[#0B3158] text-white font-bold rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-xs active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'حفظ التعديلات المركزية' : 'Save Settings'}</span>
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* TAB 4: AUDIT LOG */}
      {activeTab === 'audit' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-2xl border border-[#E1E9F0] shadow-2xs overflow-hidden">
            <div className="p-4 bg-[#F1F6FA] border-b border-[#E1E9F0]">
              <h3 className="text-xs font-bold text-[#0B3158] uppercase tracking-wider">
                {lang === 'ar' ? 'سجل العمليات الإدارية والتدقيق الأمني' : 'Administrative Audit Trail & Security Logs'}
              </h3>
            </div>
            <div className="divide-y divide-[#E1E9F0]/60">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F8FAFC]">
                  <div>
                    <span className="font-bold text-[#0B3158] block">{log.action}</span>
                    <span className="text-slate-600 mt-0.5 block">{log.details}</span>
                  </div>
                  <div className="text-slate-400 font-mono text-[11px] shrink-0">
                    <span className="text-slate-600 font-medium me-2">[{log.user}]</span>
                    <span>{new Date(log.timestamp).toLocaleString(lang === 'ar' ? 'ar-YE' : 'en-US')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Quote Details Drawer / Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-[#E1E9F0]">
            
            <button
              onClick={() => setSelectedQuote(null)}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-full hover:bg-[#F1F6FA] text-slate-500 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-[#E1E9F0] mb-6">
              <div className="p-2.5 rounded-2xl bg-[#F1F6FA] text-[#0876C9] border border-[#E1E9F0]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-mono">{t.drawerTitle}:</span>
                <h3 className="text-xl font-bold font-mono text-[#0B3158]">
                  {selectedQuote.referenceNumber}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
              
              {/* Client & Cargo Info */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] space-y-2">
                  <h4 className="font-bold text-[#0B3158] text-xs uppercase border-b border-[#E1E9F0] pb-1.5">
                    {lang === 'ar' ? 'بيانات العميل' : 'Client Profile'}
                  </h4>
                  <div><span className="text-slate-500">الاسم:</span> <strong>{selectedQuote.clientName}</strong></div>
                  {selectedQuote.companyName && <div><span className="text-slate-500">المنشأة:</span> {selectedQuote.companyName}</div>}
                  <div>
                    <span className="text-slate-500">الهاتف:</span>{' '}
                    <a href={`tel:${selectedQuote.phone}`} className="font-mono text-[#0876C9] font-bold" dir="ltr">
                      {selectedQuote.phone}
                    </a>
                  </div>
                  <div><span className="text-slate-500">الوسيلة المفضلة:</span> {selectedQuote.preferredContact}</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] space-y-2">
                  <h4 className="font-bold text-[#0B3158] text-xs uppercase border-b border-[#E1E9F0] pb-1.5">
                    {t.cargoDetails}
                  </h4>
                  <div><span className="text-slate-500">الخدمة:</span> <strong>{selectedQuote.serviceName}</strong></div>
                  <div><span className="text-slate-500">الوصف:</span> {selectedQuote.cargoDescription}</div>
                  <div><span className="text-slate-500">المسار:</span> {selectedQuote.originCity} ➔ {selectedQuote.destinationCity}</div>
                  <div><span className="text-slate-500">طريقة النقل:</span> {selectedQuote.shippingType}</div>
                  <div><span className="text-slate-500">الوزن / الحجم:</span> {selectedQuote.weightKg ? `${selectedQuote.weightKg} kg` : '-'} / {selectedQuote.volumeCbm ? `${selectedQuote.volumeCbm} CBM` : '-'}</div>
                  {selectedQuote.notes && (
                    <div className="pt-1 text-slate-600 italic">
                      "ملاحظات العميل: {selectedQuote.notes}"
                    </div>
                  )}
                </div>
              </div>

              {/* Status & Operational Actions */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] space-y-3">
                  <h4 className="font-bold text-[#0B3158] text-xs uppercase border-b border-[#E1E9F0] pb-1.5">
                    {lang === 'ar' ? 'إجراءات التسعير والتشغيل' : 'Operational Workflow'}
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.updateStatusLabel}
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as QuoteStatus)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9F0] bg-white font-semibold text-xs focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden"
                    >
                      <option value="NEW">جديد (NEW)</option>
                      <option value="REVIEWING">قيد المراجعة (REVIEWING)</option>
                      <option value="NEED_INFO">بانتظار معلومات (NEED_INFO)</option>
                      <option value="QUOTED">تم التسعير (QUOTED)</option>
                      <option value="ACCEPTED">مقبول من العميل (ACCEPTED)</option>
                      <option value="IN_PROGRESS">قيد الشحن/التخليص (IN_PROGRESS)</option>
                      <option value="COMPLETED">مكتمل (COMPLETED)</option>
                      <option value="CLOSED">مغلق (CLOSED)</option>
                      <option value="CANCELLED">ملغي (CANCELLED)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.quoteAmountLabel}
                    </label>
                    <input
                      type="text"
                      value={editQuoteAmount}
                      onChange={(e) => setEditQuoteAmount(e.target.value)}
                      placeholder="e.g. $4,200 شامل الشحن والتخليص"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9F0] bg-white font-mono text-xs focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.assignedToLabel}
                    </label>
                    <input
                      type="text"
                      value={editAssignedTo}
                      onChange={(e) => setEditAssignedTo(e.target.value)}
                      placeholder="اسم الموظف أو مسؤول الشحن"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9F0] bg-white text-xs focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Internal Notes */}
                <div className="p-4 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] space-y-2">
                  <h4 className="font-bold text-[#0B3158] text-xs uppercase">
                    {t.internalNotesTitle}
                  </h4>
                  
                  <div className="max-h-28 overflow-y-auto space-y-1.5 text-[11px] text-slate-600 bg-white p-3 rounded-xl border border-[#E1E9F0]">
                    {selectedQuote.internalNotes && selectedQuote.internalNotes.length > 0 ? (
                      selectedQuote.internalNotes.map((note, idx) => (
                        <div key={idx} className="pb-1 border-b border-[#E1E9F0] last:border-b-0">
                          {note}
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-400">لا توجد ملاحظات سابقة.</span>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      value={newInternalNote}
                      onChange={(e) => setNewInternalNote(e.target.value)}
                      placeholder={t.addNotePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E9F0] bg-white text-xs focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden"
                    />
                  </div>
                </div>

              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-[#E1E9F0] flex items-center justify-between">
              <a
                href={`https://wa.me/${selectedQuote.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `السلام عليكم أخي الكريم ${selectedQuote.clientName}، بخصوص طلب التسعير برقم ${selectedQuote.referenceNumber} لدى سما كابيتال:`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'مراسلة العميل واتساب' : 'WhatsApp Client'}</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedQuote(null)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-[#F1F6FA] text-xs font-medium cursor-pointer"
                >
                  {lang === 'ar' ? 'إغلاق' : 'Close'}
                </button>

                <button
                  type="button"
                  onClick={handleSaveQuoteChanges}
                  className="px-5 py-2.5 rounded-xl bg-[#0876C9] hover:bg-[#0B3158] text-white font-bold text-xs shadow-xs cursor-pointer active:scale-95"
                >
                  {t.saveChangesBtn}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
