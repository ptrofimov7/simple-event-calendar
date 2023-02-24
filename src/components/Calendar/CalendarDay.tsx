import { datesAreOnSameDay } from '../../helpers';

const CalendarDay = ({ currentDate, day, onDragEnter, addTask, onDragEnd, children }: any) => {
   return (
      <div
         id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`}
         onDragEnter={(e) =>
            onDragEnter(
               new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
               ),
               e
            )
         }
         onDragOver={(e) => e.preventDefault()}
         onDragEnd={onDragEnd}
         onClick={(e) =>
            addTask(
               new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
               ),
               e
            )
         }
      >
         <span
            className={`nonDRAG ${datesAreOnSameDay(
               new Date(),
               new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
               )
            )
               ? "active"
               : ""
               }`}
         >
            {day}
         </span>
         {children}
      </div>
   );
};

export default CalendarDay;