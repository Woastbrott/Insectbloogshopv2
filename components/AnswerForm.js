// components/AnswerForm.js
import { useState } from 'react';

export default function AnswerForm({ questionId, onSubmit }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answer.trim()) {
      await onSubmit(questionId, answer);
      setAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label className="block text-gray-700">Antwort</label>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg"
        required
      ></textarea>
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 mt-2"
      >
        Antwort senden
      </button>
    </form>
  );
}
