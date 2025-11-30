// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-lg" 
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="fs-3 me-2">🛍️</span>
          <span className="fw-bold fs-4">Shop</span>
        </Link>

        {/* Toggle para móvil */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link fw-semibold">
                <i className="bi bi-shop me-2"></i>Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link fw-semibold">
                <i className="bi bi-cart3 me-2"></i>Carrito
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link fw-semibold">
                <i className="bi bi-box-seam me-2"></i>Pedidos
              </Link>
            </li>
            
            {/* Usuario */}
            <li className="nav-item dropdown ms-3">
              <a 
                className="nav-link dropdown-toggle fw-semibold" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-circle me-2"></i>
                {user?.name || "Usuario"}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button onClick={logoutUser} className="dropdown-item">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
