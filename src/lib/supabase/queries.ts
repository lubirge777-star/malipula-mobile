// ============================================
// Malipula Suits - Supabase Query Helpers
// ============================================

import { supabase } from './client';
import type {
  Product,
  Category,
  Fabric,
  Order,
  Appointment,
  Review,
  Promotion,
  PaginatedResponse,
  SearchFilters,
  MeasurementProfile,
  Address,
} from '../../types';

// ---------- Products ----------

export async function getProducts(
  page = 1,
  pageSize = 20,
  filters?: SearchFilters
): Promise<PaginatedResponse<Product>> {
  let query = supabase
    .from('products')
    .select('*, category:categories(*), images:product_images(*), items:product_items(*)', { count: 'exact' })
    .eq('is_active', true)
    .range((page - 1) * pageSize, page * pageSize - 1)
    .order('created_at', { ascending: false });

  if (filters?.categoryId) {
    query = query.eq('category_id', filters.categoryId);
  }
  if (filters?.query) {
    query = query.or(`name.ilike.%${filters.query}%,description.ilike.%${filters.query}%`);
  }
  if (filters?.minPrice !== undefined) {
    query = query.gte('base_price', filters.minPrice);
  }
  if (filters?.maxPrice !== undefined) {
    query = query.lte('base_price', filters.maxPrice);
  }
  if (filters?.inStock) {
    query = query.eq('items.stock_quantity.gt', 0);
  }
  if (filters?.isNew) {
    query = query.eq('is_new', true);
  }
  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        query = query.order('base_price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('base_price', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'rating':
        query = query.order('rating', { ascending: false });
        break;
      case 'name':
        query = query.order('name', { ascending: true });
        break;
    }
  }

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return {
    data: (data as unknown as Product[]) ?? [],
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*), images:product_images(*), items:product_items(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) return null;
  return data as unknown as Product;
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*), images:product_images(*), items:product_items(*)')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) return null;
  return data as unknown as Product;
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 8): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*), images:product_images(*), items:product_items(*)')
    .eq('category_id', categoryId)
    .neq('id', productId)
    .eq('is_active', true)
    .limit(limit);

  if (error) return [];
  return (data as unknown as Product[]) ?? [];
}

// ---------- Categories ----------

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) return [];
  return (data as unknown as Category[]) ?? [];
}

// ---------- Fabrics ----------

export async function getFabrics(): Promise<Fabric[]> {
  const { data, error } = await supabase
    .from('fabrics')
    .select('*')
    .eq('in_stock', true)
    .order('name', { ascending: true });

  if (error) return [];
  return (data as unknown as Fabric[]) ?? [];
}

export async function getFabricById(id: string): Promise<Fabric | null> {
  const { data, error } = await supabase
    .from('fabrics')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as unknown as Fabric;
}

// ---------- Orders ----------

export async function getUserOrders(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*), payment:payments(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) return [];
  return (data as unknown as Order[]) ?? [];
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*), payment:payments(*)')
    .eq('id', orderId)
    .single();

  if (error) return null;
  return data as unknown as Order;
}

export async function createOrder(orderData: {
  userId: string;
  items: Array<{
    productId: string;
    productItemId: string;
    quantity: number;
    unitPrice: number;
  }>;
  shippingAddressId?: string;
  notes?: string;
}): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: orderData.userId,
      status: 'PENDING',
      notes: orderData.notes,
    })
    .select('*, items:order_items(*), payment:payments(*)')
    .single();

  if (error) throw new Error(error.message);
  return data as unknown as Order;
}

// ---------- Appointments ----------

export async function getUserAppointments(userId: string): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, stylist:stylists(*)')
    .eq('user_id', userId)
    .order('date', { ascending: true });

  if (error) return [];
  return (data as unknown as Appointment[]) ?? [];
}

export async function bookAppointment(appointmentData: {
  userId: string;
  stylistId: string;
  type: string;
  date: string;
  time: string;
  duration: number;
  notes?: string;
}): Promise<Appointment> {
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      user_id: appointmentData.userId,
      stylist_id: appointmentData.stylistId,
      type: appointmentData.type,
      date: appointmentData.date,
      time: appointmentData.time,
      duration: appointmentData.duration,
      notes: appointmentData.notes,
      status: 'UPCOMING',
    })
    .select('*, stylist:stylists(*)')
    .single();

  if (error) throw new Error(error.message);
  return data as unknown as Appointment;
}

export async function cancelAppointment(appointmentId: string): Promise<boolean> {
  const { error } = await supabase
    .from('appointments')
    .update({ status: 'CANCELLED' })
    .eq('id', appointmentId);

  return !error;
}

// ---------- Reviews ----------

export async function getProductReviews(productId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  if (error) return [];
  return (data as unknown as Review[]) ?? [];
}

export async function addReview(reviewData: {
  productId: string;
  userId: string;
  rating: number;
  title?: string;
  comment: string;
}): Promise<Review> {
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      product_id: reviewData.productId,
      user_id: reviewData.userId,
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as unknown as Review;
}

// ---------- Promotions ----------

export async function getActivePromotions(): Promise<Promotion[]> {
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('is_active', true)
    .lte('valid_from', new Date().toISOString())
    .gte('valid_until', new Date().toISOString());

  if (error) return [];
  return (data as unknown as Promotion[]) ?? [];
}

export async function validatePromoCode(code: string): Promise<Promotion | null> {
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('is_active', true)
    .lte('valid_from', new Date().toISOString())
    .gte('valid_until', new Date().toISOString())
    .single();

  if (error) return null;
  return data as unknown as Promotion;
}

// ---------- Cart (persisted) ----------

export async function getSavedCart(userId: string) {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, product:products(*), product_item:product_items(*)')
    .eq('user_id', userId);

  if (error) return [];
  return data ?? [];
}

// ---------- Wishlist (persisted) ----------

export async function getWishlist(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('wishlist_items')
    .select('product_id')
    .eq('user_id', userId);

  if (error) return [];
  return data?.map((item: any) => item.product_id) ?? [];
}

export async function toggleWishlist(userId: string, productId: string): Promise<boolean> {
  // Check if already wishlisted
  const { data: existing } = await supabase
    .from('wishlist_items')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single();

  if (existing) {
    await supabase.from('wishlist_items').delete().eq('id', existing.id);
    return false; // removed
  } else {
    await supabase.from('wishlist_items').insert({
      user_id: userId,
      product_id: productId,
    });
    return true; // added
  }
}

// ---------- User Profiles ----------

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data;
}

export async function updateUserProfile(userId: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// ---------- Addresses ----------

export async function getUserAddresses(userId: string): Promise<Address[]> {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId)
    .order('is_default', { ascending: false });

  if (error) return [];
  return (data as unknown as Address[]) ?? [];
}

export async function addAddress(userId: string, address: Omit<Address, 'id'>) {
  const { data, error } = await supabase
    .from('addresses')
    .insert({ ...address, user_id: userId })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// ---------- Measurements ----------

export async function getMeasurementProfiles(userId: string): Promise<MeasurementProfile[]> {
  const { data, error } = await supabase
    .from('measurement_profiles')
    .select('*, measurements:profile_measurements(*)')
    .eq('user_id', userId)
    .order('is_default', { ascending: false });

  if (error) return [];
  return (data as unknown as MeasurementProfile[]) ?? [];
}
