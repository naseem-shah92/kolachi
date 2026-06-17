import { MapPin, Phone, Clock, MessageSquare, Compass, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const contacts = [
    {
      title: 'Our Coordinates',
      description: 'Do Darya, Abdul Sattar Edhi Ave, DHA Phase 8, Karachi, Pakistan',
      icon: MapPin,
    },
    {
      title: 'Voice Resonances',
      description: '+92 21 111 111 001',
      icon: Phone,
      href: 'tel:+9221111111001'
    },
    {
      title: 'Operating Hours',
      description: 'Every Evening: 5:00 PM – Late Night (7 Days a Week)',
      icon: Clock,
    },
    {
      title: 'WhatsApp Ordering',
      description: '021-111-111-001 (Direct Dispatch)',
      icon: MessageSquare,
      href: 'https://wa.me/9221111111001'
    }
  ];

  return (
    <section id="contact" className="relative py-24 bg-[#0A0A0A] text-[#F5F5F5] scroll-mt-20 border-t border-gold/10 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Column 1: Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gold/10 border border-gold/15 rounded-none">
                <Compass className="w-3.5 h-3.5 text-gold" />
                <span className="text-[10px] uppercase font-mono tracking-[0.15em] text-gold font-bold">
                  The Coastal Base
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light font-serif italic text-white tracking-normal">
                Anchorage Details
              </h2>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Connect with our front stewards. Settle private yacht assemblies, schedule ocean-front corporate blocks, or adjust table parameters.
              </p>
            </div>

            {/* List coordinates */}
            <div className="space-y-6">
              {contacts.map((c, index) => {
                const Icon = c.icon;
                const content = (
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-zinc-950 border border-gold/15 rounded-none text-gold group-hover:border-gold group-hover:bg-[#121212] transition-colors">
                      <Icon className="w-5 h-5 stroke-[1.25]" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-wider text-white mb-1">
                        {c.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        {c.description}
                      </p>
                    </div>
                  </div>
                );

                return c.href ? (
                  <a
                    id={`contact-link-${index}`}
                    key={index}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group hover:no-underline cursor-pointer"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={index} className="group">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Maps Panel Grid */}
          <div className="lg:col-span-7 relative h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-none overflow-hidden border border-gold/15 bg-zinc-950 w-full h-[350px] sm:h-[400px] shadow-2xl group"
            >
              {/* Symmetrical golden card reflection top */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059]/35 to-transparent z-10" />

              {/* Standard Map embed for Kolachi Do Darya Karachi */}
              <iframe
                title="Kolachi Restaurant Do Darya Google Map"
                src="https://maps.google.com/maps?q=Kolachi%20Restaurant%20Do%20Darya%20Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="grayscale opacity-75 contrast-115 invert-[85%] group-hover:opacity-85 group-hover:grayscale-[40%] transition-opacity duration-500"
              />

              {/* Decorative Compass watermark overlay on bottom right */}
              <div className="absolute bottom-4 right-4 p-2 bg-black/90 backdrop-blur-md rounded-none border border-gold/20 hidden sm:flex items-center space-x-1.5 shadow select-none font-mono text-[9px] uppercase tracking-wider text-gold">
                <MapPin className="w-3.5 h-3.5" />
                <span>DHA Phase 8, Karachi</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
