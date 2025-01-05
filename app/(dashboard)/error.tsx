'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex justify-center items-center h-screen p-4 bg-gray-50">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-red-600">¡No se encontraron productos!</h1>
        <p className="text-lg text-gray-700">
          Parece que no hay productos disponibles en este momento. Intenta agregar uno para comenzar.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={reset}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    </main>
  );
}
