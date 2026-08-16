"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getProducts,
  saveProducts,
  getOrders,
  saveOrder,
  updateOrderStatus as updateOrderStatusApi,
  resetProductsToDefault
} from "@/lib/data";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize data on client side (Syncing with Supabase if credentials provided)
  useEffect(() => {
    async function loadData() {
      let loadedProducts = getProducts();
      let loadedOrders = getOrders();

      if (isSupabaseConfigured) {
        try {
          // Fetch real products from Supabase
          const { data: sbProducts, error: prodErr } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

          if (!prodErr && sbProducts && sbProducts.length > 0) {
            loadedProducts = sbProducts.map((p) => ({
              id: p.id,
              name: p.title,
              slug: p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              category: p.category,
              subcategory: p.subcategory || "",
              price: parseFloat(p.price) || 0,
              originalPrice: p.original_price ? parseFloat(p.original_price) : parseFloat(p.price) * 1.2,
              discountPrice: parseFloat(p.price) || 0,
              discount: p.discount || 0,
              rating: parseFloat(p.rating) || 4.5,
              reviewCount: p.reviews_count || 12,
              image: p.image,
              description: p.description || "",
              stock: p.stock || 50,
              isFeatured: p.is_featured || false,
              badge: p.badge || ""
            }));
          }

          // Fetch real orders from Supabase
          const { data: sbOrders, error: orderErr } = await supabase
            .from("orders")
            .select("*, order_items(*)")
            .order("created_at", { ascending: false });

          if (!orderErr && sbOrders && sbOrders.length > 0) {
            loadedOrders = sbOrders.map((o) => ({
              id: o.order_number || o.id,
              date: o.created_at,
              customerName: o.customer_name,
              customerEmail: o.customer_email,
              customerPhone: o.customer_phone,
              shippingAddress: o.shipping_address,
              city: o.city,
              paymentMethod: o.payment_method,
              totalAmount: parseFloat(o.total_amount),
              status: o.status,
              items: o.order_items || []
            }));
          }
        } catch (err) {
          console.warn("Supabase fetch failed, using local store fallback:", err);
        }
      }

      setProducts(loadedProducts);
      setOrders(loadedOrders);
      setIsLoaded(true);
    }

    loadData();
  }, []);

  // Sync products changes
  const updateProductList = (newProducts) => {
    setProducts(newProducts);
    saveProducts(newProducts);
  };

  // Add Product (Admin + Supabase Sync)
  const addProduct = async (productData) => {
    const newProduct = {
      ...productData,
      id: productData.id || `tb-custom-${Date.now()}`,
      slug: productData.slug || (productData.name || productData.title).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      price: parseFloat(productData.price) || 0,
      discountPrice: productData.discountPrice ? parseFloat(productData.discountPrice) : parseFloat(productData.price) || 0,
      stock: parseInt(productData.stock, 10) || 0,
      rating: parseFloat(productData.rating) || 4.5,
      reviewCount: parseInt(productData.reviewCount, 10) || 1,
      isFlashDeal: Boolean(productData.isFlashDeal),
      isFeatured: Boolean(productData.isFeatured),
      tags: Array.isArray(productData.tags) ? productData.tags : (productData.tags ? productData.tags.split(",").map(t => t.trim()) : ["New"])
    };

    if (isSupabaseConfigured) {
      try {
        await supabase.from("products").insert([{
          title: newProduct.name || newProduct.title,
          slug: newProduct.slug,
          category: newProduct.category,
          subcategory: newProduct.subcategory || "",
          price: newProduct.price,
          original_price: newProduct.originalPrice || newProduct.price * 1.2,
          discount: newProduct.discount || 0,
          rating: newProduct.rating,
          reviews_count: newProduct.reviewCount,
          image: newProduct.image,
          description: newProduct.description,
          stock: newProduct.stock,
          is_featured: newProduct.isFeatured,
          badge: newProduct.badge || ""
        }]);
      } catch (err) {
        console.error("Supabase insert product error:", err);
      }
    }

    const updated = [newProduct, ...products];
    updateProductList(updated);
    return newProduct;
  };

  // Edit/Update Product (Admin + Supabase Sync)
  const editProduct = async (id, updatedFields) => {
    const updated = products.map((p) => {
      if (String(p.id) === String(id)) {
        return {
          ...p,
          ...updatedFields,
          price: updatedFields.price !== undefined ? parseFloat(updatedFields.price) : p.price,
          discountPrice: updatedFields.discountPrice !== undefined ? parseFloat(updatedFields.discountPrice) : p.discountPrice,
          stock: updatedFields.stock !== undefined ? parseInt(updatedFields.stock, 10) : p.stock
        };
      }
      return p;
    });
    updateProductList(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from("products")
          .update({
            title: updatedFields.name || updatedFields.title,
            price: updatedFields.price,
            stock: updatedFields.stock
          })
          .eq("id", id);
      } catch (err) {
        console.error("Supabase update error:", err);
      }
    }
  };

  // Update Stock directly
  const updateStock = (id, newStock) => {
    editProduct(id, { stock: parseInt(newStock, 10) });
  };

  // Delete Product (Admin + Supabase Sync)
  const deleteProduct = async (id) => {
    const updated = products.filter((p) => String(p.id) !== String(id));
    updateProductList(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("products").delete().eq("id", id);
      } catch (err) {
        console.error("Supabase delete error:", err);
      }
    }
  };

  // Reset to original data
  const resetToDefault = () => {
    const defaultList = resetProductsToDefault();
    setProducts(defaultList);
  };

  // Create new order (from Checkout + Supabase Sync)
  const placeOrder = async (orderData) => {
    const orderNum = `TB-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      id: orderNum,
      date: new Date().toISOString(),
      status: "Pending",
      ...orderData
    };

    saveOrder(newOrder);
    setOrders((prev) => [newOrder, ...prev]);

    if (isSupabaseConfigured) {
      try {
        const { data: insertedOrder, error: oErr } = await supabase
          .from("orders")
          .insert([{
            order_number: orderNum,
            customer_name: `${orderData.customer?.firstName || ''} ${orderData.customer?.lastName || ''}`.trim() || "Valued Customer",
            customer_email: orderData.customer?.email || "",
            customer_phone: orderData.customer?.phone || "",
            shipping_address: orderData.customer?.address || "",
            city: orderData.customer?.city || "",
            postal_code: orderData.customer?.postalCode || "",
            payment_method: orderData.paymentMethod || "cash_on_delivery",
            total_amount: parseFloat(orderData.totalAmount || 0),
            status: "pending"
          }])
          .select()
          .single();

        if (!oErr && insertedOrder && Array.isArray(orderData.items)) {
          const itemsToInsert = orderData.items.map((item) => ({
            order_id: insertedOrder.id,
            product_id: String(item.id),
            product_title: item.name || item.title,
            quantity: item.quantity,
            price: parseFloat(item.price),
            image: item.image
          }));
          await supabase.from("order_items").insert(itemsToInsert);
        }
      } catch (err) {
        console.error("Supabase placeOrder error:", err);
      }
    }

    // Also deduct stock for purchased items
    if (Array.isArray(orderData.items)) {
      setProducts((currentProds) => {
        const updated = currentProds.map((prod) => {
          const purchasedItem = orderData.items.find((item) => String(item.id) === String(prod.id));
          if (purchasedItem) {
            const newStock = Math.max(0, prod.stock - purchasedItem.quantity);
            return { ...prod, stock: newStock };
          }
          return prod;
        });
        saveProducts(updated);
        return updated;
      });
    }

    return newOrder;
  };

  // Update order status (Admin + Supabase Sync)
  const updateStatus = async (orderId, newStatus) => {
    updateOrderStatusApi(orderId, newStatus);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from("orders")
          .update({ status: newStatus.toLowerCase() })
          .eq("order_number", orderId);
      } catch (err) {
        console.error("Supabase update status error:", err);
      }
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        orders,
        isLoaded,
        addProduct,
        editProduct,
        updateStock,
        deleteProduct,
        resetToDefault,
        placeOrder,
        updateStatus,
        isSupabaseConfigured
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
