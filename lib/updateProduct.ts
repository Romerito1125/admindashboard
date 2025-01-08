import { Product } from './types'; // Ajusta según la ubicación de tu archivo de tipos
import { supabase } from './supaClient'; // Cliente de Supabase
import { uploadImage } from './uploadImages'; // Función para subir la imagen

export async function updateProduct(
  id: string,
  nombre: string,
  descripcion: string,
  precio: number,
  imagen: File | null,
  categoria: string // Nuevo parámetro para categoría
): Promise<Product | null> {
  try {
    let imagenUrl: string | null = null;
    if (imagen) {
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
    }

    const updateData: any = {
      nombre,
      descripcion,
      precio,
      categoria, // Agregar categoría al objeto de actualización
    };

    if (imagenUrl) {
      updateData.imagen_url = imagenUrl;
    }

    // Actualiza el producto en la base de datos
    const { data, error } = await supabase
      .from('productos') // Asegúrate de que el nombre de la tabla sea correcto
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
