import { getCatalog, getProducts, getProductCategories } from "@/lib/store";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CatalogView from "./CatalogView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const catalog = await getCatalog(slug);

  if (!catalog) return {};

  const products = await getProducts(catalog.id);
  const firstImage = products.find((p) => p.image_url)?.image_url;
  const productCount = products.length;
  const description = catalog.description
    || `Catálogo de ${catalog.brand} con ${productCount} productos. Haz tu pedido directo.`;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://angelinks-app.netlify.app";

  return {
    title: `${catalog.name} — ${catalog.brand} | AngeLinks`,
    description,
    openGraph: {
      title: `${catalog.name} — ${catalog.brand}`,
      description,
      url: `${appUrl}/c/${slug}`,
      siteName: "AngeLinks",
      images: firstImage && !firstImage.startsWith("data:")
        ? [{ url: firstImage, width: 600, height: 600, alt: catalog.name }]
        : [{ url: `${appUrl}/logo-512.png`, width: 512, height: 512, alt: "AngeLinks" }],
      type: "website",
      locale: "es_CO",
    },
    twitter: {
      card: "summary_large_image",
      title: `${catalog.name} — ${catalog.brand}`,
      description,
      images: firstImage && !firstImage.startsWith("data:")
        ? [firstImage]
        : [`${appUrl}/logo-512.png`],
    },
  };
}

export default async function CatalogPage({ params }: PageProps) {
  const { slug } = await params;
  const catalog = await getCatalog(slug);

  if (!catalog) notFound();

  const products = await getProducts(catalog.id);
  const categories = await getProductCategories(catalog.id);

  return (
    <CatalogView
      catalog={catalog}
      products={products}
      categories={categories}
    />
  );
}
