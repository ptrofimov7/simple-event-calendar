import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ReactNode } from 'react';
import { datesAreOnSameDay } from '../../helpers';

interface CalendarDayProps {
   id: string,
   date: Date,
   onDragEnter:(date: Date, e: React.DragEvent) => void,
   onAddTask: (date: Date) => void,
   onDragEnd: (e: React.DragEvent) => void,
   children: ReactNode
}

const CalendarDay = ({ id, date, onDragEnter, onAddTask, onDragEnd, children }: CalendarDayProps) => {
   const day = date.getDate() || ''
   return (
      <div
         id={id}
         onDragEnter={(e) => onDragEnter(date, e)}
         onDragOver={(e) => e.preventDefault()}
         onDragEnd={onDragEnd}
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
            onAddTask(date)
         }}>
            <Add />
         </IconButton>}
         {children}
      </div>
   );
};

export default CalendarDay;