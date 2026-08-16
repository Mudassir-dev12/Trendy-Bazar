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

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize on client side
  useEffect(() => {
    const loadedProducts = getProducts();
    const loadedOrders = getOrders();
    setProducts(loadedProducts);
    setOrders(loadedOrders);
    setIsLoaded(true);
  }, []);

  // Sync products changes to localStorage
  const updateProductList = (newProducts) => {
    setProducts(newProducts);
    saveProducts(newProducts);
  };

  // Add Product (Admin)
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: productData.id || `tb-custom-${Date.now()}`,
      slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      price: parseFloat(productData.price) || 0,
      discountPrice: productData.discountPrice ? parseFloat(productData.discountPrice) : parseFloat(productData.price) || 0,
      stock: parseInt(productData.stock, 10) || 0,
      rating: parseFloat(productData.rating) || 5.0,
      reviewCount: parseInt(productData.reviewCount, 10) || 1,
      isFlashDeal: Boolean(productData.isFlashDeal),
      isFeatured: Boolean(productData.isFeatured),
      tags: Array.isArray(productData.tags) ? productData.tags : (productData.tags ? productData.tags.split(",").map(t => t.trim()) : ["New"])
    };
    const updated = [newProduct, ...products];
    updateProductList(updated);
    return newProduct;
  };

  // Edit/Update Product (Admin)
  const editProduct = (id, updatedFields) => {
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
  };

  // Update Stock directly
  const updateStock = (id, newStock) => {
    editProduct(id, { stock: parseInt(newStock, 10) });
  };

  // Delete Product (Admin)
  const deleteProduct = (id) => {
    const updated = products.filter((p) => String(p.id) !== String(id));
    updateProductList(updated);
  };

  // Reset to original data
  const resetToDefault = () => {
    const defaultList = resetProductsToDefault();
    setProducts(defaultList);
  };

  // Create new order (from Checkout)
  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString(),
      status: "Pending",
      ...orderData
    };

    saveOrder(newOrder);
    setOrders((prev) => [newOrder, ...prev]);

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

  // Update order status (Admin)
  const updateStatus = (orderId, newStatus) => {
    updateOrderStatusApi(orderId, newStatus);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
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
        updateStatus
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
