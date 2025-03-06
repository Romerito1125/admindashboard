import { supabase } from './supaClient'; 

export async function getOffers() {
  const { data, error } = await supabase
    .from('ofertas')  
    .select('id, imagen_url');  

  if (error) {
    console.error('Error al obtener ofertas:', error.message);
    return { offers: [] };
  }

  return { offers: data };
}
