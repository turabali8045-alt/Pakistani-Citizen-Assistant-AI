import React, { useState } from 'react';
import { LanguageMode, GovService } from '../types';
import { GOV_SERVICES } from '../data/govData';
import {
  Compass,
  Search,
  CheckSquare,
  Square,
  ExternalLink,
  Clock,
  DollarSign,
  Phone,
  Building,
  FileCheck2,
  ListOrdered,
  ChevronDown,
  ChevronUp,
  ShieldCheck
} from 'lucide-react';

interface GovNavigatorProps {
  language: LanguageMode;
}

export const GovNavigator: React.FC<GovNavigatorProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string>('cnic-renewal');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const toggleDocCheck = (docKey: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docKey]: !prev[docKey],
    }));
  };

  const filteredServices = GOV_SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const titleEn = service.title.en.toLowerCase();
    const titleUr = service.title.ur.toLowerCase();
    const query = searchTerm.toLowerCase();
    const matchesSearch = titleEn.includes(query) || titleUr.includes(query) || service.department.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: language === 'ur' ? 'تمام خدمات' : 'All Services' },
    { id: 'nadra', label: language === 'ur' ? 'نادرا (NADRA)' : 'NADRA Identity' },
    { id: 'passport', label: language === 'ur' ? 'پاسپورٹ' : 'Passport' },
    { id: 'tax', label: language === 'ur' ? 'ایف بی آر ٹیکس' : 'FBR Tax / NTN' },
    { id: 'license', label: language === 'ur' ? 'ڈرائیونگ لائسنس' : 'Driving License' },
    { id: 'social', label: language === 'ur' ? 'بی آئی ایس پی (BISP)' : 'Social Welfare / BISP' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Banner */}
      <div className="bg-[#01411C] text-white rounded-2xl p-6 shadow-xs border border-[#013516]">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-3 bg-white/10 rounded-xl">
            <Compass className="w-7 h-7 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
              {language === 'ur' ? 'پاکستانی حکومتی نیویگیٹر' : 'Pakistani Government Services Navigator'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80">
              {language === 'ur'
                ? 'نادرا، پاسپورٹ، ٹیکس، لائسنس اور سوشل ویلفیئر کے تمام مراحل، فیسوں اور لازمی دستاویزات کی مکمل معلومات۔'
                : 'Step-by-step official procedures, eligibility rules, document checklists, and online links for NADRA, Passports, FBR, Licenses, and Welfare.'}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              language === 'ur'
                ? 'خدمت، شعبہ یا سروس کا نام تلاش کریں (مثال: نادرا، پاسپورٹ، فائلر)...'
                : 'Search procedures (e.g. CNIC renewal, Fast Track Passport, Tax Filer, DLIMS)...'
            }
            className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-[#01411C]/30 shadow-xs"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex space-x-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#01411C] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Accordion List */}
      <div className="space-y-4">
        {filteredServices.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-sm">
            No procedures found matching your search. Try adjusting keywords.
          </div>
        ) : (
          filteredServices.map((service) => {
            const isExpanded = expandedId === service.id;
            const title = language === 'ur' ? service.title.ur : service.title.en;
            const shortDesc = language === 'ur' ? service.shortDesc.ur : service.shortDesc.en;
            const steps = language === 'ur' ? service.steps.ur : service.steps.en;
            const requiredDocs = language === 'ur' ? service.requiredDocuments.ur : service.requiredDocuments.en;
            const eligibility = language === 'ur' ? service.eligibility.ur : service.eligibility.en;
            const feeStructure = language === 'ur' ? service.feeStructure.ur : service.feeStructure.en;
            const processingTime = language === 'ur' ? service.processingTime.ur : service.processingTime.en;

            return (
              <div
                key={service.id}
                className={`bg-white border rounded-2xl overflow-hidden shadow-xs transition-all ${
                  isExpanded ? 'border-[#01411C] ring-1 ring-[#01411C]/30' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? '' : service.id)}
                  className="p-4 sm:p-5 cursor-pointer flex items-center justify-between bg-white hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2.5 bg-[#01411C]/10 text-[#01411C] rounded-xl font-bold text-xs mt-0.5">
                      <Building className="w-5 h-5 text-[#01411C]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#01411C] uppercase tracking-wider mb-0.5">
                        {service.department}
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">{title}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{shortDesc}</p>
                    </div>
                  </div>

                  <button className="p-2 text-slate-400 hover:text-[#01411C]">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expanded Content Details */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-6">
                    {/* Key Info Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl flex items-center space-x-3 text-xs">
                        <DollarSign className="w-5 h-5 text-[#01411C] flex-shrink-0" />
                        <div>
                          <span className="font-bold text-[#01411C] block">Fee Structure:</span>
                          <span className="text-slate-700">{feeStructure}</span>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex items-center space-x-3 text-xs">
                        <Clock className="w-5 h-5 text-amber-700 flex-shrink-0" />
                        <div>
                          <span className="font-bold text-amber-950 block">Processing Time:</span>
                          <span className="text-slate-700">{processingTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Step-by-Step Procedure */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                      <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2 text-[#01411C]">
                        <ListOrdered className="w-4 h-4 text-[#01411C]" />
                        <span>{language === 'ur' ? 'قدم بہ قدم طریقہ کار:' : 'Step-by-Step Official Procedure:'}</span>
                      </h4>
                      <ol className="space-y-2.5 text-xs text-slate-800 pl-2">
                        {steps.map((step, idx) => (
                          <li key={idx} className="flex items-start space-x-2.5">
                            <span className="w-5 h-5 rounded-full bg-[#01411C] text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Interactive Checklist Builder for Required Documents */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2 text-[#01411C]">
                          <FileCheck2 className="w-4 h-4 text-[#01411C]" />
                          <span>{language === 'ur' ? 'ضروری دستاویزات کی چیک لسٹ:' : 'Interactive Required Documents Checklist:'}</span>
                        </h4>
                        <span className="text-[11px] text-slate-400">Click to check off gathered items</span>
                      </div>

                      <div className="space-y-2">
                        {requiredDocs.map((doc, idx) => {
                          const docKey = `${service.id}-doc-${idx}`;
                          const isChecked = !!checkedDocs[docKey];
                          return (
                            <div
                              key={idx}
                              onClick={() => toggleDocCheck(docKey)}
                              className={`flex items-center space-x-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                                isChecked
                                  ? 'bg-emerald-50/60 border-emerald-300 text-[#01411C] font-semibold'
                                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {isChecked ? (
                                <CheckSquare className="w-4 h-4 text-[#01411C] flex-shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              )}
                              <span className={isChecked ? 'line-through opacity-80' : ''}>{doc}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Eligibility Rules */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                        {language === 'ur' ? 'اہلیت کا معیار:' : 'Eligibility Criteria:'}
                      </h4>
                      <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                        {eligibility.map((rule, idx) => (
                          <li key={idx}>{rule}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer Actions & Helpline */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      {service.helpline && (
                        <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg">
                          <Phone className="w-3.5 h-3.5 text-[#01411C]" />
                          <span>Helpline: {service.helpline}</span>
                        </div>
                      )}

                      {service.officialUrl && (
                        <a
                          href={service.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1.5 px-4 py-2 bg-[#01411C] hover:bg-[#013516] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                        >
                          <span>{language === 'ur' ? 'سرکاری پورٹل کھولیں' : 'Open Official Portal'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
