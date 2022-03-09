import { createStore } from 'redux';

const reducer = (state = { loading: true, tasks: []}, action)=> {
  console.log(action);
  if(action.type === 'SET_TASKS'){
    state = {...state, tasks: action.tasks, loading: false};
  }
  if(action.type === 'CREATE_TASK'){
    const tasks = [...state.tasks, action.task];
    state = {...state, tasks };
  }
  if(action.type === 'DESTROY_TASK'){
    const tasks = state.tasks.filter(task => task.id !== action.task.id); 
    state = {...state, tasks };
  }
  if (action.type === 'EDIT_TASK') {
    const edittedTasks = state.tasks.map((task) => {
      if (task.id === action.task.id) return action.task;
      return task; 
    });
    state = {...state, tasks: edittedTasks};
  }
  return state;
};

const store = createStore(reducer);

export default store;
