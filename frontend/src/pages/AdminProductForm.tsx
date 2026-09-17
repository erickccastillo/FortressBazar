import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './AdminProductForm.css'; 

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AdminProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // Estados del formulario enfocados en Ropa
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('CAMISA');
  const [size, setSize] = useState('M'); // L, M, S
  const [color, setColor] = useState('');
  
  // Manejo de múltiples imágenes
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  
  const [uploading, setUploading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // Cargar datos si estamos editando
  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          const { data, error } = await supabase
            .from('clothes') // CAMBIO: Ahora apuntamos a la tabla 'clothes'
            .select('*')
            .eq('id', id)
            .single();
            
          if (error) throw error;

          if (data) {
            setName(data.name);
            setDescription(data.description || '');
            setPrice(data.price);
            setCategory(data.category);
            setSize(data.size || 'M');
            setColor(data.color || '');
            
            // Cargar imágenes existentes
            const urls = data.image_urls || [];
            setExistingImageUrls(urls);
            setPreviews(urls);
          }
        } catch (error) {
          console.error("Error al cargar prenda:", error);
          alert("No se pudo cargar la información de la prenda.");
        } finally {
          setLoadingData(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEditing]);

  // Manejar múltiples archivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
      
      // Crear previews para los archivos nuevos
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Remover una imagen (tanto de las nuevas seleccionadas como de las existentes)
  const removeImage = (indexToRemove: number) => {
    // Si el índice es menor a la cantidad de imágenes existentes, la removemos de las existentes
    if (indexToRemove < existingImageUrls.length) {
      setExistingImageUrls(prev => prev.filter((_, i) => i !== indexToRemove));
    } else {
      // Si es una imagen nueva, la removemos de los archivos pendientes a subir
      const fileIndex = indexToRemove - existingImageUrls.length;
      setFiles(prev => prev.filter((_, i) => i !== fileIndex));
    }
    // Siempre actualizamos los previews visuales
    setPreviews(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return alert('La descripción es obligatoria.');

    setUploading(true);
    try {
      let finalImageUrls = [...existingImageUrls];

      // Subir cada archivo nuevo a Supabase Storage
      if (files.length > 0) {
        for (const file of files) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
          const filePath = `clothes/${fileName}`; // Carpeta recomendada: clothes

          const { error: uploadError } = await supabase.storage
            .from('products') // Puedes usar el mismo bucket o crear uno 'clothes'
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(filePath);
            
          finalImageUrls.push(publicUrl);
        }
      }

      // Si no hay ninguna imagen, ponemos una por defecto
      if (finalImageUrls.length === 0) {
        finalImageUrls = ['[https://placehold.co/600x800/222222/cccccc?text=Sin+Foto](https://placehold.co/600x800/222222/cccccc?text=Sin+Foto)'];
      }

      const productData = {
        name,
        description,
        price: Number(price),
        category,
        size,
        color,
        image_urls: finalImageUrls, // Array de URLs
      };

      // Decidimos si creamos (POST) o actualizamos (PUT)
      // Asegúrate de que el backend ahora apunte a /api/clothes
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `${apiUrl}/api/clothes/${id}` : `${apiUrl}/api/clothes`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Error en el servidor al guardar.');

      alert(isEditing ? '✨ ¡Prenda actualizada!' : '✨ ¡Prenda publicada con éxito!');
      navigate('/admin');

    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Hubo un error al guardar la prenda. Intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  if (loadingData) {
    return <div style={{textAlign: 'center', marginTop: '5rem', color: '#fff'}}>Cargando información...</div>;
  }

  return (
    <div className="admin-container" style={{ background: '#111', minHeight: '100vh', color: '#eee', padding: '2rem' }}>
      
      <div className="admin-card" style={{ background: '#1a1a1a', padding: '2rem', borderRadius: '1rem', border: '1px solid #333', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <Link
            to="/admin"
            style={{ backgroundColor: '#fff', color: '#000', padding: '0.5rem 1rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}
          >
            ← Dashboard
          </Link>
        </div>
        
        <h2 style={{ fontFamily: 'Anton', fontSize: '2.5rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          {isEditing ? 'Editar Prenda' : 'Nueva Prenda'}
        </h2>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>
          {isEditing ? 'Modifica los detalles de esta prenda' : 'Agrega una nueva prenda al catálogo de Fortress Bazar'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="form-group">
            <label style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Nombre de la Prenda</label>
            <input 
              type="text" 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#222', border: '1px solid #444', color: '#fff' }}
              placeholder="Ej. Chamarra Vintage Levi's"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Descripción</label>
            <textarea 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#222', border: '1px solid #444', color: '#fff' }}
              placeholder="Condición de la prenda, detalles de tela..."
              rows={4}
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ flex: '1 1 200px' }}>
              <label style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Precio ($)</label>
              <input 
                type="number" 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#222', border: '1px solid #444', color: '#fff' }}
                placeholder="0.00"
                value={price} 
                onChange={(e) => setPrice(Number(e.target.value))} 
                required 
              />
            </div>

            <div className="form-group" style={{ flex: '1 1 200px' }}>
              <label style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Categoría</label>
              <select 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#222', border: '1px solid #444', color: '#fff' }}
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="CAMISA">Camisa</option>
                <option value="CHAMARRA">Chamarra</option>
                <option value="PANTALON">Pantalón</option>
                <option value="PLAYERA">Playera</option>
                <option value="ACCESORIO">Accesorio</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ flex: '1 1 200px' }}>
              <label style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Talla / Medida</label>
              <select 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#222', border: '1px solid #444', color: '#fff' }}
                value={size} 
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="S">S (Chica)</option>
                <option value="M">M (Mediana)</option>
                <option value="L">L (Grande)</option>
                <option value="XL">XL (Extra Grande)</option>
                <option value="UNITALLA">Unitalla</option>
              </select>
            </div>

            <div className="form-group" style={{ flex: '1 1 200px' }}>
              <label style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Color</label>
              <input
                type="text"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#222', border: '1px solid #444', color: '#fff' }}
                placeholder="Ej. Negro Deslavado, Azul Rey"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>
              Fotografías (Puedes seleccionar varias)
            </label>
            <div style={{ border: '2px dashed #444', padding: '2rem', textAlign: 'center', borderRadius: '8px', position: 'relative' }}>
              <span style={{ color: '#aaa' }}>
                Haz clic para subir imágenes
              </span>
              <input 
                type="file" 
                multiple
                accept="image/*" 
                onChange={handleFileChange} 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
              />
            </div>
            
            {/* Galería de vistas previas */}
            {previews.length > 0 && (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {previews.map((src, index) => (
                  <div key={index} style={{ position: 'relative', flexShrink: 0 }}>
                    <img 
                      src={src} 
                      alt={`Vista previa ${index}`} 
                      style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #555' }} 
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={uploading}
            style={{ padding: '1rem', background: '#fff', color: '#000', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: uploading ? 'not-allowed' : 'pointer', marginTop: '1rem', textTransform: 'uppercase' }}
          >
            {uploading ? 'Guardando...' : (isEditing ? 'Actualizar Prenda' : 'Guardar Prenda')}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;