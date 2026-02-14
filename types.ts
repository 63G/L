export enum Scene {
  INTRO = 'INTRO',
  QUIZ = 'QUIZ',
  QUESTION = 'QUESTION',
  BOUQUET = 'BOUQUET',
  LOVE_NOTE = 'LOVE_NOTE',
}

export interface QuizOption {
  text: string;
  response: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}
