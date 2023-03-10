import { getSortedDays } from "../helpers";
import { ILabel, ITask } from "../types";
import useCalendarFilters from "./useCalendarFilters";
import useHolidays from "./useHolidays";
import useLabels from "./useLabels";
import useSettings from "./useSettings";
import useTasks from "./useTasks";

export default function useCalendar() {
   const {
      currentDate,
      setCurrentDate,
      search,
      setSearch,
      filterLabelsId,
      setFilterLabelsId,
      updateFilterLabels,
      moveToPrevMonth,
      moveToNextMonth
   } = useCalendarFilters(new Date(2023, 2, 1))

   const {
      holidays,
      isError,
      isLoading
   } = useHolidays(currentDate)

   const {
      tasks, setTasks, dragMovedElement, dragHoverElement,
      showTaskModal, modalTaskData,
      updateTask, openNewTaskModal, drag, onDragEnter, onDragEnterSameDate, drop,
      openExistedTaskModal, closeTaskModal, deleteTask
   } = useTasks()

   const {
      showLabelModal, labels, setLabels, modalLabelData,
      updateLabel, openLabelModal, closeLabelModal, deleteLabel
   } = useLabels((id: string) => {
      setFilterLabelsId((prev) => prev.filter((labelId) => labelId !== id))
      setTasks(prev => (
         prev.map(task => {
            const labels = task?.labels
            if (labels) {
               return { ...task, labels: labels.filter(labelId => labelId !== id) }
            }
            return task
         })))
   })

   const {
      refCalendar, saveSettingInFile, loadSettingsFromFile, saveCalendarAsImage
   } = useSettings({ tasks, labels, currentDate, filterLabels: filterLabelsId }, (settings: any) => {
      setCurrentDate(settings?.currentDate ? new Date(settings.currentDate) : new Date())
      setTasks(settings?.tasks.map((task: any) => ({ ...task, date: new Date(task.date) })) || [])
      setLabels(settings?.labels || [])
      setFilterLabelsId(settings?.filterLabels || [])
   })

   const sortedDays = getSortedDays(currentDate)
   let filteredTasks = search ? tasks.filter((task) => task.title.toLowerCase().includes(search)) : tasks
   filteredTasks = filterLabelsId.length === 0 ? filteredTasks : filteredTasks.filter((task) => {
      let taskLabels = task.labels
      if (!taskLabels) {
         return false
      }
      return taskLabels.some(taskLabelId => {
         return filterLabelsId.some(labelId => taskLabelId === labelId)
      })
   }
   )
   let tasksWithLabels = filteredTasks.map(task => {
      if (task?.labels?.length) {
         return { ...task, labels: task?.labels?.map(labelId => (labels.find(l => l.id === labelId) as ILabel)).filter(Boolean) }
      }
      return task as ITask
   })

   const filterLabels = filterLabelsId.map(id => labels.find(label => label.id === id)) as ILabel[]

   return {
      isLoading,
      isError,
      currentDate,
      tasks,
      labels,
      filterLabels,
      search,
      refCalendar,
      tasksWithLabels,
      sortedDays,
      modalTaskData,
      modalLabelData,
      holidays,
      dragMovedElement,
      dragHoverElement,
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
      closeTaskModal,
      closeLabelModal,
      openExistedTaskModal,
      moveToPrevMonth,
      moveToNextMonth,
      saveSettingInFile,
      saveCalendarAsImage,
      loadSettingsFromFile,
   }

}