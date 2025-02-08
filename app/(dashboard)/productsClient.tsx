'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { insertProduct } from '@/lib/insertProduct';
import { updateProduct } from '@/lib/updateProduct';
import { ProductsTable } from './products-table';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  precio: number;
  categoria: string;
}

interface ProductsClientProps {
  products: Product[];
}

const CATEGORIAS = [
  'Cumpleaños',
  'Deluxe',
  'Funebres',
  'Bouquets',
  'Canastas',
  '15 Años',
  'Aniversario',
  'Grado',
  'Recuperación',
  'Cajas',
  'Flores',
  'Plantas',
];

export function ProductsClient({ products }: ProductsClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [categoria, setCategoria] = useState('');
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productList, setProducts] = useState(products);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (productToEdit) {
        const imagenFinal = imagen || productToEdit.imagen_url;
        await updateProduct(productToEdit.id, nombre, descripcion, precio, imagenFinal, categoria);
      } else {
        if (!imagen) {
          alert('Por favor, selecciona una imagen para el nuevo producto.');
          return;
        }

        const newProduct = await insertProduct(imagen, nombre, descripcion, precio, categoria);
        if (newProduct) {
          setProducts((prev) => [newProduct, ...prev]);
        }
      }

      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error al procesar el producto:', error);
      alert(
        'Hubo un error al procesar el producto. Detalles: ' +
          (error instanceof Error ? error.message : 'Error desconocido')
      );
    }
  };

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setNombre(product.nombre);
    setDescripcion(product.descripcion);
    setPrecio(product.precio);
    setCategoria(product.categoria);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setNombre('');
    setPrecio(0);
    setDescripcion('');
    setImagen(null);
    setCategoria('');
    setProductToEdit(null);
  };

  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            className="h-8 gap-1"
            onClick={() => {
              setIsModalOpen(true);
              resetForm();
            }}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Añadir producto</span>
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-medium mb-4">
              {productToEdit ? 'Editar Producto' : 'Añadir Nuevo Producto'}
            </h3>
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
                <label className="block text-sm font-medium">Categoría</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {CATEGORIAS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Imagen</label>
                <input
                  type="file"
                  onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required={!productToEdit}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit">{productToEdit ? 'Actualizar Producto' : 'Añadir Producto'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ProductsTable products={productList} onEdit={handleEdit} />
    </>
  );
}
