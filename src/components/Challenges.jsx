import { X, Check, Handshake } from 'lucide-react';
import { PROBLEMS, SOLUTIONS } from '../utils/constants';
export default function Challenges() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 lg:grid-cols-[1fr_280px]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div>
              <h2 className="mb-5 text-center text-lg font-bold text-slate-900 sm:text-xl">WE UNDERSTAND YOUR <span className="text-red-600">CHALLENGES</span></h2>
              <ul className="space-y-2.5 text-sm leading-5 text-slate-700">{PROBLEMS.map(p => <li key={p} className="flex items-start gap-2"><X size={16} className="mt-0.5 shrink-0 rounded-full border border-red-500 p-0.5 text-red-600" />{p}</li>)}</ul>
            </div>
            <div className="text-6xl font-extrabold italic"><span className="text-brand">V</span><span className="text-red-600">s</span></div>
            <div>
              <h2 className="mb-5 text-center text-lg font-bold text-slate-900 sm:text-xl">HOW <span className="text-brand-dark">OMNY X</span> SOLVES THEM</h2>
              <ul className="space-y-2.5 text-sm leading-5 text-slate-700">{SOLUTIONS.map(p => <li key={p} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 rounded-full border border-emerald-600 p-0.5 text-emerald-700" />{p}</li>)}</ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg bg-navy-900 p-6 text-center text-white">
          <Handshake size={56} className="text-brand-light" strokeWidth={1.3} />
          <h3 className="mt-3 text-2xl font-extrabold leading-tight"><span className="text-brand-light">YOU SELL.</span><br />WE HANDLE THE<br />SUPPLY CHAIN.</h3>
          <p className="mt-3 text-xs text-slate-300">Focus on your customers.<br />Leave the rest to Omny X.</p>
        </div>
      </div>
    </section>
  );
}
