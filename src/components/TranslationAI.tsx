import React, { useState } from 'react';
import { LanguageMode } from '../types';
import {
  Languages,
  ArrowRightLeft,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Volume2,
  VolumeX
} from 'lucide-react';

interface TranslationAIProps {
  language: LanguageMode;
}

export const TranslationAI: React.FC<TranslationAIProps> = ({ language }) => {
  const [inputText, setInputText] = useState('');
  const [direction, setDirection] = useState<'ur_to_en' | 'en_to_ur' | 'en_to_roman_ur'>('ur_to_en');
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setTranslatedText(null);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          direction,
        }),
      });

      const data = await response.json();
      if (response.ok && data.translatedText) {
        setTranslatedText(data.translatedText);
      } else {
        throw new Error(data.error || 'Translation failed');
      }
    } catch (err: any) {
      console.error(err);
      setTranslatedText('Translation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSpeak = () => {
    if (translatedText && 'speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = direction === 'en_to_ur' ? 'ur-PK' : 'en-US';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const swapDirection = () => {
    if (direction === 'ur_to_en') setDirection('en_to_ur');
    else if (direction === 'en_to_ur') setDirection('en_to_roman_ur');
    else setDirection('ur_to_en');
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Banner */}
      <div className="bg-[#01411C] text-white rounded-2xl p-6 shadow-xs border border-[#013516]">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-white/10 rounded-xl">
            <Languages className="w-7 h-7 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
              {language === 'ur' ? 'پاکستانی ترجمہ کار اے آئی' : 'Urdu & English Citizen Translation AI'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80">
              {language === 'ur'
                ? 'اردو، انگریزی اور رومن اردو میں درست، سادہ اور حکومتی اصطلاحات پر مبنی ترجمہ حاصل کریں۔'
                : 'Accurate translation between Urdu script, English, and Roman Urdu. Specifically tailored for Pakistani administrative, legal, and everyday terms.'}
            </p>
          </div>
        </div>
      </div>

      {/* Direction Selector Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
          <span>Direction:</span>
          <span className="px-3 py-1 bg-[#01411C]/10 text-[#01411C] rounded-lg">
            {direction === 'ur_to_en'
              ? 'Urdu Script ➔ English'
              : direction === 'en_to_ur'
              ? 'English ➔ Urdu Script (اردو)'
              : 'English ➔ Roman Urdu'}
          </span>
        </div>

        <button
          onClick={swapDirection}
          className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-[#01411C]" />
          <span>Switch Language Mode</span>
        </button>
      </div>

      {/* Translation Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Text Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Input Text:
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={8}
              placeholder={
                direction === 'ur_to_en'
                  ? 'یہاں اردو متن تحریر کریں (مثلاً: نادرا سمارٹ کارڈ کے لیے کیا دستاویزات درکار ہیں)...'
                  : 'Enter English text to translate...'
              }
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-[#01411C] focus:bg-white resize-none"
            />
          </div>

          <button
            onClick={handleTranslate}
            disabled={!inputText.trim() || isLoading}
            className="w-full py-3 bg-[#01411C] hover:bg-[#013516] text-white font-bold rounded-xl shadow-xs flex items-center justify-center space-x-2 text-xs sm:text-sm transition-all"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Translating with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Translate Now</span>
              </>
            )}
          </button>
        </div>

        {/* Translated Output Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between min-h-[250px]">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Translation Result:
              </span>
              {translatedText && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                    title="Copy translation"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleSpeak}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                    title="Read aloud"
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4 text-emerald-600 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>

            {!translatedText && !isLoading && (
              <div className="text-center py-16 text-slate-400 text-xs">
                Enter text on the left and click "Translate Now" to see accurate translated output.
              </div>
            )}

            {isLoading && (
              <div className="text-center py-16 space-y-2">
                <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-500">Preserving Pakistani administrative terms...</p>
              </div>
            )}

            {translatedText && !isLoading && (
              <div className="prose prose-slate max-w-none text-xs sm:text-sm whitespace-pre-line leading-relaxed text-slate-800 p-2 bg-slate-50 rounded-xl border border-slate-100">
                {translatedText}
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100">
            Supports official terminology: Filer, NTN, Attestation, Domicile, Stamp Paper, Union Council, Challan.
          </div>
        </div>
      </div>
    </div>
  );
};
