import { Close, Delete, Save } from '@mui/icons-material';
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { LABEL_COLORS } from '../../data';
import { ModalWrapper } from '../../styles/Calendar.styled';

const TaskLabelModal = ({ label, handleModalSave, handleDelete, handleModalClose }: any) => {
   const [color, setColor] = useState(label?.color || '')
   const [title, setTitle] = useState(label?.title || '')
   return (
      <ModalWrapper onClick={(e: any) => e.stopPropagation()}>
         <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e: any) => setTitle(e.target.value)} />
         <FormControl fullWidth>
            <InputLabel id="color-select-label">Color</InputLabel>
            <Select
               labelId="color-select-label"
               id="color-select"
               value={color}
               label="Color"
               onChange={(e: any) => setColor(e.target.value)}
            >
               {LABEL_COLORS.map((color) => (
                  <MenuItem key={color} value={color}>{color}</MenuItem>
               ))}
            </Select>
         </FormControl>
         <IconButton aria-label="save" onClick={(e: any) => {
            e.stopPropagation()
            handleModalSave({ id: label?.id, color, title })
         }}>
            <Save />
         </IconButton>
         {label?.id && <IconButton aria-label="trash" onClick={(e: any) => {
            e.stopPropagation()
            handleDelete(label?.id)
         }}>
            <Delete />
         </IconButton>
         }
         <IconButton aria-label="close" onClick={handleModalClose}>
            <Close />
         </IconButton>
      </ModalWrapper>
   );
};

export default TaskLabelModal;