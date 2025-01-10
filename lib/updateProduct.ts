import { Product } from './types/Product';
import { supabase } from './supaClient';
import { uploadImage } from './uploadImages';

export async function updateProduct(
  id: string,
  nombre: string,
  descripcion: string,
  precio: number,
  imagen: File | string, // Puede ser un archivo o una URL
  categoria: string
): Promise<Product | null> {
  try {
    let imagenUrl: string | null = null;

    if (imagen instanceof File) {
      imagenUrl = await uploadImage(imagen);
      if (!imagenUrl) {
        console.log('Datos a actualizar:', {
          nombre,
          descripcion,
          precio,
          categoria,
          imagenUrl,
        });

        throw new Error('Error al subir la imagen');
      }
    } else if (typeof imagen === 'string') {
      imagenUrl = imagen;
    }

    const updateData: any = {
      nombre,
      descripcion,
      precio,
      categoria,
    };

    if (imagenUrl) {
      updateData.imagen_url = imagenUrl;
    }

    const { data, error } = await supabase
      .from('productos')
      .update(updateData)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Detalles del error:', error);
      throw new Error(
        `Error en la base de datos: ${error.message || 'Error desconocido'}`
      );
    }

    return data as Product;
  } catch (error) {
    console.error(
      'Error al actualizar el producto en la base de datos:',
      error
    );
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error desconocido al actualizar el producto');
    }
  }
}
