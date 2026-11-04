import React, { useState } from 'react';
import { 
  Calculator, 
  Box, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Sliders, 
  Layers, 
  Info,
  Maximize2
} from 'lucide-react';
import { Language } from '../../types';

interface VolumeCalculatorProps {
  lang: Language;
  onApplyCalculatedQuote: (volumeCbm: number, weightKg: number, notes: string) => void;
}

export const VolumeCalculator: React.FC<VolumeCalculatorProps> = ({ lang, onApplyCalculatedQuote }) => {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [lengthCm, setLengthCm] = useState<number>(50);
  const [widthCm, setWidthCm] = useState<number>(40);
  const [heightCm, setHeightCm] = useState<number>(35);
  const [cartonCount, setCartonCount] = useState<number>(120);
  const [weightPerCartonKg, setWeightPerCartonKg] = useState<number>(14);

  // Volume math: (L * W * H in cm / 1,000,000) * count
  const singleCartonCbm = (lengthCm * widthCm * heightCm) / 1000000;
  const totalVolumeCbm = Math.round(singleCartonCbm * cartonCount * 100) / 100;
  const totalWeightKg = Math.round(cartonCount * weightPerCartonKg);

  // Container metrics
  // 20GP capacity: 28-33 CBM
  // 40HQ capacity: 68-76 CBM
  let containerType = '20GP';
  let containerNameAr = 'حاوية 20 قدم قياسية (20GP)';
  let containerNameEn = '20ft Standard Container (20GP)';
  let maxCbm = 30;
  let recommendationBadgeAr = 'حجم مناسب جداً لحاوية 20 قدم كاملة';
  let recommendationBadgeEn = 'Ideal volume for a full 20ft container';
  let badgeColor = 'bg-blue-500 text-white';

  if (totalVolumeCbm <= 14) {
    containerType = 'LCL';
    containerNameAr = 'شحن جزئي LCL (تجميع طرود في حاوية مشتركة)';
    containerNameEn = 'LCL Consolidation (Shared Container)';
    maxCbm = 15;
    recommendationBadgeAr = 'الخيار الأوفر لك: شحن جزئي دون دفع حاوية كاملة';
    recommendationBadgeEn = 'Most cost-effective: Pay only for the space you use';
    badgeColor = 'bg-emerald-600 text-white';
  } else if (totalVolumeCbm > 14 && totalVolumeCbm <= 30) {
    containerType = '20GP';
    containerNameAr = 'حاوية 20 قدم قياسية (20GP)';
    containerNameEn = '20ft General Purpose (20GP)';
    maxCbm = 30;
    recommendationBadgeAr = 'حجم مثالي لحاوية كاملة 20 قدم';
    recommendationBadgeEn = 'Perfect fit for a dedicated 20ft container';
    badgeColor = 'bg-[#0876C9] text-white';
  } else if (totalVolumeCbm > 30 && totalVolumeCbm <= 68) {
    containerType = '40HQ';
    containerNameAr = 'حاوية 40 قدم عالية السقف (40HQ)';
    containerNameEn = '40ft High Cube Container (40HQ)';
    maxCbm = 68;
    recommendationBadgeAr = 'أقصى وفر للشحنات الكبيرة (سعة حتى 68 متر مكعب)';
    recommendationBadgeEn = 'Maximum cost-efficiency for bulk commercial freight';
    badgeColor = 'bg-sky-600 text-white';
  } else {
    containerType = 'MULTI';
    const num40HQ = Math.ceil(totalVolumeCbm / 68);
    containerNameAr = `شحن متعدد (${num40HQ} حاويات 40HQ)`;
    containerNameEn = `Multi-Container Shipment (${num40HQ} x 40HQ)`;
    maxCbm = num40HQ * 68;
    recommendationBadgeAr = `شحنة ضخمة تتطلب ${num40HQ} حاويات 40HQ`;
    recommendationBadgeEn = `High-volume freight requiring ${num40HQ} containers`;
    badgeColor = 'bg-purple-600 text-white';
  }

  const fillPercentage = Math.min(Math.round((totalVolumeCbm / maxCbm) * 100), 100);

  const handleApply = () => {
    const summaryNotes = lang === 'ar'
      ? `حساب آلي: ${cartonCount} كرتون (${lengthCm}×${widthCm}×${heightCm} سم)، الإجمالي: ${totalVolumeCbm} CBM، الوزن: ${totalWeightKg} كجم. الحاوية المقترحة: ${containerNameAr}`
      : `Auto calculated: ${cartonCount} cartons (${lengthCm}×${widthCm}×${heightCm} cm), Total: ${totalVolumeCbm} CBM, Weight: ${totalWeightKg} kg. Mode: ${containerNameEn}`;
    onApplyCalculatedQuote(totalVolumeCbm, totalWeightKg, summaryNotes);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071B33] via-[#0B3158] to-[#0876C9] text-white p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle background tech texture */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-[#F39A16] flex items-center justify-center shrink-0 shadow-inner">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#F39A16] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'أداة تقدير لوجستية ذكية' : 'Smart Logistics Utility'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {lang === 'ar' ? 'حاسبة سعة وأحجام الحاويات البحرية' : 'Maritime Container & CBM Capacity Calculator'}
              </h3>
            </div>
          </div>

          <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-200">
            {lang === 'ar' ? 'معايير الشحن الدولي ISO' : 'ISO Freight Standards'}
          </span>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Inputs with Mobile-Friendly Touch Sliders (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#0876C9]" />
              <span>{lang === 'ar' ? 'أبعاد الكرتون أو الطرد الواحد (بالسنتيمتر):' : 'Single Carton Dimensions (cm):'}</span>
            </label>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-[#0876C9] focus-within:ring-2 focus-within:ring-[#0876C9]/20 transition-all text-center">
                <span className="text-[11px] font-bold text-slate-400 block mb-1">
                  {lang === 'ar' ? 'الطول (L)' : 'Length (L)'}
                </span>
                <input
                  type="number"
                  min="5"
                  max="300"
                  value={lengthCm}
                  onChange={(e) => setLengthCm(Math.max(1, Number(e.target.value)))}
                  className="w-full text-center font-bold font-mono text-base sm:text-lg text-[#0B3158] bg-transparent focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400">سم / cm</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-[#0876C9] focus-within:ring-2 focus-within:ring-[#0876C9]/20 transition-all text-center">
                <span className="text-[11px] font-bold text-slate-400 block mb-1">
                  {lang === 'ar' ? 'العرض (W)' : 'Width (W)'}
                </span>
                <input
                  type="number"
                  min="5"
                  max="300"
                  value={widthCm}
                  onChange={(e) => setWidthCm(Math.max(1, Number(e.target.value)))}
                  className="w-full text-center font-bold font-mono text-base sm:text-lg text-[#0B3158] bg-transparent focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400">سم / cm</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-[#0876C9] focus-within:ring-2 focus-within:ring-[#0876C9]/20 transition-all text-center">
                <span className="text-[11px] font-bold text-slate-400 block mb-1">
                  {lang === 'ar' ? 'الارتفاع (H)' : 'Height (H)'}
                </span>
                <input
                  type="number"
                  min="5"
                  max="300"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Math.max(1, Number(e.target.value)))}
                  className="w-full text-center font-bold font-mono text-base sm:text-lg text-[#0B3158] bg-transparent focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400">سم / cm</span>
              </div>
            </div>
          </div>

          {/* Quantities with Touch Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'ar' ? 'عدد الكراتين / الطرود:' : 'Total Carton Count:'}
                </label>
                <span className="text-xs font-mono font-bold text-[#0876C9] bg-sky-100/70 px-2 py-0.5 rounded-md">
                  {cartonCount} كرتون
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="1000"
                step="5"
                value={cartonCount}
                onChange={(e) => setCartonCount(Number(e.target.value))}
                className="w-full accent-[#0876C9] h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCartonCount(Math.max(5, cartonCount - 25))}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  - 25
                </button>
                <input
                  type="number"
                  min="1"
                  value={cartonCount}
                  onChange={(e) => setCartonCount(Math.max(1, Number(e.target.value)))}
                  className="w-20 text-center font-mono font-bold text-xs bg-white border border-slate-300 rounded-lg py-1"
                />
                <button
                  type="button"
                  onClick={() => setCartonCount(cartonCount + 25)}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  + 25
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'ar' ? 'وزن الكرتون الواحد (كجم):' : 'Weight per Carton (kg):'}
                </label>
                <span className="text-xs font-mono font-bold text-[#F39A16] bg-amber-100/70 px-2 py-0.5 rounded-md">
                  {weightPerCartonKg} كجم
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={weightPerCartonKg}
                onChange={(e) => setWeightPerCartonKg(Number(e.target.value))}
                className="w-full accent-[#F39A16] h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setWeightPerCartonKg(Math.max(1, weightPerCartonKg - 5))}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  - 5
                </button>
                <input
                  type="number"
                  min="0.5"
                  value={weightPerCartonKg}
                  onChange={(e) => setWeightPerCartonKg(Math.max(0.5, Number(e.target.value)))}
                  className="w-20 text-center font-mono font-bold text-xs bg-white border border-slate-300 rounded-lg py-1"
                />
                <button
                  type="button"
                  onClick={() => setWeightPerCartonKg(weightPerCartonKg + 5)}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  + 5
                </button>
              </div>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">{lang === 'ar' ? 'أمثلة سريعة:' : 'Quick Presets:'}</span>
            <button
              type="button"
              onClick={() => { setLengthCm(40); setWidthCm(30); setHeightCm(30); setCartonCount(50); setWeightPerCartonKg(10); }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer text-xs"
            >
              {lang === 'ar' ? 'طرد صغير (LCL جزئي)' : 'Small LCL'}
            </button>
            <button
              type="button"
              onClick={() => { setLengthCm(50); setWidthCm(40); setHeightCm(40); setCartonCount(320); setWeightPerCartonKg(16); }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer text-xs"
            >
              {lang === 'ar' ? 'حاوية كاملة 20GP' : 'Full 20GP Container'}
            </button>
            <button
              type="button"
              onClick={() => { setLengthCm(60); setWidthCm(50); setHeightCm(40); setCartonCount(550); setWeightPerCartonKg(20); }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer text-xs"
            >
              {lang === 'ar' ? 'حاوية ضخمة 40HQ' : 'Full 40HQ Container'}
            </button>
          </div>

        </div>

        {/* Right Column: Realistic ISO Container Visual Model & Capacity Specs (6 cols) */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#0B3158] to-[#071B33] text-white rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          
          <div className="space-y-5">
            
            {/* Top Specs Chips */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
                {containerType}
              </span>
              <span className="text-xs text-sky-200 font-medium">
                {lang === 'ar' ? recommendationBadgeAr : recommendationBadgeEn}
              </span>
            </div>

            {/* REALISTIC 3D-STYLED SHIPPING CONTAINER VISUALIZATION */}
            <div className="bg-[#051324] border border-white/15 rounded-2xl p-4 shadow-inner relative overflow-hidden">
              
              {/* Container Exterior Box */}
              <div className="relative rounded-xl border-2 border-sky-500/40 bg-gradient-to-r from-sky-900/60 to-blue-900/60 p-4 overflow-hidden">
                
                {/* Corrugated Vertical Ribs Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, #fff, #fff 4px, transparent 4px, transparent 12px)`
                  }}
                />

                {/* Container Corner Castings & Labels */}
                <div className="flex items-center justify-between text-[11px] font-mono text-sky-300 relative z-10 border-b border-sky-500/30 pb-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#F39A16]" />
                    <span className="font-bold text-white tracking-widest">SAMA CAPITAL CARGO</span>
                  </div>
                  <span className="bg-black/40 px-2 py-0.5 rounded text-amber-300 font-bold">
                    {containerType === 'LCL' ? 'LCL CONSOL' : `${containerType} CONTAINER`}
                  </span>
                </div>

                {/* Visual Cargo Fill Graphics */}
                <div className="space-y-2 relative z-10">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">
                      {lang === 'ar' ? 'نسبة استيعاب الحاوية:' : 'Container Volume Capacity:'}
                    </span>
                    <span className="font-mono font-black text-amber-300 text-sm">
                      {fillPercentage}%
                    </span>
                  </div>

                  {/* Modern Animated Gradient Packing Bar */}
                  <div className="h-5 w-full bg-slate-900/80 rounded-xl p-0.5 border border-sky-400/30 overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-sky-500 via-[#0876C9] to-[#F39A16] rounded-lg transition-all duration-700 flex items-center justify-end pe-2"
                      style={{ width: `${Math.max(10, fillPercentage)}%` }}
                    >
                      <span className="text-[10px] font-mono font-bold text-white drop-shadow-sm">
                        {totalVolumeCbm} CBM
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-0.5">
                    <span>0 CBM</span>
                    <span className="text-sky-300">سعة الحاوية المرجعية: {maxCbm} CBM</span>
                    <span>{maxCbm} CBM</span>
                  </div>
                </div>

                {/* Live Stacking Info Box */}
                <div className="mt-3.5 pt-3 border-t border-sky-500/20 grid grid-cols-2 gap-3 text-xs relative z-10">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{lang === 'ar' ? 'إجمالي الحجم المحسوب:' : 'Calculated Volume:'}</span>
                    <span className="text-base font-black font-mono text-white mt-0.5 block">
                      {totalVolumeCbm} <span className="text-xs text-amber-300">م³ / CBM</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">{lang === 'ar' ? 'إجمالي الوزن التقريبي:' : 'Total Gross Weight:'}</span>
                    <span className="text-base font-black font-mono text-white mt-0.5 block">
                      {totalWeightKg.toLocaleString()} <span className="text-xs text-amber-300">كجم / KG</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* Verified Recommendation Note */}
              <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
                <span className="text-amber-400 font-bold block mb-0.5">
                  💡 {lang === 'ar' ? 'نصيحة فريق الشحن والتخليص:' : 'Operations Recommendation:'}
                </span>
                <p>
                  {lang === 'ar'
                    ? (containerType === 'LCL'
                        ? 'حجم بضاعتك أقل من 15 CBM، الشحن الجزئي LCL المشترك يوفر عليك مبالغ كبيرة حيث تدفع فقط مقابل الأمتار المكعبة التي تشغلها بضاعتك فعلياً.'
                        : containerType === '20GP'
                        ? 'بضاعتك تملأ حاوية 20 قدم بشكل ممتاز ومجدٍ اقتصادياً، ننصح بحجز حاوية كاملة لضمان سرعة إبحارها وتخليصها مباشرة.'
                        : 'هذا الحجم التجاري الكبير يستفيد من أقصى سعر تفضيلي في حاويات 40 قدم High Cube.'
                      )
                    : (containerType === 'LCL'
                        ? 'Under 15 CBM, LCL consolidation is significantly more economical as you only pay for actual space occupied.'
                        : 'Your cargo volume optimally fills a 20ft container with strong freight economics.'
                      )}
                </p>
              </div>

            </div>

          </div>

          {/* Action CTA Button */}
          <div className="pt-6 mt-4 border-t border-white/10">
            <button
              onClick={handleApply}
              className="w-full py-3.5 bg-gradient-to-r from-[#0876C9] to-sky-500 hover:from-[#0987e3] hover:to-sky-400 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xl hover:shadow-sky-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>{lang === 'ar' ? 'تطبيق هذه الحسابات وطلب تسعير معتمد' : 'Apply Dimensions & Request Formal Quote'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
