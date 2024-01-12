type StateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type){
        case 'INCREMENT-AGE':
            let newState = {...state}
                state.age = state.age + 1;
            return newState;
        case "INCREMENT-CHILDREN-COUNT":
         return {
             ...state,
             childrenCount: state.childrenCount + 1
         }
        default:
            throw new Error('I dont understand this action type')
    }
}