import { useEffect, useState } from 'react';
import { ArrowRight, PackageSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from './ProductCard';

export default function Categories() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    api.get('/store/products')
      .then(({ data }) => { if (active) setProducts(data.slice(0, 4)); })
      .catch(() => { if (active) setProducts([]); })
      .finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);

  return (
    <section id="products" className="bg-slate-50 py-16 text-slate-800 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Dealer inventory</p><h2 className="mt-2 text-2xl font-extrabold text-navy-950 sm:text-3xl">Featured <span className="text-brand">products</span></h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Quality-checked stock selected for OMNY X dealer partners.</p></div>
          <Link to="/products" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand">Browse all products <ArrowRight size={16} /></Link>
        </div>
        {products.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map(product => <ProductCard key={product._id} product={product} />)}</div> : loaded ? <div className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-10 text-center"><PackageSearch size={30} className="mx-auto text-brand" /><p className="mt-3 font-semibold text-navy-950">New products are on the way</p><p className="mt-1 text-sm text-slate-600">Our latest inventory will appear here as soon as it is published.</p></div> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <div key={index} className="aspect-[4/5] animate-pulse rounded-lg bg-slate-100" />)}</div>}
      </div>
    </section>
  );
}
