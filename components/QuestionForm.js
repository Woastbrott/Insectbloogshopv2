// components/QuestionForm.js
import { useState } from 'react';

export default function QuestionForm({ onSubmit }) {
  const [theme, setTheme] = useState('');
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (theme.trim() && question.trim()) {
      await onSubmit({ theme, question });
      setTheme('');
      setQuestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Stelle eine Frage</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Thema</label>
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Frage</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700"
      >
        Frage senden
      </button>
    </form>
  );
}
