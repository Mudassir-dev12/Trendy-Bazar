export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

/**
 * Triggers standard PageView event.
 */
export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

/**
 * Triggers custom or standard Meta Pixel event safely.
 * @param {string} name - Event name (e.g. 'ViewContent', 'AddToCart')
 * @param {object} options - Event parameters payload
 */
export const event = (name, options = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", name, options);
  }
};

/**
 * Track ViewContent event when product details are viewed.
 */
export const trackViewContent = (product) => {
  if (!product) return;
  event("ViewContent", {
    content_ids: [String(product.id)],
    content_name: product.name,
    content_category: product.category || "",
    value: product.price || 0,
    currency: "PKR",
  });
};

/**
 * Track AddToCart event when item is added to cart.
 */
export const trackAddToCart = (product, quantity = 1) => {
  if (!product) return;
  const price = product.discountPrice || product.price || 0;
  event("AddToCart", {
    content_ids: [String(product.id)],
    content_name: product.name,
    content_category: product.category || "",
    value: price * quantity,
    currency: "PKR",
    num_items: quantity,
  });
};

/**
 * Track AddToWishlist event when item is saved to wishlist.
 */
export const trackAddToWishlist = (product) => {
  if (!product) return;
  const price = product.discountPrice || product.price || 0;
  event("AddToWishlist", {
    content_ids: [String(product.id)],
    content_name: product.name,
    content_category: product.category || "",
    value: price,
    currency: "PKR",
  });
};

/**
 * Track InitiateCheckout event when checkout process starts.
 */
export const trackInitiateCheckout = (cart = [], totalValue = 0) => {
  if (!cart || cart.length === 0) return;
  event("InitiateCheckout", {
    content_ids: cart.map((item) => String(item.id)),
    num_items: cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
    value: totalValue,
    currency: "PKR",
  });
};

/**
 * Track Purchase event when an order is completed.
 */
export const trackPurchase = (order = {}) => {
  const items = order.items || [];
  const total = order.totalAmount || order.total || 0;
  event("Purchase", {
    content_ids: items.map((item) => String(item.id)),
    num_items: items.reduce((sum, item) => sum + (item.quantity || 1), 0),
    value: total,
    currency: "PKR",
  });
};

/**
 * Track Search event when user executes a product search.
 */
export const trackSearch = (query = "") => {
  if (!query || query.trim() === "") return;
  event("Search", {
    search_string: query.trim(),
  });
};
