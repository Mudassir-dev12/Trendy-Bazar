"use client";

import React, { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useProducts } from "@/context/ProductContext";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/data";
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
  UilClock
} from "@iconscout/react-unicons";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80";

export default function AdminPage() {
  const {
    products,
    orders,
    addProduct,
    editProduct,
    updateStock,
    deleteProduct,
    resetToDefault,
    updateStatus
  } = useProducts();

  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, products, orders
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);

  // New product form state
  const [formData, setFormData] = useState({
    name: "",
    category: "smart-gadgets",
    subcategory: "mobile-charging",
    price: "",
    discountPrice: "",
    stock: "25",
    rating: "4.8",
    reviewCount: "45",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800",
    description: "",
    isFlashDeal: false,
    isFeatured: false
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => (p.stock || 0) <= 10).length;

  // Filter products by search term
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    addProduct(formData);
    setShowAddModal(false);
    setFormData({
      name: "",
      category: "smart-gadgets",
      subcategory: "mobile-charging",
      price: "",
      discountPrice: "",
      stock: "25",
      rating: "4.8",
      reviewCount: "45",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800",
      description: "",
      isFlashDeal: false,
      isFeatured: false
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    editProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
  };

  const currentCategoryObj = categories.find((c) => c.slug === formData.category);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin Management Panel" }]} />

      {/* Admin Panel Header */}
      <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-orange-950 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#F58220] rounded-2xl p-2 flex items-center justify-center text-white shadow-md">
            <UilShield size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
              TRENDY BAZAAR ADMIN PANEL
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Manage inventory, adjust product stock, add new catalog items & update customer orders
            </p>
          </div>
        </div>

        <button
          onClick={resetToDefault}
          className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
        >
          <UilRedo size={14} /> Reset Default Seed Data
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-gray-200 gap-4 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`pb-3 px-2 text-sm font-extrabold flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === "dashboard"
              ? "border-[#F58220] text-[#F58220]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <UilBox size={16} /> Overview Dashboard
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-3 px-2 text-sm font-extrabold flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === "products"
              ? "border-[#F58220] text-[#F58220]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <UilShoppingBag size={16} /> Products & Inventory ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 px-2 text-sm font-extrabold flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === "orders"
              ? "border-[#F58220] text-[#F58220]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <UilClock size={16} /> Customer Orders ({orders.length})
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TAB 1: OVERVIEW DASHBOARD */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === "dashboard" && (
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
              <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl">
                <UilExclamationTriangle size={24} />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase">Low Stock Items</span>
                <h3 className="text-2xl font-black text-gray-900">{lowStockCount}</h3>
              </div>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-extrabold text-gray-900 text-lg">Product Inventory Management</h3>
              <p className="text-xs text-gray-500">Quickly add a new item or update existing stock levels</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#F58220] hover:bg-[#E06D0F] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <UilPlus size={16} /> Add New Product
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 2: PRODUCTS & INVENTORY */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === "products" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100">
            <div className="relative w-full sm:w-80">
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
              className="w-full sm:w-auto bg-[#F58220] hover:bg-[#E06D0F] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <UilPlus size={16} /> Add New Product
            </button>
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
                    <th className="p-3.5">Discount Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Flags</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
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
                        {product.subcategory?.replace(/-/g, " ")}
                      </td>

                      <td className="p-3.5 font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </td>

                      <td className="p-3.5 font-extrabold text-[#F58220]">
                        {formatPrice(product.discountPrice || product.price)}
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
                          {product.stock <= 10 && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-sm">Low</span>
                          )}
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
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingProduct({ ...product })}
                            className="p-1.5 text-gray-600 hover:text-[#F58220] hover:bg-orange-50 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <UilEdit size={16} />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Product"
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
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 3: CUSTOMER ORDERS */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === "orders" && (
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
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-gray-900">{order.id}</td>
                    <td className="p-3.5 text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-gray-800 block">{order.customer?.name}</span>
                      <span className="text-[10px] text-gray-400">{order.customer?.email}</span>
                    </td>
                    <td className="p-3.5 font-medium text-gray-600">
                      {order.items?.length || 0} items
                    </td>
                    <td className="p-3.5 font-extrabold text-gray-900">
                      {formatPrice(order.total)}
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
                      <button
                        onClick={() => setViewingOrder(order)}
                        className="p-1.5 text-[#F58220] hover:bg-orange-50 rounded-lg transition-colors font-bold flex items-center gap-1 ml-auto"
                      >
                        <UilEye size={16} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 1: ADD NEW PRODUCT */}
      {/* ------------------------------------------------------------------ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative custom-scrollbar space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900">Add New Product to Bazaar</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-gray-400">
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
                  className="w-full bg-gray-50 border rounded-xl p-2.5 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: categories.find(c => c.slug === e.target.value)?.subcategories[0]?.slug || "" })}
                    className="w-full bg-gray-50 border rounded-xl p-2.5 font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Subcategory</label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl p-2.5 font-semibold"
                  >
                    {currentCategoryObj?.subcategories.map((sub) => (
                      <option key={sub.id} value={sub.slug}>{sub.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Regular Price (Rs.)</label>
                  <input
                    type="number"
                    step="1"
                    required
                    placeholder="12999"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl p-2.5 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Discount Price (Rs.)</label>
                  <input
                    type="number"
                    step="1"
                    placeholder="8999"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl p-2.5 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Stock Qty</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl p-2.5 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Unsplash Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl p-2.5 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  placeholder="Detailed product features..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl p-2.5 font-semibold"
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
                className="w-full bg-[#F58220] text-white py-3 rounded-xl font-black text-sm shadow-md mt-4"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 2: EDIT PRODUCT */}
      {/* ------------------------------------------------------------------ */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative custom-scrollbar space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900">Edit Product #{editingProduct.id}</h2>
              <button onClick={() => setEditingProduct(null)} className="p-1 text-gray-400">
                <UilTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl p-2.5 font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    step="1"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl p-2.5 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Discount (Rs.)</label>
                  <input
                    type="number"
                    step="1"
                    value={editingProduct.discountPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, discountPrice: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl p-2.5 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl p-2.5 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl p-2.5 font-semibold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#F58220] text-white py-3 rounded-xl font-black text-sm shadow-md mt-4"
              >
                Save Product Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 3: VIEW ORDER DETAILS */}
      {/* ------------------------------------------------------------------ */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-gray-900">Order Details {viewingOrder.id}</h2>
              <button onClick={() => setViewingOrder(null)} className="p-1 text-gray-400">
                <UilTimes size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl space-y-1">
                <p><strong>Customer:</strong> {viewingOrder.customer?.name}</p>
                <p><strong>Email:</strong> {viewingOrder.customer?.email}</p>
                <p><strong>Phone:</strong> {viewingOrder.customer?.phone}</p>
                <p><strong>Address:</strong> {viewingOrder.customer?.address}, {viewingOrder.customer?.city}</p>
              </div>

              <div className="border-t pt-2">
                <p className="font-bold text-gray-700 mb-2">Purchased Items:</p>
                <div className="space-y-1.5">
                  {viewingOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.name} (x{item.quantity})</span>
                      <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-2 flex justify-between font-extrabold text-sm">
                <span>Total Paid</span>
                <span className="text-[#F58220]">{formatPrice(viewingOrder.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
