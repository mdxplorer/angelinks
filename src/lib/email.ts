import type { Order, Catalog } from "@/types";

export async function sendOrderNotification(
  order: Order,
  catalog: Catalog,
  sellerEmail: string
): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.log("[AngeLinks] Email skipped — RESEND_API_KEY not configured");
    console.log("[AngeLinks] Order:", order.id, "for", sellerEmail);
    return false;
  }

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #F0EDE8;font-size:14px;color:#3D3830">
          <strong>${item.product_name}</strong>
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #F0EDE8;text-align:center;font-size:14px;color:#6B655C">${item.quantity}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #F0EDE8;text-align:right;font-size:14px;color:#6B655C">$${item.unit_price.toLocaleString("es-CO")}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #F0EDE8;text-align:right;font-size:14px;font-weight:600;color:#3D3830">$${(item.unit_price * item.quantity).toLocaleString("es-CO")}</td>
      </tr>`
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background-color:#F5F2EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
      <div style="max-width:600px;margin:0 auto;padding:24px 16px">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#E86550,#D4513D);padding:32px 24px;border-radius:16px 16px 0 0;text-align:center">
          <h1 style="margin:0;font-size:24px;font-weight:700;color:#fff;letter-spacing:-0.5px">Nuevo Pedido</h1>
          <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.85)">${catalog.name} · ${catalog.brand}</p>
        </div>

        <!-- Body -->
        <div style="background:#fff;padding:0;border-left:1px solid #E8E4DF;border-right:1px solid #E8E4DF">

          <!-- Total highlight -->
          <div style="padding:24px;text-align:center;border-bottom:1px solid #F0EDE8">
            <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#8D877E">Total del pedido</p>
            <p style="margin:8px 0 0;font-size:36px;font-weight:700;color:#E86550">$${order.total.toLocaleString("es-CO")}</p>
            <p style="margin:8px 0 0;font-size:13px;color:#8D877E">Pago contraentrega</p>
          </div>

          <!-- Customer -->
          <div style="padding:24px;border-bottom:1px solid #F0EDE8">
            <p style="margin:0 0 12px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#8D877E;font-weight:600">Datos del cliente</p>
            <table style="width:100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#8D877E;width:100px">Nombre</td>
                <td style="padding:6px 0;font-size:14px;font-weight:600;color:#3D3830">${order.customer_name}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#8D877E">Teléfono</td>
                <td style="padding:6px 0;font-size:14px;font-weight:600;color:#3D3830">
                  <a href="https://wa.me/${order.customer_phone.replace(/\s+/g, "").replace(/^\+/, "")}" style="color:#4D9B64;text-decoration:none">${order.customer_phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#8D877E">Ciudad</td>
                <td style="padding:6px 0;font-size:14px;color:#3D3830">${order.customer_city}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#8D877E">Dirección</td>
                <td style="padding:6px 0;font-size:14px;color:#3D3830">${order.customer_address}</td>
              </tr>
              ${order.customer_notes ? `
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#8D877E">Notas</td>
                <td style="padding:6px 0;font-size:14px;color:#3D3830;font-style:italic">${order.customer_notes}</td>
              </tr>` : ""}
            </table>
          </div>

          <!-- Products -->
          <div style="padding:24px">
            <p style="margin:0 0 12px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#8D877E;font-weight:600">Productos (${order.items.length})</p>
            <table style="width:100%;border-collapse:collapse">
              <thead>
                <tr>
                  <th style="padding:8px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#8D877E;border-bottom:2px solid #F0EDE8">Producto</th>
                  <th style="padding:8px 16px;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#8D877E;border-bottom:2px solid #F0EDE8">Cant.</th>
                  <th style="padding:8px 16px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#8D877E;border-bottom:2px solid #F0EDE8">Precio</th>
                  <th style="padding:8px 16px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#8D877E;border-bottom:2px solid #F0EDE8">Subtotal</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
            </table>
            <div style="margin-top:16px;padding:16px;background:#FDF5F4;border-radius:12px;text-align:right">
              <span style="font-size:13px;color:#8D877E">Total: </span>
              <span style="font-size:20px;font-weight:700;color:#E86550">$${order.total.toLocaleString("es-CO")}</span>
            </div>
          </div>

          <!-- CTA -->
          <div style="padding:0 24px 24px;text-align:center">
            <a href="https://wa.me/${order.customer_phone.replace(/\s+/g, "").replace(/^\+/, "")}?text=${encodeURIComponent(`Hola ${order.customer_name}, recibí tu pedido en AngeLinks por $${order.total.toLocaleString("es-CO")}. Te confirmo los detalles.`)}"
               style="display:inline-block;background:#4D9B64;color:#fff;font-size:14px;font-weight:600;padding:14px 32px;border-radius:12px;text-decoration:none">
              Contactar por WhatsApp
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#F9F7F5;padding:20px;border-radius:0 0 16px 16px;border:1px solid #E8E4DF;border-top:none;text-align:center">
          <p style="margin:0;color:#B5AFA6;font-size:12px">Pedido #${order.id.slice(0, 8)} · ${new Date(order.created_at).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
          <p style="margin:8px 0 0;color:#B5AFA6;font-size:11px">AngeLinks — Tu catálogo, tus ventas</p>
        </div>

      </div>
    </body>
    </html>
  `;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "AngeLinks <onboarding@resend.dev>",
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
