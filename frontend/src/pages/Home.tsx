import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './Home.css';
import perryEllisImg from '../images/perryellis.png';
import bananaRepublicImg from '../images/bananarepublic.png';
import quicksilverImg from '../images/quicksilver.png';
import hurleyImg from '../images/hurley.png';

const IMAGES = [
  { src: perryEllisImg, bg: '#1E293B', panel: '#334155' },
  { src: bananaRepublicImg, bg: '#3F2E3E', panel: '#5c435a' },
  { src: quicksilverImg, bg: '#2A3B32', panel: '#3f574a' },
  { src: hurleyImg, bg: '#27272A', panel: '#3f3f46' },
];

const grainSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E`;

export default function BazarHome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    IMAGES.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => {
      if (direction === 'next') return (prev + 1) % 4;
      return (prev + 3) % 4;
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  }, [isAnimating]);

  const getItemStyle = (index: number) => {
    let role = '';
    if (index === activeIndex) role = 'center';
    else if (index === (activeIndex + 3) % 4) role = 'left';
    else if (index === (activeIndex + 1) % 4) role = 'right';
    else if (index === (activeIndex + 2) % 4) role = 'back';

    const baseTransition = 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), width 650ms cubic-bezier(0.4,0,0.2,1)';

    const getWidth = (roleName: string) => {
      if (roleName === 'center') return isMobile ? '85%' : isTablet ? '60%' : '50%';
      if (roleName === 'back') return isMobile ? '30%' : '20%';
      return isMobile ? '25%' : '20%'; 
    };

    const getHeight = (roleName: string) => {
      // MODIFICADO: En móvil hacemos el logo un poco más pequeño de alto para que no estorbe
      if (roleName === 'center') return isMobile ? '35%' : '50%';
      if (roleName === 'back') return isMobile ? '15%' : '20%';
      return isMobile ? '12%' : '18%'; 
    };

    const getBottom = (roleName: string) => {
      // MODIFICADO: Subimos considerablemente las imágenes en móvil para dejar espacio al texto inferior
      if (roleName === 'center') return isMobile ? '45%' : '15%'; 
      if (roleName === 'back') return isMobile ? '50%' : '18%';
      return isMobile ? '50%' : '18%';
    };

    const getLeft = (roleName: string) => {
      if (roleName === 'center' || roleName === 'back') return '50%';
      if (roleName === 'left') return isMobile ? '15%' : '20%';
      return isMobile ? '85%' : '80%'; 
    };

    switch (role) {
      case 'center':
        return {
          transform: `translateX(-50%)`, 
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          left: getLeft('center'),
          width: getWidth('center'),
          height: getHeight('center'),
          bottom: getBottom('center'),
          transition: baseTransition,
          willChange: 'transform, filter, opacity, width, height',
        };
      case 'left':
        return {
          transform: `translateX(-50%)`,
          filter: 'blur(4px)', 
          opacity: 0.6, 
          zIndex: 10,
          left: getLeft('left'),
          width: getWidth('left'),
          height: getHeight('left'),
          bottom: getBottom('left'),
          transition: baseTransition,
          willChange: 'transform, filter, opacity, width, height',
        };
      case 'right':
        return {
          transform: `translateX(-50%)`,
          filter: 'blur(4px)',
          opacity: 0.6,
          zIndex: 10,
          left: getLeft('right'),
          width: getWidth('right'),
          height: getHeight('right'),
          bottom: getBottom('right'),
          transition: baseTransition,
          willChange: 'transform, filter, opacity, width, height',
        };
      case 'back':
        return {
          transform: `translateX(-50%)`,
          filter: 'blur(8px)', 
          opacity: 0.3,
          zIndex: 5,
          left: getLeft('back'),
          width: getWidth('back'),
          height: getHeight('back'),
          bottom: getBottom('back'),
          transition: baseTransition,
          willChange: 'transform, filter, opacity, width, height',
        };
      default:
        return {};
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;900&display=swap');
      `}</style>

      {/* Hero Section */}
      <div 
        className="relative w-screen h-screen m-0 p-0 overflow-hidden"
        style={{ 
          backgroundColor: IMAGES[activeIndex].bg,
          transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div className="relative w-full h-full overflow-hidden">
          
          <div 
            className="absolute inset-0 pointer-events-none z-50 opacity-40 mix-blend-overlay"
            style={{ 
              backgroundImage: `url("${grainSvg}")`,
              backgroundSize: '200px 200px',
              backgroundRepeat: 'repeat'
            }}
          />

          {/* Gran Título de Fondo */}
          <div 
            className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-10 text-white/40 uppercase whitespace-nowrap opacity-80"
            style={{ 
              // MODIFICADO: Lo bajamos un poquito más en móvil para que no choque con el header ni el texto
              top: isMobile ? '25%' : '18%', 
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(50px, 15vw, 250px)',
              lineHeight: 1,
              letterSpacing: '0.05em',
              textShadow: '0 10px 20px rgba(0,0,0,0.3)'
            }}
          >
            FORTRESS
          </div>

          {/* Subtítulo Superior Izquierdo */}
          <div className="absolute top-28 md:top-28 left-6 md:left-12 z-[60] text-[10px] md:text-xs font-semibold uppercase text-white/90 tracking-[0.2em]">
            FORTRESS BAZAR
          </div>

          {/* Carrusel */}
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            {IMAGES.map((img, index) => (
              <div 
                key={index} 
                className="absolute flex items-center justify-center"
                style={getItemStyle(index)}
              >
                <img 
                  src={img.src} 
                  alt={`Logo Marca ${index + 1}`} 
                  draggable={false}
                  className="w-full h-full object-contain select-none drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
                />
              </div>
            ))}
          </div>

          {/* Textos y Controles Bottom Left */}
          {/* MODIFICADO: En móvil usamos bottom-32 (más arriba) para que no choque con "Conócenos" */}
          <div className="absolute bottom-32 left-6 md:bottom-20 md:left-24 z-[60] max-w-[280px] md:max-w-[320px]">
            <p className="font-['Anton'] uppercase tracking-wide mb-3 md:mb-4 text-3xl md:text-5xl text-white drop-shadow-lg leading-tight">
              ROPA <br className="hidden md:block"/> AMERICANA
            </p>
            <p className="hidden md:block text-sm text-white/90 font-['Inter'] leading-relaxed mb-6 font-medium">
              Estilo auténtico y marcas originales a precios que no podrás creer. Seleccionamos cuidadosamente lo mejor de la moda americana para ti.
            </p>
            
            <div className="flex gap-4 mt-2">
              <button 
                onClick={() => navigate('prev')}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/20 backdrop-blur-sm border border-white/40 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-white hover:text-black hover:border-white"
                aria-label="Anterior"
              >
                <ArrowLeft size={24} strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => navigate('next')}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/20 backdrop-blur-sm border border-white/40 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-white hover:text-black hover:border-white"
                aria-label="Siguiente"
              >
                <ArrowRight size={24} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Enlace "Conócenos" Bottom Right */}
          {/* MODIFICADO: En móvil usamos bottom-8 (hasta abajo) y lo alineamos a la derecha */}
          <div className="absolute bottom-8 right-6 md:bottom-20 md:right-16 z-[60]">
            <a 
              href="#nosotros" 
              className="flex items-center gap-2 md:gap-3 text-white hover:text-gray-200 transition-colors uppercase no-underline cursor-pointer group"
            >
              <span className="font-['Anton'] text-[1.3rem] md:text-5xl tracking-wide drop-shadow-lg">
                CONÓCENOS
              </span>
              <ArrowRight 
                className="w-6 h-6 md:w-12 md:h-12 transition-transform duration-300 group-hover:translate-x-3 drop-shadow-lg" 
                strokeWidth={2.5} 
              />
            </a>
          </div>

        </div>
      </div>

      {/* Sección "Nosotros" */}
      <section id="nosotros" className="w-screen bg-[#111111] text-neutral-300 py-24 md:py-32 px-6 md:px-16 lg:px-24 font-['Inter'] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="flex flex-col">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-['Anton'] uppercase text-white mb-6 tracking-wide">
              NUESTRA <br/> ESENCIA
            </h2>
            <div className="w-24 h-2 bg-white mb-10"></div>
            
            <p className="text-xl md:text-2xl leading-relaxed mb-6 font-semibold text-white">
              En <span className="font-bold underline decoration-2 underline-offset-4">Fortress Bazar</span> rompemos las reglas del retail tradicional. Traemos la mejor ropa americana directamente a tus manos.
            </p>
            
            <p className="text-base md:text-lg leading-relaxed mb-10 text-neutral-400 font-medium">
              Nos especializamos en prendas 100% originales, con un enfoque implacable en calidad y estilo. Mantenemos nuestros precios bajos para que vestir increíble no sea un lujo inalcanzable, sino tu estilo de vida de todos los días.
            </p>
            
            <div className="inline-flex flex-wrap gap-3">
              <span className="px-4 py-2 border border-white/20 rounded-full text-sm font-bold text-white uppercase tracking-wider">Marcas Originales</span>
              <span className="px-4 py-2 border border-white/20 rounded-full text-sm font-bold text-white uppercase tracking-wider">Calidad Importada</span>
              <span className="px-4 py-2 border border-white/20 rounded-full text-sm font-bold text-white uppercase tracking-wider">Precios Justos</span>
            </div>
          </div>

          <div className="bg-[#161616] p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity duration-500 group-hover:opacity-10">
              <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
              </svg>
            </div>

            <h3 className="text-2xl font-['Anton'] text-white mb-10 uppercase tracking-widest">
              Puntos de Entrega Seguros
            </h3>
            
            <ul className="space-y-10 relative z-10">
              <li className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center shrink-0 shadow-lg">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-3">Tren Ligero GDL</h4>
                  <p className="text-sm md:text-base text-neutral-400 font-medium leading-relaxed">
                    Hacemos entregas personales y completamente seguras en las distintas estaciones de la Zona Metropolitana de Guadalajara. Comodidad en tu ruta.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center shrink-0 shadow-lg">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-3">Sucursales Casa Blanca</h4>
                  <p className="text-sm md:text-base text-neutral-400 font-medium leading-relaxed">
                    Pide y recoge tus prendas favoritas directamente en las sucursales de Casa Blanca en la ZMG. ¡Navega y descubre lo que acaba de llegar!
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
