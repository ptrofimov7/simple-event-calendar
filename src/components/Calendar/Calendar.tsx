import { useRef, useState } from "react";
import {
   SevenColGrid,
   Wrapper,
   HeadDays,
} from "./Calendar.styled";
import { DAYS, MOCKTASKS } from "../../data/";
import {
   getDarkColor,
   getDaysInMonth,
   getSortedDays,
   nextMonth,
   prevMonth,
} from "../../helpers";
import { ITask } from "../../types";
import Tasks from "./Tasks";
import CalendarDay from "./CalendarDay";
import CalendarHeader from "./CalendarHeader";
import TaskModal from "./TaskModal";
import CalendarActions from "./CalendarActions";

export default function Calendar() {
   const [currentDate, setCurrentDate] = useState(new Date(2022, 9, 1));
   const [tasks, setTasks] = useState(MOCKTASKS);
   const dragDateRef = useRef<any>();
   const dragindexRef = useRef<any>();
   const [showModal, setShowModal] = useState(false);
   const [modalData, setModalData] = useState<ITask>({} as ITask);

   const addTask = (date: Date, e: any) => {
      if (!e.target.classList.contains("StyledTask")) {
         const text = window.prompt("name");
         if (text) {
            date.setHours(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            setTasks((prev) => [
               ...prev,
               { date, title: text, color: getDarkColor() }
            ]);
         }
      }
   };

   const drag = (index: number, e: any) => {
      dragindexRef.current = { index, target: e.target };
   };

   const onDragEnter = (date: Date, e: any) => {
      e.preventDefault();
      dragDateRef.current = { date, target: e.target.id };
   };

   const drop = (e: any) => {
      e.preventDefault();

      setTasks((prev) =>
         prev.map((task, index) => {
            if (index === dragindexRef.current.index) {
               task.date = dragDateRef.current.date;
            }
            return task;
         })
      );
   };

   const handleOnClickEvent = (task: any) => {
      setShowModal(true);
      setModalData(task);
   };

   const handleModalClose = () => setShowModal(false);

   const handleDelete = () => {
      setTasks((prev) =>
         prev.filter((task) => task.title !== modalData.title)
      );
      handleModalClose();
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
   console.log({sortedDays});

   return (
      <Wrapper>
         <CalendarHeader
            currentDate={currentDate} handleClickPrevMonth={handleClickPrevMonth}
            handleClickNextMonth={handleClickNextMonth}
         />
         <CalendarActions />
         <SevenColGrid>
            {DAYS.map((day) => (
               <HeadDays key={day} className="nonDRAG">{day}</HeadDays>
            ))}
         </SevenColGrid>
         <SevenColGrid
            fullheight={true}
            is28Days={getDaysInMonth(currentDate) === 28}
            rows={Math.ceil(sortedDays.length / 7)}
         >
            {sortedDays.map((day, index) => (
               <CalendarDay
                  key={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}/${index}`}
                  currentDate={currentDate}
                  day={day}
                  onDragEnter={onDragEnter}
                  addTask={addTask}
                  onDragEnd={drop}>
                  <Tasks tasks={tasks}
                     currentDate={currentDate}
                     day={day}
                     onDrag={drag}
                     onClick={handleOnClickEvent}
                  />
               </CalendarDay>
            ))}
         </SevenColGrid>
         {showModal && (
            <TaskModal
               {...modalData}
               handleDelete={handleDelete}
               handleModalClose={handleModalClose}
            />
         )}
      </Wrapper>
   );
};
