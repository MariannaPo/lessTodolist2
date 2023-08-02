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
    addTask: (title: string)=>void,
    changeStatus: (taskId: string, isDone: boolean) => void,
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

const [newTaskTitle, setNewTaskTitle] = useState('');
const [error, setError] = useState<string | null>(null);

const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
};



const addTaskButton=()=> {
    if(newTaskTitle.trim() !== ''){
        props.addTask(newTaskTitle);
    setNewTaskTitle('');
    } else {
     setError('Required field');
    }
    
       
};

const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if(e.charCode === 13){
        addTaskButton()
    }
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
           className={error ? 'error' : ''}
            />
            
            <button onClick={addTaskButton}>+</button>
           {error && <div className='error-message'>{error}</div>} 
        </div>
        <ul>
            {props.tasks.map((task: TaskType)=>{
            
            const removeButtonHandler = () => {
                {props.removeTask(task.id)}
            }
            const onChangeHandlerCheckbox=(e: ChangeEvent<HTMLInputElement>)=>{
                props.changeStatus(task.id, e.currentTarget.checked)
                }
                return(
                    <li key={task.id} className={task.isDone ? 'is-done' : ''}><input type='checkbox' 
                    onChange={onChangeHandlerCheckbox}
                    checked={task.isDone}/>
                    <span>{task.title}</span><button onClick={removeButtonHandler}>✖️</button></li>
                )
            })}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}  onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}  onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
