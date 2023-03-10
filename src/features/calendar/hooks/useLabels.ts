import { useState } from "react";
import { ILabel } from "../types";
import { getUniqId } from "../helpers";

export default function useLabels(cb: (id: string) => void) {
   const [showLabelModal, setShowLabelModal] = useState(false);
   const [labels, setLabels] = useState<ILabel[]>([])
  const [modalLabelData, setModalLabelData] = useState<ILabel>({} as ILabel);
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