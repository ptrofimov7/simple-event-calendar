import { datesAreOnSameDay } from "../../helpers";
import { SeeMore, StyledTask } from "../../styles/Calendar.styled";
import TaskLabels from "./TaskLabels";

const Tasks = ({ tasks, date, onDrag, onDragEnter, onDragEnd, onClick, onEditLabel }: any) => {
   return (
      <TaskWrapper>
         {tasks.map(
            (task: any, index: number) =>
               datesAreOnSameDay(task.date, date) && (
                  <>
                     <StyledTask
                        onDragStart={(e: any) => onDrag(index, date, e)}
                        onDragEnter={(e: any) => onDragEnter(index, date, e)}
                        onDragEnd={onDragEnd}
                        onClick={(e: any) => {
                           e.stopPropagation()
                           onClick(task)
                        }}
                        draggable
                        className="StyledTask"
                        id={`${task.color} ${task.title}`}
                        key={task.title}
                        bgColor={task.color}
                     >
                        <p>{task.title}</p>
                        <TaskLabels labels={task.labels} onEdit={onEditLabel} />
                     </StyledTask>

                  </>
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