import { motion } from 'motion/react';
import { Sparkles, Compass, Heart, Users, Milestone } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      title: 'Majestic Sea View Platforms',
      subtitle: 'The Infinite Arabian Sea',
      description: 'Linger on our hand-planked mahogany wooden docks where the calm tidal waves crash gently directly beneath your dining table, reflecting Karachi\'s sparkling star map.',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
      span: 'lg:col-span-8'
    },
    {
      title: 'Romantic Sunset Glows',
      subtitle: 'Candlelight & Sclera Waves',
      description: 'Transform arbitrary weeknights into celestial celebrations with amber lanterns, premium crystal stemware, and customized chef platters.',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800',
      span: 'lg:col-span-4'
    },
    {
      title: 'Generational Family Tables',
      subtitle: 'Safe, Serene, & Spirited',
      description: 'Generous multi-tier round-tables built specifically with deep-backed cozy seating for large heritage families to enjoy multi-dish conversations.',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
      span: 'lg:col-span-4'
    },
    {
      title: 'Milestone VIP Events',
      subtitle: 'Anniversaries & Annointments',
      description: 'From grand corporate assemblies to private seaside birthday assemblies, Kolachi provides signature customized catering and personal stewards.',
      icon: Milestone,
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
      span: 'lg:col-span-8'
    }
  ];

  return (
    <section id="experience" className="relative py-24 bg-[#0A0A0A] text-[#F5F5F5] overflow-hidden scroll-mt-20">
      <div className="absolute right-10 bottom-10 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title structure */}
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gold/10 border border-gold/15 rounded-none animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-[10px] uppercase font-mono tracking-[0.15em] text-gold font-bold">
                Atmosphere & Moods
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light font-serif italic text-white tracking-normal">
              Beyond Five-Star Dining
            </h2>
          </div>
          <p className="text-xs sm:text-xs text-zinc-400 max-w-sm font-light leading-relaxed">
            An atmospheric symphony representing Pakistan's ultimate beachhead culture. We don't just sell dishes, we curate memories.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                key={index}
                className={`group relative overflow-hidden rounded-none bg-white/[0.01] border border-gold/15 flex flex-col justify-end min-h-[380px] sm:min-h-[420px] p-6 lg:p-8 ${exp.span}`}
              >
                {/* Photo Layer with Zoom effect */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 duration-700 ease-out transition-transform filter brightness-45 group-hover:brightness-50"
                    referrerPolicy="no-referrer"
                  />
                  {/* Luxury color gradient shadows */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-85" />
                </div>

                {/* Contents layer */}
                <div className="relative z-10 space-y-3 prose pr-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2.5 rounded-none bg-gold/10 border border-gold/25 text-gold">
                      <Icon className="w-4.5 h-4.5 stroke-[1.25]" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#E2C284] font-bold">
                      {exp.subtitle}
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-medium font-serif italic text-white">
                    {exp.title}
                  </h3>
                  
                  <p className="text-xs sm:text-xs text-zinc-400 leading-relaxed font-light">
                    {exp.description}
                  </p>
                </div>

                {/* Symmetrical golden trim outline */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] gold-gradient w-0 group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
