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
    <section style={styles.container}>
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
  container: {
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "2.5rem",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)",
  },
  accentLine: {
    width: "60px",
    height: "4px",
    background: "#FFD700",
    borderRadius: "999px",
    marginBottom: "1.5rem",
  },
  title: {
    color: "#0a2a5e",
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "1rem",
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: "2rem",
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "1rem",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#0a2a5e",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};
