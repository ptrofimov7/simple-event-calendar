import { HOLIDAY_COLOR_DEFAULT } from '../../data';
import { datesAreOnSameDay } from '../../helpers';
import { StyledHoliday } from '../../styles/Calendar.styled';
import { IHoliday } from '../../types';

interface HolidaysProps {
   date: Date,
   data: IHoliday[]
}

const Holidays = ({ date, data }: HolidaysProps) => {
   return (
      <>
         {data.map(
            (holiday: IHoliday, index: number) =>
               datesAreOnSameDay(holiday.date, date) && (
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