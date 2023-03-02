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
   labels?: Array<ILabel>
}

export type ITaskState = {
   id: string,
   title: string,
   color: string,
   date: Date,
   labels?: Array<ILabel['id']>
}

export type IHoliday = {
   name: string,
   date: Date,
}