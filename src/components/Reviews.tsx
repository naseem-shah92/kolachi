import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { REVIEWS } from '../data';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplaying, setAutoplayting] = useState(true);

  // Auto sliding carousel: rotate every 7 seconds gracefully
  useEffect(() => {
    if (!autoplaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
    }, 7000);

    return () => clearInterval(interval);
  }, [autoplaying]);

  const handlePrev = () => {
    setAutoplayting(false);
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setAutoplayting(false);
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const highlights = [
    { label: '🌊 Iconic Sea View', count: '14,210+ praises' },
    { label: '🤵 Prompt Royal Service', count: '9,440+ mentions' },
    { label: '🍗 Sizzling Charcoal Taste', count: '11,811+ reviews' },
    { label: '👨‍👩‍👧‍👦 Peaceful Family Space', count: '5,800+ notes' },
  ];

  return (
    <section id="reviews" className="relative py-24 bg-[#0A0A0A] text-[#F5F5F5] scroll-mt-20 overflow-hidden border-t border-gold/10">
      {/* Background soft gold atmospheric mist */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[500px] h-[250px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title structure */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gold/10 border border-gold/15 rounded-none">
            <MessageSquare className="w-3.5 h-3.5 text-gold" />
            <span className="text-[10px] uppercase font-mono tracking-[0.15em] text-gold font-bold">
              Guest Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light font-serif italic text-white tracking-normal">
            Reflections of Luxury
          </h2>
          <p className="text-xs sm:text-xs text-zinc-400 max-w-sm mx-auto font-light leading-relaxed">
            Sourced directly from our visitor guest books, trip logs, and local culinary diaries over the years.
          </p>
        </div>

        {/* Highlights Tags Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {highlights.map((hl, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="p-4 rounded-none bg-white/[0.01] border border-gold/10 text-center hover:border-gold/30 hover:bg-white/[0.03] transition-all select-none"
            >
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-white mb-1">{hl.label}</h4>
              <p className="text-[9px] font-mono text-gold uppercase tracking-widest font-semibold">{hl.count}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-3xl mx-auto relative content-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative rounded-none bg-[#0B0B0B] border border-gold/15 p-8 sm:p-12 shadow-2xl flex flex-col items-center text-center"
            >
              {/* Giant quote layout vector */}
              <div className="absolute top-6 left-8 text-gold/15 pointer-events-none opacity-20">
                <Quote className="w-16 h-16 transform rotate-180" />
              </div>

              {/* Five Star indicator */}
              <div className="flex items-center text-gold mb-6 font-mono space-x-1">
                {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 fill-gold text-gold" />
                ))}
              </div>

              {/* Comment text */}
              <blockquote className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light tracking-wide mb-8">
                "{REVIEWS[currentIndex].comment}"
              </blockquote>

              {/* Author Info */}
              <div className="space-y-1">
                <cite className="not-italic block text-base font-medium font-serif italic tracking-wide text-white">
                  {REVIEWS[currentIndex].name}
                </cite>
                <cite className="not-italic block text-[9px] font-mono uppercase tracking-[0.15em] text-[#E2C284]">
                  {REVIEWS[currentIndex].role} — {REVIEWS[currentIndex].date}
                </cite>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Symmetrical Left Right arrows */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              id="review-prev-btn"
              onClick={handlePrev}
              className="p-3 bg-zinc-950 hover:bg-[#121212] border border-gold/15 rounded-none hover:text-gold cursor-pointer transition-all active:scale-95 text-zinc-400"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Micro dot counters */}
            <div className="flex space-x-2 items-center">
              {REVIEWS.map((_, idx) => (
                <button
                  id={`review-dot-${idx}`}
                  key={idx}
                  onClick={() => {
                    setAutoplayting(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-[3px] rounded-none cursor-pointer transition-all ${
                    currentIndex === idx ? 'bg-gold w-6' : 'bg-zinc-800 w-3'
                  }`}
                />
              ))}
            </div>

            <button
              id="review-next-btn"
              onClick={handleNext}
              className="p-3 bg-zinc-950 hover:bg-[#121212] border border-gold/15 rounded-none hover:text-gold cursor-pointer transition-all active:scale-95 text-zinc-400"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
