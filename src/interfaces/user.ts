export enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export enum Gender {
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
  role: UserRole;
  gender: Gender;
}

export interface ITeacher {
  id: number;
  user: IUser;
}

export interface IStudent {
  id: number;
  fullname: string;
  gender: Gender;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  confirmedAt: string;
  user: IUser;
}
