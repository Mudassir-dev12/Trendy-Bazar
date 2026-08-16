import "./globals.css";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export const metadata = {
  title: "Trendy Bazaar | Catch the Trend, Love the Price",
  description: "Discover top smart gadgets, home essentials, appliances, and toys at unbeatable prices on Trendy Bazaar.",
  icons: {
    icon: "/logo.svg",
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
        <ToastProvider>
          <ProductProvider>
            <CartProvider>
              <WishlistProvider>
                <Header />
                <CategoryNav />
                <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-4 md:py-6">
                  {children}
                </main>
                <Footer />
                <CartDrawer />
                <ScrollToTopButton />
              </WishlistProvider>
            </CartProvider>
          </ProductProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
