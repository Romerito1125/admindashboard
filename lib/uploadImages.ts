import { supabase } from "./supaClient.ts";

async function uploadImage(file: File) {
    const { data, error } = await supabase.storage
        .from('images')
        .upload(`products/${file.name}`, file, {
            cacheControl: '3600',
            upsert: true
        });

    if (error) {
        console.error('Error uploading image:', error.message);
        return null;
    }

    // Generar URL pública o privada según tu configuración
    const { publicUrl } = supabase.storage
        .from('images')
        .getPublicUrl(`products/${file.name}`);

    return publicUrl;
}

export { uploadImage }
