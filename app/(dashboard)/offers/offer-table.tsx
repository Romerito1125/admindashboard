// (dashboard)/offer-table.tsx
'use client';

import { TableHead, TableRow, TableHeader, TableBody, Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Offer } from './offer';
import { useRouter } from 'next/navigation';

export function OfferTable({
  offers, 
  offset,
  totalOffers  
}: {
  offers: { id: any; imagen_url: any }[];
  offset: number;
  totalOffers: number; 
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
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offers.map((offer) => (
            <Offer key={offer.id} product={offer} />
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <Button onClick={prevPage} disabled={offset === 0} variant="ghost">
          <ChevronLeft /> Anterior
        </Button>
        <Button onClick={nextPage} disabled={offset + productsPerPage >= totalOffers} variant="ghost">
          Siguiente <ChevronRight />
        </Button>
      </div>
    </>
  );
}

