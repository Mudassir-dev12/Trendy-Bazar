import CheckoutClient from "./CheckoutClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.trendybazaarofficial.online";

export const metadata = {
  title: "Checkout & Delivery | Trendy Bazaar Official",
  description: "Complete your order securely with Cash on Delivery on Trendy Bazaar Official.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/checkout`,
  },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
