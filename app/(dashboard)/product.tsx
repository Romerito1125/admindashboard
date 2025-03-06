//product.tsx

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
import { deleteProduct } from '../../lib/deleteProduct';

export function Product({
  product,
  onEdit,
  onDelete
}: {
  product: any;
  onEdit: (product: any) => void;
  onDelete: (productId: string) => void;
}) {
  const handleDelete = async () => {
    if (!product.id) {
      alert('ID del producto no válido.');
      return;
    }

    try {
      await deleteProduct(product.id);
      onDelete(product.id); // Actualizar la tabla eliminando el producto del estado
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('No se pudo eliminar el producto.');
    }
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Imagen del producto"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.imagen_url}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{product.nombre}</TableCell>
      <TableCell className="font-medium">{product.descripcion}</TableCell>
      <TableCell className="font-medium">{product.categoria}</TableCell>
      <TableCell className="hidden md:table-cell">{`$${product.precio}`}</TableCell>

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
            <DropdownMenuItem onClick={() => onEdit(product)}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
