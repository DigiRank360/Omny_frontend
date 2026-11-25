import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-b from-navy-950 to-blue-950 py-16 sm:py-20 lg:py-24 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">Looking for a Reliable Refurbished Laptop Wholesale Supplier?</h2>
        
        <p className="text-lg leading-7 text-slate-200 mb-6">
          Partner with OMNYX Global for quality-checked refurbished laptops, transparent grading, competitive B2B pricing and dedicated dealer assistance.
        </p>

        <p className="text-lg leading-7 text-slate-200 mb-12">
          Whether you're starting a laptop resale business or expanding an established dealership, explore wholesale sourcing opportunities with OMNYX Global.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/become-a-dealer" className="btn-primary">
            Register as a Dealer <ArrowRight size={16} />
          </Link>
          <Link to="/products" className="btn border border-white text-white hover:bg-white hover:text-navy-950">
            Get Wholesale Pricing
          </Link>
        </div>

        <div className="pt-12 border-t border-blue-900">
          <p className="text-sm font-semibold text-slate-300">OMNYX IT Global Pvt. Ltd.</p>
          <p className="text-xs text-slate-400 mt-2">Quality. Transparency. Trusted B2B Partnerships.</p>
        </div>
      </div>
    </section>
  );
}
