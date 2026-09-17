import React from 'react';
import type { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductClick }) => {
  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: '#888', backgroundColor: '#1a1a1a', borderRadius: '12px', border: '1px dashed #333' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>No encontramos prendas con estos filtros.</p>
        <p style={{ fontSize: '0.9rem' }}>Intenta buscando con otro término o selecciona "TODOS".</p>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      /* Ajustamos ligeramente el minmax para que las tarjetas de ropa se vean bien proporcionadas */
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
      gap: '2.5rem' 
    }}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={() => {
            if (onProductClick) {
              onProductClick(product);
            }
          }} 
        />
      ))}
    </div>
  );
};

export default ProductList;