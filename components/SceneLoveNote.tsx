import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SceneLoveNoteProps {
  quizAnswers?: Record<string, string>;
}

export const SceneLoveNote: React.FC<SceneLoveNoteProps> = ({ quizAnswers = {} }) => {
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const lines = [
    "Okay, being serious now.",
    "I love you.",
    "And I don't just want one day.",
    "I want to make every day feel like this."
  ];

  useEffect(() => {
    if (step < lines.length) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-white/40 backdrop-blur-md rounded-3xl border border-white/40 shadow-xl max-w-sm mx-auto relative overflow-y-auto max-h-[80vh] no-scrollbar">
      <div className="space-y-8 w-full">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={step >= index ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`text-rose-900 leading-relaxed ${
              index === 1 
                ? 'font-bold text-5xl text-rose-600 font-script my-4 drop-shadow-sm' // Big I love you
                : 'text-lg md:text-xl font-medium'
            }`}
          >
            {step >= index && line}
          </motion.p>
        ))}
      </div>

      {step >= lines.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="mt-16 relative w-full"
        >
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-24 h-1 bg-rose-300 rounded-full opacity-50" />
          
          <h1 className="font-script text-5xl text-rose-600 drop-shadow-sm -rotate-3">
            Laylan
          </h1>
          <div className="mt-6 flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Always yours</span>
            <span className="text-sm font-semibold text-rose-800">Muath</span>
          </div>

          {/* Hidden Results Section */}
          <div className="mt-12 pt-8 border-t border-rose-100/50 w-full">
            <button 
              onClick={() => setShowResults(!showResults)}
              className="text-xs text-rose-300 hover:text-rose-500 transition-colors uppercase tracking-widest font-bold"
            >
              P.S. {showResults ? 'Hide' : 'View'} Quiz Results
            </button>
            
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 text-left bg-white/50 rounded-xl p-4 text-sm"
                >
                  <h4 className="font-bold text-rose-600 mb-2 border-b border-rose-200 pb-2">Her Answers:</h4>
                  <ul className="space-y-3">
                    {Object.entries(quizAnswers).map(([q, a], idx) => (
                      <li key={idx} className="leading-snug">
                        <span className="block text-rose-400 text-xs mb-0.5">{q}</span>
                        <span className="font-semibold text-rose-800">{a}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
};