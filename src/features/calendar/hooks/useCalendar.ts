import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import fetchHolidays from "../api/fetchHolidays";
import { TASK_COLOR_DEFAULT } from "../data";
import { getSortedDays, getUniqId, nextMonth, prevMonth } from "../helpers";
import { ILabel, ITask, ITaskState } from "../types";

export default function useCalendar() {
   const [currentDate, setCurrentDate] = useState(new Date(2023, 2, 1));
   const [tasks, setTasks] = useState<ITaskState[]>([]);
   const dragMovedElement = useRef<any>();
   const dragHoverElement = useRef<any>();
   const [showTaskModal, setShowTaskModal] = useState(false);
   const [showLabelModal, setShowLabelModal] = useState(false);
   const [modalTaskData, setModalTaskData] = useState<ITask>({} as ITask);
   const [search, setSearch] = useState('')
   const [labels, setLabels] = useState<ILabel[]>([])
   const [filterLabelsId, setFilterLabelsId] = useState<ILabel['id'][]>([])
   const [modalLabelData, setModalLabelData] = useState<ILabel>({} as ILabel);
   const currentYear = currentDate.getFullYear()
   const { data: holidays, isError, isLoading } = useQuery(['holidays', currentYear], () => fetchHolidays(currentYear))
   const refCalendar = useRef<HTMLElement>(null)

   const updateTask = (taskData: ITaskState) => {
      const id = taskData?.id || getUniqId()
      setTasks((prev) => {
         const found = prev.find(element => element.id === id)
         if (found) {
            return prev.map(task => {
               if (task.id === id) {
                  return { ...task, ...taskData }
               }
               return task
            })
         }
         return [
            ...prev,
            { ...taskData, id }
         ]
      }
      );
      closeTaskModal()
   };

   const updateLabel = (label: ILabel) => {
      const id = label?.id || getUniqId()
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
            { ...label, id }
         ]
      });
    closeLabelModal()
};

const openLabelModal = (label: ILabel | undefined) => {
   setShowLabelModal(true);
   setModalLabelData(label ?? {} as ILabel);
};

const closeLabelModal = () => setShowLabelModal(false);

const deleteLabel = (id: string) => {
   setLabels((prev) =>
      prev.filter((label) => label.id !== id)
   );
   setFilterLabelsId((prev) => prev.filter((labelId) => labelId !== id))
   setTasks(prev => (
      prev.map(task => {
         const labels = task?.labels
         if (labels) {
            return { ...task, labels: labels.filter(labelId => labelId !== id) }
         }
         return task
      })))
   closeLabelModal();
};

const updateFilterLabels = (labelData: ILabel[]) => {
   const labelsId = labelData.map(label => label.id)
   setFilterLabelsId(labelsId)
}

const openNewTaskModal = (date: Date) => {
   date.setHours(0);
   date.setSeconds(0);
   date.setMilliseconds(0);
   setShowTaskModal(true);
   setModalTaskData({ id: '', date, title: '', color: TASK_COLOR_DEFAULT });
};

const drag = (index: number, date: Date, e: React.DragEvent) => {
   dragHoverElement.current = { index, date, target: e.target };
};

const onDragEnter = (date: Date, e: any) => {
   e.preventDefault();
   e.stopPropagation()
   dragMovedElement.current = { date, target: e.target.id };
};

const onDragEnterSameDate = (index: number, date: Date, e: any) => {
   e.preventDefault();
   e.stopPropagation()
   dragMovedElement.current = { index, date, target: e.target.id };
};

const drop = (e: React.DragEvent) => {
   e.preventDefault();
   e.stopPropagation()
   const IsSameDate = dragMovedElement.current.date === dragHoverElement.current.date
   setTasks((prev) => {
      let taskFrom = prev[dragHoverElement.current.index]
      if (!taskFrom) return prev
      if (IsSameDate) {
         const list = [...prev]
         list.splice(dragHoverElement.current.index, 1)
         list.splice(dragMovedElement.current.index, 0, taskFrom)
         return list
      }
      const list = [...prev]
      list.splice(dragHoverElement.current.index, 1)
      list.splice(0, 0, { ...taskFrom, date: dragMovedElement.current.date })
      return list
   });
};

const openExistedTaskModal = (task: ITask) => {
   setShowTaskModal(true);
   setModalTaskData(task);
};

const closeTaskModal = () => setShowTaskModal(false);

const deleteTask = () => {
   setTasks((prev) =>
      prev.filter((task) => task.title !== modalTaskData.title)
   );
   closeTaskModal();
};

const moveToPrevMonth = () => {
   const date = new Date(currentDate)
   prevMonth(date, setCurrentDate)
}
const moveToNextMonth = () => {
   const date = new Date(currentDate)
   nextMonth(date, setCurrentDate)
}

const saveSettingInFile = () => {
   const element = document.createElement("a");
   const textFile = new Blob([JSON.stringify({ tasks, labels, currentDate, filterLabels: filterLabelsId })], { type: 'application/json' });
   element.href = URL.createObjectURL(textFile);
   element.download = "calendar_settings.txt";
   document.body.appendChild(element);
   element.click();
   document.body.removeChild(element)
}

const loadSettingsFromFile = (file: File) => {
   const blob = new Blob([file], { type: "application/json" });
   const fileReader = new FileReader();
   fileReader.addEventListener("load", (e: any) => {
      try {
         const settings = JSON.parse(e.target.result)
         setCurrentDate(settings?.currentDate ? new Date(settings.currentDate) : new Date())
         setTasks(settings?.tasks.map((task: any) => ({...task, date: new Date(task.date)})) || [])
         setLabels(settings?.labels || [])
         setFilterLabelsId(settings?.filterLabels || [])
      } catch (error) {
         console.log(error);
      }
   });
   fileReader.readAsText(blob);
}

const saveCalendarAsImage = () => {
   refCalendar.current && html2canvas(refCalendar.current).then(canvas => {
      canvas.toBlob((blob: any) => {
         const element = document.createElement('a');
         const url = URL.createObjectURL(blob);
         element.href = url
         element.onload = () => {
            URL.revokeObjectURL(url);
         };
         element.download = "calendar_screenshot.png";
         document.body.appendChild(element);
         element.click();
         document.body.removeChild(element)
      });
   });
}

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
      return {...task, labels: task?.labels?.map(labelId => (labels.find(l => l.id === labelId ) as ILabel)).filter(Boolean)}
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