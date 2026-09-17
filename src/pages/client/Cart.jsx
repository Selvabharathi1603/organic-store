import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, placeOrder } = useStore();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [orderId, setOrderId] = useState(null);

  // Total bill calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please enter your delivery details!");
      return;
    }

    const generatedId = placeOrder(customer);
    setOrderId(generatedId);
  };

  // If order was successfully placed, show Confirmation & Tracking ID
  if (orderId) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "40px 10px" }}
      >
        <div style={{ fontSize: "50px", marginBottom: "10px" }}>🎉</div>
        <h2 style={{ color: "#2e7d32", marginBottom: "10px" }}>
          Thank You! Your Order is Placed.
        </h2>
        <p style={{ color: "#555", fontSize: "16px" }}>Your Tracking ID is:</p>
        <div
          style={{
            display: "inline-block",
            background: "#e8f5e9",
            border: "2px dashed #2e7d32",
            padding: "10px 20px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#1b5e20",
            borderRadius: "8px",
            margin: "15px 0",
          }}
        >
          {orderId}
        </div>
        <p style={{ fontSize: "13px", color: "#777", marginBottom: "25px" }}>
          Save this tracking ID to check your order delivery status!
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <Link
            to="/track"
            style={{
              backgroundColor: "#2e7d32",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              flex: "1 1 180px", // Stretches side-by-side on PC, takes full row on mobile
              maxWidth: "240px",
              boxSizing: "border-box",
            }}
          >
            Track Order Now
          </Link>
          <Link
            to="/shop"
            style={{
              backgroundColor: "#2e7d32",
              color: "#fff",
              border: "1px solid #c8e6c9",
              padding: "12px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              flex: "1 1 180px", // Stretches side-by-side on PC, takes full row on mobile
              maxWidth: "240px",
              boxSizing: "border-box",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "50px 0" }}
      >
        <h2>Your Organic Basket is Empty 🌾</h2>
        <p style={{ color: "#666", margin: "15px 0" }}>
          Explore our farm-fresh products and add them to your cart.
        </p>
        <Link
          to="/shop"
          style={{
            backgroundColor: "#2e7d32",
            color: "white",
            padding: "10px 20px",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ color: "#2e7d32", marginBottom: "15px" }}>
        Your Shopping Basket
      </h2>

      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: "12px", color: "#777" }}>
                    {item.unit}
                  </div>
                </td>
                <td>₹{item.price}</td>
                <td>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    style={{ padding: "3px 8px", cursor: "pointer" }}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px", fontWeight: "bold" }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    style={{ padding: "3px 8px", cursor: "pointer" }}
                  >
                    +
                  </button>
                </td>
                <td>₹{item.price * item.qty}</td>
                <td>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      backgroundColor: "#e53935",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: "right", marginTop: "15px", fontSize: "18px" }}>
        <strong>Grand Total: ₹{subtotal}</strong>
      </div>

      <div className="form-box">
        <h3 style={{ marginBottom: "10px", color: "#2e7d32" }}>
          Delivery Details (Cash on Delivery)
        </h3>
        <form onSubmit={handleCheckout}>
          <label style={{ fontSize: "13px", fontWeight: "bold" }}>
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="Enter your name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />

          <label style={{ fontSize: "13px", fontWeight: "bold" }}>
            Phone Number
          </label>
          <input
            type="tel"
            required
            placeholder="10-digit mobile number"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
          />

          <label style={{ fontSize: "13px", fontWeight: "bold" }}>
            Delivery Address
          </label>
          <input
            type="text"
            required
            placeholder="Street address, city, pincode"
            value={customer.address}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#2e7d32",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Confirm & Place Order (₹{subtotal})
          </button>
        </form>
      </div>
    </div>
  );
}
