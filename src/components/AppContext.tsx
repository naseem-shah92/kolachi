import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, Reservation } from '../types';

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isReserveOpen: boolean;
  setIsReserveOpen: (open: boolean) => void;
  reservationDetails: Reservation | null;
  submitReservation: (details: Reservation) => void;
  triggerWhatsAppReservation: () => void;
  activeReservationCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const setIsReserveOpen = (open: boolean) => {
    if (open) {
      window.open('https://wa.me/9221111111001?text=I\'d like to book a table at Kolachi Do Darya.', '_blank');
      return;
    }
    setInternalIsReserveOpen(open);
  };

  const [isReserveOpen, setInternalIsReserveOpen] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<Reservation | null>(null);
  const [activeReservationCount, setActiveReservationCount] = useState(38); // Mock busy reservations

  const triggerWhatsAppReservation = () => {
    const msg = `Hello Kolachi Team,\n\nI would like to book a table at the seaside deck. Please let me know the availability.\n\nThank you!`;
    const encoded = encodeURIComponent(msg);
    window.location.href = `https://wa.me/9221111111001?text=${encoded}`;
  };

  // Load cart and reservation from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('kolachi_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart storage', e);
      }
    }
    const savedBooking = localStorage.getItem('kolachi_booking');
    if (savedBooking) {
      try {
        setReservationDetails(JSON.parse(savedBooking));
      } catch (e) {
        console.error('Failed to parse booking storage', e);
      }
    }

    // Dynamic simulation of tables booked to simulate real-time crowd
    const interval = setInterval(() => {
      setActiveReservationCount((prev) => {
        const diff = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const nextVal = prev + diff;
        return nextVal >= 25 && nextVal <= 45 ? nextVal : prev;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Save cart changes to localStorage
  useEffect(() => {
    localStorage.setItem('kolachi_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (menuItem: MenuItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.menuItem.id === menuItem.id);
      if (existing) {
        return prevCart.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { menuItem, quantity: 1 }];
    });
    // Open cart drawer immediately so they see the item added!
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.menuItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuItem.id === itemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const submitReservation = (details: Reservation) => {
    setReservationDetails(details);
    localStorage.setItem('kolachi_booking', JSON.stringify(details));
    setIsReserveOpen(false);

    // Also trigger WhatsApp for the reservation details
    const msg = `Table Reservation Request\n\nName: ${details.name}\nDate: ${details.date}\nTime: ${details.time}\nGuests: ${details.guests}\nOccasion: ${details.occasion || 'General Dining'}\nNotes: ${details.notes || 'None'}\n\nThank you!`;
    const encoded = encodeURIComponent(msg);
    window.location.href = `https://wa.me/9221111111001?text=${encoded}`;
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        isReserveOpen,
        setIsReserveOpen,
        reservationDetails,
        submitReservation,
        triggerWhatsAppReservation,
        activeReservationCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
