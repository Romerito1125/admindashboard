import { supabase } from './supaClient';

export async function getProducts(search: string) {
  let query = supabase
    .from('productos')
    .select('id, nombre, descripcion, imagen_url, precio, categoria')
    .ilike('nombre', `%${search}%`);

  const { data, error } = await query;

  if (error) {
    console.error('Error al obtener productos:', error.message);
    return { products: [] };
  }

  return { products: data };
}
