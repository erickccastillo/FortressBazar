import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Imágenes desde la carpeta local 'images' y colores solicitados
const IMAGES = [
  { src: '../images/ropa-1.jpg', bg: '#1E293B', panel: '#334155' }, // Azul marino oscuro
  { src: '../images/ropa-2.jpg', bg: '#3F2E3E', panel: '#5c435a' }, // Borgoña / Vino
  { src: '../images/ropa-3.jpg', bg: '#2A3B32', panel: '#3f574a' }, // Verde bosque oscuro
  { src: '../images/ropa-4.jpg', bg: '#27272A', panel: '#3f3f46' }, // Gris carbón
];

// SVG codificado para el efecto de grano (Grain overlay)
const grainSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E`;

export default function BazarHome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Precargar imágenes y detectar tamaño de pantalla al montar
  useEffect(() => {
    // Carga de imágenes
    IMAGES.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });

    // Detectar si es móvil
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    handleResize(); // Chequeo inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => {
      if (direction === 'next') return (prev + 1) % 4;
      return (prev + 3) % 4; // Equivalente a (prev - 1) pero seguro para negativos
    });

    // Liberar el candado de animación después de 650ms
    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  }, [isAnimating]);

  // Función para determinar los estilos en base al rol que juega la imagen actual
  const getItemStyle = (index: number) => {
    let role = '';
    if (index === activeIndex) role = 'center';
    else if (index === (activeIndex + 3) % 4) role = 'left';
    else if (index === (activeIndex + 1) % 4) role = 'right';
    else if (index === (activeIndex + 2) % 4) role = 'back';

    const baseTransition = 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1)';

    switch (role) {
      case 'center':
        return {
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          left: '50%',
          height: isMobile ? '60%' : '92%',
          bottom: isMobile ? '22%' : '0',
          transition: baseTransition,
          willChange: 'transform, filter, opacity',
        };
      case 'left':
        return {
          transform: `translateX(-50%) scale(1)`,
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '20%' : '30%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
          transition: baseTransition,
          willChange: 'transform, filter, opacity',
        };
      case 'right':
        return {
          transform: `translateX(-50%) scale(1)`,
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '80%' : '70%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
          transition: baseTransition,
          willChange: 'transform, filter, opacity',
        };
      case 'back':
        return {
          transform: `translateX(-50%) scale(1)`,
          filter: 'blur(4px)',
          opacity: 1,
          zIndex: 5,
          left: '50%',
          height: isMobile ? '13%' : '22%',
          bottom: isMobile ? '32%' : '12%',
          transition: baseTransition,
          willChange: 'transform, filter, opacity',
        };
      default:
        return {};
    }
  };

  return (
    <>
      {/* Importar fuentes requeridas si no están en el HTML padre */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      {/* Contenedor Exterior Principal */}
      <div 
        className="relative w-full overflow-hidden"
        style={{ 
          backgroundColor: IMAGES[activeIndex].bg,
          transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <div className="relative w-full h-screen overflow-hidden">
          
          {/* 1. Grain overlay */}
          <div 
            className="absolute inset-0 pointer-events-none z-50 opacity-40"
            style={{ 
              backgroundImage: `url("${grainSvg}")`,
              backgroundSize: '200px 200px',
              backgroundRepeat: 'repeat'
            }}
          />

          {/* 2. Giant ghost text "FORTRESS" */}
          <div 
            className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-10 text-white uppercase whitespace-nowrap"
            style={{ 
              top: '18%', 
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(90px, 28vw, 380px)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.02em'
            }}
          >
            FORTRESS
          </div>

          {/* 3. Top-left brand label */}
          <div className="absolute top-6 left-4 sm:left-8 z-[60] text-xs font-semibold uppercase text-white opacity-90 tracking-[0.18em]">
            FORTRESS BAZAR
          </div>

          {/* 4. Carousel */}
          <div className="absolute inset-0 z-30">
            {IMAGES.map((img, index) => (
              <div 
                key={index} 
                className="absolute aspect-[0.6/1]"
                style={getItemStyle(index)}
              >
                <img 
                  src={img.src} 
                  alt={`Prenda Fortress ${index + 1}`} 
                  draggable={false}
                  className="w-full h-full object-cover object-center rounded-2xl shadow-2xl select-none border border-white/10"
                />
              </div>
            ))}
          </div>

          {/* 5. Bottom-left text + nav buttons */}
          <div className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 z-[60] max-w-[320px]">
            <p className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px] text-white opacity-95" style={{ letterSpacing: '0.02em' }}>
              ROPA AMERICANA
            </p>
            <p className="hidden sm:block text-sm text-white opacity-85 leading-[1.6] mb-5">
              Estilo auténtico y marcas originales a precios que no podrás creer. Seleccionamos cuidadosamente lo mejor de la moda americana para ti. Descubre tu nuevo outfit favorito hoy mismo.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('prev')}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-transparent border-2 border-white text-white flex items-center justify-center transition-all duration-150 ease-in-out hover:scale-105 hover:bg-white/10"
                aria-label="Anterior"
              >
                <ArrowLeft size={26} strokeWidth={2.25} />
              </button>
              <button 
                onClick={() => navigate('next')}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-transparent border-2 border-white text-white flex items-center justify-center transition-all duration-150 ease-in-out hover:scale-105 hover:bg-white/10"
                aria-label="Siguiente"
              >
                <ArrowRight size={26} strokeWidth={2.25} />
              </button>
            </div>
          </div>

          {/* 6. Bottom-right link */}
          <div className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 z-[60]">
            <a 
              href="#nosotros" 
              className="flex items-center gap-2 sm:gap-4 text-white opacity-95 hover:opacity-100 transition-opacity duration-200 uppercase no-underline cursor-pointer group"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(20px, 4vw, 56px)',
                letterSpacing: '-0.02em',
                lineHeight: 1
              }}
            >
              CONÓCENOS
              <ArrowRight 
                className="w-5 h-5 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-2" 
                strokeWidth={2.25} 
              />
            </a>
          </div>

        </div>
      </div>

      {/* Sección "Sobre Nosotros" */}
      <section id="nosotros" className="w-full bg-[#111111] text-neutral-300 py-24 px-6 sm:px-12 lg:px-24 font-['Inter']">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Columna Izquierda: Historia */}
          <div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-white mb-6" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '-0.02em' }}>
              NUESTRA ESENCIA
            </h2>
            <div className="w-24 h-1.5 bg-white mb-10"></div>
            
            <p className="text-xl sm:text-2xl leading-relaxed mb-6 font-medium text-white/95">
              En <span className="font-bold text-white">Fortress Bazar</span> rompemos las reglas del retail tradicional. Traemos la mejor ropa americana directamente a tus manos.
            </p>
            
            <p className="text-base sm:text-lg leading-relaxed mb-8 opacity-80">
              Nos especializamos en prendas 100% originales, con un enfoque implacable en calidad y estilo. Mantenemos nuestros precios bajos para que vestir increíble no sea un lujo inalcanzable, sino tu estilo de vida de todos los días.
            </p>
            
            <p className="text-base sm:text-lg font-bold text-white opacity-90 uppercase tracking-wide">
              Marcas Originales • Calidad Importada • Precios Justos
            </p>
          </div>

          {/* Columna Derecha: Logística y Entregas */}
          <div className="bg-[#1a1a1a] p-8 sm:p-12 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
            {/* Elemento de diseño de fondo */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-widest text-sm opacity-90">
              Puntos de Entrega Seguros
            </h3>
            
            <ul className="space-y-8 relative z-10">
              <li className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Tren Ligero GDL</h4>
                  <p className="text-base opacity-75 leading-relaxed">
                    Hacemos entregas personales y completamente seguras en las distintas estaciones de la Zona Metropolitana de Guadalajara. Comodidad en tu ruta.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Sucursales Casa Blanca</h4>
                  <p className="text-base opacity-75 leading-relaxed">
                    Visítanos y recoge tus prendas favoritas directamente en nuestras sucursales físicas ubicadas en Casa Blanca. ¡Ven y descubre lo que acaba de llegar!
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </section>
    </>
  );
}