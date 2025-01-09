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

export function Offer({
  product
}: {
  product: any;
}) {
  const handleDelete = async () => {
    try {
      const formData = new FormData();
      formData.append('offerId', product.id);

      await deleteOffer(formData);

      alert('Oferta eliminada con éxito.');
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al eliminar la oferta.');
    }
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Imagen del producto"
          className="aspect-square rounded-md object-cover"
          height="512"
          src={product.imagen_url}
          width="512"
        />
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
            <DropdownMenuItem onClick={handleDelete}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
