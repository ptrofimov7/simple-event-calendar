import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useCalendarContext } from '../../context';
import { getMonthYear } from '../../helpers';
import { DateControls } from '../../styles/Calendar.styled';

interface CalendarHeaderProps {
   currentDate: Date,
}

const CalendarHeader = ({ currentDate}: CalendarHeaderProps) => {
   const year = getMonthYear(currentDate)
   const {moveToNextMonth, moveToPrevMonth} = useCalendarContext()
   return (
      <DateControls>
         <IconButton aria-label="prev" onClick={moveToPrevMonth}>
            <ArrowBack />
         </IconButton>
         {year}
         <IconButton aria-label="next" onClick={moveToNextMonth}>
            <ArrowForward />
         </IconButton>
      </DateControls>
   );
};

export default CalendarHeader;