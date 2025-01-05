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
  totalProducts
}: {
  products: any[]; // Asegúrate de que la estructura de productos sea correcta
  offset: number;
  totalProducts: number;
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
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Mapea los productos */}
          {products.map((product) => (
            <Product key={product.id} product={product} />
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
