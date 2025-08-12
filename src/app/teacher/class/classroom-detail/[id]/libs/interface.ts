import { IHomework } from "@/interfaces";

export interface IGroupedHomework {
  [key: string]: IHomework[];
}
