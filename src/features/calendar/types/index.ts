export type IColor = 'red' | 'green' | 'yellow' | 'blue'

export type ILabel = {
   id: string,
   title: string,
   color: IColor
}

export type ITask = {
   id: string,
   title: string,
   color: string,
   date: Date,
   isHoliday?: boolean,
   labels?: Array<ILabel>
}