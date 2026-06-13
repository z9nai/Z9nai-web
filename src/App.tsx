import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { motion } from 'motion/react';
import { Globe, Mail, ChevronRight, Activity, Sun, Moon } from 'lucide-react';
import logoColor from './images/logo_new.png';
import logoWeiss from './images/logo_new_white.png';
import orchescalaIcon from './images/orchescala_icon.png';
import portraitHobby from './images/portrait_hobby.png';
import portrait from './images/portrait.png';
import servicesImg from './images/services.png';
import heroMd from './content/hero.md?raw';
import datenschutzMd from './content/datenschutz.md?raw';
import codeOfConductMd from './content/code-of-conduct.md?raw';
import konzepteMd from './content/konzepte.md?raw';
import orchescalaMd from './content/orchescala.md?raw';
import servicesMd from './content/services.md?raw';
import preiseMd from './content/preise.md?raw';
import firmaMd from './content/firma.md?raw';
import cvPdf from './files/cv_pascal.mengelt.pdf?url';

// ── Theme ──────────────────────────────────────────────────────────────────
const ThemeContext = React.createContext<{ isDark: boolean; toggle: () => void }>({
  isDark: true,
  toggle: () => {},
});
const useTheme = () => React.useContext(ThemeContext);

const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      title={isDark ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln'}
      className="inline-flex items-center gap-1.5 focus:outline-none group cursor-pointer"
    >
      <Sun
        className={`w-3.5 h-3.5 transition-colors duration-300 ${
          isDark
            ? 'text-white/25 group-hover:text-white/60'
            : 'text-amber-500 group-hover:text-amber-600'
        }`}
      />
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-300 ${
          isDark ? 'bg-white/20 group-hover:bg-white/35' : 'bg-black/15 group-hover:bg-black/25'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full shadow transition-transform duration-300 ${
            isDark ? 'translate-x-1 bg-white' : 'translate-x-[18px] bg-gray-700'
          }`}
        />
      </span>
      <Moon
        className={`w-3.5 h-3.5 transition-colors duration-300 ${
          isDark
            ? 'text-white group-hover:text-white'
            : 'text-black/25 group-hover:text-black/55'
        }`}
      />
    </button>
  );
};

const Modal = ({ onClose, children, wide = false }: { onClose: () => void; children: React.ReactNode; wide?: boolean }) => {
  const { isDark } = useTheme();
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative ${wide ? 'max-w-4xl' : 'max-w-2xl'} w-full max-h-[80vh] overflow-y-auto rounded-2xl border p-8 shadow-2xl ${
          isDark ? 'border-white/10 bg-[#191a1c]' : 'border-black/10 bg-[#f5f4f0]'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 transition-colors font-mono text-xs tracking-widest ${
            isDark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-900'
          }`}
        >
          [ESC]
        </button>
        <article className={`markdown-body prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
          {children}
        </article>
      </div>
    </div>
  );
};

const DatenschutzModal = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose}>
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{datenschutzMd}</Markdown>
  </Modal>
);

const CodeOfConductModal = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose}>
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{codeOfConductMd}</Markdown>
  </Modal>
);

const KonditionenModal = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose} wide>
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{preiseMd}</Markdown>
  </Modal>
);

const Logo = ({ className = "w-8 h-8", forceHover }: { className?: string; forceHover?: boolean }) => {
  const { isDark } = useTheme();
  const [hovered, setHovered] = React.useState(false);
  const isHovered = hovered || forceHover;
  const src = isHovered ? logoWeiss : logoColor;
  return (
    <img
      src={src}
      alt="z9nai logo"
      className={`${className} transition-all duration-200`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
};

const imageMap: { [key: string]: string } = {
  'orchescala_icon.png': orchescalaIcon,
  'portrait_hobby.png': portraitHobby,
  'portrait.png': portrait,
  'services.png': servicesImg,
};

const HoverImage = ({ src, hoverSrc, alt, title }: { src: string; hoverSrc?: string; alt?: string; title?: string }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <img
      src={hoverSrc && hovered ? hoverSrc : src}
      alt={alt}
      title={title}
      className="max-w-full h-auto rounded-2xl my-4 mx-auto block transition-all duration-200"
      onMouseEnter={() => hoverSrc && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={hoverSrc ? { cursor: 'pointer' } : undefined}
    />
  );
};

const ContentSection = ({ id, index, label, content, alternate = false }: {
  id: string;
  index: string;
  label: string;
  content: string;
  alternate?: boolean;
}) => {
  const markdownComponents = {
    img: ({ node, ...props }: any) => {
      // ...existing code...
      const src = props.src as string;
      const filename = src.split('/').pop() || src;
      const mappedSrc = imageMap[filename] || src;

      const rawTitle: string = props.title || '';
      let hoverSrc: string | undefined;
      let displayTitle: string | undefined;
      if (rawTitle.startsWith('hover:')) {
        const hoverFilename = rawTitle.slice('hover:'.length);
        hoverSrc = imageMap[hoverFilename] || hoverFilename;
      } else {
        displayTitle = rawTitle || undefined;
      }

      return <HoverImage src={mappedSrc} hoverSrc={hoverSrc} alt={props.alt} title={displayTitle} />;
    },
    a: ({ node, ...props }: any) => {
      const href: string = props.href || '';
      const isPdf = href.endsWith('.pdf');
      return (
        <a
          {...props}
          href={href}
          {...(isPdf ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
        />
      );
    }
  };

  const { isDark } = useTheme();
  return (
    <section id={id} className={`py-24 px-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}${alternate ? (isDark ? ' bg-white/[0.01]' : ' bg-black/[0.01]') : ''}`}>
      <div className="max-w-5xl mx-auto">
        <div className={`text-[10px] font-mono uppercase tracking-[0.3em] mb-8 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
          {index} // {label}
        </div>
        <article className={`markdown-body prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
          <div className={`p-8 md:p-12 rounded-2xl border backdrop-blur-sm ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}`}>
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>{content}</Markdown>
          </div>
        </article>
      </div>
    </section>
  );
};

const Header = () => {
  const { isDark } = useTheme();
  const [linkHovered, setLinkHovered] = React.useState(false);
  return (
    <header className={`border-b backdrop-blur-md sticky top-0 z-50 ${isDark ? 'border-white/10 bg-[#191a1c]/90' : 'border-black/10 bg-[#f5f4f0]/90'}`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-3 cursor-pointer"
          onMouseEnter={() => setLinkHovered(true)}
          onMouseLeave={() => setLinkHovered(false)}
        >
          <Logo className="w-10 h-10" forceHover={linkHovered} />
          <span className={`font-mono font-bold text-xl tracking-tighter transition-all duration-200 ${
            linkHovered
              ? (isDark ? 'text-white' : 'text-gray-900')
              : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-500'
          }`}>z9nai GmbH</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#konzepte" className={`text-xs font-mono transition-colors uppercase tracking-widest ${isDark ? 'text-white/60 hover:text-white' : 'text-black/50 hover:text-black'}`}>Konzepte</a>
          <a href="#orchescala" className={`text-xs font-mono transition-colors uppercase tracking-widest ${isDark ? 'text-white/60 hover:text-white' : 'text-black/50 hover:text-black'}`}>Orchescala</a>
          <a href="#services" className={`text-xs font-mono transition-colors uppercase tracking-widest ${isDark ? 'text-white/60 hover:text-white' : 'text-black/50 hover:text-black'}`}>Services</a>
          <a href="#contact" className={`text-xs font-mono transition-colors uppercase tracking-widest ${isDark ? 'text-white/60 hover:text-white' : 'text-black/50 hover:text-black'}`}>Firma</a>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

const LaunchCountdown = () => {
  const { isDark } = useTheme();
  const [days, setDays] = React.useState(0);

  React.useEffect(() => {
    const launch = new Date('2026-07-01T00:00:00');
    const update = () => {
      const diff = launch.getTime() - Date.now();
      setDays(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`inline-flex items-center gap-3 my-3 px-4 py-2 rounded-lg border backdrop-blur-sm ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.03]'}`}>
      <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${isDark ? 'text-white/40' : 'text-black/40'}`}>Launch in</span>
      <span className={`text-3xl font-mono font-black tabular-nums ${isDark ? 'text-white' : 'text-gray-900'}`}>{days}</span>
      <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${isDark ? 'text-white/40' : 'text-black/40'}`}>Tagen</span>
      <span className={`font-mono text-xs ${isDark ? 'text-white/20' : 'text-black/25'}`}>// 01.07.2026</span>
    </div>
  );
};

const Hero = () => {
  const { isDark } = useTheme();
  return (
    <section className={`pt-12 pb-24 px-6 border-b relative overflow-hidden ${isDark ? 'border-white/10' : 'border-black/10'}`}>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`font-bold mb-7 tracking-tighter leading-[0.85] ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="block md:text-6xl">Domain</span>
            <span className="inline-block md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-500 transition-all italic font-semibold pr-1">Driven</span>
            <span className="block md:text-6xl">Process</span>
            <span className="inline-block md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-500 transition-all italic font-semibold pr-1">Engineered</span>
            <span className="block md:text-6xl">AI</span>
            <span className="inline-block md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-500 transition-all italic font-semibold pr-1">Powered</span>
          </h1>
          <div className={`markdown-body prose max-w-xl mb-10 ${isDark ? 'prose-invert' : ''}`}>
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{heroMd}</Markdown>
          </div>
          <div className="flex items-center gap-4 mb-8">
            <Logo className="w-16 h-16" />
            <LaunchCountdown />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PreiseHeader = () => {
  const { isDark } = useTheme();
  return (
    <header className={`border-b backdrop-blur-md sticky top-0 z-50 ${isDark ? 'border-white/10 bg-[#191a1c]/90' : 'border-black/10 bg-[#f5f4f0]/90'}`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <span className="font-mono font-bold text-xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-500">z9nai GmbH</span>
        </div>
        <div className={`text-[10px] font-mono uppercase tracking-[0.3em] ${isDark ? 'text-white/30' : 'text-black/30'}`}>vertraulich</div>
      </div>
    </header>
  );
};

const PageFooter = ({ onDatenschutz, onCodeOfConduct, onKonditionen }: { onDatenschutz: () => void; onCodeOfConduct?: () => void; onKonditionen?: () => void }) => {
  const { isDark } = useTheme();
  return (
    <footer className={`py-16 px-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
      <div className="max-w-5xl mx-auto">
        <div className={`pt-8 border-t flex justify-between items-center ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          <div className={`text-[10px] font-mono tracking-widest ${isDark ? 'text-white/20' : 'text-black/30'}`}>© 2026 z9nai GmbH // Alle Rechte vorbehalten</div>
          <div className="flex items-center gap-4">
            {onKonditionen && (
              <>
                <button
                  onClick={onKonditionen}
                  className={`text-[10px] font-mono transition-colors tracking-widest uppercase ${isDark ? 'text-white/20 hover:text-white/50' : 'text-black/30 hover:text-black/60'}`}
                >
                  Konditionen
                </button>
                <span className={`font-mono text-xs ${isDark ? 'text-white/10' : 'text-black/15'}`}>//</span>
              </>
            )}
            <button
              onClick={onDatenschutz}
              className={`text-[10px] font-mono transition-colors tracking-widest uppercase ${isDark ? 'text-white/20 hover:text-white/50' : 'text-black/30 hover:text-black/60'}`}
            >
              Datenschutz
            </button>
            {onCodeOfConduct && (
              <>
                <span className={`font-mono text-xs ${isDark ? 'text-white/10' : 'text-black/15'}`}>//</span>
                <button
                  onClick={onCodeOfConduct}
                  className={`text-[10px] font-mono transition-colors tracking-widest uppercase ${isDark ? 'text-white/20 hover:text-white/50' : 'text-black/30 hover:text-black/60'}`}
                >
                  Code of Conduct
                </button>
              </>
            )}
            <span className={`font-mono text-xs ${isDark ? 'text-white/10' : 'text-black/15'}`}>//</span>
            <Mail className={`w-4 h-4 cursor-pointer ${isDark ? 'text-white/20' : 'text-black/30'}`} onClick={() => window.location.href = 'mailto:pascal.mengelt@z9n.ai'} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const PreisePage = ({ onDatenschutz }: { onDatenschutz: () => void }) => (
  <>
    <PreiseHeader />
    <main>
      <ContentSection id="preise" index="00" label="Konditionen" content={preiseMd} />
    </main>
    <PageFooter onDatenschutz={onDatenschutz} />
  </>
);

const CodeOfConductPage = ({ onDatenschutz }: { onDatenschutz: () => void }) => (
  <>
    <PreiseHeader />
    <main>
      <ContentSection id="code-of-conduct" index="00" label="Code of Conduct" content={codeOfConductMd} />
    </main>
    <PageFooter onDatenschutz={onDatenschutz} />
  </>
);

const isPreiseRoute = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.replace(/\/+$/, '');
  const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
  return path === '/preise' || hash === 'preise';
};

const isCodeOfConductRoute = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.replace(/\/+$/, '');
  const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
  return path === '/code-of-conduct' || hash === 'code-of-conduct';
};

export default function App() {
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
    } catch {}
    return true;
  });
  const toggleTheme = () => setIsDark(d => {
    const next = !d;
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
    return next;
  });

  const [datenschutzOpen, setDatenschutzOpen] = React.useState(false);
  const [codeOfConductOpen, setCodeOfConductOpen] = React.useState(false);
  const [konditionenOpen, setKonditionenOpen] = React.useState(false);
  const [showPreise, setShowPreise] = React.useState(isPreiseRoute());
  const [showCodeOfConduct, setShowCodeOfConduct] = React.useState(isCodeOfConductRoute());

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setDatenschutzOpen(false); setCodeOfConductOpen(false); setKonditionenOpen(false); }
    };
    window.addEventListener('keydown', handler);
    const onNav = () => {
      setShowPreise(isPreiseRoute());
      setShowCodeOfConduct(isCodeOfConductRoute());
    };
    window.addEventListener('popstate', onNav);
    window.addEventListener('hashchange', onNav);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('popstate', onNav);
      window.removeEventListener('hashchange', onNav);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: toggleTheme }}>
      <div className={`min-h-screen font-sans transition-colors duration-300 ${
        isDark
          ? 'bg-[#191a1c] text-white selection:bg-white selection:text-black'
          : 'light-mode bg-[#f5f4f0] text-gray-900 selection:bg-gray-900 selection:text-white'
      }`}>
        {datenschutzOpen && <DatenschutzModal onClose={() => setDatenschutzOpen(false)} />}
        {codeOfConductOpen && <CodeOfConductModal onClose={() => setCodeOfConductOpen(false)} />}
        {konditionenOpen && <KonditionenModal onClose={() => setKonditionenOpen(false)} />}
        {showPreise ? (
          <PreisePage onDatenschutz={() => setDatenschutzOpen(true)} />
        ) : showCodeOfConduct ? (
          <CodeOfConductPage onDatenschutz={() => setDatenschutzOpen(true)} />
        ) : (
          <>
            <Header />
            <main>
              <Hero />
              <ContentSection id="konzepte" index="01" label="Konzepte" content={konzepteMd} />
              <ContentSection id="orchescala"  index="02" label="Orchescala"  content={orchescalaMd} />
              <ContentSection id="services"    index="03" label="Services"    content={servicesMd} alternate />
              <ContentSection id="contact"     index="04" label="Firma"     content={firmaMd.replace('/cv_pascal.mengelt.pdf', cvPdf)} />
            </main>
            <PageFooter
              onDatenschutz={() => setDatenschutzOpen(true)}
              onCodeOfConduct={() => setCodeOfConductOpen(true)}
              onKonditionen={() => setKonditionenOpen(true)}
            />
          </>
        )}


      </div>
    </ThemeContext.Provider>
  );
}
