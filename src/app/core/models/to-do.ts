import { BaseModel } from "./base-model";

export interface ToDo extends BaseModel{
  description: string;
  isCompleted: boolean;
  userId: number;
}
