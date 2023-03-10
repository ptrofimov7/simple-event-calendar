import { useReducer, useState } from "react";
import { ILabel } from "../types";
import { labelInitialState, labelReducer, LABEL_ACTIONS } from "../reducers";

export default function useLabels(cb: (id: string) => void) {
   const [labels, dispatch] = useReducer(labelReducer, labelInitialState)
   const [showLabelModal, setShowLabelModal] = useState(false);
   const [modalLabelData, setModalLabelData] = useState<ILabel>({} as ILabel);

   const setLabels = (labels: ILabel[]) => {
      dispatch({
         type: LABEL_ACTIONS.SET_LABELS,
         payload: labels
      })
   }

   const updateLabel = (label: ILabel) => {
      dispatch({
         type: LABEL_ACTIONS.UPDATE_LABEL,
         payload: label
      })
      closeLabelModal()
   };

   const openLabelModal = (label?: ILabel | undefined) => {
      setShowLabelModal(true);
      setModalLabelData(label ?? {} as ILabel);
   };

   const closeLabelModal = () => setShowLabelModal(false);

   const deleteLabel = (id: string) => {
      dispatch({
         type: LABEL_ACTIONS.DELETE_LABEL,
         payload: id
      })
      cb(id)
      closeLabelModal();
   };

   return {
      showLabelModal, setShowLabelModal,
      labels, setLabels,
      modalLabelData, setModalLabelData,
      updateLabel, openLabelModal, closeLabelModal, deleteLabel
   }
}