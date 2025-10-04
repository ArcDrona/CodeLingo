import React from 'react';
import QuizPage from './quizPage';

interface QuizScreenProps {
  course: string;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ course }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--header-height,64px))] w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-fadein"
      style={{
        minHeight: 'calc(100vh - 64px)',
        animation: 'fadein 0.8s',
      }}
    >
      <div className="w-full max-w-2xl rounded-xl shadow-xl bg-white/80 p-8 backdrop-blur-md border border-gray-200 animate-fadein">
        <QuizPage course={course} />
      </div>
      <style jsx global>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein {
          animation: fadein 0.8s;
        }
        @keyframes option-pop {
          0% { opacity: 0; transform: scale(0.8); }
          70% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .quiz-option {
          animation: option-pop 0.5s ease-out forwards;
          opacity: 0;
        }
        .quiz-option:nth-child(1) { animation-delay: 0.1s; }
        .quiz-option:nth-child(2) { animation-delay: 0.2s; }
        .quiz-option:nth-child(3) { animation-delay: 0.3s; }
        .quiz-option:nth-child(4) { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default QuizScreen;
