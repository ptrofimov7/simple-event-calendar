import { TextField } from '@mui/material';

const CalendarActions = ({ search, onSearch }: any) => {
   return (
      <div>
         <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={search}
          onChange={(e) => {
            onSearch(e.target.value)
         }
      }
        />
      </div>
   );
};

export default CalendarActions;