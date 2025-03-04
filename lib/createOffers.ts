import { supabase } from "./supaClient.ts";
import { uploadImage } from "./uploadImages.ts";

export async function insertOffer(file: File) {
    const imagenUrl = await uploadImage(file);
    if (!imagenUrl) {
        console.error('Error: No se pudo obtener la URL de la imagen');
        return null;
    }

    const { data, error } = await supabase
        .from('ofertas')
        .insert([{ imagen_url: imagenUrl }])
        .select()
        .single();

    if (error) {
        console.error('Error creando la oferta', error.message);
        return null;
    }

    console.log('Oferta creada correctamente:', data);
    return data;
}
