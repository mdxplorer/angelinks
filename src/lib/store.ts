import type { Catalog, Product, Order } from "@/types";
import { getSupabase, isSupabaseConfigured } from "./supabase";
import {
  demoCatalogs,
  demoProducts,
  getDemoOrders,
  addDemoOrder,
  getProductsByCatalog,
  getCatalogBySlug,
  getCategories,
} from "./demo-data";

const isDemoMode = () =>
  process.env.NEXT_PUBLIC_DEMO_MODE === "true" || !isSupabaseConfigured();

export async function getCatalogs(sellerId?: string): Promise<Catalog[]> {
  if (isDemoMode()) {
    return sellerId
      ? demoCatalogs.filter((c) => c.seller_id === sellerId)
      : demoCatalogs;
  }
  const query = getSupabase().from("catalogs").select("*").eq("is_active", true);
  if (sellerId) query.eq("seller_id", sellerId);
  const { data } = await query;
  return data || [];
}

export async function getCatalog(slug: string): Promise<Catalog | null> {
  if (isDemoMode()) {
    return getCatalogBySlug(slug) || null;
  }
  const { data } = await getSupabase()
    .from("catalogs")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getProducts(
  catalogId: string,
  category?: string
): Promise<Product[]> {
  if (isDemoMode()) {
    let products = getProductsByCatalog(catalogId);
    if (category) products = products.filter((p) => p.category === category);
    return products;
  }
  const query = getSupabase()
    .from("products")
    .select("*")
    .eq("catalog_id", catalogId)
    .eq("is_available", true)
    .order("sort_order");
  if (category) query.eq("category", category);
  const { data } = await query;
  return data || [];
}

export async function getProductCategories(
  catalogId: string
): Promise<string[]> {
  if (isDemoMode()) {
    return getCategories(catalogId);
  }
  const { data } = await getSupabase()
    .from("products")
    .select("category")
    .eq("catalog_id", catalogId)
    .eq("is_available", true);
  return [...new Set((data || []).map((p: { category: string }) => p.category))];
}

export async function createOrder(order: {
  catalog_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_notes: string;
  total: number;
  items: { product_id: string; product_name: string; quantity: number; unit_price: number }[];
}): Promise<Order> {
  if (isDemoMode()) {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      catalog_id: order.catalog_id,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      customer_address: order.customer_address,
      customer_city: order.customer_city,
      customer_notes: order.customer_notes,
      total: order.total,
      status: "pending",
      created_at: new Date().toISOString(),
      items: order.items.map((item, i) => ({
        id: `item-${Date.now()}-${i}`,
        order_id: `order-${Date.now()}`,
        ...item,
      })),
    };
    addDemoOrder(newOrder);
    return newOrder;
  }

  const db = getSupabase();

  const { data: orderData, error: orderError } = await db
    .from("orders")
    .insert({
      catalog_id: order.catalog_id,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      customer_address: order.customer_address,
      customer_city: order.customer_city,
      customer_notes: order.customer_notes,
      total: order.total,
      status: "pending",
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = order.items.map((item) => ({
    order_id: orderData.id,
    ...item,
  }));

  const { data: itemsData, error: itemsError } = await db
    .from("order_items")
    .insert(orderItems)
    .select();

  if (itemsError) throw itemsError;

  return { ...orderData, items: itemsData || [] };
}

export async function getOrders(catalogId?: string): Promise<Order[]> {
  if (isDemoMode()) {
    const orders = getDemoOrders();
    return catalogId
      ? orders.filter((o) => o.catalog_id === catalogId)
      : orders;
  }
  const query = getSupabase()
    .from("orders")
    .select("*, items:order_items(*)")
    .order("created_at", { ascending: false });
  if (catalogId) query.eq("catalog_id", catalogId);
  const { data } = await query;
  return data || [];
}
