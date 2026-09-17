import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] border-t border-white/10 py-8 px-6 sm:px-12 font-['Inter'] mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Derechos y Nombre */}
        <div className="text-center sm:text-left text-neutral-400 text-sm">
          © {new Date().getFullYear()} <span className="font-bold text-white tracking-wide uppercase">Fortress Bazar</span>. Todos los derechos reservados.
        </div>

        {/* Eslogan o Enlaces extra */}
        <div className="text-center sm:text-right text-neutral-500 text-xs font-semibold tracking-[0.15em] uppercase">
          Estilo Auténtico. Precios Increíbles.
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;