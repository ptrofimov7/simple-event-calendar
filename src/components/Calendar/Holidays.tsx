import { HOLIDAY_COLOR_DEFAULT } from '../../data';
import { datesAreOnSameDay } from '../../helpers';
import { StyledHoliday } from './Calendar.styled';

const Holidays = ({date, data}: any) => {
   return (
      <>
        {data.map(
            (holiday: any, index: number) =>
               datesAreOnSameDay( holiday.date, date ) && (
                  <StyledHoliday
                     className="StyledHoliday"
                     key={`${holiday.name}_${index}`}
                     bgColor={HOLIDAY_COLOR_DEFAULT}
                  >
                     {holiday.name}
                  </StyledHoliday>
               )
         )}
      </>
   );
};

export default Holidays;