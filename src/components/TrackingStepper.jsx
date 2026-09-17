import React from "react";

export default function TrackingStepper({ currentStatus }) {
  const steps = ["Placed", "Packed", "Shipped", "Delivered"];

  const currentStepIndex = steps.indexOf(currentStatus);

  return (
    <div style={{ margin: "25px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          alignItems: "center",
        }}
      >
        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;

          return (
            <div
              key={step}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: isCompleted ? "#2e7d32" : "#e0e0e0",
                  color: isCompleted ? "#ffffff" : "#777777",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                }}
              >
                {index + 1}
              </div>

              <span
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  fontWeight: isCompleted ? "bold" : "normal",
                  color: isCompleted ? "#2e7d32" : "#888888",
                  textAlign: "center",
                }}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
