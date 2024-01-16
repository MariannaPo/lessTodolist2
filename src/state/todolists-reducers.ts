import {FilterValuesType, todolistsType} from "../App";
import {v1} from 'uuid'

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType
export const todolistsReducer = (state: Array<todolistsType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id);
        case "ADD-TODOLIST":
            return [...state, {id: v1(), title: action.title}]
        case "CHANGE-TODOLIST-FILTER":
            const todolist = state.find(tl => tl.id === action.filter)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state];
        case "CHANGE-TODOLIST-TITLE":
            const todolistF = state.find(tl => tl.title === action.title)
            if (todolistF) {
                todolistF.title = action.title
            }
            return [...state];
        default:
            throw new Error('I dont understand this action type')
    }
}
export const removeTodolistAC =(todolistId: string) : RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE",id:todolistId, title: title }
}
export const  changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) : ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter}
}