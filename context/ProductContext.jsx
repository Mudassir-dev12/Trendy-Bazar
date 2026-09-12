"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  getProducts,
  saveProducts,
  getOrders,
  saveOrder,
  saveOrdersList,
  resetProductsToDefault,
  filterProducts as filterProductsLocal,
  mapSupabaseProductToFrontend
} from "@/lib/data";
import { initialProducts } from "@/data/products";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const ProductContext = createContext();

const SELECT_FIELDS = "id, title, slug, category, subcategory, price, original_price, discount, rating, reviews_count, image, stock, is_featured, badge";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// In-memory cache maps
const memoryCache = new Map();
const adminProductsCache = new Map();
const adminOrdersCache = new Map();

/**
 * Clear memory and sessionStorage cache for products
 */
export function clearProductCache() {
  memoryCache.clear();
  adminProductsCache.clear();
  adminOrdersCache.clear();
  if (typeof window !== "undefined") {
    try {
      const keysToRemove = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith("tb_cache_page_")) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => sessionStorage.removeItem(k));
    } catch (e) {
      console.warn("Error clearing sessionStorage product cache:", e);
    }
  }
}

export function clearAdminCache() {
  adminProductsCache.clear();
  adminOrdersCache.clear();
}



export function ProductProvider({ children }) {
  // If Supabase is configured, start empty so skeletons display during fetch (no random seed images)
  const [products, setProducts] = useState(() => (isSupabaseConfigured ? [] : initialProducts));
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [isLoaded, setIsLoaded] = useState(!isSupabaseConfigured);

  // Background sync with Supabase (Initial load fetches top 20 with specific columns only)
  useEffect(() => {
    async function syncProductsFromSupabase() {
      if (!isSupabaseConfigured) return;
      try {
        const { data: sbProducts, error: prodErr } = await supabase
          .from("products")
          .select(SELECT_FIELDS)
          .order("created_at", { ascending: false })
          .range(0, 19);

        if (!prodErr && Array.isArray(sbProducts) && sbProducts.length > 0) {
          const dynamicProducts = sbProducts.map(mapSupabaseProductToFrontend);
          setProducts(dynamicProducts);
          saveProducts(dynamicProducts);
        } else if (!prodErr && Array.isArray(sbProducts) && sbProducts.length === 0) {
          // If Supabase table is empty, fallback to seed
          setProducts(initialProducts);
        }
      } catch (err) {
        console.warn("Supabase products sync failed:", err);
        setProducts(getProducts());
      } finally {
        setIsLoading(false);
        setIsLoaded(true);
      }
    }

    async function syncOrdersFromSupabase() {
      if (!isSupabaseConfigured) return;
      try {
        const { data: sbOrders, error: orderErr } = await supabase
          .from("orders")
          .select("*, order_items(*)")
          .order("created_at", { ascending: false });

        if (!orderErr && Array.isArray(sbOrders)) {
          const dynamicOrders = sbOrders.map((o) => ({
            id: o.order_number || o.id,
            date: o.created_at,
            customerName: o.customer_name,
            customerEmail: o.customer_email,
            customerPhone: o.customer_phone,
            shippingAddress: o.shipping_address,
            city: o.city,
            paymentMethod: o.payment_method,
            totalAmount: parseFloat(o.total_amount),
            status: o.status,
            customer: {
              name: o.customer_name,
              email: o.customer_email,
              phone: o.customer_phone,
              address: o.shipping_address,
              city: o.city
            },
            items: o.order_items || []
          }));
          setOrders(dynamicOrders);
          saveOrdersList(dynamicOrders);
        }
      } catch (err) {
        console.warn("Supabase orders sync failed:", err);
      }
    }

    syncProductsFromSupabase();
    syncOrdersFromSupabase();

    // Supabase Realtime channel subscription for multi-device live sync
    let prodChannel;
    let orderChannel;
    if (isSupabaseConfigured) {
      prodChannel = supabase
        .channel("realtime-products")
        .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => {
          clearProductCache();
          refreshData();
        })
        .subscribe();

      orderChannel = supabase
        .channel("realtime-orders")
        .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
          refreshData();
        })
        .subscribe();
    }

    return () => {
      if (prodChannel) supabase.removeChannel(prodChannel);
      if (orderChannel) supabase.removeChannel(orderChannel);
    };
  }, []);

  /**
   * Paginated Product Fetching with memory + sessionStorage Caching
   */
  const fetchProductsPage = async ({
    category = "",
    subcategory = "",
    query = "",
    page = 1,
    pageSize = 10,
    minPrice = 0,
    maxPrice = 200000,
    minRating = 0,
    sortBy = "popular"
  } = {}) => {
    const cacheKey = `tb_cache_page_${category || 'all'}_${subcategory || 'all'}_${encodeURIComponent(query || '')}_${page}_${pageSize}_${sortBy}_${minPrice}_${maxPrice}_${minRating}`;

    // 1. Check in-memory cache
    const memEntry = memoryCache.get(cacheKey);
    if (memEntry && Date.now() - memEntry.timestamp < CACHE_TTL_MS) {
      return { products: memEntry.products, hasMore: memEntry.hasMore, fromCache: true };
    }

    // 2. Check sessionStorage cache
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem(cacheKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            memoryCache.set(cacheKey, parsed);
            return { products: parsed.products, hasMore: parsed.hasMore, fromCache: true };
          }
        }
      } catch (e) {
        console.warn("SessionStorage cache read error:", e);
      }
    }

    // 3. Fetch paginated batch from Supabase if configured
    if (isSupabaseConfigured) {
      try {
        let q = supabase
          .from("products")
          .select(SELECT_FIELDS)
          .order("created_at", { ascending: false });

        if (category) q = q.eq("category", category);
        if (subcategory) q = q.eq("subcategory", subcategory);
        if (query && query.trim()) q = q.ilike("title", `%${query.trim()}%`);

        // Price range filter at DB level if applicable
        if (minPrice > 0) q = q.gte("price", minPrice);
        if (maxPrice < 200000) q = q.lte("price", maxPrice);
        if (minRating > 0) q = q.gte("rating", minRating);

        // Sorting at DB level
        if (sortBy === "price-asc") q = q.order("price", { ascending: true });
        else if (sortBy === "price-desc") q = q.order("price", { ascending: false });
        else if (sortBy === "rating") q = q.order("rating", { ascending: false });

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        q = q.range(from, to);

        const { data: sbProducts, error } = await q;

        if (!error && Array.isArray(sbProducts)) {
          const mappedProducts = sbProducts.map(mapSupabaseProductToFrontend);
          const hasMore = sbProducts.length === pageSize;

          const cacheObj = { timestamp: Date.now(), products: mappedProducts, hasMore };
          memoryCache.set(cacheKey, cacheObj);
          if (typeof window !== "undefined") {
            try {
              sessionStorage.setItem(cacheKey, JSON.stringify(cacheObj));
            } catch (e) {}
          }

          return { products: mappedProducts, hasMore, fromCache: false };
        }
      } catch (err) {
        console.warn("Supabase paginated fetch failed:", err);
      }
    }

    // 4. Fallback filter for local products list
    const filtered = filterProductsLocal({
      products: products.length > 0 ? products : initialProducts,
      category,
      subcategory,
      query,
      minPrice,
      maxPrice,
      minRating,
      sortBy
    });

    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const sliced = filtered.slice(from, to);
    const hasMore = filtered.length > to;

    return { products: sliced, hasMore, fromCache: false };
  };

  /**
   * Admin Paginated Products Fetching with In-Memory Caching
   */
  const fetchAdminProductsPage = async ({
    page = 1,
    pageSize = 10,
    search = "",
    category = "",
    lowStockOnly = false
  } = {}) => {
    const cacheKey = `admin_prod_${page}_${pageSize}_${encodeURIComponent(search)}_${category}_${lowStockOnly}`;
    if (adminProductsCache.has(cacheKey)) {
      return adminProductsCache.get(cacheKey);
    }

    if (isSupabaseConfigured) {
      try {
        let q = supabase
          .from("products")
          .select(SELECT_FIELDS, { count: "exact" })
          .order("created_at", { ascending: false });

        if (category) {
          q = q.eq("category", category);
        }
        if (lowStockOnly) {
          q = q.lte("stock", 5);
        }
        if (search && search.trim()) {
          const s = search.trim();
          q = q.or(`title.ilike.%${s}%,category.ilike.%${s}%,id.ilike.%${s}%`);
        }

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        q = q.range(from, to);

        const { data: sbProducts, count, error } = await q;

        if (!error && Array.isArray(sbProducts)) {
          const mapped = sbProducts.map(mapSupabaseProductToFrontend);
          const totalCount = count !== null ? count : mapped.length;
          const totalPages = Math.ceil(totalCount / pageSize) || 1;
          const result = { products: mapped, totalCount, totalPages, page, pageSize };
          adminProductsCache.set(cacheKey, result);
          return result;
        }
      } catch (err) {
        console.warn("Supabase fetchAdminProductsPage error:", err);
      }
    }

    // Fallback: local products filtering
    const allLocal = products.length > 0 ? products : getProducts();
    let filtered = allLocal.filter((p) => {
      let matches = true;
      if (category) matches = matches && p.category === category;
      if (lowStockOnly) matches = matches && (p.stock <= 5 || !p.stock);
      if (search && search.trim()) {
        const s = search.toLowerCase().trim();
        matches =
          matches &&
          (p.name?.toLowerCase().includes(s) ||
            p.category?.toLowerCase().includes(s) ||
            String(p.id).toLowerCase().includes(s));
      }
      return matches;
    });

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize) || 1;
    const from = (page - 1) * pageSize;
    const sliced = filtered.slice(from, from + pageSize);
    const result = { products: sliced, totalCount, totalPages, page, pageSize };
    adminProductsCache.set(cacheKey, result);
    return result;
  };

  /**
   * Admin Paginated Orders Fetching with In-Memory Caching
   */
  const fetchAdminOrdersPage = async ({
    page = 1,
    pageSize = 10,
    search = "",
    statusFilter = ""
  } = {}) => {
    const cacheKey = `admin_ord_${page}_${pageSize}_${encodeURIComponent(search)}_${statusFilter}`;
    if (adminOrdersCache.has(cacheKey)) {
      return adminOrdersCache.get(cacheKey);
    }

    if (isSupabaseConfigured) {
      try {
        let q = supabase
          .from("orders")
          .select("*, order_items(*)", { count: "exact" })
          .order("created_at", { ascending: false });

        if (statusFilter && statusFilter !== "All") {
          q = q.eq("status", statusFilter.toLowerCase());
        }
        if (search && search.trim()) {
          const s = search.trim();
          q = q.or(`order_number.ilike.%${s}%,customer_name.ilike.%${s}%,customer_email.ilike.%${s}%`);
        }

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        q = q.range(from, to);

        const { data: sbOrders, count, error } = await q;

        if (!error && Array.isArray(sbOrders)) {
          const mappedOrders = sbOrders.map((o) => ({
            id: o.order_number || o.id,
            date: o.created_at,
            customerName: o.customer_name,
            customerEmail: o.customer_email,
            customerPhone: o.customer_phone,
            shippingAddress: o.shipping_address,
            city: o.city,
            paymentMethod: o.payment_method,
            totalAmount: parseFloat(o.total_amount),
            status: o.status,
            customer: {
              name: o.customer_name,
              email: o.customer_email,
              phone: o.customer_phone,
              address: o.shipping_address,
              city: o.city
            },
            items: o.order_items || []
          }));

          const totalCount = count !== null ? count : mappedOrders.length;
          const totalPages = Math.ceil(totalCount / pageSize) || 1;
          const result = { orders: mappedOrders, totalCount, totalPages, page, pageSize };
          adminOrdersCache.set(cacheKey, result);
          return result;
        }
      } catch (err) {
        console.warn("Supabase fetchAdminOrdersPage error:", err);
      }
    }

    // Fallback local filtering
    const allLocalOrders = orders.length > 0 ? orders : getOrders();
    let filtered = allLocalOrders.filter((o) => {
      let matches = true;
      if (statusFilter && statusFilter !== "All") {
        matches = matches && String(o.status).toLowerCase() === statusFilter.toLowerCase();
      }
      if (search && search.trim()) {
        const s = search.toLowerCase().trim();
        matches =
          matches &&
          (String(o.id).toLowerCase().includes(s) ||
            o.customerName?.toLowerCase().includes(s) ||
            o.customerEmail?.toLowerCase().includes(s));
      }
      return matches;
    });

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize) || 1;
    const from = (page - 1) * pageSize;
    const sliced = filtered.slice(from, from + pageSize);
    const result = { orders: sliced, totalCount, totalPages, page, pageSize };
    adminOrdersCache.set(cacheKey, result);
    return result;
  };

  /**
   * Admin Overview Metrics Computation (head & aggregate queries)
   */
  const fetchAdminMetrics = async () => {
    let totalProducts = products.length;
    let outOfStockCount = products.filter((p) => parseInt(p.stock, 10) <= 0 || !p.stock).length;
    let totalOrders = orders.length;
    let totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.totalAmount || o.total || 0)), 0);

    if (isSupabaseConfigured) {
      try {
        const [prodCountRes, lowStockRes, orderCountRes, revenueRes] = await Promise.all([
          supabase.from("products").select("id", { count: "exact", head: true }),
          supabase.from("products").select("id", { count: "exact", head: true }).lte("stock", 5),
          supabase.from("orders").select("id", { count: "exact", head: true }),
          supabase.from("orders").select("total_amount")
        ]);

        if (prodCountRes.count !== null) totalProducts = prodCountRes.count;
        if (lowStockRes.count !== null) outOfStockCount = lowStockRes.count;
        if (orderCountRes.count !== null) totalOrders = orderCountRes.count;
        if (Array.isArray(revenueRes.data)) {
          totalRevenue = revenueRes.data.reduce((sum, row) => sum + (parseFloat(row.total_amount) || 0), 0);
        }
      } catch (err) {
        console.warn("Supabase fetchAdminMetrics error:", err);
      }
    }

    return { totalProducts, outOfStockCount, totalOrders, totalRevenue };
  };

  // Sync products changes
  const updateProductList = (newProducts) => {
    clearAdminCache();
    setProducts(newProducts);
    saveProducts(newProducts);
  };

  // Add Product (Admin + Supabase Sync)
  const addProduct = async (productData) => {
    clearProductCache();
    const slug = productData.slug || (productData.name || productData.title).toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const priceVal = parseFloat(productData.price) || 0;
    const origPriceVal = productData.originalPrice ? parseFloat(productData.originalPrice) : (priceVal > 0 ? Math.round(priceVal * 1.25) : 0);
    const discountVal = origPriceVal > priceVal ? Math.round(((origPriceVal - priceVal) / origPriceVal) * 100) : 0;
    const rawImages = Array.isArray(productData.images) && productData.images.length > 0
      ? productData.images
      : (productData.image ? [productData.image] : []);
    const primaryImg = rawImages[0] || productData.image || "";
    const imagePayload = rawImages.length > 0 ? rawImages.join("|||") : primaryImg;
    
    let newProduct = {
      ...productData,
      id: productData.id || `tb-custom-${Date.now()}`,
      name: productData.name || productData.title,
      title: productData.name || productData.title,
      slug,
      price: priceVal,
      originalPrice: origPriceVal,
      discountPrice: priceVal,
      discount: discountVal,
      stock: parseInt(productData.stock, 10) || 0,
      rating: parseFloat(productData.rating) || 4.8,
      reviewCount: parseInt(productData.reviewCount, 10) || 12,
      image: primaryImg,
      images: rawImages.length > 0 ? rawImages : [primaryImg],
      isFlashDeal: Boolean(productData.isFlashDeal),
      isFeatured: Boolean(productData.isFeatured),
      badge: productData.badge || (discountVal >= 15 ? `${discountVal}% OFF` : ""),
      tags: Array.isArray(productData.tags) ? productData.tags : (productData.tags ? productData.tags.split(",").map(t => t.trim()) : ["New"])
    };

    if (isSupabaseConfigured) {
      try {
        const uniqueSlug = `${slug}-${Date.now().toString().slice(-4)}`;
        const { data: inserted, error: insErr } = await supabase
          .from("products")
          .insert([{
            title: newProduct.name,
            slug: uniqueSlug,
            category: newProduct.category,
            subcategory: newProduct.subcategory || "",
            price: newProduct.price,
            original_price: newProduct.originalPrice,
            discount: newProduct.discount || 0,
            rating: newProduct.rating,
            reviews_count: newProduct.reviewCount,
            image: imagePayload,
            description: newProduct.description || "",
            stock: newProduct.stock,
            is_featured: newProduct.isFeatured,
            badge: newProduct.badge || ""
          }])
          .select()
          .single();

        if (insErr) {
          console.error("Supabase insert error details:", insErr);
        } else if (inserted) {
          newProduct.id = inserted.id;
          newProduct.slug = inserted.slug;
        }
      } catch (err) {
        console.error("Supabase insert product error:", err);
      }
    }

    const updated = [newProduct, ...products];
    updateProductList(updated);
    return newProduct;
  };

  // Edit/Update Product (Admin + Supabase Sync)
  const editProduct = async (id, updatedFields) => {
    clearProductCache();
    const rawImages = Array.isArray(updatedFields.images) && updatedFields.images.length > 0
      ? updatedFields.images
      : (updatedFields.image ? [updatedFields.image] : []);
    const primaryImg = rawImages[0] || updatedFields.image;
    const imagePayload = rawImages.length > 0 ? rawImages.join("|||") : updatedFields.image;

    const updated = products.map((p) => {
      if (String(p.id) === String(id) || (p.slug && p.slug === updatedFields.slug)) {
        const priceVal = updatedFields.price !== undefined ? parseFloat(updatedFields.price) : p.price;
        const origPriceVal = updatedFields.originalPrice !== undefined ? parseFloat(updatedFields.originalPrice) : (p.originalPrice || priceVal * 1.25);
        const discountVal = origPriceVal > priceVal ? Math.round(((origPriceVal - priceVal) / origPriceVal) * 100) : 0;

        return {
          ...p,
          ...updatedFields,
          name: updatedFields.name || updatedFields.title || p.name,
          title: updatedFields.name || updatedFields.title || p.title,
          image: primaryImg || p.image,
          images: rawImages.length > 0 ? rawImages : (p.images || [p.image]),
          price: priceVal,
          originalPrice: origPriceVal,
          discountPrice: priceVal,
          discount: discountVal,
          stock: updatedFields.stock !== undefined ? parseInt(updatedFields.stock, 10) : p.stock,
          rating: updatedFields.rating !== undefined ? parseFloat(updatedFields.rating) : p.rating,
          reviewCount: updatedFields.reviewCount !== undefined ? parseInt(updatedFields.reviewCount, 10) : p.reviewCount,
          badge: updatedFields.badge !== undefined ? updatedFields.badge : (discountVal >= 15 ? `${discountVal}% OFF` : p.badge),
          isFeatured: updatedFields.isFeatured !== undefined ? Boolean(updatedFields.isFeatured) : p.isFeatured,
          isFlashDeal: updatedFields.isFlashDeal !== undefined ? Boolean(updatedFields.isFlashDeal) : p.isFlashDeal
        };
      }
      return p;
    });
    updateProductList(updated);

    if (isSupabaseConfigured) {
      try {
        const targetP = products.find((p) => String(p.id) === String(id) || (p.slug && p.slug === updatedFields.slug));
        const priceVal = updatedFields.price !== undefined ? parseFloat(updatedFields.price) : (targetP?.price || 0);
        const origPriceVal = updatedFields.originalPrice !== undefined ? parseFloat(updatedFields.originalPrice) : targetP?.originalPrice;
        const discountVal = origPriceVal && origPriceVal > priceVal ? Math.round(((origPriceVal - priceVal) / origPriceVal) * 100) : (updatedFields.discount !== undefined ? parseInt(updatedFields.discount, 10) : 0);

        const updatePayload = {
          title: updatedFields.name || updatedFields.title,
          category: updatedFields.category,
          subcategory: updatedFields.subcategory,
          price: updatedFields.price !== undefined ? parseFloat(updatedFields.price) : undefined,
          original_price: updatedFields.originalPrice !== undefined ? parseFloat(updatedFields.originalPrice) : undefined,
          discount: discountVal,
          rating: updatedFields.rating !== undefined ? parseFloat(updatedFields.rating) : undefined,
          reviews_count: updatedFields.reviewCount !== undefined ? parseInt(updatedFields.reviewCount, 10) : undefined,
          stock: updatedFields.stock !== undefined ? parseInt(updatedFields.stock, 10) : undefined,
          image: imagePayload,
          description: updatedFields.description,
          is_featured: updatedFields.isFeatured !== undefined ? Boolean(updatedFields.isFeatured) : undefined,
          badge: updatedFields.badge
        };

        // Clean undefined properties
        Object.keys(updatePayload).forEach(key => updatePayload[key] === undefined && delete updatePayload[key]);

        // Try updating by UUID ID or by slug
        const isUuid = String(id).includes("-") && String(id).length >= 32;
        if (isUuid) {
          await supabase.from("products").update(updatePayload).eq("id", id);
        } else if (updatedFields.slug) {
          await supabase.from("products").update(updatePayload).eq("slug", updatedFields.slug);
        } else {
          await supabase.from("products").update(updatePayload).eq("title", updatedFields.name || updatedFields.title);
        }
      } catch (err) {
        console.error("Supabase update error:", err);
      }
    }
  };

  // Update Stock directly
  const updateStock = (id, newStock) => {
    editProduct(id, { stock: parseInt(newStock, 10) });
  };

  // Delete Product (Admin + Supabase Sync)
  const deleteProduct = async (id) => {
    clearProductCache();
    const targetProduct = products.find((p) => String(p.id) === String(id));
    const updated = products.filter((p) => String(p.id) !== String(id));
    updateProductList(updated);

    if (isSupabaseConfigured) {
      try {
        const isUuid = String(id).includes("-") && String(id).length >= 32;
        if (isUuid) {
          await supabase.from("products").delete().eq("id", id);
        } else if (targetProduct?.slug) {
          await supabase.from("products").delete().eq("slug", targetProduct.slug);
        } else if (targetProduct?.name) {
          await supabase.from("products").delete().eq("title", targetProduct.name);
        }
      } catch (err) {
        console.error("Supabase delete error:", err);
      }
    }
  };

  // Delete Order (Admin + Supabase Sync)
  const deleteOrder = async (orderId) => {
    const orderIdStr = String(orderId).trim();
    const updated = orders.filter((o) => String(o.id) !== orderIdStr && String(o.order_number) !== orderIdStr);
    setOrders(updated);
    saveOrdersList(updated);

    if (isSupabaseConfigured) {
      try {
        const isNumeric = /^\d+$/.test(orderIdStr);

        let query = supabase.from("orders").select("id, order_number");
        if (isNumeric) {
          query = query.or(`id.eq.${orderIdStr},order_number.eq.${orderIdStr}`);
        } else {
          query = query.eq("order_number", orderIdStr);
        }

        const { data: matchedOrders, error: findErr } = await query;
        if (findErr) console.error("Supabase find order error:", findErr);

        if (matchedOrders && matchedOrders.length > 0) {
          for (const ord of matchedOrders) {
            await supabase.from("order_items").delete().eq("order_id", ord.id);
            await supabase.from("orders").delete().eq("id", ord.id);
          }
        } else {
          await supabase.from("orders").delete().eq("order_number", orderIdStr);
        }

        const { data: freshOrders } = await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
        if (freshOrders) {
          const remappedOrders = freshOrders.map((o) => ({
            id: o.order_number || o.id,
            date: o.created_at,
            customerName: o.customer_name,
            customerEmail: o.customer_email,
            customerPhone: o.customer_phone,
            shippingAddress: o.shipping_address,
            city: o.city,
            paymentMethod: o.payment_method,
            totalAmount: parseFloat(o.total_amount),
            status: o.status,
            customer: {
              name: o.customer_name,
              email: o.customer_email,
              phone: o.customer_phone,
              address: o.shipping_address,
              city: o.city
            },
            items: o.order_items || []
          }));
          setOrders(remappedOrders);
          saveOrdersList(remappedOrders);
        }
      } catch (err) {
        console.error("Supabase delete order error:", err);
      }
    }
  };

  // Refresh data from Supabase/local
  const refreshData = async () => {
    clearProductCache();
    if (!isSupabaseConfigured) {
      setProducts(getProducts());
      setOrders(getOrders());
      return;
    }
    const { data: sbProducts } = await supabase.from("products").select(SELECT_FIELDS).order("created_at", { ascending: false }).range(0, 19);
    if (Array.isArray(sbProducts)) {
      const remapped = sbProducts.map(mapSupabaseProductToFrontend);
      setProducts(remapped);
    }
    const { data: sbOrders } = await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
    if (Array.isArray(sbOrders)) {
      const remappedOrders = sbOrders.map((o) => ({
        id: o.order_number || o.id,
        date: o.created_at,
        customerName: o.customer_name,
        customerEmail: o.customer_email,
        customerPhone: o.customer_phone,
        shippingAddress: o.shipping_address,
        city: o.city,
        paymentMethod: o.payment_method,
        totalAmount: parseFloat(o.total_amount),
        status: o.status,
        customer: {
          name: o.customer_name,
          email: o.customer_email,
          phone: o.customer_phone,
          address: o.shipping_address,
          city: o.city
        },
        items: o.order_items || []
      }));
      setOrders(remappedOrders);
      saveOrdersList(remappedOrders);
    }
  };

  // Reset to original data
  const resetToDefault = () => {
    clearProductCache();
    const defaultList = resetProductsToDefault();
    setProducts(defaultList);
  };

  // Create new order (from Checkout + Supabase Sync)
  const placeOrder = async (orderData) => {
    const orderNum = `TB-${Date.now().toString().slice(-6)}`;
    const totalVal = parseFloat(orderData.totalAmount || orderData.total || orderData.total_amount || 0);
    const customerName = orderData.customer?.name || `${orderData.customer?.firstName || ''} ${orderData.customer?.lastName || ''}`.trim() || "Valued Customer";

    const newOrder = {
      id: orderNum,
      date: new Date().toISOString(),
      status: "Pending",
      customerName,
      customerEmail: orderData.customer?.email || "",
      customerPhone: orderData.customer?.phone || "",
      shippingAddress: orderData.customer?.address || "",
      city: orderData.customer?.city || "",
      totalAmount: totalVal,
      total: totalVal,
      ...orderData,
      totalAmount: totalVal,
      total: totalVal
    };

    saveOrder(newOrder);
    setOrders((prev) => [newOrder, ...prev]);

    if (isSupabaseConfigured) {
      try {
        const { data: insertedOrder, error: oErr } = await supabase
          .from("orders")
          .insert([{
            order_number: orderNum,
            customer_name: customerName,
            customer_email: orderData.customer?.email || "",
            customer_phone: orderData.customer?.phone || "",
            shipping_address: orderData.customer?.address || "",
            city: orderData.customer?.city || "",
            postal_code: orderData.customer?.zip || orderData.customer?.postalCode || "",
            payment_method: orderData.paymentMethod || "cash_on_delivery",
            total_amount: totalVal,
            status: "pending"
          }])
          .select()
          .single();

        if (!oErr && insertedOrder && Array.isArray(orderData.items)) {
          const itemsToInsert = orderData.items.map((item) => ({
            order_id: insertedOrder.id,
            product_id: String(item.id),
            product_title: item.name || item.title,
            quantity: item.quantity,
            price: parseFloat(item.price),
            image: item.image
          }));
          await supabase.from("order_items").insert(itemsToInsert);
        }
      } catch (err) {
        console.error("Supabase placeOrder error:", err);
      }
    }

    // Also deduct stock for purchased items
    if (Array.isArray(orderData.items)) {
      setProducts((currentProds) => {
        const updated = currentProds.map((prod) => {
          const purchasedItem = orderData.items.find((item) => String(item.id) === String(prod.id));
          if (purchasedItem) {
            const newStock = Math.max(0, prod.stock - purchasedItem.quantity);
            return { ...prod, stock: newStock };
          }
          return prod;
        });
        saveProducts(updated);
        return updated;
      });
    }

    return newOrder;
  };

  // Update order status (Admin + Supabase Sync)
  const updateStatus = async (orderId, newStatus) => {
    const updatedOrders = orders.map((o) => (String(o.id) === String(orderId) || String(o.order_number) === String(orderId) ? { ...o, status: newStatus } : o));
    setOrders(updatedOrders);
    saveOrdersList(updatedOrders);

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from("orders")
          .update({ status: newStatus })
          .or(`order_number.eq.${orderId},id.eq.${orderId}`);
      } catch (err) {
        console.error("Supabase update status error:", err);
      }
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        orders,
        isLoading,
        isLoaded,
        fetchProductsPage,
        fetchAdminProductsPage,
        fetchAdminOrdersPage,
        fetchAdminMetrics,
        clearAdminCache,
        clearProductCache,
        addProduct,
        editProduct,
        updateStock,
        deleteProduct,
        deleteOrder,
        refreshData,
        resetToDefault,
        placeOrder,
        updateStatus,
        isSupabaseConfigured
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
