import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { getMonthYear } from '../../helpers';
import { DateControls } from '../../styles/Calendar.styled';

const CalendarHeader = ({ currentDate, handleClickPrevMonth, handleClickNextMonth }: any) => {
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