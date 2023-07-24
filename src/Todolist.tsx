import React, { useState } from 'react';
import { FilterValuesType } from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string)=> void,
    changeFilter: (value: FilterValuesType)=> void,
    addTask: (title: string)=>void
}

export function Todolist(props: PropsType) {

const [newTaskTitle, setNewTaskTitle] = useState('');


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle} onChange={(e)=>{ setNewTaskTitle(e.currentTarget.value)}}/>
            <button onClick={()=>{props.addTask(newTaskTitle)}}>+</button>
        </div>
        <ul>
            {props.tasks.map((task: TaskType)=>{
            
                return(
                    <li key={task.id}><input type='checkbox' checked={task.isDone}/>
                    <span>{task.title}</span><button onClick={()=>{props.removeTask(task.id)}}>✖️</button></li>
                )
            })}
        </ul>
        <div>
            <button onClick={()=>{props.changeFilter('all')}}>All</button>
            <button onClick={()=>{props.changeFilter('active')}}>Active</button>
            <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
        </div>
    </div>
}
