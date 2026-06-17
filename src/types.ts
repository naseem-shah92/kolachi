export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in PKR
  category: 'bbq' | 'seafood' | 'pakistani' | 'chinese' | 'dessert' | 'drinks';
  rating: number;
  image: string;
  isPopular?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Reservation {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'sea-front' | 'inner-deck' | 'royal-lounge' | 'any';
  occasion?: string;
  notes?: string;
  specialNotes?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'culinary' | 'ambiance' | 'seaside';
  image: string;
}
