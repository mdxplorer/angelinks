import * as cheerio from "cheerio";

export interface ScrapedProduct {
  name: string;
  price: number;
  image_url: string;
  description: string;
  category: string;
}

export async function scrapeUrl(url: string): Promise<ScrapedProduct[]> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  const products: ScrapedProduct[] = [];

  const selectors = [
    { container: ".product", name: ".product-name, .product-title, h3", price: ".price, .product-price", image: "img", desc: ".description, .product-desc" },
    { container: "[data-product]", name: "[data-name], .name, h2, h3", price: "[data-price], .price", image: "img", desc: ".desc, .description" },
    { container: ".item, .card", name: "h2, h3, h4, .title, .name", price: ".price, .cost, .value", image: "img", desc: "p, .desc" },
  ];

  for (const sel of selectors) {
    $(sel.container).each((_, el) => {
      const $el = $(el);
      const name = $el.find(sel.name).first().text().trim();
      const priceText = $el.find(sel.price).first().text().trim();
      const image = $el.find(sel.image).first().attr("src") || "";
      const desc = $el.find(sel.desc).first().text().trim();

      if (!name) return;

      const priceMatch = priceText.replace(/[^\d.,]/g, "").replace(",", ".");
      const price = parseFloat(priceMatch) || 0;

      products.push({
        name,
        price,
        image_url: image.startsWith("http") ? image : new URL(image, url).href,
        description: desc || name,
        category: "General",
      });
    });

    if (products.length > 0) break;
  }

  return products;
}
