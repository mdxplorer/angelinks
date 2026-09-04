import type { Order, Catalog } from "@/types";

export async function sendOrderNotification(
  order: Order,
  catalog: Catalog,
  sellerEmail: string
): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.log("[AngeLinks] Email skipped — RESEND_API_KEY not configured");
    console.log("[AngeLinks] Order details:", JSON.stringify(order, null, 2));
    return false;
  }

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee">${item.product_name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">$${item.unit_price.toLocaleString("es-CO")}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">$${(item.unit_price * item.quantity).toLocaleString("es-CO")}</td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:linear-gradient(135deg,#16a34a,#15803d);color:white;padding:24px;border-radius:12px 12px 0 0">
        <h1 style="margin:0;font-size:20px">Nuevo Pedido en AngeLinks</h1>
        <p style="margin:8px 0 0;opacity:0.9">${catalog.name}</p>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none">
        <h2 style="font-size:16px;color:#374151;margin:0 0 12px">Datos del Cliente</h2>
        <table style="width:100%;margin-bottom:20px">
          <tr><td style="padding:4px 0;color:#6b7280">Nombre:</td><td style="padding:4px 0;font-weight:600">${order.customer_name}</td></tr>
          <tr><td style="padding:4px 0;color:#6b7280">Teléfono:</td><td style="padding:4px 0;font-weight:600">${order.customer_phone}</td></tr>
          <tr><td style="padding:4px 0;color:#6b7280">Dirección:</td><td style="padding:4px 0;font-weight:600">${order.customer_address}</td></tr>
          <tr><td style="padding:4px 0;color:#6b7280">Ciudad:</td><td style="padding:4px 0;font-weight:600">${order.customer_city}</td></tr>
          ${order.customer_notes ? `<tr><td style="padding:4px 0;color:#6b7280">Notas:</td><td style="padding:4px 0">${order.customer_notes}</td></tr>` : ""}
        </table>
        <h2 style="font-size:16px;color:#374151;margin:0 0 12px">Productos</h2>
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr style="background:#f9fafb">
              <th style="padding:8px 12px;text-align:left;font-size:13px;color:#6b7280">Producto</th>
              <th style="padding:8px 12px;text-align:center;font-size:13px;color:#6b7280">Cant.</th>
              <th style="padding:8px 12px;text-align:right;font-size:13px;color:#6b7280">Precio</th>
              <th style="padding:8px 12px;text-align:right;font-size:13px;color:#6b7280">Subtotal</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding:12px;text-align:right;font-weight:700;font-size:16px">TOTAL:</td>
              <td style="padding:12px;text-align:right;font-weight:700;font-size:16px;color:#16a34a">$${order.total.toLocaleString("es-CO")}</td>
            </tr>
          </tfoot>
        </table>
        <div style="margin-top:20px;padding:16px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
          <p style="margin:0;color:#166534;font-size:14px"><strong>Pago contraentrega.</strong> El cliente pagará al recibir el pedido.</p>
        </div>
      </div>
      <div style="background:#f9fafb;padding:16px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none;text-align:center">
        <p style="margin:0;color:#9ca3af;font-size:12px">Enviado desde AngeLinks — Tu catálogo, tus ventas</p>
      </div>
    </div>
  `;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "AngeLinks <pedidos@angelinks.app>",
      to: sellerEmail,
      subject: `Nuevo pedido de ${order.customer_name} — $${order.total.toLocaleString("es-CO")}`,
      html,
    });
    return true;
  } catch (error) {
    console.error("[AngeLinks] Email error:", error);
    return false;
  }
}
