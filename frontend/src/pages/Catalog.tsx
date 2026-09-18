import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import { useFetchProducts } from '../hooks/useFetchProducts';
import type { Product } from '../types/Product';

const formatTechnicalDescription = (text?: string) => {
  if (!text) return <p className="text-gray-400">Sin descripción.</p>;
  return (
    <p className="text-gray-300 text-[0.95rem] m-0 leading-relaxed">
      {text}
    </p>
  );
};

const Catalog: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('TODOS');
  const [page, setPage] = useState(1);

  const { products, loading, error, totalPages, totalProducts } = useFetchProducts({
    page,
    q: query,
    category,
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0); 
  
  const categories = [
    'TODOS', 'CAMISA', 'CHAMARRA', 'PANTALON', 'PLAYERA', 'ACCESORIO'
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (producto: Product) => {
    setSelectedProduct(producto);
    setActiveImageIndex(0); 
  };

  return (
    <section className="w-screen min-h-screen m-0 overflow-x-hidden bg-[#111111] text-[#e5e5e5] font-['Inter'] px-4 py-24 md:px-8 md:pt-32 md:pb-16">
      
      {/* Cabecera del Catálogo */}
      <div className="text-center mb-10 md:mb-12 flex flex-col items-center">
        <div className="w-[60px] h-1 bg-white mb-6"></div>
        <h2 className="font-['Anton'] text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-wide uppercase">
          NUESTRO CATÁLOGO
        </h2>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed mx-auto px-4">
          Explora la colección completa. 
          Ropa americana 100% original, importada y seleccionada cuidadosamente.
        </p>
      </div>

      {/* Panel de Controles */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 md:p-8 border border-[#333] mb-8 md:mb-12 max-w-7xl mx-auto shadow-lg">
        <div className="max-w-2xl mx-auto mb-6 md:mb-8">
          <SearchBar
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
          {categories.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
                className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full border text-[0.8rem] md:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-white text-black border-white shadow-md' 
                    : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400 text-lg">
          <div className="w-10 h-10 border-4 border-[#333] border-t-white rounded-full animate-spin mb-4"></div>
          <p>Cargando nuestro catálogo...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-[#3b0000] text-[#ffb3b3] p-4 md:p-6 rounded-lg border border-[#ff4444] text-center my-8 mx-auto max-w-3xl shadow-lg">
          <span className="font-bold block mb-1">¡Ups! Ha ocurrido un error:</span> {error}
        </div>
      )}

      {/* Lista de Productos */}
      {!loading && !error && (
        <div className="min-h-[400px]">
          <div className="max-w-7xl mx-auto">
            <ProductList 
              products={products as Product[]} 
              onProductClick={handleProductClick} 
            />
          </div>
        </div>
      )}

      {/* Controles de Paginación */}
      {!loading && !error && totalProducts > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 md:mt-16 pt-8 border-t border-[#333] gap-6 max-w-7xl mx-auto">
          <div className="text-sm md:text-base text-gray-400 text-center sm:text-left">
            Mostrando <span className="font-bold text-white">{products?.length ?? 0}</span> de <span className="font-bold text-white">{totalProducts ?? 0}</span> prendas
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  scrollToTop();
                }}
                disabled={page === 1}
                className={`px-4 py-2 md:px-5 md:py-2.5 rounded-lg border border-[#444] bg-[#222] text-white font-semibold text-sm md:text-base transition-all ${
                  page === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#333] cursor-pointer'
                }`}
              >
                ← Anterior
              </button>

              <div className="text-sm md:text-base text-gray-400 min-w-[80px] md:min-w-[100px] text-center">
                <span className="font-bold text-white">{page}</span> / {totalPages}
              </div>

              <button
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1));
                  scrollToTop();
                }}
                disabled={page === totalPages}
                className={`px-4 py-2 md:px-5 md:py-2.5 rounded-lg border border-[#444] bg-[#222] text-white font-semibold text-sm md:text-base transition-all ${
                  page === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#333] cursor-pointer'
                }`}
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODAL (VENTANA FLOTANTE DE DETALLES) */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 w-screen h-screen bg-black/90 flex items-center justify-center z-[9999] p-4 box-border backdrop-blur-sm overflow-hidden"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-[#111] rounded-2xl w-full max-w-[1050px] max-h-[95vh] overflow-y-auto relative border border-[#333] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-3 right-3 md:top-4 md:right-4 bg-[#222] border border-[#444] rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white text-lg hover:bg-[#333] transition-colors z-10 shadow-lg"
              onClick={() => setSelectedProduct(null)}
              aria-label="Cerrar detalles"
            >
              ✕
            </button>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-5 pt-12 md:p-10">
              
              {/* Columna Izquierda: Galería de Imágenes */}
              <div className="w-full md:w-[45%] flex flex-col gap-4">
                <div className="bg-[#1a1a1a] rounded-xl overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-[400px] border border-[#333]">
                  {selectedProduct.image_urls && selectedProduct.image_urls.length > 0 ? (
                    <img 
                      src={selectedProduct.image_urls[activeImageIndex]} 
                      alt={selectedProduct.name} 
                      className="w-full h-auto max-h-[400px] md:max-h-[500px] object-contain"
                    />
                  ) : (
                    <div className="text-gray-500 font-semibold">Sin Imagen</div>
                  )}
                </div>

                {selectedProduct.image_urls && selectedProduct.image_urls.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {selectedProduct.image_urls.map((url, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-lg border-2 overflow-hidden cursor-pointer shrink-0 transition-all ${
                          activeImageIndex === idx ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                        }`}
                      >
                        <img src={url} alt={`Miniatura ${idx}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Columna Derecha: Detalles */}
              <div className="w-full md:w-[55%] flex flex-col justify-center">
                <span className="text-[0.75rem] md:text-[0.85rem] font-bold text-gray-400 tracking-[0.15em] mb-2 uppercase">
                  {selectedProduct.category}
                </span>
                
                <h2 className="font-['Anton'] text-3xl md:text-4xl lg:text-5xl text-white mb-2 leading-tight uppercase tracking-wide">
                  {selectedProduct.name}
                </h2>
                
                {selectedProduct.price > 0 && (
                  <p className="text-2xl md:text-3xl font-bold text-white mb-6">
                    ${selectedProduct.price?.toFixed(2)} MXN
                  </p>
                )}
                
                <div className="mb-6">
                  {formatTechnicalDescription(selectedProduct.description)}
                </div>

                <div className="flex flex-col gap-3 mt-auto mb-8 bg-[#1a1a1a] p-5 rounded-xl border border-[#333]">
                  {selectedProduct.size && (
                    <div className="flex justify-between items-center border-b border-[#333] pb-3 last:border-0 last:pb-0">
                      <span className="font-semibold text-gray-400 text-[0.85rem] md:text-sm uppercase">Talla</span>
                      <span className="text-white text-sm md:text-base font-bold bg-[#222] px-3 py-1 rounded border border-[#444]">{selectedProduct.size}</span>
                    </div>
                  )}
                  {selectedProduct.color && (
                    <div className="flex justify-between items-center border-b border-[#333] pb-3 last:border-0 last:pb-0">
                      <span className="font-semibold text-gray-400 text-[0.85rem] md:text-sm uppercase">Color</span>
                      <span className="text-white text-sm md:text-base font-bold capitalize">{selectedProduct.color}</span>
                    </div>
                  )}
                </div>

                {/* NO OLVIDES CAMBIAR EL NÚMERO DE WHATSAPP AQUÍ */}
                <a 
                  href={`https://wa.me/523318474292?text=Hola,%20me%20interesa%20comprar%20la%20prenda:%20${encodeURIComponent(selectedProduct.name)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white text-black py-4 px-6 rounded-xl text-center font-extrabold transition-transform duration-200 hover:scale-[1.02] uppercase tracking-wider text-sm md:text-base shadow-lg"
                >
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

export default Catalog;