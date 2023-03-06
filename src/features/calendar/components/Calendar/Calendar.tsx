import {
   SevenColGrid,
   Wrapper,
   HeadDays,
} from "../../styles/Calendar.styled";
import { DAYS } from "../../data";
import Tasks from "../Tasks/Tasks";
import CalendarDay from "./CalendarDay";
import CalendarHeader from "./CalendarHeader";
import TaskModal from "../Tasks/TaskModal";
import CalendarActions from "./CalendarActions";
import Holidays from "./Holidays";
import TaskLabelModal from "../Tasks/TaskLabelModal";
import { useCalendarContext } from "../../context";

export default function Calendar() {
   const { refCalendar, sortedDays, currentDate, showTaskModal, showLabelModal } = useCalendarContext()

   return (
      <Wrapper ref={refCalendar}>
         <CalendarHeader
            currentDate={currentDate}
         />
         <CalendarActions />
         <SevenColGrid>
            {DAYS.map((day) => (
               <HeadDays key={day} className="nonDRAG">{day}</HeadDays>
            ))}
         </SevenColGrid>
         <SevenColGrid
            fullheight={true}
            rows={Math.ceil(sortedDays.length / 7)}
         >
            {sortedDays.map((day: number, index: number) => {
               const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
               const id = `${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}/${index}`
               return (
                  <CalendarDay
                     key={id}
                     id={id}
                     date={date}
                  >
                     <Tasks
                        date={date}
                     />
                     <Holidays
                        date={date}
                     />
                  </CalendarDay>
               )
            })}
         </SevenColGrid>
         {showTaskModal && (
            <TaskModal />
         )}
         {showLabelModal && (
            <TaskLabelModal />
         )}
      </Wrapper>
   );
};
