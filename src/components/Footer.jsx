import { useState } from 'react';
import { ArrowRight, Clock3, Facebook, Globe, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { ADDRESS, EMAIL, OFFICE_TIME, PHONE } from '../utils/constants';

const destinations = {
  Home: '/',
  'About Us': '/about-us',
  'Our Products': '/products',
  'Refurbished Laptops': '/products',
  'Bulk Laptop Supply': '/products',
  'Dealer & Reseller Supply': '/become-a-dealer',
  'IT Hardware Supply': '/products',
  'Business Laptop Solutions': '/products',
  'Pan-India Dispatch': '/support#dispatch',
  'Dealer Registration': '/become-a-dealer',
  'Become an Authorized Partner': '/become-a-dealer',
  'Quality Check': '/quality-check',
  'Privacy Policy': '/privacy-policy',
  'Terms & Conditions': '/terms-and-conditions',
  'Return Policy': '/return-policy',
  'Shipping Policy': '/shipping-policy',
  'Warranty & Returns': '/support#warranty',
  'Dispatch & Tracking': '/support#dispatch',
  'After Sales Support': '/support#after-sales',
  Helpdesk: '/support',
  'Contact Us': '/contact',
};

const footerGroups = [
  { title: 'Quick Links', links: ['Home', 'About Us', 'Our Products', 'Dealer Registration', 'Become an Authorized Partner', 'Contact Us'] },
  { title: 'B2B Solutions', links: ['Refurbished Laptops', 'Bulk Laptop Supply', 'Dealer & Reseller Supply', 'IT Hardware Supply', 'Business Laptop Solutions', 'Pan-India Dispatch'] },
  { title: 'For Dealers', links: ['Dealer Registration', 'Become an Authorized Partner', 'Bulk Laptop Supply', 'Dealer & Reseller Supply'] },
  { title: 'Policies', links: ['Privacy Policy', 'Terms & Conditions', 'Return Policy', 'Shipping Policy'] },
];

const contactActions = [
  { label: 'Instagram', href: 'https://www.instagram.com/wholesale_laptop_dealer_omnyx/?hl=en', Icon: Instagram, external: true },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591203831056', Icon: Facebook, external: true },
  { label: 'Email OMNY X', href: `mailto:${EMAIL}`, Icon: Mail },
  { label: 'Call OMNY X', href: `tel:${PHONE.replace(/\s/g, '')}`, Icon: Phone },
  { label: 'Visit OMNY X website', href: 'https://omnyxglobal.in/', Icon: Globe },
  { label: 'Find OMNY X in Nehru Place', href: `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`, Icon: MapPin },
];

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);

  const submitNewsletter = event => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('newsletterEmail');
    const subject = 'OMNY X newsletter subscription request';
    const body = `Please add ${email} to OMNY X updates. I acknowledge the Terms & Conditions.`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <footer id="footer" className="relative overflow-hidden border-t border-brand-light/40 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 text-white">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-[minmax(0,0.85fr)_minmax(260px,1.15fr)] sm:gap-10">
            <div>
              <Logo size="text-4xl sm:text-5xl" />
              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">Smart refurbished laptops designed for performance, affordability, and sustainability.</p>
              <h2 className="mt-6 text-sm font-bold">Stay Tuned</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {contactActions.map(({ label, href, Icon, external }) => <a key={label} href={href} aria-label={label} title={label} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] text-slate-300 transition duration-200 hover:border-brand-light/60 hover:bg-brand/15 hover:text-white"><Icon size={17} /></a>)}
              </div>
            </div>

            <address className="grid content-start gap-4 border-t border-white/10 pt-5 text-sm not-italic leading-6 text-slate-300 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
              <p className="flex items-start gap-3"><MapPin size={17} className="mt-1 shrink-0 text-brand-light" /><span>{ADDRESS}</span></p>
              <a className="flex items-center gap-3 transition hover:text-white" href={`tel:${PHONE.replace(/\s/g, '')}`}><Phone size={16} className="shrink-0 text-brand-light" /><span>{PHONE}</span></a>
              <a className="flex items-center gap-3 break-all transition hover:text-white" href={`mailto:${EMAIL}`}><Mail size={16} className="shrink-0 text-brand-light" /><span>{EMAIL}</span></a>
              <p className="flex items-start gap-3"><Clock3 size={16} className="mt-0.5 shrink-0 text-brand-light" /><span>{OFFICE_TIME}</span></p>
            </address>
          </div>

          <div className="border-t border-white/10 pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <h2 className="text-base font-bold">Register For Our Updates!</h2>
            <form onSubmit={submitNewsletter} className="mt-4 w-full">
              <div className="flex min-h-12 overflow-hidden rounded-md bg-white shadow-lg shadow-black/10 focus-within:ring-2 focus-within:ring-brand-light">
                <label className="sr-only" htmlFor="newsletter-email">Email address</label>
                <input id="newsletter-email" className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:ring-0" name="newsletterEmail" type="email" placeholder="Enter your email address" required />
                <button className="flex w-12 shrink-0 items-center justify-center bg-brand text-white transition hover:bg-brand-dark sm:w-14" type="submit" aria-label="Submit email for updates"><ArrowRight size={20} strokeWidth={2.5} /></button>
              </div>
              <label className="mt-4 flex max-w-full cursor-pointer items-start gap-2 text-xs leading-5 text-slate-300"><input className="mt-0.5 h-4 w-4 shrink-0 accent-brand-light" type="checkbox" required /><span>I acknowledge the <Link to="/terms-and-conditions" className="text-white underline underline-offset-2 hover:text-brand-light">Terms &amp; Conditions</Link></span></label>
              {submitted && <p role="status" className="mt-2 text-xs text-white">Your email app is ready to send the updates request.</p>}
            </form>
          </div>
        </div>

        <div className="border-t border-white/15 py-8 sm:py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_1.1fr_1fr_0.9fr_1fr] lg:gap-8">
            {footerGroups.map(({ title, links }) => <div key={title}>
              <h3 className="mb-4 flex items-center gap-2 text-base font-bold"><span className="h-4 w-1 rounded-full bg-brand-light" />{title}</h3>
              <ul className="space-y-3 text-sm text-slate-300">{links.map(label => <li key={label}><Link to={destinations[label]} className="transition hover:text-brand-light">{label}</Link></li>)}</ul>
            </div>)}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-base font-bold"><span className="h-4 w-1 rounded-full bg-brand-light" />Partner With Us</h3>
              <div className="rounded-xl border border-brand-light/30 bg-white/[0.06] p-5 shadow-lg shadow-black/10">
                <p className="text-sm leading-6 text-slate-300">Grow your business with Omnyx. Join our dealer and reseller network today.</p>
                <Link to="/become-a-dealer" className="btn-primary mt-5">Register as Dealer <ArrowRight size={15} /></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} omnyxglobal.in All Rights Reserved</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2"><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link><span aria-hidden="true" className="text-brand-light">|</span><Link to="/terms-and-conditions" className="hover:text-white">Terms &amp; Conditions</Link></div>
        </div>
      </div>
    </footer>
  );
}
