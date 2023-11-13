import React, {ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';
import { title } from 'process';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id:string, todolistsId: string)=> void,
    changeFilter: (value: FilterValuesType, todolistsId: string)=> void,
    addTask: (title: string, todolistsId: string)=>void,
    changeStatus: (taskId: string, isDone: boolean, todolistsId: string) => void,
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
        props.addTask(title.trim(), props.id);
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

const onAllClickHandler = ()=> props.changeFilter('all', props.id);

const onCompletedClickHandler = ()=> props.changeFilter('completed', props.id);

const onActiveClickHandler = ()=> props.changeFilter('active', props.id);





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
