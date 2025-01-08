import { NextApiRequest, NextApiResponse } from 'next';
import { generarToken } from './generarToken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { username, password } = req.body;

  const validUsername = process.env.USERNAME1;
  const validPassword = process.env.PASSWORD1;
  
  if (!validUsername || !validPassword) {
    throw new Error('No hay credenciales guardadas');
  }

  if (username === validUsername && password === validPassword) {
    const token = generarToken(username);

    // Guarda el token en las cookies
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`);

    return res.status(200).json({ message: 'Login exitoso' });
  }

  res.status(401).json({ message: 'Credenciales inválidas' });
}
