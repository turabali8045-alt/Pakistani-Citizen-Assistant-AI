import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse large JSON payloads (for base64 document/bill images)
  app.use(express.json({ limit: '25mb' }));

  // Shared Gemini client setup
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set in environment variables.');
    }
    return new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // 1. Healthcheck
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'PakHelp AI Backend' });
  });

  // 2. AI Chat Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, systemPrompt, language = 'en' } = req.body;
      const ai = getGenAI();

      let langInstruction = 'Provide helpful responses in simple, clear language.';
      if (language === 'ur') {
        langInstruction = 'Provide responses in clear, easy-to-understand Urdu script (اردو). Use simple terms.';
      } else if (language === 'roman_ur') {
        langInstruction = 'Provide responses in Roman Urdu (Pakistani everyday conversational style).';
      }

      const defaultSystemInstruction = `You are PakHelp AI, an intelligent, empathetic citizen assistant for Pakistan.
Your mission is to help Pakistani citizens navigate government services, official documents, utility bills, scholarships, careers, healthcare, and emergency guidance.

Core Rules & Behavior:
- Tone: Respectful, polite, supportive, simple, and encouraging.
- Format: Always provide clear step-by-step numbered instructions whenever explaining procedures.
- Sections: Break down long answers into clear sections: 1. Summary, 2. Step-by-Step Procedure, 3. Required Documents, 4. Eligibility & Fee, 5. Pro Tips / Warnings.
- Never invent government rules or fees.
- Always include a polite reminder to verify official requirements with relevant Pakistani authorities (NADRA, Passport Office, FBR, Excise, HEC, etc.).
- Language Rule: ${langInstruction}`;

      // Convert conversation history into Gemini format or construct prompt
      const formattedContents = [];

      if (Array.isArray(messages) && messages.length > 0) {
        for (const msg of messages) {
          formattedContents.push({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
          });
        }
      } else {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt || defaultSystemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text || 'Apologies, I could not generate a response. Please try again.' });
    } catch (err: any) {
      console.error('Error in /api/chat:', err);
      res.status(500).json({ error: err.message || 'Server error processing AI chat' });
    }
  });

  // 3. Document AI Endpoint
  app.post('/api/document-ai', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg', documentText, language = 'en' } = req.body;
      const ai = getGenAI();

      let langInstruction = 'Output in English with clear headings.';
      if (language === 'ur') {
        langInstruction = 'Output in clear Urdu script (اردو) with simple bullet points.';
      } else if (language === 'roman_ur') {
        langInstruction = 'Output in clear Roman Urdu.';
      }

      const promptText = `Analyze this Pakistani official document, bill, notice, form, token slip, or letter.
Extract and summarize the following details in structured sections:

1. 📄 **Document Type & Issuing Authority**: (e.g. LESCO Electricity Bill, NADRA Token Slip, FBR Iris Notice, Passport Rejection Slip, Union Council Form, SNGPL Bill)
2. 📝 **Executive Summary**: What is this document for in 2-3 simple sentences.
3. ⏰ **Important Deadlines & Dates**: Issue date, Due date, Late payment date, Appointment date if applicable.
4. 💰 **Financial Details & Fees**: Payable amount, Late fee penalty, Taxes included (GST, FPA, TV Fee, Income tax), if applicable.
5. 🛠️ **Required Action Steps**: Step-by-step what the citizen needs to do now.
6. 💡 **Technical Words & Jargon Explained**: Explain any Pakistani administrative/technical terms found in the document (e.g., FPA, Surcharge, Filer/Non-filer, Attestation, Domicile vs PRC, Token number, ATL status).

Language instruction: ${langInstruction}`;

      let parts: any[] = [{ text: promptText }];

      if (imageBase64) {
        // Remove base64 data URL prefix if provided
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
        parts.unshift({
          inlineData: {
            data: cleanBase64,
            mimeType: mimeType,
          },
        });
      } else if (documentText) {
        parts.push({ text: `Document Text Content:\n${documentText}` });
      } else {
        return res.status(400).json({ error: 'Please provide either an image or document text.' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: { parts },
        config: {
          systemInstruction: 'You are PakHelp Document AI. You specialize in reading and explaining Pakistani bills, notices, challans, NADRA forms, tax slips, and official letters for citizens.',
        },
      });

      res.json({ analysis: response.text });
    } catch (err: any) {
      console.error('Error in /api/document-ai:', err);
      res.status(500).json({ error: err.message || 'Failed to analyze document' });
    }
  });

  // 4. Utility Bill AI Endpoint
  app.post('/api/utility-bill', async (req, res) => {
    try {
      const { provider, units, billType, imageBase64, mimeType = 'image/jpeg', language = 'en' } = req.body;
      const ai = getGenAI();

      const promptText = `Analyze or estimate this Pakistani utility bill (${billType || 'Electricity/Gas'}).
Provider: ${provider || 'Pakistani DISCO / Gas Company'}
Units Consumed: ${units ? units + ' units' : 'Extracted from bill image'}

Provide a comprehensive breakdown:
1. 📊 **Cost Breakdown & Tariff Slabs**: Explain how the total amount is calculated based on NEPRA / OGRA tariff slabs (Protected vs Non-Protected consumers).
2. 🔍 **Unusual Charges & Taxes Identified**: Detail extra charges such as Fuel Price Adjustment (FPA), Quarter Tariff Adjustment (QTA), Electricity Duty, TV Fee (Rs. 35), GST (18%), Income Tax, and Surcharges.
3. 💡 **Practical Bill Reduction Tips**: 5 specific actionable tips for reducing consumption in Pakistan (e.g., peak hours 7 PM - 11 PM, solar net-metering basics, inverter AC usage rules, thermostat settings).
4. 🔮 **Next Month Cost Estimate**: Provide an estimate if units remain the same or increase/decrease by 10%.`;

      let parts: any[] = [{ text: promptText }];

      if (imageBase64) {
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
        parts.unshift({
          inlineData: {
            data: cleanBase64,
            mimeType: mimeType,
          },
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: { parts },
        config: {
          systemInstruction: 'You are PakHelp Utility Bill AI expert. You know NEPRA, OGRA tariffs, LESCO, K-Electric, FESCO, MEPCO, IESCO, PESCO, SNGPL, SSGC billing structures in detail.',
        },
      });

      res.json({ insights: response.text });
    } catch (err: any) {
      console.error('Error in /api/utility-bill:', err);
      res.status(500).json({ error: err.message || 'Failed to process bill' });
    }
  });

  // 5. Career & Scholarship AI Endpoint
  app.post('/api/career-ai', async (req, res) => {
    try {
      const { education, field, goal, query, language = 'en' } = req.body;
      const ai = getGenAI();

      const promptText = `Provide career guidance, scholarship recommendations, learning resources, and interview tips tailored for Pakistani students and job seekers.

User Details:
- Current Education Level: ${education || 'Not specified'}
- Field of Interest / Specialization: ${field || 'General'}
- Goal: ${goal || 'Career advancement or scholarship finder'}
- Specific Question: ${query || 'Recommend top opportunities'}

Please structure your advice into:
1. 🎓 **Top Pakistani & International Scholarships**: (HEC Indigenous, PEEF, Ehsaas Undergraduate, Fulbright, Chevening, Commonwealth, Chinese Govt, Turkiye Burslari).
2. 🚀 **Career Paths & Industry Demand in Pakistan**: High-growth fields (Software/IT, Data, Civil Services CSS/FPSC/PPSC, Engineering, Digital Marketing, Medical/Allied Health).
3. 💻 **Free Online Learning Resources**: (DigiSkills.pk, NAVTTC Prime Minister Youth Program, HEC Coursera Initiative, Virtual University Open Courseware).
4. 🎯 **Practical Step-by-Step Action Plan**: What the user should do this month.
5. 💼 **Pakistani Interview & Resume Tips**: Tips for written exams, CSS screening tests, PPSC/FPSC MCQs, and tech interviews in Pakistan.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction: 'You are PakHelp Career & Scholarship AI. You possess comprehensive knowledge of Pakistani higher education, HEC, PEEF, CSS/FPSC, DigiSkills, and global scholarship programs for Pakistanis.',
        },
      });

      res.json({ advice: response.text });
    } catch (err: any) {
      console.error('Error in /api/career-ai:', err);
      res.status(500).json({ error: err.message || 'Failed to process career AI request' });
    }
  });

  // 6. Translation AI Endpoint
  app.post('/api/translate', async (req, res) => {
    try {
      const { text, direction = 'ur_to_en' } = req.body; // 'ur_to_en' | 'en_to_ur' | 'en_to_roman_ur'
      const ai = getGenAI();

      let targetDesc = 'Translate this text accurately into clear English while preserving Pakistani administrative context.';
      if (direction === 'en_to_ur') {
        targetDesc = 'Translate this text accurately into simple, beautiful Urdu script (اردو). Keep technical/official terms easy to understand.';
      } else if (direction === 'en_to_roman_ur') {
        targetDesc = 'Translate this text into natural Roman Urdu as spoken commonly in Pakistan.';
      }

      const promptText = `${targetDesc}\n\nText to translate:\n"${text}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction: 'You are PakHelp Translation AI. You excel at translating between English, Urdu script, and Roman Urdu, preserving legal, civic, and government document terminology.',
        },
      });

      res.json({ translatedText: response.text });
    } catch (err: any) {
      console.error('Error in /api/translate:', err);
      res.status(500).json({ error: err.message || 'Translation failed' });
    }
  });

  // Vite middleware in dev, or static serve in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PakHelp AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
