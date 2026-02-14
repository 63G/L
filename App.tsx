import React, { useState } from 'react';
import { Scene } from './types';
import { BackgroundEffects } from './components/BackgroundEffects';
import { SceneIntro } from './components/SceneIntro';
import { SceneQuiz } from './components/SceneQuiz';
import { SceneQuestion } from './components/SceneQuestion';
import { SceneBouquet } from './components/SceneBouquet';
import { SceneLoveNote } from './components/SceneLoveNote';
import { MusicPlayer } from './components/MusicPlayer';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [currentScene, setCurrentScene] = useState<Scene>(Scene.INTRO);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  const handleQuizCompletion = (answers: Record<string, string>) => {
    setQuizAnswers(answers);
    // Persist answers to local storage just in case
    try {
        localStorage.setItem('valentine_quiz_answers', JSON.stringify(answers));
    } catch (e) {
        console.warn('Could not save to localStorage', e);
    }
    setCurrentScene(Scene.QUESTION);
  };

  const renderScene = () => {
    switch (currentScene) {
      case Scene.INTRO:
        return <SceneIntro onNext={() => setCurrentScene(Scene.QUIZ)} />;
      case Scene.QUIZ:
        return <SceneQuiz onNext={handleQuizCompletion} />;
      case Scene.QUESTION:
        return <SceneQuestion onNext={() => setCurrentScene(Scene.BOUQUET)} />;
      case Scene.BOUQUET:
        return <SceneBouquet onNext={() => setCurrentScene(Scene.LOVE_NOTE)} />;
      case Scene.LOVE_NOTE:
        return <SceneLoveNote quizAnswers={quizAnswers} />;
      default:
        return <SceneIntro onNext={() => setCurrentScene(Scene.QUIZ)} />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 text-rose-900 font-sans selection:bg-rose-200">
      <BackgroundEffects />
      <MusicPlayer />
      
      <main className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full max-w-md"
          >
            {renderScene()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}