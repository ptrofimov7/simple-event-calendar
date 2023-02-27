import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { getMonthYear } from '../../helpers';
import { DateControls } from '../../styles/Calendar.styled';

interface CalendarHeaderProps {
   currentDate: Date,
   handleClickPrevMonth: () => void,
   handleClickNextMonth: () => void
}

const CalendarHeader = ({ currentDate, handleClickPrevMonth, handleClickNextMonth }: CalendarHeaderProps) => {
   const year = getMonthYear(currentDate)
   return (
      <DateControls>
         <IconButton aria-label="prev" onClick={handleClickPrevMonth}>
            <ArrowBack />
         </IconButton>
         {year}
         <IconButton aria-label="next" onClick={handleClickNextMonth}>
            <ArrowForward />
         </IconButton>
      </DateControls>
   );
};

export default CalendarHeader;