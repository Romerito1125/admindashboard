import { supabase } from './supaClient.ts';

async function uploadImage(file: File) {
    const { data, error } = await supabase.storage
        .from('images')
        .upload(`products/${file.name}`, file, {
            cacheControl: '3600',
            upsert: true
        });

    if (error) {
        console.error('Error al subir la imagen:', error.message);
        return null;
    }

    // Obtener la URL pública de la imagen subida
    const response = supabase.storage
        .from('images')
        .getPublicUrl(`products/${file.name}`);

    if (response.data) {
        return response.data.publicUrl;  // Accede a la URL dentro de 'data'
    } else {
        console.error('Error al obtener la URL pública');
        return null;
    }
}

export { uploadImage };
