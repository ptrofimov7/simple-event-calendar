import {
   SevenColGrid,
   Wrapper,
   HeadDays,
} from "../../styles/Calendar.styled";
import { DAYS } from "../../data";
import Tasks from "../Tasks/Tasks";
import CalendarDay from "./CalendarDay";
import CalendarHeader from "./CalendarHeader";
import TaskModal from "../Tasks/TaskModal";
import CalendarActions from "./CalendarActions";
import Holidays from "./Holidays";
import TaskLabelModal from "../Tasks/TaskLabelModal";
import useCalendar from "../../hooks/useCalendar";

export default function Calendar() {
   const {
      isLoading,
      isError,
      currentDate,
      labels,
      filterLabels,
      search,
      refCalendar,
      tasksWithLabels,
      sortedDays,
      modalTaskData,
      modalLabelData,
      holidays,
      showTaskModal,
      showLabelModal,
      updateFilterLabels,
      setSearch,
      drag,
      drop,
      onDragEnter,
      onDragEnterSameDate,
      updateTask,
      deleteTask,
      updateLabel,
      deleteLabel,
      openLabelModal,
      openNewTaskModal,
      closeLabelModal,
      closeTaskModal,
      openExistedTaskModal,
      moveToPrevMonth,
      moveToNextMonth,
      saveSettingInFile,
      saveCalendarAsImage,
      loadSettingsFromFile,
   } = useCalendar()

   if (isLoading) {
      return <div>Loading ...</div>
   }

   if (isError) {
      return <div>Something went wrong</div>
   }

   return (
      <Wrapper ref={refCalendar}>
         <CalendarHeader
            currentDate={currentDate} handleClickPrevMonth={moveToPrevMonth}
            handleClickNextMonth={moveToNextMonth}
         />
         <CalendarActions
            labels={labels}
            filterLabels={filterLabels}
            search={search}
            onSearch={setSearch}
            onAddLabel={openLabelModal}
            updateFilterLabels={updateFilterLabels}
            saveSettingInFile={saveSettingInFile}
            loadSettingsFromFile={loadSettingsFromFile}
            saveCalendarAsImage={saveCalendarAsImage}
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
                     onAddTask={openNewTaskModal}
                     onDragEnd={drop}>
                     <Tasks
                        tasks={tasksWithLabels}
                        date={date}
                        onDrag={drag}
                        onDragEnter={onDragEnterSameDate}
                        onDragEnd={drop}
                        onClick={openExistedTaskModal}
                        onEditLabel={openLabelModal}
                     />
                     <Holidays date={date} data={holidays} />
                  </CalendarDay>
               )
            })}
         </SevenColGrid>
         {showTaskModal && (
            <TaskModal
               labels={labels}
               handleUpdate={updateTask}
               taskData={modalTaskData}
               handleDelete={deleteTask}
               handleModalClose={closeTaskModal}
            />
         )}
         {showLabelModal && (
            <TaskLabelModal
               label={modalLabelData}
               handleUpdate={updateLabel}
               handleDelete={deleteLabel}
               handleModalClose={closeLabelModal}
            />
         )}
      </Wrapper>
   );
};
