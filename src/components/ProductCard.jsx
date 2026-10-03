import { ArrowRight, BadgeCheck, Check, CheckCircle2, ImageOff, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { dealerApi, errMsg } from '../utils/api';

export default function ProductCard({ product, dealerMode = false }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const category = product.category?.name || 'Refurbished technology';
  const description = product.description || `${product.brand}${product.model ? ` ${product.model}` : ''} · Grade ${product.grade}`;
  const hasPrice = Number(product.price) > 0;
  const price = hasPrice ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(product.price)) : 'Price on request';
  const inStock = Number(product.stock) > 0;

  const sendEnquiry = async () => {
    setBusy('enquiry');
    try {
      const { data } = await dealerApi.post('/dealer/product-enquiries', { productId: product._id });
      setConfirmation(data.emailSent
        ? 'Your enquiry has been emailed to dealer support and added to the admin notifications.'
        : 'Your enquiry is saved in admin notifications. Support email could not be sent, but the team can follow up.');
      window.dispatchEvent(new Event('omnyx-product-enquiries-updated'));
    } catch (error) {
      toast.error(errMsg(error));
    } finally {
      setBusy('');
    }
  };

  const sendSalesRequest = async () => {
    setBusy('sales');
    try {
      const { data } = await dealerApi.post('/dealer/sales-requests', { productId: product._id, quantity: Number(quantity) });
      setConfirmation(data.emailSent
        ? 'Your sales request has been emailed to the team and added to the admin notifications.'
        : 'Your request is saved in the admin notifications. The team email could not be sent, but admin can follow up.');
      window.dispatchEvent(new Event('omnyx-sales-requests-updated'));
    } catch (error) {
      toast.error(errMsg(error));
    } finally {
      setBusy('');
    }
  };

  return (
    <article
      role={dealerMode ? undefined : 'button'}
      tabIndex={dealerMode ? undefined : 0}
      onClick={dealerMode ? undefined : () => navigate(`/products/${product._id}`, { state: { product } })}
      onKeyDown={dealerMode ? undefined : event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigate(`/products/${product._id}`, { state: { product } });
        }
      }}
      className={`group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_16px_36px_rgba(15,23,42,0.14)] ${dealerMode ? '' : 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {product.image ? <img src={product.image} alt={`${product.brand} ${product.name}`} loading="lazy" className="h-full w-full object-contain object-center p-2 transition-transform duration-300 group-hover:scale-[1.02]" /> : <div className="flex h-full flex-col items-center justify-center gap-2 bg-slate-50 text-slate-400"><ImageOff size={34} strokeWidth={1.4} /><span className="text-xs font-medium">Product image coming soon</span></div>}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-navy-950/10 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 max-w-[65%] truncate rounded-sm bg-white px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-brand-dark shadow-sm sm:left-4 sm:top-4">{category}</span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-700 shadow-sm sm:right-4 sm:top-4"><BadgeCheck size={13} className="text-brand" />Grade {product.grade}</span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-sm bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-slate-700 shadow-sm sm:bottom-4 sm:left-4"><CheckCircle2 size={13} className="text-emerald-600" />Quality checked</span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{product.brand}{product.model ? ` · ${product.model}` : ''}</p>
            <h3 className="mt-1.5 line-clamp-2 text-lg font-extrabold leading-snug text-navy-950 transition-colors group-hover:text-brand-dark sm:text-xl">{product.name}</h3>
          </div>
        </div>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">{description}</p>
        <div className="mt-4 flex items-center justify-between gap-3 border-y border-slate-200 py-3.5">
          <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">Dealer price</p><p className={`mt-1 truncate font-extrabold ${hasPrice ? 'text-xl text-brand-dark' : 'text-sm text-navy-950'}`} aria-label={`Price ${price}`}>{price}</p></div>
          <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}><span className={`h-1.5 w-1.5 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-amber-500'}`} />{inStock ? 'In stock' : 'Check stock'}</span>
        </div>
        {!dealerMode && <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-500 transition-colors group-hover:text-brand-dark"><span>View product details</span><span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 transition-all group-hover:translate-x-0.5 group-hover:bg-brand-50 group-hover:text-brand"><ArrowRight size={15} /></span></div>}
        {dealerMode ? <div className="mt-4 space-y-2">
          <button type="button" onClick={sendEnquiry} disabled={Boolean(busy)} className="btn w-full border border-brand px-3 py-2.5 text-brand-dark transition hover:bg-brand-50 disabled:opacity-60"><ArrowRight size={16} />{busy === 'enquiry' ? 'Sending enquiry…' : 'Enquiry'}</button>
          <div className="flex items-end gap-2">
            <label className="min-w-0 flex-1 text-xs font-semibold text-slate-600">Quantity<input className="input mt-1.5" type="number" min="1" max="10000" step="1" value={quantity} onChange={event => setQuantity(event.target.value)} /></label>
            <button type="button" onClick={sendSalesRequest} disabled={Boolean(busy) || !Number.isInteger(Number(quantity)) || Number(quantity) < 1 || Number(quantity) > 10000} className="btn-primary min-h-[42px] shrink-0 px-3 py-2.5 disabled:cursor-not-allowed disabled:opacity-60">{busy === 'sales' ? 'Sending…' : 'Send to Sales'}<ArrowRight size={15} /></button>
          </div>
        </div> : null}
      </div>
      {confirmation && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setConfirmation(''); }}>
        <section role="dialog" aria-modal="true" aria-labelledby={`request-confirmation-${product._id}`} className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl" onClick={event => event.stopPropagation()}>
          <div className="flex items-start justify-between gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><Check size={22} /></span><button type="button" onClick={() => setConfirmation('')} aria-label="Close confirmation" className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={19} /></button></div>
          <h2 id={`request-confirmation-${product._id}`} className="mt-4 text-lg font-bold text-navy-950">Request received</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{confirmation}</p>
          <button type="button" className="btn-primary mt-5 w-full" onClick={() => setConfirmation('')}>Done</button>
        </section>
      </div>}
    </article>
  );
}