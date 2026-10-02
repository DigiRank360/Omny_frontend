import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { NAV } from '../utils/constants';
import Logo from './Logo';
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-brand-light/20 bg-navy-950/95 shadow-sm shadow-black/10 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3">
        <Logo size="text-4xl" />
        <nav className="hidden min-w-0 items-center gap-0 xl:flex 2xl:gap-1" aria-label="Main navigation">
          {NAV.map(([name, path]) => <NavLink key={name} to={path} end={path === '/'} className={({ isActive }) => `inline-flex min-h-10 shrink-0 items-center whitespace-nowrap px-1.5 text-xs font-bold uppercase transition-colors 2xl:px-2.5 ${isActive ? 'text-brand-light' : 'text-slate-300 hover:text-brand-light'}`}>{name}</NavLink>)}
        </nav>
        <div className="hidden shrink-0 gap-1 xl:flex 2xl:gap-2">
          <Link to="/dealer-login" className="btn shrink-0 whitespace-nowrap border border-white/50 text-white hover:bg-white/10">Dealer Login</Link>
          <Link to="/become-a-dealer" className="btn-primary shrink-0 whitespace-nowrap">Become a Dealer</Link>
        </div>
        <button className="text-white xl:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="flex flex-col gap-1 border-t border-brand-light/15 bg-navy-900 px-4 pb-5 pt-3 text-base font-semibold text-white xl:hidden">
        {NAV.map(([name, path]) => <NavLink key={name} to={path} end={path === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `w-full py-2 text-sm font-semibold transition-colors ${isActive ? 'text-brand-light' : 'text-slate-300 hover:text-brand-light'}`}>{name}</NavLink>)}
        <Link to="/dealer-login" onClick={() => setOpen(false)} className="w-full py-2 text-sm">Dealer Login</Link>
        <Link to="/become-a-dealer" onClick={() => setOpen(false)} className="btn-primary mt-1 text-sm">Become a Dealer</Link>
      </div>}
    </header>
  );
}
