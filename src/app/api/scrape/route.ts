import { NextRequest, NextResponse } from "next/server";
import { scrapeUrl } from "@/lib/scraper";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL requerida" }, { status: 400 });
    }

    const products = await scrapeUrl(url);

    return NextResponse.json({
      products,
      count: products.length,
      message:
        products.length > 0
          ? `Se encontraron ${products.length} productos`
          : "No se encontraron productos. Este catálogo puede usar un formato que requiere importación manual (PDF, iframe, JavaScript dinámico).",
    });
  } catch (error) {
    console.error("[CataLink] Scrape error:", error);
    return NextResponse.json(
      {
        error: "No se pudo acceder a la URL. Verifica que sea correcta y accesible.",
        products: [],
      },
      { status: 400 }
    );
  }
}
