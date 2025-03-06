// Tabla de productos


'use client';

import { useState, useEffect } from 'react';
import { TableHead, TableRow, TableHeader, TableBody, Table } from '@/components/ui/table';
import { Product } from './product';

export function ProductsTable({
  products: initialProducts,
  onEdit,
  onDelete
}: {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: (productId: string) => void;
}) {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleDelete = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    onDelete(productId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Imagen</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead className="hidden md:table-cell">Descripción</TableHead>
          <TableHead className="hidden md:table-cell">Categoría</TableHead>
          <TableHead className="hidden md:table-cell">Precio</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <Product key={product.id} product={product} onEdit={onEdit} onDelete={handleDelete} />
        ))}
      </TableBody>
    </Table>
  );
}

