import React, { ReactNode } from "react";
import { useCalendarContext } from "../../context";
import { datesAreOnSameDay } from "../../helpers";
import { SeeMore, StyledTask } from "../../styles/Calendar.styled";
import { ITask } from "../../types";
import TaskLabels from "./TaskLabels";

interface TasksProps {
   date: Date,
}

const Tasks = ({ date }: TasksProps) => {
   const { tasksWithLabels,
   drag,
   onDragEnterSameDate,
   drop,
   openExistedTaskModal,
   openLabelModal,} =useCalendarContext()
   return (
      <TaskWrapper>
         {tasksWithLabels.map(
            (task: ITask, index: number) => {
               return datesAreOnSameDay(task.date, date) && (
                  <StyledTask
                     onDragStart={(e: React.DragEvent) => drag(index, date, e)}
                     onDragEnter={(e: React.DragEvent) => onDragEnterSameDate(index, date, e)}
                     onDragEnd={drop}
                     onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        openExistedTaskModal(task)
                     }}
                     draggable
                     className="StyledTask"
                     id={`${task.color} ${task.title}`}
                     key={`${task.id}`}
                     bgColor={task.color}
                  >
                     <p>{task.title}</p>
                     <TaskLabels labels={task.labels} onEdit={openLabelModal} />
                  </StyledTask>
               )
            }
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