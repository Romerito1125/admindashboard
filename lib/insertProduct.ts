import { supabase } from "./supaClient.ts";
import { uploadImage } from "./uploadImages.ts";

export async function insertProduct(file: File, nombre: string, descripcion: string, precio: number) {
    const imagenUrl = await uploadImage(file);
    if (!imagenUrl) {
        console.error('Error: No se pudo obtener la URL de la imagen');
        return;
    }

    const { data, error } = await supabase.from('productos').insert([{
        nombre: nombre,
        descripcion: descripcion,
        imagen_url: imagenUrl, 
        precio: precio
    }]);

    if (error) {
        console.error('Error creando el producto', error.message);
    } else {
        console.log('Producto creado correctamente:', data);
    }
}

