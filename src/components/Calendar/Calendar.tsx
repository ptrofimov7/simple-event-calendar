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
import Holidays from "./Holidays";
import { useQuery } from "react-query";
import fetchHolidays from "./api/fetchHolidays";

export default function Calendar() {
   const [currentDate, setCurrentDate] = useState(new Date(2022, 9, 1));
   const [tasks, setTasks] = useState(MOCKTASKS);
   const dragDateRef = useRef<any>();
   const dragindexRef = useRef<any>();
   const [showModal, setShowModal] = useState(false);
   const [modalData, setModalData] = useState<ITask>({} as ITask);
   const [search, setSearch] = useState('')
   const currentYear = currentDate.getFullYear()
   const {data: holidays, isError, isLoading} = useQuery(['holidays', currentYear], () => fetchHolidays(currentYear))

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

   const handleOnClickTask = (task: any) => {
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
   const filteredTasks = search ? tasks.filter((task) => task.title.toLowerCase().includes(search)) : tasks

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
         <CalendarActions search={search} onSearch={setSearch} />
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
                        onClick={handleOnClickTask}
                     />
                     <Holidays date={date} data={holidays}/>
                  </CalendarDay>
               )
            })}
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
