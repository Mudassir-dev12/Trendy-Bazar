import WishlistClient from "./WishlistClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.trendybazaarofficial.online";

export const metadata = {
  title: "My Wishlist | Trendy Bazaar Official",
  description: "View saved items in your wishlist on Trendy Bazaar Official.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/wishlist`,
  },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
