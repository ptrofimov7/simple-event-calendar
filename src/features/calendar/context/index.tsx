
import React from "react";
import useCalendar from "../hooks/useCalendar";
//TODO: need to implement contexts: TaskContext, LabelContext, CalendarContext
const CalendarContext = React.createContext<any>({} as any)

export const CalendarContextProvider = (props: any) => {
  // const [calendar, calendarDispatch] = useReducer(taskReducer, [])
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

  return (
    <CalendarContext.Provider value={{
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
      loadSettingsFromFile} }>
      {props.children}
    </CalendarContext.Provider>
  )
}

export const useCalendarContext = () => React.useContext(CalendarContext)