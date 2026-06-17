import { MenuItem, Review, GalleryItem } from './types';

export const CATEGORIES = [
  { id: 'all', name: 'Full Menu', icon: 'Utensils' },
  { id: 'bbq', name: 'BBQ Specialties', icon: 'Flame' },
  { id: 'seafood', name: 'Ocean Catch', icon: 'Fish' },
  { id: 'pakistani', name: 'Karahi & Handi', icon: 'ChefHat' },
  { id: 'chinese', name: 'Continental & Chinese', icon: 'Compass' },
  { id: 'dessert', name: 'Sheer & Desserts', icon: 'IceCream' },
  { id: 'drinks', name: 'Mocktails & Chai', icon: 'GlassWater' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dynamite-prawns',
    name: 'Kolachi Dynamite Prawns',
    description: 'Crispy golden prawns (dynamite shrimp) tossed in our signature spicy dynamite sauce, served as a perfect seaside appetizer.',
    price: 0,
    category: 'seafood',
    rating: 4.9,
    image: '/assets/images/dynamite_shrimp_dish_1780525534692.png',
    isPopular: true
  },
  {
    id: 'chappal-kabab',
    name: 'Peshawari Chappal Kabab Platter',
    description: 'Authentic hand-minced meat kababs seasoned with traditional spices and pomegranate seeds, grilled to juicy perfection.',
    price: 0,
    category: 'bbq',
    rating: 4.8,
    image: '/assets/images/chapli_kebab_dish_1780525550424.png',
    isPopular: true
  },
  {
    id: 'charcoal-fish',
    name: 'Charcoal Grilled Whole Fish Special',
    description: 'Freshly caught whole fish marinated in Kolachi secret spices and slow-grilled over charcoal for an authentic smoky flavor.',
    price: 0,
    category: 'seafood',
    rating: 4.9,
    image: '/assets/images/grilled_fish_dish_1780525571298.png',
    isPopular: true
  },
  {
    id: 'cheese-naan',
    name: 'Gourmet Cheese Garlic Naan',
    description: 'Soft tandoori bread stuffed with premium mozzarella cheese and brushed with herb butter.',
    price: 0,
    category: 'pakistani',
    rating: 4.8,
    image: '/assets/images/garlic_naan_dish_1780525587190.png',
    isPopular: true
  },
  {
    id: 'fish-chips',
    name: 'Executive Fish & Fries',
    description: 'Crispy battered fish fillets served with golden fries and our house-made tartar sauce.',
    price: 0,
    category: 'seafood',
    rating: 4.7,
    image: '/assets/images/fish_fingers_dish_1780525603900.png',
    isPopular: false
  },
  {
    id: 'seekh-kabab',
    name: 'Mutton Seekh Kabab Feast',
    description: 'Succulent mutton boti skewers prepared with traditional spices and slow-cooked over burning embers.',
    price: 0,
    category: 'bbq',
    rating: 4.9,
    image: '/assets/images/seekh_kebab_dish_1780525623427.png',
    isPopular: true
  },
  {
    id: 'chicken-sajji',
    name: 'Balochi Sajji Roasted Chicken',
    description: 'Traditional Balochi style whole chicken roasted on skewers, served with aromatic rice.',
    price: 0,
    category: 'pakistani',
    rating: 4.8,
    image: '/assets/images/bihari_boti_dish_1780525640768.png',
    isPopular: true
  },
  {
    id: 'karahi-special',
    name: 'Signature Balochi Karahi',
    description: 'Our signature karahi prepared with fresh tomatoes, green chilies, and a blend of hand-ground spices.',
    price: 0,
    category: 'pakistani',
    rating: 4.8,
    image: '/assets/images/chicken_sajji_roasting_1780525662103.png',
    isPopular: true
  },
  {
    id: 'creamy-mushroom-steak',
    name: 'Coastal Grilled Mushroom Steak',
    description: 'Charbroiled chicken breast covered in a decadent mushroom-cream sauce, served with skin-on potato wedges and sautéed sea-salt veggies.',
    price: 0,
    category: 'chinese',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    isPopular: false
  },
  {
    id: 'lahori-fish',
    name: 'Special Lahori Sea Fish',
    description: 'Crunchy deep-fried local fish fillets marinated in gram flour, carom seeds, crushed coriander, and hot spices.',
    price: 0,
    category: 'seafood',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
    isPopular: false
  },
  {
    id: 'shahi-tukra',
    name: 'Gourmet Mughal Shahi Tukra',
    description: 'Luxurious gold-gilded fried bread soaked in saffron-infused thickened milk (rabri), heavily loaded with sliced pistachios and almonds.',
    price: 0,
    category: 'dessert',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800',
    isPopular: false
  },
  {
    id: 'molten-cake',
    name: 'Infinite Chocolate Lava Indulgence',
    description: 'Oozing hot dark chocolate cake paired perfectly with a scoop of premium Madagascan vanilla pod ice cream.',
    price: 0,
    category: 'dessert',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    isPopular: false
  },
  {
    id: 'mint-margarita',
    name: 'Frozen Ocean Mint Margarita',
    description: 'Crushed garden-fresh mint leaves, sweet lime juice, simple syrup, blended to icy perfection. The ultimate coastal mocktail.',
    price: 0,
    category: 'drinks',
    rating: 4.9,
    image: '/assets/images/kolachi_mint_margarita_refreshment_1780526895246.png',
    isPopular: true
  },
  {
    id: 'peshawari-kahwa',
    name: 'Fragrant Coastal Peshawari Kahwa',
    description: 'Fragrant traditional green tea spiked with green cardamom pods and served alongside organic saffron sugar blocks.',
    price: 0,
    category: 'drinks',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
    isPopular: false
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Zainab Rashid',
    role: 'Local Guide • Karachi',
    rating: 5,
    comment: 'An absolutely magical dining experience! Dining on the secure wooden decks while watching the dark waves of the Arabian Sea crash gently beneath was unreal. The Charcoal Grilled Red Snapper was tender, spicy, and smoky. Unmatched service quality!',
    date: '2026-05-18'
  },
  {
    id: 'rev-2',
    name: 'Kamran Alvi',
    role: 'Connoisseur • UAE',
    rating: 5,
    comment: 'Kolachi Do Darya remains Karachi\'s absolute pride. Every time I visit Pakistan, this is my first stop. The Dynamite Shrimp are superior to international chains and the Melt-in-mouth Malai Boti is incredibly soft. Fast, attentive service with a marvelous breeze.',
    date: '2026-05-24'
  },
  {
    id: 'rev-3',
    name: 'Dr. Sarah Bukhari',
    role: 'Family Diner',
    rating: 5,
    comment: 'The absolute best family friendly luxury dining out there. We celebrate all our family occasions here. The ocean view tables give a gorgeous backdrop, and kids went crazy over the Dynamite Chicken & Cheese Naan. Booking beforehand makes the entry ultra smooth!',
    date: '2026-05-29'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Frozen Ocean Mint Margarita - Signature Chill',
    category: 'culinary',
    image: '/assets/images/kolachi_mint_margarita_refreshment_1780526895246.png'
  },
  {
    id: 'gal-2',
    title: 'Ruby Pomegranate Sparkler',
    category: 'culinary',
    image: '/assets/images/kolachi_pomegranate_sparkler_drink_1780526916000.png'
  },
  {
    id: 'gal-3',
    title: 'Emerald Coast Tropical Mocktail',
    category: 'culinary',
    image: '/assets/images/kolachi_blue_lagoon_mocktail_1780526935058.png'
  }
];
