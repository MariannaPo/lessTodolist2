import React, { useState } from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { log } from 'console';
import { type } from 'os';
import { v1 } from 'uuid';

export type FilterValuesType =  'all' | 'active' | 'completed';
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: 'Rest API', isDone: false},
        { id: v1(), title: 'GraphQL', isDone: false}
    ])

      function removeTask(id:string){
       let  filteredTasks = tasks.filter(task=> task.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }

    function changeFilter(value: FilterValuesType, todolistsId: string){
    let todolist = todolists.find(tl => tl.id === todolistsId);
    if(todolist){
        todolist.filter = value;
        setTodolists([...todolists])
    }
    }

    function changeStatus(taskId: string, isDone: boolean){
       let task = tasks.find(t => t.id === taskId); 
        if(task){
        task.isDone = !task.isDone
        }
        setTasks([...tasks])
       
    }

       let [todolists, setTodolists]= useState<Array<TodolistsType>>([
        {id: v1(), title: 'What to learn?', filter:'active'},
        {id: v1(), title: 'What to buy?', filter:'completed'}
    ]);

    return (
        <div className="App">
            { todolists.map((tl)=>{
                let tasksForTodoList = tasks;
                if (tl.filter === 'active'){
                    tasksForTodoList = tasks.filter(task => task.isDone === false)
                }
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasks.filter(task => task.isDone === true)
                }
                return <Todolist 
            key={tl.id}
            id={tl.id}
            title={tl.title} 
            tasks={tasksForTodoList} 
            removeTask={removeTask} 
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter = {tl.filter}
            />
            })}
            
        </div>
    );
    }

export default App;
