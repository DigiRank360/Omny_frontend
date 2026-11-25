import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WhoWeServe() {
  const businesses = [
    {
      title: 'Laptop Retailers',
      description: 'Source refurbished laptops for your retail store and customer requirements.'
    },
    {
      title: 'Laptop Dealers & Resellers',
      description: 'Expand your available product range with wholesale laptop inventory.'
    },
    {
      title: 'IT Resellers & System Integrators',
      description: 'Find refurbished laptops for business technology requirements and resale opportunities.'
    },
    {
      title: 'Corporate & Institutional Buyers',
      description: 'Inquire about bulk refurbished laptop availability for organizational requirements.'
    },
    {
      title: 'Online Laptop Sellers',
      description: 'Source inventory for your e-commerce or online resale business.'
    },
  ];

  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Who we serve</p>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">Refurbished Laptop Wholesale Solutions for Businesses</h2>
          <p className="mt-4 text-lg leading-7 text-slate-700">OMNYX Global works with businesses looking for dependable refurbished laptop sourcing.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business, index) => (
            <article key={index} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition duration-200">
              <h3 className="text-lg font-bold text-navy-950">{business.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{business.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/contact" className="btn-primary">Discuss Your Bulk Requirement <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
