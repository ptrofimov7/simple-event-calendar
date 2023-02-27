import { useRef, useState } from "react";
import {
   SevenColGrid,
   Wrapper,
   HeadDays,
} from "./Calendar.styled";
import { DAYS, MOCKTASKS, TASK_COLOR_DEFAULT } from "../../data/";
import {
   getSortedDays,
   getUniqId,
   nextMonth,
   prevMonth,
} from "../../helpers";
import { ILabel, ITask } from "../../types";
import Tasks from "./Tasks";
import CalendarDay from "./CalendarDay";
import CalendarHeader from "./CalendarHeader";
import TaskModal from "./TaskModal";
import CalendarActions from "./CalendarActions";
import Holidays from "./Holidays";
import { useQuery } from "react-query";
import fetchHolidays from "./api/fetchHolidays";
import TaskLabelModal from "./TaskLabelModal";

export default function Calendar() {
   const [currentDate, setCurrentDate] = useState(new Date(2022, 9, 1));
   const [tasks, setTasks] = useState(MOCKTASKS);
   const dragDateRef = useRef<any>();
   const dragindexRef = useRef<any>();
   const [showTaskModal, setShowTaskModal] = useState(false);
   const [showLabelModal, setShowLabelModal] = useState(false);
   const [modalTaskData, setModalTaskData] = useState<ITask>({} as ITask);
   const [search, setSearch] = useState('')
   const [labels, setLabels] = useState<ILabel[]>([])
   const [filterLabels, setFilterLabels] = useState<ILabel[]>([])
   const [modalLabelData, setModalLabelData] = useState<ILabel>({} as ILabel);
   const currentYear = currentDate.getFullYear()
   const { data: holidays, isError, isLoading } = useQuery(['holidays', currentYear], () => fetchHolidays(currentYear))

   const updateTaskLabels = ({ id, title, labels }: { id: string, title: string, labels: ILabel[] }) => {
      if (labels || title) {
         setTasks((prev) => prev.map(task => {
            if (task.id === id) {
               return { ...task, labels, title }
            }
            return task
         }));
      }
      handleTaskModalClose()
   };

   const updateFilterLabels = (labels: ILabel[]) => {
      setFilterLabels(labels);
   };

   const addUpdateLabel = (label: ILabel) => {
      const id = label?.id || getUniqId()
      if (label?.title && label?.color) {
         setLabels((prev) => {
            const found = prev.find(element => element.id === id)
            if (found) {
               return prev.map(element => {
                  if (element.id === id) {
                     return {
                        ...element,
                       ...label
                     }
                  }
                  return element
               })
            }
            return [
               ...prev,
               {  ...label, id }
            ]
         });
      }
      handleLabelModalClose()
   };

   const handleAddEditLabel = (label: ILabel | undefined) => {
      setShowLabelModal(true);
      setModalLabelData(label ?? {} as ILabel);
   };

   const handleLabelModalClose = () => setShowLabelModal(false);

   const deleteLabel = (id: string) => {
      setLabels((prev) =>
         prev.filter((label) => label.id !== id)
      );
      handleLabelModalClose();
   };

   const addTask = (date: Date, e: any) => {
      if (!e.target.classList.contains("StyledTask")) {
         const text = window.prompt("name");
         if (text) {
            date.setHours(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            setTasks((prev) => [
               ...prev,
               { id: getUniqId(), date, title: text, color: TASK_COLOR_DEFAULT }
            ]);
         }
      }
   };

   const drag = (index: number, date: Date, e: any) => {
      dragindexRef.current = { index, date, target: e.target };
   };

   const onDragEnter = (date: Date, e: any) => {
      e.preventDefault();
      e.stopPropagation()
      dragDateRef.current = { date, target: e.target.id };
   };

   const onDragEnterSameDate = (index: number, date: Date, e: any) => {
      e.preventDefault();
      e.stopPropagation()
      dragDateRef.current = { index, date, target: e.target.id };
   };

   const drop = (e: any) => {
      e.preventDefault();
      e.stopPropagation()
      const IsSameDate = dragDateRef.current.date === dragindexRef.current.date
      setTasks((prev) => {
         let taskFrom = prev[dragindexRef.current.index]
         if (!taskFrom) return prev
         if (IsSameDate) {
            const list = [...prev]
            list.splice(dragindexRef.current.index, 1)
            list.splice(dragDateRef.current.index, 0, taskFrom)
            return list
         }
         const list = [...prev]
         list.splice(dragindexRef.current.index, 1)
         list.splice(0, 0, { ...taskFrom, date: dragDateRef.current.date })
         return list
      });
   };

   const handleTaskEdit = (task: any) => {
      setShowTaskModal(true);
      setModalTaskData(task);
   };

   const handleTaskModalClose = () => setShowTaskModal(false);

   const handleTaskDelete = () => {
      setTasks((prev) =>
         prev.filter((task) => task.title !== modalTaskData.title)
      );
      handleTaskModalClose();
   };

   const handleClickPrevMonth = () => {
      const date = new Date(currentDate)
      prevMonth(date, setCurrentDate)
   }
   const handleClickNextMonth = () => {
      const date = new Date(currentDate)
      nextMonth(date, setCurrentDate)
   }
   const sortedDays = getSortedDays(currentDate)
   let filteredTasks = search ? tasks.filter((task) => task.title.toLowerCase().includes(search)) : tasks
   filteredTasks = filterLabels.length === 0 ? filteredTasks : filteredTasks.filter((task) => {
      let taskLabels = task.labels
      if (!taskLabels) {
         return false
      }
      return taskLabels.some(taskLabel => {
         return filterLabels.some(label => taskLabel.id === label.id)
      })
   }
   )

   if (isLoading) {
      return <div>Loading ...</div>
   }

   if (isError) {
      return <div>Something went wrong</div>
   }

   return (
      <Wrapper>
         <CalendarHeader
            currentDate={currentDate} handleClickPrevMonth={handleClickPrevMonth}
            handleClickNextMonth={handleClickNextMonth}
         />
         <CalendarActions
            labels={labels}
            search={search}
            onSearch={setSearch}
            handleAddEditLabel={handleAddEditLabel}
            setFilterLabels={setFilterLabels}
         />
         <SevenColGrid>
            {DAYS.map((day) => (
               <HeadDays key={day} className="nonDRAG">{day}</HeadDays>
            ))}
         </SevenColGrid>
         <SevenColGrid
            fullheight={true}
            rows={Math.ceil(sortedDays.length / 7)}
         >
            {sortedDays.map((day, index) => {
               const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
               const id = `${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}/${index}`
               return (
                  <CalendarDay
                     key={id}
                     id={id}
                     date={date}
                     onDragEnter={onDragEnter}
                     addTask={addTask}
                     onDragEnd={drop}>
                     <Tasks
                        tasks={filteredTasks}
                        date={date}
                        onDrag={drag}
                        onDragEnter={onDragEnterSameDate}
                        onDragEnd={drop}
                        onClick={handleTaskEdit}
                        onEditLabel={handleAddEditLabel}
                     />
                     <Holidays date={date} data={holidays} />
                  </CalendarDay>
               )
            })}
         </SevenColGrid>
         {showTaskModal && (
            <TaskModal
               labels={labels}
               updateTaskLabels={updateTaskLabels}
               taskData={modalTaskData}
               handleDelete={handleTaskDelete}
               handleModalClose={handleTaskModalClose}
            />
         )}
         {showLabelModal && (
            <TaskLabelModal
               label={modalLabelData}
               handleModalSave={addUpdateLabel}
               handleDelete={deleteLabel}
               handleModalClose={handleLabelModalClose}
            />
         )}
      </Wrapper>
   );
};
