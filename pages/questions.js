// pages/questions.js
import { useState, useEffect } from 'react';
import QuestionForm from '../components/QuestionForm';
import AnswerForm from '../components/AnswerForm';
import { parseCookies } from 'nookies';

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchQuestions();
    const cookies = parseCookies();
    setIsLoggedIn(cookies.admin === 'true');
  }, []);

  const fetchQuestions = async () => {
    const res = await fetch('/api/questions');
    const data = await res.json();
    setQuestions(data);
  };

  const handleNewQuestion = async ({ theme, question }) => {
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ theme, question }),
    });
    if (res.ok) {
      fetchQuestions();
    }
  };

  const handleNewAnswer = async (id, answer) => {
    const res = await fetch('/api/questions', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, answer }),
    });
    if (res.ok) {
      fetchQuestions();
    }
  };

  const handleDeleteQuestion = async (id) => {
    const res = await fetch('/api/questions', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      fetchQuestions();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Fragen und Antworten</h1>
        <QuestionForm onSubmit={handleNewQuestion} />
        <div className="mt-8 space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="p-4 border rounded-lg break-words">
              <h3 className="text-xl font-bold mb-2">{q.theme}</h3>
              <p className="text-lg break-words mb-2">{q.question}</p>
              <p className="text-gray-600 break-words">{q.answer || 'Antwort steht noch aus'}</p>
              {isLoggedIn && q.answer === '' && (
                <AnswerForm questionId={q.id} onSubmit={handleNewAnswer} />
              )}
              {isLoggedIn && (
                <button
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 mt-2"
                >
                  Löschen
                </button>
              )}
            </div>
          ))}
        </div>
        <div className='text-center text-xl rounded-full'>
    <a href="/">
        <button className='px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 active:bg-gray-700'>
            Zurück
        </button>
    </a>
</div>
      </main>
    </div>
  );
}
