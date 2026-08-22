import HomeClient from "./HomeClient";
import { initialProducts } from "@/data/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.trendybazaarofficial.online";

export const metadata = {
  title: "Trendy Bazaar Official | Best Online Shopping in Pakistan",
  description: "Shop top smart gadgets, home appliances, kitchen essentials, and educational toys at direct bazaar prices on Trendy Bazaar Official. Fast shipping across Pakistan.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Trendy Bazaar Official | Best Online Shopping in Pakistan",
    description: "Shop top smart gadgets, home appliances, kitchen essentials, and educational toys at direct bazaar prices on Trendy Bazaar Official.",
    url: siteUrl,
    siteName: "Trendy Bazaar Official",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 800,
        height: 800,
        alt: "Trendy Bazaar Official Storefront",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trendy Bazaar Official | Best Online Shopping in Pakistan",
    description: "Shop top smart gadgets, home appliances, kitchen essentials, and educational toys at direct bazaar prices on Trendy Bazaar Official.",
    images: [`${siteUrl}/logo.png`],
  },
};

export default function HomePage() {
  const featuredProducts = initialProducts.slice(0, 12);
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        "url": siteUrl,
        "name": "Trendy Bazaar Official - Best Online Shopping in Pakistan",
        "description": "Shop top smart gadgets, home appliances, kitchen essentials, and educational toys at direct bazaar prices on Trendy Bazaar Official.",
        "isPartOf": {
          "@id": `${siteUrl}/#website`,
        },
      },
      {
        "@type": "ItemList",
        "name": "Featured Customer Favorites",
        "itemListElement": featuredProducts.map((prod, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${siteUrl}/product/${prod.id}`,
          "name": prod.name,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
