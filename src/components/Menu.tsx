import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Fish, ChefHat, Compass, IceCream, GlassWater, Utensils, Search, Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { MENU_ITEMS, CATEGORIES } from '../data';
import { MenuItem } from '../types';
import { useApp } from './AppContext';

export default function Menu() {
  const { addToCart, cart, updateQuantity } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Map icon names to Lucide icon components dynamically
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Fish': return <Fish className="w-4 h-4" />;
      case 'ChefHat': return <ChefHat className="w-4 h-4" />;
      case 'Compass': return <Compass className="w-4 h-4" />;
      case 'IceCream': return <IceCream className="w-4 h-4" />;
      case 'GlassWater': return <GlassWater className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  // Filter items based on selected category and text query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const query = searchQuery.toLowerCase().trim();
      
      // Get the display name of the category for searching
      const categoryLabel = CATEGORIES.find(c => c.id === item.category)?.name.toLowerCase() || '';
      
      const matchesSearch = query === '' ||
                            item.name.toLowerCase().includes(query) ||
                            item.description.toLowerCase().includes(query) ||
                            categoryLabel.includes(query);
      
      // If we are searching, we ignore the category filter to provide a "Global Search" experience
      // This ensures that if a user searches for something, they find it regardless of the tab they are on.
      const isGlobalSearch = query !== '';
      const matchesCategory = isGlobalSearch || activeCategory === 'all' || item.category === activeCategory;
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // Check if item is already in cart to show helper button details
  const getCartQty = (itemId: string) => {
    const itemInCart = cart.find((c) => c.menuItem.id === itemId);
    return itemInCart ? itemInCart.quantity : 0;
  };

  return (
    <section id="menu" className="relative py-24 bg-[#0A0A0A] text-[#F5F5F5] scroll-mt-20">
      {/* Symmetrical golden fog background element */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Elements */}
        <div className="text-center space-y-4 mb-16">
          <p className="small-caps">
            Epicurean Treasures
          </p>
          <h2 className="text-3xl sm:text-5xl font-light font-serif italic text-white tracking-normal">
            Explore Our Grand Menu
          </h2>
          <p className="text-xs sm:text-xs text-zinc-400 max-w-lg mx-auto font-light leading-relaxed">
            Every dish is fresh-crafted to order on genuine hot embers, seasoned with artisanal hand-ground spices and ocean minerals.
          </p>
        </div>

        {/* Search and Categories Toolbar bar */}
        <div className="space-y-6 mb-12">
          {/* Fuzzy Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="menu-search-input"
              type="text"
              placeholder="Search succulent botis, grilled fish, mocktails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-zinc-950 border border-gold/25 rounded-none text-sm text-gray-200 placeholder-zinc-500 focus:outline-none focus:border-gold/70 focus:ring-2 focus:ring-gold/20 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[10px] uppercase font-mono text-gold/65 hover:text-gold cursor-pointer hover:bg-gold/5 transition-colors"
                title="Clear search"
              >
                Clear
              </button>
            )}
          </div>

          {/* Symmetrical Scrollable Horizontal Tab Buttons */}
          <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin select-none gap-2">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  id={`category-tab-${cat.id}`}
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-none text-xs font-semibold uppercase tracking-widest whitespace-nowrap cursor-pointer transition-all duration-300 ${
                    active
                      ? 'gold-gradient text-black font-bold shadow-lg'
                      : 'bg-[#121212]/40 text-zinc-400 border border-gold/10 hover:text-white hover:border-gold/30'
                  }`}
                >
                  <span className={`${active ? 'text-black' : 'text-gold'}`}>
                    {getIcon(cat.icon)}
                  </span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dishes Grid container with animations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const qty = getCartQty(item.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  key={item.id}
                  className="group relative rounded-none border border-gold/10 bg-white/[0.01] p-5 flex flex-col h-full hover:border-gold/35 hover:bg-white/[0.03] transition-all duration-300 hover:shadow-[0_10px_35px_-10px_rgba(197,160,89,0.08)] overflow-hidden"
                >
                  {/* Glowing card reflection mask */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Photo container */}
                  <div className="relative aspect-4/3 rounded-none overflow-hidden bg-zinc-950 mb-5 border border-gold/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient shadow inside photo footer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-90" />

                    {/* Popular ribbon */}
                    {item.isPopular && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 gold-gradient text-[9px] font-bold text-black uppercase tracking-widest rounded-none shadow-md z-10">
                        Popular
                      </span>
                    )}

                    {/* Star Rating Badge */}
                    <div className="absolute bottom-3 right-3 flex items-center space-x-1 px-2 py-0.5 bg-[#0A0A0A]/85 backdrop-blur-sm border border-gold/20 rounded-none text-[10px] font-semibold text-gold font-mono">
                      <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Descriptions block */}
                  <div className="flex-grow space-y-2 mb-6">
                    <h3 className="text-base font-bold uppercase tracking-wide text-white group-hover:text-gold transition-colors duration-200">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Action drawer line */}
                  <div className="flex items-center justify-end border-t border-gold/10 pt-4 mt-auto">
                    {/* Add to Order Controllers */}
                    {qty > 0 ? (
                      <div className="flex items-center space-x-1 bg-zinc-950 border border-gold/30 rounded-none py-1.5 px-2">
                        <button
                          onClick={() => updateQuantity(item.id, qty - 1)}
                          className="p-1 text-zinc-400 hover:text-white cursor-pointer font-bold"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-bold text-gold px-2 min-w-[18px] text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, qty + 1)}
                          className="p-1 text-zinc-400 hover:text-white cursor-pointer font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center space-x-1.5 px-4 py-2.5 bg-zinc-950 border border-gold/15 text-zinc-350 rounded-none hover:border-gold hover:bg-gold hover:text-black cursor-pointer transition-all duration-300 group/add"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-gold group-hover/add:text-black transition-colors" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Add to order</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Result helper message */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider">
              No coastal dishes match your search query: "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 text-xs font-bold uppercase tracking-wide text-gold hover:text-gold-light underline cursor-pointer"
            >
              Reset Search Filter
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
