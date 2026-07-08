"use client";

import { Toaster } from "react-hot-toast";

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      gutter={10}
      toastOptions={{
        duration: 3200,
        style: {
          background: "#191c26",
          color: "#f5f6f8",
          border: "1px solid #262a38",
          borderRadius: "0.75rem",
          padding: "0.75rem 1rem",
          fontSize: "0.875rem",
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
        },
        success: {
          iconTheme: { primary: "#22c55e", secondary: "#191c26" },
        },
        error: {
          iconTheme: { primary: "#f43f5e", secondary: "#191c26" },
        },
      }}
    />
  );
}
