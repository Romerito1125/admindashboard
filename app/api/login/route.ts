// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generarToken } from '../../../lib/generarToken';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const validUsername = process.env.USERNAME1;
  const validPassword = process.env.PASSWORD1;

  if (!validUsername || !validPassword) {
    return NextResponse.json({ message: 'Credenciales no configuradas' }, { status: 500 });
  }

  if (username === validUsername && password === validPassword) {
    const token = generarToken(username);

    const response = NextResponse.json({ message: 'Inicio de sesión exitoso' });

    response.cookies.set('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 60 * 60, 
      path: '/', 
    });

    return response;
  }

  return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 });
}
