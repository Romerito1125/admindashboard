// (dashboard)/products-table.tsx
'use client';

import { TableHead, TableRow, TableHeader, TableBody, Table } from '@/components/ui/table';
import { Product } from './product';

export function ProductsTable({
  products,
  onEdit
}: {
  products: any[];
  onEdit: (product: any) => void;
}) {
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
          <Product key={product.id} product={product} onEdit={onEdit} />
        ))}
      </TableBody>
    </Table>
  );
}


/* Conflicto */