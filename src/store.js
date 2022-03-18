import axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const tasksReducer = (state = [], action)=> {
  if(action.type === 'SET_TASKS'){
    state = action.tasks;
  }
  if(action.type === 'CREATE_TASK'){
    state = [...state.tasks, action.task];
  }
  if(action.type === 'DESTROY_TASK'){
    state = state.tasks.filter(task => task.id !== action.task.id); 
  }
  if (action.type === 'EDIT_TASK') {
    const edittedTasks = state.tasks.map((task) => {
      if (task.id === action.task.id) return action.task;
      return task; 
    });
    state = edittedTasks;
  }
  return state;
};

const usersReducer = (state = [], action) => {
  if (action.type === 'SET_USERS') {
    return action.users;
  } else if (action.type === 'CREATE_USER') {
    return [...state, action.user];
  }

  return state;
};

const reducer = combineReducers({
  tasks: tasksReducer,
  users: usersReducer,
});

const getTasks = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/tasks');
    dispatch({
      type: 'SET_TASKS',
      tasks: data,
    });
  };
};

const getUsers = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/users');
    dispatch({
      type: 'SET_USERS',
      users: data,
    });
  };
}

const createUser = (name) => {
  return async dispatch => {
    const response = await axios.post('/api/users', { name });
    dispatch({
      type: 'CREATE_USER',
      user: response.data,
    });
  };
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export {
  getTasks,
  getUsers,
  createUser,
}