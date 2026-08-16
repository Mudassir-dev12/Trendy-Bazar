"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getProducts,
  saveProducts,
  getOrders,
  saveOrder,
  saveOrdersList,
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
      if (isSupabaseConfigured) {
        try {
          // Fetch real products from Supabase
          const { data: sbProducts, error: prodErr } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

          if (!prodErr && Array.isArray(sbProducts)) {
            const dynamicProducts = sbProducts.map((p) => {
              const imgList = p.image ? p.image.split("|||") : [];
              const primaryImg = imgList[0] || p.image || "";
              const allImgs = imgList.length > 0 ? imgList : [primaryImg];

              return {
                id: p.id,
                name: p.title,
                title: p.title,
                slug: p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                category: p.category,
                subcategory: p.subcategory || "",
                price: parseFloat(p.price) || 0,
                originalPrice: p.original_price ? parseFloat(p.original_price) : parseFloat(p.price) * 1.2,
                discountPrice: parseFloat(p.price) || 0,
                discount: p.discount || 0,
                rating: parseFloat(p.rating) || 4.5,
                reviewCount: p.reviews_count || 12,
                image: primaryImg,
                images: allImgs,
                description: p.description || "",
                stock: p.stock || 50,
                isFeatured: p.is_featured || false,
                badge: p.badge || ""
              };
            });
            setProducts(dynamicProducts);
          }

          // Fetch real orders from Supabase
          const { data: sbOrders, error: orderErr } = await supabase
            .from("orders")
            .select("*, order_items(*)")
            .order("created_at", { ascending: false });

          if (!orderErr && Array.isArray(sbOrders)) {
            const dynamicOrders = sbOrders.map((o) => ({
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
              customer: {
                name: o.customer_name,
                email: o.customer_email,
                phone: o.customer_phone,
                address: o.shipping_address,
                city: o.city
              },
              items: o.order_items || []
            }));
            setOrders(dynamicOrders);
          }
        } catch (err) {
          console.warn("Supabase fetch failed, using local store fallback:", err);
        }
      } else {
        setProducts(getProducts());
        setOrders(getOrders());
      }

      setIsLoaded(true);
    }

    loadData();

    // Supabase Realtime channel subscription for multi-device live sync
    let prodChannel;
    let orderChannel;
    if (isSupabaseConfigured) {
      prodChannel = supabase
        .channel("realtime-products")
        .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => {
          loadData();
        })
        .subscribe();

      orderChannel = supabase
        .channel("realtime-orders")
        .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
          loadData();
        })
        .subscribe();
    }

    return () => {
      if (prodChannel) supabase.removeChannel(prodChannel);
      if (orderChannel) supabase.removeChannel(orderChannel);
    };
  }, []);

  // Sync products changes
  const updateProductList = (newProducts) => {
    setProducts(newProducts);
    saveProducts(newProducts);
  };

  // Add Product (Admin + Supabase Sync)
  const addProduct = async (productData) => {
    const slug = productData.slug || (productData.name || productData.title).toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const priceVal = parseFloat(productData.price) || 0;
    const discountPriceVal = productData.discountPrice ? parseFloat(productData.discountPrice) : priceVal;
    const rawImages = Array.isArray(productData.images) && productData.images.length > 0
      ? productData.images
      : (productData.image ? [productData.image] : []);
    const primaryImg = rawImages[0] || productData.image || "";
    const imagePayload = rawImages.length > 0 ? rawImages.join("|||") : primaryImg;
    
    let newProduct = {
      ...productData,
      id: productData.id || `tb-custom-${Date.now()}`,
      name: productData.name || productData.title,
      title: productData.name || productData.title,
      slug,
      price: priceVal,
      originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : priceVal * 1.2,
      discountPrice: discountPriceVal,
      stock: parseInt(productData.stock, 10) || 0,
      rating: parseFloat(productData.rating) || 4.8,
      reviewCount: parseInt(productData.reviewCount, 10) || 12,
      image: primaryImg,
      images: rawImages.length > 0 ? rawImages : [primaryImg],
      isFlashDeal: Boolean(productData.isFlashDeal),
      isFeatured: Boolean(productData.isFeatured),
      badge: productData.badge || "",
      tags: Array.isArray(productData.tags) ? productData.tags : (productData.tags ? productData.tags.split(",").map(t => t.trim()) : ["New"])
    };

    if (isSupabaseConfigured) {
      try {
        const uniqueSlug = `${slug}-${Date.now().toString().slice(-4)}`;
        const { data: inserted, error: insErr } = await supabase
          .from("products")
          .insert([{
            title: newProduct.name,
            slug: uniqueSlug,
            category: newProduct.category,
            subcategory: newProduct.subcategory || "",
            price: newProduct.price,
            original_price: newProduct.originalPrice,
            discount: newProduct.discount || 0,
            rating: newProduct.rating,
            reviews_count: newProduct.reviewCount,
            image: imagePayload,
            description: newProduct.description || "",
            stock: newProduct.stock,
            is_featured: newProduct.isFeatured,
            badge: newProduct.badge || ""
          }])
          .select()
          .single();

        if (insErr) {
          console.error("Supabase insert error details:", insErr);
        } else if (inserted) {
          newProduct.id = inserted.id;
          newProduct.slug = inserted.slug;
        }
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
    const rawImages = Array.isArray(updatedFields.images) && updatedFields.images.length > 0
      ? updatedFields.images
      : (updatedFields.image ? [updatedFields.image] : []);
    const primaryImg = rawImages[0] || updatedFields.image;
    const imagePayload = rawImages.length > 0 ? rawImages.join("|||") : updatedFields.image;

    const updated = products.map((p) => {
      if (String(p.id) === String(id) || (p.slug && p.slug === updatedFields.slug)) {
        return {
          ...p,
          ...updatedFields,
          name: updatedFields.name || updatedFields.title || p.name,
          title: updatedFields.name || updatedFields.title || p.title,
          image: primaryImg || p.image,
          images: rawImages.length > 0 ? rawImages : (p.images || [p.image]),
          price: updatedFields.price !== undefined ? parseFloat(updatedFields.price) : p.price,
          originalPrice: updatedFields.originalPrice !== undefined ? parseFloat(updatedFields.originalPrice) : p.originalPrice,
          discountPrice: updatedFields.discountPrice !== undefined ? parseFloat(updatedFields.discountPrice) : p.discountPrice,
          stock: updatedFields.stock !== undefined ? parseInt(updatedFields.stock, 10) : p.stock,
          rating: updatedFields.rating !== undefined ? parseFloat(updatedFields.rating) : p.rating,
          reviewCount: updatedFields.reviewCount !== undefined ? parseInt(updatedFields.reviewCount, 10) : p.reviewCount,
          badge: updatedFields.badge !== undefined ? updatedFields.badge : p.badge,
          isFeatured: updatedFields.isFeatured !== undefined ? Boolean(updatedFields.isFeatured) : p.isFeatured,
          isFlashDeal: updatedFields.isFlashDeal !== undefined ? Boolean(updatedFields.isFlashDeal) : p.isFlashDeal
        };
      }
      return p;
    });
    updateProductList(updated);

    if (isSupabaseConfigured) {
      try {
        const updatePayload = {
          title: updatedFields.name || updatedFields.title,
          category: updatedFields.category,
          subcategory: updatedFields.subcategory,
          price: updatedFields.price !== undefined ? parseFloat(updatedFields.price) : undefined,
          original_price: updatedFields.originalPrice !== undefined ? parseFloat(updatedFields.originalPrice) : undefined,
          discount: updatedFields.discount !== undefined ? parseInt(updatedFields.discount, 10) : undefined,
          rating: updatedFields.rating !== undefined ? parseFloat(updatedFields.rating) : undefined,
          reviews_count: updatedFields.reviewCount !== undefined ? parseInt(updatedFields.reviewCount, 10) : undefined,
          stock: updatedFields.stock !== undefined ? parseInt(updatedFields.stock, 10) : undefined,
          image: imagePayload,
          description: updatedFields.description,
          is_featured: updatedFields.isFeatured !== undefined ? Boolean(updatedFields.isFeatured) : undefined,
          badge: updatedFields.badge
        };

        // Clean undefined properties
        Object.keys(updatePayload).forEach(key => updatePayload[key] === undefined && delete updatePayload[key]);

        // Try updating by UUID ID or by slug
        const isUuid = String(id).includes("-") && String(id).length >= 32;
        if (isUuid) {
          await supabase.from("products").update(updatePayload).eq("id", id);
        } else if (updatedFields.slug) {
          await supabase.from("products").update(updatePayload).eq("slug", updatedFields.slug);
        } else {
          await supabase.from("products").update(updatePayload).eq("title", updatedFields.name || updatedFields.title);
        }
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
    const targetProduct = products.find((p) => String(p.id) === String(id));
    const updated = products.filter((p) => String(p.id) !== String(id));
    updateProductList(updated);

    if (isSupabaseConfigured) {
      try {
        const isUuid = String(id).includes("-") && String(id).length >= 32;
        if (isUuid) {
          await supabase.from("products").delete().eq("id", id);
        } else if (targetProduct?.slug) {
          await supabase.from("products").delete().eq("slug", targetProduct.slug);
        } else if (targetProduct?.name) {
          await supabase.from("products").delete().eq("title", targetProduct.name);
        }
      } catch (err) {
        console.error("Supabase delete error:", err);
      }
    }
  };

  // Delete Order (Admin + Supabase Sync)
  const deleteOrder = async (orderId) => {
    const orderIdStr = String(orderId).trim();
    const updated = orders.filter((o) => String(o.id) !== orderIdStr && String(o.order_number) !== orderIdStr);
    setOrders(updated);
    saveOrdersList(updated);

    if (isSupabaseConfigured) {
      try {
        const isNumeric = /^\d+$/.test(orderIdStr);

        let query = supabase.from("orders").select("id, order_number");
        if (isNumeric) {
          query = query.or(`id.eq.${orderIdStr},order_number.eq.${orderIdStr}`);
        } else {
          query = query.eq("order_number", orderIdStr);
        }

        const { data: matchedOrders, error: findErr } = await query;
        if (findErr) console.error("Supabase find order error:", findErr);

        if (matchedOrders && matchedOrders.length > 0) {
          for (const ord of matchedOrders) {
            await supabase.from("order_items").delete().eq("order_id", ord.id);
            await supabase.from("orders").delete().eq("id", ord.id);
          }
        } else {
          await supabase.from("orders").delete().eq("order_number", orderIdStr);
        }

        const { data: freshOrders } = await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
        if (freshOrders) {
          const remappedOrders = freshOrders.map((o) => ({
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
            customer: {
              name: o.customer_name,
              email: o.customer_email,
              phone: o.customer_phone,
              address: o.shipping_address,
              city: o.city
            },
            items: o.order_items || []
          }));
          setOrders(remappedOrders);
          saveOrdersList(remappedOrders);
        }
      } catch (err) {
        console.error("Supabase delete order error:", err);
      }
    }
  };

  // Refresh data from Supabase/local
  const refreshData = async () => {
    if (!isSupabaseConfigured) {
      setProducts(getProducts());
      setOrders(getOrders());
      return;
    }
    const { data: sbProducts } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (Array.isArray(sbProducts)) {
      const remapped = sbProducts.map((p) => {
        const imgList = p.image ? p.image.split("|||") : [];
        const primaryImg = imgList[0] || p.image || "";
        const allImgs = imgList.length > 0 ? imgList : [primaryImg];

        return {
          id: p.id,
          name: p.title,
          title: p.title,
          slug: p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          category: p.category,
          subcategory: p.subcategory || "",
          price: parseFloat(p.price) || 0,
          originalPrice: p.original_price ? parseFloat(p.original_price) : parseFloat(p.price) * 1.2,
          discountPrice: parseFloat(p.price) || 0,
          discount: p.discount || 0,
          rating: parseFloat(p.rating) || 4.8,
          reviewCount: p.reviews_count || 12,
          image: primaryImg,
          images: allImgs,
          description: p.description || "",
          stock: p.stock || 50,
          isFeatured: p.is_featured || false,
          badge: p.badge || ""
        };
      });
      setProducts(remapped);
    }
    const { data: sbOrders } = await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
    if (Array.isArray(sbOrders)) {
      const remappedOrders = sbOrders.map((o) => ({
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
        customer: {
          name: o.customer_name,
          email: o.customer_email,
          phone: o.customer_phone,
          address: o.shipping_address,
          city: o.city
        },
        items: o.order_items || []
      }));
      setOrders(remappedOrders);
      saveOrdersList(remappedOrders);
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
    const totalVal = parseFloat(orderData.totalAmount || orderData.total || orderData.total_amount || 0);
    const customerName = orderData.customer?.name || `${orderData.customer?.firstName || ''} ${orderData.customer?.lastName || ''}`.trim() || "Valued Customer";

    const newOrder = {
      id: orderNum,
      date: new Date().toISOString(),
      status: "Pending",
      customerName,
      customerEmail: orderData.customer?.email || "",
      customerPhone: orderData.customer?.phone || "",
      shippingAddress: orderData.customer?.address || "",
      city: orderData.customer?.city || "",
      totalAmount: totalVal,
      total: totalVal,
      ...orderData,
      totalAmount: totalVal,
      total: totalVal
    };

    saveOrder(newOrder);
    setOrders((prev) => [newOrder, ...prev]);

    if (isSupabaseConfigured) {
      try {
        const { data: insertedOrder, error: oErr } = await supabase
          .from("orders")
          .insert([{
            order_number: orderNum,
            customer_name: customerName,
            customer_email: orderData.customer?.email || "",
            customer_phone: orderData.customer?.phone || "",
            shipping_address: orderData.customer?.address || "",
            city: orderData.customer?.city || "",
            postal_code: orderData.customer?.zip || orderData.customer?.postalCode || "",
            payment_method: orderData.paymentMethod || "cash_on_delivery",
            total_amount: totalVal,
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
    const updatedOrders = orders.map((o) => (String(o.id) === String(orderId) || String(o.order_number) === String(orderId) ? { ...o, status: newStatus } : o));
    setOrders(updatedOrders);
    saveOrdersList(updatedOrders);

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from("orders")
          .update({ status: newStatus })
          .or(`order_number.eq.${orderId},id.eq.${orderId}`);
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
        deleteOrder,
        refreshData,
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
