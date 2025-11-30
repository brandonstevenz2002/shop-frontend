// src/pages/Cart.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api";

export default function Cart() {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      await fetch(`${API_URL}/cart/item/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (error) {
      alert("Error al eliminar el producto");
    }
  };

  const checkout = async () => {
    try {
      const res = await fetch(`${API_URL}/orders/checkout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      alert(`✅ Pedido creado exitosamente con ID: ${data.orderId}`);
      navigate("/orders");
    } catch (error) {
      alert("Error al procesar el pedido");
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  if (loading) {
    return (
      <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted fs-5">Cargando carrito...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        <h1 className="display-5 fw-bold text-dark mb-4">
          <i className="bi bi-cart3 me-3"></i>
          Mi Carrito
        </h1>

        {!cart || cart.items.length === 0 ? (
          <div className="card shadow-lg border-0 rounded-4 text-center p-5">
            <div className="card-body">
              <div className="mb-4" style={{ fontSize: '5rem' }}>🛒</div>
              <h2 className="h3 fw-bold text-dark mb-3">Tu carrito está vacío</h2>
              <p className="text-muted mb-4">
                ¡Agrega productos para empezar a comprar!
              </p>
              <button
                onClick={() => navigate("/")}
                className="btn btn-lg text-white fw-semibold"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                <i className="bi bi-shop me-2"></i>
                Ver Productos
              </button>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {/* Lista de productos */}
            <div className="col-lg-8">
              {cart.items.map((item) => (
                <div key={item.id} className="card shadow-sm border-0 rounded-4 mb-3">
                  <div className="card-body p-4">
                    <div className="row align-items-center">
                      <div className="col-md-2 text-center">
                        <div className="p-3 rounded-3"
                             style={{ 
                               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                               fontSize: '3rem'
                             }}>
                          📦
                        </div>
                      </div>
                      <div className="col-md-5">
                        <h5 className="fw-bold text-dark mb-2">{item.name}</h5>
                        <p className="text-muted mb-1">
                          <i className="bi bi-calculator me-2"></i>
                          Cantidad: <span className="fw-semibold">{item.quantity}</span>
                        </p>
                        <p className="text-success fw-semibold mb-0">
                          <i className="bi bi-tag me-2"></i>
                          ${item.price} c/u
                        </p>
                      </div>
                      <div className="col-md-3 text-center">
                        <p className="fs-4 fw-bold text-dark mb-0">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                      <div className="col-md-2 text-end">
                        <button
                          onClick={() => removeItem(item.product_id)}
                          className="btn btn-danger"
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen del pedido */}
            <div className="col-lg-4">
              <div className="card shadow-lg border-0 rounded-4 sticky-top" style={{ top: '20px' }}>
                <div className="card-body p-4">
                  <h3 className="h4 fw-bold text-dark mb-4">
                    <i className="bi bi-receipt me-2"></i>
                    Resumen del Pedido
                  </h3>
                  
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Subtotal:</span>
                      <span className="fw-semibold">${cart.total}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Envío:</span>
                      <span className="fw-semibold text-success">Gratis</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <span className="fs-5 fw-bold">Total:</span>
                      <span className="fs-4 fw-bold text-success">${cart.total}</span>
                    </div>
                  </div>

                  <button
                    onClick={checkout}
                    className="btn btn-lg w-100 text-white fw-semibold mb-3"
                    style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}
                  >
                    <i className="bi bi-credit-card me-2"></i>
                    Proceder al Pago
                  </button>

                  <button
                    onClick={() => navigate("/")}
                    className="btn btn-outline-secondary w-100"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Continuar Comprando
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
