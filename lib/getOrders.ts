import { supabase } from './supaClient';

export async function getOrders(filter?: string) {
  const query = supabase.from('transacciones').select(`
    id,
    buyer_email,
    descripcion,
    estado_transaccion,
    reference_code,
    reference_pol,
    transaction_id,
    trazability_code,
    metodo_pago,
    fecha_procesamiento,
    direccion_envio,
    ciudad,
    telefono
  `);

  if (filter) {
    query.eq('estado_transaccion', filter);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateOrderStatus(id: string, newStatus: string) {
  const { data, error } = await supabase
    .from('transacciones')
    .update({ estado_pedido: newStatus })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
