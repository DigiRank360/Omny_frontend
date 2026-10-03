import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { HERO_BADGES, HERO_STRIP } from '../utils/constants';
import LaptopArt from './LaptopArt';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative min-h-[calc(100vh-65px)] w-full overflow-hidden bg-navy-950 text-white flex items-center justify-center py-12 lg:py-0"
    >
      {/* ================= BACKGROUND GRAPHICS & AMBIENT LIGHTS ================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[130px]" />
        <div className="absolute top-1/2 right-0 w-[450px] h-[450px] rounded-full bg-brand-light/15 blur-[140px]" />
        <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-600/15 blur-[120px]" />

        {/* Tech Mesh Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07]" />
        
        {/* Subtle Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/60 to-navy-950" />
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* ---------------- LEFT COLUMN: CONTENT (7 Cols on LG) ---------------- */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-7">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-light/30 bg-brand-light/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-light backdrop-blur-md shadow-inner transition-all hover:border-brand-light/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-light opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-light"></span>
              </span>
              <span className="tracking-wide uppercase font-semibold text-[11px] sm:text-xs">
                Your Trusted B2B Laptop Partner
              </span>
              <Sparkles className="h-3.5 w-3.5 text-brand-light" />
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08]">
              REFURBISHED <br />
              <span className="bg-gradient-to-r from-brand-light via-blue-300 to-indigo-200 bg-clip-text text-transparent">
                LAPTOPS
              </span>
            </h1>

            {/* Sub-Badges / Key Features */}
            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {HERO_BADGES.map((badge) => (
                <div 
                  key={badge} 
                  className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold tracking-wider text-slate-300 backdrop-blur-md uppercase"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-light" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>

            {/* Body Description */}
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300 font-normal">
              Omny X is Delhi’s premier B2B supplier of high-grade refurbished laptops. We empower 1000+ dealers across India with tested stock, margins, and pan-India warranty support.
            </p>

            {/* Feature Strip (Grid Cards) */}
            <div className="mt-8 w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {HERO_STRIP.map(([Icon, title, subtitle]) => (
                <div 
                  key={title} 
                  className="group relative flex flex-col items-center lg:items-start justify-center rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center lg:text-left backdrop-blur-md transition-all duration-300 hover:border-brand-light/40 hover:bg-white/[0.07] hover:-translate-y-1"
                >
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-light/10 text-brand-light border border-brand-light/20 transition-colors group-hover:bg-brand-light group-hover:text-navy-950">
                    <Icon size={16} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-tight text-slate-200 leading-tight">
                    {title}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 leading-tight mt-0.5">
                    {subtitle}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a 
                href="#register" 
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-brand-light px-8 py-4 text-sm font-bold text-navy-950 shadow-lg shadow-brand-light/25 transition-all duration-300 hover:bg-white hover:shadow-brand-light/40 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
              >
                <span>Become a B2B Dealer</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              
              <a 
                href="#products" 
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <span>View Live Stock</span>
              </a>
            </div>

          </div>

          {/* ---------------- RIGHT COLUMN: VISUAL ART & STATS (5 Cols on LG) ---------------- */}
          <div className="relative flex items-center justify-center lg:col-span-5 lg:justify-end mt-8 lg:mt-0">
            
            {/* Main Hero Illustration Container */}
            <div className="relative w-full max-w-2xl lg:max-w-none">
              
              {/* Soft glow behind Laptop Artwork */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-light/20 to-blue-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative transition-transform duration-500 hover:scale-[1.01]">
                <LaptopArt />
              </div>

              {/* Glassmorphic Floating Trust Badge (Bottom Left/Center) */}
              <div className="absolute bottom-3 left-3 z-20 flex max-w-[calc(100%-1.5rem)] items-center gap-3 rounded-xl border border-white/20 bg-navy-900/90 p-3 shadow-2xl backdrop-blur-xl ring-1 ring-white/10 sm:bottom-5 sm:left-5 sm:gap-4 sm:rounded-2xl sm:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-light to-blue-600 text-navy-950 shadow-md sm:h-12 sm:w-12 sm:rounded-xl">
                  <ShieldCheck size={23} className="text-navy-950 sm:h-[26px] sm:w-[26px]" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black tracking-tight text-white sm:text-2xl">1000+</span>
                    <span className="text-xs font-bold text-brand-light">Dealers</span>
                  </div>
                  <p className="text-[10px] font-medium leading-tight text-slate-300 sm:text-[11px]">
                    Trusted B2B Network across India
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}