import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import confetti from 'canvas-confetti';

interface SceneQuestionProps {
  onNext: () => void;
}

export const SceneQuestion: React.FC<SceneQuestionProps> = ({ onNext }) => {
  const [rejected, setRejected] = useState(false);
  
  const handleYes = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fb7185', '#ffffff']
    });
    onNext();
  };

  const handleNo = () => {
    setRejected(true);
  };

  // Re-think button interaction
  const [rethinkPosition, setRethinkPosition] = useState({ x: 0, y: 0 });
  const moveRethinkButton = () => {
    setRethinkPosition({
      x: (Math.random() - 0.5) * 150, // Move horizontally
      y: (Math.random() - 0.5) * 150  // Move vertically
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full text-center relative z-20">
      
      {/* Floating decorative elements */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-10 text-4xl opacity-50 hidden md:block"
      >
        💌
      </motion.div>
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 text-3xl opacity-50 hidden md:block"
      >
        💖
      </motion.div>

      <AnimatePresence mode="wait">
        {!rejected ? (
          <motion.div
            key="ask"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center justify-center space-y-10 max-w-sm mx-auto"
          >
            <div className="space-y-4">
              <motion.div
                 animate={{ y: [0, -5, 0] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-xl text-rose-500 font-medium tracking-wide">
                  Okay… moment of truth.
                </p>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-rose-900 font-script leading-tight drop-shadow-sm">
                Will you be my Valentine?
              </h1>
            </div>

            <div className="flex flex-col gap-4 w-full items-center pt-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-full flex justify-center"
              >
                <Button 
                  onClick={handleYes} 
                  className="w-48 !text-xl !py-4 shadow-rose-300/50"
                >
                  YESSS 💗
                </Button>
              </motion.div>

              <button 
                onClick={handleNo}
                className="text-rose-400 font-medium hover:text-rose-600 transition-colors py-2 px-4 rounded-full hover:bg-rose-50"
              >
                No 💔
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="rejected"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              x: [0, -10, 10, -10, 10, 0] // Shake effect
            }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center space-y-8 max-w-sm mx-auto"
          >
            {/* Broken Heart Animation - Stays Visible */}
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ 
                scale: [0, 1.5, 1], 
                rotate: [0, -10, 10, 0] 
              }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
              className="text-8xl mb-4 filter drop-shadow-lg"
            >
              💔
            </motion.div>

            <div className="space-y-2">
              <p className="text-2xl font-bold text-rose-800">
                Ouch… my heart just cracked.
              </p>
              <p className="text-lg text-rose-600">
                Okay okay… I’ll ask nicely again 😌
              </p>
            </div>

            <div className="flex flex-col gap-4 items-center pt-4 w-full relative h-32">
              <Button onClick={handleYes} className="w-48 z-10 shadow-xl">
                Okay yes 😳
              </Button>
              
              <motion.div
                animate={{ x: rethinkPosition.x, y: rethinkPosition.y }}
                onHoverStart={moveRethinkButton}
                onClick={moveRethinkButton}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute top-16"
              >
                <button 
                  className="px-6 py-2 bg-white border border-rose-200 rounded-full text-rose-400 text-sm hover:bg-rose-50 shadow-sm"
                >
                  Let me rethink 🙈
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};