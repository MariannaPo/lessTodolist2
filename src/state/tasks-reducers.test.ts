 import {tasksReducer} from "./tasks-reducers";
import {TaskStateType} from "../App";
import {removeTaskAC} from "./tasks-reducers";

 test('correct task should be deleted from correct array', ()=>{
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ]
    };
    const action = removeTaskAC('2', 'todolistId2');
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t  = t.id != 2)).toBeTruthy()
})