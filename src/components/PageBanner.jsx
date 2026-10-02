import { Link } from 'react-router-dom';

export default function PageBanner({ title, description }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-dark via-brand to-navy-900 text-white">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(135deg, transparent 0 48%, rgba(255,255,255,.16) 48% 49%, transparent 49% 100%)', backgroundSize: '32px 32px' }} />
      <div className="relative mx-auto max-w-7xl px-4 py-9 sm:py-11">
        <p className="mb-3 text-xs font-medium text-brand-100"><Link to="/" className="hover:text-white">Home</Link><span className="mx-2">/</span>{title}</p>
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-50">{description}</p>}
      </div>
    </section>
  );
}