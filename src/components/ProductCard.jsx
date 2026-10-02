import { ArrowRight, BadgeCheck, CheckCircle2, ImageOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const category = product.category?.name || 'Refurbished technology';
  const description = product.description || `${product.brand}${product.model ? ` ${product.model}` : ''} · Grade ${product.grade}`;
  const hasPrice = Number(product.price) > 0;
  const price = hasPrice ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(product.price)) : 'Price on request';
  const inStock = Number(product.stock) > 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md bg-white transition-shadow duration-200 hover:shadow-lg hover:shadow-slate-900/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {product.image ? <img src={product.image} alt={`${product.brand} ${product.name}`} loading="lazy" className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]" /> : <div className="flex h-full flex-col items-center justify-center gap-2 bg-slate-50 text-slate-400"><ImageOff size={34} strokeWidth={1.4} /><span className="text-xs font-medium">Product image coming soon</span></div>}
        <span className="absolute left-4 top-4 max-w-[65%] truncate bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-dark">{category}</span>
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-700"><BadgeCheck size={13} className="text-brand-light" />Grade {product.grade}</span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-700"><CheckCircle2 size={13} className="text-emerald-600" />Quality checked</span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-bold uppercase tracking-wide text-slate-500">{product.brand}{product.model ? ` · ${product.model}` : ''}</p>
            <h3 className="mt-1.5 line-clamp-2 text-lg font-extrabold leading-snug text-navy-950 sm:text-xl">{product.name}</h3>
          </div>
        </div>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">{description}</p>
        <div className="mt-4 flex items-center justify-between gap-3 border-y border-slate-200 py-3">
          <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Dealer price</p><p className={`mt-0.5 truncate font-extrabold ${hasPrice ? 'text-lg text-brand-dark' : 'text-sm text-navy-950'}`} aria-label={`Price ${price}`}>{price}</p></div>
          <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}><span className={`h-1.5 w-1.5 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-amber-500'}`} />{inStock ? 'In stock' : 'Check stock'}</span>
        </div>
        <Link to={`/contact?category=${encodeURIComponent(category)}&product=${encodeURIComponent(product.name)}`} className="btn-primary mt-4 w-full justify-between">
          Request availability <span className="ml-3 flex h-7 w-7 items-center justify-center bg-white/15"><ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" /></span>
        </Link>
      </div>
    </article>
  );
}