// (dashboard)/ProductsClient.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { insertProduct } from '@/lib/insertProduct';
import { ProductsTable } from './products-table';

// Definir la interfaz para las props
interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  precio: number;
}

interface ProductsClientProps {
  products: Product[];
  newOffset: number;
  totalProducts: number;
}

export function ProductsClient({ products, newOffset, totalProducts }: ProductsClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imagen) {
      await insertProduct(imagen, nombre, descripcion, precio);
      setIsModalOpen(false);
      setNombre('');
      setPrecio(0);
      setDescripcion('');
      setImagen(null);
    } else {
      console.log('Por favor, selecciona una imagen.');
    }
  };

  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1" onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Añadir producto
            </span>
          </Button>
        </div>
      </div>

      {/* Formulario Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-medium mb-4">Añadir Nuevo Producto</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Precio</label>
                <input
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Descripción</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Imagen</label>
                <input
                  type="file"
                  onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="sm">Añadir Producto</Button>
              </div>
            </form>
            <Button size="sm" variant="ghost" onClick={() => setIsModalOpen(false)} className="mt-2">
              Cancelar
            </Button>
          </div>
        </div>
      )}

      <ProductsTable
        products={products}
        offset={newOffset ?? 0}
        totalProducts={totalProducts}
      />
    </>
  );
}
    
