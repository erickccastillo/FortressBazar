import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {

  const locationsRef = useRef<HTMLElement | null>(null);
  const [showBranchesBubble, setShowBranchesBubble] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBranchesBubble(!entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );
  
    if (locationsRef.current) {
      observer.observe(locationsRef.current);
    }
  
    return () => observer.disconnect();
  }, []);
  
  const scrollToBranches = () => {
    locationsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  // Datos reales de las 3 sucursales
  const branches = [
    {
      id: 1,
      name: 'Sucursal Base Aérea',
      address: 'Av. Base Aerea 1273a, El Triángulo, 45138 Nuevo México, Jal.',
      phone: '+52 3315876043',
      hours: 'Lunes a Viernes: 9:00 AM - 6:00 PM | Sábado: 9:00 AM - 3:00 PM',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36728.622073416365!2d-103.45902422568359!3d20.744242900000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428af00783ce331%3A0x9de982cbd7c0a811!2sPisos%20y%20azulejos%20Revestimento!5e1!3m2!1ses!2smx!4v1787104414969!5m2!1ses!2smx', 
    },
    {
      id: 2,
      name: 'Sucursal Camino Viejo',
      address: 'Camino Viejo a Tesistan 1071A, La Casita, Los Girasoles, 45138 Zapopan, Jal.',
      phone: '+52 ', 
      hours: 'Lunes a Viernes: 9:00 AM - 6:00 PM | Sábado: 9:00 AM - 3:00 PM',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36728.622073416365!2d-103.45902422568359!3d20.744242900000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428adc5920464ed%3A0xb5a33f14f5754ca3!2sPISOS%20Y%20AZULEJOS%20REVESTIMENTO!5e1!3m2!1ses!2smx!4v1787104437069!5m2!1ses!2smx',
    },
    {
      id: 3,
      name: 'Sucursal Santa Lucía',
      address: 'Av. Juan Manuel Ruvalcaba 5250, Col. Jardines Del Valle, Santa Lucía, 45100 Tesistán, Jal.',
      phone: '+52 ', 
      hours: 'Lunes a Viernes: 9:00 AM - 6:00 PM | Sábado: 9:00 AM - 3:00 PM',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36714.98821683531!2d-103.53476752568359!3d20.800324700000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428a6fde4aff44f%3A0x4f405b8044bb783f!2sRevestimento%20Pisos%20Azulejos%20Banos!5e1!3m2!1ses!2smx!4v1787104451099!5m2!1ses!2smx',
    },
  ];

  return (
    <div style={styles.pageWrapper}>
      {/* Encabezado Hero */}
      <header style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h2 style={styles.sectionOverline}>NUESTRA HISTORIA</h2>
          <h1 style={styles.heroTitle}>
            Creando hogares con <span style={styles.textHighlight}>identidad.</span>
          </h1>
          <div style={styles.accentLineCentered}></div>
          <p style={styles.heroSubtitle}>
            Somos líderes en la distribución de pisos, azulejos, baños y 
            complementos del hogar, combinando calidad de clase mundial con el diseño que tu espacio merece.
          </p>
        </div>
      </header>

      {/* Sección de Descripción de la Empresa */}
      <section style={styles.descriptionSection}>
        <div style={styles.descriptionContainer}>
          <h2 style={styles.sectionTitleDark}>Mucho más que recubrimientos</h2>
          <p style={styles.descriptionText}>
            En <strong>Revestimento</strong> entendemos que cada rincón de tu hogar cuenta una historia. 
            No solo vendemos materiales; ofrecemos soluciones integrales de interiorismo y arquitectura. 
            Nuestro catálogo abarca desde las tendencias europeas más vanguardistas en <strong>pisos y azulejos</strong>, 
            hasta <strong>muebles de baño de lujo, grifería de alta tecnología y productos para el hogar</strong> que 
            convierten una casa en un verdadero santuario.
          </p>
          <p style={styles.descriptionText}>
            Con un equipo de asesores especializados, te acompañamos desde la inspiración 
            hasta la instalación, asegurando que tu proyecto residencial o comercial cumpla 
            con los más estrictos estándares de calidad.
          </p>
        </div>
      </section>

      {/* Sección de Sucursales */}
      <section ref={locationsRef} style={styles.locationsSection}>
        <div style={styles.locationsHeader}>
          <h2 style={styles.sectionOverlineDark}>UBICACIONES</h2>
          <h1 style={styles.sectionTitleDark}>Nuestras Sucursales</h1>
        </div>

        <div style={styles.locationsGrid}>
          {branches.map((branch) => (
            <div key={branch.id} style={styles.branchCard}>
              <div style={styles.branchInfo}>
                <h3 style={styles.branchName}>{branch.name}</h3>
                
                {/* Icono + Dirección */}
                <div style={styles.infoRow}>
                  <span style={styles.icon}>📍</span>
                  <p style={styles.infoText}>{branch.address}</p>
                </div>
                
                {/* Icono + Teléfono */}
                <div style={styles.infoRow}>
                  <span style={styles.icon}>📞</span>
                  <p style={styles.infoText}>{branch.phone}</p>
                </div>

                {/* Icono + Horario */}
                <div style={styles.infoRow}>
                  <span style={styles.icon}>🕒</span>
                  <p style={styles.infoText}>{branch.hours}</p>
                </div>
              </div>

              {/* Contenedor del Mapa */}
              <div style={styles.mapContainer}>
                {branch.mapSrc ? (
                  <iframe
                    title={`Mapa de ${branch.name}`}
                    src={branch.mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : (
                  <div style={styles.mapPlaceholder}>
                    <p>Mapa no disponible</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      {showBranchesBubble && (
  <button
    onClick={scrollToBranches}
    style={styles.branchesBubble}
    aria-label="Ir a sucursales"
  >
    📍 Sucursales
  </button>
)}
    </div>
  );
};

// --- ESTILOS ---
const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#ffffff',
  },
  branchesBubble: {
  position: 'fixed',
  right: '24px',
  bottom: '24px',
  zIndex: 9999,
  border: 'none',
  borderRadius: '999px',
  padding: '14px 22px',
  background: 'linear-gradient(135deg, #e1b71f 0%, #f4d03f 100%)',
  color: '#111827',
  fontWeight: 800,
  fontSize: '0.95rem',
  cursor: 'pointer',
  boxShadow: '0 10px 30px rgba(225,183,31,0.4)',
  animation: 'branchFloat 2.2s ease-in-out infinite',
  transition: 'all 0.3s ease',
},

  // Hero Section
  heroSection: {
    backgroundColor: '#111827', // Gris Carbón / Azul Medianoche
    padding: '120px 5% 60px 5%',
    textAlign: 'center',
    color: '#ffffff',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  sectionOverline: {
    fontSize: '0.875rem',
    letterSpacing: '2px',
    marginBottom: '1rem',
    color: '#e1b71f',
    fontWeight: 700,
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    marginBottom: '1.5rem',
    fontWeight: 800,
    color: '#ffffff',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  textHighlight: {
    color: '#e1b71f',
  },
  accentLineCentered: {
    width: '60px',
    height: '4px',
    backgroundColor: '#e1b71f',
    margin: '0 auto 2rem auto',
    borderRadius: '2px',
  },
  heroSubtitle: {
    fontSize: '1.15rem',
    lineHeight: 1.6,
    color: '#9ca3af',
  },

  // Description Section
  descriptionSection: {
    backgroundColor: '#ffffff',
    padding: '6rem 5%',
  },
  descriptionContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  sectionTitleDark: {
    fontSize: '2.5rem',
    lineHeight: 1.2,
    marginBottom: '2rem',
    fontWeight: 800,
    color: '#111827',
    letterSpacing: '-0.02em',
  },
  descriptionText: {
    fontSize: '1.125rem',
    lineHeight: 1.8,
    color: '#4b5563',
    marginBottom: '1.5rem',
  },

  // Locations Section
  locationsSection: {
    backgroundColor: '#f8fafc', 
    padding: '6rem 5%',
  },
  locationsHeader: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  sectionOverlineDark: {
    fontSize: '0.875rem',
    letterSpacing: '2px',
    marginBottom: '0.5rem',
    color: '#e1b71f',
    fontWeight: 700,
  },
  locationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2.5rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  
  // Cards de Sucursales
  branchCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9',
    display: 'flex',
    flexDirection: 'column',
  },
  branchInfo: {
    padding: '2rem',
    flexGrow: 1,
  },
  branchName: {
    fontSize: '1.25rem',
    fontWeight: 800,
    color: '#111827',
    marginBottom: '1.5rem',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  icon: {
    fontSize: '1.1rem',
    lineHeight: 1,
  },
  infoText: {
    fontSize: '0.95rem',
    color: '#64748b',
    lineHeight: 1.5,
    margin: 0,
  },
  mapContainer: {
    width: '100%',
    height: '300px', // Lo hice un poco más alto para que el mapa se aprecie mejor
    backgroundColor: '#e5e7eb',
    borderTop: '1px solid #f1f5f9',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    fontSize: '0.9rem',
    backgroundColor: '#f3f4f6',
  },
};

export default About;
