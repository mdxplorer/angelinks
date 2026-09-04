import type { Catalog, Product, Order, Seller } from "@/types";

export const demoSeller: Seller = {
  id: "demo-seller-1",
  name: "María García",
  email: "maria@demo.com",
  phone: "+57 300 123 4567",
  created_at: new Date().toISOString(),
};

export const demoCatalogs: Catalog[] = [
  {
    id: "cat-oboticario-1",
    seller_id: "demo-seller-1",
    name: "O Boticário - Temporada 9",
    slug: "oboticario-t9-sep",
    brand: "O Boticário",
    description:
      "Catálogo completo O Boticário Colombia - Septiembre 2026. Perfumería, cuidado personal y maquillaje.",
    cover_image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-yanbal-1",
    seller_id: "demo-seller-1",
    name: "Yanbal - Campaña 12",
    slug: "yanbal-c12",
    brand: "Yanbal",
    description:
      "Catálogo Yanbal campaña 12. Fragancias, skincare y maquillaje premium.",
    cover_image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export const demoProducts: Product[] = [
  // O Boticário Products
  {
    id: "prod-1",
    catalog_id: "cat-oboticario-1",
    name: "Nativa SPA Quinoa Aceite Trifásico",
    description:
      "Aceite corporal trifásico con quinoa real. Hidratación profunda, nutrición y brillo para todo tipo de piel. 150ml.",
    category: "Cuidado Corporal",
    catalog_price: 89900,
    sale_price: 89900,
    image_url:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80",
    is_available: true,
    sort_order: 1,
  },
  {
    id: "prod-2",
    catalog_id: "cat-oboticario-1",
    name: "Egeo Dolce Woman EDP",
    description:
      "Eau de Parfum femenino con notas de chocolate belga, frambuesa y vainilla. Fragancia dulce y envolvente. 90ml.",
    category: "Perfumería",
    catalog_price: 149900,
    sale_price: 149900,
    image_url:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80",
    is_available: true,
    sort_order: 2,
  },
  {
    id: "prod-3",
    catalog_id: "cat-oboticario-1",
    name: "Malbec Desodorante Colônia",
    description:
      "Fragancia masculina con notas de roble, cuero y barrica de vino. Intensidad y sofisticación. 100ml.",
    category: "Perfumería",
    catalog_price: 134900,
    sale_price: 134900,
    image_url:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&q=80",
    is_available: true,
    sort_order: 3,
  },
  {
    id: "prod-4",
    catalog_id: "cat-oboticario-1",
    name: "Nativa SPA Karité Crema Corporal",
    description:
      "Crema corporal con manteca de karité africano. Hidratación 48h para piel extra seca. 400ml.",
    category: "Cuidado Corporal",
    catalog_price: 67900,
    sale_price: 67900,
    image_url:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80",
    is_available: true,
    sort_order: 4,
  },
  {
    id: "prod-5",
    catalog_id: "cat-oboticario-1",
    name: "Cuide-se Bem Candy Loción Corporal",
    description:
      "Loción hidratante con fragancia dulce de algodón de azúcar. Textura ligera de rápida absorción. 400ml.",
    category: "Cuidado Corporal",
    catalog_price: 54900,
    sale_price: 54900,
    image_url:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
    is_available: true,
    sort_order: 5,
  },
  {
    id: "prod-6",
    catalog_id: "cat-oboticario-1",
    name: "Egeo Blue EDT Masculino",
    description:
      "Eau de Toilette fresco y energético con notas cítricas, menta y madera. Ideal para el día. 90ml.",
    category: "Perfumería",
    catalog_price: 119900,
    sale_price: 119900,
    image_url:
      "https://images.unsplash.com/photo-1594035910387-fbd1a485b12e?w=400&q=80",
    is_available: true,
    sort_order: 6,
  },
  {
    id: "prod-7",
    catalog_id: "cat-oboticario-1",
    name: "Make B. Base Líquida HD",
    description:
      "Base de alta cobertura con acabado natural. FPS 15. Larga duración 12h. Disponible en 15 tonos. 30ml.",
    category: "Maquillaje",
    catalog_price: 79900,
    sale_price: 79900,
    image_url:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",
    is_available: true,
    sort_order: 7,
  },
  {
    id: "prod-8",
    catalog_id: "cat-oboticario-1",
    name: "Make B. Máscara de Pestañas Ultra Black",
    description:
      "Máscara de pestañas ultra negra con cepillo de fibra. Volumen extremo sin grumos. 9ml.",
    category: "Maquillaje",
    catalog_price: 49900,
    sale_price: 49900,
    image_url:
      "https://images.unsplash.com/photo-1631214500115-598fc2cb8ada?w=400&q=80",
    is_available: true,
    sort_order: 8,
  },
  {
    id: "prod-9",
    catalog_id: "cat-oboticario-1",
    name: "Lily EDP Feminino",
    description:
      "Eau de Parfum sofisticado con notas de iris, rosa turca y sándalo. Elegancia atemporal. 75ml.",
    category: "Perfumería",
    catalog_price: 179900,
    sale_price: 179900,
    image_url:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&q=80",
    is_available: true,
    sort_order: 9,
  },
  {
    id: "prod-10",
    catalog_id: "cat-oboticario-1",
    name: "Nativa SPA Ameixa Body Splash",
    description:
      "Splash corporal con extracto de ciruela negra. Frescura y perfumación ligera para después del baño. 200ml.",
    category: "Cuidado Corporal",
    catalog_price: 44900,
    sale_price: 44900,
    image_url:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
    is_available: true,
    sort_order: 10,
  },
  {
    id: "prod-11",
    catalog_id: "cat-oboticario-1",
    name: "Floratta Blue EDP",
    description:
      "Eau de Parfum floral fresco con notas de lirio del valle, jazmín y musk blanco. 75ml.",
    category: "Perfumería",
    catalog_price: 129900,
    sale_price: 129900,
    image_url:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80",
    is_available: true,
    sort_order: 11,
  },
  {
    id: "prod-12",
    catalog_id: "cat-oboticario-1",
    name: "Cuide-se Bem Proteína de Arroz Shampoo",
    description:
      "Shampoo fortalecedor con proteína de arroz. Reconstrucción capilar desde la raíz. 300ml.",
    category: "Cabello",
    catalog_price: 39900,
    sale_price: 39900,
    image_url:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&q=80",
    is_available: true,
    sort_order: 12,
  },
  {
    id: "prod-13",
    catalog_id: "cat-oboticario-1",
    name: "Make B. Labial Líquido Matte",
    description:
      "Labial líquido de acabado mate de larga duración. Ultra pigmentado, no reseca. 5ml.",
    category: "Maquillaje",
    catalog_price: 44900,
    sale_price: 44900,
    image_url:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",
    is_available: true,
    sort_order: 13,
  },
  {
    id: "prod-14",
    catalog_id: "cat-oboticario-1",
    name: "Egeo Choc Mint EDP",
    description:
      "Eau de Parfum gourmand con chocolate con menta. Irresistiblemente dulce y fresco. 90ml.",
    category: "Perfumería",
    catalog_price: 149900,
    sale_price: 149900,
    image_url:
      "https://images.unsplash.com/photo-1594035910387-fbd1a485b12e?w=400&q=80",
    is_available: true,
    sort_order: 14,
  },
  {
    id: "prod-15",
    catalog_id: "cat-oboticario-1",
    name: "Nativa SPA Quinoa Kit Viajero",
    description:
      "Kit de viaje con shampoo 50ml + acondicionador 50ml + crema peinar 50ml. Tamaño ideal para llevar.",
    category: "Kits",
    catalog_price: 59900,
    sale_price: 59900,
    image_url:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
    is_available: true,
    sort_order: 15,
  },
  {
    id: "prod-16",
    catalog_id: "cat-oboticario-1",
    name: "Malbec Gold EDT",
    description:
      "Edición especial con notas de whisky envejecido, ámbar y madera noble. Sofisticación Premium. 100ml.",
    category: "Perfumería",
    catalog_price: 189900,
    sale_price: 189900,
    image_url:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&q=80",
    is_available: true,
    sort_order: 16,
  },
  {
    id: "prod-17",
    catalog_id: "cat-oboticario-1",
    name: "Make B. Paleta de Sombras 12 Tonos",
    description:
      "Paleta de sombras con 12 tonos entre mate, satinados y glitter. Alta pigmentación y blendabilidad.",
    category: "Maquillaje",
    catalog_price: 89900,
    sale_price: 89900,
    image_url:
      "https://images.unsplash.com/photo-1631214500115-598fc2cb8ada?w=400&q=80",
    is_available: true,
    sort_order: 17,
  },
  {
    id: "prod-18",
    catalog_id: "cat-oboticario-1",
    name: "Cuide-se Bem Leche de Cabra Jabón Corporal",
    description:
      "Jabón líquido corporal con leche de cabra. Limpieza suave y humectación. 250ml.",
    category: "Cuidado Corporal",
    catalog_price: 34900,
    sale_price: 34900,
    image_url:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
    is_available: true,
    sort_order: 18,
  },
  {
    id: "prod-19",
    catalog_id: "cat-oboticario-1",
    name: "Zaad Arctic EDT Masculino",
    description:
      "Fragancia masculina ultra fresca con notas de hielo, bergamota y madera de cedro. 95ml.",
    category: "Perfumería",
    catalog_price: 159900,
    sale_price: 159900,
    image_url:
      "https://images.unsplash.com/photo-1594035910387-fbd1a485b12e?w=400&q=80",
    is_available: true,
    sort_order: 19,
  },
  {
    id: "prod-20",
    catalog_id: "cat-oboticario-1",
    name: "Kit Nativa SPA Ameixa Completo",
    description:
      "Kit completo: shampoo 300ml + acondicionador 300ml + crema corporal 400ml + body splash 200ml.",
    category: "Kits",
    catalog_price: 159900,
    sale_price: 159900,
    image_url:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80",
    is_available: true,
    sort_order: 20,
  },
];

let demoOrders: Order[] = [];

export function getDemoOrders(): Order[] {
  return demoOrders;
}

export function addDemoOrder(order: Order): void {
  demoOrders.push(order);
}

export function getProductsByCatalog(catalogId: string): Product[] {
  return demoProducts.filter((p) => p.catalog_id === catalogId);
}

export function getCatalogBySlug(slug: string): Catalog | undefined {
  return demoCatalogs.find((c) => c.slug === slug);
}

export function getCategories(catalogId: string): string[] {
  const products = getProductsByCatalog(catalogId);
  return [...new Set(products.map((p) => p.category))];
}
