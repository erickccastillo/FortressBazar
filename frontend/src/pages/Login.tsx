import React, { useState } from "react";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem(
        "adminToken",
        data.token
      );

      window.location.href = "/admin";
    } catch (error) {
      alert("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Añadimos el padding-top necesario y forzamos el color oscuro de fondo para toda la pantalla
    <section className="w-screen m-0 min-h-screen bg-[#111111] overflow-x-hidden flex justify-center items-center px-4 pt-32 pb-16">
      <div style={styles.card}>
        <div style={styles.accentLine}></div>

        <h1 style={styles.title}>
          Panel Administrativo
        </h1>

        <p style={styles.subtitle}>
          Inicia sesión para administrar el catálogo.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Validando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </section>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#1a1a1a", // Fondo de la tarjeta oscuro
    borderRadius: "16px",
    padding: "clamp(1.5rem, 4vw, 2.5rem)", // Padding responsivo
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)", // Sombra adaptada a tema oscuro
    border: "1px solid #333", // Borde sutil
  },
  accentLine: {
    width: "60px",
    height: "4px",
    background: "#ffffff", // Línea blanca
    marginBottom: "1.5rem",
  },
  title: {
    fontFamily: '"Anton", sans-serif',
    color: "#ffffff",
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    lineHeight: 1.1,
  },
  subtitle: {
    color: "#888",
    marginBottom: "2rem",
    fontSize: "0.95rem",
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "1rem",
    border: "1px solid #444", // Borde de input más oscuro
    borderRadius: "8px",
    background: "#222", // Fondo del input oscuro
    color: "#fff", // Texto blanco
    fontSize: "1rem",
    boxSizing: "border-box",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "14px",
    border: "1px solid #fff", // Borde blanco (estilo streetwear)
    borderRadius: "8px",
    background: "#fff", // Botón blanco
    color: "#000", // Texto negro
    fontWeight: 800,
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginTop: "0.5rem",
    transition: "background 0.2s, color 0.2s",
  },
};