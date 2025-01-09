'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { insertOffer } from '@/lib/createOffers';
import { OfferTable } from './offer-table';

interface Offer {
  id: string;
  imagen_url: string;
}

interface OfferClientProps {
  offers: Offer[];  // Cambié "products" por "offers" para mayor consistencia
  newOffset: number;
  totalOffers: number;
}

export function OfferClient({
  offers,
  newOffset,
  totalOffers
}: OfferClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagen, setImagen] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imagen) {  // Verifica que imagen no sea null
      await insertOffer(imagen);  // Ahora pasa solo un File
      setIsModalOpen(false);
      resetForm();
    } else {
      console.error("No se ha seleccionado una imagen.");
    }
  };

  const resetForm = () => {
    setImagen(null);
  };

  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            className="h-8 gap-1"
            onClick={() => {
              setIsModalOpen(true);
              resetForm();
            }}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Añadir oferta
            </span>
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-medium mb-4">Añadir una nueva oferta</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Imagen</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setImagen(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  Enviar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <OfferTable
        offers={offers}
        offset={newOffset}
        totalOffers={totalOffers}
      />
    </>
  );
}
