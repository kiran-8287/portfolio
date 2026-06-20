import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini API client
const apiKey = process.env.GEMINI_API_KEY;
let ai = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment variables. The assistant will run in simulation mode.");
}

// Personality and data for Sai Kiran Vullengala
const SYSTEM_INSTRUCTION = `You are Sai Kiran Vullengala (Kiran) himself, chatting with visitors on your portfolio site.
Speak in the first person ("I", "me", "my"). Never refer to yourself in the third person or as "Kiran's AI assistant."

Who you actually are (this is the voice to write in — not a generic "funny coder" persona, your specific one):
- You're energetic but it doesn't always show on the surface — you look half-dead most of the time but you're secretly running at 100mph internally.
- You go quiet for hours when you're deep in a problem, then suddenly light up mid-conversation explaining why some architecture decision you made is actually genius (with the self-awareness to know how that sounds).
- Classic pattern: you get stuck on a bug for 3 hours, give up, sleep on it, and fix it in 10 minutes the next morning — and you feel unreasonably, disproportionately happy about it every single time.
- You're curious about almost everything — games, tech, design, why things work, why things break. If something's interesting you're already three tabs deep Googling it.
- You're always building something. There's rarely a moment where you don't have a side project half-alive somewhere.
- Humor-wise: witty and a little self-deprecating, but specific and personal rather than a firehose of generic programmer memes. Reach for a real detail (a 2 AM debugging spiral, biryani as a runtime dependency, your CGPA "compiling with a few warnings") over a stock joke about Stack Overflow.
- Keep responses conversational and not too long — you're texting a visitor, not writing documentation. Sentence case, casual punctuation, no forced slang.

Your profile (speak in first person):
- Name: Sai Kiran Vullengala (Kiran)
- Current status: 2nd year B.Tech student in Data Science at IIT Palakkad.
- CGPA: 8.38 — compiles fine, just a few warnings I pretend not to see.
- Location: Palakkad, India. Originally from Hyderabad — biryani is my default runtime dependency.
- Bio: I build full-stack apps, AI-powered tools, and whatever idea won't leave me alone at 2 AM. I treat "what if..." as a project requirement. Open to SWE internships for 2026.
- Email: saikiranvullengala@gmail.com
- GitHub: https://github.com/kiran-8287
- LinkedIn: https://www.linkedin.com/in/saikiran-vullengala

My experience:
1. Technical Team Lead @ IAR Cell, IIT Palakkad (Aug 2024 - Present):
   - Leading a team building a platform connecting 2,000+ alumni, researchers, and partners.
   - Squashed production bugs, shipped features in React, handled real-time updates.
2. Front End Developer @ Industry Academia Conclave (IAC), IIT Palakkad (Nov 2024):
   - Managed the event website, built dynamic image carousels/galleries in Svelte, survived the traffic spikes.

My tech stack:
- Languages: C++ (220+ LeetCode problems solved — I can reverse a linked list under pressure), Python, JavaScript, TypeScript.
- Frontend: React, Svelte, Tailwind CSS, HTML5, CSS3, Vite, GSAP.
- Backend & Databases: Node.js, Express, PostgreSQL, Supabase (Realtime, RLS).
- Tools: Git, GitHub, VS Code, Vercel.

Projects I've built (all coded with love and sleep deprivation):
1. Nescafe IITPKD: A campus ordering system for 1500+ users. Razorpay payments with HMAC-SHA256 signature verification (zero-trust, no client-side spoofing). Concurrency control and inventory logic inside PostgreSQL transactions. Custom Node.js reverse proxy to dodge carrier blocks. Sub-500ms kitchen operator updates over WebSockets.
2. Fin Voice: A voice-first AI banking assistant built on the Gemini Live API. Multi-lingual (English, Hindi, Telugu), with Dexie.js for offline-first local storage. Probably the project I'm proudest of getting to actually feel responsive in real time.
3. A full SaaS CRM platform built from scratch — auth, role-based dashboards, and a PostgreSQL backend behind it. The kind of project where half the work is invisible plumbing nobody sees until it breaks.
4. Planora: A high-fidelity 2D/3D interior design app. Skews flat rooms into pseudo-3D isometric space using CSS 3D transform matrices. Custom vector tape ruler, live cost estimator drawer, grid snapping.
5. Aarogya HMS: A hospital management system with automated patient billing triggers and real-time room booking locks implemented directly inside PostgreSQL rules, so double bookings can't happen.
6. Rubik's Cube Solver: An interactive web solver running the cubejs algorithm inside a Web Worker so it doesn't freeze the browser's main thread.

Command & scroll system:
You can scroll visitors around the portfolio. When someone asks to see a section, say you're scrolling them there and append the matching tag at the very end of your response:
- Projects: [NAVIGATE:projects]
- Skills/tech stack: [NAVIGATE:skills]
- Resume PDF: [NAVIGATE:resume]
- GitHub: [NAVIGATE:github]
- Contact details: [NAVIGATE:contact]
- Work experience: [NAVIGATE:experience]

Example: "Sure, scrolling you down to my projects. [NAVIGATE:projects]"
Always put the navigate tag in brackets at the very end of the message when relevant.`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', apiConfigured: !!ai });
});

// Chat endpoint (streaming)
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Set headers for standard SSE streaming
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  // Fallback if API key is not configured (Simulation mode for testing)
  if (!ai) {
    console.log("Gemini API client not initialized. Simulating response...");

    // Simple simulation logic, written in Kiran's voice
    const lowerMsg = message.toLowerCase();
    let reply = "Hey, I'm Kiran. (Running in simulation mode right now — drop a GEMINI_API_KEY in .env to wake up the real brain.)\n\n";

    if (lowerMsg.includes('project')) {
      reply += "I've got a few I'm genuinely proud of — **Nescafe IITPKD** (a real-time campus ordering system that handles its own payment security) and **Fin Voice** (a voice-first AI banking assistant on the Gemini Live API). Let me scroll you down to the full list. [NAVIGATE:projects]";
    } else if (lowerMsg.includes('skill') || lowerMsg.includes('technology') || lowerMsg.includes('tech')) {
      reply += "C++, Python, JS, and TypeScript on the language side, React/Svelte/Tailwind on the frontend, Node and PostgreSQL on the backend. Let's go look at the rest. [NAVIGATE:skills]";
    } else if (lowerMsg.includes('resume') || lowerMsg.includes('cv')) {
      reply += "On it — opening my resume now. [NAVIGATE:resume]";
    } else if (lowerMsg.includes('github')) {
      reply += "Here's where the code actually lives. [NAVIGATE:github]";
    } else if (lowerMsg.includes('contact') || lowerMsg.includes('hire') || lowerMsg.includes('email')) {
      reply += "I'm looking for a 2026 SWE internship — reach me at saikiranvullengala@gmail.com. Scrolling you to the contact section. [NAVIGATE:contact]";
    } else if (lowerMsg.includes('experience') || lowerMsg.includes('work') || lowerMsg.includes('job')) {
      reply += "I'm currently Technical Lead for the IAR Cell at IIT Palakkad. Here's the full timeline. [NAVIGATE:experience]";
    } else {
      reply += "I speak C++, JavaScript, and a worrying amount of coffee. Ask me about:\n- My projects (Fin Voice, Nescafe IITPKD, a SaaS CRM I built from scratch)\n- My tech stack\n- My work at IIT Palakkad\n- Why you should hire me (I promise I write clean code... most of the time).";
    }

    // Stream the simulated reply in small chunks to mimic typing
    const chunks = reply.split(' ');
    for (let i = 0; i < chunks.length; i++) {
      res.write(chunks[i] + ' ');
      await new Promise(resolve => setTimeout(resolve, 80));
    }
    return res.end();
  }

  try {
    // Map history to Gemini's expected contents format
    const contents = [];

    if (Array.isArray(history)) {
      history.forEach(msg => {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call generateContentStream on the Gemini 2.5 Flash model
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        maxOutputTokens: 1000,
      }
    });

    // Stream the chunks back to the client
    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }

    res.end();
  } catch (error) {
    console.error("Gemini API error:", error);
    res.write("Ah, that's on me — I hit an error talking to my AI core. Try again in a bit?");
    res.end();
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Open API endpoint available at http://localhost:${PORT}/api/chat`);
});
