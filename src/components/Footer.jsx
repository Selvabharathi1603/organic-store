import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1b4332",
        color: "#d8f3dc",
        padding: "40px 20px 20px 20px",
        marginTop: "auto",
        borderTop: "1px solid #2d6a4f",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "30px",
          marginBottom: "30px",
        }}
      >
        <div style={{ flex: "1 1 280px" }}>
          <h3
            style={{
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            🌱 PureOrganics
          </h3>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
              color: "#b7e4c7",
              margin: 0,
            }}
          >
            Delivering 100% natural, farm-fresh organic essentials straight to
            your doorstep. Pure food for a healthier lifestyle.
          </p>
        </div>

        {/* Quick Links Column */}
        <div style={{ flex: "1 1 160px" }}>
          <h4
            style={{
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            Quick Links
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <li>
              <Link
                to="/"
                style={{
                  color: "#d8f3dc",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                style={{
                  color: "#d8f3dc",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Shop Products
              </Link>
            </li>
            <li>
              <Link
                to="/track"
                style={{
                  color: "#d8f3dc",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Track Your Order
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                style={{
                  color: "#d8f3dc",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Shopping Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Quality Guarantee Column */}
        <div style={{ flex: "1 1 220px" }}>
          <h4
            style={{
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            Our Promise
          </h4>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
              color: "#b7e4c7",
              margin: 0,
            }}
          >
            ✓ No synthetic pesticides
            <br />
            ✓ Traditional wood-pressed oils
            <br />✓ Direct local farmer sourcing
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #2d6a4f",
          paddingTop: "16px",
          textAlign: "center",
          fontSize: "13px",
          color: "#95d5b2",
        }}
      >
        © 2026 PureOrganics Store. All rights reserved.
      </div>
    </footer>
  );
}
