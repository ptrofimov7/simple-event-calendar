import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { ILabel } from '../../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};

interface TaskLabelProps {
   labels: ILabel[] | undefined,
   taskLabels?: ILabel[] | undefined,
   onChange: (value: ILabel[]) => void
}
const TaskLabel = ({ labels, taskLabels = [], onChange }: TaskLabelProps) => {

   const handleChange = (event: SelectChangeEvent<ILabel[]>) => {
      const {
         target: { value },
      } = event;
      if (typeof value !== 'string') {
         onChange(value)
      }
   };
   return (
      <FormControl sx={{ minWidth: 300 }}>
         <InputLabel id="demo-multiple-chip-label">Label</InputLabel>
         <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={taskLabels}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Label" />}
            renderValue={(selected) => (
               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected?.map((value: ILabel) => (
                     <Chip
                        key={value.id}
                        label={value.title}
                        sx={{ background: `${value.color}` }}
                     />
                  ))}
               </Box>)}

            MenuProps={MenuProps}
         >
            {labels?.map((label: any) => (
               <MenuItem
                  key={label.id}
                  value={label}
                  sx={{ background: `${label.color}` }}
               >
                  {label.title}
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   );
};

export default TaskLabel;