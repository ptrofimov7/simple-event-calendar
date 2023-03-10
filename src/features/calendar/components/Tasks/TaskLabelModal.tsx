import { Close, Delete, Save } from '@mui/icons-material';
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useCalendarContext } from '../../context';
import { LABEL_COLORS } from '../../data';
import { ModalWrapper } from '../../styles/Calendar.styled';

const TaskLabelModal = () => {
   const {
      modalLabelData,
      updateLabel,
      deleteLabel,
      closeLabelModal,
   } = useCalendarContext()
   const [color, setColor] = useState(modalLabelData?.color || '')
   const [title, setTitle] = useState(modalLabelData?.title || '')
   return (
      <ModalWrapper onClick={(e: React.MouseEvent) => e.stopPropagation()}>
         <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
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
         <IconButton aria-label="save" onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            if (!title || !color) {
               alert('Title and color are required!')
               return
            }
            updateLabel({ id: modalLabelData?.id, color, title })
         }}>
            <Save />
         </IconButton>
         {modalLabelData?.id && <IconButton aria-label="trash" onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            deleteLabel(modalLabelData.id)
         }}>
            <Delete />
         </IconButton>
         }
         <IconButton aria-label="close" onClick={closeLabelModal}>
            <Close />
         </IconButton>
      </ModalWrapper>
   );
};

export default TaskLabelModal;