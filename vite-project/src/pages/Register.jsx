// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "http://localhost:3000/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      
      if (data.token) {
        alert("¡Usuario registrado con éxito! Ahora inicia sesión.");
        navigate("/login");
      } else {
        setError(data.message || "Error al registrar usuario");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <h1 className="display-4 mb-2">🛍️ Shop</h1>
                  <h2 className="h3 fw-bold text-dark mb-2">Crear Cuenta</h2>
                  <p className="text-muted">Únete a nuestra comunidad</p>
                </div>

                {/* Alert de error */}
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError("")}></button>
                  </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="form-label fw-semibold">
                        <i className="bi bi-person me-2"></i>Nombre Completo
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Juan Pérez"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-12 mb-3">
                      <label className="form-label fw-semibold">
                        <i className="bi bi-envelope me-2"></i>Email
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        <i className="bi bi-lock me-2"></i>Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">
                        <i className="bi bi-lock-fill me-2"></i>Confirmar
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-lg w-100 text-white fw-semibold"
                    style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Registrando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Registrarse
                      </>
                    )}
                  </button>
                </form>

                {/* Link a login */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-decoration-none fw-semibold">
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
