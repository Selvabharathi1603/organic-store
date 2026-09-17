import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import ProductCard from "../../components/ProductCard";

export default function Shop() {
  const { products } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products by selected category and search input
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container">
      <h2 style={{ fontSize: "24px", color: "#2e7d32", marginBottom: "15px" }}>
        Organic Store Catalog
      </h2>

      {/* Search and Category Filter Bar */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search products (e.g. Honey, Oil, Millet)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, minWidth: "220px", padding: "10px" }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: "200px", padding: "10px" }}
        >
          <option value="All">All Categories</option>
          <option value="Groceries">Groceries</option>
          <option value="Millets & Grains">Millets & Grains</option>
          <option value="Cold-Pressed Oils">Cold-Pressed Oils</option>
        </select>
      </div>

      {/* Responsive Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "40px", color: "#777" }}>
          <h3>No organic items found matching "{searchTerm}".</h3>
        </div>
      )}
    </div>
  );
}
