export interface Option {
  id?: number;
  key: string;
  content: string;
  isCorrect: boolean;
  line?: number;
}

export interface Question {
  scorePerQuestion?: number; 
  topic: string;
  options: Record<string, Option>;
  rightAnswer: string | number; 
  type: string; 
  level?: string; 
  questionIndex?: number;
  rawIndex?: number;
  line: number;
}

export interface Part {
  title: string;
  questions: Record<string, Question>;
  rawIndex: number;
  line: number;
}

export interface ExamJSON {
  [partKey: string]: Part;
}
