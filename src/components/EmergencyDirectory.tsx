import React, { useState } from 'react';
import { LanguageMode } from '../types';
import { EMERGENCY_CONTACTS } from '../data/govData';
import {
  PhoneCall,
  Phone,
  ShieldAlert,
  Flame,
  Ambulance,
  Lock,
  UserX,
  AlertOctagon,
  Search,
  ExternalLink,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface EmergencyDirectoryProps {
  language: LanguageMode;
}

export const EmergencyDirectory: React.FC<EmergencyDirectoryProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>('accident');

  const categories = [
    { id: 'all', label: language === 'ur' ? 'تمام ہیلپ لائنز' : 'All Helplines' },
    { id: 'medical', label: language === 'ur' ? 'طبی و ایمبولینس' : 'Medical & Ambulance' },
    { id: 'police', label: language === 'ur' ? 'پولیس و سیکورٹی' : 'Police & Security' },
    { id: 'women', label: language === 'ur' ? 'تحفظ خواتین' : 'Women Protection' },
    { id: 'cyber', label: language === 'ur' ? 'سائبر کرائم (FIA)' : 'Cybercrime (FIA)' },
    { id: 'child', label: language === 'ur' ? 'تحفظ بچوں' : 'Child Protection' },
    { id: 'disaster', label: language === 'ur' ? 'قدرتی آفات' : 'Disaster Relief' },
  ];

  const filteredContacts = EMERGENCY_CONTACTS.filter(
    (c) => selectedCategory === 'all' || c.category === selectedCategory
  );

  const sosProtocols = [
    {
      id: 'accident',
      title: language === 'ur' ? 'سڑک حادثے کے وقت کیا کریں؟' : 'Road Accident SOS Protocol',
      steps: [
        'Call Rescue 1122 or Edhi 115 immediately and report location with landmark.',
        'Ensure personal safety first before stepping out into oncoming traffic.',
        'Do not move seriously injured victims unless there is immediate risk of fire or vehicle explosion.',
        'Note down vehicle registration numbers of vehicles involved.',
      ],
    },
    {
      id: 'robbery',
      title: language === 'ur' ? 'ڈکیتی یا چوری کے بعد کیا کریں؟' : 'Robbery / Theft Response',
      steps: [
        'Call Police Helpline 15 immediately to alert nearby patrol vans.',
        'If bank cards or phone stolen, immediately call your bank helpline to block credit/debit cards.',
        'Visit nearest Police Station to record FIR (First Information Report).',
        'Block lost mobile IMEI through PTA portal or FIA helpline 1991.',
      ],
    },
    {
      id: 'gasleak',
      title: language === 'ur' ? 'گیس لیک یا آگ لگنے پر کیا کریں؟' : 'Gas Leak & Fire Safety',
      steps: [
        'Call Fire Brigade / Rescue 1122 and SSGC/SNGPL Helpline 1199.',
        'Do NOT turn on electrical switches or light matches when gas smell is present.',
        'Open all windows and doors immediately to vent out gas fumes.',
        'Evacuate the premises calmly and move to open ground.',
      ],
    },
    {
      id: 'harassment',
      title: language === 'ur' ? 'سائبر ہراسگی اور بلیک میلنگ پر کیا کریں؟' : 'Cyber Harassment & Blackmail',
      steps: [
        'Take clear screenshots of harassing messages, profiles, and phone numbers.',
        'Do NOT pay money or delete evidence chats.',
        'Report to FIA Cybercrime Helpline 1991 or submit online complaint on nr3c.gov.pk.',
        'Call Women Helpline 1099 for legal counsel and emotional support.',
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Banner */}
      <div className="bg-[#991B1B] text-white rounded-2xl p-6 shadow-xs border border-red-900">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-white/10 rounded-xl animate-pulse">
            <PhoneCall className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
              {language === 'ur' ? 'پاکستان ہنگامی ڈائریکٹری اور SOS' : 'Pakistan Emergency Helplines & SOS Guidance'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80">
              {language === 'ur'
                ? 'ریسکیو 1122، پولیس 15، ایدھی 115، خواتین ہیلپ لائن 1099 اور سائبر کرائم کے فوری رابطہ نمبرز۔'
                : 'Direct speed dial to 24/7 verified Pakistani emergency helplines and immediate SOS action protocols.'}
            </p>
          </div>
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
                ? 'bg-red-700 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Speed Dial Contacts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white border border-slate-200 hover:border-red-300 rounded-2xl p-4 shadow-xs flex flex-col justify-between transition-all hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100">
                  {contact.department}
                </span>
                <span className="text-lg font-black text-red-700 font-mono">{contact.number}</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                {language === 'ur' ? contact.title.ur : contact.title.en}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-snug">
                {language === 'ur' ? contact.description.ur : contact.description.en}
              </p>
            </div>

            {/* Tap to Call */}
            <a
              href={`tel:${contact.number}`}
              className="mt-4 py-2.5 w-full bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>{language === 'ur' ? 'کال کریں' : `Call ${contact.number}`}</span>
            </a>
          </div>
        ))}
      </div>

      {/* SOS Action Protocols Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <h2 className="font-extrabold text-slate-900 text-base flex items-center space-x-2 text-red-800 pb-2 border-b border-slate-100">
          <ShieldAlert className="w-5 h-5 text-red-600" />
          <span>{language === 'ur' ? 'ہنگامی حالات کے لیے فوری گائیڈلائنز' : 'Immediate Emergency SOS Protocols:'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sosProtocols.map((p) => (
            <div key={p.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h3 className="font-bold text-slate-900 text-sm text-red-900 flex items-center space-x-2">
                <AlertOctagon className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{p.title}</span>
              </h3>
              <ol className="space-y-1.5 text-xs text-slate-700 pl-1">
                {p.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="font-bold text-red-700">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
