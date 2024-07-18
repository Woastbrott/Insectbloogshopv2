// /lib/auth.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {object|null} - The decoded token if valid, otherwise null.
 */
export const verifyToken = (token) => {
  try {
    console.log('Verifying token:', token);
    console.log('Using secret:', SECRET_KEY);
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Token verified successfully:', decoded);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

/**
 * Generates a JWT token.
 * @param {string} username - The username to include in the token payload.
 * @returns {string} - The generated JWT token.
 */
export const generateToken = (username) => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
};
