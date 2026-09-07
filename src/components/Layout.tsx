import { useState, useEffect, FormEvent, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Bell, Check, ChevronDown, Globe, LayoutDashboard, Menu, X } from 'lucide-react';
import { useLang } from '@/context/LangContext'; 
import { t, rooms, type Lang } from '@/data/content'; 
  
export function tr(obj: Record<string, string>, lang: Lang) {
  return obj[lang] || obj.en;
}

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLang();
  const [sent, setSent] = useState(false);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="booking-modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}><X /></button>
        {sent ? (
          <div className="success-state">
            <div className="success-icon"><Check /></div>
            <p className="eyebrow">{tr(t.booking.success, lang)}</p>
              <h2>{tr(t.booking.successTitle1, lang)}<br /><em>{tr(t.booking.successTitle2, lang)}</em></h2>
            <p>{tr(t.booking.successMsg, lang)}</p>
            <button className="primary-button" onClick={onClose}>{tr(t.booking.back, lang)} <ArrowUpRight size={17} /></button>
          </div>
        ) : (
          <>
            <p className="eyebrow">{tr(t.booking.title, lang) === tr(t.booking.title, 'en') ? 'Make it yours' : tr(t.booking.title, lang)}</p>
            <h2>{tr(t.booking.title, lang)} <em>{tr(t.booking.title2, lang)}</em></h2>
            <p className="modal-intro">{tr(t.booking.intro, lang)}</p>
            <form onSubmit={(e: FormEvent) => { e.preventDefault(); setSent(true); }}> 
              <div className="form-row">
                <label>{tr(t.booking.firstName, lang)}<input required placeholder={tr(t.booking.firstName, lang)} /></label> 
                <label>{tr(t.booking.lastName, lang)}<input required placeholder={tr(t.booking.lastName, lang)} /></label>
              </div> 
              <label>{tr(t.booking.email, lang)}<input required type="email" placeholder="you@example.com" /></label>
              <div className="form-row">
                <label>{tr(t.booking.checkin, lang)}<input required type="date" /></label>
                <label>{tr(t.booking.checkout, lang)}<input required type="date" /></label>
              </div>
              <label>{tr(t.booking.roomPref, lang)}
                <select>{rooms.map(r => <option key={r.id}>{tr(r.name, lang)}</option>)}</select>
              </label>
              <button className="primary-button full-width" type="submit">{tr(t.booking.submit, lang)} <ArrowUpRight size={18} /></button> 
            </form>
          </> 
        )}
      </div>
    </div> 
  );
}

export function LanguageSwitch() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const langs: { code: Lang; label: string; short: string }[] = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'am', label: 'አማርኛ', short: 'አማ' },
    { code: 'had', label: 'Hadiyissa', short: 'Had' },
  ];
  const current = langs.find(l => l.code === lang)!;
  return (
    <div className="lang-switch">
      <button onClick={() => setOpen(!open)} className={open ? 'active' : ''}> 
        <Globe size={15} /> {current.short} <ChevronDown size={13} className={open ? 'rotated' : ''} />
      </button>
      {open && (
        <div className="lang-dropdown">
          {langs.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }} className={l.code === lang ? 'active' : ''}>
              {l.label} {l.code === lang && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar({ onBook, chromeVisible }: { onBook: () => void; chromeVisible: boolean }) {
  const { lang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = [
    { to: '/', label: tr(t.nav.home, lang) },
    { to: '/rooms', label: tr(t.nav.rooms, lang) },
    { to: '/menu', label: tr(t.nav.menu, lang) },
    { to: '/gallery', label: tr(t.nav.gallery, lang) },
    { to: '/about', label: tr(t.nav.about, lang) },
    { to: '/nearby', label: tr(t.nav.nearby, lang) },
  ];
  return (
    <>
      <header className={`nav-wrap ${location.pathname === '/' ? 'home-chrome' : ''} ${chromeVisible ? 'is-visible' : 'is-hidden'}`}>
        <Link className="brand" to="/">
          <img src="/image.png" alt="Lema Hotel" />
          <span>LEMA HOTEL<small>HOSSANA · ETHIOPIA</small></span>
        </Link>  
        <nav className={menuOpen ? 'nav-links mobile-visible' : 'nav-links'}> 
          {navItems.map(item => (
            <Link key={item.to} to={item.to} className={location.pathname === item.to ? 'active' : ''} onClick={() => setMenuOpen(false)}> 
              {item.label}
            </Link> 
          ))}
          <div className="mobile-nav-actions">
            <LanguageSwitch />
            <Link className="admin-trigger mobile-admin-trigger" to="/admin" onClick={() => setMenuOpen(false)}>
              <LayoutDashboard size={15} /> {tr(t.nav.staff, lang)}
            </Link>
          </div>  
        </nav>
        <div className="nav-actions">
          <LanguageSwitch />  
          <Link className="admin-trigger" to="/admin"><LayoutDashboard size={15} /> {tr(t.nav.staff, lang)}</Link>
          <button className="book-button" onClick={onBook}>{tr(t.nav.book, lang)} <ArrowUpRight size={17} /></button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu"> 
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  const { lang } = useLang();
  return (
    <footer>
      <div className="footer-brand">
        <img src="/image.png" alt="Lema Hotel" />
        <span>LEMA HOTEL<small>HOSSANA · ETHIOPIA</small></span>
      </div>
      <p>{tr(t.footer.tagline, lang)}</p>
      <div className="footer-social">
        <span>{tr(t.footer.rights, lang)}</span>
      </div> 
    </footer>
  );
}

export function FloatingBookButton({ onBook, visible }: { onBook: () => void; visible: boolean }) {
  const { lang } = useLang();
  return (
    <button className={`floating-book ${visible ? 'visible' : ''}`} onClick={onBook}>
      {tr(t.nav.book, lang)} <ArrowUpRight size={18} /> 
    </button> 
  ); 
}
 

export function PageHeader({ title, subtitle, image }: { title: ReactNode; subtitle: string; image: string }) {
  return (
    <section className="page-header" style={{ backgroundImage: `url(${image})` }}> 
      <div className="page-header-overlay" />
      <div className="page-header-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}
