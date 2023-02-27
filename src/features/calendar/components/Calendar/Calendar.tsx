import { useRef, useState } from "react";
import {
   SevenColGrid,
   Wrapper,
   HeadDays,
} from "../../styles/Calendar.styled";
import { DAYS, TASK_COLOR_DEFAULT } from "../../data";
import {
   getSortedDays,
   getUniqId,
   nextMonth,
   prevMonth,
} from "../../helpers";
import { ILabel, ITask } from "../../types";
import Tasks from "../Tasks/Tasks";
import CalendarDay from "./CalendarDay";
import CalendarHeader from "./CalendarHeader";
import TaskModal from "../Tasks/TaskModal";
import CalendarActions from "./CalendarActions";
import Holidays from "./Holidays";
import { useQuery } from "react-query";

import html2canvas from "html2canvas";
import fetchHolidays from "../../api/fetchHolidays";
import TaskLabelModal from "../Tasks/TaskLabelModal";

export default function Calendar() {
   const [currentDate, setCurrentDate] = useState(new Date(2023, 2, 1));
   const [tasks, setTasks] = useState<ITask[]>([]);
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
   const refCalendar = useRef<HTMLElement>(null)

   const updateTask = (taskData: ITask) => {
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
      handleTaskModalClose()
   };

   const addUpdateLabel = (label: ILabel) => {
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
      setFilterLabels((prev) => prev.filter((label) => label.id !== id))
      setTasks(prev => (
         prev.map(task => {
            const labels = task?.labels
            if (labels) {
               return { ...task, labels: labels.filter(label => label.id !== id) }
            }
            return task
         })))
      handleLabelModalClose();
   };

   const handleTaskAdd = (date: Date) => {
      date.setHours(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      setShowTaskModal(true);
      setModalTaskData({ id: '', date, title: '', color: TASK_COLOR_DEFAULT });
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

   const saveSettingInFile = () => {
      const element = document.createElement("a");
      const textFile = new Blob([JSON.stringify({ tasks, labels, currentDate, filterLabels })], { type: 'application/json' });
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
            setTasks(settings?.tasks || [])
            setLabels(settings?.labels || [])
            setFilterLabels(settings?.filterLabels || [])
         } catch (error) {

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

   if (isLoading) {
      return <div>Loading ...</div>
   }

   if (isError) {
      return <div>Something went wrong</div>
   }

   return (
      <Wrapper ref={refCalendar}>
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
                     addTask={handleTaskAdd}
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
               updateTaskLabels={updateTask}
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
