import { supabase } from './supaClient'; 

export async function getProducts(search: string, offset: number) {
  const pageSize = 5; 
  let query = supabase
    .from('productos') 
    .select('id, nombre, descripcion, imagen_url, precio, categoria')
    .ilike('nombre', `%${search}%`) 
    .range(offset, offset + pageSize - 1); 

  const { data, error, count } = await query;

  if (error) {
    console.error('Error al obtener productos:', error.message);
    return { products: [], newOffset: offset, totalProducts: 0 };
  }

  return {
    products: data,
    newOffset: offset + pageSize,
    totalProducts: count ?? 0
  };
}
