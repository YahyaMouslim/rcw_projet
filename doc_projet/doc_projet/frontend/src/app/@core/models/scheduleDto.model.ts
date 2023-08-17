import {Classroom} from "./classroom.model";
import {Course} from "./course.model";
import {User} from "./user.model";
import {Program} from "./program.model";

export interface ScheduleDtoModel {
  _id: number;
  program: Program,
  course: Course,
  classroom: Classroom,
  professor: User,
  day: string,
  startTime: string,
  endTime: string,
}
