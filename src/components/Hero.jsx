import { ArrowRight, BadgeCheck, Headset, IndianRupee, ScanLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import LaptopArt from './LaptopArt';

const trustHighlights = [
  { icon: ScanLine, label: '32-Point', detail: 'Quality check' },
  { icon: BadgeCheck, label: 'Transparent', detail: 'Laptop grading' },
  { icon: IndianRupee, label: 'Competitive', detail: 'Wholesale pricing' },
  { icon: Headset, label: 'Dedicated', detail: 'Dealer support' },
];

export default function Hero() {
  return (
    <section id="home" className="hero-shell relative isolate flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden bg-navy-950 text-white">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="hero-glow hero-glow-left absolute" aria-hidden="true" />
      <div className="hero-glow hero-glow-right absolute" aria-hidden="true" />

      <div className="relative mx-auto grid w-full flex-1 items-center gap-12 px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-14 lg:pt-16">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-light/30 bg-brand-light/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-sky-200">
            <span className="hero-status-dot h-1.5 w-1.5 rounded-full bg-sky-300" />
            OMNYX Global · B2B sourcing partner
          </div>

          <h1 className="text-[2.65rem] font-extrabold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-[3.65rem] xl:text-[4.15rem]">
            Trusted refurbished laptop wholesaler <span className="hero-heading-accent">in India.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Quality-checked laptops. Competitive dealer pricing. Reliable B2B supply.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
            Grow your laptop business with OMNYX Global. We help dealers, resellers, retailers and IT businesses source refurbished laptops from leading brands, with transparent grading and dedicated dealer support.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/become-a-dealer" className="btn-primary min-h-12 px-5">
              Register as a Dealer <ArrowRight size={17} />
            </Link>
            <Link to="/products" className="btn min-h-12 border border-white/25 bg-white/[0.04] px-5 text-white hover:border-white/50 hover:bg-white/10">
              Explore Wholesale Stock <ArrowRight size={16} />
            </Link>
          </div>

          <p className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-400">
            <BadgeCheck size={15} className="text-emerald-300" />
            Built for laptop dealers, resellers and IT businesses
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:ml-auto">
          <div className="hero-visual-halo absolute inset-[8%] rounded-full" aria-hidden="true" />
          <div className="hero-laptop-float relative z-10 rounded-[1.35rem] border border-white/15 bg-white/[0.07] p-2.5 shadow-[0_35px_100px_rgba(0,0,0,0.42)] backdrop-blur-sm sm:p-3.5">
            <LaptopArt />
            <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between rounded-b-[0.65rem] bg-navy-950/90 px-4 py-3 backdrop-blur-md sm:inset-x-3.5 sm:bottom-3.5">
              <span className="text-xs font-semibold tracking-wide text-white sm:text-sm">Ready for your next business order</span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 sm:text-xs">
                <BadgeCheck size={15} /> Quality checked
              </span>
            </div>
          </div>

          <div className="hero-float-card absolute -left-2 top-[12%] z-20 flex items-center gap-3 rounded-xl border border-white/15 bg-[#101c37]/90 p-3 shadow-xl backdrop-blur-md sm:-left-7 sm:p-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light/15 text-sky-200"><ScanLine size={20} /></span>
            <span><span className="block text-xs font-bold text-white sm:text-sm">32-point check</span><span className="mt-0.5 block text-[10px] text-slate-400 sm:text-xs">Every device, inspected</span></span>
          </div>

          <div className="hero-float-card hero-float-card-delayed absolute -right-1 bottom-[13%] z-20 flex items-center gap-3 rounded-xl border border-white/15 bg-[#101c37]/90 p-3 shadow-xl backdrop-blur-md sm:-right-5 sm:p-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300"><IndianRupee size={19} /></span>
            <span><span className="block text-xs font-bold text-white sm:text-sm">Dealer-first pricing</span><span className="mt-0.5 block text-[10px] text-slate-400 sm:text-xs">Competitive wholesale rates</span></span>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-5 sm:px-6 sm:py-6 lg:grid-cols-4 lg:px-8">
          {trustHighlights.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="flex items-center gap-3 px-1 py-1 sm:justify-center sm:px-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-light/20 bg-brand-light/10 text-sky-200">
                <Icon size={17} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-bold text-white sm:text-sm">{label}</span>
                <span className="mt-0.5 block text-[10px] text-slate-400 sm:text-xs">{detail}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
