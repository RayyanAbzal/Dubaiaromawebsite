// Centralized mock data for products
export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  notes: string[];
  inStock: boolean;
  isPopular: boolean;
  popularity: number;
  description: string;
  size: string;
  concentration: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  images: string[];
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: 'Oud Royale',
    category: "Men's Fragrances",
    brand: 'Royal Oud',
    price: 185,
    image: 'https://images.unsplash.com/photo-1737424065216-bc51dd626175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdWQlMjBmcmFncmFuY2UlMjBib3R0bGV8ZW58MXx8fHwxNzYxNzAwMDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Oud', 'Amber', 'Sandalwood'],
    inStock: true,
    isPopular: true,
    popularity: 95,
    description: 'A majestic blend of rare oud wood and warm amber, Oud Royale embodies luxury and sophistication. This rich, complex fragrance opens with spicy notes before revealing a heart of pure oud and amber, settling into a warm base of sandalwood and vanilla.',
    size: '100ml',
    concentration: 'Eau de Parfum',
    topNotes: ['Saffron', 'Cardamom'],
    middleNotes: ['Oud', 'Amber', 'Rose'],
    baseNotes: ['Sandalwood', 'Vanilla', 'Musk'],
    images: [
      'https://images.unsplash.com/photo-1737424065216-bc51dd626175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdWQlMjBmcmFncmFuY2UlMjBib3R0bGV8ZW58MXx8fHwxNzYxNzAwMDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1650686036849-ff87bcaa2e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcmFiaWMlMjBwZXJmdW1lfGVufDF8fHx8MTc2MTU3NTgwMHww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 2,
    name: 'Rose de Damascus',
    category: "Women's Fragrances",
    brand: 'Desert Rose',
    price: 165,
    image: 'https://images.unsplash.com/photo-1759793499819-bf60128a54b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZnJhZ3JhbmNlJTIwZGlzcGxheXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Rose', 'Jasmine', 'Musk'],
    inStock: true,
    isPopular: true,
    popularity: 88,
    description: 'An exquisite tribute to the legendary Damascene rose. This elegant fragrance captures the essence of fresh rose petals with hints of jasmine and a soft musky base.',
    size: '100ml',
    concentration: 'Eau de Parfum',
    topNotes: ['Bergamot', 'Pink Pepper'],
    middleNotes: ['Damascus Rose', 'Jasmine', 'Peony'],
    baseNotes: ['Musk', 'Amber', 'Cedarwood'],
    images: [
      'https://images.unsplash.com/photo-1759793499819-bf60128a54b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZnJhZ3JhbmNlJTIwZGlzcGxheXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 3,
    name: 'Saffron Noir',
    category: 'Unisex',
    brand: 'Oriental Collection',
    price: 145,
    image: 'https://images.unsplash.com/photo-1641926364601-2165cf2304cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNjdWxpbmUlMjBjb2xvZ25lfGVufDF8fHx8MTc2MTY5OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Saffron', 'Patchouli', 'Vanilla'],
    inStock: true,
    isPopular: false,
    popularity: 72,
    description: 'A mysterious and alluring unisex fragrance featuring precious saffron and earthy patchouli, balanced with creamy vanilla.',
    size: '100ml',
    concentration: 'Eau de Parfum',
    topNotes: ['Saffron', 'Nutmeg'],
    middleNotes: ['Patchouli', 'Leather'],
    baseNotes: ['Vanilla', 'Amber', 'Tonka Bean'],
    images: [
      'https://images.unsplash.com/photo-1641926364601-2165cf2304cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNjdWxpbmUlMjBjb2xvZ25lfGVufDF8fHx8MTc2MTY5OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 4,
    name: 'Amber Essence',
    category: 'Attar Oils',
    brand: 'Arabian Nights',
    price: 95,
    image: 'https://images.unsplash.com/photo-1604899083099-75cacc0902dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGVyZnVtZXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Amber', 'Sandalwood', 'Musk'],
    inStock: true,
    isPopular: true,
    popularity: 90,
    description: 'A pure attar oil featuring rich amber and sandalwood. Long-lasting and alcohol-free in the traditional Middle Eastern style.',
    size: '12ml',
    concentration: 'Pure Attar Oil',
    topNotes: ['Bergamot'],
    middleNotes: ['Amber', 'Sandalwood'],
    baseNotes: ['Musk', 'Vanilla'],
    images: [
      'https://images.unsplash.com/photo-1604899083099-75cacc0902dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGVyZnVtZXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 5,
    name: 'Musk Al Tahara',
    category: 'Unisex',
    brand: 'Dubai Aroma Signature',
    price: 75,
    image: 'https://images.unsplash.com/photo-1752214939559-ab5e7c86cd85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBmcmFncmFuY2V8ZW58MXx8fHwxNzYxNjU3NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Musk', 'Rose'],
    inStock: false,
    isPopular: false,
    popularity: 65,
    description: 'Traditional white musk with a subtle rose undertone. A clean, pure fragrance perfect for everyday wear.',
    size: '50ml',
    concentration: 'Eau de Parfum',
    topNotes: ['White Musk'],
    middleNotes: ['Rose', 'Lily'],
    baseNotes: ['Musk', 'Vanilla'],
    images: [
      'https://images.unsplash.com/photo-1752214939559-ab5e7c86cd85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBmcmFncmFuY2V8ZW58MXx8fHwxNzYxNjU3NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 6,
    name: 'Bergamot Breeze',
    category: "Women's Fragrances",
    brand: 'Luxury Essence',
    price: 125,
    image: 'https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYxNjM1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Bergamot', 'Jasmine', 'Vanilla'],
    inStock: true,
    isPopular: false,
    popularity: 78,
    description: 'A fresh and uplifting fragrance with bright bergamot and delicate jasmine, grounded by warm vanilla.',
    size: '75ml',
    concentration: 'Eau de Toilette',
    topNotes: ['Bergamot', 'Lemon', 'Orange'],
    middleNotes: ['Jasmine', 'Neroli', 'Peach'],
    baseNotes: ['Vanilla', 'White Musk', 'Tonka Bean'],
    images: [
      'https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYxNjM1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 7,
    name: 'Sandalwood Premium',
    category: "Men's Fragrances",
    brand: 'Royal Oud',
    price: 155,
    image: 'https://images.unsplash.com/photo-1650686036849-ff87bcaa2e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcmFiaWMlMjBwZXJmdW1lfGVufDF8fHx8MTc2MTU3NTgwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Sandalwood', 'Oud', 'Amber'],
    inStock: true,
    isPopular: true,
    popularity: 85,
    description: 'Premium Australian sandalwood blended with exotic oud and warm amber for a sophisticated masculine scent.',
    size: '100ml',
    concentration: 'Eau de Parfum',
    topNotes: ['Bergamot', 'Black Pepper'],
    middleNotes: ['Sandalwood', 'Oud', 'Cedarwood'],
    baseNotes: ['Amber', 'Musk', 'Vetiver'],
    images: [
      'https://images.unsplash.com/photo-1650686036849-ff87bcaa2e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcmFiaWMlMjBwZXJmdW1lfGVufDF8fHx8MTc2MTU3NTgwMHww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 8,
    name: 'Jasmine Nights',
    category: "Women's Fragrances",
    brand: 'Desert Rose',
    price: 135,
    image: 'https://images.unsplash.com/photo-1734647543247-5ee8bf6f2f3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE2NTc3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Jasmine', 'Rose', 'Patchouli'],
    inStock: true,
    isPopular: false,
    popularity: 70,
    description: 'Intoxicating night jasmine blended with velvety rose and earthy patchouli creates an enchanting evening fragrance.',
    size: '100ml',
    concentration: 'Eau de Parfum',
    topNotes: ['Bergamot', 'Mandarin'],
    middleNotes: ['Jasmine Sambac', 'Rose', 'Ylang Ylang'],
    baseNotes: ['Patchouli', 'Sandalwood', 'Amber'],
    images: [
      'https://images.unsplash.com/photo-1734647543247-5ee8bf6f2f3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE2NTc3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 9,
    name: 'Luxury Gift Set',
    category: 'Gift Sets',
    brand: 'Dubai Aroma Signature',
    price: 299,
    image: 'https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYxNjM1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Oud', 'Rose', 'Amber'],
    inStock: true,
    isPopular: true,
    popularity: 92,
    description: 'An exquisite collection featuring our most popular fragrances in travel-friendly sizes. Perfect for gifting or discovering new scents.',
    size: '3x30ml',
    concentration: 'Gift Set',
    topNotes: ['Various'],
    middleNotes: ['Various'],
    baseNotes: ['Various'],
    images: [
      'https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYxNjM1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  }
];

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export const mockReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userName: 'Sarah M.',
    rating: 5,
    comment: 'Absolutely love this fragrance! The oud is not overpowering and blends beautifully with the amber. Long-lasting and gets compliments all day.',
    date: '2024-11-15',
    verified: true,
    helpful: 12
  },
  {
    id: 2,
    productId: 1,
    userName: 'Michael R.',
    rating: 4,
    comment: 'Great scent for special occasions. A bit strong for everyday wear, but perfect for evenings out.',
    date: '2024-11-10',
    verified: true,
    helpful: 8
  },
  {
    id: 3,
    productId: 2,
    userName: 'Emma L.',
    rating: 5,
    comment: 'The most beautiful rose fragrance I have ever worn. Not too sweet, very elegant and sophisticated.',
    date: '2024-11-12',
    verified: true,
    helpful: 15
  },
  {
    id: 4,
    productId: 2,
    userName: 'Jessica T.',
    rating: 5,
    comment: 'Perfect for work and special events. The scent lasts all day and the packaging is gorgeous!',
    date: '2024-11-08',
    verified: false,
    helpful: 6
  }
];

export interface Store {
  id: number;
  name: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
}

export const stores: Store[] = [
  {
    id: 1,
    name: 'Auckland CBD Store',
    address: '123 Queen Street',
    city: 'Auckland',
    postcode: '1010',
    phone: '+64 9 123 4567',
    email: 'auckland@dubaiaroma.nz',
    hours: {
      weekday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 5:00 PM',
      sunday: '11:00 AM - 4:00 PM'
    },
    coordinates: {
      lat: -36.8485,
      lng: 174.7633
    },
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
  },
  {
    id: 2,
    name: 'Newmarket Store',
    address: '277 Broadway',
    city: 'Auckland',
    postcode: '1023',
    phone: '+64 9 234 5678',
    email: 'newmarket@dubaiaroma.nz',
    hours: {
      weekday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 5:00 PM',
      sunday: '11:00 AM - 4:00 PM'
    },
    coordinates: {
      lat: -36.8687,
      lng: 174.7772
    },
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
  },
  {
    id: 3,
    name: 'Wellington Store',
    address: '45 Lambton Quay',
    city: 'Wellington',
    postcode: '6011',
    phone: '+64 4 345 6789',
    email: 'wellington@dubaiaroma.nz',
    hours: {
      weekday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    coordinates: {
      lat: -41.2865,
      lng: 174.7762
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
  }
];
