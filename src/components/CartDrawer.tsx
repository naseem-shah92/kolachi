import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Plus, Minus, Send, Star, FileSpreadsheet } from 'lucide-react';
import { useApp } from './AppContext';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, cartCount, isCartOpen, setIsCartOpen } = useApp();

  // Name and Phone states to build WhatsApp receipt
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Please enter your name to complete the order.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMsg('Please enter your contact phone.');
      return;
    }

    setErrorMsg('');

    // Format the order template
    let itemDetails = '';
    cart.forEach((item) => {
      itemDetails += `\n• ${item.menuItem.name} [x${item.quantity}]`;
    });

    const msg = `Restaurant: Kolachi Do Darya\n\nCustomer Name:\n${customerName}\n\nPhone:\n${customerPhone}\n\nOrder Details:${itemDetails}\n\nThank you for choosing Kolachi Do Darya!`;

    // Encode message properly according to RFC standards
    const encodedOrder = encodeURIComponent(msg);
    const waUrl = `https://wa.me/9221111111001?text=${encodedOrder}`;

    // Direct tab location update - robust and bypasses popup blockers
    window.location.href = waUrl;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Frosted glass backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-50 cursor-zoom-out"
          />          {/* Right Sliding Cart Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 h-screen w-full sm:max-w-md bg-zinc-950 border-l border-gold/15 shadow-2xl z-50 flex flex-col pt-6"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-gold/15 select-none">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h3 className="text-zinc-100 font-bold uppercase tracking-wider text-sm font-serif italic">
                  Your Coastal Order
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-gold/10 border border-gold/25 rounded-none text-gold font-bold">
                  {cartCount} items
                </span>
              </div>
              <button
                id="cart-close-btn"
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-zinc-500 hover:text-gold cursor-pointer rounded-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Switcher */}
            <div className="flex-grow overflow-y-auto px-6 py-4 scrollbar-thin">
              {cart.length > 0 ? (
                <div className="space-y-6">
                  {/* Cart Items List */}
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.menuItem.id}
                        className="flex items-center space-x-4 p-3 bg-white/[0.015] border border-gold/10 rounded-none group"
                      >
                        {/* Thumbnail */}
                        <div className="w-12 h-12 rounded-none bg-zinc-950 border border-gold/10 overflow-hidden shrink-0">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Title & Quantity adjustments */}
                        <div className="flex-grow select-none">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wide truncate pr-4">
                            {item.menuItem.name}
                          </h4>
                          
                          {/* Controls Row */}
                          <div className="flex items-center space-x-2 mt-1.5">
                            <div className="flex items-center bg-[#0A0A0A] border border-gold/15 rounded-none">
                              <button
                                onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                                className="p-1 text-zinc-400 hover:text-gold cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-[10px] text-zinc-300 font-bold px-2.5 min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                                className="p-1 text-zinc-400 hover:text-gold cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.menuItem.id)}
                              className="p-1 text-zinc-605 hover:text-red-500 cursor-pointer ml-2"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Quantity details */}
                        <div className="text-right shrink-0">
                          <span className="font-mono text-xs text-zinc-400">
                            x{item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Information capture */}
                  <div className="border-t border-gold/10 pt-6 space-y-4">
                    <h4 className="text-[10px] font-mono text-gold uppercase tracking-[0.2em] font-bold">
                      Delivery & Contact Details
                    </h4>

                    {errorMsg && (
                      <p className="text-[10px] text-red-500 font-mono tracking-wide">{errorMsg}</p>
                    )}

                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          placeholder="My Full Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-zinc-950 border border-gold/15 rounded-none text-white placeholder-zinc-500 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="My WhatsApp Contact Number"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-zinc-950 border border-gold/15 rounded-none text-white placeholder-zinc-500 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty state */
                <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4 select-none">
                  <div className="p-4 bg-zinc-950 border border-gold/15 rounded-none text-zinc-650">
                    <ShoppingBag className="w-10 h-10 text-gold/50" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-300 font-serif italic">
                    Your Cart is empty
                  </h4>
                  <p className="text-xs text-zinc-500 max-w-xs leading-relaxed font-light">
                    Sizzle the ocean grill by selecting your favorite Red Snappers and Seekh Kebabs from our grand menu catalog.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 bg-zinc-950 border border-gold/15 text-[10px] font-mono uppercase tracking-widest text-[#E2C284] rounded-none hover:border-gold hover:text-white cursor-pointer transition-colors"
                  >
                    Browse Cuisine
                  </button>
                </div>
              )}
            </div>

            {/* Footer Calculation checkout Block */}
            {cart.length > 0 && (
              <div className="bg-zinc-950 border-t border-gold/15 p-6 space-y-4">
                <button
                  id="cart-submit-btn"
                  onClick={handlePlaceOrder}
                  className="w-full py-4 bg-gradient-to-r from-[#C5A059] to-[#E2C284] rounded-none text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4 text-black shrink-0" />
                  <span>Place Order on WhatsApp</span>
                </button>

                <p className="text-[9px] text-zinc-500 font-mono uppercase text-center tracking-wider font-semibold">
                  Redirects directly to Kolachi official line
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
