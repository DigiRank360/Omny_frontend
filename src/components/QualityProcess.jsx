import { Check } from 'lucide-react';

export default function QualityProcess() {
  const steps = [
    { step: '1', title: 'Product Inspection', description: 'Initial assessment of laptop condition and configuration.' },
    { step: '2', title: 'Hardware & Functional Testing', description: 'Inspection of key components and essential laptop functions.' },
    { step: '3', title: 'Condition Grading', description: 'Classification based on the applicable grading standards.' },
    { step: '4', title: 'Inventory Information', description: 'Sharing available product specifications and grading details.' },
    { step: '5', title: 'Order Coordination', description: 'Dealer assistance with stock confirmation and dispatch.' },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Quality process</p>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">Quality-Checked Refurbished Laptops for Confident Reselling</h2>
          <p className="mt-4 text-lg leading-7 text-slate-700">Every refurbished laptop purchase should begin with clarity about product condition and functionality.</p>
          <p className="mt-3 text-lg leading-7 text-slate-700">Our structured inspection process is designed to evaluate important laptop components and functions before wholesale supply.</p>
        </div>

        <div className="mb-12">
          <h3 className="mb-8 text-2xl font-bold text-navy-950">Our Quality-Focused Process:</h3>
          <div className="space-y-4">
            {steps.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white font-bold">
                  {item.step}
                </div>
                <div className="pt-2">
                  <h4 className="font-bold text-navy-950">{item.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-brand-50 p-6 border border-brand-100">
          <div className="flex gap-3">
            <Check className="h-6 w-6 shrink-0 text-brand" />
            <p className="text-slate-700">Our objective is to help dealers make informed purchasing decisions with greater confidence.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
