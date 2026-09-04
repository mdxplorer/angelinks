import { NextRequest, NextResponse } from "next/server";
import { createOrder, getCatalog, getOrders } from "@/lib/store";
import { sendOrderNotification } from "@/lib/email";
import { demoSeller } from "@/lib/demo-data";

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

    // Find catalog for email context
    const catalogs = await (async () => {
      const { getCatalogs } = await import("@/lib/store");
      return getCatalogs();
    })();
    const catalog = catalogs.find((c) => c.id === catalog_id);

    if (catalog) {
      await sendOrderNotification(order, catalog, demoSeller.email);
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("[CataLink] Order error:", error);
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
