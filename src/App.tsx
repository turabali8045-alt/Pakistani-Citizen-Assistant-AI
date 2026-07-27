import React, { useState } from 'react';
import { LanguageMode } from './types';
import pakhelpLogo from './assets/images/pakhelp_app_logo_1785133868527.jpg';
import { Navbar } from './components/Navbar';
import { ChatAssistant } from './components/ChatAssistant';
import { DocumentAI } from './components/DocumentAI';
import { UtilityBillAI } from './components/UtilityBillAI';
import { GovNavigator } from './components/GovNavigator';
import { CareerAI } from './components/CareerAI';
import { EmergencyDirectory } from './components/EmergencyDirectory';
import { TranslationAI } from './components/TranslationAI';
import { DisclaimerModal } from './components/DisclaimerModal';
import { ShieldAlert, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('chat');
  const [language, setLanguage] = useState<LanguageMode>('en');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        onOpenSos={() => setActiveTab('emergency')}
      />

      {/* Main Content View Container */}
      <main className="flex-1 pb-10">
        {activeTab === 'chat' && <ChatAssistant language={language} />}
        {activeTab === 'document-ai' && <DocumentAI language={language} />}
        {activeTab === 'utility-bill' && <UtilityBillAI language={language} />}
        {activeTab === 'navigator' && <GovNavigator language={language} />}
        {activeTab === 'career-ai' && <CareerAI language={language} />}
        {activeTab === 'emergency' && <EmergencyDirectory language={language} />}
        {activeTab === 'translate' && <TranslationAI language={language} />}
      </main>

      {/* Footer Bar */}
      <footer className="bg-emerald-950 text-emerald-200 border-t border-emerald-900 py-4 px-4 text-xs text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <img
              src={pakhelpLogo}
              alt="PakHelp Logo"
              className="w-5 h-5 rounded-md object-cover border border-white/20"
              referrerPolicy="no-referrer"
            />
            <span className="font-bold text-white">PakHelp AI</span>
            <span>-</span>
            <span className="text-emerald-300">
              {language === 'ur'
                ? 'پاکستان کا ذہین شہری معاون'
                : 'Intelligent Citizen Assistant for Pakistan'}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDisclaimerOpen(true)}
              className="hover:text-white underline underline-offset-2 flex items-center space-x-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Official Verification Advisory</span>
            </button>
            <span>•</span>
            <span>Gemini 3.6 Powered</span>
          </div>
        </div>
      </footer>

      {/* Verification Advisory Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        language={language}
      />
    </div>
  );
}
