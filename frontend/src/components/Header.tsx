import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className="fixed top-0 left-0 w-full z-[100] transition-colors duration-300" 
      style={{ 
        backgroundColor: isMenuOpen ? '#111111' : 'rgba(17, 17, 17, 0.8)', 
        backdropFilter: 'blur(10px)' 
      }}
    >
      <div className="w-full px-6 md:px-12 py-5 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-4" onClick={closeMenu}>
          <img 
            src="/images/logo.png" 
            alt="Fortress Logo" 
            className="w-[42px] h-[42px] object-contain"
          />
          <div className="flex flex-col">
            <span className="text-white font-['Anton'] text-2xl tracking-[0.02em] uppercase leading-none">
              FORTRESS
            </span>
            <span className="text-white/60 text-[0.65rem] font-['Inter'] tracking-[0.2em] uppercase font-bold mt-1">
              Bazar Americano
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-white text-[0.85rem] font-bold tracking-wider hover:text-white/70 transition-colors"
          >
            INICIO
          </Link>
          <Link 
            to="/catalog" 
            className="text-white text-[0.85rem] font-bold tracking-wider hover:text-white/70 transition-colors"
          >
            CATÁLOGO
          </Link>
          <a 
            href="#contacto" 
            className="bg-white text-black px-6 py-2.5 rounded-full text-[0.85rem] font-extrabold tracking-wider hover:bg-gray-200 transition-colors ml-2"
          >
            VISÍTANOS
          </a>
        </nav>

        <button 
          className="md:hidden text-white p-1 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div 
        className={`md:hidden bg-[#111111] overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-64 border-t border-white/10' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-6">
          <Link 
            to="/" 
            onClick={closeMenu} 
            className="text-white text-sm font-bold tracking-wider"
          >
            INICIO
          </Link>
          <Link 
            to="/catalog" 
            onClick={closeMenu} 
            className="text-white text-sm font-bold tracking-wider"
          >
            CATÁLOGO
          </Link>
          <a 
            href="#contacto" 
            onClick={closeMenu} 
            className="bg-white text-black text-center px-6 py-3 mt-2 rounded-full text-sm font-extrabold tracking-wider"
          >
            VISÍTANOS
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;