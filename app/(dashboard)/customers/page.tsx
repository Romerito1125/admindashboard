// CustomersPage.tsx
'use client';

import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../../../lib/getOrders';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CustomersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, estado: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error al actualizar el estado del pedido:', error);
    }
  };

  const orderStates = ['pendiente', 'en preparación', 'listo', 'enviado'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clientes</CardTitle>
        <CardDescription>
          Ve todas las órdenes de los clientes y actualiza su estado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Cargando órdenes...</p>
        ) : orders.length === 0 ? (
          <p>No hay órdenes disponibles.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Cliente</th>
                <th className="border border-gray-300 px-4 py-2">Correo</th>
                <th className="border border-gray-300 px-4 py-2">Dirección</th>
                <th className="border border-gray-300 px-4 py-2">Resumen</th>
                <th className="border border-gray-300 px-4 py-2">Estado</th>
                <th className="border border-gray-300 px-4 py-2">Actualizar</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.cliente_nombre}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.cliente_correo}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.direccion_envio}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.resumen}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.estado}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={order.estado}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border border-gray-300 p-1 rounded"
                    >
                      {orderStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
