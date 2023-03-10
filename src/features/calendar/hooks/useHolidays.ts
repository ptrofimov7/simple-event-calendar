import { useQuery } from "react-query"
import fetchHolidays from "../api/fetchHolidays"

export default function useHolidays(currentDate: Date) {
   const currentYear = currentDate.getFullYear()
   const { data: holidays, isError, isLoading } = useQuery(['holidays', currentYear], () => fetchHolidays(currentYear))
   return {
      holidays,
      isError,
      isLoading
   }
}