import { useRef, useState } from "react";
import { TASK_COLOR_DEFAULT } from "../data";
import { getUniqId } from "../helpers";
import { ITask, ITaskState } from "../types";

export default function useTasks() {
   const [tasks, setTasks] = useState<ITaskState[]>([]);
   const dragMovedElement = useRef<any>();
   const dragHoverElement = useRef<any>();
   const [showTaskModal, setShowTaskModal] = useState(false);
   const [modalTaskData, setModalTaskData] = useState<ITask>({} as ITask);

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
         prev.filter((task) => task.id !== modalTaskData.id)
      );
      closeTaskModal();
   };

   return {
      tasks, setTasks, dragMovedElement, dragHoverElement,
      showTaskModal, setShowTaskModal, modalTaskData, setModalTaskData,
      updateTask, openNewTaskModal, drag, onDragEnter, onDragEnterSameDate, drop,
      openExistedTaskModal, closeTaskModal, deleteTask
   }

}