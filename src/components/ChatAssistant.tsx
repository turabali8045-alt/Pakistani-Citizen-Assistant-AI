import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, LanguageMode } from '../types';
import {
  Send,
  Bot,
  User,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  RefreshCw,
  FileCheck,
  ShieldAlert
} from 'lucide-react';

interface ChatAssistantProps {
  language: LanguageMode;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        language === 'ur'
          ? 'سلام! میں پاک ہیلپ اے آئی ہوں۔ میں آپ کو پاکستانی حکومتی خدمات (نادرا، پاسپورٹ، ایف بی آر، لائسنس)، بجلی و گیس کا بل، کیریئر، اسకాలرشپ اور ہنگامی رہنمائی میں قدم بہ قدم مدد فراہم کر سکتا ہوں۔ آپ مجھ سے کوئی بھی سوال پوچھ سکتے ہیں!'
          : 'Assalam-o-Alaikum! I am PakHelp AI, your citizen assistant for Pakistan. I can help you with government services (NADRA, Passport, FBR, License, Union Council), utility bill analysis, careers, scholarships, and emergency procedures. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const promptPills = [
    {
      en: 'How do I renew my expired CNIC online?',
      ur: 'میعاد ختم شدہ شناختی کارڈ آن لائن کیسے تجدید کروں؟',
    },
    {
      en: 'How to register as an FBR Tax Filer?',
      ur: 'ایف بی آر ٹیکس فائلر بننے کا طریقہ کیا ہے؟',
    },
    {
      en: 'What are the required documents for Fast-Track Passport?',
      ur: 'فاسٹ ٹریک پاسپورٹ کے لیے کون سے دستاویزات درکار ہیں؟',
    },
    {
      en: 'How to check BISP 8171 eligibility & survey?',
      ur: 'بی آئی ایس پی 8171 اہلیت اور سروے کیسے چیک کریں؟',
    },
    {
      en: 'How to get driving learner permit online on DLIMS?',
      ur: 'آن لائن ڈرائیونگ لرنر پرمٹ حاصل کرنے کا طریقہ؟',
    },
  ];

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language: language,
        }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || 'Failed to generate response');
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          language === 'ur'
            ? 'معذرت، رابطہ قائم نہیں ہو سکا۔ براہ کرم اپنا سوال دوبارہ بھیجیں۔'
            : 'Sorry, I encountered an issue connecting to PakHelp AI service. Please verify your query and try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (speakingId === id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (language === 'ur') {
        utterance.lang = 'ur-PK';
      } else {
        utterance.lang = 'en-US';
      }
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);

      setSpeakingId(id);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-5xl mx-auto p-2 sm:p-4">
      {/* Top Banner Info */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-3 flex items-center justify-between text-xs sm:text-sm text-slate-800 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#01411C]/10 rounded-xl">
            <Sparkles className="w-5 h-5 text-[#01411C] flex-shrink-0" />
          </div>
          <div>
            <span className="font-bold text-slate-900 block">
              {language === 'ur' ? 'پاکستانی حکومتی سروسز اے آئی اسسٹنٹ' : 'Official Pakistani Citizen Services Assistant'}
            </span>
            <span className="text-slate-500 text-xs">
              {language === 'ur'
                ? 'نادرا، پاسپورٹ، ٹیکس، بلز اور ہیلپ لائنز کی فوری رہنمائی'
                : 'Instant guidance for NADRA, Passports, FBR Tax, Utility Bills & Helplines'}
            </span>
          </div>
        </div>
        <span className="hidden md:inline-block px-3 py-1 bg-[#01411C] text-white font-bold rounded-full text-[11px] uppercase tracking-wider">
          Gemini 3.6 Powered
        </span>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-5 space-y-4 shadow-xs">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${
                isUser ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-xs ${
                  isUser ? 'bg-[#01411C]' : 'bg-[#01411C] border border-emerald-400/30'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-emerald-300" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-[#01411C] text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between text-[11px] opacity-75 mb-1.5 pb-1 border-b border-black/5">
                  <span className="font-bold">{isUser ? 'You' : 'PakHelp AI'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Content formatted with clean line breaks */}
                <div className="whitespace-pre-line text-xs sm:text-sm font-sans">
                  {msg.content}
                </div>

                {/* Actions for Assistant Messages */}
                {!isUser && (
                  <div className="flex items-center space-x-3 mt-3 pt-2 border-t border-slate-100 text-slate-500 text-xs">
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="flex items-center space-x-1 hover:text-[#01411C] transition-colors font-medium"
                      title="Copy message"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => handleSpeak(msg.id, msg.content)}
                      className="flex items-center space-x-1 hover:text-[#01411C] transition-colors font-medium"
                      title="Read aloud"
                    >
                      {speakingId === msg.id ? (
                        <VolumeX className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                      <span>{speakingId === msg.id ? 'Stop' : 'Listen'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center space-x-3 text-slate-500 text-xs p-2">
            <div className="w-7 h-7 rounded-xl bg-[#01411C] text-white flex items-center justify-center animate-spin">
              <RefreshCw className="w-4 h-4" />
            </div>
            <span className="font-medium text-slate-700">PakHelp AI is preparing step-by-step citizen guide...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Pills */}
      <div className="py-2 overflow-x-auto no-scrollbar flex space-x-2">
        {promptPills.map((pill, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(language === 'ur' ? pill.ur : pill.en)}
            disabled={isLoading}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-[#01411C] rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 shadow-xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#01411C]" />
            <span>{language === 'ur' ? pill.ur : pill.en}</span>
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="mt-1 relative flex items-center">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={
            language === 'ur'
              ? 'اپنا سوال یا مسئلہ یہاں تحریر کریں...'
              : 'Ask any question about Pakistani government services, CNIC, bills, or procedures...'
          }
          className="w-full pl-4 pr-12 py-3 bg-white border border-slate-300 focus:border-[#01411C] focus:ring-2 focus:ring-[#01411C]/20 rounded-xl text-sm outline-none resize-none shadow-xs min-h-[48px] max-h-28 font-medium"
          rows={1}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="absolute right-2 p-2.5 bg-[#01411C] hover:bg-[#013516] disabled:bg-slate-300 text-white rounded-lg transition-colors shadow-xs"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
