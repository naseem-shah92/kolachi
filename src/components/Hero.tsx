import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BookOpen, CalendarRange, Star, ArrowDown } from 'lucide-react';
import { useApp } from './AppContext';

export default function Hero() {
  const { triggerWhatsAppReservation } = useApp();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Parallax for high-end luxury feel on desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 1024) {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 20;
        const yPercent = (clientY / window.innerHeight - 0.5) * 20;
        setMousePos({ x: xPercent, y: yPercent });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      const offset = -80;
      const y = menuSection.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const starsArray = [
    { top: '15%', left: '20%', size: 2, delay: 0 },
    { top: '25%', left: '75%', size: 3, delay: 1.5 },
    { top: '40%', left: '10%', size: 1.5, delay: 0.8 },
    { top: '65%', left: '85%', size: 2.5, delay: 2.2 },
    { top: '50%', left: '60%', size: 2, delay: 1.1 },
    { top: '75%', left: '30%', size: 3, delay: 1.9 },
    { top: '18%', left: '45%', size: 1.5, delay: 2.5 },
    { top: '82%', left: '68%', size: 2, delay: 0.4 },
  ];

  return (
    <div
      id="hero"
      ref={heroRef}
      className="relative h-screen min-h-[650px] w-full bg-black overflow-hidden flex items-center justify-center select-none"
    >
      {/* Cinematic Background Video Layer */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          y: bgY,
          x: mousePos.x * 0.2,
          scale: 1.1
        }}
      >
        <img
          src="/assets/images/kolachi_hero_deck_1780357652258.png"
          alt="Kolachi Do Darya"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Deep Ocean Blueprint Tint Overlay */}
        <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply" />
      </motion.div>

      {/* Cinematic Layered Vignettes */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      {/* Drifting Golden Star/Sea Sprites */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {starsArray.map((star, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-amber-400"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 3 + star.size,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Hero Master Contents Panel */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-12 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gold/10 border border-gold/25 backdrop-blur-md rounded-none mb-6"
        >
          <div className="flex items-center text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-gold text-gold" />
            ))}
          </div>
          <p className="text-[10px] tracking-widest uppercase font-mono text-gold font-semibold">
            The Spirit of Do Darya
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mb-4"
        >
          <span className="font-mono text-[10px] tracking-[0.2em] font-bold text-gold uppercase">Oceanic Gastronomy</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-9xl leading-[1] mb-8 font-light italic text-white tracking-tight"
        >
          Kolachi <br/>
          <span className="text-[#C5A059] font-normal not-italic block mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Seaside Excellence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/70 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10 font-light"
        >
          Immerse yourself in a world where the rhythm of the waves meets the artistry of charcoal grilling. A legendary dining experience at the edge of the Arabian Sea.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm"
        >
          <button
            id="hero-book-btn"
            onClick={triggerWhatsAppReservation}
            className="w-full sm:w-auto relative group gold-gradient text-black px-10 py-4 font-bold text-[10px] tracking-widest hover:brightness-110 transition-all rounded-none uppercase cursor-pointer"
          >
            <div className="flex items-center justify-center space-x-2">
              <CalendarRange className="w-4 h-4 text-black" />
              <span>Reserve Now</span>
            </div>
          </button>

          <button
            id="hero-order-btn"
            onClick={scrollToMenu}
            className="w-full sm:w-auto px-10 py-4 border border-white/20 bg-white/5 text-white hover:bg-white/10 text-[10px] font-bold tracking-widest uppercase transition-all rounded-none cursor-pointer group flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-4 h-4 text-gold group-hover:translate-x-0.5 transition-transform" />
            <span>Discover</span>
          </button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none select-none">
        <svg
          className="w-full h-16 text-zinc-950 fill-current opacity-90"
          viewBox="0 0 1440 74"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0,32L60,37.3C120,43,240,53,360,48C480,43,600,21,720,16C840,11,960,21,1080,32C1200,43,1320,53,1380,58.7L1440,64L1440,74L1380,74C1320,74,1200,74,1080,74C960,74,840,74,720,74C600,74,480,74,360,74C240,74,120,74,60,74L0,74Z"></path>
        </svg>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 z-20 hidden md:flex flex-col items-center cursor-pointer text-zinc-500 hover:text-amber-400 transition-colors"
        onClick={scrollToMenu}
      >
        <span className="text-[10px] tracking-widest uppercase font-mono mb-1.5">Gentle Tide</span>
        <ArrowDown className="w-4 h-4 text-amber-500/80" />
      </motion.div>
    </div>
  );
}

