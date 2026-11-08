import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { motion } from 'motion/react';
import { Globe, Mail, ChevronRight, Activity, Sun, Moon } from 'lucide-react';
import logoBlau from './images/logo_new_white_blue.png';
import logoBlauInvers from './images/logo_new_blue.png';
import logoWeissTransparent from './images/logo_new_white_transparent.png';
import zeichenBlau from './images/logo_new_white_blue_large.png';
import zeichenWeiss from './images/logo_new_white_transparent_large.png';
import orchescalaIcon from './images/orchescala_icon.png';
import portraitHobby from './images/portrait_hobby.png';
import portrait from './images/portrait.png';
import heroMd from './content/hero.md?raw';
import datenschutzMd from './content/datenschutz.md?raw';
import codeOfConductMd from './content/code-of-conduct.md?raw';
import konzepteMd from './content/konzepte.md?raw';
import orchescalaMd from './content/orchescala.md?raw';
import demoMd from './content/demo.md?raw';
import orchPlatformMd from './content/orch-platform.md?raw';
import archOverview from './images/orch-platform/arch-overview.svg';
import archFlowSync from './images/orch-platform/arch-flow-sync.svg';
import archFlowProcess from './images/orch-platform/arch-flow-process.svg';
import archWorkerLayers from './images/orch-platform/arch-worker-layers.svg';
import servicesMd from './content/services.md?raw';
import preiseMd from './content/preise.md?raw';
import firmaMd from './content/firma.md?raw';
import cvPdf from './files/cv_pascal.mengelt.pdf?url';

// ── Theme ──────────────────────────────────────────────────────────────────
const ThemeContext = React.createContext<{ isDark: boolean; toggle: () => void }>({
  isDark: false,
  toggle: () => {},
});
const useTheme = () => React.useContext(ThemeContext);

// Ein Knopf wie in orch-spec: zeigt das Symbol des Modus, in den gewechselt wird.
const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      title={isDark ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln'}
      aria-label={isDark ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln'}
      className={`flex items-center p-2 rounded-md transition-colors cursor-pointer ${
        isDark ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-z-mid hover:text-z-blue hover:bg-z-soft'
      }`}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
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
          isDark ? 'border-white/10 bg-z-night' : 'border-z-line bg-white'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 transition-colors text-[11px] font-medium uppercase tracking-[0.2em] ${
            isDark ? 'text-white/40 hover:text-white' : 'text-z-mid hover:text-z-blue'
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

// Logo nach z9nai-Standard: hell = weisses Zahnrad auf blauem Kreis (Hover: invers),
// dunkel = weisses Zahnrad ohne Kreis auf dem blauen Hintergrund.
const Logo = ({ className = "w-8 h-8", forceHover }: { className?: string; forceHover?: boolean }) => {
  const { isDark } = useTheme();
  const [hovered, setHovered] = React.useState(false);
  const isHovered = hovered || forceHover;
  const src = isDark ? logoWeissTransparent : (isHovered ? logoBlauInvers : logoBlau);
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

// Absenderzeile wie in Offerten und Präsentationen
const Brand = () => {
  const { isDark } = useTheme();
  return (
    <span className="flex flex-col leading-none">
      <span className={`font-bold text-lg tracking-tight ${isDark ? 'text-white' : 'text-z-blue'}`}>z9nai gmbh</span>
      <span className={`mt-1 text-[9px] font-medium uppercase tracking-[0.32em] ${isDark ? 'text-z-copper-light' : 'text-z-copper-text'}`}>Software Engineering · KI</span>
    </span>
  );
};

const imageMap: { [key: string]: string } = {
  'orchescala_icon.png': orchescalaIcon,
  'portrait_hobby.png': portraitHobby,
  'portrait.png': portrait,
  'arch-overview.svg': archOverview,
  'arch-flow-sync.svg': archFlowSync,
  'arch-flow-process.svg': archFlowProcess,
  'arch-worker-layers.svg': archWorkerLayers,
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
    <section id={id} className={`py-24 px-6 border-t ${isDark ? 'border-white/10' : 'border-z-line'}${alternate ? (isDark ? ' bg-white/[0.02]' : ' bg-z-soft') : ''}`}>
      <div className="max-w-5xl mx-auto">
        <div className={`text-[11px] font-medium uppercase tracking-[0.3em] mb-8 ${isDark ? 'text-z-copper-light' : 'text-z-copper-text'}`}>
          {index} · {label}
        </div>
        <article className={`markdown-body prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
          <div className={`p-8 md:p-12 rounded-2xl border ${isDark ? 'border-white/10 bg-white/[0.03]' : (alternate ? 'border-z-line bg-white' : 'border-z-line bg-[#F8F9FA]')}`}>
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
    <header className={`border-b border-t-[3px] backdrop-blur-md sticky top-0 z-50 ${isDark ? 'border-b-white/10 border-t-z-copper bg-z-night/90' : 'border-b-z-line border-t-z-blue bg-white/90'}`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-3 cursor-pointer"
          onMouseEnter={() => setLinkHovered(true)}
          onMouseLeave={() => setLinkHovered(false)}
        >
          <Logo className="w-10 h-10" forceHover={linkHovered} />
          <Brand />
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#konzepte" className={`text-[11px] font-medium transition-colors uppercase tracking-[0.2em] ${isDark ? 'text-white/60 hover:text-white' : 'text-z-mid hover:text-z-blue'}`}>Konzepte</a>
          <a href="#orchescala" className={`text-[11px] font-medium transition-colors uppercase tracking-[0.2em] ${isDark ? 'text-white/60 hover:text-white' : 'text-z-mid hover:text-z-blue'}`}>Orchescala</a>
          <a href="#services" className={`text-[11px] font-medium transition-colors uppercase tracking-[0.2em] ${isDark ? 'text-white/60 hover:text-white' : 'text-z-mid hover:text-z-blue'}`}>Services</a>
          <a href="#contact" className={`text-[11px] font-medium transition-colors uppercase tracking-[0.2em] ${isDark ? 'text-white/60 hover:text-white' : 'text-z-mid hover:text-z-blue'}`}>Firma</a>
          <a href="#demo" className={`text-[11px] font-medium transition-colors uppercase tracking-[0.2em] ${isDark ? 'text-white/60 hover:text-white' : 'text-z-mid hover:text-z-blue'}`}>Demo</a>
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
  const [isPast, setIsPast] = React.useState(false);

  React.useEffect(() => {
    const launch = new Date('2026-07-01T00:00:00');
    const update = () => {
      const diff = Date.now() - launch.getTime();
      if (diff >= 0) {
        setIsPast(true);
        setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      } else {
        setIsPast(false);
        setDays(Math.ceil(-diff / (1000 * 60 * 60 * 24)));
      }
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`inline-flex items-center gap-3 my-3 px-4 py-2 rounded-lg border italic ${isDark ? 'border-white/10 bg-white/[0.04]' : 'border-z-line bg-z-soft'}`}>
      <span className={`text-[10px] font-medium uppercase tracking-[0.25em] ${isDark ? 'text-z-copper-light' : 'text-z-copper-text'}`}>{isPast ? 'Seit' : 'Launch in'}</span>
      <span className={`text-3xl font-bold tabular-nums ${isDark ? 'text-white' : 'text-z-blue'}`}>{days}</span>
      <span className={`text-[10px] font-medium uppercase tracking-[0.25em] ${isDark ? 'text-z-copper-light' : 'text-z-copper-text'}`}>Tagen</span>
      <span className={`text-xs ${isDark ? 'text-white/40' : 'text-z-mid'}`}>· 01.07.2026</span>
    </div>
  );
};

const Hero = () => {
  const { isDark } = useTheme();
  return (
    <section className={`pt-12 pb-24 px-6 border-b relative overflow-hidden ${isDark ? 'border-white/10' : 'border-z-line'}`}>
      {/* blasses Bildzeichen wie auf Titelseiten von Offerten und Präsentationen */}
      <img
        src={isDark ? zeichenWeiss : zeichenBlau}
        alt=""
        aria-hidden="true"
        className={`hidden sm:block absolute pointer-events-none select-none w-[520px] md:w-[640px] -right-40 md:-right-32 top-10 ${isDark ? 'opacity-[0.06]' : 'opacity-10'}`}
      />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`font-semibold mb-7 tracking-tight leading-[0.9] ${isDark ? 'text-white' : 'text-z-blue'}`}>
            <span className="block text-5xl md:text-6xl italic">Domain</span>
            <span className={`inline-block text-3xl md:text-4xl font-medium italic pr-1 ${isDark ? 'text-z-copper-light' : 'text-z-copper'}`}>Driven</span>
            <span className="block text-5xl md:text-6xl italic">Process</span>
            <span className={`inline-block text-3xl md:text-4xl font-medium italic pr-1 ${isDark ? 'text-z-copper-light' : 'text-z-copper'}`}>Engineered</span>
            <span className="block text-5xl md:text-6xl italic">AI</span>
            <span className={`inline-block text-3xl md:text-4xl font-medium italic pr-1 ${isDark ? 'text-z-copper-light' : 'text-z-copper'}`}>Powered</span>
          </h1>
          <div className={`markdown-body prose max-w-xl mb-10 italic ${isDark ? 'prose-invert' : ''}`}>
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

const PreiseHeader = ({ label = 'vertraulich' }: { label?: string }) => {
  const { isDark } = useTheme();
  return (
    <header className={`border-b border-t-[3px] backdrop-blur-md sticky top-0 z-50 ${isDark ? 'border-b-white/10 border-t-z-copper bg-z-night/90' : 'border-b-z-line border-t-z-blue bg-white/90'}`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <Brand />
        </a>
        <div className={`text-[10px] font-medium uppercase tracking-[0.3em] ${isDark ? 'text-white/40' : 'text-z-mid'}`}>{label}</div>
      </div>
    </header>
  );
};

const PageFooter = ({ onDatenschutz, onCodeOfConduct, onKonditionen }: { onDatenschutz: () => void; onCodeOfConduct?: () => void; onKonditionen?: () => void }) => {
  const { isDark } = useTheme();
  return (
    <footer className={`py-10 px-6 border-t ${isDark ? 'border-white/10' : 'border-z-line'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <div className={`text-[10px] font-medium uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-z-mid'}`}>© 2026 <span className="normal-case">z9nai gmbh</span> · Alle Rechte vorbehalten</div>
          <div className="flex items-center gap-4">
            {onKonditionen && (
              <>
                <button
                  onClick={onKonditionen}
                  className={`text-[10px] font-medium transition-colors tracking-[0.2em] uppercase ${isDark ? 'text-white/40 hover:text-white' : 'text-z-mid hover:text-z-blue'}`}
                >
                  Konditionen
                </button>
                <span className={`text-xs ${isDark ? 'text-white/20' : 'text-z-line'}`}>·</span>
              </>
            )}
            <button
              onClick={onDatenschutz}
              className={`text-[10px] font-medium transition-colors tracking-[0.2em] uppercase ${isDark ? 'text-white/40 hover:text-white' : 'text-z-mid hover:text-z-blue'}`}
            >
              Datenschutz
            </button>
            {onCodeOfConduct && (
              <>
                <span className={`text-xs ${isDark ? 'text-white/20' : 'text-z-line'}`}>·</span>
                <button
                  onClick={onCodeOfConduct}
                  className={`text-[10px] font-medium transition-colors tracking-[0.2em] uppercase ${isDark ? 'text-white/40 hover:text-white' : 'text-z-mid hover:text-z-blue'}`}
                >
                  Code of Conduct
                </button>
              </>
            )}
            <span className={`text-xs ${isDark ? 'text-white/20' : 'text-z-line'}`}>·</span>
            <Mail className={`w-4 h-4 cursor-pointer transition-colors ${isDark ? 'text-white/40 hover:text-white' : 'text-z-mid hover:text-z-blue'}`} onClick={() => window.location.href = 'mailto:pascal.mengelt@z9n.ai'} />
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

// eine eigene Seite, ohne Eintrag im Menü - wer den Link hat (/orch-platform)
const OrchPlatformPage = ({ onDatenschutz }: { onDatenschutz: () => void }) => (
  <>
    <PreiseHeader label="Architektur" />
    <main>
      <ContentSection id="orch-platform" index="00" label="Orch Platform" content={orchPlatformMd} />
    </main>
    <PageFooter onDatenschutz={onDatenschutz} />
  </>
);

// ssrPath erlaubt dem Prerender-Build, eine Route explizit zu rendern, ohne auf
// window.location angewiesen zu sein (das beim serverseitigen Rendern nicht existiert).
const matchRoute = (routePath: string, ssrPath?: string) => {
  if (ssrPath !== undefined) return ssrPath.replace(/\/+$/, '') === routePath;
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.replace(/\/+$/, '');
  const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
  return path === routePath || hash === routePath.replace(/^\//, '');
};

const isOrchPlatformRoute = (ssrPath?: string) => matchRoute('/orch-platform', ssrPath);
const isPreiseRoute = (ssrPath?: string) => matchRoute('/preise', ssrPath);
const isCodeOfConductRoute = (ssrPath?: string) => matchRoute('/code-of-conduct', ssrPath);

export default function App({ ssrPath }: { ssrPath?: string } = {}) {
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
    } catch {}
    return false;
  });
  const toggleTheme = () => setIsDark(d => {
    const next = !d;
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
    return next;
  });

  const [datenschutzOpen, setDatenschutzOpen] = React.useState(false);
  const [codeOfConductOpen, setCodeOfConductOpen] = React.useState(false);
  const [konditionenOpen, setKonditionenOpen] = React.useState(false);
  const [showPreise, setShowPreise] = React.useState(isPreiseRoute(ssrPath));
  const [showCodeOfConduct, setShowCodeOfConduct] = React.useState(isCodeOfConductRoute(ssrPath));
  const [showOrchPlatform, setShowOrchPlatform] = React.useState(isOrchPlatformRoute(ssrPath));

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setDatenschutzOpen(false); setCodeOfConductOpen(false); setKonditionenOpen(false); }
    };
    window.addEventListener('keydown', handler);
    const onNav = () => {
      setShowPreise(isPreiseRoute());
      setShowCodeOfConduct(isCodeOfConductRoute());
      setShowOrchPlatform(isOrchPlatformRoute());
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
          ? 'bg-z-night text-white selection:bg-z-copper selection:text-white'
          : 'light-mode bg-white text-z-text selection:bg-z-blue selection:text-white'
      }`}>
        {datenschutzOpen && <DatenschutzModal onClose={() => setDatenschutzOpen(false)} />}
        {codeOfConductOpen && <CodeOfConductModal onClose={() => setCodeOfConductOpen(false)} />}
        {konditionenOpen && <KonditionenModal onClose={() => setKonditionenOpen(false)} />}
        {showPreise ? (
          <PreisePage onDatenschutz={() => setDatenschutzOpen(true)} />
        ) : showCodeOfConduct ? (
          <CodeOfConductPage onDatenschutz={() => setDatenschutzOpen(true)} />
        ) : showOrchPlatform ? (
          <OrchPlatformPage onDatenschutz={() => setDatenschutzOpen(true)} />
        ) : (
          <>
            <Header />
            <main>
              <Hero />
              <ContentSection id="konzepte" index="01" label="Konzepte" content={konzepteMd} />
              <ContentSection id="orchescala"  index="02" label="Orchescala"  content={orchescalaMd} />
              <ContentSection id="services"    index="03" label="Services"    content={servicesMd} alternate />
              <ContentSection id="contact"     index="04" label="Firma"     content={firmaMd.replace('/cv_pascal.mengelt.pdf', cvPdf)} />
              <ContentSection id="demo"        index="05" label="Demo"        content={demoMd} alternate />
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
