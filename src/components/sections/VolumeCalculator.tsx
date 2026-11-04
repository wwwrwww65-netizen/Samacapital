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
              <div className="p-3 bg-[#F1F6FA] rounded-2xl border border-[#E1E9F0] focus-within:border-[#0876C9] focus-within:ring-2 focus-within:ring-[#0876C9]/20 transition-all text-center">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">
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

              <div className="p-3 bg-[#F1F6FA] rounded-2xl border border-[#E1E9F0] focus-within:border-[#0876C9] focus-within:ring-2 focus-within:ring-[#0876C9]/20 transition-all text-center">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">
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

              <div className="p-3 bg-[#F1F6FA] rounded-2xl border border-[#E1E9F0] focus-within:border-[#0876C9] focus-within:ring-2 focus-within:ring-[#0876C9]/20 transition-all text-center">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">
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
            <div className="p-4 bg-[#F1F6FA] rounded-2xl border border-[#E1E9F0]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'ar' ? 'عدد الكراتين / الطرود:' : 'Total Carton Count:'}
                </label>
                <span className="text-xs font-mono font-bold text-[#0876C9] bg-white px-2 py-0.5 rounded-md border border-[#E1E9F0] shadow-2xs">
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
              <div className="mt-2.5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCartonCount(Math.max(5, cartonCount - 25))}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-[#E1E9F0] text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                >
                  - 25
                </button>
                <input
                  type="number"
                  min="1"
                  value={cartonCount}
                  onChange={(e) => setCartonCount(Math.max(1, Number(e.target.value)))}
                  className="w-20 text-center font-mono font-bold text-xs bg-white border border-[#E1E9F0] rounded-lg py-1 shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setCartonCount(cartonCount + 25)}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-[#E1E9F0] text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                >
                  + 25
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#F1F6FA] rounded-2xl border border-[#E1E9F0]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'ar' ? 'وزن الكرتون الواحد (كجم):' : 'Weight per Carton (kg):'}
                </label>
                <span className="text-xs font-mono font-bold text-[#F39A16] bg-white px-2 py-0.5 rounded-md border border-[#E1E9F0] shadow-2xs">
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
              <div className="mt-2.5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setWeightPerCartonKg(Math.max(1, weightPerCartonKg - 5))}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-[#E1E9F0] text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                >
                  - 5
                </button>
                <input
                  type="number"
                  min="0.5"
                  value={weightPerCartonKg}
                  onChange={(e) => setWeightPerCartonKg(Math.max(0.5, Number(e.target.value)))}
                  className="w-20 text-center font-mono font-bold text-xs bg-white border border-[#E1E9F0] rounded-lg py-1 shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setWeightPerCartonKg(weightPerCartonKg + 5)}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-[#E1E9F0] text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
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
              className="px-3 py-1.5 rounded-xl bg-[#F1F6FA] hover:bg-white text-slate-700 font-semibold cursor-pointer text-xs border border-[#E1E9F0] transition-colors shadow-2xs"
            >
              {lang === 'ar' ? 'طرد صغير (LCL جزئي)' : 'Small LCL'}
            </button>
            <button
              type="button"
              onClick={() => { setLengthCm(50); setWidthCm(40); setHeightCm(40); setCartonCount(320); setWeightPerCartonKg(16); }}
              className="px-3 py-1.5 rounded-xl bg-[#F1F6FA] hover:bg-white text-slate-700 font-semibold cursor-pointer text-xs border border-[#E1E9F0] transition-colors shadow-2xs"
            >
              {lang === 'ar' ? 'حاوية كاملة 20GP' : 'Full 20GP Container'}
            </button>
            <button
              type="button"
              onClick={() => { setLengthCm(60); setWidthCm(50); setHeightCm(40); setCartonCount(550); setWeightPerCartonKg(20); }}
              className="px-3 py-1.5 rounded-xl bg-[#F1F6FA] hover:bg-white text-slate-700 font-semibold cursor-pointer text-xs border border-[#E1E9F0] transition-colors shadow-2xs"
            >
              {lang === 'ar' ? 'حاوية ضخمة 40HQ' : 'Full 40HQ Container'}
            </button>
          </div>

        </div>

        {/* Right Column: Realistic ISO Shipping Container 3D Architecture & Volumetric Fill (6 cols) */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#0B3158] via-[#082847] to-[#071B33] text-white rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col justify-between border border-sky-900/40">
          
          <div className="space-y-6">
            
            {/* Top Specs Bar - Zero Pills, Clean Typography */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-[#0876C9] text-white shadow-xs">
                  {containerType}
                </span>
                <span className="text-xs font-bold text-white tracking-wide">
                  {lang === 'ar' ? containerNameAr : containerNameEn}
                </span>
              </div>
              <span className="text-xs text-amber-300 font-medium">
                {lang === 'ar' ? recommendationBadgeAr : recommendationBadgeEn}
              </span>
            </div>

            {/* REALISTIC 3D-STYLED SHIPPING CONTAINER VISUALIZATION */}
            <div className="bg-[#030d1a] border border-sky-500/25 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
              
              {/* Outer Steel Container Shell with Industrial Corner Castings */}
              <div className="relative rounded-xl border-2 border-sky-400/40 corten-steel-wall overflow-hidden shadow-2xl">
                
                {/* 4 Heavy-Duty Mechanical Corner Twist-Lock Castings */}
                <div className="absolute top-1.5 start-1.5 w-5 h-5 bg-gradient-to-br from-slate-300 to-slate-600 rounded-xs border border-white/40 shadow-md flex items-center justify-center z-20">
                  <div className="w-2.5 h-1.5 bg-black/80 rounded-full" />
                </div>
                <div className="absolute top-1.5 end-1.5 w-5 h-5 bg-gradient-to-br from-slate-300 to-slate-600 rounded-xs border border-white/40 shadow-md flex items-center justify-center z-20">
                  <div className="w-2.5 h-1.5 bg-black/80 rounded-full" />
                </div>
                <div className="absolute bottom-1.5 start-1.5 w-5 h-5 bg-gradient-to-br from-slate-300 to-slate-600 rounded-xs border border-white/40 shadow-md flex items-center justify-center z-20">
                  <div className="w-2.5 h-1.5 bg-black/80 rounded-full" />
                </div>
                <div className="absolute bottom-1.5 end-1.5 w-5 h-5 bg-gradient-to-br from-slate-300 to-slate-600 rounded-xs border border-white/40 shadow-md flex items-center justify-center z-20">
                  <div className="w-2.5 h-1.5 bg-black/80 rounded-full" />
                </div>

                {/* ISO Container Top Stencil Header */}
                <div className="flex items-center justify-between text-[11px] font-mono text-sky-200 relative z-10 px-7 pt-2.5 pb-2 border-b border-sky-500/20 bg-black/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F39A16]" />
                    <span className="font-extrabold tracking-widest text-white">SAMA CAPITAL</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-amber-400 font-bold">SAMU 202688 4</span>
                  </div>
                  <div className="text-slate-300 font-bold bg-white/10 px-2 py-0.5 rounded text-[10px] tracking-wider">
                    {containerType === '40HQ' ? '45G1 / HIGH CUBE' : containerType === '20GP' ? '22G1 / GP' : 'LCL CONSOLIDATION'}
                  </div>
                </div>

                {/* Container Body: Cargo Bay Cutaway + Door Mechanics */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 sm:px-6 relative z-10">
                  
                  {/* Left 8 Cols: Dynamic Volumetric Cargo Level Cutaway */}
                  <div className="sm:col-span-8 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">
                        {lang === 'ar' ? 'مستوى امتلاء سعة الحاوية:' : 'Cargo Volumetric Fill:'}
                      </span>
                      <span className="font-mono font-black text-amber-300 text-sm tabular-nums">
                        {fillPercentage}%
                      </span>
                    </div>

                    {/* Volumetric Container Cross-Section Bay */}
                    <div className="h-24 w-full bg-slate-950/90 rounded-xl border border-sky-400/30 p-2 relative overflow-hidden flex flex-col justify-end">
                      
                      {/* Grid Guide Mesh Lines */}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-15"
                        style={{
                          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                          backgroundSize: '16px 16px'
                        }}
                      />

                      {/* Stacked Cargo Graphics Layer */}
                      <div 
                        className="w-full bg-gradient-to-t from-amber-600/70 via-amber-500/80 to-[#F39A16] rounded-lg transition-all duration-700 relative overflow-hidden flex items-center justify-center border-t-2 border-white shadow-lg"
                        style={{ height: `${Math.max(16, fillPercentage)}%` }}
                      >
                        {/* Internal carton stacking pattern */}
                        <div 
                          className="absolute inset-0 opacity-25"
                          style={{
                            backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 8px)`
                          }}
                        />
                        <span className="relative z-10 text-[11px] font-mono font-black text-slate-950 px-2 py-0.5 bg-white/90 rounded shadow-xs tabular-nums">
                          {totalVolumeCbm} CBM · {cartonCount} {lang === 'ar' ? 'طرد' : 'pkgs'}
                        </span>
                      </div>

                      {/* Floor Timber Runner */}
                      <div className="h-1.5 w-full bg-amber-900/60 border-t border-amber-800 rounded-xs mt-1" />
                    </div>

                    {/* Reference Volume Bounds */}
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 tabular-nums">
                      <span>0 CBM</span>
                      <span className="text-sky-300 font-bold">{lang === 'ar' ? `السعة المقدرة: ${maxCbm} CBM` : `Container Reference: ${maxCbm} CBM`}</span>
                      <span>{maxCbm} CBM</span>
                    </div>
                  </div>

                  {/* Right 4 Cols: Marine ISO Container End Door Stencils & Lock Mechanism */}
                  <div className="sm:col-span-4 bg-slate-900/80 rounded-xl p-3 border border-sky-400/20 flex flex-col justify-between text-[10px] font-mono space-y-2 relative">
                    
                    {/* Dual Vertical Galvanized Steel Locking Bars Graphic */}
                    <div className="absolute top-2 bottom-2 start-1/3 w-1 bg-gradient-to-r from-slate-400 via-white to-slate-500 rounded-full shadow-xs" />
                    <div className="absolute top-2 bottom-2 end-1/3 w-1 bg-gradient-to-r from-slate-400 via-white to-slate-500 rounded-full shadow-xs" />
                    
                    {/* Yellow Tamper-Proof Bolt Seal */}
                    <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#F39A16] text-slate-950 font-bold text-[8px] px-1 py-0.5 rounded shadow-sm border border-amber-300">
                      SEAL: 8892
                    </div>

                    <div className="relative z-10 space-y-1 text-slate-300">
                      <div className="text-[9px] text-amber-400 font-bold border-b border-white/10 pb-1">
                        ISO SPECIFICATIONS
                      </div>
                      <div className="flex justify-between tabular-nums">
                        <span className="text-slate-400">MAX.WT:</span>
                        <span className="text-white font-bold">32,500 KG</span>
                      </div>
                      <div className="flex justify-between tabular-nums">
                        <span className="text-slate-400">TARE:</span>
                        <span className="text-white">3,850 KG</span>
                      </div>
                      <div className="flex justify-between tabular-nums">
                        <span className="text-slate-400">NET:</span>
                        <span className="text-white">28,650 KG</span>
                      </div>
                      <div className="flex justify-between tabular-nums">
                        <span className="text-slate-400">CU.CAP:</span>
                        <span className="text-amber-300 font-bold">{maxCbm} M³</span>
                      </div>
                    </div>

                    <div className="relative z-10 pt-1 border-t border-white/10 text-[9px] text-sky-300 font-bold text-center">
                      CORTEN STEEL 2026
                    </div>
                  </div>

                </div>

                {/* Live Stacking Info Box */}
                <div className="px-6 py-3 bg-black/30 border-t border-sky-500/20 grid grid-cols-2 gap-4 text-xs relative z-10">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">{lang === 'ar' ? 'إجمالي الحجم المحسوب:' : 'Calculated Volume:'}</span>
                    <span className="text-lg font-black font-mono text-white mt-0.5 block tabular-nums">
                      {totalVolumeCbm} <span className="text-xs text-amber-300 font-bold">م³ / CBM</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">{lang === 'ar' ? 'إجمالي الوزن التقريبي:' : 'Total Gross Weight:'}</span>
                    <span className="text-lg font-black font-mono text-white mt-0.5 block tabular-nums">
                      {totalWeightKg.toLocaleString()} <span className="text-xs text-amber-300 font-bold">كجم / KG</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* Verified Recommendation Note */}
              <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
                <span className="text-amber-400 font-bold block mb-1">
                  💡 {lang === 'ar' ? 'نصيحة مهندسي الشحن والتخليص في سما كابيتال:' : 'Sama Capital Freight Operations Advice:'}
                </span>
                <p>
                  {lang === 'ar'
                    ? (containerType === 'LCL'
                        ? 'حجم بضاعتك أقل من 15 CBM، خيار الشحن الجزئي المشترك (LCL Consolidation) هو الأكثر جدوى اقتصادية، حيث لا تدفع تكلفة حاوية كاملة وتدفع فقط مقابل حجم طرودك.'
                        : containerType === '20GP'
                        ? 'بضاعتك تملأ حاوية 20 قدم قياسية بنسبة كفاءة ممتازة، ننصح بحجز حاوية كاملة لسرعة التخليص في الميناء بدون انتظار فرز بضائع التجار الآخرين.'
                        : 'شحنتك ذات حجم تجاري كبير تناسب حاويات 40 قدم High Cube ذات السقف المرتفع لتحقيق أقل تكلفة للشحن للمتر المكعب الواحد.'
                      )
                    : (containerType === 'LCL'
                        ? 'Below 15 CBM, shared LCL consolidation provides maximum freight economy, billing strictly for your exact occupied CBM.'
                        : 'Your cargo volume optimally packs a 20GP container with rapid dedicated customs release at destination port.'
                      )}
                </p>
              </div>

            </div>

          </div>

          {/* Action CTA Button */}
          <div className="pt-6 mt-4 border-t border-white/10">
            <button
              onClick={handleApply}
              className="w-full py-4 bg-gradient-to-r from-[#0876C9] via-sky-500 to-[#0876C9] hover:from-[#0987e3] hover:to-sky-400 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-sky-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
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
