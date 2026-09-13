import type { Catalog, Product, Order, Seller } from "@/types";

export const demoSeller: Seller = {
  id: "demo-seller-1",
  name: "Angela Restrepo",
  email: "angela.restrepo@gmail.com",
  phone: "+57 311 456 7890",
  created_at: "2026-06-15T10:00:00.000Z",
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

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(Math.floor(Math.random() * 12) + 8, Math.floor(Math.random() * 60));
  return d.toISOString();
}

let demoOrders: Order[] = [
  {
    id: "order-a1b2c3d4",
    catalog_id: "cat-oboticario-1",
    customer_name: "Carolina Méndez",
    customer_phone: "+57 311 456 7890",
    customer_address: "Cra 15 #82-10, Apto 402",
    customer_city: "Bogotá",
    customer_notes: "Entregar después de las 2pm",
    total: 329700,
    status: "delivered",
    created_at: daysAgo(12),
    items: [
      { id: "item-1", order_id: "order-a1b2c3d4", product_id: "prod-2", product_name: "Egeo Dolce Woman EDP", quantity: 1, unit_price: 149900 },
      { id: "item-2", order_id: "order-a1b2c3d4", product_id: "prod-9", product_name: "Lily EDP Feminino", quantity: 1, unit_price: 179900 },
    ],
  },
  {
    id: "order-e5f6g7h8",
    catalog_id: "cat-oboticario-1",
    customer_name: "Laura Valentina Torres",
    customer_phone: "+57 320 987 6543",
    customer_address: "Calle 45 #28-15",
    customer_city: "Medellín",
    customer_notes: "",
    total: 239800,
    status: "delivered",
    created_at: daysAgo(10),
    items: [
      { id: "item-3", order_id: "order-e5f6g7h8", product_id: "prod-7", product_name: "Make B. Base Líquida HD", quantity: 1, unit_price: 79900 },
      { id: "item-4", order_id: "order-e5f6g7h8", product_id: "prod-16", product_name: "Malbec Gold EDT", quantity: 1, unit_price: 189900 },
    ],
  },
  {
    id: "order-i9j0k1l2",
    catalog_id: "cat-oboticario-1",
    customer_name: "Daniela Ríos",
    customer_phone: "+57 315 234 5678",
    customer_address: "Av 6N #38-22, Casa 5",
    customer_city: "Cali",
    customer_notes: "Llamar antes de llegar",
    total: 449700,
    status: "delivered",
    created_at: daysAgo(9),
    items: [
      { id: "item-5", order_id: "order-i9j0k1l2", product_id: "prod-9", product_name: "Lily EDP Feminino", quantity: 1, unit_price: 179900 },
      { id: "item-6", order_id: "order-i9j0k1l2", product_id: "prod-14", product_name: "Egeo Choc Mint EDP", quantity: 1, unit_price: 149900 },
      { id: "item-7", order_id: "order-i9j0k1l2", product_id: "prod-4", product_name: "Nativa SPA Karité Crema Corporal", quantity: 1, unit_price: 67900 },
      { id: "item-8", order_id: "order-i9j0k1l2", product_id: "prod-8", product_name: "Make B. Máscara de Pestañas Ultra Black", quantity: 1, unit_price: 49900 },
    ],
  },
  {
    id: "order-m3n4o5p6",
    catalog_id: "cat-oboticario-1",
    customer_name: "Sofía Herrera",
    customer_phone: "+57 318 111 2233",
    customer_address: "Cra 7 #140-50",
    customer_city: "Bogotá",
    customer_notes: "",
    total: 159900,
    status: "delivered",
    created_at: daysAgo(7),
    items: [
      { id: "item-9", order_id: "order-m3n4o5p6", product_id: "prod-20", product_name: "Kit Nativa SPA Ameixa Completo", quantity: 1, unit_price: 159900 },
    ],
  },
  {
    id: "order-q7r8s9t0",
    catalog_id: "cat-oboticario-1",
    customer_name: "Valentina Gómez",
    customer_phone: "+57 300 555 6677",
    customer_address: "Calle 100 #45-12, Apto 801",
    customer_city: "Bogotá",
    customer_notes: "Regalo. Empacar bonito por favor",
    total: 284800,
    status: "confirmed",
    created_at: daysAgo(5),
    items: [
      { id: "item-10", order_id: "order-q7r8s9t0", product_id: "prod-3", product_name: "Malbec Desodorante Colônia", quantity: 1, unit_price: 134900 },
      { id: "item-11", order_id: "order-q7r8s9t0", product_id: "prod-6", product_name: "Egeo Blue EDT Masculino", quantity: 1, unit_price: 119900 },
    ],
  },
  {
    id: "order-u1v2w3x4",
    catalog_id: "cat-oboticario-1",
    customer_name: "Andrea Castillo",
    customer_phone: "+57 312 999 8877",
    customer_address: "Cra 50 #10-25",
    customer_city: "Barranquilla",
    customer_notes: "",
    total: 174800,
    status: "confirmed",
    created_at: daysAgo(3),
    items: [
      { id: "item-12", order_id: "order-u1v2w3x4", product_id: "prod-1", product_name: "Nativa SPA Quinoa Aceite Trifásico", quantity: 1, unit_price: 89900 },
      { id: "item-13", order_id: "order-u1v2w3x4", product_id: "prod-17", product_name: "Make B. Paleta de Sombras 12 Tonos", quantity: 1, unit_price: 89900 },
    ],
  },
  {
    id: "order-y5z6a7b8",
    catalog_id: "cat-oboticario-1",
    customer_name: "Camila Duarte",
    customer_phone: "+57 305 444 3322",
    customer_address: "Calle 19 #4-88",
    customer_city: "Bucaramanga",
    customer_notes: "Dejar en portería",
    total: 194800,
    status: "pending",
    created_at: daysAgo(2),
    items: [
      { id: "item-14", order_id: "order-y5z6a7b8", product_id: "prod-13", product_name: "Make B. Labial Líquido Matte", quantity: 2, unit_price: 44900 },
      { id: "item-15", order_id: "order-y5z6a7b8", product_id: "prod-5", product_name: "Cuide-se Bem Candy Loción Corporal", quantity: 1, unit_price: 54900 },
      { id: "item-16", order_id: "order-y5z6a7b8", product_id: "prod-10", product_name: "Nativa SPA Ameixa Body Splash", quantity: 1, unit_price: 44900 },
    ],
  },
  {
    id: "order-c9d0e1f2",
    catalog_id: "cat-oboticario-1",
    customer_name: "Isabella Moreno",
    customer_phone: "+57 316 777 8899",
    customer_address: "Av El Poblado #10-15, Torre 2",
    customer_city: "Medellín",
    customer_notes: "",
    total: 269800,
    status: "pending",
    created_at: daysAgo(1),
    items: [
      { id: "item-17", order_id: "order-c9d0e1f2", product_id: "prod-2", product_name: "Egeo Dolce Woman EDP", quantity: 1, unit_price: 149900 },
      { id: "item-18", order_id: "order-c9d0e1f2", product_id: "prod-11", product_name: "Floratta Blue EDP", quantity: 1, unit_price: 129900 },
    ],
  },
  {
    id: "order-g3h4i5j6",
    catalog_id: "cat-oboticario-1",
    customer_name: "Juliana Vargas",
    customer_phone: "+57 321 222 3344",
    customer_address: "Cra 43A #1-50",
    customer_city: "Medellín",
    customer_notes: "Segundo piso, timbre no funciona. Llamar.",
    total: 399700,
    status: "pending",
    created_at: daysAgo(0),
    items: [
      { id: "item-19", order_id: "order-g3h4i5j6", product_id: "prod-16", product_name: "Malbec Gold EDT", quantity: 1, unit_price: 189900 },
      { id: "item-20", order_id: "order-g3h4i5j6", product_id: "prod-19", product_name: "Zaad Arctic EDT Masculino", quantity: 1, unit_price: 159900 },
      { id: "item-21", order_id: "order-g3h4i5j6", product_id: "prod-15", product_name: "Nativa SPA Quinoa Kit Viajero", quantity: 1, unit_price: 59900 },
    ],
  },
  {
    id: "order-k7l8m9n0",
    catalog_id: "cat-oboticario-1",
    customer_name: "Mariana López",
    customer_phone: "+57 310 888 9900",
    customer_address: "Calle 72 #10-07",
    customer_city: "Bogotá",
    customer_notes: "",
    total: 124800,
    status: "cancelled",
    created_at: daysAgo(6),
    items: [
      { id: "item-22", order_id: "order-k7l8m9n0", product_id: "prod-12", product_name: "Cuide-se Bem Proteína de Arroz Shampoo", quantity: 1, unit_price: 39900 },
      { id: "item-23", order_id: "order-k7l8m9n0", product_id: "prod-18", product_name: "Cuide-se Bem Leche de Cabra Jabón Corporal", quantity: 1, unit_price: 34900 },
      { id: "item-24", order_id: "order-k7l8m9n0", product_id: "prod-8", product_name: "Make B. Máscara de Pestañas Ultra Black", quantity: 1, unit_price: 49900 },
    ],
  },
];

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
