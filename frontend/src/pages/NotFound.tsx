import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <section style={styles.container}>
      <div style={styles.card}>
        <div style={styles.accentLine}></div>

        <h1 style={styles.code}>404</h1>

        <h2 style={styles.title}>
          Página no encontrada
        </h2>

        <p style={styles.description}>
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>

        <Link to="/" style={styles.button}>
          Volver al inicio
        </Link>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },

  card: {
    maxWidth: "600px",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "3rem",
    textAlign: "center",
    border: "1px solid #f3f4f6",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },

  accentLine: {
    width: "60px",
    height: "4px",
    backgroundColor: "#FFD700",
    borderRadius: "999px",
    margin: "0 auto 1.5rem",
  },

  code: {
    fontSize: "6rem",
    fontWeight: 900,
    color: "#0a2a5e",
    margin: 0,
    lineHeight: 1,
  },

  title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#111827",
    marginTop: "1rem",
    marginBottom: "1rem",
  },

  description: {
    color: "#6b7280",
    fontSize: "1.05rem",
    lineHeight: 1.6,
    marginBottom: "2rem",
  },

  button: {
    display: "inline-block",
    backgroundColor: "#0a2a5e",
    color: "#fff",
    textDecoration: "none",
    padding: "14px 24px",
    borderRadius: "10px",
    fontWeight: 700,
  },
};

export default NotFound;
