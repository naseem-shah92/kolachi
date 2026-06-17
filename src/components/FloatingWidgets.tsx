import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, CalendarRange, Star, HelpCircle } from 'lucide-react';
import { useApp } from './AppContext';

export default function FloatingWidgets() {
  const { triggerWhatsAppReservation } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  // Control visibility: hide sticky nodes near the very top of page
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerWhatsAppInquiry = () => {
    const defaultText = encodeURIComponent("Greetings Kolachi Do Darya! I would like to inquire about seaside deck seating and table reservations.");
    window.location.href = `https://wa.me/9221111111001?text=${defaultText}`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 left-0 right-0 z-30 pointer-events-none px-6 flex justify-between items-center max-w-7xl mx-auto">
          
          {/* Bottom Left: Sticky Reservation shortcut */}
          <motion.button
            id="floating-reserve-widget"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={triggerWhatsAppReservation}
            className="pointer-events-auto flex items-center space-x-2 bg-gradient-to-r from-[#C5A059] to-[#E2C284] text-black px-4 py-3 rounded-none text-xs font-bold uppercase tracking-widest shadow-lg hover:brightness-110 transition-all cursor-pointer active:scale-95 duration-300 select-none"
          >
            <CalendarRange className="w-4.5 h-4.5 text-black shrink-0" />
            <span className="hidden sm:inline">Book Seaside Deck</span>
          </motion.button>

          {/* Bottom Right: Floating WhatsApp anchor */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="pointer-events-auto flex items-center space-x-3.5 ml-auto"
          >
            {/* Friendly guiding tooltip for mobile visitors */}
            <div className="hidden lg:flex flex-col items-end py-1.5 px-3 bg-zinc-950/95 border border-gold/15 rounded-none shadow select-none">
              <span className="text-[9px] font-mono text-gold uppercase tracking-[0.15em] font-bold">Secure Desk Assistance</span>
              <span className="text-[10px] text-zinc-400 font-light">Order & Reservation Chat Support</span>
            </div>

            <button
              id="floating-whatsapp-widget"
              onClick={triggerWhatsAppInquiry}
              className="relative p-4 rounded-none bg-emerald-600 text-white shadow-lg hover:brightness-110 cursor-pointer active:scale-95 transition-all outline-none"
              title="Speak with Steward WhatsApp"
            >
              {/* Pulsing glow aura around chat button */}
              <span className="absolute inset-0 rounded-none border border-emerald-500 animate-ping opacity-35" />
              <MessageSquare className="w-5.5 h-5.5 fill-white" />
            </button>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
