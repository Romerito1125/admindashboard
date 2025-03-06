import jwt from 'jsonwebtoken';

export const generarToken = (username: string) => {
  const payload = { username };
  const secret = process.env.JWT_SECRET || 'default_secret'; 
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET || 'default_secret';
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
