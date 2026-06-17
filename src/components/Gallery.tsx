import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Camera, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'culinary' | 'ambiance' | 'seaside'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'culinary', label: 'Culinary Art' },
    { id: 'ambiance', label: 'Warm Ambiance' },
    { id: 'seaside', label: 'Seaside Vibe' },
  ] as const;

  // Keypress event handler to close on ESC or browse with Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const filteredGallery = GALLERY_ITEMS.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const handlePrev = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? filteredGallery.length - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === filteredGallery.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <section id="gallery" className="relative py-24 bg-[#0A0A0A] text-[#F5F5F5] scroll-mt-20 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Gallery Title Block */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gold/10 border border-gold/15 rounded-none animate-pulse">
            <Camera className="w-3.5 h-3.5 text-gold" />
            <span className="text-[10px] uppercase font-mono tracking-[0.15em] text-gold font-bold">
              The Coastal Lens
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light font-serif italic text-white tracking-normal">
            Seaside Chronicles
          </h2>
          <p className="text-xs sm:text-xs text-zinc-400 max-w-sm mx-auto font-light leading-relaxed">
            A visual journey through the magical evening illumination and gourmet excellence of Kolachi at Do Darya.
          </p>

          {/* Symmetrical Mini Category Toggle Strip */}
          <div className="flex items-center justify-center space-x-2 gap-1.5 pt-6 select-none flex-wrap">
            {filters.map((f) => (
              <button
                id={`gallery-filter-${f.id}`}
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-none text-[10px] sm:text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all duration-300 ${
                  activeFilter === f.id
                    ? 'bg-gradient-to-r from-[#C5A059] to-[#E2C284] text-black shadow-lg'
                    : 'bg-zinc-950 border border-gold/15 text-zinc-400 hover:text-white hover:border-gold'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-Style Layout Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-none bg-white/[0.01] border border-gold/10 overflow-hidden cursor-pointer aspect-4/3 sm:aspect-square md:aspect-4/3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-75"
                  referrerPolicy="no-referrer"
                />

                {/* Hover overlay element */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-3.5 bg-black/85 backdrop-blur-md rounded-none border border-gold/30 text-gold">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-5 lg:p-6 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-gold block mb-1 font-bold">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-medium font-serif italic text-white tracking-wide">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Portal Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-10 select-none"
            >
              <div className="absolute inset-0 bg-radial-gradient-vignette opacity-80 pointer-events-none" />

              {/* Close Handle Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-2 rounded-none border border-gold/15 bg-zinc-950 text-gray-300 hover:text-gold cursor-pointer z-50 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigate Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 p-3 rounded-none border border-gold/15 bg-zinc-950/50 hover:bg-[#121212] text-gray-300 hover:text-gold cursor-pointer z-50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Navigation Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 p-3 rounded-none border border-gold/15 bg-zinc-950/50 hover:bg-[#121212] text-gray-300 hover:text-gold cursor-pointer z-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Central Box Panel Container */}
              <div className="relative max-w-4xl w-full h-full max-h-[75vh] flex flex-col justify-center items-center">
                <motion.img
                  key={lightboxIndex}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={filteredGallery[lightboxIndex].image}
                  alt={filteredGallery[lightboxIndex].title}
                  className="max-w-full max-h-[65vh] object-contain rounded-none shadow-2xl border border-gold/15"
                  referrerPolicy="no-referrer"
                />

                {/* Sub-label banner */}
                <div className="text-center mt-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#E2C284] block mb-1">
                    {filteredGallery[lightboxIndex].category}
                  </span>
                  <h4 className="text-base font-medium font-serif italic text-white leading-relaxed">
                    {filteredGallery[lightboxIndex].title}
                  </h4>
                  <p className="text-[10px] text-zinc-550 uppercase font-mono mt-2 tracking-widest">
                    Slide {lightboxIndex + 1} of {filteredGallery.length}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
