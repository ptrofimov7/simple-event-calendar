import { Box, Button, TextField } from '@mui/material';
import { useRef } from 'react';
import { ILabel } from '../../types';
import TaskLabel from '../Tasks/TaskLabel';


interface CalendarActionsProps {
   search: string,
   labels: ILabel[],
   onSearch: (value: string) => void,
   onAddLabel: (label?: ILabel) => void,
   setFilterLabels: (labels: ILabel[]) => void,
   saveSettingInFile: () => void,
   loadSettingsFromFile: (file: File) => void,
   saveCalendarAsImage: () => void
}

const CalendarActions = ({
   search, labels, onSearch, onAddLabel, setFilterLabels,
   saveSettingInFile, loadSettingsFromFile, saveCalendarAsImage }: CalendarActionsProps) => {

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
         <Button onClick={() => onAddLabel()}>Create label</Button>
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
               Load settings
            </Button>
         </label>
         <Button onClick={() => saveSettingInFile()}>Save settings</Button>
         <Button onClick={() => saveCalendarAsImage()}>Save as picture</Button>
      </Box>
   );
};

export default CalendarActions;