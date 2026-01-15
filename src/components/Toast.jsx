import React from "react";

export default function Toast({ toast, onClose }) {
  if (!toast?.open) return null;

  const { message, type = "success" } = toast;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        padding: "12px 14px",
        borderRadius: 10,
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        background: "#fff",
        border: `1px solid ${type === "error" ? "#ffb4b4" : "#b9f2c7"}`,
        maxWidth: 320,
        zIndex: 9999,
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: 14, color: "#111" }}>{message}</span>
      <button
        onClick={onClose}
        aria-label="Close message"
        style={{
          marginLeft: "auto",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: 16,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}
