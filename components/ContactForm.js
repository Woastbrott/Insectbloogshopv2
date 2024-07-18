// components/ContactForm.js
import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      alert('Nachricht gesendet!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      alert('Fehler beim Senden der Nachricht.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">E-Mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Nachricht</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Senden
      </button>
    </form>
  );
}
