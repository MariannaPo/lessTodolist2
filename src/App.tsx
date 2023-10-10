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

      function removeTask(id:string, todolistsId: string){
        let tasks = allTasks[todolistsId];
       let  filteredTasks = tasks.filter(task=> task.id !== id)
        allTasks[todolistsId] = filteredTasks;
       setAllTasks({...allTasks})
    }

    function addTask(title: string, todolistsId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = allTasks[todolistsId];
        let newTasks = [newTask, ...tasks];
        setAllTasks({...addTask})
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

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [allTasks, setAllTasks] = useState({
        [todolistId1]: [
         { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: 'Rest API', isDone: false},
        { id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistId2]: [
        { id: v1(), title: 'RedBull', isDone: false},
        { id: v1(), title: 'sigarets', isDone: true}
        ]
    })

    return (
        <div className="App">
            { todolists.map((tl)=>{
                let tasksForTodoList = allTasks[tl.id];
                if (tl.filter === 'active'){
                    tasksForTodoList = tasksForTodoList.filter(task => task.isDone === false)
                }
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasksForTodoList.filter(task => task.isDone === true)
                }
                return <Todolist 
            key={tl.id}
            id={tl.id}
            title={tl.title} 
            tasks={tasksForTodoList} 
            removeTask={removeTask} 
            changeFilter={changeFilter}
            addTasks={addTask}
            changeStatus={changeStatus}
            filter = {tl.filter}
            />
            })}
            
        </div>
    );
    }

export default App;
