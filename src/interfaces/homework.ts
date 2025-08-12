import { IClassroom, IStudentClass } from "./classroom";

export interface IHomework {
  id: number;
  hashId: string;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  isShowResult: boolean;
  isMustLogin: boolean;
  isInTrash: boolean;
  createdAt: string;
  teacherId: number;
  classroomId: number;
  classroom: IClassroom;
  homeworkFiles: IHomeworkFile[];
}

export interface IHomeworkFile {
  id: number;
  title: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  homework: IHomework;
}

export interface IHomeworkSubmission {
  id: number;
  note: string;
  isResend: boolean;
  resendMessage: string;
  point: number;
  confirmedAt: string;
  homework: IHomework;
  studentClass: IStudentClass;
  files: IHomeworkSubmissionFile[];
}

export interface IHomeworkSubmissionFile {
  id: number;
  title: string;
  link: string;
}

export interface IHomeworkResultFile {
  id: string;
  hwrfLink: string;
  hwResultId: number;
}

export interface IHomeworkResult {
  id: string;
  note: string | null;
  resendRequest: false;
  resendNote: string | null;
  point: number;
  confirmedAt: string;
  createdAt: string;
  updatedAt: string;
  studentId: number;
  homeworkId: number;
  HwResultFiles: IHomeworkResultFile[];
}

export interface INewHomework {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  isShowResult: boolean;
  isMustLogin: boolean;
  isInTrash: boolean;
  classroomIds: number[];
  homeworkFiles: File[];
}

