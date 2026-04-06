// Navigation type definitions for Malipula Suits app

export type TabName = 'home' | 'shop' | 'builder' | 'bookings' | 'account' | 'cart';

export interface TabRoute {
  name: TabName;
  label: string;
  icon: string;
  activeIcon: string;
  route: string;
  isFAB?: boolean;
}

export const TAB_ROUTES: TabRoute[] = [
  {
    name: 'home',
    label: 'Home',
    icon: 'home-outline',
    activeIcon: 'home',
    route: '/',
  },
  {
    name: 'shop',
    label: 'Suits',
    icon: 'briefcase-outline',
    activeIcon: 'briefcase',
    route: '/shop',
  },
  {
    name: 'builder',
    label: 'Build',
    icon: 'cut-outline',
    activeIcon: 'cut',
    route: '/builder',
    isFAB: true,
  },
  {
    name: 'bookings',
    label: 'Book',
    icon: 'calendar-outline',
    activeIcon: 'calendar',
    route: '/bookings',
  },
  {
    name: 'account',
    label: 'Account',
    icon: 'person-outline',
    activeIcon: 'person',
    route: '/account',
  },
];

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  type: 'suit' | 'shirt' | 'trousers' | 'blazer' | 'kaftan' | 'accessory';
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Appointment {
  id: string;
  type: 'in-store' | 'virtual' | 'measurement' | 'style-consultation';
  date: string;
  time: string;
  stylist: string;
  stylistImage?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  location?: string;
}

export interface MeasurementProfile {
  id: string;
  name: string;
  date: string;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    shoulders?: number;
    sleeveLength?: number;
    inseam?: number;
    neck?: number;
  };
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'confirmed' | 'tailoring' | 'ready' | 'shipped' | 'delivered';
  total: number;
  items: { name: string; quantity: number; image: string }[];
  trackingNumber?: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  isDefault: boolean;
}
