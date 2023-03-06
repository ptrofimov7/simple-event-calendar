import { useCalendarContext } from '../../context';
import { HOLIDAY_COLOR_DEFAULT } from '../../data';
import { datesAreOnSameDay } from '../../helpers';
import { StyledHoliday } from '../../styles/Calendar.styled';
import { IHoliday } from '../../types';

interface HolidaysProps {
   date: Date
}

const Holidays = ({ date }: HolidaysProps) => {
   const {isLoading, isError, holidays} = useCalendarContext()

   if (isLoading) {
      return <div>Loading ...</div>
   }

   if (isError) {
      return <div>Holidays error!</div>
   }
   return (
      <>
         {holidays.map(
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