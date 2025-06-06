import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/pages/Home";
import Products from "../src/pages/Products";
import ProductDetail from "../src/pages/ProductDetail";
import Navbar from "../src/components/Navbar";
import CartPage from "../src/pages/CartPage";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";  

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/panier" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
