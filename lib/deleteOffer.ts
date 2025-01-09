import { supabase } from './supaClient';


// lib/deleteOffer.ts

export async function deleteOffer(formData: FormData): Promise<void> {
    const productId = formData.get('offerId') as string;
  
    if (!productId) {
      throw new Error('La ID de la oferta es requereida.');
    }
  
    const { error } = await supabase
      .from('ofertas')
      .delete()
      .eq('id', productId);
  
    if (error) {
      console.error('Error eliminando la oferta:', error.message);
      throw new Error('Hubo un problema al intentar eliminar la oferta.');
    }
    
    console.log('El producto se eliminó correctamente');
  }
  

