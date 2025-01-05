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
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex justify-center items-center h-screen p-4 bg-gray-50">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-red-600">¡Ups! Algo salió mal</h1>
        <p className="text-lg text-gray-700">
          Parece que no hemos podido encontrar lo que buscabas. No te preocupes, es algo que podemos solucionar.
        </p>
        <div className="bg-red-50 p-4 rounded-md text-red-700 border border-red-200">
          <h2 className="font-medium">¿Cómo solucionarlo?</h2>
          <p className="text-sm">
            Verifica si la base de datos está configurada correctamente y asegúrate de tener la tabla y los datos necesarios.
          </p>
          <pre className="my-4 px-3 py-4 bg-black text-white rounded-lg max-w-2xl overflow-auto">
            <code>
              {`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  username VARCHAR(255)
);`}
            </code>
          </pre>
          <p className="text-sm">Luego, agrega una fila de prueba:</p>
          <pre className="my-4 px-3 py-4 bg-black text-white rounded-lg max-w-2xl overflow-auto">
            <code>
              {`INSERT INTO users (id, email, name, username) VALUES (1, 'me@site.com', 'Me', 'username');`}
            </code>
          </pre>
        </div>
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
