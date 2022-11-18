
export const tasks:ITask[] = [
    {
        id:1,
        title:"task 1",
        description:"description 1"
    },
    {
        id:2,
        title:"task 2",
        description:"description 2"
    },
    {
        id:3,
        title:"task 3",
        description:"description 3"
    }
]

export interface ITask{
    id:number,
    title:string,
    description:string
}