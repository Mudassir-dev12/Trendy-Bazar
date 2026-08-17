import { categories } from "@/data/categories";
import { initialProducts } from "@/data/products";

// Local storage key for products managed by Admin Panel
const PRODUCTS_STORAGE_KEY = "tb_products_data_v2";
const ORDERS_STORAGE_KEY = "tb_orders_data_v2";

/**
 * Global Helper for formatting currency in PKR (Rs.)
 */
export function formatPrice(amount) {
  const num = Math.round(Number(amount) || 0);
  return `Rs. ${num.toLocaleString("en-PK")}`;
}

/**
 * Retrieves the active product list (merging initial mock data with any admin overrides stored in localStorage)
 */
export function getProducts() {
  if (typeof window === "undefined") {
    return initialProducts;
  }
  try {
    // Clear legacy corrupted v1 storage if present
    if (localStorage.getItem("tb_products_data_v1")) {
      localStorage.removeItem("tb_products_data_v1");
    }

    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Filter out any corrupted entries
        return parsed.map((p) => {
          // If an image was corrupted, fallback to seed or clean image
          const isCorruptedBase64 = typeof p.image === "string" && p.image.startsWith("data:") && p.image.length < 5000;
          if (isCorruptedBase64) {
            const seedMatch = initialProducts.find((init) => init.id === p.id || init.slug === p.slug);
            return { ...p, image: seedMatch?.image || "" };
          }
          return p;
        });
      }
    }
  } catch (e) {
    console.error("Failed to parse stored products:", e);
  }
  return initialProducts;
}

export function saveProducts(products) {
  if (typeof window === "undefined" || !Array.isArray(products)) return;
  try {
    const safeCache = products.map((p) => {
      const isBigBase64 = typeof p.image === "string" && p.image.startsWith("data:");
      return {
        ...p,
        image: isBigBase64 ? "" : p.image,
        images: Array.isArray(p.images) ? p.images.filter((img) => typeof img === "string" && !img.startsWith("data:")) : []
      };
    });
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(safeCache));
  } catch (err) {
    // If browser localStorage is restricted or disabled, fail silently
  }
}

/**
 * Reset products back to original initial state
 */
export function resetProductsToDefault() {
  if (typeof window === "undefined") return initialProducts;
  try {
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
  } catch (e) {
    console.error("Failed to reset products:", e);
  }
  return initialProducts;
}

/**
 * Returns full category hierarchy
 */
export function getCategories() {
  return categories;
}

/**
 * Get category metadata by slug
 */
export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}

/**
 * Find single product by ID
 */
export function getProductById(id, currentProducts = null) {
  const list = currentProducts || getProducts();
  return list.find((p) => String(p.id) === String(id));
}

/**
 * Get Flash Deals (products with isFlashDeal true)
 */
export function getFlashDeals(limit = 10, currentProducts = null) {
  const list = currentProducts || getProducts();
  const deals = list.filter((p) => p.isFlashDeal || (p.originalPrice && p.originalPrice > p.price));
  return limit ? deals.slice(0, limit) : deals;
}

/**
 * Get Featured Products
 */
export function getFeaturedProducts(limit = 8, currentProducts = null) {
  const list = currentProducts || getProducts();
  const featured = list.filter((p) => p.isFeatured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get related products by category/subcategory excluding current product
 */
export function getRelatedProducts(productId, subcategory, category, limit = 6, currentProducts = null) {
  const list = currentProducts || getProducts();
  let related = list.filter(
    (p) => String(p.id) !== String(productId) && p.subcategory === subcategory
  );
  if (related.length < limit) {
    const extraCategory = list.filter(
      (p) =>
        String(p.id) !== String(productId) &&
        p.category === category &&
        !related.some((r) => r.id === p.id)
    );
    related = [...related, ...extraCategory];
  }
  return related.slice(0, limit);
}

/**
 * Search products by query string and optional filters
 */
export function filterProducts({
  products = null,
  query = "",
  category = "",
  subcategory = "",
  minPrice = 0,
  maxPrice = 200000,
  minRating = 0,
  sortBy = "popular"
} = {}) {
  let list = [...(products || getProducts())];

  // Search query match in name, description, tags, category
  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  // Category filter
  if (category) {
    list = list.filter((p) => p.category === category);
  }

  // Subcategory filter
  if (subcategory) {
    list = list.filter((p) => p.subcategory === subcategory);
  }

  // Price range filter
  list = list.filter((p) => {
    const effectivePrice = p.price || 0;
    return effectivePrice >= minPrice && effectivePrice <= maxPrice;
  });

  // Min rating filter
  if (minRating > 0) {
    list = list.filter((p) => (p.rating || 0) >= minRating);
  }

  // Sorting
  switch (sortBy) {
    case "price-asc":
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
      break;
    case "price-desc":
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
      break;
    case "rating":
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "discount":
      list.sort((a, b) => {
        const discA = a.originalPrice && a.originalPrice > a.price ? a.originalPrice - a.price : 0;
        const discB = b.originalPrice && b.originalPrice > b.price ? b.originalPrice - b.price : 0;
        return discB - discA;
      });
      break;
    case "newest":
    case "popular":
    default:
      list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      break;
  }

  return list;
}

// -------------------------------------------------------------
// ORDERS MOCK DB (stored in localStorage)
// -------------------------------------------------------------

export function getOrders() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error("Failed to parse orders:", e);
  }
  return [];
}

export function saveOrder(order) {
  if (typeof window === "undefined") return;
  const current = getOrders();
  const updated = [order, ...current];
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save order:", e);
  }
}

export function saveOrdersList(ordersList) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(ordersList));
  } catch (e) {
    console.error("Failed to save orders list:", e);
  }
}

