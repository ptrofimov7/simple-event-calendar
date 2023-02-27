import { Box, Chip, styled } from '@mui/material';
import { ILabel } from '../../types';

const ListItem = styled('li')(({ theme }) => ({
   margin: theme.spacing(0.5),
}));
const TaskLabels = ({ labels, onEdit }: {labels: ILabel[] | undefined, onEdit: (value: ILabel) => void}) => {

   return (
      <Box
         sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            listStyle: 'none',
            p: 0.5,
            m: 0,
         }}
         component="ul"
      >
         {labels?.map((label: ILabel) => {
            return (
               <ListItem key={label.id}>
                  <Chip
                     size='small'
                     label={label.title}
                     onClick={(e) =>  {
                        e.stopPropagation()
                        onEdit(label)
                     }}
                     sx={{color: 'white'}}
                  />
               </ListItem>
            );
         })}
      </Box>
   );
}

export default TaskLabels;