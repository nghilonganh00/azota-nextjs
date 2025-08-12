import { IHomework, IHomeworkResult } from "./homework";
import { IGender, IStudent } from "./user";

export interface IGrade {
  id: string;
  name: string;
}

export interface IPurpose {
  id: string;
  title: string;
  position: number;
  semester: number;
}

export interface ISubject {
  id: string;
  subjectName: string;
}

export interface IClassgroup {
  id: number;
  classgroupName: string;
  teacherId: number;
  classrooms: IClassroom[];
}

export interface IClassroom {
  id: number;
  className: string;
  classYear: string;
  teacherId: string;
  studentCount: number;
  classgroupId: string;
  classgroup: IClassgroup;
  studentClasses: IStudentClass[];
  createdAt: string;
  updatedAt: string;
}

export interface IStudentClass {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  gender: IGender;
  DOB: Date;
  identificationNumber: string;
  confirmedAt: string;
  classroomId: number;
  student: IStudent;
  classroom: IClassroom;
  homeworkResults: IHomeworkResult[];
}

export interface IClassWithHomework {
  id: number;
  className: string;
  classYear: string;
  teacherId: string;
  classGroupId: string;
  createdAt: string;
  updatedAt: string;
  homeworks: IHomework[];
}

export interface IGrade {
  id: string;
  name: string;
}
