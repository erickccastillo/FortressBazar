import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// Función para obtener productos (Catálogo)
export const getProducts = async (req: Request, res: Response) => {
  try {
    console.log('GET /api/products', req.query);

    const search = req.query.search as string;
    const category = req.query.category as string;

    let query = supabase
      .from('products')
      .select('*');

    // Buscar por nombre
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    // Filtrar por categoría
    if (
      category &&
      category !== 'TODOS'
    ) {
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

    console.log(
      `Productos encontrados: ${data?.length || 0}`
    );

    return res.status(200).json({
      products: data || [],
      totalProducts: data?.length || 0,
      totalPages: 1,
    });

  } catch (error: any) {
    console.error('GET PRODUCTS ERROR:', error);

    return res.status(500).json({
      error: 'Error al obtener productos',
      details: error?.message || error
    });
  }
};

// Función para crear productos (Panel de Administrador)
export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image_url,
      color,
      material,
      medidas
    } = req.body;

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          description,
          price,
          category,
          image_url,
          color,
          material,
          medidas
        }
      ])
      .select();

    if (error) {
      console.error('CREATE PRODUCT ERROR:', error);
      throw error;
    }

    return res.status(201).json(data);

  } catch (error: any) {
    console.error('CREATE PRODUCT ERROR:', error);

    return res.status(500).json({
      error: 'Error al crear producto',
      details: error?.message || error
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const {
    name,
    description,
    price,
    category,
    image_url,
    color,
    material,
    medidas
  } = req.body;

  try {
    const { data, error } = await supabase
      .from('products')
      .update({
        name,
        description,
        price,
        category,
        image_url,
        color,
        material,
        medidas
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('UPDATE PRODUCT ERROR:', error);
      throw error;
    }

    return res.status(200).json({
      message: 'Producto actualizado con éxito',
      product: data?.[0]
    });

  } catch (error: any) {
    console.error('UPDATE PRODUCT ERROR:', error);

    return res.status(500).json({
      error: error?.message || 'Error al actualizar producto'
    });
  }
};
