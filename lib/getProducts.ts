import { supabase } from './supaClient'; 

export async function getProducts(search: string, offset: number) {
  const pageSize = 5; 
  let query = supabase
    .from('productos') // Asegúrate de que la tabla se llame "productos"
    .select('id, nombre, descripcion, imagen_url, precio, categoria') // Incluye el campo "categoria"
    .ilike('nombre', `%${search}%`) // Filtro de búsqueda por nombre
    .range(offset, offset + pageSize - 1); // Paginación (offset y pageSize)

  const { data, error, count } = await query;

  if (error) {
    console.error('Error al obtener productos:', error.message);
    return { products: [], newOffset: offset, totalProducts: 0 };
  }

  // Devuelve los productos, el nuevo offset y el total de productos
  return {
    products: data,
    newOffset: offset + pageSize,
    totalProducts: count ?? 0
  };
}
