import { datesAreOnSameDay } from '../../helpers';
import { StyledHoliday } from './Calendar.styled';

const Holidays = ({date, data}: any) => {
   return (
      <div>
        {data.map(
            (holiday: any, index: number) =>
               datesAreOnSameDay( holiday.date, date ) && (
                  <StyledHoliday
                     className="StyledHoliday"
                     key={`${holiday.title}_${index}`}
                     bgColor='brown'
                  >
                     {holiday.title}
                  </StyledHoliday>
               )
         )}
      </div>
   );
};

export default Holidays;