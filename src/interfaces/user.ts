export enum IUserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export enum IGender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

export interface IUser {
  id: number;
  fullname: string;
  email: string;
  DOB: string;
  phone: string;
  avatarURL: string;
  role: IUserRole;
  gender: IGender;
}

export interface ITeacher {
  id: number;
  user: IUser;
}

export interface IStudent {
  id: number;
  fullname: string;
  gender: IGender;
  role: IUserRole;
  createdAt: string;
  updatedAt: string;
  confirmedAt: string;
  user: IUser;
}
