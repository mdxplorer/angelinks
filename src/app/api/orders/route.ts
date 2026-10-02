import { NextRequest, NextResponse } from "next/server";
import { createOrder, getOrders } from "@/lib/store";
import { sendOrderNotification } from "@/lib/email";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      catalog_id,
      customer_name,
      customer_phone,
      customer_address,
      customer_city,
      customer_notes,
      total,
      items,
    } = body;

    if (!catalog_id || !customer_name || !customer_phone || !customer_address || !customer_city) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "El pedido debe tener al menos un producto" },
        { status: 400 }
      );
    }

    const order = await createOrder({
      catalog_id,
      customer_name,
      customer_phone,
      customer_address,
      customer_city,
      customer_notes: customer_notes || "",
      total,
      items,
    });

    // Find catalog + seller email for notification
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (serviceKey && supabaseUrl) {
      const admin = createClient(supabaseUrl, serviceKey);
      const { data: catalog } = await admin
        .from("catalogs")
        .select("*")
        .eq("id", catalog_id)
        .single();

      if (catalog) {
        const { data: profile } = await admin
          .from("profiles")
          .select("email, whatsapp, name")
          .eq("id", catalog.seller_id)
          .single();

        if (profile?.email) {
          await sendOrderNotification(order, catalog, profile.email);
        }

        return NextResponse.json({
          order,
          seller: profile ? { name: profile.name, whatsapp: profile.whatsapp } : null,
        }, { status: 201 });
      }
    }

    return NextResponse.json({ order, seller: null }, { status: 201 });
  } catch (error) {
    console.error("[AngeLinks] Order error:", error);
    return NextResponse.json(
      { error: "Error al crear el pedido" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const catalogId = req.nextUrl.searchParams.get("catalog_id") || undefined;
  const orders = await getOrders(catalogId);
  return NextResponse.json({ orders });
}
