

import React from "react";
//TODO: need to implement contexts: TaskContext, LabelContext, CalendarContext
export const CalendarContext = React.createContext({})

export const useCalendarContext = () => React.useContext(CalendarContext)