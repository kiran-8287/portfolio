# 🌌 Hey, I'm Sai Kiran 👋

I'm a 2nd year B.Tech Data Science student at **IIT Palakkad**. My CGPA is **8.38**—it compiles fine, just a few warnings I choose to pretend aren't there. I build full-stack web applications, voice-enabled AI tools, and whatever random idea refuses to leave me alone at 2 AM. 

* 🔭 **Current hyperfocus**: AI integrations and fast system architectures.
* 🌱 **Default runtime dependency**: Hyderabad Biryani & strong coffee.
* 💻 **Vibe check**: Energetic on the inside, looking slightly sleep-deprived on the outside. I'm the kind of developer who spends 3 hours fighting a bug, sleeps on it, fixes it in 10 minutes the next morning, and feels unreasonably happy for the rest of the day.

---

## 🤖 Meet "Kiran AI" (My Digital Double)
If you click the floating robot avatar on the bottom right, you can chat directly with a virtual representation of me. Yes, it speaks in my exact voice, text-style conversational tone, and occasionally throws self-deprecating jokes.

### How it works:
* **The Brain**: Powered by **Gemini 2.5 Flash** (via `@google/genai` API) with strict guidelines to act exactly like me (no "How can I help you today" nonsense).
* **The Voice**: High-fidelity TTS synthesized by the **Cartesia API** (`sonic-3.5` model).
* **Autoplay Hacks**: Decodes chunks using the Web Audio API (`AudioContext`) to bypass stubborn iOS/mobile audio restrictions.
* **Microphone Input**: Speech-to-text dictation via the browser's Web Speech API with full permission-error handling.
* **UI Puppetmaster**: It can programmatically scroll you to different sections of my portfolio. If it says it's showing you my projects, it will embed `[NAVIGATE:projects]` and physically scroll the page.
* **Console Mode**: You can also type slash commands (e.g., `/projects`, `/skills`, `/resume`, `/github`, `/experience`) directly into the input bar.

---

## 📂 3 Projects I Actually Lost Sleep Over

### 1. ☕ Nescafe IITPKD (Full-Stack Campus Ordering)
* **What it is**: A serverless campus ordering platform serving 1500+ hungry students and staff at IIT Palakkad.
* **The Tech**: React, Node.js, PostgreSQL (Supabase), Tailwind CSS.
* **The Battle Story**: Right before launch, the campus network blocked Supabase's database domains. I had to write a custom Node.js reverse proxy on the fly to tunnel all DB calls and keep the app online. It also uses Razorpay with cryptographic HMAC-SHA256 verification (zero trust, no client-side payment spoofing allowed) and WebSockets to sync order statuses to the kitchen in under 500ms.

### 2. 📐 Planora (Spatial Interior Blueprinting Engine)
* **What it is**: An ultra-premium, high-fidelity 2D/3D interior spatial designer SaaS engine built from scratch.
* **The Tech**: React 18, TypeScript, Vite, Node.js, CSS3.
* **The Battle Story**: I skew flat 2D rooms into pseudo-3D isometric planes using hardware-accelerated CSS 3D transform matrices. Includes a click-and-drag vector "laser" tape measure tool, Figma-style 8-handle transform bounding boxes, snapping grids, and a cost-estimation drawer that recalculates budgets live.

### 3. 🎙️ Fin Voice (AI voice-first Banking)
* **What it is**: A multilingual voice banking assistant that lets you talk your way through account management, transactions, and live financial insights.
* **The Tech**: React, TypeScript, Vite, Dexie.js (local IndexedDB).
* **The Battle Story**: Integrates the Google Gemini Live API to understand English, Hindi, and Telugu. Getting the voice-stream latencies low enough to feel like a real conversation took a worrying amount of coffee. Employs offline-first persistence so transactions don't break on spotty networks.

---

## 🛠️ The Toolkit

* **Languages**: C++ (240+ LeetCode problems solved; can reverse a linked list under pressure), Python, JavaScript, TypeScript
* **Frontend**: React 19, Svelte, Vite, Tailwind CSS, Framer Motion, GSAP, CSS3/HTML5
* **Backend & DB**: Node.js, Express, PostgreSQL, Supabase (Realtime, RLS), Dexie.js (Offline cache)
* **APIs & Voice**: Gemini API, Cartesia TTS API, Web Speech API, Web Audio API
* **Tools**: Git, GitHub, VS Code, Vercel

---

## 📂 Project Structure

```bash
├── .env                  # Frontend credentials (EmailJS public keys)
├── server/               # Express Backend Server
│   ├── .env              # Backend keys (Gemini, Cartesia, and PORT)
│   ├── server.js         # Express app + Gemini streaming routes
│   └── package.json      # Server dependencies
├── src/                  # React Frontend Application
│   ├── assets/           # Media & logo files
│   ├── components/       # UI elements (AIChatAssistant, navbar, etc.)
│   ├── data/             # Structured info (portfolio.ts)
│   ├── hooks/            # useTheme and custom React hooks
│   ├── index.css         # Styling system & Tailwind rules
│   └── main.tsx          # Client bootstrapper
├── tailwind.config.js    # Tailwind configuration
└── vite.config.ts        # Vite config + proxy to forward `/api` requests
```

---

## ⚡ Spinning Up the Project Locally

### Prerequisites
* Node.js (v18+)
* npm (preinstalled with Node)

### 1. Credentials Setup

* Create a `.env` file in the root folder:
  ```env
  VITE_EMAILJS_SERVICE_ID=your_service_id
  VITE_EMAILJS_TEMPLATE_ID=your_template_id
  VITE_EMAILJS_PUBLIC_KEY=your_public_key
  ```

* Create a `.env` file inside the `server/` folder:
  ```env
  PORT=5000
  GEMINI_API_KEY=your_gemini_key
  CARTESIA_API_KEY=your_cartesia_key
  ```

### 2. Launching

1. **Fire up the backend**:
   ```bash
   cd server
   npm install
   npm run dev     # Starts the Express server on http://localhost:5000
   ```

2. **Fire up the client**:
   Open a new terminal window at the root folder:
   ```bash
   npm install
   npm run dev     # Starts the Vite client on http://localhost:5173
   ```

3. Open `http://localhost:5173`. Any call to `/api` is automatically proxied over to port `5000`.

---

## 🤝 Let's Chat

* **Email**: [saikiranvullengala@gmail.com](mailto:saikiranvullengala@gmail.com)
* **LinkedIn**: [linkedin.com/in/saikiran-vullengala](https://www.linkedin.com/in/saikiran-vullengala)
* **GitHub**: [github.com/kiran-8287](https://github.com/kiran-8287)

---

<div align="center">
  Made with ❤️ and some sleep deprivation by Sai Kiran
</div>
