import { Close, Delete, Save } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { ILabel } from '../../types';
import { ModalWrapper } from './Calendar.styled';
import TaskLabel from './TaskLabel';

const TaskModal = ({ taskData, labels, handleDelete, handleModalClose, updateTaskLabels }: any) => {
   const {id, date, labels: taskLabels} = taskData
   const [title, setTitle] = useState(taskData.title)
   const [labelName, setLabelName] = useState<ILabel[]>(taskLabels);
   return (
      <ModalWrapper onClick={(e: any) => e.stopPropagation()}>
         <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e: any) => setTitle(e.target.value)} />
         <p>{date.toDateString()}</p>
         {id && <>
            <TaskLabel labels={labels} taskLabels={taskLabels} onChange={setLabelName} />
            <IconButton aria-label="trash" onClick={handleDelete}>
               <Delete />
            </IconButton>
         </>
         }
         <IconButton aria-label="save" onClick={(e: any) => {
            e.stopPropagation()
            updateTaskLabels({...taskData, title, labels: labelName})
         }}>
            <Save />
         </IconButton>
         <IconButton aria-label="close" onClick={handleModalClose}>
            <Close />
         </IconButton>
      </ModalWrapper>
   );
};

export default TaskModal;