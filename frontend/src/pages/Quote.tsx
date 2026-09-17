import React from "react";

type Branch = {
  id: number;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
};

const branches: Branch[] = [
  {
    id: 1,
    name: "Sucursal Base Aérea",
    address:
      "Av. Base Aerea 1273a, El Triángulo, 45138 Nuevo México, Jal.",
    phone: "+52 3315876043",
    whatsapp: "",
  },
  {
    id: 2,
    name: "Sucursal Camino Viejo",
    address:
      "Camino Viejo a Tesistán 1071A, La Casita, Los Girasoles, 45138 Zapopan, Jal.",
    phone: "+52 ",
    whatsapp: "",
  },
  {
    id: 3,
    name: "Sucursal Santa Lucía",
    address:
      "Av. Juan Manuel Ruvalcaba 5250, Col. Jardines Del Valle, Santa Lucía, 45100 Tesistán, Jal.",
    phone: "+52 ",
    whatsapp: "",
  },
];

const Quote: React.FC = () => {
  const openWhatsApp = (branch: Branch) => {
    const message = `Hola, me gustaría solicitar una cotización con ${branch.name}.`;

    const url = `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <div style={styles.accentLine} />

        <h1 style={styles.title}>
          Solicitar Cotización
        </h1>

        <p style={styles.subtitle}>
          Selecciona la sucursal más cercana para ser atendido por uno de
          nuestros asesores.
        </p>
      </div>

      <div style={styles.grid}>
        {branches.map((branch) => (
          <div key={branch.id} style={styles.card}>
            <h2 style={styles.branchName}>
              {branch.name}
            </h2>

            <p style={styles.address}>
              {branch.address}
            </p>

            <p style={styles.phone}>
              📞 {branch.phone}
            </p>

            <button
              type="button"
              style={styles.button}
              onClick={() => openWhatsApp(branch)}
            >
              Solicitar por WhatsApp
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "4rem 2rem",
  },

  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },

  accentLine: {
    width: "60px",
    height: "4px",
    backgroundColor: "#FFD700",
    margin: "0 auto 1.5rem",
    borderRadius: "999px",
  },

  title: {
    fontSize: "2.5rem",
    fontWeight: 800,
    color: "#0a2a5e",
    marginBottom: "1rem",
  },

  subtitle: {
    color: "#6b7280",
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: 1.6,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },

  branchName: {
    color: "#0a2a5e",
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: "1rem",
  },

  address: {
    color: "#6b7280",
    lineHeight: 1.6,
    marginBottom: "1rem",
  },

  phone: {
    color: "#111827",
    fontWeight: 600,
    marginBottom: "1.5rem",
  },

  button: {
    width: "100%",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    backgroundColor: "#25D366",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default Quote;
