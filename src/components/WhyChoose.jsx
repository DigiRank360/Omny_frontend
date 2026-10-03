import { WHY } from '../utils/constants';
export default function WhyChoose() {
  return (
    <section id="why" className="bg-white py-16 sm:py-20 lg:py-24">
      <h2 className="mb-10 text-center text-xl font-bold text-navy-950 sm:mb-12 sm:text-2xl">WHY DEALERS CHOOSE <span className="text-brand-dark">OMNY X</span></h2>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 md:grid-cols-3 lg:gap-4">
        {WHY.map(([I, t, d]) => (
            <article key={t} className="group relative flex min-h-52 min-w-0 flex-col items-center justify-center rounded-lg border border-brand-100 bg-white px-4 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand-50/70 hover:shadow-[0_10px_30px_rgba(17,118,184,0.16)] motion-reduce:transform-none motion-reduce:transition-none sm:px-5 sm:py-7">
            <I size={38} className="text-brand-dark transition-transform duration-300 group-hover:scale-110 group-hover:text-brand motion-reduce:transition-none" strokeWidth={1.5} />
            <h3 className="mt-2 text-sm font-bold uppercase">{t}</h3>
            <p className="mt-2 max-w-44 text-sm leading-5 text-slate-600">{d}</p>
          </article>))}
      </div>
    </section>
  );
}
