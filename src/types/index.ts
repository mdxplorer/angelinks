export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface Catalog {
  id: string;
  seller_id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  cover_image: string;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  catalog_id: string;
  name: string;
  description: string;
  category: string;
  catalog_price: number;
  sale_price: number;
  image_url: string;
  is_available: boolean;
  sort_order: number;
}

export interface Order {
  id: string;
  catalog_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_notes: string;
  total: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
