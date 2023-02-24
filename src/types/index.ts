export type IColor = 'red' | 'green' | 'yellow' | 'blue'

export type IColorHolidays = 'brown'
export type IColorCommonTask = 'gray'

export type ILabel = {
   title: string,
   color: IColor
}

export type ITask = {
   title: string,
   color: string,
   date: Date,
   isHoliday?: boolean,
   labels?: Array<ILabel>
}