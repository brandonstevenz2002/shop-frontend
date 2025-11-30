// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3">
            <i className="bi bi-shop-window me-3"></i>
            Nuestros Productos
          </h1>
          <p className="lead text-muted">
            Descubre nuestra selección de productos increíbles
          </p>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
            <div className="text-center">
              <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3 text-muted fs-5">Cargando productos...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-5">
            <div className="fs-1 mb-3">📦</div>
            <p className="fs-4 text-muted">No hay productos disponibles</p>
          </div>
        ) : (
          <div className="row g-4">
            {products.map((p) => (
              <div key={p.id} className="col-md-6 col-lg-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
