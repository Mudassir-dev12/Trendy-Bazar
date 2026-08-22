import { getProductById } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";
import { initialProducts } from "@/data/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.trendybazaarofficial.online";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const product = getProductById(id, initialProducts);

  if (!product) {
    return {
      title: "Product Not Found | Trendy Bazaar Official",
      description: "The requested product is not available in our store catalog.",
      robots: { index: false, follow: true },
    };
  }

  const title = `${product.name} - Buy Online in Pakistan | Trendy Bazaar Official`;
  const description = `${product.description} Available now on Trendy Bazaar Official for Rs. ${product.price?.toLocaleString()} PKR with fast shipping across Pakistan.`;
  const canonicalUrl = `${siteUrl}/product/${product.id}`;
  const imageUrl = product.image?.startsWith("http") ? product.image : `${siteUrl}${product.image || "/logo.png"}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.category,
      product.subcategory,
      "Buy " + product.name + " Pakistan",
      "Trendy Bazaar Official",
      "trendybazaarofficial.online",
      "Ali Raza Store",
    ].filter(Boolean),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Trendy Bazaar Official",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const product = getProductById(id, initialProducts);

  const canonicalUrl = `${siteUrl}/product/${id}`;

  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Product",
            "@id": `${canonicalUrl}#product`,
            "name": product.name,
            "image": product.image?.startsWith("http") ? product.image : `${siteUrl}${product.image || "/logo.png"}`,
            "description": product.description,
            "sku": product.id.toUpperCase(),
            "mpn": product.id,
            "brand": {
              "@type": "Brand",
              "name": "Trendy Bazaar Official",
            },
            "offers": {
              "@type": "Offer",
              "url": canonicalUrl,
              "priceCurrency": "PKR",
              "price": product.price,
              "priceValidUntil": "2027-12-31",
              "itemCondition": "https://schema.org/NewCondition",
              "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "seller": {
                "@type": "Organization",
                "name": "Trendy Bazaar Official",
              },
            },
            ...(product.rating ? {
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": product.rating,
                "reviewCount": product.reviewCount || 120,
              }
            } : {}),
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${canonicalUrl}#breadcrumb`,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl,
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": product.category ? product.category.replace(/-/g, " ") : "Category",
                "item": `${siteUrl}/category/${product.category}`,
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": product.name,
                "item": canonicalUrl,
              },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailClient id={id} />
    </>
  );
}
