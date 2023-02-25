import { SeeMore, StyledTask } from "./Calendar.styled";
import { datesAreOnSameDay } from "../../helpers";

const Tasks = ({ tasks, date, onDrag, onDragEnter, onDragEnd, onClick }: any) => {
   return (
      <TaskWrapper>
         {tasks.map(
            (task: any, index: number) =>
               datesAreOnSameDay( task.date, date ) && (
                  <StyledTask
                     onDragStart={(e: any) => onDrag(index, date, e)}
                     onDragEnter={(e: any) => onDragEnter(index, date, e)}
                     onDragEnd={onDragEnd}
                     onClick={() => onClick(task)}
                     draggable
                     className="StyledTask"
                     id={`${task.color} ${task.title}`}
                     key={task.title}
                     bgColor={task.color}
                  >
                     {task.title}
                  </StyledTask>
               )
         )}
      </TaskWrapper>
   );
};

export default Tasks;

const TaskWrapper = ({ children }: any) => {
   if (children.filter((child: any) => child).length > 0)
      return (
         <>
            {children}
            {children.filter((child: any) => child).length > 5 && (
               <SeeMore
                  onClick={(e: any) => {
                     e.stopPropagation();
                     console.log("clicked p");
                  }}
               >
                  see more...
               </SeeMore>
            )}
         </>
      );
   return null
};