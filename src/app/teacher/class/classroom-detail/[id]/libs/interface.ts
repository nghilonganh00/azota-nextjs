import { IHomework as Homework } from "@/interfaces";

export interface IGroupedHomework {
  [key: string]: IHomework[];
}

export interface IHomework extends Homework {
  id: number;
  Homework: {
    homeworkName: string;
  };
}
