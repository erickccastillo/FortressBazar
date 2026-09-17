import React, { useState } from 'react';
import type { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.card,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 12px 20px -8px rgba(0,0,0,0.5)' 
          : '0 4px 10px rgba(0,0,0,0.2)'
      }}
    >
      {/* Contenedor de Imagen */}
      <div style={styles.imageWrapper}>
        {/* Mostrar la primera imagen del arreglo si existe */}
        {product.image_urls && product.image_urls.length > 0 ? (
          <img src={product.image_urls[0]} alt={product.name} style={{...styles.image, transform: isHovered ? 'scale(1.05)' : 'scale(1)'}} />
        ) : (
          <div style={styles.noImage}>Sin Imagen</div>
        )}
        
        {/* Etiqueta flotante de categoría */}
        {product.category && (
          <div style={styles.categoryTag}>{product.category}</div>
        )}

        {/* Etiqueta flotante de Talla (Nuevo para ropa) */}
        {product.size && (
          <div style={styles.sizeTag}>{product.size}</div>
        )}
      </div>

      {/* Detalles del Producto */}
      <div style={styles.cardBody}>
        <h3 style={styles.title}>{product.name}</h3>
        
        <div style={styles.footerInfo}>
          {/* Color (si existe) */}
          {product.color && (
            <span style={styles.colorText}>{product.color}</span>
          )}

          {/* Precio (si existe) */}
          {product.price > 0 && (
            <p style={styles.price}>${product.price.toFixed(2)} MXN</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- ESTILOS DE LA TARJETA ADAPTADOS A ROPA / STREETWEAR ---
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: '#1a1a1a', // Fondo oscuro
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #333', // Borde oscuro
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  imageWrapper: {
    width: '100%',
    height: '320px', // Aumentamos la altura porque la ropa suele verse mejor en formato retrato
    backgroundColor: '#111',
    position: 'relative',
    overflow: 'hidden', // Necesario para el efecto de zoom en hover
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease', // Zoom suave al pasar el mouse
  },
  noImage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  categoryTag: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#000',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 800,
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  sizeTag: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    border: '1px solid #fff',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 700,
  },
  cardBody: {
    padding: '1.25rem',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 1rem 0',
    lineHeight: 1.4,
    fontFamily: '"Inter", sans-serif',
  },
  footerInfo: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  colorText: {
    fontSize: '0.85rem',
    color: '#888',
    textTransform: 'capitalize',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 800,
    color: '#fff',
    margin: 0,
  },
};

export default ProductCard;