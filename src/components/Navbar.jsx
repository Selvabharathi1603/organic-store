import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export default function Navbar() {
  const { cart } = useStore();
  const totalCartItems = cart
    ? cart.reduce((total, item) => total + (item.qty || 1), 0)
    : 0;

  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        padding: "12px clamp(12px, 4vw, 32px)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        boxSizing: "border-box",
        gap: "10px",
      }}
    >
      {/* Brand Logo */}
      <Link
        to="/"
        style={{
          fontSize: "clamp(18px, 4vw, 22px)",
          fontWeight: "700",
          color: "#2e7d32",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        🌱 PureOrganics
      </Link>

      {/* Navigation Links */}
      <nav
        style={{
          display: "flex",
          gap: "clamp(10px, 2.5vw, 24px)",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#374151",
            fontWeight: "600",
            fontSize: "clamp(13px, 2.5vw, 15px)",
          }}
        >
          Home
        </Link>
        <Link
          to="/shop"
          style={{
            textDecoration: "none",
            color: "#374151",
            fontWeight: "600",
            fontSize: "clamp(13px, 2.5vw, 15px)",
          }}
        >
          Shop
        </Link>
        <Link
          to="/track"
          style={{
            textDecoration: "none",
            color: "#374151",
            fontWeight: "600",
            fontSize: "clamp(13px, 2.5vw, 15px)",
          }}
        >
          Track Order
        </Link>
        <Link
          to="/cart"
          style={{
            textDecoration: "none",
            color: "#ffffff",
            background: "#2e7d32",
            padding: "6px clamp(10px, 2vw, 18px)",
            borderRadius: "6px",
            fontWeight: "600",
            fontSize: "clamp(13px, 2.5vw, 15px)",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            whiteSpace: "nowrap",
          }}
        >
          Cart
          {totalCartItems > 0 && (
            <span
              style={{
                background: "#ffffff",
                color: "#2e7d32",
                borderRadius: "10px",
                padding: "2px 7px",
                fontSize: "11px",
                fontWeight: "700",
              }}
            >
              {totalCartItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
