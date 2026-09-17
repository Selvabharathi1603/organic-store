import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }) {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div
      className="card"
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        width: "100%",
        boxSizing: "border-box",
        height: "100%",
      }}
    >
      {/* Product Image Container */}
      <div
        style={{
          width: "100%",
          height: "140px",
          maxHeight: "140px",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#f9fafb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Category Tag */}
      <span
        style={{
          display: "inline-block",
          alignSelf: "flex-start",
          fontSize: "10px",
          background: "#e8f5e9",
          color: "#2e7d32",
          padding: "2px 8px",
          borderRadius: "10px",
          marginTop: "10px",
          fontWeight: "700",
          textTransform: "uppercase",
        }}
      >
        {product.category}
      </span>

      {/* Title */}
      <h3
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#111827",
          marginTop: "6px",
          marginBottom: "4px",
          lineHeight: "1.3",
          height: "36px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "block",
        }}
      >
        {product.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "12px",
          color: "#6b7280",
          lineHeight: "1.3",
          marginBottom: "8px",
          height: "32px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "block",
        }}
      >
        {product.description}
      </p>

      {/* Price */}
      <div
        style={{
          fontSize: "16px",
          fontWeight: "700",
          color: "#1f2937",
          marginBottom: "10px",
        }}
      >
        ₹{product.price}{" "}
        <span
          style={{
            fontSize: "12px",
            fontWeight: "400",
            color: "#9ca3af",
          }}
        >
          / {product.unit}
        </span>
      </div>

      {/* Add to Cart Button - Locked flush to bottom edge */}
      <button
        onClick={handleAdd}
        style={{
          width: "100%",
          backgroundColor: added ? "#15803d" : "#2e7d32",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          padding: "10px 14px",
          fontSize: "13px",
          fontWeight: "600",
          cursor: "pointer",
          marginTop: "auto",
          boxSizing: "border-box",
        }}
      >
        {added ? "✓ Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
