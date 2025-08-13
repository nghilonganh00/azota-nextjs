import { IHomeworkSubmission, IStudentClass } from "@/interfaces";

export interface StudentClassWithSubmissions extends IStudentClass {
  homeworkSubmissions: IHomeworkSubmission[];
}
