import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
// Asegúrate de tener tu logo en esta ruta o actualízala
import logo from '../images/logo.png'; 

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  // Efecto para cambiar el fondo al hacer scroll (opcional pero recomendado para el diseño oscuro)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] font-['Inter']">
      <header
        className={`flex justify-between items-center px-6 sm:px-12 py-4 transition-all duration-300 ${
          scrolled ? 'bg-[#111111]/90 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/10' : 'bg-transparent'
        }`}
      >
        {/* Logo y Nombre de Marca */}
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <img
            src={logo}
            alt="Logo Fortress Bazar"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border border-white/20 transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-['Anton'] text-2xl sm:text-3xl text-white tracking-wide uppercase leading-none">
              Fortress
            </span>
            <span className="text-[10px] sm:text-xs text-neutral-400 font-semibold tracking-[0.2em] uppercase mt-1">
              Bazar Americano
            </span>
          </div>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden sm:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-semibold uppercase tracking-wider transition-colors ${
                isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `text-sm font-semibold uppercase tracking-wider transition-colors ${
                isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`
            }
          >
            Catálogo
          </NavLink>

          <Link
            to="/ubicacion" // Adaptado a la temática del negocio (Puntos de entrega/Ubicación)
            className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-neutral-200 transition-colors transform hover:scale-105 active:scale-95"
          >
            Visítanos
          </Link>
        </nav>
      </header>

      {/* Desvanecido inferior (Gradiente oscuro) */}
      <div className="h-4 bg-gradient-to-b from-[#111111]/40 to-transparent pointer-events-none" />
    </div>
  );
};

export default Header;