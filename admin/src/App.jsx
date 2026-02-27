import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import AddProducts from "./components/AddProducts";
import { Toaster } from "sonner";

const App = () => {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProducts />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
};

export default App;