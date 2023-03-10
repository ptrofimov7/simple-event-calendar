import { useState } from "react";
import { nextMonth, prevMonth } from "../helpers";
import { ILabel } from "../types";

export default function useCalendarFilters(initDate: Date) {
   const [currentDate, setCurrentDate] = useState(initDate);
   const [search, setSearch] = useState('')
   const [filterLabelsId, setFilterLabelsId] = useState<ILabel['id'][]>([])

   const updateFilterLabels = (labelData: ILabel[]) => {
      const labelsId = labelData.map(label => label.id)
      setFilterLabelsId(labelsId)
   }

   const moveToPrevMonth = () => {
      const date = new Date(currentDate)
      prevMonth(date, setCurrentDate)
   }
   const moveToNextMonth = () => {
      const date = new Date(currentDate)
      nextMonth(date, setCurrentDate)
   }

   return {
      currentDate,
      setCurrentDate,
      search,
      setSearch,
      filterLabelsId,
      setFilterLabelsId,
      updateFilterLabels,
      moveToPrevMonth,
      moveToNextMonth
   }
}