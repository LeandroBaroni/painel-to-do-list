import { PriorityEnum } from "@enums/priority";
import { BaseModel } from "./base-model";

export interface ToDo extends BaseModel{
  description: string;
  isCompleted: boolean;
  priority: PriorityEnum,
  userId: number;
}
