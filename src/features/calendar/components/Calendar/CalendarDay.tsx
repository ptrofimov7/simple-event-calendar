import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ReactNode } from 'react';
import { useCalendarContext } from '../../context';
import { datesAreOnSameDay } from '../../helpers';

interface CalendarDayProps {
   id: string,
   date: Date,
   children: ReactNode
}

const CalendarDay = ({ id, date, children }: CalendarDayProps) => {
   const day = date.getDate() || ''
   const {
      onDragEnter,
      openNewTaskModal,
      drop,
   } = useCalendarContext()
   return (
      <div
         id={id}
         onDragEnter={(e) => onDragEnter(date, e)}
         onDragOver={(e) => e.preventDefault()}
         onDragEnd={drop}
      >
         <span
            className={`nonDRAG ${datesAreOnSameDay(new Date(), date)
               ? "active"
               : ""
               }`}
         >
            {day}
         </span>
         {day && <IconButton aria-label="add task" onClick={(e) => {
            e.stopPropagation()
            openNewTaskModal(date)
         }}>
            <Add />
         </IconButton>}
         {children}
      </div>
   );
};

export default CalendarDay;