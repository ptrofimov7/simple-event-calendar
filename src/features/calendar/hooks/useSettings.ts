import html2canvas from "html2canvas";
import { useRef } from "react";

type Settings = {
    tasks: any
    labels: any
    currentDate: any
    filterLabels: any
}

export default function useSettings(data: Settings, cb: (settings: Settings) => void) {
   const refCalendar = useRef<HTMLElement>(null)

   const saveSettingInFile = () => {
      const element = document.createElement("a");
      const textFile = new Blob([JSON.stringify(data)], { type: 'application/json' });
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
            cb(settings)
            // setCurrentDate(settings?.currentDate ? new Date(settings.currentDate) : new Date())
            // setTasks(settings?.tasks.map((task: any) => ({ ...task, date: new Date(task.date) })) || [])
            // setLabels(settings?.labels || [])
            // setFilterLabelsId(settings?.filterLabels || [])
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

   return {
      refCalendar, saveSettingInFile, loadSettingsFromFile, saveCalendarAsImage
   }
}