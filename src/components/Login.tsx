import React, { JSX, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { login } from "./services/auth";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
      navigate("/tasks");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  const handleRegisterClick = () => {
    navigate("/sign");
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            <h1>Ingresar</h1>
            <div>
            {error && <div className="error">{error}</div>}
              <label htmlFor="email"><h2>Email</h2></label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </div>
            <div>
              <label htmlFor="password"><h2>Contraseña</h2></label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </div>
            <button type="submit" className="login-button">
              Entrar
            </button>
            <p className="login-footer">
              ¿No tienes cuenta?{" "}
              <button type="button" onClick={handleRegisterClick}>
                Registrate
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
