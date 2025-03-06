//offer

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { deleteOffer } from '../../../lib/deleteOffer';

export function Offer({ product, setOffers }: { product: { id: string; imagen_url: string }; setOffers: React.Dispatch<React.SetStateAction<{ id: string; imagen_url: string }[]>> }) {
  const handleDelete = async () => {
    try {
      const formData = new FormData();
      formData.append('offerId', product.id);

      await deleteOffer(formData);

      // Eliminar oferta del estado local para actualizar la UI
      setOffers((prevOffers) => prevOffers.filter((offer) => offer.id !== product.id));

      alert('Oferta eliminada con éxito.');
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al eliminar la oferta.');
    }
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <div className="w-20 h-20 rounded-md overflow-hidden border">
          <Image
            alt="Imagen del producto"
            src={product.imagen_url}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Ocultar menú</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleDelete}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
/* */