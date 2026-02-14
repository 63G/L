import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface SceneIntroProps {
  onNext: () => void;
}

export const SceneIntro: React.FC<SceneIntroProps> = ({ onNext }) => {
  const [step, setStep] = useState(0);

  const texts = [
    "Hi Laylan...",
    "I've been thinking.",
    "I wanted to do something special.",
    "For someone very important to me."
  ];

  useEffect(() => {
    if (step < texts.length) {
      const timer = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 min-h-[50vh]">
      <div className="space-y-4 max-w-xs mx-auto">
        {texts.map((text, index) => (
          <AnimatePresence key={index}>
            {step >= index && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl font-medium text-rose-900 leading-relaxed font-sans"
              >
                {text}
              </motion.p>
            )}
          </AnimatePresence>
        ))}
      </div>

      <div className="h-24 flex items-center justify-center w-full">
        {step >= texts.length && step < 5 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-4"
          >
            <Button onClick={() => setStep(5)}>
              Who?
            </Button>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-2xl font-bold text-rose-600">
              You, obviously.
            </p>
            <Button onClick={onNext} className="mt-2">
              Continue
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};