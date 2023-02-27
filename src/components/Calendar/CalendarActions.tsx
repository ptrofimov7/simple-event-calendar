import { Box, Button, TextField } from '@mui/material';
import TaskLabel from './TaskLabel';

const CalendarActions = ({ search, labels, onSearch, handleAddEditLabel, setFilterLabels }: any) => {
   return (
      <Box sx={{
         display: 'flex',
         gap: '20px',
         padding: '10px',
         alignItems: 'center'}}>
         <TextField
            id="Outlined-search"
            label="Search field"
            type="search"
            variant="outlined"
            value={search}
            onChange={(e) => {
               onSearch(e.target.value)
            }
            }
         />
         <TaskLabel labels={labels} onChange={setFilterLabels} />
         <Button onClick={() => handleAddEditLabel()}>Create label</Button>
      </Box>
   );
};

export default CalendarActions;