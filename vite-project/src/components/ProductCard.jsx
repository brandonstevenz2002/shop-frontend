// src/components/ProductCard.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { addToCart } from "../api/cart";

export default function ProductCard({ product }) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!token) {
      alert("Debes iniciar sesión para agregar al carrito");
      return;
    }
    
    setLoading(true);
    try {
      const data = await addToCart(token, product.id, 1);
      alert(`✅ ${product.name} agregado al carrito`);
      console.log("Carrito actualizado:", data);
    } catch (error) {
      alert("Error al agregar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card h-100 shadow-lg border-0 rounded-4 overflow-hidden">
      {/* Imagen del producto */}
      <div className="position-relative" 
           style={{ 
             height: '200px', 
             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
           }}>
        <div className="position-absolute top-50 start-50 translate-middle">
          <span style={{ fontSize: '5rem' }}>📦</span>
        </div>
        {product.stock > 0 && (
          <span className="badge bg-success position-absolute top-0 end-0 m-3">
            <i className="bi bi-check-circle me-1"></i>
            Disponible
          </span>
        )}
      </div>
      
      {/* Contenido */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-dark mb-2">
          {product.name}
        </h5>
        <p className="card-text text-muted mb-3" style={{ minHeight: '48px' }}>
          {product.description}
        </p>
        
        {/* Precio y stock */}
        <div className="d-flex justify-content-between align-items-center mb-3 mt-auto">
          <span className="fs-3 fw-bold text-success">
            ${product.price}
          </span>
          <span className="badge bg-secondary">
            <i className="bi bi-box-seam me-1"></i>
            Stock: {product.stock || 10}
          </span>
        </div>
        
        {/* Botón */}
        <button
          onClick={handleAdd}
          disabled={loading}
          className="btn btn-lg w-100 text-white fw-semibold"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Agregando...
            </>
          ) : (
            <>
              <i className="bi bi-cart-plus me-2"></i>
              Agregar al carrito
            </>
          )}
        </button>
      </div>
    </div>
  );
}
