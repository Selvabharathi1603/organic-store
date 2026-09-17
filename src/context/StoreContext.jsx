import React, { createContext, useContext, useState, useEffect } from "react";
import { initialProducts } from "../data/initialProducts";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("organic_products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // 2. Load Cart from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("organic_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 3. Load Orders from localStorage (for tracking & admin panel)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("organic_orders");
    return saved ? JSON.parse(saved) : [];
  });

  // Automatically save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("organic_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("organic_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("organic_orders", JSON.stringify(orders));
  }, [orders]);

  // --- CLIENT ACTIONS ---

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // Remove single item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Increase or decrease quantity
  const updateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + change;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Place Order & generate Tracking ID
  const placeOrder = (customerDetails) => {
    const trackingId = "ORG-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      trackingId,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      customer: customerDetails,
      date: new Date().toLocaleDateString(),
      status: "Placed", // Status options: Placed -> Packed -> Shipped -> Delivered
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
    return trackingId;
  };

  // --- ADMIN ACTIONS ---

  // Add new product
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [
      { ...newProduct, id: "org-" + Date.now() },
      ...prevProducts,
    ]);
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id),
    );
  };

  // Update order status (Placed -> Packed -> Shipped -> Delivered)
  const updateOrderStatus = (trackingId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.trackingId === trackingId
          ? { ...order, status: newStatus }
          : order,
      ),
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        addProduct,
        deleteProduct,
        updateOrderStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use store easily in any component
export const useStore = () => useContext(StoreContext);
