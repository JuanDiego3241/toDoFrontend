import React, { useState, JSX } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { register } from "./services/auth"; 

export const Sign = (): JSX.Element => {
  const [registerData, setRegisterData] = useState({
    email: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegisterInputChange = (
    field: keyof typeof registerData,
    value: string
  ) => {
    setRegisterData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.newPassword !== registerData.repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      const data = await register({
        email: registerData.email,
        password: registerData.newPassword,
      });
      localStorage.setItem("token", data.token);
      navigate("/tasks");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            <h1>Registrarse</h1>
            {error && <div className="error">{error}</div>}
            <label htmlFor="reg-email">
              <h2>Email</h2>
            </label>
            <input
              id="reg-email"
              type="email"
              value={registerData.email}
              onChange={(e) =>
                handleRegisterInputChange("email", e.target.value)
              }
              required
              autoComplete="email"
              className="login-input"
            />
            <label htmlFor="reg-new-password">
              <h2>Nueva contraseña</h2>
            </label>
            <input
              id="reg-new-password"
              type="password"
              value={registerData.newPassword}
              onChange={(e) =>
                handleRegisterInputChange("newPassword", e.target.value)
              }
              required
              minLength={6}
              className="login-input"
            />
            <label htmlFor="reg-repeat-password">
              <h2>Repetir contraseña</h2>
            </label>
            <input
              id="reg-repeat-password"
              type="password"
              value={registerData.repeatPassword}
              onChange={(e) =>
                handleRegisterInputChange("repeatPassword", e.target.value)
              }
              required
              className="login-input"
            />
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Cargando..." : "Registrarse"}
            </button>
            <p className="login-footer">
              ¿Ya tienes cuenta?{" "}
              <button type="button" onClick={handleLoginClick}>
                Ingresa
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign;
