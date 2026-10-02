import { FEATURES } from '../utils/constants';
export default function Features() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
        {FEATURES.map(([I, t, d]) => (
          <article key={t} className="group relative isolate flex min-h-32 items-start gap-3 rounded-lg border border-transparent bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-100 hover:shadow-[0_10px_30px_rgba(17,118,184,0.16)] motion-reduce:transform-none motion-reduce:transition-none sm:p-5">
            <I size={28} className="shrink-0 text-brand transition-transform duration-300 group-hover:scale-110 group-hover:text-brand-dark motion-reduce:transition-none" strokeWidth={1.5} />
            <div className="min-w-0"><h3 className="text-sm font-bold text-navy-950">{t}</h3><p className="mt-1 text-xs leading-5 text-slate-600">{d}</p></div>
          </article>))}
      </div>
    </section>
  );
}
