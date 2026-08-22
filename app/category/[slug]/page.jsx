import { getCategoryBySlug } from "@/lib/data";
import CategoryClient from "./CategoryClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.trendybazaarofficial.online";

export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { slug } = resolvedParams;
  const subQuery = resolvedSearchParams?.sub || "";

  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Trendy Bazaar Official",
      description: "The requested category could not be found in our store catalog.",
      robots: { index: false, follow: true },
    };
  }

  const subCategoryObj = subQuery
    ? category.subcategories?.find((s) => s.slug === subQuery)
    : null;

  const categoryTitle = subCategoryObj
    ? `${subCategoryObj.name} (${category.name}) - Online in Pakistan | Trendy Bazaar Official`
    : `${category.name} Collection - Buy Online in Pakistan | Trendy Bazaar Official`;

  const description = subCategoryObj
    ? `Explore top deals on ${subCategoryObj.name} in Pakistan. Fast delivery, direct manufacturer warranties, and cash on delivery on Trendy Bazaar Official.`
    : `Shop ${category.name} at direct bazaar prices in Pakistan. ${category.description}`;

  const canonicalUrl = subQuery
    ? `${siteUrl}/category/${category.slug}?sub=${subQuery}`
    : `${siteUrl}/category/${category.slug}`;

  return {
    title: categoryTitle,
    description,
    keywords: [
      category.name,
      ...(category.subcategories?.map((s) => s.name) || []),
      "Buy " + category.name + " Pakistan",
      "Trendy Bazaar Official",
      "trendybazaarofficial.online",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: categoryTitle,
      description,
      url: canonicalUrl,
      siteName: "Trendy Bazaar Official",
      images: [
        {
          url: `${siteUrl}/logo.png`,
          width: 800,
          height: 800,
          alt: category.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: categoryTitle,
      description,
      images: [`${siteUrl}/logo.png`],
    },
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { slug } = resolvedParams;
  const subQuery = resolvedSearchParams?.sub || "";
  const category = getCategoryBySlug(slug);

  const canonicalUrl = subQuery
    ? `${siteUrl}/category/${slug}?sub=${subQuery}`
    : `${siteUrl}/category/${slug}`;

  const jsonLd = category
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${canonicalUrl}#collection`,
            "url": canonicalUrl,
            "name": category.name,
            "description": category.description,
            "isPartOf": {
              "@id": `${siteUrl}/#website`,
            },
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
                "name": category.name,
                "item": `${siteUrl}/category/${category.slug}`,
              },
              ...(subQuery
                ? [
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": category.subcategories?.find((s) => s.slug === subQuery)?.name || subQuery,
                      "item": canonicalUrl,
                    },
                  ]
                : []),
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
      <CategoryClient slug={slug} />
    </>
  );
}
