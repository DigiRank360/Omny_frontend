import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'What is OMNYX Global?',
      answer: 'OMNYX Global, operated by OMNYX IT Global Pvt. Ltd., is a B2B refurbished laptop wholesale supplier in India. The company serves laptop dealers, resellers and businesses looking for bulk refurbished laptop inventory.'
    },
    {
      id: 2,
      question: 'Where can I buy refurbished laptops in bulk in India?',
      answer: 'Businesses can inquire with OMNYX Global for bulk refurbished laptop availability, wholesale pricing, laptop specifications and dealer registration.'
    },
    {
      id: 3,
      question: 'Does OMNYX Global supply refurbished laptops to dealers?',
      answer: 'Yes. OMNYX Global focuses on B2B refurbished laptop supply for dealers, retailers, resellers and other eligible business buyers.'
    },
    {
      id: 4,
      question: 'Which refurbished laptop brands are available at OMNYX Global?',
      answer: 'OMNYX Global offers refurbished laptop inventory from brands such as Dell, HP and Lenovo, subject to current stock availability.'
    },
    {
      id: 5,
      question: 'How does OMNYX Global check laptop quality?',
      answer: 'OMNYX Global uses a structured 32-point quality inspection process and transparent laptop grading to help dealers understand product condition.'
    },
    {
      id: 6,
      question: 'Does OMNYX Global provide a warranty on refurbished laptops?',
      answer: 'OMNYX Global offers an applicable 45-day dealer warranty on eligible refurbished laptops. Coverage and conditions depend on the relevant warranty terms.'
    },
    {
      id: 7,
      question: 'How can I become an OMNYX Global dealer?',
      answer: 'You can apply through the dealer registration option on the OMNYX Global website or contact the wholesale team for registration assistance.'
    },
    {
      id: 8,
      question: 'Can I request wholesale laptop pricing?',
      answer: 'Yes. Dealers and eligible business buyers can contact OMNYX Global to inquire about current stock, available configurations, quantities and applicable wholesale prices.'
    },
  ];

  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">FAQs</p>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
              <button
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 font-bold text-navy-950 hover:bg-slate-50 transition duration-200"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 transition-transform duration-200 ${
                    open === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === faq.id && (
                <div className="border-t border-slate-200 px-6 py-4 text-slate-600">
                  <p className="text-sm leading-6">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
