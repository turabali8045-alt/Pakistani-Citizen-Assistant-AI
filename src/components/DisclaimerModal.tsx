import React from 'react';
import { LanguageMode } from '../types';
import { ShieldCheck, X, AlertTriangle, ExternalLink } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageMode;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 text-slate-900">
          <div className="p-3 bg-[#01411C]/10 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-[#01411C]" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg">
              {language === 'ur' ? 'شہری راہنمائی اور تصدیق کا نوٹس' : 'Citizen Assistance Verification Advisory'}
            </h3>
            <p className="text-xs text-[#01411C] font-semibold">PakHelp AI Official Guidance Rules</p>
          </div>
        </div>

        <div className="text-xs text-slate-700 space-y-2.5 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p>
            {language === 'ur'
              ? 'پاک ہیلپ اے آئی ایک خودکار اے آئی معاون ہے جو شہریوں کو پاکستانی حکومتی خدمات، نادرا، پاسپورٹ، ایف بی آر ٹیکس، اور بجلی/گیس بلوں کے طریقہ کار کو سمجھنے میں مدد فراہم کرتا ہے۔'
              : 'PakHelp AI is an intelligent citizen assistant designed to help Pakistani citizens understand government procedures, document requirements, utility bills, and emergency contacts.'}
          </p>

          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start space-x-2 text-amber-950 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              {language === 'ur'
                ? 'اہم خبردار: کسی بھی باضابطہ فیصلے سے قبل متعلقہ سرکاری محکمے (نادرا، پاسپورٹ آفس، ایف بی آر) سے معلومات کی حتمی تصدیق لازمی کریں۔'
                : 'Important Rule: Always verify final rules, exact fees, and application status directly with the official concerned authority (NADRA, DGI&P, FBR, Excise, BISP).'}
            </span>
          </div>

          <ul className="list-disc list-inside space-y-1 text-slate-600">
            <li>Never pay money to unauthorized agents promising quick services.</li>
            <li>Use official government portals (id.nadra.gov.pk, iris.fbr.gov.pk, 8171.bisp.gov.pk).</li>
            <li>Emergency calls (Rescue 1122, Police 15, Edhi 115) are 100% free of charge.</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#01411C] hover:bg-[#013516] text-white font-bold rounded-xl shadow-xs transition-colors text-xs sm:text-sm"
        >
          {language === 'ur' ? 'میں سمجھ گیا ہوں (جاری رکھیں)' : 'I Understand & Agree'}
        </button>
      </div>
    </div>
  );
};
