import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-rose-200 hover:shadow-rose-300 hover:brightness-105",
    secondary: "bg-white text-rose-500 border-2 border-rose-100 hover:border-rose-200 shadow-sm",
    outline: "bg-transparent border-2 border-rose-400 text-rose-500 hover:bg-rose-50",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};