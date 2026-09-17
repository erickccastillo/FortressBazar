import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// Función para obtener prendas (Catálogo)
export const getProducts = async (req: Request, res: Response) => {
  try {
    console.log('GET /api/clothes', req.query);

    const search = req.query.search as string;
    const category = req.query.category as string;

    // CAMBIO: Apuntar a la tabla 'clothes'
    let query = supabase
      .from('clothes')
      .select('*');

    // Buscar por nombre
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    // Filtrar por categoría
    if (category && category !== 'TODOS') {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order(
      'created_at',
      { ascending: false }
    );

    if (error) {
      console.error('SUPABASE ERROR:', error);
      throw error;
    }

    console.log(`Prendas encontradas: ${data?.length || 0}`);

    return res.status(200).json({
      products: data || [], // Mantenemos la llave "products" para no romper tu frontend
      totalProducts: data?.length || 0,
      totalPages: 1,
    });

  } catch (error: any) {
    console.error('GET CLOTHES ERROR:', error);

    return res.status(500).json({
      error: 'Error al obtener las prendas',
      details: error?.message || error
    });
  }
};

// Función para crear prendas (Panel de Administrador)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      category,
      size,         // Nuevo campo
      color,
      image_urls    // Cambiado de image_url a image_urls
    } = req.body;

    // CAMBIO: Insertar en la tabla 'clothes'
    const { data, error } = await supabase
      .from('clothes')
      .insert([
        {
          name,
          description,
          price,
          category,
          size,
          color,
          image_urls
        }
      ])
      .select();

    if (error) {
      console.error('CREATE CLOTHES ERROR:', error);
      throw error;
    }

    return res.status(201).json(data);

  } catch (error: any) {
    console.error('CREATE CLOTHES ERROR:', error);

    return res.status(500).json({
      error: 'Error al crear la prenda',
      details: error?.message || error
    });
  }
};

// Función para actualizar prendas
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const {
    name,
    description,
    price,
    category,
    size,         // Nuevo campo
    color,
    image_urls    // Cambiado a image_urls
  } = req.body;

  try {
    // CAMBIO: Actualizar en la tabla 'clothes'
    const { data, error } = await supabase
      .from('clothes')
      .update({
        name,
        description,
        price,
        category,
        size,
        color,
        image_urls
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('UPDATE CLOTHES ERROR:', error);
      throw error;
    }

    return res.status(200).json({
      message: 'Prenda actualizada con éxito',
      product: data?.[0]
    });

  } catch (error: any) {
    console.error('UPDATE CLOTHES ERROR:', error);

    return res.status(500).json({
      error: error?.message || 'Error al actualizar la prenda'
    });
  }
};