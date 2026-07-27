import React, { useState } from 'react';
import { LanguageMode } from '../types';
import {
  Zap,
  Flame,
  Calculator,
  HelpCircle,
  Lightbulb,
  TrendingDown,
  Sparkles,
  RefreshCw,
  Upload,
  AlertTriangle
} from 'lucide-react';

interface UtilityBillAIProps {
  language: LanguageMode;
}

export const UtilityBillAI: React.FC<UtilityBillAIProps> = ({ language }) => {
  const [activeSubTab, setActiveSubTab] = useState<'estimator' | 'analyzer'>('estimator');
  const [provider, setProvider] = useState('LESCO');
  const [units, setUnits] = useState<number>(250);
  const [isProtected, setIsProtected] = useState<boolean>(false);
  const [fpaRate, setFpaRate] = useState<number>(3.5); // Average FPA rate per unit

  const [billImage, setBillImage] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // NEPRA Tariff calculation logic for Pakistan Electricity
  const calculateBill = () => {
    let baseCost = 0;
    const u = Math.max(0, units);

    if (isProtected && u <= 200) {
      if (u <= 100) baseCost = u * 7.74;
      else baseCost = 100 * 7.74 + (u - 100) * 10.06;
    } else {
      // Unprotected slabs
      if (u <= 100) baseCost = u * 16.48;
      else if (u <= 200) baseCost = 100 * 16.48 + (u - 100) * 22.95;
      else if (u <= 300) baseCost = 100 * 16.48 + 100 * 22.95 + (u - 200) * 27.14;
      else if (u <= 400) baseCost = 100 * 16.48 + 100 * 22.95 + 100 * 27.14 + (u - 300) * 32.03;
      else if (u <= 500) baseCost = 100 * 16.48 + 100 * 22.95 + 100 * 27.14 + 100 * 32.03 + (u - 400) * 35.24;
      else if (u <= 700) baseCost = 100 * 16.48 + 100 * 22.95 + 100 * 27.14 + 100 * 32.03 + 100 * 35.24 + (u - 500) * 40.0;
      else baseCost = u * 42.0;
    }

    const fpa = u * fpaRate;
    const fcSurcharge = u * 3.23; // FC Surcharge
    const electricityDuty = baseCost * 0.015; // 1.5% duty
    const tvFee = 35; // Fixed PTV Fee
    const subtotal = baseCost + fpa + fcSurcharge + electricityDuty + tvFee;
    const gst = subtotal * 0.18; // 18% GST
    const totalEstimate = subtotal + gst;

    return {
      baseCost: Math.round(baseCost),
      fpa: Math.round(fpa),
      fcSurcharge: Math.round(fcSurcharge),
      electricityDuty: Math.round(electricityDuty),
      tvFee,
      gst: Math.round(gst),
      totalEstimate: Math.round(totalEstimate),
    };
  };

  const calculated = calculateBill();

  const handleBillImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setBillImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAiBillAnalysis = async () => {
    setIsLoading(true);
    setAiAnalysis(null);

    try {
      const response = await fetch('/api/utility-bill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          units,
          imageBase64: billImage,
          language,
        }),
      });

      const data = await response.json();
      if (response.ok && data.insights) {
        setAiAnalysis(data.insights);
      } else {
        throw new Error(data.error || 'Failed to analyze bill');
      }
    } catch (err: any) {
      console.error(err);
      setAiAnalysis(
        language === 'ur'
          ? 'بل کا تجزیہ کرنے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔'
          : 'Failed to complete utility bill AI analysis. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Top Banner */}
      <div className="bg-[#01411C] text-white rounded-2xl p-6 shadow-xs border border-[#013516]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/10 rounded-xl">
              <Zap className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
                {language === 'ur' ? 'یوٹیلٹی بل اے آئی اور کیلکولیٹر' : 'Pakistani Utility Bill AI & Cost Estimator'}
              </h1>
              <p className="text-xs sm:text-sm text-white/80">
                {language === 'ur'
                  ? 'بجلی و گیس کے بلوں کا تخمینہ لگائیں، نپرا سلیب ٹیرف، FPA اور ٹیکس سمجھے، اور بل کم کرنے کے طریقے حاصل کریں۔'
                  : 'Estimate monthly electricity/gas costs based on NEPRA slabs, decode FPA, QTA & GST, and discover actionable ways to reduce bills.'}
              </p>
            </div>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex space-x-2 mt-5 border-t border-white/10 pt-3">
          <button
            onClick={() => setActiveSubTab('estimator')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              activeSubTab === 'estimator'
                ? 'bg-white text-[#01411C] shadow-xs'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>{language === 'ur' ? 'سلیب بل کیلکولیٹر' : 'NEPRA Slab Cost Calculator'}</span>
          </button>
          <button
            onClick={() => setActiveSubTab('analyzer')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              activeSubTab === 'analyzer'
                ? 'bg-white text-[#01411C] shadow-xs'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'ur' ? 'بل اے آئی تجزیہ کار' : 'AI Bill Insights & Reduction Plan'}</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'estimator' ? (
        /* Estimator View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h2 className="font-bold text-slate-900 text-sm flex items-center space-x-2 pb-2 border-b border-slate-100">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ur' ? 'بل کی بنیادی معلومات درج کریں:' : 'Enter Electricity Consumption Details:'}</span>
            </h2>

            {/* Provider */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Electricity Provider (DISCO):
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium outline-none focus:border-emerald-600"
              >
                <option value="LESCO">LESCO (Lahore)</option>
                <option value="K-Electric">K-Electric (Karachi)</option>
                <option value="IESCO">IESCO (Islamabad/Rawalpindi)</option>
                <option value="FESCO">FESCO (Faisalabad)</option>
                <option value="MEPCO">MEPCO (Multan)</option>
                <option value="PESCO">PESCO (Peshawar)</option>
                <option value="HESCO">HESCO (Hyderabad)</option>
                <option value="GEPCO">GEPCO (Gujranwala)</option>
              </select>
            </div>

            {/* Units Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">Units Consumed (kWh):</label>
                <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {units} Units
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="1000"
                step="10"
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>50 U</span>
                <span>200 U (Slab Threshold)</span>
                <span>500 U</span>
                <span>1000 U</span>
              </div>
            </div>

            {/* Consumer Status Toggle */}
            <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-950 block">Protected Consumer Status:</span>
                  <span className="text-[10px] text-amber-800">
                    Consuming &lt;200 units consistently for 6 consecutive months.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isProtected}
                  onChange={(e) => setIsProtected(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* FPA Adjustment */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimated Fuel Price Adjustment (FPA Rate per unit):
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="15"
                  value={fpaRate}
                  onChange={(e) => setFpaRate(Number(e.target.value))}
                  className="w-24 p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold outline-none"
                />
                <span className="text-xs text-slate-500">PKR / Unit</span>
              </div>
            </div>
          </div>

          {/* Breakdown Results */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div>
                  <h2 className="font-extrabold text-slate-900 text-base">
                    {provider} Electricity Cost Estimation
                  </h2>
                  <p className="text-xs text-slate-500">
                    Based on official NEPRA tariff rates & statutory taxes in Pakistan
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Total Bill Payable</div>
                  <div className="text-2xl font-black text-emerald-800">
                    PKR {calculated.totalEstimate.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Base Energy Cost ({units} Units):</span>
                  <span className="font-bold text-slate-900">PKR {calculated.baseCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Fuel Price Adjustment (FPA @ PKR {fpaRate}/unit):</span>
                  <span className="font-semibold text-amber-700">PKR {calculated.fpa.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Financing Cost (FC) Surcharge (@ PKR 3.23/unit):</span>
                  <span className="font-semibold text-slate-700">PKR {calculated.fcSurcharge.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Electricity Duty (1.5%):</span>
                  <span className="font-semibold text-slate-700">PKR {calculated.electricityDuty.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">TV Fee (Fixed PTV Charge):</span>
                  <span className="font-semibold text-slate-700">PKR {calculated.tvFee}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 bg-amber-50/50 p-2 rounded">
                  <span className="font-bold text-amber-900">General Sales Tax (GST @ 18%):</span>
                  <span className="font-black text-amber-900">PKR {calculated.gst.toLocaleString()}</span>
                </div>
              </div>

              {/* Critical Alert about 200 unit slab */}
              {units > 200 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2.5 text-xs text-red-900">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Slab Warning (&gt;200 Units):</span>
                    You have crossed 200 units! In Pakistan, exceeding 200 units shifts your meter into the Unprotected Category, increasing per-unit rate substantially. Reducing consumption below 200 units can cut your bill significantly!
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500">
              💡 Note: Exact bills may vary slightly based on quarterly adjustments (QTA) announced by NEPRA for {provider}.
            </div>
          </div>
        </div>
      ) : (
        /* Analyzer View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h2 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ur' ? 'بل کی تصویر اپ لوڈ کریں:' : 'Upload Utility Bill Photo:'}</span>
            </h2>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center bg-slate-50 relative cursor-pointer hover:border-emerald-500 transition-colors">
              <input type="file" accept="image/*" onChange={handleBillImageUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              <Upload className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
              <p className="text-xs font-semibold text-slate-700">Click to upload bill image</p>
              <p className="text-[10px] text-slate-400">LESCO, KE, FESCO, SNGPL, SSGC</p>
            </div>

            {billImage && (
              <div className="rounded-lg overflow-hidden border border-slate-200 max-h-40">
                <img src={billImage} alt="Bill Preview" className="w-full h-full object-cover" />
              </div>
            )}

            <button
              onClick={handleAiBillAnalysis}
              disabled={isLoading}
              className="w-full py-3 bg-[#01411C] hover:bg-[#013516] text-white font-bold rounded-xl shadow-xs flex items-center justify-center space-x-2 text-xs sm:text-sm transition-all"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Bill Insights...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate AI Bill Reduction Plan</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[350px]">
            <div>
              <h2 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-200 mb-4 flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <span>AI Bill Analysis & Energy Saving Recommendations</span>
              </h2>

              {!aiAnalysis && !isLoading && (
                <div className="text-center py-16 text-slate-400 text-xs">
                  Upload a bill image or click "Generate AI Bill Reduction Plan" to see personalized savings insights.
                </div>
              )}

              {isLoading && (
                <div className="text-center py-16 space-y-3">
                  <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-semibold text-slate-600">Analyzing bill charges, FPA, and energy optimization tips...</p>
                </div>
              )}

              {aiAnalysis && !isLoading && (
                <div className="prose prose-slate max-w-none text-xs sm:text-sm whitespace-pre-line leading-relaxed text-slate-800">
                  {aiAnalysis}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              💡 Tip: Running high-wattage appliances (Inverter AC, Motors, Irons) outside Peak Hours (7 PM - 11 PM) saves up to 25% on bills in Pakistan.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
