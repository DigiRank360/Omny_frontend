import { ArrowRight } from 'lucide-react';
import { HERO_BADGES, HERO_STRIP } from '../utils/constants';
import LaptopArt from './LaptopArt';
export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white">
      <div className="mx-auto grid min-h-[660px] max-w-7xl items-center gap-10 px-4 py-20 sm:py-24 lg:min-h-[620px] lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-slate-100 sm:text-lg">Your trusted B2B partner for</p>
          <h1 className="hero-title-depth mt-2 text-5xl font-extrabold leading-none sm:text-7xl">REFURBISHED<br /><span className="text-brand-light">LAPTOPS</span></h1>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold uppercase">
            {HERO_BADGES.map((b, i) => <li key={b} className={i ? 'border-l border-white/40 pl-4' : ''}>{b}</li>)}
          </ul>
          <p className="mt-6 max-w-md text-base leading-7 text-slate-200">Omny X is Delhi's leading B2B supplier of high-quality refurbished laptops for dealers across India.</p>
          <div className="mt-7 grid grid-cols-2 gap-4 rounded-lg border border-brand-light/25 bg-white/[0.06] p-4 sm:grid-cols-5">
            {HERO_STRIP.map(([I, a, b]) => <div key={a} className="flex items-center gap-2 text-[10px] font-semibold uppercase leading-tight"><I size={22} className="shrink-0" /><span>{a}<br />{b}</span></div>)}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#register" className="btn-primary">Become a B2B Dealer <ArrowRight size={16} /></a>
            <a href="#products" className="btn-outline">View Live Stock</a>
          </div>
        </div>
        <div className="relative">
          <LaptopArt />
          <div className="absolute -bottom-2 right-0 z-20 flex h-36 w-36 flex-col items-center justify-center rounded-full border-4 border-brand-light bg-navy-950 text-center shadow-lg sm:h-44 sm:w-44">
            <span className="text-[10px] font-bold uppercase">Trusted by</span>
            <span className="text-3xl font-extrabold text-brand-light">1000+</span>
            <span className="text-xs font-bold uppercase">Dealers<br />across India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
