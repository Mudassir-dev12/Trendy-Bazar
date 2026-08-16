-- Trendy Bazaar - Complete Supabase PostgreSQL Schema & RLS Setup
-- Copy and run this script in your Supabase SQL Editor (https://app.supabase.com -> SQL Editor)

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT NOT NULL,
  subcategory TEXT,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  discount INTEGER DEFAULT 0,
  rating NUMERIC(3,2) DEFAULT 4.8,
  reviews_count INTEGER DEFAULT 12,
  image TEXT NOT NULL,
  description TEXT,
  stock INTEGER DEFAULT 50,
  is_featured BOOLEAN DEFAULT false,
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT,
  payment_method TEXT DEFAULT 'cash_on_delivery',
  total_amount NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT,
  product_title TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  image TEXT
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for Products (Explicit SELECT, INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Public Read Products" ON public.products;
CREATE POLICY "Public Read Products" 
  ON public.products FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Public Insert Products" ON public.products;
CREATE POLICY "Public Insert Products" 
  ON public.products FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Products" ON public.products;
CREATE POLICY "Public Update Products" 
  ON public.products FOR UPDATE 
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public Delete Products" ON public.products;
CREATE POLICY "Public Delete Products" 
  ON public.products FOR DELETE 
  USING (true);

DROP POLICY IF EXISTS "Public Insert/Update Products" ON public.products;

-- 6. RLS Policies for Orders & Order Items
DROP POLICY IF EXISTS "Public Create Orders" ON public.orders;
CREATE POLICY "Public Create Orders" 
  ON public.orders FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Orders" ON public.orders;
CREATE POLICY "Public Read Orders" 
  ON public.orders FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Public Update Orders" ON public.orders;
CREATE POLICY "Public Update Orders" 
  ON public.orders FOR UPDATE 
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public Create Order Items" ON public.order_items;
CREATE POLICY "Public Create Order Items" 
  ON public.order_items FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Order Items" ON public.order_items;
CREATE POLICY "Public Read Order Items" 
  ON public.order_items FOR SELECT 
  USING (true);

-- Fast Query Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON public.products(subcategory);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- 7. Sample Seed Products
INSERT INTO public.products (title, slug, category, subcategory, price, original_price, discount, rating, reviews_count, image, description, stock, is_featured, badge)
VALUES
('Pro Noise Cancelling Wireless Earbuds', 'pro-noise-cancelling-earbuds', 'smart-gadgets', 'audio-wearables', 8500, 12000, 29, 4.8, 142, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80', 'Active Noise Cancelling Bluetooth 5.3 Earbuds with 30hr Playtime.', 45, true, 'Best Seller'),
('100W GaN Fast Charger Block 4-Port', '100w-gan-fast-charger', 'smart-gadgets', 'mobile-charging', 4999, 7500, 33, 4.9, 88, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80', 'Ultra-fast laptop and phone multi-port desktop power station.', 60, true, 'Hot Tech'),
('Ceramic Non-Stick Cookware Set 10-Pcs', 'ceramic-cookware-set', 'home-essentials', 'kitchen-dining', 14500, 19999, 27, 4.7, 64, 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80', 'Eco-friendly non-toxic ceramic coated pots and pans set.', 30, true, 'Top Choice'),
('Smart Cordless Stick Vacuum Cleaner', 'smart-cordless-stick-vacuum', 'home-appliances', 'cleaning-appliances', 18999, 24999, 24, 4.8, 95, 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80', 'High suction 250W cordless stick vacuum with LED floor headlight.', 20, true, 'Super Saver'),
('360 Gesture RC Stunt Car 4WD', '360-gesture-rc-stunt-car', 'toys', 'remote-control-toys', 3999, 5999, 33, 4.9, 110, 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop&q=80', 'Hand gesture sensor remote control drift car with double sided flipping.', 55, true, 'Kids Favorite')
ON CONFLICT (slug) DO NOTHING;
