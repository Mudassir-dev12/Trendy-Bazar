"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import AdminTableSkeleton from "@/components/AdminTableSkeleton";
import { useProducts } from "@/context/ProductContext";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/data";
import { supabase, isSupabaseConfigured, uploadToSupabaseStorage } from "@/lib/supabase";
import {
  UilShield,
  UilBox,
  UilShoppingBag,
  UilDollarSign,
  UilExclamationTriangle,
  UilPlus,
  UilEdit,
  UilTrashAlt,
  UilSearch,
  UilTimes,
  UilRedo,
  UilEye,
  UilClock,
  UilExternalLinkAlt,
  UilStar,
  UilUpload,
  UilCheck,
  UilLock,
  UilEyeSlash,
  UilSignOutAlt
} from "@iconscout/react-unicons";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80";

export default function AdminPage() {
  const {
    products,
    orders,
    isLoading,
    addProduct,
    editProduct,
    updateStock,
    deleteProduct,
    deleteOrder,
    refreshData,
    updateStatus
  } = useProducts();

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = sessionStorage.getItem("tb_admin_auth");
      if (storedAuth === "true") {
        setIsAdminAuthenticated(true);
      }
    }
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsAuthenticating(true);

    const inputEmail = loginEmail.trim();
    const inputPass = loginPassword.trim();

    // 1. Direct Credential Match (User Name: Aliraza@gmail.com, Pass: AliTB@123)
    const isDirectMatch =
      inputEmail.toLowerCase() === "aliraza@gmail.com" && inputPass === "AliTB@123";

    if (isDirectMatch) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("tb_admin_auth", "true");
      }
      setIsAdminAuthenticated(true);
      setIsAuthenticating(false);
      return;
    }

    // 2. Supabase Auth Fallback
    if (isSupabaseConfigured) {
      try {
        const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
          email: inputEmail,
          password: inputPass
        });

        if (!authErr && authData?.session) {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("tb_admin_auth", "true");
          }
          setIsAdminAuthenticated(true);
          setIsAuthenticating(false);
          return;
        }
      } catch (err) {
        console.error("Supabase auth error:", err);
      }
    }

    setLoginError("Invalid Admin Email or Password. Access Denied.");
    setIsAuthenticating(false);
  };

  const handleAdminLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("tb_admin_auth");
    }
    setIsAdminAuthenticated(false);
  };

  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, orders
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // New product form state
  const [formData, setFormData] = useState({
    name: "",
    category: "smart-gadgets",
    subcategory: "mobile-charging",
    price: "",
    originalPrice: "",
    stock: "25",
    rating: "4.8",
    reviewCount: "45",
    badge: "Best Seller",
    image: "",
    images: [],
    description: "",
    isFlashDeal: false,
    isFeatured: false
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.totalAmount || o.total || 0)), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const outOfStockCount = products.filter((p) => (parseInt(p.stock, 10) <= 0 || !p.stock)).length;

  // Pagination State
  const [prodPage, setProdPage] = useState(1);
  const [prodPerPage, setProdPerPage] = useState(10);
  const [orderPage, setOrderPage] = useState(1);
  const [orderPerPage, setOrderPerPage] = useState(10);

  // Filter products by search term
  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(p.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginated slices
  const totalProdPages = Math.ceil(filteredProducts.length / prodPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (prodPage - 1) * prodPerPage,
    prodPage * prodPerPage
  );

  const totalOrderPages = Math.ceil(orders.length / orderPerPage) || 1;
  const paginatedOrders = orders.slice(
    (orderPage - 1) * orderPerPage,
    orderPage * orderPerPage
  );

  // Client-side HTML5 canvas image compressor (shrinks multi-MB files to ~30KB)
  const compressImageFile = (file, maxWidth = 800, quality = 0.75) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
          resolve(compressedBase64);
        };
        img.onerror = () => resolve(event.target.result);
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Multi-File upload handler (Uploads to Supabase Storage Bucket & falls back to compressed Data URL)
  const handleFileUpload = async (files, isEdit = false) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files);

    for (const file of fileList) {
      try {
        // 1. Attempt uploading directly to Supabase Storage Bucket ('products' / 'product-images')
        let imageUrl = await uploadToSupabaseStorage(file);

        // 2. Fallback to lightweight canvas compressed image if bucket is unconfigured
        if (!imageUrl) {
          imageUrl = await compressImageFile(file, 800, 0.75);
        }

        if (isEdit) {
          setEditingProduct((prev) => {
            const currentList = Array.isArray(prev.images) && prev.images.length > 0 ? prev.images : (prev.image ? [prev.image] : []);
            const updated = [...currentList, imageUrl];
            return {
              ...prev,
              images: updated,
              image: prev.image || updated[0]
            };
          });
        } else {
          setFormData((prev) => {
            const currentList = Array.isArray(prev.images) ? prev.images : (prev.image ? [prev.image] : []);
            const updated = [...currentList, imageUrl];
            return {
              ...prev,
              images: updated,
              image: prev.image || updated[0]
            };
          });
        }
      } catch (err) {
        console.error("Image upload error:", err);
      }
    }
  };

  const removeUploadedImage = (indexToRemove, isEdit = false) => {
    if (isEdit) {
      setEditingProduct((prev) => {
        const currentList = Array.isArray(prev.images) ? prev.images : (prev.image ? [prev.image] : []);
        const updated = currentList.filter((_, idx) => idx !== indexToRemove);
        return {
          ...prev,
          images: updated,
          image: updated[0] || ""
        };
      });
    } else {
      setFormData((prev) => {
        const currentList = Array.isArray(prev.images) ? prev.images : (prev.image ? [prev.image] : []);
        const updated = currentList.filter((_, idx) => idx !== indexToRemove);
        return {
          ...prev,
          images: updated,
          image: updated[0] || ""
        };
      });
    }
  };

  const setAsPrimaryImage = (indexToPrimary, isEdit = false) => {
    if (isEdit) {
      setEditingProduct((prev) => {
        const currentList = Array.isArray(prev.images) ? [...prev.images] : (prev.image ? [prev.image] : []);
        if (indexToPrimary >= 0 && indexToPrimary < currentList.length) {
          const selected = currentList.splice(indexToPrimary, 1)[0];
          currentList.unshift(selected);
        }
        return {
          ...prev,
          images: currentList,
          image: currentList[0] || ""
        };
      });
    } else {
      setFormData((prev) => {
        const currentList = Array.isArray(prev.images) ? [...prev.images] : (prev.image ? [prev.image] : []);
        if (indexToPrimary >= 0 && indexToPrimary < currentList.length) {
          const selected = currentList.splice(indexToPrimary, 1)[0];
          currentList.unshift(selected);
        }
        return {
          ...prev,
          images: currentList,
          image: currentList[0] || ""
        };
      });
    }
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    
    // Ensure primary image exists
    const primaryImg = formData.image || (formData.images && formData.images[0]) || FALLBACK_IMAGE;
    const finalProduct = {
      ...formData,
      image: primaryImg,
      images: formData.images && formData.images.length > 0 ? formData.images : [primaryImg]
    };

    addProduct(finalProduct);
    setShowAddModal(false);
    setFormData({
      name: "",
      category: "smart-gadgets",
      subcategory: "mobile-charging",
      price: "",
      originalPrice: "",
      stock: "25",
      rating: "4.8",
      reviewCount: "45",
      badge: "Best Seller",
      image: "",
      images: [],
      description: "",
      isFlashDeal: false,
      isFeatured: false
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    const primaryImg = editingProduct.image || (editingProduct.images && editingProduct.images[0]) || FALLBACK_IMAGE;
    const finalEdit = {
      ...editingProduct,
      image: primaryImg,
      images: editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images : [primaryImg]
    };
    editProduct(editingProduct.id, finalEdit);
    setEditingProduct(null);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const currentCategoryObj = categories.find((c) => c.slug === formData.category);
  const editCategoryObj = categories.find((c) => c.slug === editingProduct?.category);

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white text-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-100 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[#F58220] rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg">
              <UilShield size={36} />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900 mt-3">
              ADMIN CONTROL PORTAL
            </h1>
            <p className="text-xs text-gray-500">
              Restricted Access • Authorized Admin Authentication Required
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-2xl text-xs font-semibold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1.5">Admin Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-[#F58220] text-gray-900 rounded-xl px-4 py-3 font-semibold outline-hidden transition-all focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1.5">Admin Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#F58220] text-gray-900 rounded-xl pl-4 pr-10 py-3 font-semibold outline-hidden transition-all focus:ring-2 focus:ring-orange-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <UilEyeSlash size={16} /> : <UilEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-[#F58220] hover:bg-[#E06D0F] text-white py-3.5 rounded-xl font-black text-sm shadow-lg transition-all cursor-pointer mt-2 flex items-center justify-center gap-2"
            >
              <UilLock size={16} /> {isAuthenticating ? "Authenticating..." : "Login to Admin Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin Management Panel" }]} />

      {/* Admin Panel Header */}
      <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-orange-950 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#F58220] rounded-2xl p-2 flex items-center justify-center text-white shadow-md shrink-0">
            <UilShield size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
              TRENDY BAZAAR ADMIN PANEL
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Manage inventory, adjust product stock, upload file images & manage customer orders
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRefresh}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <UilRedo size={14} className={isRefreshing ? "animate-spin" : ""} /> Refresh Data
          </button>
          <button
            onClick={handleAdminLogout}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            title="Lock & Logout Admin Panel"
          >
            <UilSignOutAlt size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-gray-200 gap-4 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`pb-3 px-2 text-sm font-extrabold flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${
            activeTab === "dashboard"
              ? "border-[#F58220] text-[#F58220]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <UilBox size={16} /> Dashboard & Inventory ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 px-2 text-sm font-extrabold flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${
            activeTab === "orders"
              ? "border-[#F58220] text-[#F58220]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <UilClock size={16} /> Customer Orders ({orders.length})
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* UNIFIED TAB 1: DASHBOARD & INVENTORY */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === "dashboard" && (
        isLoading && products.length === 0 ? (
          <AdminTableSkeleton rows={prodPerPage} type="products" />
        ) : (
          <div className="space-y-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
              <div className="p-3.5 bg-green-50 text-green-600 rounded-2xl">
                <UilDollarSign size={24} />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase">Total Revenue</span>
                <h3 className="text-2xl font-black text-gray-900">{formatPrice(totalRevenue)}</h3>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
              <div className="p-3.5 bg-orange-50 text-[#F58220] rounded-2xl">
                <UilShoppingBag size={24} />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase">Total Orders</span>
                <h3 className="text-2xl font-black text-gray-900">{totalOrders}</h3>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
              <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl">
                <UilBox size={24} />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase">Total Products</span>
                <h3 className="text-2xl font-black text-gray-900">{totalProducts}</h3>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
              <div className="p-3.5 bg-red-50 text-red-600 rounded-2xl">
                <UilExclamationTriangle size={24} />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase">Out of Stock Items</span>
                <h3 className="text-2xl font-black text-gray-900">{outOfStockCount}</h3>
              </div>
            </div>
          </div>

          {/* Search and Action Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">Product Inventory Management</h3>
              <p className="text-xs text-gray-500">Live multi-device real-time synchronization</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <UilSearch size={16} className="text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by name, ID or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:border-[#F58220] outline-hidden"
                />
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#F58220] hover:bg-[#E06D0F] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <UilPlus size={16} /> Add Product
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Original Price</th>
                    <th className="p-3.5">Discount</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Flags</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedProducts.map((product) => {
                    const price = product.price || 0;
                    const origPrice = product.originalPrice && product.originalPrice > price ? product.originalPrice : null;
                    const discountPct = origPrice ? Math.round(((origPrice - price) / origPrice) * 100) : (product.discount || 0);

                    return (
                    <tr key={product.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || FALLBACK_IMAGE}
                            alt={product.name}
                            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                            className="w-10 h-10 object-cover rounded-lg border shrink-0"
                            suppressHydrationWarning
                          />
                          <div>
                            <span className="font-bold text-gray-900 block truncate max-w-xs">{product.name}</span>
                            <span className="text-[10px] text-gray-400 font-mono">ID: {product.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5 capitalize font-semibold text-gray-700">
                        {product.subcategory?.replace(/-/g, " ") || product.category?.replace(/-/g, " ")}
                      </td>

                      <td className="p-3.5 font-extrabold text-[#F58220]">
                        {formatPrice(product.price)}
                      </td>

                      <td className="p-3.5 text-gray-400 font-medium">
                        {origPrice ? <span className="line-through">{formatPrice(origPrice)}</span> : <span className="text-gray-300">-</span>}
                      </td>

                      <td className="p-3.5 font-bold">
                        {discountPct > 0 ? (
                          <span className="bg-green-100 text-green-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-sm">
                            {discountPct}% OFF
                          </span>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={product.stock}
                            onChange={(e) => updateStock(product.id, e.target.value)}
                            className="w-16 bg-gray-50 border border-gray-200 rounded-md text-xs font-extrabold p-1 text-center"
                          />
                          {parseInt(product.stock, 10) <= 0 ? (
                            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded-sm">Out of Stock</span>
                          ) : product.stock <= 10 ? (
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-sm">Low</span>
                          ) : null}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-center gap-1">
                          {product.isFlashDeal && (
                            <span className="bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase">Flash</span>
                          )}
                          {product.isFeatured && (
                            <span className="bg-orange-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase">Featured</span>
                          )}
                        </div>
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingProduct({ ...product })}
                            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="View Product Details"
                          >
                            <UilEye size={16} />
                          </button>
                          <button
                            onClick={() => setEditingProduct({ ...product })}
                            className="p-1.5 text-gray-600 hover:text-[#F58220] hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit Product Details"
                          >
                            <UilEdit size={16} />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <UilTrashAlt size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Products Table Pagination Bar */}
            <div className="p-3.5 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                <span>Items per page:</span>
                <select
                  value={prodPerPage}
                  onChange={(e) => {
                    setProdPerPage(Number(e.target.value));
                    setProdPage(1);
                  }}
                  className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-gray-700 outline-hidden"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <Pagination
                currentPage={prodPage}
                totalPages={totalProdPages}
                totalItems={filteredProducts.length}
                itemsPerPage={prodPerPage}
                onPageChange={setProdPage}
                alwaysShow={true}
                className="py-0 px-0"
              />
            </div>
          </div>
        </div>
        )
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 2: CUSTOMER ORDERS */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === "orders" && (
        isLoading && orders.length === 0 ? (
          <AdminTableSkeleton rows={orderPerPage} type="orders" />
        ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-extrabold text-gray-900 text-sm">Customer Orders Log</h3>
            <span className="text-xs text-gray-500">Updated in real-time</span>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Items</th>
                  <th className="p-3.5">Total Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-gray-900">{order.id}</td>
                    <td className="p-3.5 text-gray-500">{order.date ? new Date(order.date).toLocaleDateString() : 'Recent'}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-gray-800 block">{order.customerName || order.customer?.name || "Customer"}</span>
                      <span className="text-[10px] text-gray-400">{order.customerEmail || order.customer?.email}</span>
                    </td>
                    <td className="p-3.5 font-medium text-gray-600">
                      {order.items?.length || 0} items
                    </td>
                    <td className="p-3.5 font-extrabold text-gray-900">
                      {formatPrice(parseFloat(order.totalAmount || order.total || 0))}
                    </td>
                    <td className="p-3.5">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1 border outline-hidden ${
                          order.status === "Delivered"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : order.status === "Shipped"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : order.status === "Processing"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-orange-50 text-orange-700 border-orange-200"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setViewingOrder(order)}
                          className="p-1.5 text-[#F58220] hover:bg-orange-50 rounded-lg transition-colors font-bold flex items-center gap-1 cursor-pointer"
                          title="View Order Details"
                        >
                          <UilEye size={16} /> View
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Order"
                        >
                          <UilTrashAlt size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Orders Table Pagination Bar */}
          <div className="p-3.5 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
              <span>Orders per page:</span>
              <select
                value={orderPerPage}
                onChange={(e) => {
                  setOrderPerPage(Number(e.target.value));
                  setOrderPage(1);
                }}
                className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-gray-700 outline-hidden"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <Pagination
              currentPage={orderPage}
              totalPages={totalOrderPages}
              totalItems={orders.length}
              itemsPerPage={orderPerPage}
              onPageChange={setOrderPage}
              alwaysShow={true}
              className="py-0 px-0"
            />
          </div>
        </div>
        )
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 1: ADD NEW PRODUCT WITH MULTI-FILE IMAGE UPLOAD */}
      {/* ------------------------------------------------------------------ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto p-6 shadow-2xl relative custom-scrollbar space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900">Add New Product to Bazaar</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
                <UilTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UltraFast Wireless Speaker"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = categories.find((c) => c.slug === e.target.value);
                      setFormData({
                        ...formData,
                        category: e.target.value,
                        subcategory: cat?.subcategories[0]?.slug || ""
                      });
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold capitalize"
                  >
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Subcategory</label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold capitalize"
                  >
                    {currentCategoryObj?.subcategories.map((sub) => (
                      <option key={sub.slug} value={sub.slug}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 2499"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Original Price (Rs.)</label>
                  <input
                    type="number"
                    placeholder="e.g. 2999"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Badge Label</label>
                <input
                  type="text"
                  placeholder="e.g. Best Seller"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold"
                />
              </div>

              {/* Multi-File Upload Zone */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Upload Product Photos (Select Multiple Image Files)
                </label>
                <label htmlFor="file-upload-add" className="border-2 border-dashed border-gray-300 hover:border-[#F58220] rounded-2xl p-4 text-center cursor-pointer block transition-colors bg-gray-50 hover:bg-orange-50/50">
                  <UilUpload size={24} className="mx-auto text-gray-400 mb-1" />
                  <span className="font-extrabold text-xs text-gray-800 block">Click to Browse & Select Image Files</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Supports PNG, JPG, WebP (Upload multiple files at once)</span>
                  <input
                    id="file-upload-add"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files, false)}
                    className="hidden"
                  />
                </label>

                {/* Uploaded Images Thumbnails */}
                {formData.images && formData.images.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <span className="text-[11px] font-bold text-gray-500">Uploaded Photos ({formData.images.length}) - Click thumbnail to set cover:</span>
                    <div className="grid grid-cols-4 gap-2">
                      {formData.images.map((imgSrc, index) => (
                        <div
                          key={index}
                          onClick={() => setAsPrimaryImage(index, false)}
                          className={`relative border-2 rounded-xl overflow-hidden cursor-pointer group h-16 ${
                            index === 0 ? "border-[#F58220] ring-2 ring-orange-200" : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          <img src={imgSrc} alt="uploaded preview" className="w-full h-full object-cover" />
                          {index === 0 && (
                            <span className="absolute top-0.5 left-0.5 bg-[#F58220] text-white text-[8px] font-black px-1 rounded-xs">
                              Cover
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeUploadedImage(index, false);
                            }}
                            className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full p-0.5 opacity-80 hover:opacity-100"
                            title="Remove image"
                          >
                            <UilTimes size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  placeholder="Detailed product features..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFlashDeal}
                    onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                    className="accent-[#F58220]"
                  />
                  <span>Mark as Flash Deal</span>
                </label>
                <label className="flex items-center gap-2 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-[#F58220]"
                  />
                  <span>Mark as Featured Top Pick</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F58220] hover:bg-[#E06D0F] text-white py-3 rounded-xl font-black text-sm shadow-md mt-4 cursor-pointer transition-all"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 2: EDIT FULL PRODUCT DETAILS WITH MULTI-FILE UPLOAD */}
      {/* ------------------------------------------------------------------ */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 shadow-2xl relative custom-scrollbar space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900">Edit Product #{editingProduct.id}</h2>
              <button onClick={() => setEditingProduct(null)} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
                <UilTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Product Title / Name</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || editingProduct.title || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value, title: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => {
                      const cat = categories.find((c) => c.slug === e.target.value);
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value,
                        subcategory: cat?.subcategories[0]?.slug || ""
                      });
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold capitalize"
                  >
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Subcategory</label>
                  <select
                    value={editingProduct.subcategory || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, subcategory: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold capitalize"
                  >
                    {editCategoryObj?.subcategories.map((sub) => (
                      <option key={sub.slug} value={sub.slug}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={editingProduct.price || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Original Price (Rs.)</label>
                  <input
                    type="number"
                    step="1"
                    placeholder="Optional (e.g. 2999)"
                    value={editingProduct.originalPrice || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={editingProduct.stock || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Rating (1 - 5)</label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    min="1"
                    value={editingProduct.rating || 4.8}
                    onChange={(e) => setEditingProduct({ ...editingProduct, rating: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Badge Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Best Seller"
                    value={editingProduct.badge || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold"
                  />
                </div>
              </div>

              {/* Multi-File Image Upload Zone in Edit Modal */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Upload / Replace Product Image Files
                </label>
                <label htmlFor="file-upload-edit" className="border-2 border-dashed border-gray-300 hover:border-[#F58220] rounded-2xl p-4 text-center cursor-pointer block transition-colors bg-gray-50 hover:bg-orange-50/50">
                  <UilUpload size={24} className="mx-auto text-gray-400 mb-1" />
                  <span className="font-extrabold text-xs text-gray-800 block">Click to Upload More Image Files</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Select image files from your computer</span>
                  <input
                    id="file-upload-edit"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files, true)}
                    className="hidden"
                  />
                </label>

                {/* Edit Uploaded Images Thumbnails */}
                {((editingProduct.images && editingProduct.images.length > 0) || editingProduct.image) && (
                  <div className="mt-3 space-y-1">
                    <span className="text-[11px] font-bold text-gray-500">Product Photos Gallery (Click thumbnail to set cover):</span>
                    <div className="grid grid-cols-4 gap-2">
                      {(editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images : [editingProduct.image]).map((imgSrc, index) => (
                        <div
                          key={index}
                          onClick={() => setAsPrimaryImage(index, true)}
                          className={`relative border-2 rounded-xl overflow-hidden cursor-pointer group h-16 ${
                            index === 0 ? "border-[#F58220] ring-2 ring-orange-200" : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          <img src={imgSrc} alt="uploaded preview" className="w-full h-full object-cover" />
                          {index === 0 && (
                            <span className="absolute top-0.5 left-0.5 bg-[#F58220] text-white text-[8px] font-black px-1 rounded-xs">
                              Cover
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeUploadedImage(index, true);
                            }}
                            className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full p-0.5 opacity-80 hover:opacity-100"
                            title="Remove image"
                          >
                            <UilTimes size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Description</label>
                <textarea
                  rows="3"
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProduct.isFlashDeal)}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isFlashDeal: e.target.checked })}
                    className="accent-[#F58220]"
                  />
                  <span>Flash Deal</span>
                </label>
                <label className="flex items-center gap-2 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProduct.isFeatured)}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                    className="accent-[#F58220]"
                  />
                  <span>Featured Product</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F58220] hover:bg-[#E06D0F] text-white py-3 rounded-xl font-black text-sm shadow-md mt-4 cursor-pointer transition-all"
              >
                Save Full Product Details
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 3: VIEW PRODUCT PREVIEW */}
      {/* ------------------------------------------------------------------ */}
      {viewingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900">Product Preview #{viewingProduct.id}</h2>
              <button onClick={() => setViewingProduct(null)} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
                <UilTimes size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <img
                  src={viewingProduct.image || FALLBACK_IMAGE}
                  alt={viewingProduct.name}
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  className="w-20 h-20 object-cover rounded-xl border shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-gray-900">{viewingProduct.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-100 text-[#F58220] font-bold px-2 py-0.5 rounded-md text-[10px] capitalize">
                      {viewingProduct.subcategory || viewingProduct.category}
                    </span>
                    {viewingProduct.badge && (
                      <span className="bg-gray-900 text-white font-extrabold px-2 py-0.5 rounded-md text-[10px]">
                        {viewingProduct.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <UilStar size={14} className="fill-amber-400 text-amber-400" />
                    <span>{viewingProduct.rating || 4.8} ({viewingProduct.reviewCount || 12} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Product Multi-Image Gallery Preview */}
              {Array.isArray(viewingProduct.images) && viewingProduct.images.length > 0 && (
                <div className="space-y-1">
                  <span className="font-bold text-gray-700 block">Product Image Gallery ({viewingProduct.images.length} photos)</span>
                  <div className="grid grid-cols-4 gap-2">
                    {viewingProduct.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img || FALLBACK_IMAGE}
                        alt="Product gallery photo"
                        className="w-full h-16 object-cover rounded-xl border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-xl">
                <div>
                  <span className="text-gray-400 font-bold block">Price</span>
                  <span className="font-black text-sm text-[#F58220]">{formatPrice(viewingProduct.price)}</span>
                  {viewingProduct.originalPrice && viewingProduct.originalPrice > viewingProduct.price && (
                    <span className="text-xs text-gray-400 line-through block mt-0.5">
                      {formatPrice(viewingProduct.originalPrice)}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-gray-400 font-bold block">Stock Available</span>
                  <span className={`font-black text-sm ${viewingProduct.stock <= 10 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {viewingProduct.stock} units
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-gray-700 block mb-1">Description</span>
                <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {viewingProduct.description || "No description provided for this catalog item."}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Link
                  href={`/product/${viewingProduct.id}`}
                  target="_blank"
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-xl font-extrabold flex items-center justify-center gap-1.5 transition-all text-xs"
                >
                  <UilExternalLinkAlt size={14} /> View Live on Store Page
                </Link>
                <button
                  onClick={() => {
                    setEditingProduct({ ...viewingProduct });
                    setViewingProduct(null);
                  }}
                  className="bg-[#F58220] hover:bg-[#E06D0F] text-white px-4 py-2.5 rounded-xl font-extrabold flex items-center gap-1 transition-all text-xs cursor-pointer"
                >
                  <UilEdit size={14} /> Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 4: VIEW ORDER DETAILS */}
      {/* ------------------------------------------------------------------ */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900">Order Details #{viewingOrder.id}</h2>
              <button onClick={() => setViewingOrder(null)} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
                <UilTimes size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gray-50 p-3.5 rounded-2xl space-y-1 border border-gray-100">
                <p><strong>Customer:</strong> {viewingOrder.customerName || viewingOrder.customer?.name}</p>
                <p><strong>Email:</strong> {viewingOrder.customerEmail || viewingOrder.customer?.email}</p>
                <p><strong>Phone:</strong> {viewingOrder.customerPhone || viewingOrder.customer?.phone}</p>
                <p><strong>Address:</strong> {viewingOrder.shippingAddress || viewingOrder.customer?.address}, {viewingOrder.city || viewingOrder.customer?.city}</p>
                <p><strong>Payment Method:</strong> <span className="uppercase font-bold text-emerald-600">{viewingOrder.paymentMethod || 'COD'}</span></p>
              </div>

              <div className="border-t pt-2">
                <p className="font-bold text-gray-700 mb-2">Purchased Items:</p>
                <div className="space-y-1.5 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                  {viewingOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="font-semibold text-gray-800">{item.product_title || item.name || item.title} (x{item.quantity})</span>
                      <span className="font-bold text-gray-900">{formatPrice(parseFloat(item.price) * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-2 flex justify-between font-extrabold text-sm">
                <span>Total Amount</span>
                <span className="text-[#F58220]">{formatPrice(parseFloat(viewingOrder.totalAmount || viewingOrder.total || 0))}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
