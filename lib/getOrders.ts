import { supabase } from './supaClient';

export async function getOrders(filter?: string) {
  const query = supabase.from('pedidos').select(`
    id,
    cliente_nombre,
    cliente_correo,
    direccion_envio,
    estado,
    resumen
  `);

  if (filter) {
    query.eq('estado', filter);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


export async function updateOrderStatus(id: string, newStatus: string) {
  const { data, error } = await supabase
    .from('pedidos')
    .update({ estado: newStatus })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
