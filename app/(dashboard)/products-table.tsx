// (dashboard)/products-table.tsx
'use client';

import { TableHead, TableRow, TableHeader, TableBody, Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from './product';
import { useRouter } from 'next/navigation';

export function ProductsTable({
  products,
  offset,
  totalProducts,
  onEdit
}: {
  products: any[];
  offset: number;
  totalProducts: number;
  onEdit: (product: any) => void; // Pasamos la función onEdit
}) {
  const router = useRouter();
  const productsPerPage = 5;
  function prevPage() {
    router.push(`/?offset=${Math.max(0, offset - productsPerPage)}`);
  }

  function nextPage() {
    router.push(`/?offset=${offset + productsPerPage}`);
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="hidden md:table-cell">Precio</TableHead>
            <TableHead className="hidden md:table-cell">Descripción</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <Product key={product.id} product={product} onEdit={onEdit} /> // Aquí pasas onEdit
          ))}
        </TableBody>
      </Table>
      
      <div className="flex justify-between items-center mt-4">
        <Button onClick={prevPage} disabled={offset === 0} variant="ghost">
          <ChevronLeft /> Anterior
        </Button>
        <Button onClick={nextPage} disabled={offset + productsPerPage >= totalProducts} variant="ghost">
          Siguiente <ChevronRight />
        </Button>
      </div>
    </>
  );
}
