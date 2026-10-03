import { useEffect, useState } from 'react';
import { ArrowRight, BadgeCheck, Building2, Headphones, Loader2, LogOut, PackageCheck, Search, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import PageBanner from '../components/PageBanner';
import ProductCard from '../components/ProductCard';
import { dealerApi, errMsg } from '../utils/api';
import { PHONE } from '../utils/constants';

function DealerSignIn({ onSignedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async event => {
    event.preventDefault();
    setBusy(true);
    try {
      const { data } = await dealerApi.post('/dealer/auth/login', { email, password });
      localStorage.setItem('omnyx_dealer_token', data.token);
      const profile = await dealerApi.get('/dealer/me');
      window.dispatchEvent(new Event('omnyx-dealer-auth'));
      onSignedIn(profile.data);
    } catch (error) {
      localStorage.removeItem('omnyx_dealer_token');
      window.dispatchEvent(new Event('omnyx-dealer-auth'));
      toast.error(errMsg(error));
    }
    finally { setBusy(false); }
  };

  return <main>
    <PageBanner title="Dealer Portal" description="Sign in to view your account and current dealer inventory." />
    <section className="bg-slate-50 px-4 py-12 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.1)] md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between bg-navy-950 p-7 text-white sm:p-9">
          <div><span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/20 text-brand-light"><ShieldCheck size={24} /></span><p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-brand-light">OMNYX partner access</p><h2 className="mt-2 text-3xl font-extrabold leading-tight">A better view of your dealer business.</h2><p className="mt-4 text-sm leading-6 text-slate-300">Check your approved account, browse available stock and connect with our team when you need help.</p></div>
          <div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-lg border border-white/10 bg-white/5 p-3"><PackageCheck size={18} className="text-brand-light" /><p className="mt-2 text-xs font-semibold">Live inventory</p></div><div className="rounded-lg border border-white/10 bg-white/5 p-3"><Headphones size={18} className="text-brand-light" /><p className="mt-2 text-xs font-semibold">Dealer support</p></div></div>
        </div>
        <form onSubmit={submit} className="p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-wide text-brand">Welcome back</p><h2 className="mt-2 text-2xl font-extrabold text-navy-950">Sign in to your account</h2><p className="mt-2 text-sm leading-6 text-slate-600">Use the email and password created during registration. Access activates after admin approval.</p>
          <label className="mt-7 block text-sm font-semibold text-slate-700">Email address<input className="input mt-2" type="email" autoComplete="email" placeholder="you@business.com" value={email} onChange={event => setEmail(event.target.value)} required /></label>
          <label className="mt-4 block text-sm font-semibold text-slate-700">Password<input className="input mt-2" type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={event => setPassword(event.target.value)} required /></label>
          <button type="submit" disabled={busy} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60">{busy ? <Loader2 size={17} className="animate-spin" /> : <>Sign in securely <ArrowRight size={16} /></>}</button>
          <p className="mt-5 text-center text-xs leading-5 text-slate-500">Not approved yet or forgot your password? <a className="font-semibold text-brand-dark hover:underline" href={`https://wa.me/${PHONE.replace(/\D/g, '')}?text=${encodeURIComponent('Hi, I need help with my OMNYX dealer portal access.')}`} target="_blank" rel="noreferrer">Contact dealer support</a></p>
        </form>
      </div>
    </section>
  </main>;
}

function DealerDashboard({ dealer, onLogout }) {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    dealerApi.get('/store/products')
      .then(({ data }) => { if (active) setProducts(data); })
      .catch(error => { if (active) toast.error(errMsg(error)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filteredProducts = products.filter(product => `${product.name} ${product.brand} ${product.model || ''} ${product.category?.name || ''}`.toLowerCase().includes(query.trim().toLowerCase()));

  return <main>
    <section className="bg-navy-950 py-14 text-white sm:py-16 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 sm:flex-row sm:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-light">Dealer workspace</p><h1 className="mt-2 text-3xl font-extrabold">Welcome, {dealer.fullName}</h1><p className="mt-2 text-sm text-slate-300">{dealer.businessName} <span className="mx-1 text-slate-500">·</span> {dealer.city}, {dealer.state}</p></div>
        <button type="button" onClick={onLogout} className="btn w-fit border border-white/30 text-white hover:bg-white/10"><LogOut size={16} />Sign out</button>
      </div>
    </section>
    <section className="bg-slate-50 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-lg border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-600">Account status</p><BadgeCheck className="text-emerald-600" size={20} /></div><p className="mt-3 text-xl font-extrabold capitalize text-emerald-700">{dealer.status}</p><p className="mt-1 text-xs text-slate-500">Approved dealer account</p></article>
          <article className="rounded-lg border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-600">Available products</p><PackageCheck className="text-brand" size={20} /></div><p className="mt-3 text-3xl font-extrabold text-navy-950">{loading ? '—' : products.length}</p><p className="mt-1 text-xs text-slate-500">Current published inventory</p></article>
          <article className="rounded-lg border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-600">Business profile</p><Building2 className="text-brand" size={20} /></div><p className="mt-3 truncate text-lg font-extrabold text-navy-950">{dealer.businessName}</p><p className="mt-1 truncate text-xs text-slate-500">{dealer.email}</p></article>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-wide text-brand">Dealer inventory</p><h2 className="mt-1 text-2xl font-extrabold text-navy-950">Current available stock</h2><p className="mt-1 text-sm text-slate-600">Prices and availability can change. Contact us to confirm before placing an order.</p></div>
          <label className="relative block sm:w-72"><span className="sr-only">Search available products</span><Search size={16} className="absolute left-3 top-3 text-slate-400" /><input className="input pl-9" placeholder="Search stock" value={query} onChange={event => setQuery(event.target.value)} /></label>
        </div>
        {filteredProducts.length ? <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredProducts.map(product => <ProductCard key={product._id} product={product} dealerMode />)}</div> : <div className="mt-6 rounded-lg border border-slate-200 bg-white px-5 py-12 text-center"><PackageCheck size={32} className="mx-auto text-slate-300" /><p className="mt-3 font-semibold text-navy-950">{loading ? 'Loading current inventory…' : query ? 'No products match your search.' : 'There is no published stock right now.'}</p><p className="mt-1 text-sm text-slate-500">Contact your account team to ask about upcoming availability.</p></div>}

        <aside className="mt-10 flex flex-col gap-4 rounded-lg border border-brand-100 bg-brand-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><div className="flex items-center gap-2 text-navy-950"><Headphones size={19} className="text-brand" /><h2 className="font-bold">Need dealer support?</h2></div><p className="mt-1 text-sm text-slate-600">Our team can help confirm stock, pricing and order requirements.</p></div><a href={`https://wa.me/${PHONE.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, this is ${dealer.fullName} from ${dealer.businessName}. I need dealer support.`)}`} target="_blank" rel="noreferrer" className="btn-primary w-fit">Contact account team <ArrowRight size={16} /></a></aside>
      </div>
    </section>
  </main>;
}

export default function DealerPortal() {
  const [dealer, setDealer] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('omnyx_dealer_token');
    if (!token) {
      setChecking(false);
      return undefined;
    }
    let active = true;
    dealerApi.get('/dealer/me')
      .then(({ data }) => { if (active) setDealer(data); })
      .catch(() => {
        localStorage.removeItem('omnyx_dealer_token');
        window.dispatchEvent(new Event('omnyx-dealer-auth'));
      })
      .finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);

  const logout = () => {
    localStorage.removeItem('omnyx_dealer_token');
    window.dispatchEvent(new Event('omnyx-dealer-auth'));
    setDealer(null);
  };

  if (checking) return <main className="flex min-h-[55vh] items-center justify-center bg-slate-50"><div className="flex items-center gap-3 text-sm font-semibold text-slate-600"><Loader2 className="animate-spin text-brand" size={20} />Checking dealer session…</div></main>;
  return dealer ? <DealerDashboard dealer={dealer} onLogout={logout} /> : <DealerSignIn onSignedIn={setDealer} />;
}
