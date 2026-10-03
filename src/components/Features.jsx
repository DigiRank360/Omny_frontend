import { FEATURES } from '../utils/constants';
export default function Features() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto mb-8 max-w-7xl px-4 text-center sm:mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">Your OMNY X toolkit</p>
        <h2 className="mx-auto mt-2 max-w-2xl text-2xl font-extrabold leading-tight text-navy-950 sm:text-3xl">From first invoice to final delivery, <span className="text-brand">it’s all here.</span></h2>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
        {FEATURES.map(([I, t, d]) => (
          <article key={t} className="group relative isolate flex min-h-32 items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-brand-50/50 hover:shadow-[0_10px_30px_rgba(17,118,184,0.16)] motion-reduce:transform-none motion-reduce:transition-none sm:p-5">
            <I size={28} className="shrink-0 text-brand transition-transform duration-300 group-hover:scale-110 group-hover:text-brand-dark motion-reduce:transition-none" strokeWidth={1.5} />
            <div className="min-w-0"><h3 className="text-sm font-bold text-navy-950">{t}</h3><p className="mt-1 text-xs leading-5 text-slate-600">{d}</p></div>
          </article>))}
      </div>
    </section>
  );
}
