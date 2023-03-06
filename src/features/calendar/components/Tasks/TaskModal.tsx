import { Close, Delete, Save } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { ILabel } from '../../types';
import { ModalWrapper } from '../../styles/Calendar.styled';
import TaskLabel from './TaskLabel';
import { useCalendarContext } from '../../context';


const TaskModal = () => {
   const {
      labels,
      updateTask,
      modalTaskData,
      deleteTask,
      closeTaskModal,
   } = useCalendarContext()
   const { id, date, labels: taskLabels } = modalTaskData
   const [title, setTitle] = useState(modalTaskData.title)
   const [labelName, setLabelName] = useState<ILabel[]>(taskLabels as ILabel[]);
   return (
      <ModalWrapper onClick={(e: React.MouseEvent) => e.stopPropagation()}>
         <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
         <p>{date.toDateString()}</p>
         <TaskLabel labels={labels} taskLabels={labelName} onChange={setLabelName} />
         {id && <IconButton aria-label="trash" onClick={deleteTask}>
            <Delete />
         </IconButton>
         }
         <IconButton aria-label="save" onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            if (!title) {
               alert('Title is required')
               return
            }
            updateTask({ ...modalTaskData, title, labels: labelName?.map(label => label.id) })
         }}>
            <Save />
         </IconButton>
         <IconButton aria-label="close" onClick={closeTaskModal}>
            <Close />
         </IconButton>
      </ModalWrapper>
   );
};

export default TaskModal;