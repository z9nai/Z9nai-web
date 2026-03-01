import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Terminal, 
  Zap, 
  Globe, 
  Mail, 
  Github, 
  ChevronRight,
  Activity,
  Layers,
  Box
} from 'lucide-react';

// Import the markdown content
// In a real Vite setup, you can use ?raw to import as string
// Since we are in a dynamic environment, we'll define a default or fetch it
const DEFAULT_CONTENT = `# Z9n.ai: The Future of Autonomous Engineering

We are building the next generation of AI-driven automation. Our mission is to bridge the gap between complex engineering and autonomous execution.

## Our Core Pillars

- **Autonomous Reasoning**: Systems that don't just follow rules, but understand goals.
- **Hardware Integration**: Seamlessly connecting digital intelligence with physical systems.
- **Scalable Infrastructure**: Built to handle the most demanding computational loads.

## Why Z9n?

At Z9n.ai, we believe that the future of technology lies in the synergy between human creativity and machine precision. Our tools are designed to empower engineers, not replace them.

### Get in Touch
Interested in what we're building? Reach out to us at [hello@z9n.ai](mailto:hello@z9n.ai).`;

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <div className={`relative ${className} group`}>
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" /> {/* Green */}
          <stop offset="30%" stopColor="#22d3ee" /> {/* Cyan */}
          <stop offset="60%" stopColor="#a855f7" /> {/* Purple */}
          <stop offset="100%" stopColor="#ec4899" /> {/* Pink */}
        </linearGradient>
      </defs>
      {/* Gear */}
      <path 
        d="M50 25c-1.5 0-2.8 1-3.3 2.4l-1.4 4.3c-2.4.6-4.6 1.7-6.5 3.2l-4.1-2c-1.4-.7-3.1-.3-4 1l-3.5 6c-.9 1.5-.6 3.4.8 4.4l3.6 2.6c-.2 1.3-.3 2.6-.3 4s.1 2.7.3 4l-3.6 2.6c-1.4 1-1.7 2.9-.8 4.4l3.5 6c.9 1.3 2.6 1.7 4 1l4.1-2c1.9 1.5 4.1 2.6 6.5 3.2l1.4 4.3c.5 1.4 1.8 2.4 3.3 2.4h7c1.5 0 2.8-1 3.3-2.4l1.4-4.3c2.4-.6 4.6-1.7 6.5-3.2l4.1 2c1.4.7 3.1.3 4-1l3.5-6c.9-1.5.6-3.4-.8-4.4l-3.6-2.6c.2-1.3.3-2.6.3-4s-.1-2.7-.3-4l3.6-2.6c1.4-1 1.7-2.9.8-4.4l-3.5-6c-.9-1.3-2.6-1.7-4-1l-4.1 2c-1.9-1.5-4.1-2.6-6.5-3.2l-1.4-4.3c-.5-1.4-1.8-2.4-3.3-2.4h-7zm3.5 15c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10z" 
        fill="none" 
        stroke="url(#logo-gradient)" 
        strokeWidth="2"
        className="animate-[spin_20s_linear_infinite]"
        style={{ transformOrigin: '50% 50%' }}
      />
      {/* Stylized Z with Circuits */}
      <path 
        d="M25 30 L75 30 L25 70 L75 70" 
        fill="none" 
        stroke="url(#logo-gradient)" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Circuit Nodes */}
      <circle cx="25" cy="30" r="3" fill="url(#logo-gradient)" />
      <circle cx="75" cy="30" r="3" fill="url(#logo-gradient)" />
      <circle cx="25" cy="70" r="3" fill="url(#logo-gradient)" />
      <circle cx="75" cy="70" r="3" fill="url(#logo-gradient)" />
      {/* Extra Circuit Lines */}
      <path d="M25 30 L15 30" stroke="url(#logo-gradient)" strokeWidth="2" />
      <circle cx="15" cy="30" r="2" fill="url(#logo-gradient)" />
      <path d="M75 70 L85 70" stroke="url(#logo-gradient)" strokeWidth="2" />
      <circle cx="85" cy="70" r="2" fill="url(#logo-gradient)" />
    </svg>
  </div>
);

const Header = () => (
  <header className="border-b border-white/10 bg-[#0a0a0a] sticky top-0 z-50">
    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3 group cursor-pointer">
        <Logo className="w-10 h-10" />
        <span className="font-mono font-bold text-xl tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-pink-500 transition-all">Z9n.ai</span>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <a href="#vision" className="text-xs font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Vision</a>
        <a href="#technology" className="text-xs font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Technology</a>
        <a href="#contact" className="text-xs font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Contact</a>
      </nav>
      <div className="flex items-center gap-4">
        <a href="https://github.com" className="text-white/60 hover:text-white transition-colors">
          <Github className="w-5 h-5" />
        </a>
        <button className="bg-white text-black px-4 py-1.5 rounded text-xs font-mono font-bold uppercase hover:bg-white/90 transition-all">
          Connect
        </button>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="py-24 px-6 border-b border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
    </div>
    <div className="max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <Logo className="w-16 h-16" />
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded border border-white/10 bg-white/5">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">System Status: Operational</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">
          Autonomous <br />
          <span className="text-white/40 italic">Intelligence</span> <br />
          for Engineering.
        </h1>
        <p className="text-lg text-white/60 max-w-xl mb-10 font-mono leading-relaxed">
          Z9n.ai is pioneering the integration of advanced neural architectures into industrial automation and hardware control.
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-black px-6 py-3 rounded font-mono font-bold uppercase flex items-center gap-2 hover:bg-white/80 transition-all group">
            Explore Documentation <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default function App() {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  // In a real scenario, you might fetch the markdown file
  // For this demo, we'll use the DEFAULT_CONTENT which matches src/content/home.md
  
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      <Header />
      
      <main>
        <Hero />

        <section id="vision" className="py-24 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_2fr] gap-16">
            <aside className="space-y-12">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-4">01 // Vision</div>
                <h2 className="text-2xl font-bold text-white mb-4">The Autonomous Edge</h2>
                <p className="text-sm text-white/60 leading-relaxed font-mono">
                  We believe intelligence should live where the action happens. Z9n.ai brings high-level reasoning to the edge.
                </p>
              </div>
              
              <div className="p-6 rounded border border-white/10 bg-white/5">
                <Terminal className="w-5 h-5 mb-4 text-white/40" />
                <div className="text-[10px] font-mono text-white/40 mb-2 uppercase tracking-widest">Current Build</div>
                <div className="text-xs font-mono text-emerald-400">v2.4.0-stable</div>
              </div>
            </aside>

            <article className="markdown-body prose prose-invert max-w-none">
              <div className="p-8 md:p-12 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {content}
                </Markdown>
              </div>
            </article>
          </div>
        </section>

        <section id="technology" className="py-24 px-6 border-t border-white/10 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-12">02 // Technology Stack</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "Neural Control", desc: "Direct hardware control via low-latency neural inference engines." },
                { icon: Layers, title: "Multi-Agent", desc: "Collaborative AI agents working in sync to solve complex spatial tasks." },
                { icon: Box, title: "Digital Twins", desc: "Real-time synchronization between physical assets and digital models." }
              ].map((tech, i) => (
                <div key={i} className="p-8 rounded border border-white/10 bg-black hover:border-white/30 transition-all group">
                  <tech.icon className="w-8 h-8 mb-6 text-white/40 group-hover:text-white transition-colors" />
                  <h3 className="text-lg font-bold mb-3">{tech.title}</h3>
                  <p className="text-sm text-white/60 font-mono leading-relaxed">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Logo className="w-8 h-8" />
              <span className="font-mono font-bold text-sm tracking-tighter text-white uppercase">Z9n.ai</span>
            </div>
            <p className="text-xs text-white/40 font-mono max-w-xs leading-relaxed">
              Engineering the autonomous future. <br />
              Based in the digital ether.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-16">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-6">Network</div>
              <ul className="space-y-3 text-xs font-mono text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-6">Legal</div>
              <ul className="space-y-3 text-xs font-mono text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between items-center">
          <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">© 2026 Z9n.ai // All Rights Reserved</div>
          <div className="flex gap-4">
            <Globe className="w-4 h-4 text-white/20" />
            <Mail className="w-4 h-4 text-white/20" />
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .markdown-body h1 { font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; color: white; letter-spacing: -0.025em; }
        .markdown-body h2 { font-size: 1.5rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; color: white; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
        .markdown-body h3 { font-size: 1.25rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; color: white; }
        .markdown-body p { margin-bottom: 1.25rem; color: rgba(255,255,255,0.6); line-height: 1.7; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 0.875rem; }
        .markdown-body ul { list-style-type: square; padding-left: 1.5rem; margin-bottom: 1.5rem; color: rgba(255,255,255,0.6); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 0.875rem; }
        .markdown-body li { margin-bottom: 0.5rem; }
        .markdown-body a { color: white; text-decoration: underline; text-underline-offset: 4px; }
        .markdown-body a:hover { color: rgba(255,255,255,0.8); }
      `}} />
    </div>
  );
}
