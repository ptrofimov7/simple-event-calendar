import { Close, Delete, Save } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { ILabel, ITask } from '../../types';
import { ModalWrapper } from '../../styles/Calendar.styled';
import TaskLabel from './TaskLabel';

interface TaskModalProps {
   taskData: ITask,
   labels: ILabel[] | undefined,
   handleDelete: () => void,
   handleModalClose: () => void,
   handleUpdate: (task: ITask) => void
}

const TaskModal = ({ taskData, labels, handleDelete, handleModalClose, handleUpdate }: TaskModalProps) => {
   const { id, date, labels: taskLabels } = taskData
   const [title, setTitle] = useState(taskData.title)
   const [labelName, setLabelName] = useState<ILabel[]>(taskLabels as ILabel[]);
   return (
      <ModalWrapper onClick={(e: React.MouseEvent) => e.stopPropagation()}>
         <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
         <p>{date.toDateString()}</p>
         <TaskLabel labels={labels} taskLabels={labelName} onChange={setLabelName} />
         {id && <IconButton aria-label="trash" onClick={handleDelete}>
            <Delete />
         </IconButton>
         }
         <IconButton aria-label="save" onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            if (!title) {
               alert('Title is required')
               return
            }
            handleUpdate({ ...taskData, title, labels: labelName })
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