import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchProducts } from '../hooks/useFetchProducts';
import SearchBar from '../components/SearchBar';

const AdminDashboard: React.FC = () => {
  const [query, setQuery] = useState('');
  
  // Reutilizamos tu hook del catálogo. Recuerda que aunque diga "Products", 
  // por dentro tu backend ya está apuntando a la tabla 'clothes'.
  const { products, loading, error } = useFetchProducts({
    page: 1,
    q: query,
    category: 'TODOS',
  });

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  };

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#eee', paddingBottom: '3rem' }}>
      <div style={{ padding: '2rem', paddingTop: '120px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header del Dashboard */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontFamily: 'Anton', fontSize: '2.5rem', color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Inventario Fortress
          </h2>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link 
              to="/admin/new" 
              style={{ 
                backgroundColor: '#fff', color: '#000', padding: '0.75rem 1.5rem', 
                borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold',
                textTransform: 'uppercase', fontSize: '0.9rem'
              }}
            >
              + Nueva Prenda
            </Link>
            
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                color: "#ff4444",
                border: "1px solid #ff4444",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
                cursor: "pointer",
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '0.9rem'
              }}
            >
              Salir
            </button> 
          </div>
        </div>

        {/* Buscador */}
        <div style={{ marginBottom: '2rem', maxWidth: '500px' }}>
          <SearchBar 
            value={query} 
            onChange={(v) => setQuery(v)} 
          />
          <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '8px' }}>
            Escribe el nombre de la prenda para buscarla rápidamente.
          </p>
        </div>

        {loading && <p style={{ color: '#fff' }}>Cargando inventario...</p>}
        {error && <p style={{ color: '#ff4444' }}>Error: {error}</p>}

        {/* Tabla de Productos adaptada a ropa */}
        {!loading && !error && (
          <div style={{ overflowX: 'auto', backgroundColor: '#1a1a1a', borderRadius: '12px', border: '1px solid #333' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#222', borderBottom: '1px solid #444', color: '#aaa', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <th style={{ padding: '1.2rem 1rem' }}>Foto</th>
                  <th style={{ padding: '1.2rem 1rem' }}>Prenda</th>
                  <th style={{ padding: '1.2rem 1rem' }}>Categoría</th>
                  <th style={{ padding: '1.2rem 1rem' }}>Talla</th>
                  <th style={{ padding: '1.2rem 1rem' }}>Color</th>
                  <th style={{ padding: '1.2rem 1rem' }}>Precio</th>
                  <th style={{ padding: '1.2rem 1rem', textAlign: 'center' }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>
                      No se encontraron prendas en el inventario.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} style={{ borderBottom: '1px solid #333', transition: 'background 0.2s' }}>
                      <td style={{ padding: '1rem' }}>
                        {/* Mostrar la primera imagen del arreglo image_urls, o una por defecto si no hay */}
                        <img 
                          src={product.image_urls && product.image_urls.length > 0 ? product.image_urls[0] : 'https://placehold.co/100x100/222/ccc?text=No+Foto'} 
                          alt={product.name} 
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #444' }} 
                        />
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 'bold', color: '#fff' }}>{product.name}</td>
                      <td style={{ padding: '1rem', color: '#aaa' }}>{product.category}</td>
                      <td style={{ padding: '1rem', fontWeight: 'bold' }}>{product.size || '-'}</td>
                      <td style={{ padding: '1rem' }}>{product.color || '-'}</td>
                      <td style={{ padding: '1rem', color: '#fff', fontWeight: 'bold' }}>${product.price}</td>
                      <td style={{ padding: '1rem', textAlign: 'center', verticalAlign: 'middle' }}>
                        <Link
                          to={`/admin/edit/${product.id}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            color: '#000',
                            padding: '0.5rem 1.2rem',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase'
                          }}
                        >
                          Editar 
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;