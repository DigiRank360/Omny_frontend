import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, Check, ChevronDown, ClipboardCheck, Headphones, Laptop, PackageSearch, Search, ShieldCheck, Truck, Users, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';
import { PHONE, SOLUTIONS, WHY } from '../utils/constants';

const pageData = {
  why: {
    title: 'Why OMNY X',
    description: 'A dependable B2B partner for refurbished laptops, backed by consistent quality and dealer-first support.',
    heading: 'Built around the way dealers work',
    intro: 'Reliable stock, clear grading and accountable after-sales support help you serve your customers with confidence.',
    items: WHY.map(([Icon, title, description]) => ({ Icon, title, description })),
  },
  quality: {
    title: 'Quality Check',
    description: 'Every device follows a documented inspection and grading process before dispatch.',
    heading: 'A clear check at every stage',
    intro: 'Our 32-point quality process helps dealers understand device condition before it reaches their customer.',
    items: [
      { Icon: Laptop, title: 'Hardware inspection', description: 'Key components, ports, keyboard, display and battery are inspected.' },
      { Icon: ClipboardCheck, title: 'Functional testing', description: 'Core device functions are checked and recorded before grading.' },
      { Icon: BadgeCheck, title: 'Transparent grading', description: 'Devices are graded consistently so condition is easier to communicate.' },
      { Icon: ShieldCheck, title: 'Dispatch verification', description: 'Serial details and packaging are checked before every shipment.' },
    ],
  },
  about: {
    title: 'About OMNY X',
    description: 'Technology for everyone, supplied with the consistency that businesses need.',
    heading: 'Refurbished technology, made dependable',
    intro: 'OMNY X supports dealers across India with quality-checked laptops, transparent business terms and a team that stays available after dispatch.',
    items: [
      { Icon: Laptop, title: 'Business-ready devices', description: 'A focused range of refurbished laptops and IT essentials for resale.' },
      { Icon: ShieldCheck, title: 'Accountable quality', description: 'Documented checks and clear grades bring confidence to every order.' },
      { Icon: Truck, title: 'Service across India', description: 'Trackable dispatch and responsive support for dealer partners.' },
    ],
  },
};

function FeaturePage({ data }) {
  return (
    <main>
      <PageBanner title={data.title} description={data.description} />
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">{data.heading}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{data.intro}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map(({ Icon, title, description }) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand"><Icon size={21} /></span>
                <h3 className="mt-4 font-bold text-navy-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
          <Link to="/become-a-dealer" className="btn-primary mt-8">Partner with us <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}

export function WhyOmnyX() {
  return (
    <main>
      <PageBanner title={pageData.why.title} description={pageData.why.description} />
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 border-b border-slate-200 pb-8 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)] md:items-end md:gap-12">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">A better way to source</p>
              <h2 className="mt-2 text-2xl font-extrabold leading-tight text-navy-950 sm:text-3xl">{pageData.why.heading}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{pageData.why.intro}</p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-brand-200 rounded-md border border-brand-200 bg-brand-50">
              <div className="px-3 py-4 text-center sm:px-4"><p className="text-lg font-extrabold text-brand-dark sm:text-xl">32-point</p><p className="mt-1 text-[10px] leading-4 text-slate-600 sm:text-xs">quality check</p></div>
              <div className="px-3 py-4 text-center sm:px-4"><p className="text-lg font-extrabold text-brand-dark sm:text-xl">A+ to C</p><p className="mt-1 text-[10px] leading-4 text-slate-600 sm:text-xs">clear grading</p></div>
              <div className="px-3 py-4 text-center sm:px-4"><p className="text-lg font-extrabold text-brand-dark sm:text-xl">45 days</p><p className="mt-1 text-[10px] leading-4 text-slate-600 sm:text-xs">dealer warranty</p></div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pageData.why.items.map(({ Icon, title, description }, index) => (
              <article key={title} className="group flex min-w-0 gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md sm:p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white"><Icon size={21} /></span>
                <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">Benefit 0{index + 1}</p><h3 className="mt-1 text-base font-bold text-navy-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-lg bg-navy-950 px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div><h2 className="text-base font-bold">Ready to work with a dependable supply partner?</h2><p className="mt-1 text-sm leading-5 text-slate-300">Get started with OMNY X dealer registration.</p></div>
            <Link to="/become-a-dealer" className="btn-primary w-fit shrink-0">Partner with us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export function QualityCheck() {
  const checks = SOLUTIONS.filter(item => item.toLowerCase().includes('quality') || item.toLowerCase().includes('serial') || item.toLowerCase().includes('packaging'));
  const items = [...pageData.quality.items, ...checks.map(description => ({ Icon: Check, title: 'Dealer-ready records', description }))];

  return (
    <main>
      <PageBanner title={pageData.quality.title} description={pageData.quality.description} />
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 border-b border-slate-200 pb-8 md:grid-cols-[minmax(0,1fr)_minmax(240px,0.65fr)] md:items-end md:gap-12">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">Quality assurance</p>
              <h2 className="mt-2 text-2xl font-extrabold leading-tight text-navy-950 sm:text-3xl">{pageData.quality.heading}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{pageData.quality.intro}</p>
            </div>
            <div className="flex items-center gap-4 rounded-md border border-brand-200 bg-brand-50 p-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-brand text-white"><ClipboardCheck size={23} /></span>
              <div><p className="text-xl font-extrabold text-brand-dark">32-point</p><p className="text-xs leading-5 text-slate-600">inspection before grading and dispatch</p></div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(({ Icon, title, description }, index) => (
              <article key={`${title}-${index}`} className="group flex min-w-0 gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md sm:p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white"><Icon size={21} /></span>
                <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">Check 0{index + 1}</p><h3 className="mt-1 text-base font-bold text-navy-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-lg bg-navy-950 px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div><h2 className="text-base font-bold">Need dependable stock for your business?</h2><p className="mt-1 text-sm leading-5 text-slate-300">Explore the dealer program and available inventory.</p></div>
            <Link to="/become-a-dealer" className="btn-primary w-fit shrink-0">Become a dealer <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export function AboutUs() {
  const assurances = [
    { Icon: ShieldCheck, title: 'Best quality assurance', description: 'Every refurbished laptop is thoroughly inspected, tested, and certified.' },
    { Icon: BadgeCheck, title: 'Trusted tech experts', description: 'Our experienced refurbishment specialists and support team ensure every laptop reaches you in excellent condition.' },
  ];
  const process = [
    { Icon: ClipboardCheck, title: 'Rigorous testing & inspection', description: 'Each laptop undergoes detailed hardware diagnostics, performance checks, and quality inspection to ensure smooth functionality and durability.' },
    { Icon: Wrench, title: 'Professional refurbishment', description: 'Our certified technicians clean, repair, upgrade, and optimize every laptop to meet performance standards before it reaches you.' },
    { Icon: Truck, title: 'Quality confirmed & delivered', description: 'Once approved, laptops are securely packaged, backed with warranty support, and delivered ready to use with complete peace of mind.' },
  ];

  return (
    <main>
      <PageBanner title={pageData.about.title} description={pageData.about.description} />
      <section className="overflow-hidden bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div className="relative mx-auto h-[300px] w-full max-w-[560px] sm:h-[400px]">
            <img src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=85" alt="Laptop prepared for work and everyday use" className="absolute left-0 top-8 h-[76%] w-[65%] rounded-lg border-4 border-white object-cover object-[72%_center] shadow-lg" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85" alt="Refurbished laptop on a desk" className="absolute right-0 top-0 h-[82%] w-[72%] rounded-lg border-4 border-white object-cover shadow-xl" fetchPriority="high" />
            <div className="absolute bottom-0 right-2 flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-3 shadow-lg sm:right-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand"><Users size={18} /></span>
              <span><b className="block text-sm font-extrabold text-navy-950">1,500+</b><span className="block text-[10px] font-medium text-slate-500">Satisfied clients</span></span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">About OMNYX</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-navy-950 sm:text-4xl">Refurbished tech you can <span className="text-brand">trust</span></h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">At Omnyx, we specialize in delivering high-quality refurbished laptops that combine performance, reliability, and affordability. Each device goes through a strict refurbishment and testing process to ensure dependable performance for work, study, and everyday use.</p>
            <div className="mt-6 space-y-5">
              {assurances.map(({ Icon, title, description }) => <div key={title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-white"><Icon size={17} /></span>
                <div><h2 className="text-sm font-bold text-navy-950">{title}</h2><p className="mt-1 text-xs leading-5 text-slate-600">{description}</p></div>
              </div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-4 border-b border-slate-200 pb-6 sm:grid-cols-2 sm:items-end sm:gap-10">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">Why choose OMNYX</p><h2 className="mt-2 text-2xl font-extrabold text-navy-950 sm:text-3xl">Our refurbished laptop process</h2></div>
            <p className="text-sm leading-6 text-slate-600">At Omnyx, we follow a transparent and quality-driven refurbishment process to ensure every laptop delivers reliable performance, long-term usability, and complete customer satisfaction.</p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {process.map(({ Icon, title, description }, index) => <article key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white"><Icon size={19} /></span>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-wide text-brand">Step 0{index + 1}</p>
              <h3 className="mt-1 text-sm font-bold text-navy-950">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">{description}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">State of affairs</p><h2 className="mt-2 max-w-md text-2xl font-extrabold leading-tight text-navy-950 sm:text-3xl">Keeping you powered with smart refurbished laptops</h2></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="overflow-hidden rounded-lg border border-white bg-white shadow-sm">
              <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80" alt="Laptop ready for a customer" className="h-36 w-full object-cover" loading="lazy" />
              <div className="px-4 py-3 text-center"><p className="text-2xl font-extrabold text-navy-950">50,000+</p><p className="mt-1 text-xs text-slate-600">Happy customers served</p></div>
            </article>
            <article className="overflow-hidden rounded-lg border border-white bg-white shadow-sm">
              <img src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80" alt="Laptop from leading technology brands" className="h-36 w-full object-cover" loading="lazy" />
              <div className="px-4 py-3 text-center"><p className="text-2xl font-extrabold text-navy-950">6+</p><p className="mt-1 text-xs text-slate-600">Leading laptop brands available</p></div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export function Products() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = useMemo(() => [...new Set(products.map(product => product.category?.name).filter(Boolean))].sort(), [products]);
  const filtered = useMemo(() => products.filter(product => {
    const matchesCategory = category === 'All categories' || product.category?.name === category;
    const searchable = `${product.name} ${product.brand} ${product.model || ''} ${product.category?.name || ''}`;
    return matchesCategory && searchable.toLowerCase().includes(query.trim().toLowerCase());
  }), [products, category, query]);

  useEffect(() => {
    let active = true;
    api.get('/store/products')
      .then(({ data }) => { if (active) setProducts(data); })
      .catch(() => { if (active) setProducts([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <main>
      <PageBanner title="Products" description="Browse quality-checked products currently available to OMNY X dealer partners." />
      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div><h2 className="text-2xl font-extrabold text-navy-950">Available inventory</h2><p className="mt-1 text-sm text-slate-600">Availability and grades vary by lot. Contact us for current stock.</p></div>
            <div className="grid gap-2 sm:grid-cols-[minmax(210px,1fr)_190px]">
              <label className="relative"><span className="sr-only">Search products</span><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input className="input pl-9" placeholder="Search products" value={query} onChange={event => setQuery(event.target.value)} /></label>
              <label className="relative"><span className="sr-only">Filter by category</span><select className="input appearance-none pr-9" value={category} onChange={event => setCategory(event.target.value)}><option>All categories</option>{categories.map(name => <option key={name}>{name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} /></label>
            </div>
          </div>
          {filtered.length ? <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{filtered.map(product => <ProductCard key={product._id} product={product} />)}</div> : <div className="py-16 text-center"><PackageSearch className="mx-auto text-slate-300" size={36} /><p className="mt-3 font-semibold text-navy-950">{loading ? 'Loading inventory…' : query || category !== 'All categories' ? 'No products match your search.' : 'No products are listed right now.'}</p><p className="mt-1 text-sm text-slate-500">{loading ? 'Please wait a moment.' : 'Contact our team to ask about upcoming stock.'}</p></div>}
        </div>
      </section>
    </main>
  );
}

const faqs = [
  { id: 'warranty', question: 'How does the dealer warranty work?', answer: 'Dealer warranty support is available for eligible purchases. Contact the team with your invoice and device serial number so they can confirm the applicable terms.' },
  { id: 'dispatch', question: 'How can I track an order?', answer: 'Dispatch details and tracking information are shared by the sales team after an order is shipped.' },
  { id: 'after-sales', question: 'Can I get repair or parts support?', answer: 'The support team can help with eligible warranty claims, repairs and parts enquiries. Share your purchase details when you contact us.' },
  { id: 'returns', question: 'How do returns and replacements work?', answer: 'Return and replacement eligibility depends on the order and issue reported. Contact the team promptly with your invoice and a description of the issue.' },
];

export function Support() {
  const [open, setOpen] = useState(faqs[0].id);
  return (
    <main>
      <PageBanner title="Dealer Support" description="Help with orders, dispatch, warranty and after-sales service." />
      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_320px]">
          <div><h2 className="text-2xl font-extrabold text-navy-950">Common questions</h2><div className="mt-5 divide-y divide-slate-200 border-y border-slate-200 bg-white">
            {faqs.map(faq => <article id={faq.id} key={faq.id} className="px-4 sm:px-5"><button type="button" aria-expanded={open === faq.id} onClick={() => setOpen(current => current === faq.id ? '' : faq.id)} className="flex w-full items-center justify-between gap-4 py-4 text-left font-bold text-navy-950"><span>{faq.question}</span><ChevronDown size={18} className={`shrink-0 transition-transform ${open === faq.id ? 'rotate-180' : ''}`} /></button>{open === faq.id && <p className="max-w-3xl pb-5 text-sm leading-6 text-slate-600">{faq.answer}</p>}</article>)}
          </div></div>
          <aside className="h-fit rounded-lg bg-navy-950 p-6 text-white"><Headphones className="text-brand-light" size={28} /><h2 className="mt-4 text-lg font-extrabold">Talk to our team</h2><p className="mt-2 text-sm leading-6 text-slate-300">For order-specific help, keep your invoice and serial number handy.</p><a className="btn-primary mt-5 w-full" href={`tel:${PHONE.replace(/\s/g, '')}`}>Call {PHONE}</a><Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-light">Send an enquiry <ArrowRight size={15} /></Link></aside>
        </div>
      </section>
    </main>
  );
}

export function DealerLogin() {
  return (
    <main>
      <PageBanner title="Dealer Login" description="Dealer account access is provided by our onboarding team after registration approval." />
      <section className="bg-slate-50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-50 text-brand"><ShieldCheck size={23} /></span>
          <h2 className="mt-5 text-2xl font-extrabold text-navy-950">Access for approved dealer partners</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Online dealer credentials are not enabled yet. Register your business or contact our team to check your account status. We won’t ask you to use an admin account to access dealer services.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link to="/become-a-dealer" className="btn-primary">Register as a dealer <ArrowRight size={16} /></Link><a href={`https://wa.me/${PHONE.replace(/\D/g, '')}?text=${encodeURIComponent('Hi, I need help with dealer account access.')}`} target="_blank" rel="noreferrer" className="btn border border-slate-300 text-navy-950 hover:bg-slate-50">Request account help</a></div>
        </div>
      </section>
    </main>
  );
}