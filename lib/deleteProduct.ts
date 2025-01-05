import { supabase } from './supaClient';


// lib/deleteProduct.ts

export async function deleteProduct(formData: FormData): Promise<void> {
    const productId = formData.get('productId') as string;
  
    if (!productId) {
      throw new Error('La ID del producto es requereida.');
    }
  
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', productId);
  
    if (error) {
      console.error('Error eliminando el producto:', error.message);
      throw new Error('Hubo un problema al intentar eliminar el producto.');
    }
    
    console.log('El producto se eliminó correctamente');
  }
  

