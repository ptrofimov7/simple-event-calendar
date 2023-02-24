import { Close, Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ModalWrapper } from './Calendar.styled';

const TaskModal = ({ title, date, handleDelete, handleModalClose }: any) => {
   return (
      <ModalWrapper>
         <h2>{title}</h2>
         <p>{date.toDateString()}</p>
         <IconButton aria-label="trash" onClick={handleDelete}>
            <Delete />
         </IconButton>
         <IconButton aria-label="close" onClick={handleModalClose}>
            <Close />
         </IconButton>
      </ModalWrapper>
   );
};

export default TaskModal;