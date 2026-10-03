import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, CheckCircle2, ImageOff, PackageCheck, Search } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import api from '../utils/api';

const formatPrice = value => Number(value) > 0
  ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value))
  : 'Price on request';

export default function ProductDetails() {
  const { productId } = useParams();
  const location = useLocation();
  const initialProduct = location.state?.product?._id === productId ? location.state.product : null;
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);

  useEffect(() => {
    if (location.state?.product?._id === productId) {
      setProduct(location.state.product);
      setLoading(false);
      return undefined;
    }

    let active = true;
    setLoading(true);
    api.get('/store/products')
      .then(({ data }) => {
        if (active) setProduct(data.find(item => item._id === productId) || null);
      })
      .catch(() => { if (active) setProduct(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [location.state, productId]);

  if (loading) return <main className="flex min-h-[55vh] items-center justify-center bg-slate-50"><p className="text-sm font-semibold text-slate-600">Loading product details…</p></main>;
  if (!product) return <main className="mx-auto max-w-3xl px-4 py-20 text-center"><PackageCheck size={38} className="mx-auto text-slate-300" /><h1 className="mt-4 text-2xl font-extrabold text-navy-950">Product unavailable</h1><p className="mt-2 text-sm text-slate-600">This product may have been removed or is no longer available.</p><Link to="/products" className="btn-primary mt-6">Browse products <ArrowRight size={16} /></Link></main>;

  const category = product.category?.name || 'Refurbished technology';
  const description = product.description || `${product.brand}${product.model ? ` ${product.model}` : ''} · Grade ${product.grade}`;
  const inStock = Number(product.stock) > 0;
  const [zoomLens, setZoomLens] = useState(null);
  const handleImagePointerMove = event => {
    if (event.pointerType !== 'mouse' || !product.image) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const lensSize = 184;
    const zoom = 2.4;
    const x = Math.max(0, Math.min(event.clientX - bounds.left, bounds.width));
    const y = Math.max(0, Math.min(event.clientY - bounds.top, bounds.height));
    const left = Math.max(0, Math.min(x - lensSize / 2, bounds.width - lensSize));
    const top = Math.max(0, Math.min(y - lensSize / 2, bounds.height - lensSize));
    setZoomLens({
      left,
      top,
      imageLeft: lensSize / 2 - x * zoom - left,
      imageTop: lensSize / 2 - y * zoom - top,
      imageWidth: bounds.width * zoom,
      imageHeight: bounds.height * zoom,
      lensSize,
    });
  };

  return <main className="bg-slate-50 pb-12 sm:pb-16">
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:pt-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-brand-dark"><ArrowLeft size={16} />Back to products</Link>
      <section className="mt-5 grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-64 bg-slate-100 sm:min-h-[440px] lg:min-h-[560px]" onPointerMove={handleImagePointerMove} onPointerLeave={() => setZoomLens(null)}>
          {product.image ? <img src={product.image} alt={`${product.brand} ${product.name}`} className="absolute inset-0 h-full w-full object-contain p-4 sm:p-6" /> : <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400"><ImageOff size={42} strokeWidth={1.4} /><span className="text-sm">Product image coming soon</span></div>}
          <span className="absolute left-4 top-4 bg-white px-3 py-1.5 text-xs font-bold uppercase text-brand-dark">{category}</span>
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 bg-white px-3 py-1.5 text-xs font-bold text-slate-700"><BadgeCheck size={15} className="text-brand" />Grade {product.grade}</span>
          {product.image && <span className="absolute bottom-4 right-4 hidden items-center gap-1.5 rounded-sm bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm lg:inline-flex"><Search size={14} />Hover to zoom</span>}
          {zoomLens && <div aria-hidden="true" className="pointer-events-none absolute z-20 overflow-hidden rounded-full border-2 border-white shadow-[0_8px_24px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/10" style={{ left: zoomLens.left, top: zoomLens.top, width: zoomLens.lensSize, height: zoomLens.lensSize }}>
            <img src={product.image} alt="" className="absolute max-w-none object-contain p-4 sm:p-6" style={{ left: zoomLens.imageLeft, top: zoomLens.imageTop, width: zoomLens.imageWidth, height: zoomLens.imageHeight }} />
          </div>}
        </div>
        <div className="flex flex-col p-5 sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-wide text-brand">{product.brand}{product.model ? ` · ${product.model}` : ''}</p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-navy-950 sm:text-3xl">{product.name}</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
          <div className="mt-6 flex items-end justify-between gap-4 border-y border-slate-200 py-4">
            <div><p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Dealer price</p><p className="mt-1 text-2xl font-extrabold text-brand-dark">{formatPrice(product.price)}</p></div>
            <span className={`mb-1 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}><span className={`h-2 w-2 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-amber-500'}`} />{inStock ? `${product.stock} in stock` : 'Check stock'}</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4">
            <div><p className="text-[10px] font-bold uppercase text-slate-500">Model</p><p className="mt-1 text-sm font-semibold text-slate-800">{product.model || 'See description'}</p></div>
            <div><p className="text-[10px] font-bold uppercase text-slate-500">Condition grade</p><p className="mt-1 text-sm font-semibold text-slate-800">{product.grade}</p></div>
            <div><p className="text-[10px] font-bold uppercase text-slate-500">Category</p><p className="mt-1 text-sm font-semibold text-slate-800">{category}</p></div>
            <div><p className="text-[10px] font-bold uppercase text-slate-500">Quality</p><p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700"><CheckCircle2 size={15} />Checked</p></div>
          </div>
          <div className="mt-auto pt-8">
            <Link to={`/become-a-dealer?product=${encodeURIComponent(product.name)}`} className="btn-primary w-full justify-between">Become a dealer to request this product <ArrowRight size={17} /></Link>
            <p className="mt-3 text-center text-xs leading-5 text-slate-500">Dealer access is required to request pricing and availability.</p>
          </div>
        </div>
      </section>
    </div>
  </main>;
}