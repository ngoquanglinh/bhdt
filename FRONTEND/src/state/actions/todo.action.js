import actions from './action.type';

export const addTodo = () => ({
  type: actions.ADD_TODO
})

export const addTodoSuccess = (payload ) => ({
  type: actions.ADD_TODO_SUCCESS,
  payload  
})

