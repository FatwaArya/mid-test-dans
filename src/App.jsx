import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import ProductPage from "./pages/products";
import ProductDetail from "./pages/productDetail";
import Layout from "./components/layout";
import Register from "./pages/register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/products" element={<ProductPage />} />
          {/* product detail with route id */}
          <Route path="/products/:id" element={<ProductDetail />} />
        </Route>

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}

export default App;
