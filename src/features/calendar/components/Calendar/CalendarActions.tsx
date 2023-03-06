import { Box, Button, TextField } from '@mui/material';
import { useRef } from 'react';
import { useCalendarContext } from '../../context';
import TaskLabel from '../Tasks/TaskLabel';

const CalendarActions = () => {
   const {
      labels,
      filterLabels,
      search,
      setSearch,
      openLabelModal,
      updateFilterLabels,
      saveSettingInFile,
      loadSettingsFromFile,
      saveCalendarAsImage } = useCalendarContext()

   const uploadInputRef = useRef<HTMLInputElement>(null)

   const handleChangeFile = (e: React.ChangeEvent<any>) => {
      const file = e.target.files[0]
      loadSettingsFromFile(file)
   }

   return (
      <Box sx={{
         display: 'flex',
         gap: '20px',
         padding: '10px',
         alignItems: 'center'
      }}>
         <TextField
            sx={{ minWidth: 50 }}
            id="Outlined-search"
            label="Search field"
            type="search"
            variant="outlined"
            value={search}
            onChange={(e) => {
               setSearch(e.target.value)
            }
            }
         />
         <TaskLabel labels={labels} taskLabels={filterLabels} onChange={updateFilterLabels} />
         <Button onClick={() => openLabelModal()}>Create label</Button>
         <input
            color="primary"
            accept=".txt"
            type="file"
            onChange={handleChangeFile}
            ref={uploadInputRef}
            style={{ display: 'none' }}
         />
         <label htmlFor="button-file">
            <Button
               variant="contained"
               onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
            >
               Load
            </Button>
         </label>
         <Button onClick={() => saveSettingInFile()}>Save</Button>
         <Button onClick={() => saveCalendarAsImage()}>Save as image</Button>
      </Box>
   );
};

export default CalendarActions;