import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface SceneBouquetProps {
  onNext: () => void;
}

export const SceneBouquet: React.FC<SceneBouquetProps> = ({ onNext }) => {
  const [showText, setShowText] = useState(false);
  const [flowers, setFlowers] = useState<{ id: number; x: number; y: number; scale: number; delay: number; rot: number }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2500);

    const newFlowers = [];
    const scaleFactor = 8.5; // Optimized for mobile width
    
    // Parametric Heart Equation
    // x = 16sin^3(t)
    // y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
    const getHeartPos = (t: number, scale: number) => {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
      return { x: x * scale, y: y * scale };
    };

    // 1. Create the Outline (The shape definer)
    const outlineCount = 40;
    for (let i = 0; i < outlineCount; i++) {
      const t = (i / outlineCount) * 2 * Math.PI;
      const pos = getHeartPos(t, scaleFactor);
      
      newFlowers.push({
        id: i,
        x: pos.x,
        y: pos.y,
        scale: 1 + Math.random() * 0.4, // Outline roses are slightly larger
        delay: i * 0.03, // Draw the outline sequentially
        rot: Math.random() * 40 - 20
      });
    }

    // 2. Fill the Heart (Inner layers)
    const layers = [0.75, 0.5, 0.25]; // Scale multipliers for inner rings
    let idCounter = outlineCount;
    
    layers.forEach((layerScale) => {
       const count = Math.floor(outlineCount * layerScale);
       for(let i=0; i<count; i++) {
         const t = (i / count) * 2 * Math.PI + (Math.random() * 0.5); // Offset to avoid grid-look
         const pos = getHeartPos(t, scaleFactor * layerScale);
         
         // Add organic jitter
         const jitter = 12;
         pos.x += (Math.random() - 0.5) * jitter;
         pos.y += (Math.random() - 0.5) * jitter;

         newFlowers.push({
           id: idCounter++,
           x: pos.x,
           y: pos.y,
           scale: 0.7 + Math.random() * 0.5,
           delay: 1.2 + Math.random() * 0.8, // Fill appears after outline
           rot: Math.random() * 360
         });
       }
    });

    // Add a center rose
    newFlowers.push({
        id: idCounter++,
        x: 0,
        y: -5,
        scale: 1.2,
        delay: 2.0,
        rot: 0
    });

    setFlowers(newFlowers);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] w-full px-4 py-8">
      
      {/* Flower Heart Container */}
      {/* Defined size ensures flowers are relative to this box */}
      <div className="relative w-[320px] h-[320px] flex items-center justify-center mb-8 shrink-0">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1 }}
           className="absolute inset-0 flex items-center justify-center"
        >
          {flowers.map((flower) => (
            <motion.div
              key={flower.id}
              // CRITICAL FIX: Use x and y props for Framer Motion to handle translate.
              // Do NOT use 'transform' in style, it conflicts with animate={{ scale }}.
              initial={{ scale: 0, opacity: 0, x: flower.x, y: flower.y }}
              animate={{ 
                scale: flower.scale, 
                opacity: 1, 
                x: flower.x, // Maintain position
                y: flower.y, // Maintain position
                rotate: [flower.rot, flower.rot + 8, flower.rot - 8, flower.rot]
              }}
              transition={{ 
                scale: { delay: flower.delay, duration: 0.5, type: 'spring', damping: 12 },
                opacity: { delay: flower.delay, duration: 0.3 },
                rotate: { repeat: Infinity, duration: 3 + Math.random() * 2, ease: "easeInOut" }
              }}
              className="absolute select-none pointer-events-none"
              style={{ 
                fontSize: '2.5rem', 
                filter: 'drop-shadow(0 4px 6px rgba(225, 29, 72, 0.25))',
                zIndex: Math.floor(flower.scale * 10),
              }}
            >
              🌹
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Text and Button Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={showText ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center space-y-6 z-20 w-full max-w-xs"
      >
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-script font-bold text-rose-800 drop-shadow-sm">For you.</h2>
          <p className="text-lg text-rose-600 font-medium leading-relaxed px-4">
            Because you deserve the prettiest things.
          </p>
        </div>

        <div className="flex justify-center w-full pt-2">
            <Button onClick={onNext} className="shadow-rose-200 shadow-xl">
                One last thing... ❤️
            </Button>
        </div>
      </motion.div>
    </div>
  );
};