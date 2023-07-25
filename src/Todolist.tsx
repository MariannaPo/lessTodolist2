import React, {ChangeEvent, KeyboardEvent, useState } from 'react';
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

const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
};

const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.charCode === 13){
        {props.addTask(newTaskTitle)}
                setNewTaskTitle('');
    }
};

const addTaskButton=()=> {
    {props.addTask(newTaskTitle);
        setNewTaskTitle('')}
};

const onAllClickHandler = ()=> {
    {props.changeFilter('all')}
};

const onCompletedClickHandler = ()=> {
    {props.changeFilter('completed')}
};

const onActiveClickHandler = ()=> {
    {props.changeFilter('active')}
};




    return <div>
        <h3>{props.title}</h3>
        <div>
            <input 
            value={newTaskTitle} 
            onChange={onChangeHandler}
           onKeyPress={onKeyPressHandler}
            />
            
            <button onClick={addTaskButton}>+</button>
        </div>
        <ul>
            {props.tasks.map((task: TaskType)=>{
            
            const removeButtonHandler = () => {
                {props.removeTask(task.id)}
            }
                return(
                    <li key={task.id}><input type='checkbox' checked={task.isDone}/>
                    <span>{task.title}</span><button onClick={removeButtonHandler}>✖️</button></li>
                )
            })}
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
