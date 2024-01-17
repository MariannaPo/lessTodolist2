import {FilterValuesType, TaskStateType, todolistsType} from "../App";
import {v1} from 'uuid'

export type RemoveTaskACType = {
    type: 'REMOVE-TASK',
    todolistId: any,
    taskId: string

}
export type Action2Type = {
    type: '2',
    title: string
}

type ActionsType =  RemoveTaskACType |  Action2Type;
export const tasksReducer = (state: Array<TaskStateType>, action: ActionsType):TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(((t: { id: string; }) => t.id != action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case "2": {
            return {...state};
        }
        default:
            throw new Error('I dont understand this action type')
    }
}
export const removeTaskAC =(taskId: string,todolistId: string) : RemoveTaskACType => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}
export const action2AC = (title: string): Action2Type => {
    return {type: "2", title: title}
}
