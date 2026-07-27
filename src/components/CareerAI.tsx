import React, { useState } from 'react';
import { LanguageMode } from '../types';
import {
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  Sparkles,
  RefreshCw,
  Search,
  ExternalLink,
  Target,
  CheckCircle2
} from 'lucide-react';

interface CareerAIProps {
  language: LanguageMode;
}

export const CareerAI: React.FC<CareerAIProps> = ({ language }) => {
  const [education, setEducation] = useState('Graduation');
  const [field, setField] = useState('Computer Science / IT');
  const [goal, setGoal] = useState('Scholarship & Jobs');
  const [query, setQuery] = useState('');
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetCareerAdvice = async () => {
    setIsLoading(true);
    setAiAdvice(null);

    try {
      const response = await fetch('/api/career-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          education,
          field,
          goal,
          query,
          language,
        }),
      });

      const data = await response.json();
      if (response.ok && data.advice) {
        setAiAdvice(data.advice);
      } else {
        throw new Error(data.error || 'Failed to fetch career advice');
      }
    } catch (err: any) {
      console.error(err);
      setAiAdvice(
        language === 'ur'
          ? 'معلومات حاصل کرنے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔'
          : 'Failed to retrieve career and scholarship recommendations. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const topScholarships = [
    {
      title: 'HEC Indigenous Ph.D. & Merit Scholarships',
      org: 'Higher Education Commission (HEC Pakistan)',
      desc: 'Fully funded tuition waiver + monthly stipend for MS/Ph.D. students in recognized Pakistani universities.',
      link: 'https://hec.gov.pk',
    },
    {
      title: 'PEEF (Punjab Educational Endowment Fund)',
      org: 'PEEF Government of Punjab',
      desc: 'Financial support for talented and deserving students of Matric, Intermediate, and Master levels.',
      link: 'https://peef.org.pk',
    },
    {
      title: 'Ehsaas Undergraduate Scholarship Scheme',
      org: 'BISP & HEC Pakistan',
      desc: '100% tuition coverage + 4,000 monthly stipend for low-income undergraduate university students.',
      link: 'https://ehsaas.hec.gov.pk',
    },
    {
      title: 'Fulbright Master & Ph.D. Scholarship (USA)',
      org: 'USEFP / US Department of State',
      desc: 'Full foreign scholarship covering airfare, tuition, textbooks, stipend, and health insurance in USA.',
      link: 'https://usefp.org',
    },
  ];

  const freeResources = [
    {
      title: 'DigiSkills.pk (Government Training Portal)',
      desc: 'Free certified courses in Freelancing, Digital Marketing, Graphic Design, QuickBooks, SEO, and AutoCAD.',
      link: 'https://digiskills.pk',
    },
    {
      title: 'NAVTTC Prime Minister Youth Skill Development',
      desc: 'Free vocational & high-tech IT training in AI, Cloud Computing, Cyber Security, and Solar Technology.',
      link: 'https://navttc.gov.pk',
    },
    {
      title: 'Virtual University Open Courseware (VU OCW)',
      desc: 'Free video lectures and complete course material for Computer Science, Business, and Mathematics.',
      link: 'http://ocw.vu.edu.pk',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Banner */}
      <div className="bg-[#01411C] text-white rounded-2xl p-6 shadow-xs border border-[#013516]">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-white/10 rounded-xl">
            <GraduationCap className="w-7 h-7 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
              {language === 'ur' ? 'کیریئر، اسకాలرشپ اور مفت ایجوکیشن اے آئی' : 'Pakistani Careers, Scholarships & Learning AI'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80">
              {language === 'ur'
                ? 'اپنے تعلیمی پس منظر کے مطابق بہترین اسకాలرشپ، مفت آن لائن ڈگری کورسز اور سی ایس ایس / نوکریوں کے لیے رہنمائی حاصل کریں۔'
                : 'Personalized recommendations for HEC/PEEF/Global scholarships, DigiSkills training, CSS/FPSC exam prep, and high-demand IT careers.'}
            </p>
          </div>
        </div>
      </div>

      {/* AI Recommendation Generator Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <h2 className="font-bold text-slate-900 text-sm flex items-center space-x-2 text-[#01411C]">
          <Target className="w-4 h-4 text-[#01411C]" />
          <span>{language === 'ur' ? 'اپنا تعلیمی پس منظر درج کریں:' : 'Customize Your Career & Scholarship Plan:'}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Education Level:</label>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium outline-none focus:border-[#01411C]"
            >
              <option value="Matric / SSC">Matric / SSC</option>
              <option value="Intermediate / FSc / FA">Intermediate / FSc / FA</option>
              <option value="Graduation / BS (4 Years)">Graduation / BS (4 Years)</option>
              <option value="Master / MS / MPhil">Master / MS / MPhil</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Field of Interest:</label>
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium outline-none focus:border-[#01411C]"
            >
              <option value="Computer Science / IT / AI">Computer Science / IT / AI</option>
              <option value="Engineering & Technology">Engineering & Technology</option>
              <option value="Civil Services (CSS / FPSC / PPSC)">Civil Services (CSS / FPSC / PPSC)</option>
              <option value="Medical & Allied Health Sciences">Medical & Allied Health Sciences</option>
              <option value="Business, Finance & Commerce">Business, Finance & Commerce</option>
              <option value="Vocational & Freelancing Skills">Vocational & Freelancing Skills</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Goal:</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium outline-none focus:border-[#01411C]"
            >
              <option value="Find Fully Funded Scholarships">Find Fully Funded Scholarships</option>
              <option value="Government & Private Sector Jobs">Government & Private Sector Jobs</option>
              <option value="Free Online Skill Certification">Free Online Skill Certification</option>
              <option value="Interview & Competitive Exam Prep">Interview & Competitive Exam Prep</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Question or Preference (Optional):</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. How can I apply for DigiSkills freelancing course? Or How to clear CSS screening test?"
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium outline-none focus:border-[#01411C]"
          />
        </div>

        <button
          onClick={handleGetCareerAdvice}
          disabled={isLoading}
          className="w-full py-3 bg-[#01411C] hover:bg-[#013516] text-white font-bold rounded-xl shadow-xs flex items-center justify-center space-x-2 text-xs sm:text-sm transition-all"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Fetching Personalized Career AI Recommendations...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{language === 'ur' ? 'کیریئر و اسకాలرشپ گائیڈ حاصل کریں' : 'Generate AI Career & Scholarship Roadmap'}</span>
            </>
          )}
        </button>
      </div>

      {/* AI Advice Output */}
      {aiAdvice && (
        <div className="bg-white border border-emerald-300 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 pb-2 border-b border-emerald-100 text-emerald-900 font-bold text-base">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>AI Personal Career & Scholarship Roadmap</span>
          </div>
          <div className="prose prose-slate max-w-none text-xs sm:text-sm whitespace-pre-line leading-relaxed text-slate-800">
            {aiAdvice}
          </div>
        </div>
      )}

      {/* Featured Scholarships & Free Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scholarships */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2 text-emerald-800 pb-2 border-b border-slate-100">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Top Scholarships for Pakistanis:</span>
          </h3>

          <div className="space-y-3">
            {topScholarships.map((s, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-900 text-xs">{s.title}</div>
                <div className="text-[11px] font-semibold text-emerald-700">{s.org}</div>
                <p className="text-[11px] text-slate-600 leading-snug">{s.desc}</p>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-800 hover:underline pt-1"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Free Online Training */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2 text-emerald-800 pb-2 border-b border-slate-100">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Free Government Learning Resources:</span>
          </h3>

          <div className="space-y-3">
            {freeResources.map((r, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-900 text-xs">{r.title}</div>
                <p className="text-[11px] text-slate-600 leading-snug">{r.desc}</p>
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-800 hover:underline pt-1"
                >
                  <span>Visit Free Course Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
