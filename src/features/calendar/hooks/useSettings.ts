import html2canvas from "html2canvas";
import { useRef } from "react";
import { ISettings } from "../types";

export default function useSettings(data: ISettings, cb: (settings: ISettings) => void) {
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