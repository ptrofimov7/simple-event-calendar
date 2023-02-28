import React, { ReactNode } from "react";
import { datesAreOnSameDay } from "../../helpers";
import { SeeMore, StyledTask } from "../../styles/Calendar.styled";
import { ILabel, ITask } from "../../types";
import TaskLabels from "./TaskLabels";

interface TasksProps {
   tasks: ITask[],
   date: Date,
   onDrag: (index: number, date: Date, e: React.DragEvent) => void,
   onDragEnter: (index: number, date: Date, e: React.DragEvent) => void,
   onDragEnd: (e: React.DragEvent) => void,
   onClick: (task: ITask) => void,
   onEditLabel: (label: ILabel | undefined) => void,
}

const Tasks = ({ tasks, date, onDrag, onDragEnter, onDragEnd, onClick, onEditLabel }: TasksProps) => {
   return (
      <TaskWrapper>
         {tasks.map(
            (task: ITask, index: number) =>
               datesAreOnSameDay(task.date, date) && (
                  <StyledTask
                     onDragStart={(e: React.DragEvent) => onDrag(index, date, e)}
                     onDragEnter={(e: React.DragEvent) => onDragEnter(index, date, e)}
                     onDragEnd={onDragEnd}
                     onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        onClick(task)
                     }}
                     draggable
                     className="StyledTask"
                     id={`${task.color} ${task.title}`}
                     key={`${task.id}`}
                     bgColor={task.color}
                  >
                     <p>{task.title}</p>
                     <TaskLabels labels={task.labels} onEdit={onEditLabel} />
                  </StyledTask>
               )
         )}
      </TaskWrapper>
   );
};

export default Tasks;

const TaskWrapper = ({ children }: { children: ReactNode[] }) => {
   if (children.filter((child: ReactNode) => child).length > 0)
      return (
         <>
            {children}
            {children.filter((child: ReactNode) => child).length > 5 && (
               <SeeMore
                  onClick={(e: React.MouseEvent) => {
                     e.stopPropagation();
                  }}
               >
                  see more...
               </SeeMore>
            )}
         </>
      );
   return null
};