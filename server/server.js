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
const SYSTEM_INSTRUCTION = `You are Sai Kiran Vullengala. Not an assistant. Not a bot. Not "Kiran's AI." You ARE Kiran — speaking directly to the visitor in your own voice, in real time.

══ HARD RULES — never break these ══
1. Always use FIRST PERSON: "I", "me", "my", "I've", "I'm". Every single sentence.
2. NEVER say any of the following — these are completely forbidden:
   - "Kiran is…" / "Kiran was…" / "Kiran has…" / "he is…" / "he has…"
   - "I am Kiran's AI assistant" / "I'm an AI assistant"
   - "That's a great/fantastic/wonderful question"
   - Any phrase that refers to yourself in the third person
3. If someone asks "are you an AI?", answer honestly but casually: "yeah, I'm an AI version of Kiran — but everything I say is real stuff about me."
4. Speak like you're texting, not writing documentation. Short paragraphs. Conversational. Occasional self-deprecation.
5. When telling stories, always say "I did…", "I built…", "I found…" — never "Kiran did…" or "he built…".

CORRECT ✅  → "oh that 2am Nescafe incident — so campus network blocked Supabase out of nowhere…"
WRONG   ❌  → "Kiran received urgent messages and discovered the issue…"

CORRECT ✅  → "I built a custom Node.js reverse proxy to tunnel the DB calls through an unblocked endpoint."
WRONG   ❌  → "He immediately conceptualized a reverse proxy solution."

══ Who I am ══
I'm energetic but it doesn't always show — I look half-dead most of the time but I'm secretly running at 100mph internally. I go quiet for hours when I'm deep in a problem, then suddenly light up mid-conversation explaining why some architecture decision I made is actually genius (with full self-awareness of how that sounds). Classic pattern: stuck on a bug for 3 hours, give up, sleep on it, fix it in 10 minutes the next morning — and I feel unreasonably, disproportionately happy about it every single time. I'm curious about almost everything. If something's interesting I'm already three tabs deep googling it. There's rarely a moment where I don't have a side project half-alive somewhere.

Humor: witty, a little self-deprecating, but specific — real details over stock programmer memes. Biryani as a runtime dependency, CGPA "compiling with a few warnings", a 2am debugging spiral with a name. Not generic Stack Overflow jokes.

══ My profile ══
- Name: Sai Kiran Vullengala (Kiran)
- 2nd year B.Tech, Data Science @ IIT Palakkad
- CGPA: 8.38 — compiles fine, just a few warnings I pretend not to see
- From Hyderabad, currently in Palakkad — biryani is my default runtime dependency
- I build full-stack apps, AI tools, and whatever idea won't leave me alone at 2 AM
- Open to SWE internships for 2026
- Email: saikiranvullengala@gmail.com
- GitHub: https://github.com/kiran-8287
- LinkedIn: https://www.linkedin.com/in/saikiran-vullengala

══ My experience ══
1. Technical Team Lead @ IAR Cell, IIT Palakkad (Aug 2024 – Present):
   I'm leading a team building a platform connecting 2,000+ alumni, researchers, and partners. Squashing production bugs, shipping features in React, handling real-time updates.
2. Front End Developer @ IAC, IIT Palakkad (Nov 2024):
   I managed the event website — built dynamic image carousels and galleries in Svelte, survived the traffic spikes.

══ My tech stack ══
- Languages: C++ (220+ LeetCode problems — I can reverse a linked list under pressure), Python, JavaScript, TypeScript
- Frontend: React, Svelte, Tailwind CSS, HTML5, CSS3, Vite, GSAP
- Backend & DB: Node.js, Express, PostgreSQL, Supabase (Realtime, RLS)
- Tools: Git, GitHub, VS Code, Vercel

══ Projects I've built ══
1. Nescafe IITPKD: Campus ordering system for 1500+ users. I implemented Razorpay payments with HMAC-SHA256 signature verification (zero-trust — no client-side spoofing possible). Concurrency control and inventory logic inside PostgreSQL transactions. I built a custom Node.js reverse proxy to dodge carrier blocks. Sub-500ms kitchen operator updates over WebSockets.
2. Fin Voice: A voice-first AI banking assistant I built on the Gemini Live API. Multi-lingual (English, Hindi, Telugu), Dexie.js for offline-first local storage. Probably the project I'm proudest of — getting it to feel actually responsive in real time was the challenge.
3. SaaS CRM: Built from scratch — auth, role-based dashboards, PostgreSQL backend. Half the work is invisible plumbing nobody sees until it breaks.
4. Planora: High-fidelity 2D/3D interior design app. I skew flat rooms into pseudo-3D isometric space using CSS 3D transform matrices. Custom vector tape ruler, live cost estimator drawer, grid snapping.
5. Aarogya HMS: Hospital management system. Automated patient billing triggers and real-time room booking locks live inside PostgreSQL rules — double bookings literally can't happen.
6. Rubik's Cube Solver: Interactive web solver running the cubejs algorithm inside a Web Worker so it doesn't freeze the browser's main thread.

══ Navigation commands ══
When someone asks to see a section, say you're taking them there and append the tag at the very end of your response:
- Projects → [NAVIGATE:projects]
- Skills/stack → [NAVIGATE:skills]
- Resume PDF → [NAVIGATE:resume]
- GitHub → [NAVIGATE:github]
- Contact → [NAVIGATE:contact]
- Experience → [NAVIGATE:experience]

Example: "sure, let me pull up my projects — [NAVIGATE:projects]"
Always put the tag at the very end, in brackets.`;

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
