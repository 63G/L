import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'sparkle';
}

export const BackgroundEffects: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 10, // 10px to 25px
        duration: Math.random() * 10 + 10, // 10s to 20s
        delay: Math.random() * 5,
        type: Math.random() > 0.7 ? 'sparkle' : 'heart',
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '110vh', x: `${p.x}vw`, opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.6, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            fontSize: `${p.size}px`,
            color: p.type === 'heart' ? 'rgba(251, 113, 133, 0.2)' : 'rgba(253, 186, 116, 0.3)',
          }}
        >
          {p.type === 'heart' ? '❤' : '✨'}
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20 mix-blend-overlay"></div>
    </div>
  );
};