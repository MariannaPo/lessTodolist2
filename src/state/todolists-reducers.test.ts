import {userReducer} from "./user-reducer";
import {v1} from "uuid";
import {todolistsType} from "../App";
import {todolistsReducer} from "./todolists-reducers";

test('correct todolist should be correct', ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<todolistsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    const endState = todolistsReducer(startState, {
        type: "REMOVE-TODOLIST",
        id: todolistId1
    })
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2)
});
test('correct todolist should be added',() => {
    let todolistId1 = v1();
    let todolistId2 = v1();
let newTodolistTitle = "New Todolist";
const startState: Array<todolistsType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
]
    const endState = todolistsReducer(startState, {
        type: "ADD-TODOLIST",
        title: newTodolistTitle
    })
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
})
