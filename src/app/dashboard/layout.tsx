// app/dashboard/layout.tsx
import React from "react";
import { ToastContainer } from "react-toastify";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
