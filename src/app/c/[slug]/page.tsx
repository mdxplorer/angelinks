import { getCatalog, getProducts, getProductCategories } from "@/lib/store";
import { notFound } from "next/navigation";
import CatalogView from "./CatalogView";

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
