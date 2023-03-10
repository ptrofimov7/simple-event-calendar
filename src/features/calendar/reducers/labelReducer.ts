import { getUniqId } from "../helpers";
import { ILabel } from "../types";

export const enum LABEL_ACTIONS {
   SET_LABELS,
   UPDATE_LABEL,
   DELETE_LABEL,
}

type UpdateLabelType = {
   type: LABEL_ACTIONS.UPDATE_LABEL,
   payload: ILabel
}

type DeleteLabelType = {
   type: LABEL_ACTIONS.DELETE_LABEL,
   payload: string
}

type SetLabelType = {
   type: LABEL_ACTIONS.SET_LABELS,
   payload: ILabel[]
}

type LabelActionType = UpdateLabelType | DeleteLabelType | SetLabelType

export const labelInitialState = [] as ILabel[]

export const labelReducer = (state: ILabel[], action: LabelActionType) => {
   switch (action.type) {
      case LABEL_ACTIONS.UPDATE_LABEL: {
         let id = action.payload.id
         if (id) {
            return state.map(element => {
               if (element.id === id) {
                  return {
                     ...element,
                     ...action.payload
                  }
               }
               return element
            })
         }
         return [
            ...state,
            { ...action.payload, id: getUniqId() }
         ]
      }
      case LABEL_ACTIONS.DELETE_LABEL: {
         return  state.filter((label) => label.id !== action.payload)
      }
      case LABEL_ACTIONS.SET_LABELS: {
          return  [...action.payload]
      }
      default:
         return state;
   }
}