import "./globals.css";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import LayoutShell from "@/components/LayoutShell";
import MetaPixel from "@/components/MetaPixel";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.trendybazaarofficial.online";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Trendy Bazaar Official | Catch the Trend, Love the Price",
    template: "%s | Trendy Bazaar Official",
  },
  description: "Shop top smart gadgets, kitchen & home essentials, appliances, and educational toys at unbeatable prices in Pakistan. Official Trendy Bazaar store owned by Ali Raza with fast Cash on Delivery.",
  keywords: [
    "Trendy Bazaar Official",
    "trendybazaarofficial.online",
    "Smart Gadgets Pakistan",
    "Home Essentials Pakistan",
    "Kitchen Appliances",
    "Educational Toys Pakistan",
    "Ali Raza Trendy Bazaar",
    "Online Shopping Pakistan",
    "Cash on Delivery Pakistan",
    "Fast Delivery Bazaar Prices",
  ],
  authors: [{ name: "Ali Raza", url: siteUrl }],
  creator: "Ali Raza",
  publisher: "Trendy Bazaar Official",
  category: "ecommerce",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/favicon.ico" },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    title: "Trendy Bazaar Official | Catch the Trend, Love the Price",
    description: "Shop top smart gadgets, kitchen & home essentials, appliances, and toys at unbeatable prices in Pakistan on Trendy Bazaar Official.",
    url: siteUrl,
    siteName: "Trendy Bazaar Official",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 800,
        height: 800,
        alt: "Trendy Bazaar Official Logo",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trendy Bazaar Official | Catch the Trend, Love the Price",
    description: "Discover top smart gadgets, home essentials, appliances, and toys at unbeatable prices in Pakistan.",
    images: [`${siteUrl}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "OnlineStore",
        "@id": `${siteUrl}/#store`,
        "name": "Trendy Bazaar Official",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "image": `${siteUrl}/logo.png`,
        "description": "Shop top smart gadgets, home essentials, appliances, and toys at unbeatable prices on Trendy Bazaar Official.",
        "telephone": "+923402856453",
        "priceRange": "PKR",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "PK",
        },
        "founder": {
          "@type": "Person",
          "name": "Ali Raza",
          "jobTitle": "CEO & Founder",
          "telephone": "+923402856453",
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+923402856453",
            "contactType": "customer service",
            "availableLanguage": ["English", "Urdu"],
            "option": ["Direct Call", "WhatsApp"],
          },
        ],
        "sameAs": [
          "https://wa.me/923402856453",
          "https://www.trendybazaarofficial.online"
        ],
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Trendy Bazaar Official",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "founder": "Ali Raza",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+923402856453",
          "contactType": "customer support",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Trendy Bazaar Official",
        "publisher": {
          "@id": `${siteUrl}/#store`,
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* IconScout Unicons CDN Stylesheets */}
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/solid.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen antialiased selection:bg-orange-100 selection:text-[#F58220]" suppressHydrationWarning>
        <MetaPixel />
        <ToastProvider>
          <ProductProvider>
            <CartProvider>
              <WishlistProvider>
                <LayoutShell>
                  {children}
                </LayoutShell>
              </WishlistProvider>
            </CartProvider>
          </ProductProvider>
        </ToastProvider>
      </body>
    </html>
  );
}


