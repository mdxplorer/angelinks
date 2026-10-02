-- AngeLinks: Tablas de catálogos, productos y pedidos
-- Ejecutar en Supabase SQL Editor
-- Reemplaza el esquema de 001_initial.sql (si se ejecutó)

-- Limpiar tablas antiguas
drop table if exists public.order_items cascade;
drop table if exists public.orders cascade;
drop table if exists public.products cascade;
drop table if exists public.catalogs cascade;
drop table if exists public.sellers cascade;

-- === CATÁLOGOS ===
create table public.catalogs (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  slug text unique not null,
  brand text not null default '',
  description text not null default '',
  cover_image text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index idx_catalogs_slug on public.catalogs(slug);
create index idx_catalogs_seller on public.catalogs(seller_id);
alter table public.catalogs enable row level security;

create policy "Catalogs viewable"
  on public.catalogs for select
  using (is_active = true or auth.uid() = seller_id);

create policy "Owner insert catalogs"
  on public.catalogs for insert
  with check (auth.uid() = seller_id);

create policy "Owner update catalogs"
  on public.catalogs for update
  using (auth.uid() = seller_id);

create policy "Owner delete catalogs"
  on public.catalogs for delete
  using (auth.uid() = seller_id);

-- === PRODUCTOS ===
create table public.products (
  id uuid default gen_random_uuid() primary key,
  catalog_id uuid references public.catalogs(id) on delete cascade not null,
  name text not null,
  description text not null default '',
  category text not null default 'General',
  catalog_price numeric not null default 0,
  sale_price numeric not null default 0,
  image_url text not null default '',
  is_available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_products_catalog on public.products(catalog_id);
alter table public.products enable row level security;

create policy "Products viewable"
  on public.products for select
  using (is_available = true);

create policy "Owner insert products"
  on public.products for insert
  with check (catalog_id in (select id from public.catalogs where seller_id = auth.uid()));

create policy "Owner update products"
  on public.products for update
  using (catalog_id in (select id from public.catalogs where seller_id = auth.uid()));

create policy "Owner delete products"
  on public.products for delete
  using (catalog_id in (select id from public.catalogs where seller_id = auth.uid()));

-- === PEDIDOS ===
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  catalog_id uuid references public.catalogs(id) on delete cascade not null,
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null default '',
  customer_city text not null default '',
  customer_notes text not null default '',
  total numeric not null default 0,
  status text not null default 'pending'
    check (status in ('pending','confirmed','delivered','cancelled')),
  created_at timestamptz not null default now()
);

create index idx_orders_catalog on public.orders(catalog_id);
create index idx_orders_status on public.orders(status);
alter table public.orders enable row level security;

create policy "Anyone create orders"
  on public.orders for insert with check (true);

create policy "Owner view orders"
  on public.orders for select
  using (catalog_id in (select id from public.catalogs where seller_id = auth.uid()));

create policy "Owner update orders"
  on public.orders for update
  using (catalog_id in (select id from public.catalogs where seller_id = auth.uid()));

-- === ITEMS DE PEDIDO ===
create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id text not null,
  product_name text not null,
  quantity integer not null default 1,
  unit_price numeric not null default 0
);

create index idx_order_items_order on public.order_items(order_id);
alter table public.order_items enable row level security;

create policy "Anyone create order items"
  on public.order_items for insert with check (true);

create policy "Owner view order items"
  on public.order_items for select
  using (order_id in (
    select o.id from public.orders o
    join public.catalogs c on o.catalog_id = c.id
    where c.seller_id = auth.uid()
  ));
