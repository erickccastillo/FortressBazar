import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import AdminDashboard from './pages/AdminDashboard'; // <-- Importamos el nuevo panel
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
    <div className="app-root">
      <Header />
      <main className="container">
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/quote" element={<Quote />} />
          
          {/* NUEVAS RUTAS DE ADMINISTRADOR */}
          {/* 1. La tabla principal con buscador */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> 
          <Route path="/admin/new" element={<ProtectedRoute><AdminProductForm /></ProtectedRoute>}/>
          <Route path="/admin/edit/:id"element={<ProtectedRoute><AdminProductForm /></ProtectedRoute> } />
          
          
          <Route path="*" element={<NotFound />} />

          
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
