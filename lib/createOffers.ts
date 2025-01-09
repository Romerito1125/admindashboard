import { supabase } from "./supaClient.ts";
import { uploadImage } from "./uploadImages.ts";

export async function insertOffer(file: File) {
    const imagenUrl = await uploadImage(file);
    if (!imagenUrl) {
        console.error('Error: No se pudo obtener la URL de la imagen');
        return;
    }

    const { data, error } = await supabase.from('ofertas').insert([{
        imagen_url: imagenUrl,
    }]);

    if (error) {
        console.error('Error creando el producto', error.message);
    } else {
        console.log('Oferta creado correctamente:', data);
    }
}
