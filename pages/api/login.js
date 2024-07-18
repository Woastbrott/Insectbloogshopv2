import { generateToken } from '../../lib/auth';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      const token = generateToken(username);
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
