import { IClassroom, IStudentClass } from "./classroom";
import { IStudent, ITeacher } from "./user";

export enum QuestionType {
  MULTIQUE_CHOICE = "MULTIQLE_CHOICE",
  ESSAY = "ESSAY",
}

export enum ExamAssignType {
  ALL = "ALL",
  STUDENT = "STUDENT",
  CLASS = "CLASS",
}

export enum ExamType {
  TEST = "TEST",
  PRACTICE = "PRACTICE",
}

export interface IOption {
  id: number;
  key: string;
  content: string;
  isCorrect: boolean;
  questionId: number;
  createdAt: string;
  updatedAt: string;
  QuestionId: number;
}

export interface IQuestion {
  id: number;
  topic: string;
  scorePerQuestion: number;
  rawIndex: number;
  type: QuestionType;
  method: string | null;
  explain: string | null;
  createdAt: string;
  updatedAt: string;
  options: IOption[];
}

export interface IQuestionPart {
  id: number;
  title: string;
  rawIndex: number;
  createdAt: string;
  updatedAt: string;
  questions: IQuestion[];
}

export interface IExam {
  id: number;
  hashId: string;
  teacherId: number;
  gradeId: number;
  subjectId: number;
  purposeId: number;
  examType: "TEST" | "PRACTICE";
  isPublish: boolean;
  examLimitSubmit: number;
  isRandomQuestion: boolean;
  isHideGroupQuestionTitle: boolean;
  isSectionsStartingFromQuestion1: boolean;
  showResult: "NO" | "SUBMITTED" | "ALL_SUBMITTED";
  showAnswer: "NO" | "SUBMITTED" | "ALL_SUBMITTED" | "REACHED_POINT";
  fee: string;
  header: string | null;
  createdAt: string;
  updatedAt: string;
  questionTotal: number;
  submitTotal: number;
  assignedStudentIds: number[];
  assignedClassIds: number[];
  title: string;
  duration: number;
  assignType: ExamAssignType;
  teacher: ITeacher;
  examResults: IExamResult[];
  examClasses: IExamClass[];
  questionParts: IQuestionPart[];
  type: ExamType;
  startDate: string;
  endDate: string;
  examStudents: IExamStudent[];
}

export interface IExamClass {
  id: number;
  classId: number;
  examId: number;
  exam: IExam;
  classroom: IClassroom;
}

export interface IExamStudent {
  id: number;
  examId: number;
  exam: IExam;
  studentClass: IStudentClass;
}

export interface IExamByClass {
  id: number;
  classId: number;
  examId: number;
}

export interface IExamResult {
  id: number;
  examresStarted: string;
  examresSaved: string;
  rightAnswer: number;
  startedAt: string;
  savedAt: string;
  questionTotal: number;
  examresAnswers: string;
  mark: number;
  createdAt: string;
  examId: number;
  studentId: number;
  exam: IExam;
  student: IStudent;
  answer: string;
}

export interface IExamByStudent {
  id: number;
  examId: number;
  studentId: number;
}

export interface IExamPreview extends IExam {
  submitTotal: number;
}

export interface ICreateExam {
  examName: string;
  gradeId: string;
  subjectId: string;
  purposeId: string;
  examDescribe: string;
  examContent: object;
}

