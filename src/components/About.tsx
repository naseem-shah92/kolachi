import { motion } from 'motion/react';
import { Waves, Sparkles, Trophy, Users, ShieldCheck } from 'lucide-react';

export default function About() {
  const metrics = [
    { value: '350+', label: 'Seaside Tables', icon: Waves },
    { value: '55+', label: 'Master Kebab Chefs', icon: Trophy },
    { value: '28k+', label: '5-Star Testimonials', icon: Users },
    { value: '100%', label: 'Fresh Sea Catch', icon: ShieldCheck },
  ];

  const highlights = [
    {
      title: 'Built Upon Raw Ocean Waves',
      description: 'Perched strategically on DHA Phase 8\'s glorious Do Darya strip, Kolachi creates a majestic wooden stadium overlooking the infinity of the Arabian sea.',
    },
    {
      title: 'A Century of Charcoal Gastronomy',
      description: 'Our generational spices represent the cultural crossroads of old Lahore, the Balochi deserts, and Karachi\'s oceanic rich culinary soul.',
    },
    {
      title: 'Attentive Royal Hospitality',
      description: 'Over 400 dedicated hosts ensure that your coastal breeze and ocean sunsets are coupled with flawless, prompt table timing.',
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#0A0A0A] text-[#F5F5F5] overflow-hidden scroll-mt-10">
      {/* Background ambient lighting */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Column 1: Immersive Editorial Copy */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gold/10 border border-gold/15 rounded-none">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold font-semibold">
                  The Legend of Kolachi
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif italic text-white leading-tight">
                Where کراچی <br className="sm:hidden" /> Meets the Infinite Horizon
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Named after the historic fishing settlement that birthed modern Karachi, **Kolachi** stands as a high-end monument to coastal luxury. Since our inception along the rocky shores of Do Darya, we have crafted an open-air sensory oasis where the crisp sea breeze carries the sizzling notes of freshly roasted Sajji and seasoned Red Snapper.
              </p>
            </motion.div>

            {/* highlights blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {highlights.map((hl, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  key={index}
                  className="p-5 rounded-none bg-white/[0.02] border border-gold/10 hover:border-gold/35 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                    {hl.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {hl.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Imagery & Stats Wall */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Outer decorative gold border container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-none overflow-hidden border border-gold/15 shadow-2xl bg-[#0A0A0A] aspect-square max-h-[380px] lg:max-h-none"
              >
                {/* Secondary generated asset showcasing the visual signature layout */}
                <img
                  src="/assets/images/kolachi_signature_bbq_1780357669998.png"
                  alt="Prestige Pakistani BBQ Platter"
                  className="w-full h-full object-cover grayscale-10 contrast-110 hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating ambient badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[#E2C284] mb-1 font-semibold">
                    Signature Culinary Art
                  </p>
                  <h4 className="text-base font-medium font-serif italic tracking-wide text-white">
                    Generational Spice Secrets cooked on Real Charcoal
                  </h4>
                </div>
              </motion.div>

              {/* Offset decorative block frame */}
              <div className="absolute -inset-2.5 border border-gold/15 rounded-none pointer-events-none -z-10" />
            </div>
          </div>
        </div>

        {/* Animated Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-12 border-t border-gold/15">
          {metrics.map((m, index) => {
            const Icon = m.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="p-6 text-center rounded-none bg-white/[0.01] border border-gold/10 hover:bg-white/[0.03] hover:border-gold/30 transition-all text-zinc-100"
              >
                <div className="flex justify-center mb-3 text-gold">
                  <Icon className="w-5 h-5 stroke-[1.25]" />
                </div>
                <div className="text-2xl sm:text-3xl font-light font-serif italic text-gold">
                  {m.value}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400 font-mono mt-1 font-medium">
                  {m.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
