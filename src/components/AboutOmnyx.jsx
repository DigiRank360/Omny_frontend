import { ArrowRight, Zap, Target, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutOmnyx() {
  const highlights = [
    { icon: Zap, label: 'Quality Inspection' },
    { icon: Target, label: 'Transparent Grading' },
    { icon: Handshake, label: 'Dealer Support' },
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full opacity-30 blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full opacity-30 blur-3xl -ml-32 -mb-32" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          {/* Left side - Text content */}
          <div>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-brand-50 text-brand text-xs font-bold uppercase tracking-widest rounded-full">Section 2 - About Us</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-navy-950 mb-4 leading-tight">
              OMNYX GLOBAL
            </h2>
            
            <div className="mb-8 h-1 w-20 bg-gradient-to-r from-brand to-brand-dark rounded-full" />

            <h3 className="text-2xl font-semibold text-brand mb-6">
              Your Reliable B2B Refurbished Laptop Supply Partner
            </h3>

            <div className="space-y-5 mb-10">
              <p className="text-lg leading-relaxed text-slate-700">
                At <span className="font-semibold text-navy-950">OMNYX IT Global Pvt. Ltd.</span>, we understand that a successful laptop business depends on consistent product quality, reliable sourcing and competitive pricing.
              </p>

              <p className="text-lg leading-relaxed text-slate-700">
                As a <span className="font-semibold text-brand">refurbished laptop wholesale supplier in India</span>, we focus on helping dealers and resellers source laptops that meet their business requirements.
              </p>

              <p className="text-lg leading-relaxed text-slate-700">
                Our approach combines <span className="font-semibold text-navy-950">structured quality inspection, transparent product grading, wholesale inventory and professional after-sales support.</span>
              </p>

              <p className="text-lg leading-relaxed text-slate-700">
                Whether you operate a laptop retail store, manage an IT resale business or purchase laptops in bulk, <span className="font-semibold text-brand">OMNYX Global helps simplify your sourcing process.</span>
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-t border-b border-slate-200">
              {highlights.map((item) => (
                <div key={item.label} className="text-center">
                  <item.icon className="h-6 w-6 text-brand mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>

            <Link
              to="/about-us"
              className="btn-primary inline-flex"
            >
              Learn More About OMNYX <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right side - Visual element */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto w-full max-w-sm">
              {/* Floating cards */}
              <div className="absolute top-0 right-0 w-40 h-32 bg-white rounded-lg border-2 border-brand-50 shadow-lg p-4 hover:shadow-xl transition duration-300">
                <div className="text-brand text-2xl font-extrabold mb-2">32-Point</div>
                <p className="text-xs text-slate-600 font-semibold">Quality Inspection Process</p>
              </div>

              <div className="absolute bottom-10 left-0 w-40 h-32 bg-gradient-to-br from-brand-50 to-blue-50 rounded-lg border-2 border-brand shadow-lg p-4 hover:shadow-xl transition duration-300">
                <div className="text-brand text-2xl font-extrabold mb-2">A+ to C</div>
                <p className="text-xs text-slate-700 font-semibold">Transparent Laptop Grading</p>
              </div>

              <div className="absolute top-40 left-10 w-40 h-32 bg-white rounded-lg border-2 border-blue-100 shadow-lg p-4 hover:shadow-xl transition duration-300">
                <div className="text-blue-600 text-2xl font-extrabold mb-2">45 Days</div>
                <p className="text-xs text-slate-600 font-semibold">Dealer Warranty Coverage</p>
              </div>

              {/* Center decorative element */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-brand to-brand-dark rounded-full opacity-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
