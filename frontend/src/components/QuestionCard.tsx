'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { Question } from '@/data/questions';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  subjectName: string;
  onAnswerSubmitted: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
}

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  subjectName,
  onAnswerSubmitted,
  onNextQuestion,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const optionLabels = ['A', 'B', 'C', 'D'];
  const isCorrect = selectedOption === question.correctAnswer;

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);
    onAnswerSubmitted(selectedOption === question.correctAnswer);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    onNextQuestion();
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/20 max-w-3xl mx-auto shadow-2xl relative">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            {subjectName}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white font-mono">
            Question {currentIndex + 1} <span className="text-slate-500 font-normal">of {totalQuestions}</span>
          </h2>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
          {question.difficulty}
        </span>
      </div>

      {/* Question Prompt */}
      <div className="mb-6">
        <p className="text-lg sm:text-xl font-semibold text-slate-100 leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isThisCorrect = idx === question.correctAnswer;

          let optionStyle = 'border-slate-800 bg-slate-900/60 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-800/60';

          if (isSubmitted) {
            if (isThisCorrect) {
              optionStyle = 'border-emerald-500/80 bg-emerald-500/15 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
            } else if (isSelected && !isThisCorrect) {
              optionStyle = 'border-rose-500/80 bg-rose-500/15 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]';
            } else {
              optionStyle = 'border-slate-800/60 bg-slate-900/30 text-slate-500 opacity-60';
            }
          } else if (isSelected) {
            optionStyle = 'border-cyan-400 bg-cyan-500/15 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.25)]';
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => setSelectedOption(idx)}
              className={`w-full p-4 rounded-xl border text-left flex items-start space-x-3.5 transition-all ${optionStyle}`}
            >
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                  isSelected
                    ? isSubmitted
                      ? isThisCorrect
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-rose-500 text-white'
                      : 'bg-cyan-400 text-slate-950'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {optionLabels[idx]}
              </span>
              <span className="text-sm sm:text-base font-medium flex-1 pt-0.5 leading-snug">
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Immediate Feedback Box */}
      {isSubmitted && (
        <div
          className={`p-4 sm:p-5 rounded-xl border mb-6 animate-fadeIn ${
            isCorrect
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center space-x-2 font-bold text-base mb-2">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400" />
                <span className="text-rose-400">
                  Incorrect &bull; Correct Answer: {optionLabels[question.correctAnswer]}
                </span>
              </>
            )}
          </div>
          <div className="flex items-start space-x-2 text-sm text-slate-300 mt-2 pl-1">
            <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-semibold text-slate-200">Explanation: </span>
              {question.explanation}
            </p>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-end pt-2">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className={`px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all ${
              selectedOption === null
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.35)] transform hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{currentIndex + 1 === totalQuestions ? 'Complete Quiz' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
