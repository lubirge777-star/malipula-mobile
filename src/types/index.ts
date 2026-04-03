// ============================================
// Malipula Suits - Type Definitions
// ============================================

// ---------- Enums ----------

export enum BookingType {
  IN_STORE = 'IN_STORE',
  HOME_VISIT = 'HOME_VISIT',
  VIRTUAL = 'VIRTUAL',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum ProductionStatus {
  MEASUREMENT_TAKEN = 'MEASUREMENT_TAKEN',
  FABRIC_SELECTED = 'FABRIC_SELECTED',
  CUTTING = 'CUTTING',
  SEWING = 'SEWING',
  FITTING = 'FITTING',
  FINISHING = 'FINISHING',
  QUALITY_CHECK = 'QUALITY_CHECK',
  READY = 'READY',
}

// ---------- Product & Catalog ----------

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductItem {
  id: string;
  productId: string;
  sku: string;
  size: string;
  color: string;
  fabricId?: string;
  stockQuantity: number;
  price: number;
  salePrice?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: Category;
  images: ProductImage[];
  items: ProductItem[];
  basePrice: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestseller: boolean;
  isCustomizable: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  productCount: number;
  parentId?: string;
}

export interface Fabric {
  id: string;
  name: string;
  description: string;
  composition: string;
  color: string;
  pattern: string;
  weight: string;
  pricePerMeter: number;
  images: FabricImage[];
  inStock: boolean;
  swatchImage?: string;
}

export interface FabricImage {
  id: string;
  url: string;
  altText?: string;
}

// ---------- Cart ----------

export interface CartItem {
  id: string;
  product: Product;
  productItem: ProductItem;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  fabricId?: string;
}

// ---------- Wishlist ----------

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

// ---------- Orders ----------

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selectedColor?: string;
  selectedSize?: string;
  fabricName?: string;
  customizationNotes?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  transactionRef?: string;
  paidAt?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  status: OrderStatus;
  productionStatus?: ProductionStatus;
  payment: Payment;
  shippingAddress?: Address;
  billingAddress?: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

// ---------- User ----------

export interface Address {
  id?: string;
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
  latitude?: number;
  longitude?: number;
}

export interface Measurement {
  id?: string;
  name: string;
  value: number;
  unit: 'cm' | 'inches';
}

export interface MeasurementProfile {
  id: string;
  userId: string;
  name: string;
  isDefault: boolean;
  measurements: Measurement[];
  lastUsed?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  addresses: Address[];
  measurementProfiles: MeasurementProfile[];
  loyaltyPoints: number;
  createdAt: string;
  updatedAt: string;
}

// ---------- Appointments ----------

export interface Stylist {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  specialties: string[];
  rating: number;
  bio?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  stylistId: string;
  stylist: Stylist;
  type: BookingType;
  date: string;
  time: string;
  duration: number; // minutes
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  location?: string;
  notes?: string;
  createdAt: string;
}

// ---------- Reviews ----------

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  createdAt: string;
  isVerified: boolean;
}

// ---------- Promotions ----------

export interface Promotion {
  id: string;
  code: string;
  name: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED' | 'FREE_SHIPPING';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  applicableCategories?: string[];
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
}

// ---------- API & Pagination ----------

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface SearchFilters {
  query?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'rating' | 'name';
  inStock?: boolean;
  isNew?: boolean;
  isCustomizable?: boolean;
}
