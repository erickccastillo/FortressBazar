import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import AdminDashboard from './pages/AdminDashboard'; 
import AdminProductForm from './pages/AdminProductForm'; 
import About from './pages/About'; 
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Quote from "./pages/Quote";
import NotFound from "./pages/NotFound";
import './App.css';

const App: React.FC = () => {
  return (
    // Aseguramos que la raíz ocupe todo el ancho sin márgenes
    <div className="w-full min-h-screen m-0 p-0 overflow-x-hidden flex flex-col bg-[#111111]">
      <Header />
      
      {/* 
        ¡AQUÍ ESTABA EL PROBLEMA! 
        Eliminamos className="container". Esa clase en Tailwind/CSS limita el ancho de la página.
        Ahora le decimos que ocupe todo el ancho disponible (w-full).
      */}
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/quote" element={<Quote />} />
          
          {/* RUTAS DE ADMINISTRADOR */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> 
          <Route path="/admin/new" element={<ProtectedRoute><AdminProductForm /></ProtectedRoute>}/>
          <Route path="/admin/edit/:id" element={<ProtectedRoute><AdminProductForm /></ProtectedRoute> } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;