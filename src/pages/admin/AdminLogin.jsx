import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";

export default function AdminLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple preset intern credentials
    if (username === "farm" && password === "farm123") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid username or password! (Use: farm / farm123)");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  // If already authenticated, show the Dashboard
  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 280px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 4vw, 40px) 14px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        className="form-box"
        style={{
          width: "100%",
          maxWidth: "420px",
          margin: "0 auto",
          padding: "clamp(20px, 5vw, 32px)",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            color: "#2e7d32",
            textAlign: "center",
            marginBottom: "6px",
            fontSize: "clamp(20px, 4vw, 24px)",
            fontWeight: "700",
          }}
        >
          Admin Login
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "20px",
          }}
        >
          Store management portal
        </p>

        {errorMsg && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              padding: "10px 12px",
              borderRadius: "6px",
              fontSize: "13px",
              marginBottom: "16px",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                margin: 0,
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                margin: 0,
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#2e7d32",
              color: "#ffffff",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              fontSize: "15px",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              boxSizing: "border-box",
            }}
          >
            Login to Admin Panel
          </button>
        </form>

        <div
          style={{
            marginTop: "18px",
            fontSize: "12px",
            color: "#6b7280",
            textAlign: "center",
          }}
        >
          Demo Hint: User: <b>farm</b> | Pass: <b>farm123</b>
        </div>
      </div>
    </div>
  );
}
