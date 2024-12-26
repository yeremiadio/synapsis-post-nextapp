import React from "react";
import Navbar from "@/components/Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="dark:bg-gray-900 bg-slate-50 min-h-screen">
      <Navbar />
      <main className="mt-16">{children}</main>
    </div>
  );
};

export default Layout;
