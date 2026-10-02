import { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { ADDRESS, EMAIL, OFFICE_TIME, PHONE } from '../utils/constants';

const contacts = [
  [MapPin, 'Address', ADDRESS],
  [Phone, 'Phone', PHONE],
  [Mail, 'Email', EMAIL],
  [Clock3, 'Office time', OFFICE_TIME],
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  const submit = event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `${category ? `${category} stock enquiry` : 'Order enquiry'} from ${form.get('firstName')} ${form.get('lastName')}`;
    const body = [
      `Name: ${form.get('firstName')} ${form.get('lastName')}`,
      `Email: ${form.get('email')}`,
      `Phone: ${form.get('phone')}`,
      `Company: ${form.get('company')}`,
      `Interested in: ${category || 'General enquiry'}`,
      `Quantity: ${form.get('quantity')}`,
      '',
      form.get('message'),
    ].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <main>
      <PageBanner title="Contact Us" />
      <section className="bg-slate-50 py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div className="pt-1">
            <h2 className="text-2xl font-extrabold text-slate-900">Send us your query</h2>
            <p className="mt-1 text-sm text-slate-500">We’d love to hear from you.</p>
            <div className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
              {contacts.map(([Icon, title, ...lines]) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-navy-900"><Icon size={21} strokeWidth={1.7} /></span>
                  <div><h3 className="text-sm font-bold text-slate-800">{title}</h3>{lines.map(line => <p key={line} className="mt-1 text-sm leading-relaxed text-slate-600">{line}</p>)}</div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="rounded-xl bg-white p-5 shadow-[0_12px_38px_rgba(15,45,75,0.08)] sm:p-8">
            <h2 className="mb-5 text-xl font-extrabold text-slate-900">Book your order now</h2>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <input className="input" name="firstName" placeholder="First name*" autoComplete="given-name" required />
              <input className="input" name="lastName" placeholder="Last name*" autoComplete="family-name" required />
              <input className="input" name="email" type="email" placeholder="Email*" autoComplete="email" required />
              <input className="input" name="phone" type="tel" placeholder="Phone*" autoComplete="tel" required />
              <input className="input" name="company" placeholder="Company*" autoComplete="organization" required />
              <select className="input" name="quantity" defaultValue="" required>
                <option value="" disabled>Choose quantity*</option>
                <option>1–5 units</option><option>6–20 units</option><option>21–50 units</option><option>50+ units</option>
              </select>
              <textarea className="input min-h-28 resize-y sm:col-span-2" name="message" placeholder="Additional message" defaultValue={category ? `I'm interested in current stock for ${category}.` : ''} />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              {sent && <p className="flex items-center gap-1.5 text-xs text-emerald-700"><CheckCircle2 size={16} /> Your email app is opening with your enquiry.</p>}
              <button className="btn-primary ml-auto" type="submit">Submit <ArrowRight size={16} /></button>
            </div>
          </form>
        </div>
        <div className="mx-auto mt-10 w-full max-w-7xl px-4 lg:mt-12">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">Visit our office</p><h2 className="mt-1 text-xl font-extrabold text-navy-950">Find us in Nehru Place</h2></div>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noreferrer" className="hidden text-sm font-semibold text-brand-dark hover:text-brand underline-offset-4 hover:underline sm:block">Open in Google Maps</a>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <iframe
              title={`Map showing ${ADDRESS}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
              className="h-[280px] w-full sm:h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-brand-dark underline-offset-4 hover:text-brand hover:underline sm:hidden">Open in Google Maps</a>
        </div>
      </section>
    </main>
  );
}