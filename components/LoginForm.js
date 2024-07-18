// components/LoginForm.js
import { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim()) {
      await onLogin(password);
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <label className="block text-gray-700">Passwort</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-2"
      >
        Login
      </button>
    </form>
  );
}
