import { supabase } from './supaClient'; 

export async function getOffers(search: string) {
  let query = supabase
    .from('ofertas')  
    .select('id, imagen_url');  

  if (search) {
    query = query.ilike('id', `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error al obtener ofertas:', error.message);
    return { offers: [] };
  }

  return {
    offers: data
  };
}
