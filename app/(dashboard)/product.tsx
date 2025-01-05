// (dashboard)/product.tsx

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
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
import { deleteProduct } from './actions';

export function Product({ product }: { product: any }) { // Cambié SelectProduct a 'any' ya que no es necesario definirlo ahora
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.imagen_url} // Usamos 'imagen_url' como en tu esquema de base de datos
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{product.nombre}</TableCell> {/* 'nombre' es el campo de tu base de datos */}
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.estado} {/* Puedes tener un campo 'estado' si lo agregas, o mantenerlo como 'activo' u otro estado */}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${product.precio}`}</TableCell> {/* 'precio' de la base de datos */}
      <TableCell className="hidden md:table-cell">{product.stock}</TableCell> {/* Si tienes stock o lo manejas en otro campo */}
      <TableCell className="hidden md:table-cell">
        {new Date(product.created_at).toLocaleDateString("en-US")} {/* Suponiendo que 'created_at' es una fecha en la base de datos */}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
