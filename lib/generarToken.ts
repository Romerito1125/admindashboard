import jwt from 'jsonwebtoken';

// Generar un JWT
export const generarToken = (username: string) => {
  const payload = { username };
  const secret = process.env.JWT_SECRET || 'default_secret'; // Obtiene la clave secreta desde las variables de entorno
  const options = { expiresIn: '1h' }; // El token expirará en una hora

  return jwt.sign(payload, secret, options);
};

// Verificar un JWT
export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET || 'default_secret';
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
