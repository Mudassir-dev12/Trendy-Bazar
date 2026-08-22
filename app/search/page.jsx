import SearchClient from "./SearchClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.trendybazaarofficial.online";

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q || "";

  const title = query
    ? `Search results for "${query}" | Trendy Bazaar Official`
    : `Search Products | Trendy Bazaar Official`;

  return {
    title,
    description: `Browse search results for ${query || "products"} on Trendy Bazaar Official store.`,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: query ? `${siteUrl}/search?q=${encodeURIComponent(query)}` : `${siteUrl}/search`,
    },
  };
}

export default function SearchPage() {
  return <SearchClient />;
}
