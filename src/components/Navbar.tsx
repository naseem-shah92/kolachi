import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Anchor, ShoppingBag, CalendarRange, Menu as MenuIcon, X, Phone, Star } from 'lucide-react';
import { useApp } from './AppContext';

export default function Navbar() {
  const { cartCount, setIsCartOpen, triggerWhatsAppReservation } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add solid frosted backdrop and subtle shadow only when scrolled
      if (currentScrollY > 20) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky navbar
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Story', target: 'about' },
    { name: 'Signature', target: 'signature' },
    { name: 'The Menu', target: 'menu' },
    { name: 'The Experience', target: 'experience' },
    { name: 'Gallery', target: 'gallery' },
    { name: 'Reviews', target: 'reviews' },
    { name: 'Contact', target: 'contact' },
  ];

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
              hasScrolled
                ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-gold/15 py-3.5 shadow-xl shadow-black/90'
                : 'bg-transparent py-5'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              {/* Brand Logo & Name */}
              <button
                id="nav-logo-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center space-x-3 group focus:outline-none cursor-pointer"
              >
                <div className="relative flex items-center justify-center w-11 h-11 rounded-none border border-gold/30 group-hover:border-gold-light bg-zinc-950 overflow-hidden transition-all duration-300">
                  <Anchor className="w-5 h-5 text-gold group-hover:text-gold-light transition-all duration-500 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-left">
                  <span className="block text-2xl font-light tracking-widest text-[#C5A059] font-serif italic leading-none group-hover:text-[#E2C284] transition-colors duration-200">
                    KOLACHI
                  </span>
                  <span className="block text-[10px] uppercase tracking-[0.15em] text-zinc-400 font-mono mt-0.5 font-semibold leading-none">
                    Do Darya Karachi
                  </span>
                </div>
              </button>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-7">
                {navLinks.map((link) => (
                  <button
                    id={`nav-link-${link.target}`}
                    key={link.target}
                    onClick={() => scrollToSection(link.target)}
                    className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-gold transition-colors duration-200 cursor-pointer relative py-1 group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-300 ease-out" />
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="hidden lg:flex items-center space-x-4">
                <a
                  href="tel:+9221111111001"
                  className="flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-[#C5A059] transition-colors duration-200 mr-2"
                >
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span className="font-mono text-[11px]">+92 21 111 111 001</span>
                </a>

                {/* Reservation Trigger */}
                <button
                  id="nav-reserve-btn"
                  onClick={triggerWhatsAppReservation}
                  className="border border-gold text-[#F5F5F5] px-6 py-2.5 text-[11px] tracking-widest font-semibold hover:bg-gold hover:text-black transition-all rounded-none uppercase cursor-pointer"
                >
                  BOOK A TABLE
                </button>

                {/* Cart Badge */}
                <button
                  id="nav-cart-btn"
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2.5 rounded-none border border-gold/15 bg-zinc-950/40 hover:bg-[#111] hover:border-gold transition-all duration-200 cursor-pointer group"
                >
                  <ShoppingBag className="w-4.5 h-4.5 text-zinc-350 group-hover:text-gold transition-colors" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 gold-gradient rounded-full text-[10px] font-bold text-black flex items-center justify-center font-mono shadow-md border border-neutral-900"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
              </div>

              {/* Mobile Right Bar Instruments */}
              <div className="flex items-center lg:hidden space-x-3.5">
                {/* Cart Badge */}
                <button
                  id="nav-cart-btn-mobile"
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2.5 rounded-none border border-gold/15 bg-zinc-950/40 cursor-pointer group"
                >
                  <ShoppingBag className="w-4.5 h-4.5 text-zinc-350" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4.5 h-4.5 gold-gradient rounded-full text-[9px] font-bold text-black flex items-center justify-center font-mono">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Compact Table Reserve button for mobile */}
                <button
                  id="nav-reserve-btn-mobile"
                  onClick={triggerWhatsAppReservation}
                  className="p-2.5 rounded-none border border-gold/30 bg-gold/10 text-gold cursor-pointer"
                >
                  <CalendarRange className="w-4.5 h-4.5" />
                </button>

                {/* Hamburger Toggle */}
                <button
                  id="mobile-menu-toggle"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-none hover:bg-zinc-900 text-zinc-300 focus:outline-none cursor-pointer"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-gold" />
                  ) : (
                    <MenuIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-30 lg:hidden overflow-y-auto flex flex-col pt-24 pb-8 px-6"
          >
            {/* Elegant Sea Windmill Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent_60%)] pointer-events-none" />

            <div className="flex flex-col items-center space-y-6 select-none my-auto">
              <div className="flex items-center space-x-1.5 mb-2">
                <Star className="text-amber-500 fill-amber-500 w-3.5 h-3.5" />
                <Star className="text-amber-500 fill-amber-500 w-3.5 h-3.5" />
                <Star className="text-amber-500 fill-amber-500 w-3.5 h-3.5" />
                <Star className="text-amber-500 fill-amber-500 w-3.5 h-3.5" />
                <Star className="text-amber-550 fill-amber-500 w-3.5 h-3.5 opacity-70" />
                <span className="text-[11px] font-mono tracking-wider text-gray-400 pl-1">28K+ RATED</span>
              </div>

              {navLinks.map((link, idx) => (
                <motion.button
                  id={`nav-link-mobile-${link.target}`}
                  key={link.target}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollToSection(link.target)}
                  className="text-lg font-bold uppercase tracking-widest text-gray-100 hover:text-amber-400 active:text-amber-500 transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-xs h-[1px] bg-zinc-800 my-4"
              />

              <motion.a
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                href="tel:+9221111111001"
                className="flex items-center space-x-2 text-sm text-gray-300 font-mono"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>+92 21 111 111 001</span>
              </motion.a>

              <motion.button
                id="mobile-drawer-reserve"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  triggerWhatsAppReservation();
                }}
                className="w-full max-w-xs py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-md text-zinc-950 font-bold uppercase tracking-wider text-xs cursor-pointer active:scale-95 transition-transform"
              >
                Reserve a Seaside Table
              </motion.button>
            </div>

            <div className="mt-auto text-center text-[10px] text-zinc-600 font-mono uppercase tracking-widest flex items-center justify-center space-x-1.5">
              <span>Do Darya, DHA Phase 8, Karachi</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
