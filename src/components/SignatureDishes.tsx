import { motion } from 'motion/react';
import { Star, ShieldCheck, Heart, Sparkles, ShoppingBag } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { useApp } from './AppContext';

export default function SignatureDishes() {
  const { addToCart, cart, updateQuantity } = useApp();

  // Pick top 3 absolute masterpieces of the house
  const masterDishes = MENU_ITEMS.filter((item) => item.isPopular).slice(0, 3);

  const getCartQty = (itemId: string) => {
    const itemInCart = cart.find((c) => c.menuItem.id === itemId);
    return itemInCart ? itemInCart.quantity : 0;
  };

  return (
    <section id="signature" className="relative py-24 bg-[#0A0A0A] text-[#F5F5F5] scroll-mt-20">
      {/* Background ambient gold mist */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title structure */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gold/10 border border-gold/15 rounded-none animate-pulse">
            <Heart className="w-3.5 h-3.5 text-gold fill-gold" />
            <span className="text-[10px] uppercase font-mono tracking-[0.15em] text-gold font-bold">
              The Sovereign Selection
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light font-serif italic text-white tracking-normal">
            Popular Signature Dishes
          </h2>
          <p className="text-xs sm:text-xs text-zinc-405 max-w-lg mx-auto font-light leading-relaxed">
            These recipes represent decades of mastery, using customized dry spice compositions and pristine raw catches.
          </p>
        </div>

        {/* Masterpieces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {masterDishes.map((dish, index) => {
            const qty = getCartQty(dish.id);
            return (
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                key={dish.id}
                className="group relative rounded-none bg-white/[0.02] border border-gold/10 hover:border-gold/30 hover:bg-white/[0.04] transition-all duration-500 flex flex-col h-full overflow-hidden hover:shadow-[0_15px_40px_-10px_rgba(197,160,89,0.1)] p-6"
              >
                {/* Visual Reflection Bar */}
                <div className="absolute inset-x-0 -top-px h-[1.5px] bg-gradient-to-r from-transparent via-gold/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hero Dish Image */}
                <div className="relative aspect-video rounded-none overflow-hidden bg-zinc-950 border border-gold/10 mb-6">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-90"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient bottom bar for caption overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-85" />

                  {/* Top Popular Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 gold-gradient rounded-none flex items-center space-x-1.5 shadow-md">
                    <Sparkles className="w-3 h-3 text-black fill-black" />
                    <span className="text-[9px] font-bold text-black uppercase tracking-widest">Masterpiece</span>
                  </div>

                  {/* Star Rating Badge */}
                  <div className="absolute bottom-3 right-3 flex items-center space-x-1 px-2.5 py-1 bg-[#0A0A0A]/90 backdrop-blur-sm rounded-none border border-gold/20 text-[10px] font-bold text-gold font-mono">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span>{dish.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Content Elements */}
                <div className="flex-grow space-y-2 mb-6 select-none">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-white group-hover:text-gold transition-colors duration-200">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {dish.description}
                  </p>
                </div>

                {/* Symmetrical Controls row */}
                <div className="flex items-center justify-end pt-5 border-t border-gold/10 mt-auto">
                  {/* Controls */}
                  {qty > 0 ? (
                    <div className="flex items-center space-x-2 bg-zinc-950 border border-gold/30 rounded-none p-1 px-2">
                      <button
                        onClick={() => updateQuantity(dish.id, qty - 1)}
                        className="p-1 rounded text-zinc-400 hover:text-white cursor-pointer font-bold"
                      >
                        -
                      </button>
                      <span className="font-mono text-xs font-bold text-gold px-2 min-w-[15px] text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(dish.id, qty + 1)}
                        className="p-1 rounded text-zinc-400 hover:text-white cursor-pointer font-bold"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      id={`sig-add-btn-${dish.id}`}
                      onClick={() => addToCart(dish)}
                      className="flex items-center space-x-2 px-5 py-3 gold-gradient rounded-none text-black font-bold text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-black" />
                      <span>Order Speciality</span>
                    </button>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
