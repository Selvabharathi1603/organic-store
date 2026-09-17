import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import TrackingStepper from "../../components/TrackingStepper";

export default function TrackOrder() {
  const { orders } = useStore();
  const [inputTrackingId, setInputTrackingId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);

    const found = orders.find(
      (order) =>
        order.trackingId.trim().toUpperCase() ===
        inputTrackingId.trim().toUpperCase(),
    );

    setSearchedOrder(found || null);
  };

  return (
    <div className="container" style={{ maxWidth: "700px" }}>
      <h2
        style={{ color: "#2e7d32", textAlign: "center", marginBottom: "10px" }}
      >
        Track Your Organic Order
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "#666",
          fontSize: "14px",
          marginBottom: "25px",
        }}
      >
        Enter your Order ID (e.g. ORG-123456) to see live delivery updates.
      </p>

      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Enter Order ID (e.g. ORG-123456)"
          value={inputTrackingId}
          onChange={(e) => setInputTrackingId(e.target.value)}
          required
          style={{ flex: 1, padding: "12px" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            padding: "0 24px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Track
        </button>
      </form>

      {searchedOrder && (
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div>
              <span style={{ fontSize: "12px", color: "#777" }}>Order ID</span>
              <h3 style={{ color: "#2e7d32" }}>{searchedOrder.trackingId}</h3>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "12px", color: "#777" }}>Placed On</span>
              <p style={{ fontWeight: "bold" }}>{searchedOrder.date}</p>
            </div>
          </div>

          <hr style={{ borderColor: "#eee", margin: "15px 0" }} />

          {/* Stepper Progress Visualizer */}
          <TrackingStepper currentStatus={searchedOrder.status} />

          <div
            style={{
              background: "#f1f8e9",
              padding: "10px 15px",
              borderRadius: "6px",
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Current Status:</span>
            <strong style={{ color: "#2e7d32", fontSize: "16px" }}>
              {searchedOrder.status}
            </strong>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h4 style={{ marginBottom: "8px" }}>Items in this order:</h4>
            <ul
              style={{ paddingLeft: "20px", fontSize: "14px", color: "#555" }}
            >
              {searchedOrder.items.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "4px" }}>
                  {item.name} ({item.unit}) × {item.qty} — ₹
                  {item.price * item.qty}
                </li>
              ))}
            </ul>
            <p
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              Total Paid: ₹{searchedOrder.total}
            </p>
          </div>
        </div>
      )}

      {/* No Order Found State */}
      {hasSearched && !searchedOrder && (
        <div
          style={{
            background: "#ffebee",
            color: "#c62828",
            padding: "15px",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          No order found with ID "{inputTrackingId}". Please verify the ID from
          your receipt.
        </div>
      )}
    </div>
  );
}
