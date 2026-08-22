import { categories } from "@/data/categories";
import { initialProducts } from "@/data/products";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.trendybazaarofficial.online";

  const staticRoutes = [
    { route: "", priority: 1.0, changeFrequency: "daily" },
    { route: "/search", priority: 0.7, changeFrequency: "daily" },
    { route: "/cart", priority: 0.3, changeFrequency: "monthly" },
    { route: "/checkout", priority: 0.3, changeFrequency: "monthly" },
    { route: "/wishlist", priority: 0.3, changeFrequency: "monthly" },
    { route: "/account", priority: 0.3, changeFrequency: "monthly" },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
    priority,
  }));

  const categoryRoutes = categories.flatMap((cat) => {
    const mainCat = {
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    };

    const subCats = (cat.subcategories || []).map((sub) => ({
      url: `${baseUrl}/category/${cat.slug}?sub=${sub.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [mainCat, ...subCats];
  });

  const productRoutes = initialProducts.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
