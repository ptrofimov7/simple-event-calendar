import { SeeMore, StyledTask } from "./Calendar.styled";
import { datesAreOnSameDay } from "../../helpers";

const Tasks = ({ tasks, currentDate, day, onDrag, onClick }: any) => {
   return (
      <TaskWrapper>
         {tasks.map(
            (task: any, index: number) =>
               datesAreOnSameDay(
                  task.date,
                  new Date(
                     currentDate.getFullYear(),
                     currentDate.getMonth(),
                     day
                  )
               ) && (
                  <StyledTask
                     onDragStart={(e: any) => onDrag(index, e)}
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
   if (children.filter((child: any) => child).length)
      return (
         <>
            {children}
            {children.filter((child: any) => child).length > 2 && (
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