// app/api/signout/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Eliminar la cookie 'token'
  const response = NextResponse.json({ message: 'Sesión cerrada' });

  // Configurar la cookie 'token' para que expire en el pasado, eliminándola
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Solo en producción se usa secure
    maxAge: -1, // Expiración inmediata
    path: '/', // Asegúrate de que la cookie esté disponible en todo el sitio
  });

  return response;
}
