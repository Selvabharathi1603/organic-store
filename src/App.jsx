import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/client/Home";
import Shop from "./pages/client/shop";
import Cart from "./pages/client/Cart";
import TrackOrder from "./pages/client/Trackorder";

import AdminLogin from "./pages/admin/AdminLogin";

export default function App() {
  return (
    <StoreProvider>
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />

          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/track" element={<TrackOrder />} />

              <Route path="/admin" element={<AdminLogin />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
}
