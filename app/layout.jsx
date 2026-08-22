import "./globals.css";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import LayoutShell from "@/components/LayoutShell";
import MetaPixel from "@/components/MetaPixel";

export const metadata = {
  title: "Trendy Bazaar | Catch the Trend, Love the Price",
  description: "Discover top smart gadgets, home essentials, appliances, and toys at unbeatable prices on Trendy Bazaar.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* IconScout Unicons CDN Stylesheets */}
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/solid.css" />
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
