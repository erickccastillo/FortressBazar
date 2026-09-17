export interface Product {
  id: string; // o number, dependiendo de cómo lo tengas en Supabase (normalmente string/UUID)
  name: string;
  description: string;
  price: number;
  category: string;
  size: string; // NUEVO
  color?: string; // Opcional
  image_urls: string[]; // NUEVO (Reemplaza a image_url: string)
  created_at?: string;
}

/**
 * Respuesta esperada del backend para /products
 * Esto te permite tipar correctamente el hook useFetchProducts
 */
export type ProductResponse = {
  data: Product[];        // lista de productos
  totalProducts: number;  // total de productos en la DB
  totalPages: number;     // total de páginas (si usas paginación)
  page: number;           // página actual
};
