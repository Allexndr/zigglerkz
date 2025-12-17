// User types
export interface User {
  id: number;
  telegram_id?: number;
  username?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  language: 'ru' | 'kk' | 'en';
  notifications_enabled: boolean;
  created_at: string;
  updated_at: string;
}

// Product types
export interface Product {
  id: number;
  name: string;
  name_kk?: string;
  name_en?: string;
  description?: string;
  price: number;
  discount_price?: number;
  category_id: number;
  material?: string;
  fit_type?: string;
  rating: number;
  review_count: number;
  is_active: boolean;
  created_at: string;
}

export interface ProductSize {
  id: number;
  product_id: number;
  size: string;
  quantity: number;
}

export interface ProductColor {
  id: number;
  product_id: number;
  color_name: string;
  color_hex: string;
  emoji: string;
}

export interface Category {
  id: number;
  name: string;
  name_kk?: string;
  name_en?: string;
  description?: string;
  parent_id?: number;
  emoji: string;
  sort_order: number;
  is_active: boolean;
}

// Cart and Order types
export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  size: string;
  color: string;
  quantity: number;
  added_at: string;
  product?: Product;
}

export interface Favorite {
  id: number;
  user_id: number;
  product_id: number;
  added_at: string;
  product?: Product;
}

export interface Order {
  id: number;
  user_id: number;
  status: OrderStatus;
  total_price: number;
  delivery_type: 'courier' | 'pickup';
  delivery_address?: string;
  delivery_city: string;
  phone: string;
  email?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'shipping'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  size: string;
  color: string;
  quantity: number;
  price: number;
  product?: Product;
}

// Review types
export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  text?: string;
  is_approved: boolean;
  created_at: string;
  user?: Pick<User, 'full_name'>;
}

// UI types
export type Theme = 'light' | 'dark';

export interface FilterOptions {
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  materials: string[];
  categories: number[];
  brands: string[];
  fitTypes: string[];
  seasons: string[];
}

export interface SortOption {
  value: string;
  label: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationInfo;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterForm {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  agree_to_terms: boolean;
}

export interface CheckoutForm {
  delivery_type: 'courier' | 'pickup';
  delivery_city: string;
  delivery_address?: string;
  phone: string;
  email?: string;
  notes?: string;
  payment_method: string;
}

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}
