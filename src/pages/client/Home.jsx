import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import ProductCard from "../../components//ProductCard";

export default function Home() {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 3);
  return (
    <div className="container">
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
          padding: "40px 20px",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        <h1
          style={{ fontSize: "28px", color: "#1b5e20", marginBottom: "10px" }}
        >
          Eat Clean, Live Healthy
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#388e3c",
            maxWidth: "600px",
            margin: "0 auto 20px auto",
          }}
        >
          Directly sourced organic millets, traditional wood-pressed oils, and
          pure wild honey straight from local farmers.
        </p>
        <Link
          to="/shop"
          style={{
            display: "inline-block",
            backgroundColor: "#2e7d32",
            color: "#ffffff",
            padding: "10px 22px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Explore All Products
        </Link>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginBottom: "35px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        >
          <h3>🌿 100% Chemical-Free</h3>
          <p style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>
            Zero synthetic fertilizers
          </p>
        </div>
        <div
          style={{
            background: "#ffffff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        >
          <h3>🪵 Traditional Extraction</h3>
          <p style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>
            Pure wood-pressed oils
          </p>
        </div>
        <div
          style={{
            background: "#ffffff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        >
          <h3>🚚 Fast & Trackable</h3>
          <p style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>
            Instant order lookup
          </p>
        </div>
      </section>

      {/* Featured Section */}
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: "22px", color: "#2e7d32" }}>
            Featured Essentials
          </h2>
          <Link
            to="/shop"
            style={{
              color: "#2e7d32",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            View All →
          </Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
