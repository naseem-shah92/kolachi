import { Anchor, ArrowUp, Flame, Fish, Star, Mail, MapPin } from 'lucide-react';
import { useApp } from './AppContext';

export default function Footer() {
  const { triggerWhatsAppReservation, setIsCartOpen } = useApp();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinksLeft = [
    { label: 'Seaside Story', target: 'about' },
    { label: 'Chef Specialties', target: 'signature' },
    { label: 'Grand Menu', target: 'menu' },
  ];

  const footerLinksRight = [
    { label: 'The Experience', target: 'experience' },
    { label: 'Snapshots', target: 'gallery' },
    { label: 'Client Voices', target: 'reviews' },
  ];

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#0A0A0A] text-[#F5F5F5] pt-20 pb-10 border-t border-gold/15 overflow-hidden select-none">
      {/* Background radial overlay */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-[radial-gradient(ellipse_at_bottom,rgba(197,160,89,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 text-left">
          
          {/* Section 1: Brand description (col span 5) */}
          <div className="lg:col-span-4 space-y-6">
            <button
              id="footer-logo-btn"
              onClick={handleScrollToTop}
              className="flex items-center space-x-2.5 group focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 rounded-none border border-gold/20 bg-zinc-950 flex items-center justify-center group-hover:border-gold transition-colors">
                <Anchor className="w-4.5 h-4.5 text-gold group-hover:rotate-6 transition-transform" />
              </div>
              <div>
                <span className="block text-md font-serif font-light text-white tracking-widest uppercase group-hover:text-gold transition-colors italic">
                  KOLACHI
                </span>
                <span className="block text-[8px] uppercase tracking-widest text-gold -mt-1 font-mono font-bold">
                  Do Darya Karachi
                </span>
              </div>
            </button>

            <p className="text-xs text-zinc-550 leading-relaxed font-light">
              Experience Pakistan's most legendary coastal fine-dining. Built upon raw ocean waves with generational spice heritage and majestic lanterns, Kolachi remains an landmark of Karachi’s hospitality.
            </p>

            {/* Stars row */}
            <div className="flex items-center space-x-1.5 pt-2 text-gold font-mono text-xs">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-zinc-400">4.5 ★ (28k+ reviews)</span>
            </div>
          </div>

          {/* Section 2: Shortcuts Left (col span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-bold border-b border-gold/15 pb-2">
              Discover
            </h4>
            <ul className="space-y-3 prose text-xs">
              {footerLinksLeft.map((link) => (
                <li key={link.target}>
                  <button
                    id={`footer-btn-${link.target}`}
                    onClick={() => scrollToTarget(link.target)}
                    className="text-zinc-400 hover:text-gold transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Shortcuts Right (col span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-bold border-b border-gold/15 pb-2">
              Atmosphere
            </h4>
            <ul className="space-y-3 prose text-xs">
              {footerLinksRight.map((link) => (
                <li key={link.target}>
                  <button
                    id={`footer-btn-${link.target}`}
                    onClick={() => scrollToTarget(link.target)}
                    className="text-zinc-400 hover:text-gold transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  id="footer-btn-terms"
                  onClick={triggerWhatsAppReservation}
                  className="text-zinc-400 hover:text-gold transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Table Reservations
                </button>
              </li>
            </ul>
          </div>

          {/* Section 4: Hotlines and Hours (col span 3) */}
          <div className="lg:col-span-4 space-y-5 text-zinc-100">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-bold border-b border-[#C5A059]/15 pb-2">
              The Anchor Line
            </h4>
            <div className="space-y-3 font-sans text-xs text-zinc-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Do Darya, DHA Phase 8, Karachi</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                <a href="mailto:info@kolachidodarya.com" className="hover:text-gold transition-colors text-zinc-400">
                  bookings@kolachi.com.pk
                </a>
              </div>
              <div className="pt-2">
                <p className="font-mono text-[9px] uppercase tracking-wider text-gold mb-1 font-bold">Hotline Ordering</p>
                <a href="tel:+9221111111001" className="text-sm font-semibold tracking-wide text-white font-mono hover:text-gold transition-colors">
                  +92 21 111 111 001
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Divider and Legalese */}
        <div className="border-t border-gold/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[10px] tracking-wider font-mono text-center sm:text-left text-zinc-500">
            © {new Date().getFullYear()} KOLACHI DO DARYA KARACHI. ALL LAND RIGHTS SECURED. DESIGN ADHERENT.
          </p>

          <div className="flex items-center space-x-4">
            {/* Scroll back up anchor */}
            <button
              id="sticky-gototop"
              onClick={handleScrollToTop}
              className="p-2.5 bg-zinc-950 hover:bg-[#121212] rounded-none border border-gold/15 hover:text-gold cursor-pointer text-zinc-400 transition-all active:scale-95"
              title="Return into Celestial Heights"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
