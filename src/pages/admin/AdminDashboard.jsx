import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";

export default function AdminDashboard({ onLogout }) {
  const { products, orders, addProduct, deleteProduct, updateOrderStatus } =
    useStore();

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Groceries",
    price: "",
    unit: "",
    image: "",
    description: "",
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.unit) {
      alert("Please fill in required fields!");
      return;
    }

    // Default image if none provided
    const imageToUse =
      newProduct.image.trim() !== ""
        ? newProduct.image
        : "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500";

    addProduct({
      ...newProduct,
      price: Number(newProduct.price),
      image: imageToUse,
    });

    // Reset form
    setNewProduct({
      name: "",
      category: "Groceries",
      price: "",
      unit: "",
      image: "",
      description: "",
    });

    alert("Product added successfully!");
  };

  return (
    <div className="container">
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#2e7d32" }}>Admin Control Panel</h2>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: "#d32f2f",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      {/* 1. Add New Organic Product Form */}
      <div
        className="form-box"
        style={{ maxWidth: "100%", margin: "0 0 30px 0" }}
      >
        <h3 style={{ color: "#2e7d32", marginBottom: "12px" }}>
          + Add New Organic Product
        </h3>
        <form
          onSubmit={handleAddProduct}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
          }}
        >
          <div>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>
              Product Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Organic Black Rice"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>
              Category *
            </label>
            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            >
              <option value="Groceries">Groceries</option>
              <option value="Millets & Grains">Millets & Grains</option>
              <option value="Cold-Pressed Oils">Cold-Pressed Oils</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>
              Price (₹) *
            </label>
            <input
              type="number"
              placeholder="e.g. 180"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>
              Unit / Size *
            </label>
            <input
              type="text"
              placeholder="e.g. 500g, 1 kg, 1 Litre"
              value={newProduct.unit}
              onChange={(e) =>
                setNewProduct({ ...newProduct, unit: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>
              Image URL (Optional)
            </label>
            <input
              type="url"
              placeholder="Paste image web link"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>
              Description
            </label>
            <input
              type="text"
              placeholder="Short benefits note"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#2e7d32",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Save Product
            </button>
          </div>
        </form>
      </div>

      {/* 2. Current Products Inventory Table */}
      <div style={{ marginBottom: "35px" }}>
        <h3 style={{ color: "#2e7d32", marginBottom: "10px" }}>
          Inventory Management ({products.length} Items)
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <strong>{prod.name}</strong>
                  </td>
                  <td>{prod.category}</td>
                  <td>₹{prod.price}</td>
                  <td>{prod.unit}</td>
                  <td>
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      style={{
                        backgroundColor: "#c62828",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Customer Orders & Live Status Control */}
      <div>
        <h3 style={{ color: "#2e7d32", marginBottom: "10px" }}>
          Customer Orders ({orders.length})
        </h3>
        {orders.length === 0 ? (
          <p style={{ color: "#777", fontStyle: "italic" }}>
            No customer orders placed yet.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Order / Tracking ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status Progress</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.trackingId}>
                    <td>
                      <strong style={{ color: "#2e7d32" }}>
                        {order.trackingId}
                      </strong>
                    </td>
                    <td>
                      <div>
                        <b>{order.customer.name}</b>
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {order.customer.phone}
                      </div>
                      <div style={{ fontSize: "12px", color: "#888" }}>
                        {order.customer.address}
                      </div>
                    </td>
                    <td>{order.date}</td>
                    <td>₹{order.total}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.trackingId, e.target.value)
                        }
                        style={{
                          padding: "6px",
                          fontWeight: "bold",
                          borderColor: "#2e7d32",
                        }}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
