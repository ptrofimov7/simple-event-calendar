import { ITask } from "../types";

export const DAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

export const TASK_COLOR_DEFAULT = 'gray'
export const HOLIDAY_COLOR_DEFAULT = 'brown'

export const MOCKTASKS: ITask[] = [
   { id: '1', date: new Date(2022, 9, 3), title: "appointment", color: TASK_COLOR_DEFAULT, labels: [] },
   { id: '2', date: new Date(2022, 9, 6), title: "doctos", color: TASK_COLOR_DEFAULT, labels: [] },
   { id: '4', date: new Date(2022, 9, 25), title: "bd", color: TASK_COLOR_DEFAULT, labels: [] },
   { id: '5', date: new Date(2022, 9, 3), title: "second", color: TASK_COLOR_DEFAULT, labels: [] }
];

export const LABEL_COLORS = ['red', 'yellow', 'green', 'blue']