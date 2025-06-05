// types/models.ts

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  is_seller?: boolean;
  is_buyer?: boolean;
  created_at?: string;
  updated_at?: string;
  profile_picture?: string | null;
  rating?: number;
}

export interface UserProfile {
  id?: number;
  user: number | User;
  store_name: string;
  description?: string | null;
  bank_account?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface FullProfile {
  user: User;
  profile: UserProfile | null;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  parent?: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  seller: number;
  category: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  discount_price?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  buyer: User;
  total_price: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  shipping_address: string;
  tracking_number?: string;
  payment_status: "pending" | "completed" | "failed";
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

export interface CartItem {
  productId: number;
  quantity: number;
}
export interface OrderTemplate {
  id: number;
  buyer: number;
  template_name: string;
  shipping_address: string;
  created_at: string;
  updated_at: string;
}

export interface OrderTemplateItem {
  id: number;
  order_template: number;
  product: number;
  quantity: number;
}

export interface Payment {
  id: number;
  order: number;
  amount: number;
  payment_method: "credit_card" | "paypal" | "bank_transfer";
  transaction_id: string;
  status: "pending" | "completed" | "failed";
  created_at: string;
}

export interface Review {
  id: number;
  product: Product;
  buyer?: User;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewPost {
  product: number;
  rating: number;
  comment?: string;
}
