
import React, { ReactNode } from "react";
import useCalendar from "../hooks/useCalendar";

type ICalendarContext = Omit<ReturnType<typeof useCalendar>, "tasks" | "dragMovedElement" | "dragHoverElement">
const CalendarContext = React.createContext<ICalendarContext>({} as ICalendarContext)

export const CalendarContextProvider = ({children}: {children: ReactNode}) => {

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
      loadSettingsFromFile
    }}>
      {children}
    </CalendarContext.Provider>
  )
}

export const useCalendarContext = () => React.useContext(CalendarContext)