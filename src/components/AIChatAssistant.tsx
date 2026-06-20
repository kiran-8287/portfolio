import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiSend, 
  FiMic, 
  FiMicOff, 
  FiVolume2, 
  FiVolumeX, 
  FiTrash2, 
  FiDownload, 
  FiCopy, 
  FiCheck,
  FiTerminal,
  FiUser,
  FiCornerDownLeft
} from 'react-icons/fi';
import { TbRobot } from 'react-icons/tb';
import { portfolioData } from '../data/portfolio';
import './AIChatAssistant.css';

// Type definitions
type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
};

// Small reusable avatar: the React robot icon
function KiranAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'lg' ? 'w-20 h-20' : size === 'md' ? 'w-9 h-9' : 'w-8 h-8';
  const iconSize = size === 'lg' ? 'w-10 h-10 text-white' : size === 'md' ? 'w-5 h-5 text-white' : 'w-4 h-4 text-white';
  return (
    <div className={`${dims} rounded-2xl cursor-avatar flex items-center justify-center shrink-0 shadow-sm`}>
      <TbRobot className={iconSize} />
    </div>
  );
}

// Custom CodeBlock Component with copy functionality — the one intentional
// dark surface in an otherwise light UI, standing in for "Kiran's terminal"
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden font-mono text-xs terminal-block shadow-sm">
      <div className="terminal-block-header flex justify-between items-center px-4 py-2 text-slate-400 select-none">
        <span className="uppercase text-[10px] tracking-widest font-bold text-teal-400">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors active:scale-95 cursor-pointer"
        >
          {copied ? <FiCheck className="text-teal-400 w-3.5 h-3.5" /> : <FiCopy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Helper to render formatted text with bold and inline code support
function renderFormattedText(text: string) {
  const tokens = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return tokens.map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-white glow-text-primary">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code key={index} className="px-1.5 py-0.5 rounded bg-white/15 font-mono text-xs text-purple-300 border border-white/10">
          {token.slice(1, -1)}
        </code>
      );
    }
    return token;
  });
}

// Custom Markdown Message Parser
function MarkdownMessage({ text }: { text: string }) {
  // Strip [NAVIGATE:...] tag from the rendered view to keep the text clean
  const cleanText = text.replace(/\[NAVIGATE:\w+\]/g, '').trim();
  const parts = cleanText.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-sm leading-relaxed break-words font-sans text-zinc-300">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          const lines = part.split('\n');
          const firstLine = lines[0].replace('```', '').trim();
          const language = firstLine || 'code';
          const code = lines.slice(1, -1).join('\n');

          return <CodeBlock key={index} code={code} language={language} />;
        } else {
          const paragraphs = part.split('\n');
          return paragraphs.map((para, pIndex) => {
            if (para.trim().startsWith('- ') || para.trim().startsWith('* ')) {
              const content = para.replace(/^[-*]\s+/, '');
              return (
                <li key={pIndex} className="ml-4 list-disc mt-1 text-zinc-300">
                  {renderFormattedText(content)}
                </li>
              );
            }
            if (para.trim() === '') return <div key={pIndex} className="h-2" />;
            return (
              <p key={pIndex} className="text-zinc-300">
                {renderFormattedText(para)}
              </p>
            );
          });
        }
      })}
    </div>
  );
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiStatus, setAiStatus] = useState<'online' | 'thinking' | 'speaking' | 'listening'>('online');
  const [apiHealthCheck, setApiHealthCheck] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Speech Recognition & Memory
  useEffect(() => {
    // Load chat memory from localStorage
    const savedMessages = localStorage.getItem('ai_kiran_chat_history');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
      } catch (e) {
        console.error('Failed to parse chat memory', e);
      }
    }

    // Initialize Web Speech API Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setAiStatus('listening');
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          handleSendMessage(transcript);
        }
      };

      rec.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setAiStatus('online');
      };

      rec.onend = () => {
        setIsListening(false);
        if (isVoiceActive && aiStatus === 'listening') {
          setAiStatus('online');
        }
      };

      recognitionRef.current = rec;
    }

    // API Health Check
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => {
        setApiHealthCheck(data.apiConfigured);
      })
      .catch(() => {
        // Assume simulation if backend is not started/configured
        setApiHealthCheck(false);
      });

    return () => {
      // Cancel speech on unmount
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Sync memory to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ai_kiran_chat_history', JSON.stringify(messages));
    } else {
      localStorage.removeItem('ai_kiran_chat_history');
    }
    // Auto-scroll on new messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle auto-listening loop in Voice mode
  const speakResponse = (text: string) => {
    if (isMuted || !window.speechSynthesis) return;

    // Cancel current speech
    window.speechSynthesis.cancel();

    // Strip out tags like [NAVIGATE:...] and markdown signs before speaking
    const cleanText = text
      .replace(/\[NAVIGATE:\w+\]/g, '')
      .replace(/[*`#_]/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    speechUtteranceRef.current = utterance;

    // Find a premium English voice if possible
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) ||
                          voices.find(v => v.lang.startsWith('en')) || 
                          voices[0];
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onstart = () => {
      setAiStatus('speaking');
    };

    utterance.onend = () => {
      setAiStatus('online');
      // If voice conversation mode is enabled, auto-start microphone to listen for reply
      if (isVoiceActive && recognitionRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.error('Microphone failed to restart', e);
          }
        }, 600);
      }
    };

    utterance.onerror = () => {
      setAiStatus('online');
    };

    window.speechSynthesis.speak(utterance);
  };

  // Stop synthesis and listening when toggling voice mode off
  const toggleVoiceMode = () => {
    const nextVal = !isVoiceActive;
    setIsVoiceActive(nextVal);
    
    if (!nextVal) {
      window.speechSynthesis?.cancel();
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      setIsListening(false);
      setAiStatus('online');
    } else {
      // Starting voice mode: immediately trigger listening if not typing
      if (!isTyping && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {}
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis?.cancel();
    }
  };

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Try Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    } else {
      // Cancel speech before listening
      window.speechSynthesis?.cancel();
      try {
        recognitionRef.current.start();
      } catch (e) {}
    }
  };

  // Navigates the portfolio sections smoothly
  const executeNavigationCommand = (section: string) => {
    const target = section.toLowerCase();
    
    if (target === 'resume') {
      window.open(portfolioData.personal.links.resume, '_blank');
      return;
    }
    if (target === 'github') {
      window.open(portfolioData.personal.links.github, '_blank');
      return;
    }

    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // If mobile, auto-close drawer to let the user see the target section
      if (window.innerWidth < 768) {
        setTimeout(() => setIsOpen(false), 800);
      }
    } else {
      console.warn(`Section #${target} not found on this page`);
    }
  };

  // Master send function
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    // Check for direct command typing (e.g. /projects)
    const isCommand = textToSend.startsWith('/');
    let cleanMsg = textToSend;

    // Format direct command display
    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setAiStatus('thinking');

    // Cancel speech synthesizer on new send
    window.speechSynthesis?.cancel();

    // If it's a command, handle it locally first
    if (isCommand) {
      const commandName = textToSend.substring(1).trim().toLowerCase();
      const validCommands = ['projects', 'skills', 'resume', 'github', 'contact', 'experience'];
      
      if (validCommands.includes(commandName)) {
        setTimeout(() => {
          const confirmationText = `Executing system command: **/${commandName}**... Scrolling you to my ${commandName} section! [NAVIGATE:${commandName}]`;
          const botMessage: Message = {
            id: Math.random().toString(36).substring(7),
            role: 'model',
            text: confirmationText,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
          setAiStatus('online');
          
          // Trigger the scroll/nav
          executeNavigationCommand(commandName);

          // Voice speak confirmation
          if (isVoiceActive) {
            speakResponse(`Navigating to ${commandName}`);
          }
        }, 600);
        return;
      }
    }

    // Backend Streaming Request
    try {
      const historyPayload = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      // Set up streaming response holder
      const botMessageId = Math.random().toString(36).substring(7);
      const initialBotMessage: Message = {
        id: botMessageId,
        role: 'model',
        text: '',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, initialBotMessage]);
      setIsTyping(false);

      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: cleanMsg,
          history: historyPayload
        })
      });

      if (!response.body) {
        throw new Error('Readable stream not supported on response.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let botResponseAccumulator = '';

      // De-escalate thinking state to streaming typing state
      setIsTyping(false);
      setAiStatus('online');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        botResponseAccumulator += chunkText;

        // Update the active model message in real-time
        setMessages(prev => 
          prev.map(m => m.id === botMessageId ? { ...m, text: botResponseAccumulator } : m)
        );
      }

      // Check for navigation commands returned from AI: [NAVIGATE:section]
      const navMatch = botResponseAccumulator.match(/\[NAVIGATE:(\w+)\]/);
      if (navMatch && navMatch[1]) {
        executeNavigationCommand(navMatch[1]);
      }

      // Voice read the completed response
      if (isVoiceActive) {
        speakResponse(botResponseAccumulator);
      }

    } catch (error) {
      console.error('Error fetching stream response:', error);
      // Fallback message
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          id: Math.random().toString(36).substring(7),
          role: 'model',
          text: "I apologize, but I had trouble reaching my local backend. Please make sure the node server is active or try checking back later.",
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
      setAiStatus('online');
    }
  };

  const handleDownloadChat = () => {
    if (messages.length === 0) return;
    
    const formattedChat = messages.map(m => {
      const sender = m.role === 'user' ? 'USER' : 'AI KIRAN';
      const cleanMsg = m.text.replace(/\[NAVIGATE:\w+\]/g, '').trim();
      return `[${m.timestamp.toLocaleTimeString()}] ${sender}: ${cleanMsg}`;
    }).join('\n\n');

    const blob = new Blob([`AI Kiran Chat Log\nGenerated: ${new Date().toLocaleDateString()}\n=====================\n\n${formattedChat}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kiran_ai_chat_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear the conversation history?")) {
      window.speechSynthesis?.cancel();
      setMessages([]);
      localStorage.removeItem('ai_kiran_chat_history');
      setAiStatus('online');
    }
  };

  // Recruiter mode and action chips click handlers
  const handleChipClick = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const statusLabel =
    aiStatus === 'thinking' ? 'thinking it through…' :
    aiStatus === 'speaking' ? 'talking…' :
    aiStatus === 'listening' ? 'listening…' :
    (apiHealthCheck ? 'awake & building' : 'simulation mode');

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 p-[1px] flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 z-40 orb-btn-glow fab-breathe"
          aria-label="Open chat with Kiran"
        >
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center transition-all duration-300 group-hover:bg-slate-900">
            <TbRobot className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          </div>
          
          {/* Status dot */}
          <span className="absolute top-0 right-0 block h-3.5 w-3.5 rounded-full bg-teal-400 ring-2 ring-slate-950 status-dot-ring" />
          
          {/* Tooltip */}
          <span className="absolute right-16 bg-slate-950/90 text-white text-[11px] font-mono tracking-wider font-semibold py-1.5 px-3 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none whitespace-nowrap shadow-xl">
            Hey, I'm Kiran 👋
          </span>
        </button>
      </div>

      {/* Slide-out Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-[2px]"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[480px] z-50 glass-panel shadow-2xl flex flex-col overflow-hidden text-white border-l border-white/10"
            >
              {/* Floating particles background effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
              </div>

              {/* Chat Header */}
              <div className="relative p-4 border-b border-white/10 flex items-center justify-between bg-black/30 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <KiranAvatar size="sm" />
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                      Kiran
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
                    </h3>
                    <p className="text-[11px] text-zinc-400 font-mono tracking-wide">
                      {statusLabel}
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  {/* Download */}
                  {messages.length > 0 && (
                    <button
                      onClick={handleDownloadChat}
                      className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                      title="Download chat log"
                    >
                      <FiDownload className="w-4 h-4" />
                    </button>
                  )}

                  {/* Clear */}
                  {messages.length > 0 && (
                    <button
                      onClick={handleClearChat}
                      className="p-2 text-zinc-400 hover:text-rose-400 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                      title="Clear chat"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  )}

                  {/* Volume (Mute) Toggle */}
                  <button
                    onClick={toggleMute}
                    className={`p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer ${isMuted ? 'text-zinc-500' : 'text-zinc-400 hover:text-white'}`}
                    title={isMuted ? "Unmute TTS" : "Mute TTS"}
                  >
                    {isMuted ? <FiVolumeX className="w-4 h-4" /> : <FiVolume2 className="w-4 h-4" />}
                  </button>

                  {/* Continuous Voice Conversation Toggle */}
                  <button
                    onClick={toggleVoiceMode}
                    className={`p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer ${isVoiceActive ? 'text-indigo-400 bg-indigo-500/10' : 'text-zinc-400 hover:text-white'}`}
                    title={isVoiceActive ? "Disable Hands-free Voice Mode" : "Enable Hands-free Voice Mode"}
                  >
                    {isVoiceActive ? <FiMic className="w-4 h-4" /> : <FiMicOff className="w-4 h-4" />}
                  </button>

                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                    title="Close"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Content Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 ai-chat-scrollbar relative z-10 bg-slate-950/20">
                {messages.length === 0 ? (
                  /* Landing State */
                  <div className="h-full flex flex-col items-center justify-center text-center px-2 py-8">
                    <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-25 blur-xl orb-glow" />
                      <KiranAvatar size="lg" />
                    </div>

                    <h2 className="text-2xl font-extrabold tracking-tight text-white mb-2">
                      Hey, I'm Kiran 👋
                    </h2>
                    <p className="text-zinc-400 text-sm max-w-sm mb-7 leading-relaxed font-sans">
                      2nd-year Data Science student at IIT Palakkad, currently deep in something I'll explain badly until I'm three sentences in and suddenly very excited. Ask about my projects, my stack, or what a 2 AM bug looks like — I can scroll you around the site too.
                    </p>

                    {/* Quick Command System Guide */}
                    <div className="w-full max-w-sm rounded-xl border border-white/5 bg-white/[0.02] p-3.5 mb-7 text-left glass-card">
                      <div className="flex items-center gap-2 mb-2 text-violet-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                        <FiTerminal className="w-3 h-3" />
                        <span>Quick commands</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-sans leading-normal mb-2.5">
                        Type any of these to jump straight there:
                      </p>
                      <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px] text-zinc-300">
                        <span className="px-2 py-1 rounded-md bg-black/40 border border-white/5">/projects</span>
                        <span className="px-2 py-1 rounded-md bg-black/40 border border-white/5">/skills</span>
                        <span className="px-2 py-1 rounded-md bg-black/40 border border-white/5">/experience</span>
                        <span className="px-2 py-1 rounded-md bg-black/40 border border-white/5">/resume</span>
                        <span className="px-2 py-1 rounded-md bg-black/40 border border-white/5">/github</span>
                        <span className="px-2 py-1 rounded-md bg-black/40 border border-white/5">/contact</span>
                      </div>
                    </div>

                    {/* Suggested Prompts */}
                    <div className="w-full max-w-sm text-left">
                      <p className="text-zinc-500 text-[10px] uppercase font-mono tracking-widest mb-3 font-bold">
                        Or just ask
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Tell me about yourself",
                          "Show me your projects",
                          "Why should I hire you?",
                          "What's your tech stack?",
                          "What's a 2 AM bug story?",
                          "Walk me through your experience"
                        ].map((prompt, i) => (
                          <button
                            key={i}
                            onClick={() => handleChipClick(prompt)}
                            className="text-xs text-left bg-white/[0.03] border border-white/5 hover:border-violet-500 hover:bg-violet-500/10 active:scale-95 text-zinc-300 hover:text-white px-3 py-2 rounded-xl transition-all cursor-pointer font-sans"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Active Chat Messages */
                  <div className="space-y-5">
                    {messages.map((message) => {
                      const isUser = message.role === 'user';
                      return (
                        <div
                          key={message.id}
                          className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          {!isUser && <KiranAvatar size="md" />}

                          <div
                            className={`max-w-[82%] px-4 py-3 rounded-2xl border text-sm shadow-lg leading-relaxed ${
                              isUser
                                ? 'bg-gradient-to-tr from-indigo-600/90 to-purple-600/90 text-white border-indigo-500/30 rounded-tr-sm font-sans'
                                : 'bg-white/[0.03] border-white/5 rounded-tl-sm glass-card'
                            }`}
                          >
                            {isUser ? (
                              <p className="whitespace-pre-wrap font-sans text-zinc-100">{message.text}</p>
                            ) : (
                              message.text === '' ? (
                                <div className="flex items-center justify-start h-5 w-12 pl-1.5">
                                  <div className="dot-flashing" />
                                </div>
                              ) : (
                                <MarkdownMessage text={message.text} />
                              )
                            )}
                          </div>

                          {isUser && (
                            <div className="w-8 h-8 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                              <FiUser className="w-3.5 h-3.5 text-zinc-400" />
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex items-start gap-3 justify-start">
                        <KiranAvatar size="md" />
                        <div className="px-4 py-4 rounded-2xl rounded-tl-sm bg-white/[0.03] border border-white/5 glass-card shadow-lg">
                          <div className="flex items-center justify-start w-12 pl-1.5">
                            <div className="dot-flashing" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Speech State Feedback Bar (Only visible when active in voice conversation) */}
              {isVoiceActive && (
                <div className="relative z-10 bg-black/40 border-t border-white/5 py-2.5 px-4 flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    {/* Animated waves when speaking or listening */}
                    {(aiStatus === 'listening' || aiStatus === 'speaking') ? (
                      <div className="flex items-center gap-0.5 h-5">
                        <div className="voice-wave-bar" />
                        <div className="voice-wave-bar" />
                        <div className="voice-wave-bar" />
                        <div className="voice-wave-bar" />
                        <div className="voice-wave-bar" />
                      </div>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    )}
                    <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
                      {aiStatus === 'listening' && "Listening to you…"}
                      {aiStatus === 'speaking' && "Kiran is talking…"}
                      {aiStatus === 'online' && "Voice mode idle"}
                      {aiStatus === 'thinking' && "Thinking…"}
                    </span>
                  </div>
                  {isListening && (
                    <button 
                      onClick={handleMicClick}
                      className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono text-zinc-400 bg-white/5 border border-white/10 rounded hover:text-white cursor-pointer"
                    >
                      Stop
                    </button>
                  )}
                </div>
              )}

              {/* Chat Input Area Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="relative p-4 border-t border-white/10 bg-black/40 backdrop-blur-md flex gap-2 items-center z-10"
              >
                {/* Voice Mode Toggle (Mic) */}
                <button
                  type="button"
                  onClick={handleMicClick}
                  className={`p-3 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    isListening 
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                      : 'bg-white/[0.03] text-zinc-400 border-white/5 hover:text-white hover:border-white/20'
                  }`}
                  title="Speech to Text"
                >
                  <FiMic className="w-4 h-4" />
                </button>

                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      isListening
                        ? 'Listening...'
                        : 'Type /help or ask me anything...'
                    }
                    disabled={isListening}
                    className="w-full py-3 pl-4 pr-10 rounded-xl text-sm font-sans focus:outline-none transition-all disabled:opacity-50 glass-input"
                  />
                  
                  {/* Shortcut Indicator Enter button icon */}
                  <span className="absolute right-3.5 top-3.5 text-[9px] font-mono text-zinc-500 border border-zinc-700/60 px-1 rounded flex items-center gap-0.5 select-none pointer-events-none">
                    <span>Enter</span>
                    <FiCornerDownLeft className="w-2 h-2" />
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping || isListening}
                  className="p-3 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white flex items-center justify-center transition-all active:scale-95 disabled:opacity-40 disabled:scale-100 disabled:pointer-events-none cursor-pointer shadow-lg"
                  title="Send Message"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
