'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import QuestionCard from '@/components/QuestionCard';
import QuizResult from '@/components/QuizResult';
import { QUESTIONS_DATA, SUBJECTS, Question } from '@/data/questions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = (params?.subjectId as string) || 'data-structures';

  const subject = SUBJECTS.find((s) => s.slug === subjectId) || {
    slug: subjectId,
    name: 'Subject Quiz',
    description: '',
    icon: 'Book',
    questionCount: 5,
  };

  const [questions, setQuestions] = useState<Question[]>(
    QUESTIONS_DATA[subjectId] || QUESTIONS_DATA['data-structures']
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch questions from backend or fallback to local questions data
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/questions?subjectId=${subjectId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.questions && data.questions.length > 0) {
            setQuestions(data.questions);
          }
        }
      } catch (err) {
        // Fallback to embedded QUESTIONS_DATA
        if (QUESTIONS_DATA[subjectId]) {
          setQuestions(QUESTIONS_DATA[subjectId]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subjectId]);

  const handleAnswerSubmitted = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed! Save progress to backend
      setIsCompleted(true);
      await saveProgress(score);
    }
  };

  const saveProgress = async (finalScore: number) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      await fetch(`${apiUrl}/api/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          subjectId,
          score: finalScore,
          correctAnswers: finalScore,
          totalQuestions: questions.length,
          questionsAttempted: questions.length,
        }),
      });
    } catch (e) {
      // Offline fallback silent handle
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsCompleted(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#060911]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-3 text-cyan-400 font-mono text-sm">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <span>Loading Questions...</span>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col bg-[#060911]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col justify-center">
        {/* Top Back bar */}
        {!isCompleted && (
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/subjects"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Subjects</span>
            </Link>

            {/* Stepper progress dots */}
            <div className="flex items-center space-x-1.5">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'bg-cyan-400 scale-125 shadow-[0_0_8px_rgba(0,240,255,0.8)]'
                      : idx < currentIndex
                      ? 'bg-emerald-400'
                      : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content: Either Active Question or Quiz Results */}
        {!isCompleted && currentQuestion ? (
          <QuestionCard
            key={currentQuestion.id || currentIndex}
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            subjectName={subject.name}
            onAnswerSubmitted={handleAnswerSubmitted}
            onNextQuestion={handleNextQuestion}
          />
        ) : (
          <QuizResult
            score={score}
            total={questions.length}
            subjectName={subject.name}
            onRetry={handleRetry}
          />
        )}
      </main>
    </div>
  );
}
