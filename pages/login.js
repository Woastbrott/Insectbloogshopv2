import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result.ok) {
      router.push('/admin');
    } else {
      setError('Login failed: ' + result.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block mb-2 text-sm font-bold text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Login
        </button>
      </form>
    </div>
  );
}
