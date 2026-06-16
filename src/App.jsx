import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── TOKENS v13 — Larentina · Sacred Sanctuary Edition ─────────────────────
const C = {
  bg:        "#FDF0E6",
  warm:      "#FBE5D3",
  cream:     "#F8DCCB",
  pearl:     "#FBE5D3",
  sand:      "#E9C38A",
  sage:      "#E9C38A",
  softGold:  "#F0D5A8",
  deepGold:  "#C9A055",
  soft:      "#D89A93",
  roseHover: "#C88880",
  dark:      "#6F4D42",
  muted:     "#9C7B6E",
  darkbg:    "#3D2820",
};

const serif  = "'Cormorant Garamond', Georgia, serif";
const sans   = "'Manrope', system-ui, sans-serif";

function Reveal({ children, className = "", delay = 0, y = 24, once = true }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function Blob({ className = "", color = C.sand, opacity = 0.28 }) {
  return (
    <svg className={`absolute pointer-events-none select-none ${className}`}
      viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} fillOpacity={opacity}
        d="M430,270 C450,330 400,410 340,430 C280,450 190,430 140,390 C90,350 70,270 90,200 C110,130 180,80 250,70 C320,60 390,90 420,150 C440,190 410,210 430,270Z" />
    </svg>
  );
}

function ImgBox({ label = "Bild", aspect = "aspect-[3/4]", rounded = "rounded-2xl", className = "" }) {
  return (
    <div className={`${aspect} ${rounded} overflow-hidden flex flex-col items-center justify-center gap-3 ${className}`}
      style={{ background: `linear-gradient(145deg, #FBE5D3, #F8DCCB)` }}>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="21" stroke={C.soft} strokeWidth="1.2" />
        <circle cx="16" cy="18" r="3.5" fill={C.soft} opacity="0.6" />
        <path d="M7 32 L15 23 L21 29 L28 19 L37 32" stroke={C.soft} strokeWidth="1.3" strokeLinejoin="round" fill="none" opacity="0.55" />
      </svg>
      <span style={{ color: C.muted, fontFamily: serif, fontSize: "0.82rem", letterSpacing: "0.07em" }}>{label}</span>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span style={{ fontFamily: sans, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.sage, display: "block", marginBottom: "0.75rem" }}>
      {children}
    </span>
  );
}

function H2({ children, light = false, center = false }) {
  return (
    <h2 style={{ fontFamily: serif, color: light ? C.cream : C.dark, fontSize: "clamp(1.95rem,3.8vw,3.1rem)", lineHeight: 1.13, fontWeight: 400, textAlign: center ? "center" : undefined }}>
      {children}
    </h2>
  );
}

function Body({ children, center = false, light = false, className = "" }) {
  return (
    <p style={{ fontFamily: sans, color: light ? C.soft : C.muted, fontSize: "0.9rem", lineHeight: 1.82, textAlign: center ? "center" : undefined }} className={className}>
      {children}
    </p>
  );
}

function GoldHeart() {
  return (
    <span className="gold-heart-beat" style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      lineHeight: 0,
      width: 16,
      height: 14,
      position: "relative",
    }}>
      <img src="/herz.png" alt=""
        style={{
          height: 150,
          width: "auto",
          objectFit: "contain",
          mixBlendMode: "multiply",
          filter: "drop-shadow(0 1px 2px rgba(201,160,85,0.25))",
          userSelect: "none",
          pointerEvents: "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(3)",
        }} />
    </span>
  );
}

function useModal() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);
  const show = (modalContent) => { setContent(modalContent); setOpen(true); };
  const hide = () => setOpen(false);
  return { open, content, show, hide };
}

function LiquidGlassModal({ open, content, onClose }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(253,240,230,0.55)",
            backdropFilter: "blur(20px) saturate(140%)",
            WebkitBackdropFilter: "blur(20px) saturate(140%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "2rem",
          }}>
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: 560, width: "100%",
              maxHeight: "85vh", overflowY: "auto",
              padding: "3rem 2.5rem",
              borderRadius: 32,
              background: "linear-gradient(145deg, rgba(253,240,230,0.92) 0%, rgba(251,229,211,0.88) 50%, rgba(248,220,203,0.85) 100%)",
              backdropFilter: "blur(40px) saturate(150%)",
              WebkitBackdropFilter: "blur(40px) saturate(150%)",
              border: "1px solid rgba(233,195,138,0.45)",
              boxShadow: `
                0 0 0 1px rgba(255,245,230,0.6) inset,
                0 24px 80px rgba(217,154,147,0.25),
                0 4px 24px rgba(201,160,85,0.18)
              `,
            }}>
            <div style={{
              position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
              background: "linear-gradient(to right, transparent, rgba(233,195,138,0.7), transparent)",
              borderRadius: "0 0 50% 50%",
            }} />

            <button onClick={onClose}
              style={{
                position: "absolute", top: 20, right: 20,
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(253,240,230,0.6)",
                border: "1px solid rgba(233,195,138,0.35)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#6F4D42", fontSize: "1.1rem", lineHeight: 1,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(251,229,211,0.9)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(253,240,230,0.6)"}>
              ×
            </button>

            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Btn({ children, dark = false, outline = false, href = "#", small = false, onClick }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: 100,
    padding: small ? "0.55rem 1.4rem" : "0.95rem 2.0rem",
    fontSize: small ? "0.72rem" : "0.82rem",
    letterSpacing: "0.08em",
    cursor: "pointer",
    fontFamily: sans,
    fontWeight: 500,
    textDecoration: "none",
    whiteSpace: "nowrap",
    border: "none",
    outline: "none",
    transition: "all 0.3s ease",
  };

  const primary = {
    ...base,
    background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
    color: "#FDF6F2",
    boxShadow: `
      0 0 0 1px rgba(233,195,138,0.75),
      0 0 0 2.5px rgba(201,160,85,0.15),
      0 6px 22px rgba(217,154,147,0.30),
      inset 0 1px 0 rgba(255,220,200,0.30),
      inset 0 -1px 0 rgba(160,100,90,0.18)
    `,
  };

  const outlineStyle = {
    ...base,
    background: "rgba(253,240,230,0.78)",
    backdropFilter: "blur(12px)",
    color: "#6F4D42",
    boxShadow: `
      0 0 0 1px rgba(233,195,138,0.55),
      0 4px 18px rgba(217,154,147,0.10),
      inset 0 1px 0 rgba(255,245,230,0.55)
    `,
  };

  const style = outline ? outlineStyle : primary;

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    } else {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("openModal", { detail: { type: "kontakt" } }));
    }
  };

  return (
    <motion.a href={href} style={style}
      className="btn-shimmer"
      onClick={handleClick}
      whileHover={outline ? {
        background: "rgba(251,229,211,0.92)",
        y: -2,
        boxShadow: `
          0 0 0 1px rgba(233,195,138,0.85),
          0 0 0 3px rgba(201,160,85,0.12),
          0 10px 26px rgba(217,154,147,0.20),
          inset 0 1px 0 rgba(255,245,230,0.7)
        `,
      } : {
        background: "linear-gradient(150deg, #E0A8A0 0%, #D08880 50%, #C07870 100%)",
        y: -2,
        boxShadow: `
          0 0 0 1px rgba(233,195,138,1),
          0 0 0 3px rgba(201,160,85,0.25),
          0 12px 32px rgba(217,154,147,0.40),
          inset 0 1px 0 rgba(255,220,200,0.45),
          inset 0 -1px 0 rgba(160,100,90,0.22),
          0 0 20px rgba(233,195,138,0.18)
        `,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25 }}>
      {!outline && <GoldHeart />}
      {children}
      <span style={{
        fontSize: "0.68rem",
        opacity: 0.75,
        color: outline ? "#9C7B6E" : "rgba(255,235,210,0.85)",
      }}>→</span>
    </motion.a>
  );
}

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Manrope:wght@300;400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{background:#FDF0E6;color:#6F4D42}
    ::selection{background:#D89A9333;color:#6F4D42}
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-track{background:#FDF0E6}
    ::-webkit-scrollbar-thumb{background:#E9C38A66;border-radius:3px}
    a{text-decoration:none;color:inherit}
    button{appearance:none;-webkit-appearance:none}

    .btn-shimmer { position: relative; }
    .btn-shimmer > * { position: relative; z-index: 2; }
    .btn-shimmer::before {
      content: '';
      position: absolute;
      inset: -1.5px;
      border-radius: inherit;
      pointer-events: none;
      z-index: 3;
      background: linear-gradient(
        115deg,
        transparent 0%,
        transparent 38%,
        rgba(255,230,170,0) 44%,
        rgba(255,235,180,0.55) 48%,
        rgba(255,245,200,0.95) 50%,
        rgba(255,235,180,0.55) 52%,
        rgba(255,230,170,0) 56%,
        transparent 62%,
        transparent 100%
      );
      background-size: 220% 220%;
      background-position: 200% 50%;
      -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
              mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
              mask-composite: exclude;
      padding: 1.5px;
      animation: borderLightCatch 6s ease-in-out infinite;
      opacity: 0;
    }
    @keyframes borderLightCatch {
      0%,    60% { background-position: 200% 50%; opacity: 0; }
      70%        { opacity: 0.85; }
      85%        { opacity: 0.85; }
      100%       { background-position: -100% 50%; opacity: 0; }
    }

    @keyframes luxFloat {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-4px); }
    }
    @keyframes goldShimmer {
      0%   { opacity: 0; transform: translateX(-120%) skewX(-18deg); }
      8%   { opacity: 0.55; }
      20%  { opacity: 0; transform: translateX(220%) skewX(-18deg); }
      100% { opacity: 0; transform: translateX(220%) skewX(-18deg); }
    }
    @keyframes champagneShimmer {
      0%   { background-position: -400% center; }
      100% { background-position: 400% center; }
    }
    @keyframes goldGlowBreath {
      0%,100% { box-shadow:
        0 0 0 1.5px rgba(216,176,122,0.0),
        0 4px 20px rgba(183,134,77,0.14),
        inset 0 1px 0 rgba(248,231,210,0.20); }
      50% { box-shadow:
        0 0 0 1.5px rgba(216,176,122,0.0),
        0 6px 28px rgba(183,134,77,0.22),
        inset 0 1px 0 rgba(248,231,210,0.28); }
    }
    .gold-ring {
      position: relative;
      display: inline-flex;
      border-radius: 100px;
      padding: 1.5px;
      background: linear-gradient(
        160deg,
        #F8E7D2 0%,
        #EFD7BE 15%,
        #D8B07A 35%,
        #B7864D 52%,
        #D8B07A 68%,
        #EFD7BE 82%,
        #F8E7D2 100%
      );
      background-size: 300% 100%;
      animation: champagneShimmer 14s ease-in-out infinite;
      filter: drop-shadow(0 2px 8px rgba(183,134,77,0.18));
    }
    .gold-ring-inner {
      border-radius: 98px;
      display: inline-flex;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .gold-ring-inner::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 40%;
      border-radius: 98px 98px 0 0;
      background: linear-gradient(
        to bottom,
        rgba(248,231,210,0.18) 0%,
        transparent 100%
      );
      pointer-events: none;
    }
    @keyframes heartGlowPulse {
      0%,100% { opacity: 0; transform: scale(0.92); }
      50%      { opacity: 0.32; transform: scale(1.06); }
    }
    @keyframes haloBreathe {
      0%,100% { opacity: 0.08; transform: scale(1); }
      50%      { opacity: 0.16; transform: scale(1.07); }
    }
    @keyframes shapeDrift {
      0%,100% { transform: translate(0,0) rotate(0deg); }
      33%      { transform: translate(6px,-8px) rotate(1.5deg); }
      66%      { transform: translate(-4px,5px) rotate(-1deg); }
    }
    @keyframes shapeFloat {
      0%,100% { transform: translate(0,0) rotate(0deg); }
      50%      { transform: translate(-5px,-6px) rotate(-2deg); }
    }
    .logo-float   { animation: luxFloat     14s ease-in-out infinite; }
    .heart-pulse  { animation: heartGlowPulse 10s ease-in-out infinite; }
    .gold-shimmer { animation: goldShimmer   16s ease-in-out infinite; }
    .halo-breathe { animation: haloBreathe   13s ease-in-out infinite; }
    .shape-drift  { animation: shapeDrift    22s ease-in-out infinite; }
    .shape-float  { animation: shapeFloat    18s ease-in-out infinite; }
    .logo-screen  { mix-blend-mode: multiply; }

    @keyframes realGoldShimmer {
      0%   { opacity: 0; transform: translateX(-150%) skewX(-20deg); }
      6%   { opacity: 1; }
      18%  { opacity: 0; transform: translateX(250%) skewX(-20deg); }
      100% { opacity: 0; transform: translateX(250%) skewX(-20deg); }
    }
    @keyframes goldHeartBeat {
      0%,100% { filter: drop-shadow(0 0 0px rgba(200,148,60,0)); }
      50%      { filter: drop-shadow(0 0 8px rgba(200,148,60,0.55)) drop-shadow(0 0 16px rgba(180,120,40,0.25)); }
    }
    .real-gold-shimmer { animation: realGoldShimmer 18s ease-in-out infinite; }
    .gold-heart-beat   { animation: goldHeartBeat 4s ease-in-out infinite; }

    /* ═══ MOBILE HERO — Premium Layout ═══ */
    .hero-section-mobile {
      min-height: auto !important;
      padding-top: 110px !important;
      padding-bottom: 3rem !important;
    }
    .hero-section-mobile > div:last-child {
      padding: 0 !important;
    }
    .hero-text-col {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      margin-left: 0;
      gap: 1.6rem !important;
      position: relative;
      z-index: 10;
      max-width: 100% !important;
    }
    .hero-text-col > *:nth-child(1) { order: 1; }
    .hero-text-col > *:nth-child(2) { order: 2; }
    .hero-text-col > *:nth-child(3) { order: 3; }
    .hero-text-col > *:nth-child(5) { order: 4; margin-top: 0.3rem; }
    .hero-text-col > *:nth-child(4) { order: 5; }
    .hero-text-col > *:nth-child(6) { order: 6; margin-top: 1rem; }

    .hero-text-col h1 {
      font-size: 2.4rem !important;
      line-height: 1.12 !important;
      letter-spacing: -0.01em !important;
    }
    .hero-text-col p {
      font-size: 0.92rem !important;
      line-height: 1.75 !important;
      max-width: 100% !important;
      color: #6F4D42 !important;
      opacity: 0.85;
    }
    .hero-trust {
      gap: 0 !important;
      justify-content: center !important;
    }
    .hero-trust > a {
      min-width: 80px !important;
      flex: 1 1 auto !important;
    }
    .hero-trust img {
      width: 64px !important;
      height: 64px !important;
    }
    .hero-trust span {
      font-size: 0.66rem !important;
      letter-spacing: 0.04em !important;
    }
    .hero-trust .hero-trust-divider {
      height: 38px !important;
      margin: 0 0.3rem !important;
    }
    .btn-shimmer {
      padding: 0.95rem 1.6rem !important;
      font-size: 0.78rem !important;
    }

    /* ═══ Video Switcher Mobile/Desktop ═══ */
    .hero-video-mobile { display: block; }
    .hero-video-desktop { display: none; }
    section video {
      object-fit: cover !important;
      object-position: center !important;
    }

    @media (min-width: 1024px) {
      .hero-section-mobile {
        min-height: 100vh !important;
        padding-top: 76px !important;
        padding-bottom: 0 !important;
      }
      .hero-text-col {
        padding-left: 0;
        padding-right: 0;
        margin-left: -2rem;
        gap: 2rem !important;
        max-width: 580px !important;
      }
      .hero-text-col > * { order: initial !important; margin-top: 0 !important; }
      .hero-text-col h1 {
        font-size: clamp(2.8rem, 5.2vw, 4.6rem) !important;
        line-height: 1.08 !important;
      }
      .hero-text-col p {
        font-size: 0.92rem !important;
        line-height: 1.90 !important;
        max-width: 430px !important;
        opacity: 1;
      }
      .hero-trust img {
        width: 150px !important;
        height: 150px !important;
      }
      .hero-trust span {
        font-size: 0.73rem !important;
      }
      .hero-trust .hero-trust-divider {
        height: 60px !important;
        margin: 0 0.6rem !important;
      }
      .btn-shimmer {
        padding: 0.95rem 2.0rem !important;
        font-size: 0.82rem !important;
      }
      .hero-video-mobile { display: none !important; }
      .hero-video-desktop { display: block !important; }
    }
  `}</style>
);

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = ["Home","Begleitung","Über mich","Seelenbilder","Erfahrungen","Kontakt"];

  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(251,247,242,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(22px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(216,176,107,0.16)` : "none",
        transition: "all 0.4s ease",
      }}>
      <div style={{ maxWidth: "100%", margin: "0 auto", padding: "0 3rem", height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src="/larentinaneu1.png" alt="Larentina Seelenfluss" style={{ height: 155, width: "auto", objectFit: "contain", mixBlendMode: "multiply", marginTop: "-22px" }} />
          <span style={{ fontFamily: sans, fontSize: "0.63rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted }} className="hidden sm:block"></span>
        </a>
        <nav className="hidden lg:flex" style={{ gap: "2.2rem", alignItems: "center" }}>
          {nav.map(l => (
            <a key={l} href="#" style={{ fontFamily: sans, fontSize: "0.95rem", fontWeight: 600, color: C.muted, letterSpacing: "0.05em", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.dark} onMouseLeave={e => e.target.style.color = C.muted}>{l}</a>
          ))}
        </nav>
        <div className="hidden lg:block" style={{ marginLeft: "3rem" }}>
          <Btn dark>Jetzt Buchen</Btn>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {[1,0.7,0.4].map((op, i) => (
              <span key={i} style={{ display: "block", height: 1.5, width: 24 * op, background: C.dark, borderRadius: 2, transition: "all 0.3s" }} />
            ))}
          </div>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ background: "rgba(251,247,242,0.97)", backdropFilter: "blur(20px)", borderBottom: `1px solid rgba(214,176,106,0.15)`, overflow: "hidden" }}>
            <div style={{ padding: "1.5rem 2rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {nav.map(l => <a key={l} href="#" style={{ fontFamily: sans, color: C.dark, fontSize: "0.95rem" }} onClick={() => setOpen(false)}>{l}</a>)}
              <Btn dark small>Jetzt Buchen</Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="hero-section-mobile" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 76 }}>
      <video autoPlay muted loop playsInline
        className="hero-video-desktop"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
        <source src="/animation.mp4" type="video/mp4" />
      </video>
      <video autoPlay muted loop playsInline
        className="hero-video-mobile"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
        <source src="/mobile.mp4" type="video/mp4" />
      </video>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 70% 55% at 8% 12%, rgba(59, 10, 3, 0.22) 0%, transparent 68%),
          radial-gradient(ellipse 50% 45% at 92% 88%, rgba(216,176,107,0.12) 0%, transparent 65%),
          radial-gradient(ellipse 35% 30% at 18% 78%, rgba(235,200,195,0.12) 0%, transparent 60%)
        ` }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "6rem 2rem 5rem", width: "100%",
        display: "flex", alignItems: "center",
        position: "relative", zIndex: 5 }}>

        <div className="hero-text-col" style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: 580 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.55rem",
              padding: "0.5rem 1.2rem", borderRadius: 100,
              background: "rgba(235,200,195,0.20)",
              border: "1px solid rgba(216,176,107,0.28)",
              fontFamily: sans, fontSize: "0.70rem", color: C.muted,
              letterSpacing: "0.10em", textTransform: "uppercase",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#D8B06B", flexShrink: 0 }} />
              Ganzheitliche Begleitung · Körper · Geist · Seele
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12 }}
            style={{ fontFamily: serif, color: C.dark,
              fontSize: "clamp(2.8rem,5.2vw,4.6rem)", lineHeight: 1.08,
              fontWeight: 400, letterSpacing: "-0.01em" }}>
            Finde zurück<br />
            <span style={{ fontWeight: 300 }}>zu dir selbst.</span><br />
            <em style={{ color: "#B78C54", fontWeight: 300, fontStyle: "italic" }}>Zu deiner Kraft.</em>
          </motion.h1>

          <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", transformOrigin: "left" }}>
            <div style={{ height: 1, width: 40, background: "linear-gradient(to right, transparent, #D8B06B)" }} />
            <span style={{ color: "#D8B06B", fontSize: "0.55rem", letterSpacing: "0.2em" }}>✦</span>
            <div style={{ height: 1, width: 40, background: "linear-gradient(to left, transparent, #D8B06B)" }} />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22 }}
            style={{ fontFamily: sans, color: C.muted, lineHeight: 1.90,
              fontSize: "0.92rem", maxWidth: 430, letterSpacing: "0.01em" }}>
            Professionelle, ganzheitliche Begleitung für Frauen, die sich erschöpft,
            überfordert oder innerlich verloren fühlen — mit einem fundierten
            Gesundheits-Hintergrund und viel Herz.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <Btn dark>Jetzt Buchen</Btn>
            <Btn outline>Mehr erfahren</Btn>
          </motion.div>

          <motion.div className="hero-trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.48 }}
            style={{ display: "flex", gap: "0", flexWrap: "wrap", paddingTop: "0.5rem", alignItems: "flex-start" }}>

            <a href="#about" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", flex: 1, minWidth: 90, cursor: "pointer", textDecoration: "none" }}>
              <div className="btn-shimmer" style={{
                width: 130, height: 130, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                filter: "drop-shadow(0 4px 12px rgba(201,160,85,0.18))",
              }}>
                <img src="/button2.png" alt="Gesundheits-Background"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    userSelect: "none", pointerEvents: "none",
                  }} />
              </div>
              <span style={{ fontFamily: sans, color: C.muted, fontSize: "0.73rem", letterSpacing: "0.03em", textAlign: "center", lineHeight: 1.3 }}>
                Gesundheits-<br/>Background
              </span>
            </a>

            <div className="hero-trust-divider" style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, rgba(201,160,85,0.40), transparent)", alignSelf: "center", flexShrink: 0, margin: "0 0.6rem" }} />

            <a href="#services" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", flex: 1, minWidth: 90, cursor: "pointer", textDecoration: "none" }}>
              <div className="btn-shimmer" style={{
                width: 130, height: 130, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                filter: "drop-shadow(0 4px 12px rgba(201,160,85,0.18))",
              }}>
                <img src="/button1.png" alt="Ganzheitlicher Ansatz"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    userSelect: "none", pointerEvents: "none",
                  }} />
              </div>
              <span style={{ fontFamily: sans, color: C.muted, fontSize: "0.73rem", letterSpacing: "0.03em", textAlign: "center", lineHeight: 1.3 }}>
                Ganzheitlicher<br/>Ansatz
              </span>
            </a>

            <div className="hero-trust-divider" style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, rgba(201,160,85,0.40), transparent)", alignSelf: "center", flexShrink: 0, margin: "0 0.6rem" }} />

            <a href="#services" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", flex: 1, minWidth: 90, cursor: "pointer", textDecoration: "none" }}>
              <div className="btn-shimmer" style={{
                width: 130, height: 130, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                filter: "drop-shadow(0 4px 12px rgba(201,160,85,0.18))",
              }}>
                <img src="/button3.png" alt="Individuelle Begleitung"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    userSelect: "none", pointerEvents: "none",
                  }} />
              </div>
              <span style={{ fontFamily: sans, color: C.muted, fontSize: "0.73rem", letterSpacing: "0.03em", textAlign: "center", lineHeight: 1.3 }}>
                Individuelle<br/>Begleitung
              </span>
            </a>

          </motion.div>
        </div>

      </div>
    </section>
  );
}

function ProblemSection() {
  const items = [
    { icon: "◌", title: "Innere Unruhe", text: "Der Kopf hört nicht auf. Selbst in stillen Momenten ist keine echte Ruhe zu finden." },
    { icon: "◌", title: "Emotionale Erschöpfung", text: "Du gibst ständig — für andere, für den Job, für alles. Für dich selbst bleibt nichts übrig." },
    { icon: "◌", title: "Orientierungslosigkeit", text: "Was willst du wirklich? Wer bist du jenseits von Rollen und Erwartungen? Die Antworten fühlen sich fern an." },
    { icon: "◌", title: "Fehlende Balance", text: "Körper, Geist und Seele ziehen in verschiedene Richtungen. Das kostet enorm viel Kraft." },
    { icon: "◌", title: "Lebensübergänge", text: "Veränderungen, Verluste, neue Kapitel — du stehst zwischen zwei Welten und suchst Halt." },
    { icon: "◌", title: "Nicht bei dir selbst", text: "Du funktionierst, aber lebst du wirklich? Das Gespür für das eigene Innere ist verblasst." },
  ];
  return (
    <section style={{ background: "#FDF0E6", padding: "6rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Tag>Erkennst du dich?</Tag>
            <H2 center>Vielleicht kennst du das …</H2>
            <div style={{ marginTop: "1rem" }}>
              <Body center>Du bist nicht allein. Was du fühlst, hat einen Namen — und einen Weg heraus.</Body>
            </div>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.2rem" }}>
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <motion.div whileHover={{ y: -3, boxShadow: "0 16px 36px rgba(217,154,147,0.15)" }}
                style={{ padding: "1.8rem 2rem", borderRadius: 20, background: "#FBE5D3", border: `1px solid rgba(233,195,138,0.22)`, height: "100%", transition: "box-shadow 0.3s", boxShadow: "0 4px 24px rgba(217,154,147,0.08)", borderRadius: 28 }}>
                <span style={{ color: C.sage, fontSize: "1.3rem", display: "block", marginBottom: "0.75rem" }}>{item.icon}</span>
                <h3 style={{ fontFamily: serif, color: C.dark, fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.5rem" }}>{item.title}</h3>
                <Body>{item.text}</Body>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const cards = [
    { tag: "Golden Harmony Beauty", title: "Kosmetische behandlung", desc: "Nachhaltige, individuelle Begleitung für Frauen, die sich nach innerer Balance, emotionaler Klarheit und echter Veränderung sehnen — mit Herzwärme und professioneller Fachkompetenz.", outcomes: ["Innere Balance & Ruhe", "Emotionale Klarheit", "Neue Energie & Leichtigkeit", "Zurück zu sich selbst"], cta: "Mehr erfahren", highlight: false, modalType: "kernbegleitung" },
    { tag: "Golden Aura Experience", title: "Fernbehandlung", desc: "Eine achtsame Begleitung über den Körper — mit hochwertigen Aromaölen, sanfter Berührung und tiefer Entspannung für Nervensystem, Körper und Seele.", outcomes: ["Tiefe Entspannung", "Nervensystem beruhigen", "Loslassen & Ankommen", "Körperliche Wärme"], cta: "Mehr erfahren", highlight: false, modalType: "aromaoel" },
    { tag: "Soul Journey ", title: "Seelenreise", desc: "Eine intuitive Seelenreise, die dich wieder mit deiner inneren Weisheit verbindet und dich zurück in Balance, Klarheit und Verbundenheit begleitet.", outcomes: ["Innere Klarheit & Orientierung", "Emotionale Balance", "Lösung energetischer Blockaden", "Mehr innere Ruhe & Verbundenheit"], cta: "Mehr erfahren", highlight: true, modalType: "soul_journey" },
    { tag: "Vital Balance & Soul Harmony", title: "Gesundheitsberatung & Vitalmessung", desc: "Ganzheitliche Gesundheitsberatung für mehr Balance, Energie und Wohlbefinden — mit individueller Begleitung und unterstützender Vitalmessung.", outcomes: ["Mehr Energie & Vitalität", "Innere Balance & Wohlbefinden", "Persönliche Klarheit", "Neue Impulse für Körper & Seele"], cta: "Mehr erfahren", highlight: false, modalType: "vital_balance" },
    { tag: "Golden Space Harmony", title: "Raum-Harmonisierung", desc: "Energetische Reinigung und Harmonisierung für Haus, Wohnung oder Praxisräume — für mehr Klarheit, Leichtigkeit und positive Energie.", outcomes: ["Energetische Raumreinigung", "Mehr Harmonie & Wohlbefinden", "Positive Energie & Leichtigkeit", "Ruhe & neue Klarheit"], cta: "Mehr erfahren", highlight: false, modalType: "golden_space" },
    { tag: "Exklusiv · Einzigartig", title: "Seelenbilder", desc: "Intuitive Kunstwerke mit emotionaler Tiefe — geschaffen aus dem Inneren heraus. Kein Foto, kein Portrait — ein Bild deiner Seele.", outcomes: ["Individuell & einzigartig", "Emotional & tiefgründig", "Premium Kunstwerk", "Für immer"], cta: "Galerie entdecken", highlight: false, special: true },
  ];
  return (
    <section id="services" style={{ background: "#FBE5D3", padding: "6rem 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Tag>Angebote</Tag>
            <H2 center>Wie ich dich begleite</H2>
            <div style={{ maxWidth: 520, margin: "1rem auto 0" }}>
              <Body center>Kein Standardprogramm. Jede Begleitung entsteht aus dir heraus — abgestimmt auf das, was du gerade brauchst.</Body>
            </div>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.4rem" }}>
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -7 }} transition={{ duration: 0.3 }}
                className={card.highlight ? "btn-shimmer rose-glow" : ""}
                style={{ padding: card.special ? "0" : "2.2rem", borderRadius: 24, height: "100%", display: "flex", flexDirection: "column", gap: "1.25rem", overflow: "hidden", background: card.highlight ? "#3D2820" : card.special ? "#F8DCCB" : "#FBE5D3", border: `1px solid ${card.highlight ? "#3D2820" : "rgba(233,195,138,0.22)"}`, boxShadow: card.highlight ? "0 28px 60px rgba(61,40,32,0.18), 0 0 40px rgba(216,154,147,0.25)" : "0 4px 24px rgba(217,154,147,0.10)", position: "relative" }}>
                {card.special && (
                  <>
                    <div className="aspect-[4/3] w-full" style={{ background: "#3D2820", overflow: "hidden" }}>
                      <img src="/blumen.png" alt="Seelenbild Vorschau" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                    </div>
                    <div style={{ padding: "1.6rem 2rem 2rem" }}>
                      <Tag>{card.tag}</Tag>
                      <h3 style={{ fontFamily: serif, color: C.dark, fontSize: "1.45rem", fontWeight: 600, marginBottom: "0.6rem" }}>{card.title}</h3>
                      <Body className="mb-4">{card.desc}</Body>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", alignItems: "center" }}>
                        <Btn dark small>Galerie entdecken</Btn>
                        <Btn outline small onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("openModal", { detail: { type: "individuelles_seelenbild" } })); }}>Anfrage individuelles Seelenbild</Btn>
                      </div>
                    </div>
                  </>
                )}
                {!card.special && (
                  <>
                    {card.highlight && (
                      <span style={{ position: "absolute", top: 16, right: 16, padding: "0.25rem 0.75rem", borderRadius: 100, background: C.sage, fontFamily: sans, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>Beliebt</span>
                    )}
                    <div>
                      {card.modalType === "soul_journey" ? (
                        <img src="/souljourney.png" alt="Soul Journey" style={{ width: 90, height: "auto", display: "block", marginBottom: "0.4rem" }} />
                      ) : (
                        <Tag style={{ color: card.highlight ? C.sand : undefined }}>{card.tag}</Tag>
                      )}
                      <h3 style={{ fontFamily: serif, color: card.highlight ? C.cream : C.dark, fontSize: "1.45rem", fontWeight: 600 }}>{card.title}</h3>
                    </div>
                    <p style={{ fontFamily: sans, color: card.highlight ? C.soft : C.muted, fontSize: "0.875rem", lineHeight: 1.8 }}>{card.desc}</p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.55rem", flex: 1 }}>
                      {card.outcomes.map(o => (
                        <li key={o} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <span style={{ color: C.sage, fontSize: "0.55rem", flexShrink: 0 }}>✦</span>
                          <span style={{ fontFamily: sans, color: card.highlight ? C.sand : C.muted, fontSize: "0.82rem" }}>{o}</span>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
                      <motion.a href="#" whileHover={{ opacity: 0.85 }}
                        onClick={(e) => { if (card.modalType) { e.preventDefault(); window.dispatchEvent(new CustomEvent("openModal", { detail: { type: card.modalType } })); } }}
                        style={{ display: "inline-block", padding: "0.75rem 1.8rem", borderRadius: 100, fontFamily: sans, fontSize: "0.8rem", background: card.highlight ? C.cream : C.dark, color: card.highlight ? C.dark : C.bg, letterSpacing: "0.04em", transition: "all 0.25s" }}>
                        {card.cta}
                      </motion.a>
                      {card.modalType && (
                        <motion.a href="#booking" whileHover={{ y: -2 }} className="btn-shimmer"
                          style={{ display: "inline-block", padding: "0.75rem 1.8rem", borderRadius: 100, fontFamily: sans, fontSize: "0.8rem", background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)", color: "#FDF6F2", letterSpacing: "0.04em", boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 6px 22px rgba(217,154,147,0.30)", transition: "all 0.25s" }}>
                          Jetzt buchen
                        </motion.a>
                      )}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
 const pillars = [
    { title: "Körper", img: "/koerper.png", text: "Körperliche Signale lesen, Atem als Anker, Entspannung und Regulation des Nervensystems." },
    { title: "Geist", img: "/geist1.png", text: "Gedankenmuster erkennen, Klarheit entwickeln, Glaubenssätze achtsam hinterfragen." },
    { title: "Seele", img: "/seele1.png", text: "Verbindung zum eigenen Kern finden — wer du bist jenseits von Rollen, Pflichten und Erwartungen." },
  ];
  return (
    <section style={{ background: "#FDF0E6", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      <Blob className="w-[480px] h-[480px] -right-24 top-1/2 -translate-y-1/2" color={C.sand} opacity={0.18} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Tag>Der Weg</Tag>
            <H2 center>Ein ganzheitlicher Weg zurück zu dir</H2>
            <div style={{ maxWidth: 500, margin: "1rem auto 0" }}>
              <Body center>Ich arbeite nicht mit einer einzelnen Methode. Die Begleitung entfaltet sich aus dem, was du brauchst — ganzheitlich, individuell, tiefgreifend.</Body>
            </div>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.4rem" }}>
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <motion.div whileHover={{ y: -3, boxShadow: "0 16px 36px rgba(217,154,147,0.18)" }}
                style={{ padding: "2.5rem 2.2rem", borderRadius: 24, background: "#FBE5D3", border: `1px solid rgba(233,195,138,0.22)`, height: "100%", boxShadow: "0 4px 24px rgba(217,154,147,0.10)" }}>
                <div style={{ width: 72, height: 72, marginBottom: "1.25rem" }}>
                  <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <h3 style={{ fontFamily: serif, color: C.dark, fontSize: "1.55rem", fontWeight: 600, marginBottom: "0.6rem" }}>{p.title}</h3>
                <Body>{p.text}</Body>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeelenbilderSection() {
  const [showAll, setShowAll] = useState(false);
  const artworks = [
    { label: "Blumenenergie", size: "aspect-[3/4]", img: "/blumen.png", modal: "blumenenergie" },
    { label: "Die Energie", size: "aspect-[4/3]", img: "/energie.png", modal: "die_energie" },
    { label: "Die vier Jahreszeiten", size: "aspect-[3/4]", img: "/jahreszeiten.png", modal: "die_vier_jahreszeiten" },
    { label: "Engel", size: "aspect-[3/4]", img: "/engel.png", modal: "engel" },
    { label: "Feng Shui · Partnerschaft & Liebe", size: "aspect-[1/1]", img: "/feng_shui.png", modal: "feng_shui" },
    { label: "Frau mit blondem Haar", size: "aspect-[1/1]", img: "frau_blond.png", modal: "frau_blond" },
    { label: "Herkunft, Gemeinschaft & Vitalität", size: "aspect-[1/1]", img: "/herkunft.png", modal: "herkunft" },
    { label: "Kinder & Kreativität", size: "aspect-[4/3]", img: "/kinder.png", modal: "kinder" },
    { label: "Spanische Tänzerin", size: "aspect-[3/4]", img: "/spanische_taenzerin.png", modal: "spanische_taenzerin" },
  ];
  return (
    <section style={{ background: "linear-gradient(160deg, #3D2820 0%, #4A3528 55%, #3D2820 100%)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.12, background: `radial-gradient(circle at 22% 38%, #D8B06B, transparent 52%), radial-gradient(circle at 80% 68%, #EBC8C3, transparent 48%)` }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "1.5rem", marginBottom: "3rem" }}>
            <div>
              <Tag style={{ color: C.sage }}>Exklusive Kunstwerke</Tag>
              <h2 style={{ fontFamily: serif, color: C.cream, fontSize: "clamp(2rem,3.8vw,3.1rem)", lineHeight: 1.13, fontWeight: 400 }}>Seelenbilder mit Tiefe</h2>
            </div>
            <div style={{ maxWidth: 380 }}>
              <p style={{ fontFamily: sans, color: C.soft, fontSize: "0.875rem", lineHeight: 1.8 }}>Jedes Seelenbild entsteht intuitiv und einzigartig — ein emotionales Kunstwerk, das die unsichtbare Essenz einer Person sichtbar macht.</p>
            </div>
          </div>
        </Reveal>
        <div style={{ columns: "3 280px", gap: "1rem", marginBottom: "2.5rem" }}>
          {(showAll ? artworks : artworks.slice(0, 3)).map((a, i) => (
            <Reveal key={a.label} delay={i * 0.08}>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}
                onClick={() => window.dispatchEvent(new CustomEvent("openModal", { detail: { type: a.modal } }))}
                style={{ marginBottom: "1rem", borderRadius: 16, overflow: "hidden", breakInside: "avoid", cursor: "pointer" }}>
                <div className={a.size} style={{ background: "#3D2820", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img src={a.img} alt={a.label}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ textAlign: "center" }}>
            {!showAll && (
              <motion.a href="#" whileHover={{ scale: 1.03 }}
                onClick={(e) => { e.preventDefault(); setShowAll(true); }}
                style={{ display: "inline-block", padding: "0.9rem 2.4rem", borderRadius: 100, background: "#D8B06B", color: "#FFFFFF", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.04em", boxShadow: "0 10px 32px rgba(216,176,107,0.22)", cursor: "pointer" }}>
                Mehr Seelenbilder ansehen
              </motion.a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutSection() {
  const [certsOpen, setCertsOpen] = useState(false);
  const certs = [
    "Diplomierte Gesundheits- und Krankenschwester mit Reifeprüfung und Diplom",
    "Lehrgang Zertifizierung Pflegegeldeinstufung „ÖBAK“",
    "Zertifizierter ganzheitlicher Gesundheitsberater/in · Dr. Rüdiger Dahlke",
    "Intensivkurs Herz-Lungen-Wiederbelebung mit Frühdefibrillation",
    "VAC-Therapie Seminar",
    "Herzinsuffizienz Seminar (AKH)",
    "Traditionelle Chinesische Medizin (TCM) in der Pflege",
    "Wundmanagement multidisziplinär in der Pflege",
    "Diabetes Seminar",
    "Bodyfit & Vital Wickeltechnikerin",
    "Diplomierte Aromatherapeutin",
    "Diplom Feng-Shui Beraterin",
    "Diplom Raucherentwöhnungsberaterin",
    "Schmerzmanagement I & II Modul",
    "Die magische Welt der Kolloide – Seminar",
    "Mensch ärgere dich nicht – Seminar",
    "Energetische Aromamassage",
    "Aura & Chakren & Meridianen Ausgleich Seminar",
    "Neue Therapien mit ätherischen Ölen und Edelsteinen nach Dietmar Krämer",
    "Ohr-Akupunktur-Massage (Shiatzu)",
    "Medium Seminar (Irema)",
    "Rainbow Reiki & Traditional Usui Reiki",
    "Healy Anwendung Beraterin",
    "SmoveyMED-Praktikantin",
    "Kabbala Beraterin",
    "Anatis Produkte Beraterin",
    "Integrative energetische Aromakörperarbeit · Martin Henglein",
    "Lenormandkarten magisch deuten mit Hellsicht · Patrizia Seba",
    "Schamanen Ausbildung i. A.",
    "Klangschalen · Klangmassage Ausbildung",
    "Hanföle Beraterin",
    "Bachblüten Beraterin",
  ];
  return (
    <section id="about" style={{ background: "#FBE5D3", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      <Blob className="w-[420px] h-[420px] -bottom-16 -left-16" color={C.soft} opacity={0.35} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start", position: "relative", zIndex: 1 }}
        className="!grid-cols-1 lg:!grid-cols-2">
        <Reveal>
          <div style={{ position: "relative" }}>
            <div className="w-full max-w-sm shadow-xl" style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "3/4" }}>
              <img src="/selfie.png" alt="Portrait" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:block"
              style={{ position: "absolute", top: 32, right: -20, padding: "1rem 1.25rem", borderRadius: 16, background: "#FBE5D3", border: `1px solid rgba(233,195,138,0.30)`, maxWidth: 190, boxShadow: "0 12px 32px rgba(110,90,78,0.07)" }}>
              <p style={{ fontFamily: serif, color: C.dark, fontSize: "0.92rem", fontStyle: "italic", lineHeight: 1.5 }}>"Mit Fachkompetenz und offenem Herzen."</p>
            </motion.div>
          </div>
        </Reveal>
        <div style={{ paddingTop: "1rem" }}>
          <Reveal><Tag>Über mich</Tag></Reveal>
          <Reveal delay={0.08}><H2>Mein Name ist Renata</H2></Reveal>
          <Reveal delay={0.12}>
            <p style={{ fontFamily: serif, color: "#C88880", fontSize: "3rem", lineHeight: 1.4, fontStyle: "italic", marginTop: "1rem", fontWeight: 500 }}>
              Ganzheitliche Gesundheitsberaterin aus Berufung.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div style={{ marginTop: "1.8rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Body>Diplomierte Gesundheits- &amp; Krankenschwester, zertifizierte Beraterin nach Dr. Rüdiger Dahlke und leidenschaftliche Therapeutin. In meiner Larentina-Praxis verbinde ich klinisches Fachwissen mit spiritueller Tiefe.</Body>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ marginTop: "2rem", padding: "1.75rem 1.85rem", borderRadius: 20, background: "#FDF0E6", border: `1px solid rgba(233,195,138,0.30)`, boxShadow: "0 4px 28px rgba(217,154,147,0.10)" }}>
              <p style={{ fontFamily: serif, color: C.dark, fontSize: "1.05rem", marginBottom: "1rem", fontWeight: 500 }}>Ausbildungen &amp; Zertifikate</p>
              <AnimatePresence initial={false}>
                {certsOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ display: "flex", flexDirection: "column", gap: "0.6rem", overflow: "hidden", marginBottom: "1.2rem" }}>
                    {certs.map(c => (
                      <li key={c} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                        <span style={{ color: C.sage, fontSize: "0.55rem", flexShrink: 0, marginTop: "0.4rem" }}>✦</span>
                        <span style={{ fontFamily: sans, color: C.muted, fontSize: "0.82rem", lineHeight: 1.6 }}>{c}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
              <motion.button
                onClick={() => setCertsOpen(!certsOpen)}
                className="btn-shimmer rose-glow"
                whileHover={{ y: -2 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.75rem 1.8rem", borderRadius: 100,
                  background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
                  color: "#FDF6F2", fontFamily: sans, fontSize: "0.8rem", letterSpacing: "0.06em",
                  border: "none", cursor: "pointer",
                  boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 6px 22px rgba(217,154,147,0.30)",
                }}>
                {certsOpen ? "Ausbildungen einklappen" : "Alle Ausbildungen anzeigen"}
              </motion.button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const items = [
    { name: "Alexandra K. · Wien", tag: "Ganzheitliche Behandlung", text: "5 Sterne sind eindeutig zu wenig. Eine Sitzung bei Renata ist im wahrsten Sinne des Wortes Wellness für Körper, Geist und Seele! Meine Migräneattacken und Rückenschmerzen sind seit den regelmäßigen Behandlungen beinahe ganz verschwunden." },
    { name: "Bea W.", tag: "Kabbala-Beratung", text: "Liebste Renata, es war eine tiefgehende Reise. Wegweiser, Wegöffnung und Bestätigung für die Zukunft. Herzliche Einladung an jede Seele, die ihren Weg verloren hat — geh auf diese Reise mit Renata, du wirst geführt, gefühlt und geliebt." },
    { name: "Joka S.", tag: "Kabbala-Lebensanalyse", text: "Ich bin beeindruckt von diesem magischen und intensiven Termin. In all den Jahren meiner psychischen Störung habe ich mich abgetrennt gefühlt. Der Termin mit Dir hat mich bestärkt, dass ich auf dem richtigen Weg bin. Danke, Danke, Danke." },
    { name: "Alexandra K. · Wien", tag: "Persönliche Begleitung", text: "Du hast mir mit deinem einfühlsamen, herzlichen, lehrenden aber nicht belehrenden Wesen geholfen, mein Potential zu erkennen. Seither freue ich mich immer, wenn ich zu dir kommen darf. Du bist ein besonderer Mensch — ich bin dankbar, dich zu kennen." },
    { name: "Renate-Maria W. · Wien", tag: "Körperbehandlung", text: "Danke liebe Renata für deine wundervolle Behandlung. Ich bin seither schmerzfrei im Nacken und LWS-Bereich. Ich bin wieder voller Energie und freue mich schon auf die nächste Behandlung. Vielen lieben Dank!" },
    { name: "Vera H.", tag: "Lebensanalyse", text: "Wow — so ein kraftvolles Bild! Diese Beratung hat mir so viel bewusst gemacht und vieles bestätigt. Ich werde immer wieder nachlesen, um mich zu erinnern. Herzlichen Dank für deine so wertvolle Beratung und Lebensanalyse." },
  ];
  return (
    <section style={{ background: `linear-gradient(160deg, #FDF0E6 0%, #FBE5D3 50%, #FDF0E6 100%)`, padding: "6rem 0" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 2rem" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Tag>Erfahrungen</Tag>
            <H2 center>Was Frauen sagen</H2>
          </div>
        </Reveal>
        <div style={{ position: "relative" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ padding: "3rem 3.5rem", borderRadius: 28, background: "rgba(253,240,230,0.85)", border: `1px solid rgba(233,195,138,0.25)`, textAlign: "center", boxShadow: "0 12px 48px rgba(110,90,78,0.05)" }}>
              <svg width="36" height="28" viewBox="0 0 36 28" fill="none" style={{ margin: "0 auto 1.5rem" }}>
                <path d="M0 28L0 13C0 5.5 3.5 1.5 10.5 0L12 3.5C9 4.5 7 7 7 11L7 13L14 13L14 28Z" fill="#EBC8C3" opacity="0.55" />
                <path d="M22 28L22 13C22 5.5 25.5 1.5 32.5 0L34 3.5C31 4.5 29 7 29 11L29 13L36 13L36 28Z" fill="#EBC8C3" opacity="0.55" />
              </svg>
              <p style={{ fontFamily: serif, color: C.dark, fontSize: "clamp(1.1rem,2.2vw,1.3rem)", lineHeight: 1.72, fontStyle: "italic", maxWidth: 560, margin: "0 auto" }}>
                "{items[active].text}"
              </p>
              <div style={{ marginTop: "1.75rem" }}>
                <p style={{ fontFamily: sans, color: C.dark, fontSize: "0.88rem", fontWeight: 500 }}>{items[active].name}</p>
                <p style={{ fontFamily: sans, color: C.sage, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{items[active].tag}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.65rem", marginTop: "1.75rem" }}>
            {items.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 100, background: i === active ? C.sage : C.sand, border: "none", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Muss ich spirituell sein?", a: "Nein — überhaupt nicht. Meine Arbeit ist keine spirituelle Weltanschauung, sondern eine ganzheitliche Begleitung. Ob du eher rational denkst oder intuitiv bist, spielt keine Rolle." },
    { q: "Wie läuft eine Begleitung ab?", a: "Wir beginnen mit einem kostenlosen Kennenlerngespräch. Danach erstellen wir gemeinsam einen individuellen Weg, der zu dir passt — mit regelmäßigen Sitzungen, konkreten Impulsen und echter Begleitung." },
    { q: "Was ist eine Aromaöl-Streichung?", a: "Eine sanfte, achtsame Anwendung hochwertiger Aromaöle am Körper. Kein klassische Massage — sondern eine tiefe Entspannung, die Nervensystem und Seele erreicht." },
    { q: "Wie entsteht ein Seelenbild?", a: "Ich trete intuitiv in Kontakt mit deiner Energie und erschaffe aus diesem Raum heraus ein einzigartiges Kunstwerk. Jedes Seelenbild ist ein Unikat, das tief berührt." },
    { q: "Ist das auch online möglich?", a: "Ja. Die meisten Angebote sind online per Video genauso wirksam wie in Präsenz. Ausnahme: Aromaöl-Streichungen finden nur vor Ort statt." },
    { q: "Welche Begleitung passt zu mir?", a: "Das finden wir gemeinsam heraus. Im kostenlosen Kennenlerngespräch schauen wir, was du gerade brauchst und welche Form der Begleitung am besten zu deiner Situation passt." },
  ];
  return (
    <section style={{ background: "#FDF0E6", padding: "6rem 0" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 2rem" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Tag>Häufige Fragen</Tag>
            <H2 center>Was dich beschäftigt</H2>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.04}>
              <div style={{ borderRadius: 22, overflow: "hidden", border: `1px solid rgba(233,195,138,0.22)`, background: "#FBE5D3", boxShadow: "0 4px 24px rgba(217,154,147,0.10)" }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  style={{ width: "100%", padding: "1.2rem 1.6rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontFamily: serif, color: C.dark, fontSize: "1.05rem", fontWeight: 600 }}>{faq.q}</span>
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.28 }}
                    style={{ color: C.sage, fontSize: "1.5rem", flexShrink: 0, lineHeight: 1, fontWeight: 300 }}>+</motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
                      <p style={{ padding: "0 1.6rem 1.4rem", fontFamily: sans, color: C.muted, fontSize: "0.88rem", lineHeight: 1.82 }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function KontaktSection() {
  return (
    <section id="kontakt" style={{ background: "#FDF0E6", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Tag>Kontakt</Tag>
            <H2 center>Nimm Kontakt auf</H2>
            <div style={{ maxWidth: 480, margin: "1rem auto 0" }}>
              <Body center>Ich freue mich auf dich und beantworte alle Fragen persönlich. Terminvereinbarung erforderlich.</Body>
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2.5rem", alignItems: "start" }}
          className="!grid-cols-1 lg:!grid-cols-[1fr_1.2fr]">

          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ padding: "2rem", borderRadius: 24, background: "#FBE5D3", border: "1px solid rgba(233,195,138,0.30)", boxShadow: "0 4px 24px rgba(217,154,147,0.10)" }}>
                <h3 style={{ fontFamily: serif, color: C.dark, fontSize: "1.3rem", fontWeight: 600, marginBottom: "1.5rem" }}>Kontakt &amp; Adresse</h3>

                {[
                  { icon: "📍", label: "Adresse", val: "Karl-Pallinger-Straße 42/1\n2486 Pottendorf, Österreich" },
                  { icon: "📞", label: "Telefon", val: "0660 / 23 46 454", link: "tel:+436602346454" },
                  { icon: "✉️", label: "E-Mail", val: "larentina@gmx.at", link: "mailto:larentina@gmx.at" },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", gap: "0.9rem", marginBottom: "1.2rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.sage, marginBottom: "0.25rem" }}>{r.label}</div>
                      {r.link ? (
                        <a href={r.link} style={{ fontFamily: sans, fontSize: "0.92rem", color: C.dark, whiteSpace: "pre-line", textDecoration: "none", borderBottom: "1px dotted rgba(110,77,66,0.3)" }}>{r.val}</a>
                      ) : (
                        <div style={{ fontFamily: sans, fontSize: "0.92rem", color: C.dark, whiteSpace: "pre-line", lineHeight: 1.5 }}>{r.val}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                {[
                  { label: "Instagram", href: "#" },
                  { label: "WhatsApp", href: "https://wa.me/436602346454" },
                  { label: "E-Mail", href: "mailto:larentina@gmx.at" },
                ].map(s => (
                  <a key={s.label} href={s.href} className="btn-shimmer" style={{
                    width: 50, height: 50, borderRadius: "50%",
                    background: "rgba(253,240,230,0.9)",
                    border: "1px solid rgba(233,195,138,0.55)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: sans, fontSize: "0.65rem", color: C.muted, letterSpacing: "0.05em",
                    textDecoration: "none",
                    boxShadow: "0 4px 18px rgba(217,154,147,0.10)",
                  }}>{s.label.slice(0,2).toUpperCase()}</a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 8px 32px rgba(217,154,147,0.15)", border: "1px solid rgba(233,195,138,0.30)" }}>
                <iframe
                  src="https://www.google.com/maps?q=Karl-Pallinger-Stra%C3%9Fe+42%2F1+2486+Pottendorf+Austria&output=embed"
                  width="100%" height="260" style={{ border: 0, display: "block" }}
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Standort Karte" />
              </div>

              <div style={{ padding: "2rem", borderRadius: 24, background: "#FBE5D3", border: "1px solid rgba(233,195,138,0.30)", boxShadow: "0 4px 24px rgba(217,154,147,0.10)" }}>
                <h4 style={{ fontFamily: serif, color: C.dark, fontSize: "1.3rem", fontWeight: 600, marginBottom: "1.25rem" }}>Nachricht senden</h4>

                {[
                  { label: "Name", type: "text", placeholder: "Dein Name" },
                  { label: "E-Mail", type: "email", placeholder: "Deine E-Mail-Adresse" },
                ].map(f => (
                  <div key={f.label} style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.sage, marginBottom: "0.45rem" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder}
                      style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 12, border: "1px solid rgba(233,195,138,0.35)", background: "rgba(253,240,230,0.7)", fontFamily: sans, fontSize: "0.9rem", color: C.dark, outline: "none" }} />
                  </div>
                ))}

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.sage, marginBottom: "0.45rem" }}>Nachricht</label>
                  <textarea placeholder="Wie kann ich dir helfen?" rows={4}
                    style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 12, border: "1px solid rgba(233,195,138,0.35)", background: "rgba(253,240,230,0.7)", fontFamily: sans, fontSize: "0.9rem", color: C.dark, outline: "none", resize: "vertical" }} />
                </div>

                <a href="mailto:larentina@gmx.at" className="btn-shimmer" style={{
                  display: "block", textAlign: "center",
                  padding: "1rem 2rem", borderRadius: 100,
                  background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
                  color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
                  textDecoration: "none",
                  boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
                }}>Nachricht senden</a>

                <p style={{ fontFamily: sans, fontSize: "0.72rem", color: C.muted, textAlign: "center", marginTop: "0.75rem", opacity: 0.8 }}>Deine Daten werden vertraulich behandelt.</p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ background: `linear-gradient(155deg, #FDF0E6 0%, #FBE5D3 50%, #F8DCCB 100%)`, padding: "7rem 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 28% 38%, rgba(235,200,195,0.22), transparent 55%), radial-gradient(ellipse at 72% 65%, rgba(216,176,107,0.12), transparent 52%)` }} />
      <Blob className="w-[600px] h-[600px] -right-24 top-1/2 -translate-y-1/2" color={C.sand} opacity={0.18} />
      <Blob className="w-[400px] h-[400px] -left-20 -bottom-16" color={C.soft} opacity={0.20} />
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 2rem", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          <Tag>Bereit für deinen Weg?</Tag>
          <h2 style={{ fontFamily: serif, color: C.dark, fontSize: "clamp(2.2rem,4.5vw,3.8rem)", lineHeight: 1.1, fontWeight: 400 }}>
            Du musst deinen Weg<br />
            <em style={{ fontWeight: 300, color: C.sage }}>nicht alleine gehen.</em>
          </h2>
          <p style={{ fontFamily: sans, color: C.muted, fontSize: "0.95rem", lineHeight: 1.82, margin: "1.5rem auto", maxWidth: 460 }}>
            Ein kostenfreies Kennenlerngespräch ist dein erster Schritt — unverbindlich, offen und ohne Erwartungen. Nur Raum für dich.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
            <Btn dark>Jetzt buchen</Btn>
            <Btn outline>Angebote ansehen</Btn>
          </div>
          <p style={{ fontFamily: sans, color: C.muted, fontSize: "0.75rem", marginTop: "1.2rem", letterSpacing: "0.05em", opacity: 0.8 }}>
            Kostenlos · Unverbindlich · Online oder vor Ort
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const cols = [
    { title: "Navigation", links: ["Home","Begleitung","Über mich","Seelenbilder","Erfahrungen","Kontakt"] },
    { title: "Angebote", links: ["Ganzheitliche Begleitung","Aromaöl-Streichung","Seelenreise & Impulse","Seelenbilder","Feng Shui"] },
    { title: "Rechtliches", links: ["Impressum","Datenschutz","AGB","Widerrufsbelehrung"] },
  ];
  return (
    <footer style={{ background: "#3D2820", borderTop: `1px solid rgba(214,176,106,0.12)` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "4.5rem 2rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr repeat(3,1fr)", gap: "3rem", marginBottom: "3.5rem" }}
          className="!grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-[1.8fr_1fr_1fr_1fr]">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <img src="/larentinaneu1.png" alt="Larentina Seelenfluss" style={{ height: 150, width: "auto", objectFit: "contain", opacity: 0.95 }} />
            <p style={{ fontFamily: sans, fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted }}>Ganzheitliche Praxis</p>
            <p style={{ fontFamily: sans, color: C.muted, fontSize: "0.82rem", lineHeight: 1.78, maxWidth: 240 }}>Professionelle ganzheitliche Begleitung für Frauen — mit Herz und Fachkompetenz.</p>
            <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.5rem" }}>
              {["IG","LI","PI"].map(s => (
                <a key={s} href="#" style={{ width: 34, height: 34, borderRadius: "50%", border: `1px solid rgba(176,144,128,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontFamily: sans, fontSize: "0.62rem", letterSpacing: "0.06em", textDecoration: "none" }}>{s}</a>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <p style={{ fontFamily: sans, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.cream, marginBottom: "1rem" }}>{col.title}</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {col.links.map(l => (
                  <li key={l}><a href="#" style={{ fontFamily: sans, color: C.muted, fontSize: "0.82rem", textDecoration: "none" }}
                    onMouseEnter={e => e.target.style.color = C.sand} onMouseLeave={e => e.target.style.color = C.muted}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1.5rem", padding: "2rem 0", borderTop: `1px solid rgba(214,176,106,0.12)`, marginBottom: "2rem" }}>
          {[{ l: "Email", v: "larentina@gmx.at" },{ l: "Telefon", v: "0660 / 23 46 454" },{ l: "Sprechzeiten", v: "Nach Vereinbarung" },{ l: "Standort", v: "Karl-Pallinger-Straße 42/1<br>2486 Pottendorf, Österreich" }].map(c => (
            <div key={c.l}>
              <p style={{ fontFamily: sans, color: C.sage, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>{c.l}</p>
              <p style={{ fontFamily: sans, color: C.muted, fontSize: "0.82rem" }} dangerouslySetInnerHTML={{ __html: c.v }} />
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid rgba(214,176,106,0.09)`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ fontFamily: sans, color: C.muted, fontSize: "0.75rem" }}>© {year} Larentina Seelenfluss — Alle Rechte vorbehalten</p>
          <p style={{ fontFamily: serif, color: C.soft, fontSize: "0.88rem", fontStyle: "italic" }}>Gemacht mit Herz &amp; Seele.</p>
        </div>
      </div>
    </footer>
  );
}

const MODAL_CONTENT = {
  kernbegleitung: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Golden Harmony Beauty</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "0.4rem" }}>
        Kosmetische Behandlung
      </h2>
      <p style={{ fontFamily: serif, fontStyle: "italic", color: "#C88880", fontSize: "1.1rem", marginBottom: "1.5rem" }}>
        Natürliche Schönheit · Innere Balance
      </p>
      <p style={{ fontFamily: sans, color: "#6F4D42", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: "1rem" }}>
        Eine ganzheitliche kosmetische Behandlung, die deine natürliche Ausstrahlung sanft zum Strahlen bringt.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1.8rem" }}>
        Mit hochwertigen Produkten, achtsamer Berührung und einer wohltuenden Atmosphäre wird deine Haut gepflegt — gleichzeitig darf dein Nervensystem zur Ruhe kommen und neue Frische in Körper und Geist einkehren.
      </p>

      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Ideal für</p>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.8rem" }}>
        {[
          "Natürliche, strahlende Haut",
          "Tiefe Entspannung & Wohlbefinden",
          "Innere Balance & Ruhe",
          "Achtsame Auszeit nur für dich",
          "Ganzheitliche Pflege für Körper & Seele",
        ].map(o => (
          <li key={o} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
            <span style={{ color: "#E9C38A", fontSize: "0.55rem", flexShrink: 0, marginTop: "0.45rem" }}>✦</span>
            <span style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.6 }}>{o}</span>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 1rem", borderRadius: 14, background: "rgba(253,240,230,0.5)", border: "1px solid rgba(233,195,138,0.20)", marginBottom: "0.6rem" }}>
        <span style={{ fontFamily: sans, fontSize: "0.78rem", color: "#9C7B6E", letterSpacing: "0.05em" }}>Dauer</span>
        <span style={{ fontFamily: serif, fontSize: "0.95rem", color: "#6F4D42", fontStyle: "italic" }}>ca. 60–90 Minuten</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 1rem", borderRadius: 14, background: "rgba(253,240,230,0.5)", border: "1px solid rgba(233,195,138,0.20)", marginBottom: "1.5rem" }}>
        <span style={{ fontFamily: sans, fontSize: "0.78rem", color: "#9C7B6E", letterSpacing: "0.05em" }}>Investition in dich</span>
        <span style={{ fontFamily: serif, fontSize: "1.05rem", color: "#6F4D42", fontWeight: 500 }}>88 €</span>
      </div>

      <a href="#booking" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt buchen</a>
    </div>
  ),
  aromaoel: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Golden Aura Experience</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "0.4rem" }}>
        Fernbehandlung
      </h2>
      <p style={{ fontFamily: serif, fontStyle: "italic", color: "#C88880", fontSize: "1.1rem", marginBottom: "1.5rem" }}>
        Energetische Begleitung über jede Distanz
      </p>
      <p style={{ fontFamily: sans, color: "#6F4D42", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: "1rem" }}>
        Eine kraftvolle, energetische Fernbehandlung, die dich unabhängig von deinem Aufenthaltsort erreicht.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1.8rem" }}>
        Über energetische Verbindung darfst du tiefe Entspannung, Klärung und Harmonisierung erfahren — für dein Nervensystem, deine Energiezentren und deine Seele. Eine wohltuende Auszeit, ganz bei dir, ganz für dich.
      </p>

      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Ideal für</p>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.8rem" }}>
        {[
          "Tiefe Entspannung & Loslassen",
          "Energetische Klärung & Harmonisierung",
          "Beruhigung des Nervensystems",
          "Mehr innere Ruhe & Balance",
          "Begleitung unabhängig vom Aufenthaltsort",
        ].map(o => (
          <li key={o} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
            <span style={{ color: "#E9C38A", fontSize: "0.55rem", flexShrink: 0, marginTop: "0.45rem" }}>✦</span>
            <span style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.6 }}>{o}</span>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 1rem", borderRadius: 14, background: "rgba(253,240,230,0.5)", border: "1px solid rgba(233,195,138,0.20)", marginBottom: "0.6rem" }}>
        <span style={{ fontFamily: sans, fontSize: "0.78rem", color: "#9C7B6E", letterSpacing: "0.05em" }}>Dauer</span>
        <span style={{ fontFamily: serif, fontSize: "0.95rem", color: "#6F4D42", fontStyle: "italic" }}>ca. 60–90 Minuten</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 1rem", borderRadius: 14, background: "rgba(253,240,230,0.5)", border: "1px solid rgba(233,195,138,0.20)", marginBottom: "1.5rem" }}>
        <span style={{ fontFamily: sans, fontSize: "0.78rem", color: "#9C7B6E", letterSpacing: "0.05em" }}>Investition in dich</span>
        <span style={{ fontFamily: serif, fontSize: "1.05rem", color: "#6F4D42", fontWeight: 500 }}>111 €</span>
      </div>

      <a href="#booking" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt buchen</a>
    </div>
  ),
  individuelles_seelenbild: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Individuelle Anfrage</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "1.2rem" }}>
        Dein eigenes Seelenbild
      </h2>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "2rem" }}>
        Ein Seelenbild, intuitiv für dich erschaffen — ein Unikat, das deine innere Energie sichtbar macht. Hinterlasse mir deine Wünsche und ich melde mich persönlich bei dir.
      </p>

      {[
        { label: "Name", type: "text", placeholder: "Dein Name" },
        { label: "E-Mail", type: "email", placeholder: "Deine E-Mail-Adresse" },
      ].map(f => (
        <div key={f.label} style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.45rem" }}>{f.label}</label>
          <input type={f.type} placeholder={f.placeholder}
            style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 12, border: "1px solid rgba(233,195,138,0.35)", background: "rgba(253,240,230,0.7)", fontFamily: sans, fontSize: "0.9rem", color: "#6F4D42", outline: "none" }} />
        </div>
      ))}

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.45rem" }}>Energetische Art</label>
        <select defaultValue=""
          style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 12, border: "1px solid rgba(233,195,138,0.35)", background: "rgba(253,240,230,0.7)", fontFamily: sans, fontSize: "0.9rem", color: "#6F4D42", outline: "none", cursor: "pointer" }}>
          <option value="" disabled>Bitte wählen…</option>
          <option value="Herzenslicht">Herzenslicht · Liebe & Verbundenheit</option>
          <option value="Seelenfeuer">Seelenfeuer · Kraft & Leidenschaft</option>
          <option value="Mondsilber">Mondsilber · Intuition & Weiblichkeit</option>
          <option value="Erdwurzel">Erdwurzel · Stabilität & Erdung</option>
          <option value="Sternenklang">Sternenklang · Spiritualität & Höheres Selbst</option>
        </select>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.45rem" }}>Nachricht</label>
        <textarea placeholder="Erzähle mir von dir — was darf dein Seelenbild zum Ausdruck bringen?" rows={4}
          style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 12, border: "1px solid rgba(233,195,138,0.35)", background: "rgba(253,240,230,0.7)", fontFamily: sans, fontSize: "0.9rem", color: "#6F4D42", outline: "none", resize: "vertical" }} />
      </div>

      <a href="mailto:larentina@gmx.at?subject=Anfrage individuelles Seelenbild" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Anfrage senden</a>

      <p style={{ fontFamily: sans, fontSize: "0.72rem", color: "#9C7B6E", textAlign: "center", marginTop: "0.75rem", opacity: 0.8 }}>Ich melde mich persönlich bei dir.</p>
    </div>
  ),
  kaufen: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Kaufanfrage</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "1.2rem" }}>
        Seelenbild reservieren
      </h2>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "2rem" }}>
        Hinterlasse mir deine Nachricht und ich melde mich persönlich bei dir mit allen Details zu Preis, Versand und Zahlung.
      </p>

      {[
        { label: "Name", type: "text", placeholder: "Dein Name" },
        { label: "E-Mail", type: "email", placeholder: "Deine E-Mail-Adresse" },
        { label: "Welches Seelenbild?", type: "text", placeholder: "z.B. Blumenenergie" },
      ].map(f => (
        <div key={f.label} style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.45rem" }}>{f.label}</label>
          <input type={f.type} placeholder={f.placeholder}
            style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 12, border: "1px solid rgba(233,195,138,0.35)", background: "rgba(253,240,230,0.7)", fontFamily: sans, fontSize: "0.9rem", color: "#6F4D42", outline: "none" }} />
        </div>
      ))}

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.45rem" }}>Nachricht</label>
        <textarea placeholder="Deine Fragen oder Wünsche..." rows={4}
          style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 12, border: "1px solid rgba(233,195,138,0.35)", background: "rgba(253,240,230,0.7)", fontFamily: sans, fontSize: "0.9rem", color: "#6F4D42", outline: "none", resize: "vertical" }} />
      </div>

      <a href="mailto:larentina@gmx.at?subject=Kaufanfrage Seelenbild" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Anfrage senden</a>

      <p style={{ fontFamily: sans, fontSize: "0.72rem", color: "#9C7B6E", textAlign: "center", marginTop: "0.75rem", opacity: 0.8 }}>Bezahlung später über PayPal oder Überweisung möglich.</p>
    </div>
  ),
  golden_space: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Golden Space Harmony</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "0.4rem" }}>
        Raum-Harmonisierung
      </h2>
      <p style={{ fontFamily: serif, fontStyle: "italic", color: "#C88880", fontSize: "1.1rem", marginBottom: "1.5rem" }}>
        inkl. Feng Shui
      </p>
      <p style={{ fontFamily: sans, color: "#6F4D42", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: "1rem" }}>
        Eine ganzheitliche energetische Reinigung und Harmonisierung für Haus, Wohnung oder Praxisräume — für mehr Leichtigkeit, Klarheit und eine Atmosphäre des Wohlbefindens.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1rem" }}>
        Golden Space Harmony unterstützt dabei, Räume energetisch zu reinigen, stagnierende Energien zu lösen und neue Harmonie sowie positive Schwingung einzuladen.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1rem" }}>
        Durch eine achtsame Kombination aus energetischer Reinigung, Räucherung, Feng Shui und harmonisierender Energiearbeit entsteht ein Raum, der wieder Ruhe, Geborgenheit und neue Kraft ausstrahlen darf.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1.8rem" }}>
        Denn Räume beeinflussen unser Wohlbefinden oft stärker, als wir wahrnehmen. Ziel dieser Begleitung ist es, eine harmonische Umgebung zu schaffen, in der du dich leichter, ausgeglichener und wieder ganz bei dir fühlen kannst.
      </p>

      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Ideal für</p>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.8rem" }}>
        {[
          "Energetische Reinigung von Räumen",
          "Mehr Harmonie & Wohlbefinden zuhause",
          "Neue positive Energie & Leichtigkeit",
          "Unterstützung bei Veränderungen & Neuanfang",
          "Harmonisierung von Wohn- & Praxisräumen",
          "Mehr Ruhe, Klarheit & Geborgenheit",
        ].map(o => (
          <li key={o} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
            <span style={{ color: "#E9C38A", fontSize: "0.55rem", flexShrink: 0, marginTop: "0.45rem" }}>✦</span>
            <span style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.6 }}>{o}</span>
          </li>
        ))}
      </ul>

      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "1rem" }}>Ablauf</p>
      <ol style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.8rem", listStyle: "none" }}>
        {[
          ["Gemeinsames Vorgespräch", "Wir besprechen deine aktuelle Wohn- oder Raumsituation, Wünsche und Themen, die dich beschäftigen."],
          ["Energetische Reinigung & Räucherung", "Belastende oder stagnierende Energien dürfen sanft gelöst werden, damit neue Leichtigkeit entstehen kann."],
          ["Feng Shui & Harmonisierung", "Durch achtsame Impulse und Feng-Shui-Elemente wird die Energie des Raumes harmonisiert und neu ausgerichtet."],
          ["Positive Energiearbeit & Abschluss", "Zum Abschluss wird der Raum bewusst mit neuer Klarheit, Ruhe und positiver Energie gestärkt."],
        ].map(([t, d], i) => (
          <li key={t} style={{ display: "flex", gap: "0.9rem" }}>
            <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(145deg, #F0D5A8, #E9C38A)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, fontSize: "0.85rem", color: "#6F4D42", fontWeight: 500 }}>{i + 1}</span>
            <div>
              <p style={{ fontFamily: serif, color: "#6F4D42", fontSize: "1rem", fontWeight: 500, marginBottom: "0.25rem" }}>{t}</p>
              <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.85rem", lineHeight: 1.7 }}>{d}</p>
            </div>
          </li>
        ))}
      </ol>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 1rem", borderRadius: 14, background: "rgba(253,240,230,0.5)", border: "1px solid rgba(233,195,138,0.20)", marginBottom: "0.6rem" }}>
        <span style={{ fontFamily: sans, fontSize: "0.78rem", color: "#9C7B6E", letterSpacing: "0.05em" }}>Dauer</span>
        <span style={{ fontFamily: serif, fontSize: "0.95rem", color: "#6F4D42", fontStyle: "italic" }}>ca. 3 Stunden</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 1rem", borderRadius: 14, background: "rgba(253,240,230,0.5)", border: "1px solid rgba(233,195,138,0.20)", marginBottom: "1.5rem" }}>
        <span style={{ fontFamily: sans, fontSize: "0.78rem", color: "#9C7B6E", letterSpacing: "0.05em" }}>Investition in dich</span>
        <span style={{ fontFamily: serif, fontSize: "1.05rem", color: "#6F4D42", fontWeight: 500 }}>255 €</span>
      </div>

      <a href="#booking" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt buchen</a>
    </div>
  ),
  vital_balance: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Vital Balance & Soul Harmony</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "0.4rem" }}>
        Ganzheitliche Gesundheitsberatung
      </h2>
      <p style={{ fontFamily: serif, fontStyle: "italic", color: "#C88880", fontSize: "1.1rem", marginBottom: "1.5rem" }}>
        inkl. Vitalmessung
      </p>
      <p style={{ fontFamily: sans, color: "#6F4D42", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: "1rem" }}>
        Eine ganzheitliche Gesundheitsberatung für mehr Balance, Wohlbefinden und innere Harmonie.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1rem" }}>
        Vital Balance & Soul Harmony verbindet individuelle Beratung, achtsame Begleitung und eine unterstützende Vitalmessung, um Körper, Geist und Seele ganzheitlich zu stärken.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1rem" }}>
        Gemeinsam betrachten wir dein aktuelles Wohlbefinden, mögliche Belastungen und Potenziale, um neue Klarheit, mehr Energie und eine nachhaltige innere Balance zu fördern.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1.8rem" }}>
        Diese Begleitung unterstützt dich dabei, bewusster auf deine Bedürfnisse zu hören, Zusammenhänge besser zu verstehen und neue Impulse für dein persönliches Wohlbefinden zu erhalten.
      </p>

      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Ideal für</p>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.8rem" }}>
        {[
          "Mehr Energie & Vitalität",
          "Innere Balance & Wohlbefinden",
          "Persönliche Klarheit & Orientierung",
          "Ganzheitliche Unterstützung für Körper & Seele",
          "Neue Impulse für deine Gesundheit",
          "Mehr Bewusstsein für dein eigenes Wohlbefinden",
        ].map(o => (
          <li key={o} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
            <span style={{ color: "#E9C38A", fontSize: "0.55rem", flexShrink: 0, marginTop: "0.45rem" }}>✦</span>
            <span style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.6 }}>{o}</span>
          </li>
        ))}
      </ul>

      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "1rem" }}>Ablauf</p>
      <ol style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.8rem", listStyle: "none" }}>
        {[
          ["Individuelle Analyse & Gespräch", "Wir betrachten gemeinsam deine aktuelle Situation, dein Wohlbefinden und deine persönlichen Themen, Wünsche und Ziele."],
          ["Vitalmessung", "Eine unterstützende Vitalmessung gibt zusätzliche Impulse und Hinweise, um dein persönliches Wohlbefinden ganzheitlich zu betrachten."],
          ["Persönliche Auswertung & Empfehlung", "Du erhältst eine individuelle Besprechung mit achtsamen Empfehlungen und Impulsen, abgestimmt auf deine persönlichen Bedürfnisse."],
          ["Neue Klarheit & Energie", "Ziel ist es, dein Wohlbefinden zu stärken, mehr innere Balance zu fördern und neue Energie für deinen Alltag zu gewinnen."],
        ].map(([t, d], i) => (
          <li key={t} style={{ display: "flex", gap: "0.9rem" }}>
            <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(145deg, #F0D5A8, #E9C38A)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, fontSize: "0.85rem", color: "#6F4D42", fontWeight: 500 }}>{i + 1}</span>
            <div>
              <p style={{ fontFamily: serif, color: "#6F4D42", fontSize: "1rem", fontWeight: 500, marginBottom: "0.25rem" }}>{t}</p>
              <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.85rem", lineHeight: 1.7 }}>{d}</p>
            </div>
          </li>
        ))}
      </ol>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 1rem", borderRadius: 14, background: "rgba(253,240,230,0.5)", border: "1px solid rgba(233,195,138,0.20)", marginBottom: "0.6rem" }}>
        <span style={{ fontFamily: sans, fontSize: "0.78rem", color: "#9C7B6E", letterSpacing: "0.05em" }}>Dauer</span>
        <span style={{ fontFamily: serif, fontSize: "0.95rem", color: "#6F4D42", fontStyle: "italic" }}>ca. 60 Minuten</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 1rem", borderRadius: 14, background: "rgba(253,240,230,0.5)", border: "1px solid rgba(233,195,138,0.20)", marginBottom: "1.5rem" }}>
        <span style={{ fontFamily: sans, fontSize: "0.78rem", color: "#9C7B6E", letterSpacing: "0.05em" }}>Investition in dich</span>
        <span style={{ fontFamily: serif, fontSize: "1.05rem", color: "#6F4D42", fontWeight: 500 }}>89 €</span>
      </div>

      <a href="#booking" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt buchen</a>
    </div>
  ),
  soul_journey: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Soul Journey · </p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "0.4rem" }}>
        Seelenreise
      </h2>
      <p style={{ fontFamily: serif, fontStyle: "italic", color: "#C88880", fontSize: "1.1rem", marginBottom: "1.5rem" }}>
        Eine Reise zurück zu dir selbst
      </p>
      <p style={{ fontFamily: sans, color: "#6F4D42", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: "1rem" }}>
        Eine intuitive Seelenreise, die dich wieder mit deiner inneren Weisheit verbindet.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1rem" }}>
        Gemeinsam tauchen wir achtsam in dein Unterbewusstsein ein, lösen emotionale und energetische Blockaden, erkennen verborgene Botschaften und begleiten dich zurück in deine innere Balance und Harmonie.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1.8rem" }}>
        Diese Reise unterstützt dich dabei, Klarheit zu gewinnen, neue Perspektiven zu entdecken und dich wieder tiefer mit dir selbst zu verbinden.
      </p>

      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Ideal für</p>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.8rem" }}>
        {[
          "Innere Klarheit & Orientierung",
          "Selbsterkenntnis & persönliche Entwicklung",
          "Spirituelle Entfaltung",
          "Lösung emotionaler und energetischer Blockaden",
          "Clearing belastender Energien",
          "Mehr innere Ruhe, Balance & Verbundenheit",
        ].map(o => (
          <li key={o} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
            <span style={{ color: "#E9C38A", fontSize: "0.55rem", flexShrink: 0, marginTop: "0.45rem" }}>✦</span>
            <span style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.6 }}>{o}</span>
          </li>
        ))}
      </ul>

      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "1rem" }}>Ablauf deiner Soul Journey</p>
      <ol style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.8rem", listStyle: "none" }}>
        {[
          ["Klärendes Gespräch", "Ein achtsames Ankommen. Wir besprechen deine aktuellen Themen, Wünsche und das, was dich gerade bewegt."],
          ["Fußbad & energetische Reinigung", "Ein sanfter Moment des Loslassens und Entspannens, begleitet von einer wohltuenden energetischen Reinigung."],
          ["Klang & Räucherung", "Klangschalen, Trommel, Rassel und feine Düfte unterstützen dich dabei, tiefer in die Entspannung und Verbindung einzutauchen."],
          ["Aromaöl-Streichung", "Warme, ausgewählte ätherische Öle schenken dir Entspannung, Geborgenheit und Wohlbefinden."],
          ["Chakra- & Meridian-Ausgleich", "Sanfte Harmonisierung deiner Energiezentren zur Unterstützung von Körper, Geist und Seele."],
          ["Seelenreise & intuitive Botschaften", "Ein tiefgehender Raum für innere Erkenntnisse, intuitive Botschaften und neue Impulse für deinen Weg."],
        ].map(([t, d], i) => (
          <li key={t} style={{ display: "flex", gap: "0.9rem" }}>
            <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(145deg, #F0D5A8, #E9C38A)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, fontSize: "0.85rem", color: "#6F4D42", fontWeight: 500 }}>{i + 1}</span>
            <div>
              <p style={{ fontFamily: serif, color: "#6F4D42", fontSize: "1rem", fontWeight: 500, marginBottom: "0.25rem" }}>{t}</p>
              <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.85rem", lineHeight: 1.7 }}>{d}</p>
            </div>
          </li>
        ))}
      </ol>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 1rem", borderRadius: 14, background: "rgba(253,240,230,0.5)", border: "1px solid rgba(233,195,138,0.20)", marginBottom: "0.6rem" }}>
        <span style={{ fontFamily: sans, fontSize: "0.78rem", color: "#9C7B6E", letterSpacing: "0.05em" }}>Dauer</span>
        <span style={{ fontFamily: serif, fontSize: "0.95rem", color: "#6F4D42", fontStyle: "italic" }}>ca. 90–120 Minuten</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 1rem", borderRadius: 14, background: "rgba(253,240,230,0.5)", border: "1px solid rgba(233,195,138,0.20)", marginBottom: "1.5rem" }}>
        <span style={{ fontFamily: sans, fontSize: "0.78rem", color: "#9C7B6E", letterSpacing: "0.05em" }}>Investition in dich</span>
        <span style={{ fontFamily: serif, fontSize: "1.05rem", color: "#6F4D42", fontWeight: 500 }}>155 €</span>
      </div>

      <a href="#booking" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt buchen</a>
    </div>
  ),
  blumenenergie: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Seelenbild · Original</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "1.2rem" }}>
        Blumenenergie
      </h2>
      <img src="/blumen.png" alt="Blumenenergie"
        onClick={() => window.open("/blumen.png", "_blank")}
        style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 18, marginBottom: "1.5rem", cursor: "zoom-in", boxShadow: "0 12px 36px rgba(110,77,66,0.18)", background: "#3D2820" }} />
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1.5rem", fontStyle: "italic" }}>
        Ein Tanz aus Rosen, getragen vom Atem der Erde — jede Blüte ein Echo deiner inneren Wahrheit. In den tiefroten Herzen dieser Blumen pulsiert die alte Weisheit der Weiblichkeit: das Wissen, dass Schönheit aus dem Boden des Schmerzes wächst und die Seele wie ein Blütenkelch sich öffnet, wenn sie liebevoll empfangen wird.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.85, marginBottom: "2rem" }}>
        Energetisch geladen · Acryl auf Leinwand · Einzelstück
      </p>
      <a onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("openModal", { detail: { type: "kaufen" } })); }} href="#" data-art="Seelenbild Blumenenergie" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt kaufen</a>
    </div>
  ),
  die_energie: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Seelenbild · Original</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "1.2rem" }}>
        Die Energie
      </h2>
      <img src="/energie.png" alt="Die Energie"
        onClick={() => window.open("/energie.png", "_blank")}
        style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 18, marginBottom: "1.5rem", cursor: "zoom-in", boxShadow: "0 12px 36px rgba(110,77,66,0.18)", background: "#3D2820" }} />
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1.5rem", fontStyle: "italic" }}>
        Ein kosmischer Strom aus Licht und Materie — wo Gold auf Tiefe trifft und sich das Universum für einen Moment offenbart. Dieses Bild trägt die Schwingung der reinen Lebensenergie in sich, jene Kraft die alles durchwirkt und uns daran erinnert, dass wir Teil eines unendlichen Tanzes sind.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.85, marginBottom: "2rem" }}>
        Energetisch geladen · Mischtechnik · Einzelstück
      </p>
      <a onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("openModal", { detail: { type: "kaufen" } })); }} href="#" data-art="Seelenbild Die Energie" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt kaufen</a>
    </div>
  ),
  die_vier_jahreszeiten: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Seelenbild · Original</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "1.2rem" }}>
        Die vier Jahreszeiten
      </h2>
      <img src="/jahreszeiten.png" alt="Die vier Jahreszeiten"
        onClick={() => window.open("/jahreszeiten.png", "_blank")}
        style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 18, marginBottom: "1.5rem", cursor: "zoom-in", boxShadow: "0 12px 36px rgba(110,77,66,0.18)", background: "#3D2820" }} />
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1.5rem", fontStyle: "italic" }}>
        Werden und Vergehen, Blühen und Ruhen — in vier Bewegungen wiegt sich das ewige Lied der Natur. Jede Phase trägt ihre eigene Weisheit: das Erwachen im Frühling, die Fülle des Sommers, das Loslassen im Herbst, die Stille des Winters. Ein Spiegel deiner eigenen Lebenszyklen.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.85, marginBottom: "2rem" }}>
        Energetisch geladen · Acryl auf Leinwand · Einzelstück
      </p>
      <a onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("openModal", { detail: { type: "kaufen" } })); }} href="#" data-art="Seelenbild Die vier Jahreszeiten" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt kaufen</a>
    </div>
  ),
  engel: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Seelenbild · Original</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "1.2rem" }}>
        Engel
      </h2>
      <img src="/engel.png" alt="Engel"
        onClick={() => window.open("/engel.png", "_blank")}
        style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 18, marginBottom: "1.5rem", cursor: "zoom-in", boxShadow: "0 12px 36px rgba(110,77,66,0.18)", background: "#3D2820" }} />
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1.5rem", fontStyle: "italic" }}>
        Fünf lichtvolle Gestalten, getragen vom warmen Glanz der höheren Welten. Sie wachen, sie begleiten, sie schenken Trost in den dunkelsten Stunden. Dieses Bild ist eine Einladung, dich getragen zu fühlen — von Kräften, die immer da sind, auch wenn wir sie nicht sehen.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.85, marginBottom: "2rem" }}>
        Energetisch geladen · Acryl auf Leinwand · Einzelstück
      </p>
      <a onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("openModal", { detail: { type: "kaufen" } })); }} href="#" data-art="Seelenbild Engel" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt kaufen</a>
    </div>
  ),
  feng_shui: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Seelenbild · Original</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "1.2rem" }}>
        Feng Shui · Partnerschaft & Liebe
      </h2>
      <img src="/feng_shui.png" alt="Feng Shui · Partnerschaft & Liebe"
        onClick={() => window.open("/feng_shui.png", "_blank")}
        style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 18, marginBottom: "1.5rem", cursor: "zoom-in", boxShadow: "0 12px 36px rgba(110,77,66,0.18)", background: "#3D2820" }} />
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1.5rem", fontStyle: "italic" }}>
        Speziell energetisiert für die Bagua-Zone der Partnerschaft. Die warmen Erdtöne und sanften Lichteffekte aktivieren die Energie der Liebe in deinem Zuhause — eine Einladung an die Wärme, die Verbundenheit und das tiefe Vertrauen, das eine Beziehung trägt.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.85, marginBottom: "2rem" }}>
        Feng Shui energetisiert · Acryl & Strukturpaste · Einzelstück
      </p>
      <a onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("openModal", { detail: { type: "kaufen" } })); }} href="#" data-art="Seelenbild Feng Shui · Partnerschaft & Liebe" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt kaufen</a>
    </div>
  ),
  frau_blond: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Seelenbild · Original</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "1.2rem" }}>
        Frau mit blondem Haar
      </h2>
      <img src="/frau_blond.png" alt="Frau mit blondem Haar"
        onClick={() => window.open("/frau_blond.png", "_blank")}
        style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 18, marginBottom: "1.5rem", cursor: "zoom-in", boxShadow: "0 12px 36px rgba(110,77,66,0.18)", background: "#3D2820" }} />
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1.5rem", fontStyle: "italic" }}>
        Ein stiller Moment voller Würde — die Frau in sich selbst ruhend, umgeben von einem Tanz aus Violett und Gold. Ihre nach unten gerichtete Haltung ist kein Rückzug, sondern eine Hinwendung zum eigenen Inneren. Eine Erinnerung daran, dass wahre Kraft aus der Stille kommt.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.85, marginBottom: "2rem" }}>
        Energetisch geladen · Acryl auf Leinwand · Einzelstück
      </p>
      <a onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("openModal", { detail: { type: "kaufen" } })); }} href="#" data-art="Seelenbild Frau mit blondem Haar" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt kaufen</a>
    </div>
  ),
  herkunft: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Seelenbild · Original</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "1.2rem" }}>
        Herkunft, Gemeinschaft & Vitalität
      </h2>
      <img src="/herkunft.png" alt="Herkunft, Gemeinschaft & Vitalität"
        onClick={() => window.open("/herkunft.png", "_blank")}
        style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 18, marginBottom: "1.5rem", cursor: "zoom-in", boxShadow: "0 12px 36px rgba(110,77,66,0.18)", background: "#3D2820" }} />
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1.5rem", fontStyle: "italic" }}>
        Eine junge Seele im Glanz ihrer Ursprünge — getragen von den unsichtbaren Bändern der Familie, der Ahnen, der Lebenskraft. Die goldenen Strukturen erzählen von dem Reichtum, der in jedem von uns liegt, wenn wir uns mit unserer Herkunft verbinden und daraus Vitalität schöpfen.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.85, marginBottom: "2rem" }}>
        Energetisch geladen · Mischtechnik mit Strukturpaste · Einzelstück
      </p>
      <a onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("openModal", { detail: { type: "kaufen" } })); }} href="#" data-art="Seelenbild Herkunft, Gemeinschaft & Vitalität" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt kaufen</a>
    </div>
  ),
  kinder: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Seelenbild · Original</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "1.2rem" }}>
        Kinder & Kreativität
      </h2>
      <img src="/kinder.png" alt="Kinder & Kreativität"
        onClick={() => window.open("/kinder.png", "_blank")}
        style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 18, marginBottom: "1.5rem", cursor: "zoom-in", boxShadow: "0 12px 36px rgba(110,77,66,0.18)", background: "#3D2820" }} />
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1.5rem", fontStyle: "italic" }}>
        Das Tor zur schöpferischen Quelle — wo das innere Kind tanzt und die Welt mit neuen Augen sieht. Die frischen Grün- und Blautöne aktivieren die Bagua-Zone der Kreativität und der Kinder. Ein kraftvoller Begleiter für alle, die ihre schöpferische Energie wieder entfachen möchten.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.85, marginBottom: "2rem" }}>
        Feng Shui energetisiert · Acryl auf Leinwand · Einzelstück
      </p>
      <a onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("openModal", { detail: { type: "kaufen" } })); }} href="#" data-art="Seelenbild Kinder & Kreativität" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt kaufen</a>
    </div>
  ),
  spanische_taenzerin: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Seelenbild · Original</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "1.2rem" }}>
        Spanische Tänzerin
      </h2>
      <img src="/spanische_taenzerin.png" alt="Spanische Tänzerin"
        onClick={() => window.open("/spanische_taenzerin.png", "_blank")}
        style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 18, marginBottom: "1.5rem", cursor: "zoom-in", boxShadow: "0 12px 36px rgba(110,77,66,0.18)", background: "#3D2820" }} />
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "1.5rem", fontStyle: "italic" }}>
        Leidenschaft, Stolz, das pulsierende Herz des Flamencos — eingefangen in einem Wirbel aus Rot und Bewegung. Diese Tänzerin verkörpert die ungebändigte weibliche Kraft, die in jeder von uns schlummert. Ein Bild für alle, die ihre innere Wildheit ehren und sichtbar werden lassen möchten.
      </p>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.88rem", lineHeight: 1.85, marginBottom: "2rem" }}>
        Energetisch geladen · Öl auf Leinwand · Einzelstück
      </p>
      <a onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("openModal", { detail: { type: "kaufen" } })); }} href="#" data-art="Seelenbild Spanische Tänzerin" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt kaufen</a>
    </div>
  ),
  kontakt: (
    <div>
      <p style={{ fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A055", marginBottom: "0.8rem" }}>Dein erster Schritt</p>
      <h2 style={{ fontFamily: serif, color: "#6F4D42", fontSize: "2.2rem", lineHeight: 1.15, fontWeight: 400, marginBottom: "1.2rem" }}>
        Jetzt Buchen
      </h2>
      <p style={{ fontFamily: sans, color: "#9C7B6E", fontSize: "0.92rem", lineHeight: 1.85, marginBottom: "2rem" }}>
        Ein kostenfreies, unverbindliches Gespräch — nur Raum für dich. Lass uns gemeinsam schauen, was du gerade brauchst und ob wir gut zusammenpassen.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.5rem" }}>
        {[
          { l: "Dauer", v: "ca. 30 Minuten" },
          { l: "Format", v: "Online via Video oder Telefon" },
          { l: "Investition", v: "Kostenlos · unverbindlich" },
        ].map(item => (
          <div key={item.l} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: 14, background: "rgba(253,240,230,0.5)", border: "1px solid rgba(233,195,138,0.20)" }}>
            <span style={{ fontFamily: sans, fontSize: "0.78rem", color: "#9C7B6E", letterSpacing: "0.05em" }}>{item.l}</span>
            <span style={{ fontFamily: serif, fontSize: "0.92rem", color: "#6F4D42", fontStyle: "italic" }}>{item.v}</span>
          </div>
        ))}
      </div>
      <a href="mailto:hallo@larentina.de" style={{
        display: "block", textAlign: "center",
        padding: "1rem 2rem", borderRadius: 100,
        background: "linear-gradient(150deg, #D89A93 0%, #C88880 50%, #B87870 100%)",
        color: "#FDF6F2", fontFamily: sans, fontSize: "0.85rem", letterSpacing: "0.08em",
        textDecoration: "none",
        boxShadow: "0 0 0 1px rgba(233,195,138,0.75), 0 0 0 2.5px rgba(201,160,85,0.15), 0 6px 22px rgba(217,154,147,0.30)",
      }}>Jetzt Termin per Email anfragen</a>
    </div>
  ),
};

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("kontakt");

  useEffect(() => {
    const handler = (e) => {
      setModalType(e.detail?.type || "kontakt");
      setModalOpen(true);
    };
    window.addEventListener("openModal", handler);
    return () => window.removeEventListener("openModal", handler);
  }, []);

  return (
    <>
      <FontStyle />
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <ServicesSection />
        <ApproachSection />
        <SeelenbilderSection />
        <AboutSection />
        <TestimonialsSection />
        <FAQSection />
        <KontaktSection />
        <FinalCTA />
      </main>
      <Footer />
      <LiquidGlassModal
        open={modalOpen}
        content={MODAL_CONTENT[modalType]}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}