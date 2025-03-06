'use client';

import { TableHead, TableRow, TableHeader, TableBody, Table } from '@/components/ui/table';
import { Offer } from './offer';

export function OfferTable({
  offers,
  setOffers
}: {
  offers: { id: string; imagen_url: string }[];
  setOffers: React.Dispatch<React.SetStateAction<{ id: string; imagen_url: string }[]>>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Imagen</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offers.map((offer) => (
          <Offer key={offer.id} product={offer} setOffers={setOffers} />
        ))}
      </TableBody>
    </Table>
  );
}
