import { useState } from 'react';

export default function AnswerForm({ questionId, onSubmit }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(questionId, answer);
    setAnswer('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-2 border rounded-lg"
        rows="4"
        placeholder="Antwort eingeben..."
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Antwort senden
      </button>
    </form>
  );
}
