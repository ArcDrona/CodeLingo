import React, { useEffect, useState } from 'react';
import { generateCourseQuizQuestions, GeminiQuizQuestion } from './geminiApi';
import Confetti from 'react-confetti';

interface QuizPageProps {
  course: string;
}

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

const QuizPage: React.FC<QuizPageProps> = ({ course }) => {
  const [questions, setQuestions] = useState<GeminiQuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [, setIncorrect] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      if (!apiKey) {
        setError('Gemini API key is missing. Please add it to your .env.local file.');
        setLoading(false);
        return;
      }
      const result = await generateCourseQuizQuestions(course, apiKey, 18);
      if (typeof result === 'string') {
        setError(result);
        setQuestions([]);
      } else {
        setQuestions(result);
      }
      setLoading(false);
    }
    load();
  }, [course]);

  function handleSelect(option: string) {
    if (selected) return;
    setSelected(option);
    if (option === questions[current].correctAnswer) {
      setScore(s => s + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);
    } else {
      setIncorrect(prev => ({ ...prev, [current]: (prev[current] || 0) + 1 }));
    }
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(c => c + 1);
        setSelected(null);
      } else {
        setShowReport(true);
      }
    }, 1200);
  }

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div className="text-red-500 text-center p-6">{error}</div>;
  if (!questions.length && !loading) {
    return <div>No questions available. Please check your course selection or try again later.</div>;
  }
  if (showReport) {
    return (
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Report</h2>
        <p>Your score: {score} / {questions.length}</p>
        <div className="mt-4">
          {score === questions.length ? (
            <p>Excellent! You mastered this lesson.</p>
          ) : (
            <p>Review the questions you missed and try again for a better score!</p>
          )}
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="p-6 max-w-xl mx-auto flex flex-col items-center">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} recycle={false} />}
      <h2 className="text-xl font-bold mb-2">Question {current + 1} / {questions.length}</h2>
      <div className="mb-4">{q.question}</div>
      <div className="grid gap-2">
        {q.options.map((opt, index) => (
          <button
            key={`${current}-${index}-${opt}`}
            className={`quiz-option p-3 rounded-lg border transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-teal-400 ${selected ? (opt === q.correctAnswer ? 'bg-green-200' : opt === selected ? 'bg-red-200' : '') : 'bg-white hover:bg-teal-50'}`}
            onClick={() => handleSelect(opt)}
            disabled={!!selected}
            style={{
              transitionProperty: 'all',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
