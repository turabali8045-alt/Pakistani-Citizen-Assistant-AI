import React from 'react';
import { LanguageMode } from '../types';
import pakhelpLogo from '../assets/images/pakhelp_app_logo_1785133868527.jpg';
import {
  MessageSquare,
  FileText,
  Zap,
  Compass,
  GraduationCap,
  PhoneCall,
  Languages,
  ShieldAlert,
  Moon,
  Sun,
  Award
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  onOpenSos: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onOpenSos,
}) => {
  const navItems = [
    {
      id: 'chat',
      label: language === 'ur' ? 'اے آئی چیٹ' : 'AI Chat',
      icon: MessageSquare,
    },
    {
      id: 'document-ai',
      label: language === 'ur' ? 'دستاویز اے آئی' : 'Document AI',
      icon: FileText,
    },
    {
      id: 'utility-bill',
      label: language === 'ur' ? 'بجلی و گیس بل' : 'Utility Bill AI',
      icon: Zap,
    },
    {
      id: 'navigator',
      label: language === 'ur' ? 'حکومتی گائیڈ' : 'Gov Navigator',
      icon: Compass,
    },
    {
      id: 'career-ai',
      label: language === 'ur' ? 'کیریئر و اسకాలرشپ' : 'Careers & Scholarships',
      icon: GraduationCap,
    },
    {
      id: 'emergency',
      label: language === 'ur' ? 'ہنگامی نمبرز' : 'Emergency Directory',
      icon: PhoneCall,
    },
    {
      id: 'translate',
      label: language === 'ur' ? 'ترجمہ کار' : 'Translation AI',
      icon: Languages,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#01411C] text-white shadow-md border-b border-[#013516]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('chat')}
          >
            <div className="w-10 h-10 bg-white rounded-xl overflow-hidden flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform border border-white/20 p-0.5">
              <img
                src={pakhelpLogo}
                alt="PakHelp AI Logo"
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white uppercase">
                  PakHelp <span className="text-emerald-300">AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-white/10 text-emerald-100 border border-white/20 rounded-md tracking-wider">
                  Official Citizen Portal
                </span>
              </div>
              <p className="text-[11px] text-white/70 hidden sm:block">
                {language === 'ur'
                  ? 'پاکستان کا ذہین شہری معاون'
                  : 'Government Services & Document AI Platform'}
              </p>
            </div>
          </div>

          {/* Right Controls: SOS Emergency Button & Language Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Emergency SOS Button */}
            <button
              onClick={onOpenSos}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
              title="Emergency Helplines & SOS"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{language === 'ur' ? 'ہنگامی امداد 1122' : 'SOS Emergency'}</span>
            </button>

            {/* Language Switcher */}
            <div className="flex bg-white/10 border border-white/20 rounded-lg p-1 text-xs font-semibold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  language === 'en'
                    ? 'bg-white text-[#01411C] font-bold shadow-xs'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  language === 'ur'
                    ? 'bg-white text-[#01411C] font-bold shadow-xs'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                اردو
              </button>
              <button
                onClick={() => setLanguage('roman_ur')}
                className={`px-2 py-1 text-[11px] rounded transition-colors ${
                  language === 'roman_ur'
                    ? 'bg-white text-[#01411C] font-bold shadow-xs'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                Roman
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 overflow-x-auto no-scrollbar py-2 border-t border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white text-[#01411C] font-bold shadow-xs'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#01411C]' : 'text-emerald-200'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
