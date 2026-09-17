import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import { useFetchProducts } from '../hooks/useFetchProducts';
import type { Product } from '../types/Product';

const formatTechnicalDescription = (text?: string) => {
  if (!text) return <p style={{ color: '#aaa' }}>Sin descripción.</p>;
  return (
    <p style={{ color: '#ccc', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
      {text}
    </p>
  );
};

const Catalog: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('TODOS');
  const [page, setPage] = useState(1);

  // Hook que ya está apuntando a "clothes" en el backend
  const { products, loading, error, totalPages, totalProducts } = useFetchProducts({
    page,
    q: query,
    category,
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0); // Para controlar qué foto se ve en el modal
  
  // Categorías de ropa
  const categories = [
    'TODOS', 'CAMISA', 'CHAMARRA', 'PANTALON', 'PLAYERA', 'ACCESORIO'
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (producto: Product) => {
    setSelectedProduct(producto);
    setActiveImageIndex(0); // Reinicia la imagen al abrir otra prenda
  };

  return (
    // CAMBIO AQUI: w-screen y m-0 para asegurar el ancho total
    <section className="w-screen m-0 overflow-x-hidden" style={styles.container}>
      
      {/* Cabecera del Catálogo */}
      <div style={styles.header}>
        <div style={styles.accentLine}></div>
        <h2 style={styles.title}>NUESTRO CATÁLOGO</h2>
        <p style={styles.subtitle}>
          Explora la colección completa. 
          Ropa americana 100% original, importada y seleccionada cuidadosamente.
        </p>
      </div>

      {/* Panel de Controles */}
      <div style={styles.controlsCard}>
        <div style={styles.searchWrapper}>
          <SearchBar
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
          />
        </div>

        <div style={styles.categoriesWrapper}>
          {categories.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
                style={{
                  ...styles.categoryButton,
                  backgroundColor: isActive ? '#fff' : 'transparent',
                  color: isActive ? '#000' : '#888',
                  borderColor: isActive ? '#fff' : '#444',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {loading && (
        <div style={styles.statusMessage}>
          <div style={styles.spinner}></div>
          <p>Cargando nuestro catálogo...</p>
        </div>
      )}
      
      {error && (
        <div style={styles.errorMessage}>
          <span style={{ fontWeight: 'bold' }}>¡Ups! Ha ocurrido un error:</span> {error}
        </div>
      )}

      {/* Lista de Productos */}
      {/* CAMBIO AQUI: Contenedor con max-width para centrar el grid y evitar que se pegue a la izquierda */}
      {!loading && !error && (
        <div style={styles.productSection}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <ProductList 
              products={products as Product[]} 
              onProductClick={handleProductClick} 
            />
          </div>
        </div>
      )}

      {/* Controles de Paginación */}
      {!loading && !error && totalProducts > 0 && (
        <div style={styles.paginationContainer}>
          <div style={styles.paginationInfo}>
            Mostrando <span style={styles.highlightText}>{products?.length ?? 0}</span> de <span style={styles.highlightText}>{totalProducts ?? 0}</span> prendas
          </div>

          {totalPages > 1 && (
            <div style={styles.paginationControls}>
              <button
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  scrollToTop();
                }}
                disabled={page === 1}
                style={{
                  ...styles.pageButton,
                  opacity: page === 1 ? 0.3 : 1,
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Anterior
              </button>

              <div style={styles.pageIndicator}>
                Página <span style={{ fontWeight: 700, color: '#fff' }}>{page}</span> de {totalPages}
              </div>

              <button
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1));
                  scrollToTop();
                }}
                disabled={page === totalPages}
                style={{
                  ...styles.pageButton,
                  opacity: page === totalPages ? 0.3 : 1,
                  cursor: page === totalPages ? 'not-allowed' : 'pointer',
                }}
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      )}

      {/* =========================================
          MODAL (VENTANA FLOTANTE DE DETALLES)
          ========================================= */}
      {selectedProduct && (
        <div style={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={() => setSelectedProduct(null)}>✕</button>
            
            <div style={styles.modalGrid}>
              
              {/* Columna Izquierda: Galería de Imágenes */}
              <div style={styles.modalGalleryContainer}>
                {/* Imagen Principal */}
                <div style={styles.modalImageWrapper}>
                  {selectedProduct.image_urls && selectedProduct.image_urls.length > 0 ? (
                    <img 
                      src={selectedProduct.image_urls[activeImageIndex]} 
                      alt={selectedProduct.name} 
                      style={styles.modalImage} 
                    />
                  ) : (
                    <div style={{ color: '#666', fontWeight: 600 }}>Sin Imagen</div>
                  )}
                </div>

                {/* Miniaturas de la Galería (Solo se muestran si hay más de 1 imagen) */}
                {selectedProduct.image_urls && selectedProduct.image_urls.length > 1 && (
                  <div style={styles.thumbnailContainer}>
                    {selectedProduct.image_urls.map((url, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setActiveImageIndex(idx)}
                        style={{
                          ...styles.thumbnail,
                          borderColor: activeImageIndex === idx ? '#fff' : 'transparent',
                          opacity: activeImageIndex === idx ? 1 : 0.5,
                        }}
                      >
                        <img src={url} alt={`Miniatura ${idx}`} style={styles.thumbnailImg} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Columna Derecha: Detalles */}
              <div style={styles.modalDetails}>
                <span style={styles.modalCategory}>{selectedProduct.category}</span>
                <h2 style={styles.modalTitle}>{selectedProduct.name}</h2>
                
                {selectedProduct.price > 0 && (
                  <p style={styles.modalPrice}>${selectedProduct.price?.toFixed(2)} MXN</p>
                )}
                
                {formatTechnicalDescription(selectedProduct.description)}

                {/* Especificaciones Extras (Talla, Color) */}
                <div style={styles.specsContainer}>
                  {selectedProduct.size && (
                    <div style={styles.specItem}>
                      <span style={styles.specLabel}>Talla</span>
                      <span style={styles.specValue}>{selectedProduct.size}</span>
                    </div>
                  )}
                  {selectedProduct.color && (
                    <div style={styles.specItem}>
                      <span style={styles.specLabel}>Color</span>
                      <span style={styles.specValue}>{selectedProduct.color}</span>
                    </div>
                  )}
                </div>

                <a href="#contacto" style={styles.modalButton}>
                  CONTACTAR PARA COMPRAR
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Objeto de estilos adaptado al tema oscuro de Fortress Bazar
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '8rem 2rem 4rem 2rem', // Padding top extra para compensar el header fixed
    // CAMBIO AQUI: Se eliminó el maxWidth de aquí para que el fondo cubra todo
    fontFamily: '"Inter", sans-serif',
    backgroundColor: '#111111',
    color: '#e5e5e5',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  accentLine: {
    width: '60px',
    height: '4px',
    backgroundColor: '#ffffff',
    marginBottom: '1.5rem',
  },
  title: {
    fontFamily: '"Anton", sans-serif',
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    color: '#ffffff',
    margin: '0 0 1rem 0',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#999',
    maxWidth: '600px',
    lineHeight: 1.6,
    margin: 0,
  },
  controlsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: '16px',
    padding: '2rem',
    border: '1px solid #333',
    marginBottom: '3rem',
    maxWidth: '1200px', // Añadimos maxWidth aquí
    margin: '0 auto 3rem auto', // y margin auto para centrarlo
  },
  searchWrapper: {
    maxWidth: '600px',
    margin: '0 auto 2rem auto',
  },
  categoriesWrapper: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryButton: {
    padding: '0.5rem 1.25rem',
    borderRadius: '9999px',
    border: '1px solid',
    fontSize: '0.875rem',
    fontWeight: 600,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  productSection: {
    minHeight: '400px',
    padding: '0 1rem', // Pequeño padding lateral para que las cards no toquen el borde en móviles
  },
  statusMessage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 0',
    color: '#888',
    fontSize: '1.125rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #333',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem',
  },
  errorMessage: {
    backgroundColor: '#3b0000',
    color: '#ffb3b3',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    border: '1px solid #ff4444',
    textAlign: 'center',
    margin: '2rem auto', // Centramos el mensaje de error
    maxWidth: '800px',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4rem',
    paddingTop: '2rem',
    borderTop: '1px solid #333',
    flexWrap: 'wrap',
    gap: '1.5rem',
    maxWidth: '1200px', // Centramos la paginación también
    margin: '4rem auto 0 auto',
  },
  paginationInfo: {
    fontSize: '0.95rem',
    color: '#888',
  },
  highlightText: {
    fontWeight: 700,
    color: '#fff',
  },
  paginationControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  pageButton: {
    padding: '0.5rem 1.25rem',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#222',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.9rem',
    transition: 'all 0.2s',
  },
  pageIndicator: {
    fontSize: '0.95rem',
    color: '#888',
    minWidth: '100px',
    textAlign: 'center',
  },

  /* --- MODAL FLOTANTE OSCURO --- */
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '1rem',
    boxSizing: 'border-box',
    backdropFilter: 'blur(8px)',
  },
  modalContent: {
    backgroundColor: '#111',
    borderRadius: '16px',
    maxWidth: '1050px', 
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    border: '1px solid #333',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: '#222',
    border: '1px solid #444',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: '#fff',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'background-color 0.2s',
  },
  modalGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2.5rem',
    padding: '2.5rem',
  },
  modalGalleryContainer: {
    flex: '1 1 350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  modalImageWrapper: {
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    border: '1px solid #333',
  },
  modalImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '500px',
    objectFit: 'contain',
  },
  thumbnailContainer: {
    display: 'flex',
    gap: '0.5rem',
    overflowX: 'auto',
    paddingBottom: '0.5rem',
  },
  thumbnail: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    border: '2px solid',
    overflow: 'hidden',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'all 0.2s',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  modalDetails: {
    flex: '2 1 450px', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalCategory: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#888',
    letterSpacing: '2px',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
  },
  modalTitle: {
    fontFamily: '"Anton", sans-serif',
    fontSize: '2.5rem',
    color: '#fff',
    marginBottom: '0.5rem',
    lineHeight: 1.1,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  modalPrice: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '1.5rem',
  },
  specsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: '1.5rem',
    marginBottom: '2.5rem',
    backgroundColor: '#1a1a1a',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #333',
  },
  specItem: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #333',
    paddingBottom: '0.5rem',
  },
  specLabel: {
    fontWeight: 600,
    color: '#aaa',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
  },
  specValue: {
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#fff', 
    color: '#000',
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: 800,
    textDecoration: 'none',
    transition: 'transform 0.2s',
    marginTop: 'auto',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
};

export default Catalog;