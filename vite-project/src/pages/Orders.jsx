// src/pages/Orders.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api";

export default function Orders() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/orders/mine`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: "bg-warning", icon: "hourglass-split", text: "Pendiente" },
      processing: { class: "bg-info", icon: "arrow-repeat", text: "Procesando" },
      completed: { class: "bg-success", icon: "check-circle", text: "Completado" },
      cancelled: { class: "bg-danger", icon: "x-circle", text: "Cancelado" }
    };
    return badges[status] || { class: "bg-secondary", icon: "box", text: status };
  };

  if (loading) {
    return (
      <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted fs-5">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        <h1 className="display-5 fw-bold text-dark mb-4">
          <i className="bi bi-box-seam me-3"></i>
          Mis Pedidos
        </h1>

        {orders.length === 0 ? (
          <div className="card shadow-lg border-0 rounded-4 text-center p-5">
            <div className="card-body">
              <div className="mb-4" style={{ fontSize: '5rem' }}>📦</div>
              <h2 className="h3 fw-bold text-dark mb-3">No tienes pedidos aún</h2>
              <p className="text-muted mb-4">
                ¡Realiza tu primera compra y aparecerá aquí!
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
            {orders.map((order) => {
              const badge = getStatusBadge(order.status);
              return (
                <div key={order.id} className="col-12">
                  <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                    {/* Header del pedido */}
                    <div className="card-header text-white p-4"
                         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <h4 className="mb-1 fw-bold">
                            <i className="bi bi-receipt me-2"></i>
                            Pedido #{order.id}
                          </h4>
                          <p className="mb-0 opacity-75">
                            <i className="bi bi-calendar-event me-2"></i>
                            {new Date(order.created_at).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="col-md-4 text-md-end mt-3 mt-md-0">
                          <span className={`badge ${badge.class} px-3 py-2 fs-6`}>
                            <i className={`bi bi-${badge.icon} me-2`}></i>
                            {badge.text}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cuerpo del pedido */}
                    <div className="card-body p-4">
                      {order.items && order.items.length > 0 ? (
                        <div className="mb-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="row align-items-center py-3 border-bottom">
                              <div className="col-1 text-center">
                                <span style={{ fontSize: '2rem' }}>📦</span>
                              </div>
                              <div className="col-md-7">
                                <h6 className="fw-bold text-dark mb-1">{item.name}</h6>
                                <p className="text-muted mb-0 small">
                                  <i className="bi bi-calculator me-1"></i>
                                  Cantidad: <span className="fw-semibold">{item.quantity}</span>
                                  {" "} × ${item.price}
                                </p>
                              </div>
                              <div className="col-md-4 text-md-end">
                                <span className="fs-5 fw-bold text-dark">
                                  ${item.price * item.quantity}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted mb-3">
                          <i className="bi bi-info-circle me-2"></i>
                          Detalles del pedido no disponibles
                        </p>
                      )}

                      {/* Total */}
                      <div className="row align-items-center pt-3 mt-3 border-top">
                        <div className="col-md-8">
                          <h5 className="mb-0 text-muted">
                            <i className="bi bi-currency-dollar me-2"></i>
                            Total del Pedido:
                          </h5>
                        </div>
                        <div className="col-md-4 text-md-end">
                          <h3 className="mb-0 fw-bold text-success">
                            ${order.total}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
