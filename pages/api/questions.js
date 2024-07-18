// pages/api/questions.js
import dotenv from 'dotenv';

dotenv.config();

let questions = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { theme, question } = req.body;
    const newQuestion = { id: Date.now(), theme, question, answer: '' };
    questions.push(newQuestion);
    res.status(201).json(newQuestion);
  } else if (req.method === 'GET') {
    res.status(200).json(questions);
  } else if (req.method === 'PUT') {
    const { id, answer } = req.body;
    const question = questions.find(q => q.id === id);
    if (question) {
      question.answer = answer;
      res.status(200).json(question);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    questions = questions.filter(q => q.id !== id);
    res.status(200).json({ message: 'Question deleted' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
