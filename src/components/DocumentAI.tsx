import React, { useState } from 'react';
import { LanguageMode } from '../types';
import { SAMPLE_DOCUMENTS } from '../data/govData';
import {
  FileText,
  Upload,
  Image as ImageIcon,
  Sparkles,
  AlertCircle,
  Clock,
  DollarSign,
  CheckCircle2,
  BookOpen,
  Camera,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

interface DocumentAIProps {
  language: LanguageMode;
}

export const DocumentAI: React.FC<DocumentAIProps> = ({ language }) => {
  const [selectedSample, setSelectedSample] = useState<string>('');
  const [documentText, setDocumentText] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedSample('');
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setImageBase64(result);
      setDocumentText('');
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sampleId: string) => {
    const sample = SAMPLE_DOCUMENTS.find((s) => s.id === sampleId);
    if (sample) {
      setSelectedSample(sampleId);
      setDocumentText(sample.sampleText);
      setImageBase64(null);
      setImagePreview(null);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!imageBase64 && !documentText.trim()) return;

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/document-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imageBase64,
          documentText: documentText,
          language: language,
        }),
      });

      const data = await response.json();
      if (response.ok && data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        throw new Error(data.error || 'Failed to analyze document');
      }
    } catch (err: any) {
      console.error(err);
      setAnalysisResult(
        language === 'ur'
          ? 'دستاویز کے تجزئیے کے دوران غلطی پیش آئی۔ براہ کرم تصویر یا متن دوبارہ چیک کریں۔'
          : 'Failed to process document analysis. Please verify your upload and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (analysisResult) {
      navigator.clipboard.writeText(analysisResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header Banner */}
      <div className="bg-[#01411C] text-white rounded-2xl p-6 shadow-xs border border-[#013516]">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-white/10 rounded-xl">
            <FileText className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
              {language === 'ur' ? 'دستاویز اے آئی اسکینر' : 'Document & Bill AI Analyzer'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80">
              {language === 'ur'
                ? 'اپنے بل، نوٹس، فارم یا خط کی تصویر اپ لوڈ کریں اور مکمل خلاصہ اور ضروری اقدامات حاصل کریں۔'
                : 'Analyze uploaded utility bills, NADRA forms, tax notices, and official letters. Get summaries, deadlines, fee breakdowns, and jargon decoder.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload / Presets Input */}
        <div className="lg:col-span-5 space-y-5">
          {/* Sample Presets */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {language === 'ur' ? 'نمونہ دستاویزات منتخب کریں:' : '⚡ Select Sample Pakistani Document:'}
            </label>
            <div className="space-y-2">
              {SAMPLE_DOCUMENTS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => handleSelectSample(doc.id)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                    selectedSample === doc.id
                      ? 'border-[#01411C] bg-emerald-50/60 text-[#01411C] font-semibold ring-1 ring-[#01411C]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-slate-900">
                    {language === 'ur' ? doc.title.ur : doc.title.en}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">{doc.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Image Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {language === 'ur' ? 'یا تصویر اپ لوڈ کریں:' : '📷 Upload Document Image:'}
            </label>

            <div className="border-2 border-dashed border-slate-300 hover:border-[#01411C] rounded-2xl p-5 text-center bg-slate-50/50 hover:bg-emerald-50/20 transition-colors relative cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-8 h-8 mx-auto text-[#01411C] mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-slate-800">
                {language === 'ur' ? 'تصویر کا انتخاب کریں یا ڈریگ کریں' : 'Click or Drag & Drop Document Photo'}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, JPEG (Max 15MB)</p>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                <img src={imagePreview} alt="Document Preview" className="max-h-48 w-full object-contain mx-auto" />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setImageBase64(null);
                  }}
                  className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded text-[10px] font-bold"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Document Text Input Box */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'ur' ? 'یا دستاویز کا متن یہاں پیسٹ کریں:' : 'Or Paste Document Text Here:'}
              </label>
              <textarea
                value={documentText}
                onChange={(e) => {
                  setDocumentText(e.target.value);
                  setSelectedSample('');
                  setImageBase64(null);
                  setImagePreview(null);
                }}
                rows={5}
                placeholder="Paste bill details, notice text, or official letter content..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-[#01411C] focus:bg-white resize-none"
              />
            </div>

            {/* Analyze Trigger Button */}
            <button
              onClick={handleAnalyze}
              disabled={(!imageBase64 && !documentText.trim()) || isLoading}
              className="w-full py-3 bg-[#01411C] hover:bg-[#013516] disabled:bg-slate-300 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2 text-sm"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Document with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>{language === 'ur' ? 'دستاویز کا تجزیہ کریں' : 'Analyze Document Now'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: AI Analysis Output */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs min-h-[400px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#01411C]" />
                <h2 className="font-bold text-slate-900 text-base">
                  {language === 'ur' ? 'اے آئی کی تفصیلی رپورٹ' : 'Document AI Analysis & Action Steps'}
                </h2>
              </div>
              {analysisResult && (
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Report'}</span>
                </button>
              )}
            </div>

            {!analysisResult && !isLoading && (
              <div className="text-center py-16 text-slate-400 space-y-3">
                <FileText className="w-12 h-12 mx-auto text-slate-300" />
                <p className="text-sm font-medium">
                  {language === 'ur'
                    ? 'کوئی دستاویز منتخب کریں یا اپ لوڈ کریں تاکہ اے آئی تجزیہ شروع کر سکے۔'
                    : 'Select a sample document above or upload an image/text to view structured AI insights.'}
                </p>
              </div>
            )}

            {isLoading && (
              <div className="py-20 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#01411C] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-semibold text-[#01411C]">
                  PakHelp Document AI is parsing details, due dates, fees, and action steps...
                </p>
              </div>
            )}

            {analysisResult && !isLoading && (
              <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-800">
                {analysisResult}
              </div>
            )}
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>🛡️ Powered by Gemini 3.6 Flash Server Proxy</span>
            <span>Always verify critical notices with official department helplines.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
