import { datesAreOnSameDay } from '../../helpers';

const CalendarDay = ({ id, date, onDragEnter, addTask, onDragEnd, children }: any) => {
   const day = date.getDate() || ''
   return (
      <div
         id={id}
         onDragEnter={(e) => onDragEnter(date, e)}
         onDragOver={(e) => e.preventDefault()}
         onDragEnd={onDragEnd}
         onClick={(e) =>  addTask(date, e )}
      >
         <span
            className={`nonDRAG ${datesAreOnSameDay( new Date(), date )
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