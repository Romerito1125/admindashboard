import { supabase } from './supaClient'; 

export async function getOffers(search: string, offset: number) {
  const pageSize = 5; 
  let query = supabase
    .from('ofertas')  
    .select('id, imagen_url')  
    .range(offset, offset + pageSize - 1); 

  if (search) {
    query = query.ilike('id', `%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error al obtener ofertas:', error.message);
    return { offers: [], newOffset: offset, totalOffers: 0 };  
  }

  return {
    offers: data, 
    newOffset: offset + pageSize,
    totalOffers: count ?? 0  
  };
}
