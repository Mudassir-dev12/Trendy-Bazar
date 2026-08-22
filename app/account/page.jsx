import AccountClient from "./AccountClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.trendybazaarofficial.online";

export const metadata = {
  title: "Account Login & Sign Up | Trendy Bazaar Official",
  description: "Sign in or register your account on Trendy Bazaar Official to manage orders and saved items.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/account`,
  },
};

export default function AccountPage() {
  return <AccountClient />;
}
