import CartClient from "./CartClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.trendybazaarofficial.online";

export const metadata = {
  title: "Shopping Cart | Trendy Bazaar Official",
  description: "View and manage items in your shopping cart on Trendy Bazaar Official.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/cart`,
  },
};

export default function CartPage() {
  return <CartClient />;
}
