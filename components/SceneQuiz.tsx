import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import { Check, ChevronRight } from 'lucide-react';

interface SceneQuizProps {
  onNext: (answers: Record<string, string>) => void;
}

const QUESTIONS: QuizQuestion[] = [
  // Original Cute Questions
  {
    id: 1,
    question: "What's the vibe today?",
    options: [
      { text: "Cozy and cute 🧸", response: "I'll hug you and never let go." },
      { text: "Chaotic but adorable 😈", response: "My favorite kind of chaos." },
      { text: "Romantic and extra ✨", response: "You'll fly over clouds." }
    ]
  },
  {
    id: 2,
    question: "Pick a date energy:",
    options: [
      { text: "Coffee + long walk ☕", response: "Classic." },
      { text: "Dinner + dessert mission 🍰", response: "The sweetest mission." },
      { text: "Muath surprises me 🎁", response: "I've got ideas... 😏" }
    ]
  },
  {
    id: 3,
    question: "One thing you deserve more of:",
    options: [
      { text: "Flowers 🌹", response: "A garden's worth coming up." },
      { text: "Kisses 😌", response: "Infinite supply available." },
      { text: "All of the above ✅", response: "Correct answer!" }
    ]
  },
  // New Intimate Questions
  {
    id: 4,
    question: "Be honest… how much do you miss Muath?",
    options: [
      { 
        text: "A little.", 
        response: "Liar. You miss me more than that. (You don’t even know how much.)" 
      },
      { 
        text: "More than I admit.", 
        response: "I knew it. But I miss you more. (You don’t even know how much.)" 
      },
      { 
        text: "Way too much.", 
        response: "Good. Because I miss you even more. (You don’t even know how much.)" 
      }
    ]
  },
  {
    id: 5,
    question: "If I whisper in your ear right now…",
    options: [
      { text: "I’d melt.", response: "I'll put you back together." },
      { text: "I’d blush.", response: "You’d look cute blushing." },
      { text: "I’d pull you closer.", response: "That’s dangerous." }
    ]
  },
  {
    id: 6,
    question: "If I pull you closer and kissed you?",
    options: [
      { text: "I wouldn’t stop you.", response: "That’s bold." },
      { text: "I’d kiss you back harder.", response: "I like that." },
      { text: "I’d make you regret starting it.", response: "Now I’m curious." }
    ]
  }
];

export const SceneQuiz: React.FC<SceneQuizProps> = ({ onNext }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = QUESTIONS[currentQIndex];

  const handleOptionClick = (idx: number) => {
    setSelectedOption(idx);
    
    // Different confetti colors for intimate questions (index 3, 4, 5)
    const isIntimate = currentQIndex >= 3;
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.7 },
      colors: isIntimate ? ['#e11d48', '#fda4af'] : ['#fb7185', '#fda4af']
    });
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      // Save the answer
      const questionText = QUESTIONS[currentQIndex].question;
      const answerText = QUESTIONS[currentQIndex].options[selectedOption].text;
      
      setAnswers(prev => ({
        ...prev,
        [questionText]: answerText
      }));
    }

    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  if (isCompleted) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl text-center border border-rose-100 max-w-sm mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-3xl">
            🏆
          </div>
          <h2 className="text-2xl font-bold text-rose-800">Official Result</h2>
          <p className="text-xl text-rose-600 font-medium">
            You're my Valentine.<br/>
            <span className="text-lg opacity-80 mt-2 block">Non-negotiable 😌💗</span>
          </p>
          <Button onClick={() => onNext(answers)} className="w-full">
            Proceed to the big question 💌
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
            Quiz Time
          </span>
          <span className="text-sm font-bold text-rose-400 bg-rose-100 px-3 py-1 rounded-full">
            {currentQIndex + 1}/{QUESTIONS.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-bold text-rose-900 mb-6 leading-tight">
              {currentQuestion.question}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionClick(idx)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 border ${
                    selectedOption === idx 
                      ? 'border-rose-300 bg-white shadow-md' 
                      : 'border-transparent bg-white/50 hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-700">
                      {option.text}
                    </span>
                    {selectedOption === idx && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check className="w-4 h-4 text-rose-500" />
                      </motion.div>
                    )}
                  </div>
                  {selectedOption === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-rose-500 mt-2 font-medium leading-snug">
                        {option.response}
                      </p>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            <div className="h-14 flex justify-end items-center">
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Button onClick={handleNextQuestion} className="!py-2 !px-6 text-sm">
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};