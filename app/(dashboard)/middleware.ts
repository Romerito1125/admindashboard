import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

if (!SECRET_KEY) {
  throw new Error('JWT_SECRET no está definido en el entorno');
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return NextResponse.next();
  }

  const cookies = req.cookies;
  console.log("Cookies en Middleware:", cookies);

  const token = cookies.get('token')?.value;
  console.log("Token encontrado:", token); 

  if (!token) {
    console.error('Error: No se encontró el token en las cookies');
    return NextResponse.redirect(new URL('/login?sinToken', req.url));
  }

  const decoded = jwt.verify(token, SECRET_KEY);

  if (!decoded) {
    console.error('Error: Token inválido');
    return NextResponse.redirect(new URL('/login?tokenInvalido', req.url));
  }

  console.log("Token verificado exitosamente");

  return NextResponse.next();
}
