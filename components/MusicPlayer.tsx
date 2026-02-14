import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Play and handle potential autoplay policies
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={togglePlay}
        className="p-3 bg-white/50 backdrop-blur-md rounded-full shadow-md text-rose-600 hover:bg-white/80 transition-colors"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2730e64.mp3?filename=relaxed-vlog-night-street-131746.mp3" 
      />
      {/* 
        Note: Using a royalty-free track from Pixabay as a placeholder.
        Track: Relaxed Vlog Night Street
      */}
    </div>
  );
};