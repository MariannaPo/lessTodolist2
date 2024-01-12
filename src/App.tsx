import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography} from "@mui/material";

export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id != id)})
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(t => t.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function addTask(title: string, todolistID: string) {

        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        let todolistTask = tasks[todolistID];
        let task = todolistTask.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
        // setTasks({...tasks,[todolistID] : tasks[todolistID].map((m)=>m.id === taskId ? {...m,isDone} : m)})
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map((ft) => ft.id === todolistID ? {...ft, filter: value} : ft))
    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: todolistsType = {id: newTodolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    function changeTaskTitle(todolistID: string, id: string, newTitle: string) {
        let todoListTasks = tasks[todolistID];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todoList = todolists.find(tl => tl.id === id);
        if (todoList) {
            todoList.title = newTitle;
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>

                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container>

                    {todolists.map((t) => {

                        let tasksForTodolist = tasks[t.id];

                        if (t.filter === "active") {
                            tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
                        }
                        if (t.filter === "completed") {
                            tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
                        }
                        return (
                            <Grid style={{padding: '10px'}}>
                                <Paper style={{padding:'10px'}}>
                                <Todolist
                                    key={t.id}
                                    todolistID={t.id}
                                    title={t.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    removeTodoList={removeTodolist}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                    filter={t.filter}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
