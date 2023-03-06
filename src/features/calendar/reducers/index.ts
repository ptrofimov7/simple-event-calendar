

import { ILabel, ITaskState } from "../types";

// TODO: complete reducers

enum TASKS_ACTIONS {
   FETCH = 'FETCH',
   ADD = 'ADD',
   UPDATE = 'UPDATE',
   DELETE = 'DELETE',
}

export const taskReducer = (state: ITaskState[], action: { type: keyof TASKS_ACTIONS, payload: any }) => {
   switch (action.type) {
      case TASKS_ACTIONS.FETCH: {
         return state;
      }
      case TASKS_ACTIONS.ADD: {
         return state;
      }
      case TASKS_ACTIONS.UPDATE: {
         return state;
      }
      case TASKS_ACTIONS.DELETE: {
         return state;
      }
     default:
         return state;
   }
}


enum LABEL_ACTIONS {
   ADD = 'ADD',
   UPDATE = 'UPDATE',
   DELETE = 'DELETE',
}

export const labelReducer = (state: ILabel[], action: { type: keyof LABEL_ACTIONS, payload: any }) => {
   switch (action.type) {
      case TASKS_ACTIONS.ADD: {
         return state;
      }
      case TASKS_ACTIONS.UPDATE: {
         return state;
      }
      case TASKS_ACTIONS.DELETE: {
         return state;
      }
      default:
         return state;
   }
}

enum CALENDAR_ACTIONS {
   PREV_MONTH = 'PREVMONTH',
   NEXT_MONTH = 'UPDATE',
   SET_SEARCH = 'SET_SEARCH',
   SET_FILTER_LABELS = 'SET_FILTER_LABELS'
}

type ICalendarState = {
   currentDate: Date,
   search: string,
   filterLabels: ILabel['id'][]
}

export const calendarReducer = (state: ICalendarState, action: { type: keyof CALENDAR_ACTIONS, payload: any }) => {
   switch (action.type) {
      case CALENDAR_ACTIONS.PREV_MONTH: {
         return state;
      }
      case CALENDAR_ACTIONS.NEXT_MONTH: {
         return state;
      }
      case CALENDAR_ACTIONS.SET_SEARCH: {
         return state;
      }
      case CALENDAR_ACTIONS.SET_FILTER_LABELS: {
         return state;
      }
      default:
         return state;
   }
}