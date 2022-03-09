import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import store from './store';

const destroy = async(task)=> {
  await axios.delete(`/api/tasks/${task.id}`);

  store.dispatch({ type: 'DESTROY_TASK', task });
};

const toggleCompletion = async (task) => {
  // if you make a function over here, you cannot
  // use the "this" keyword

  const response = await axios.put(`/api/tasks/${task.id}`, { complete: !task.complete })

  // THIS IS PRETTY MUCH THE SAME AS THIS.SETSTATE({});
  store.dispatch({ type: 'EDIT_TASK', task: response.data });
};

class Tasks extends React.Component{
  constructor(){
    super();
    this.state = store.getState();
  }
  componentDidMount(){
    store.subscribe(()=> this.setState(store.getState()));
  }

  render(){
    const tasks = this.state.tasks;

    return (
      <ul>
        {
          tasks.map( task => {
            return (
              <li key={ task.id }>
                <p onClick={() => toggleCompletion(task)} style={{ textDecoration: task.complete ? 'line-through' : 'none' }}>{ task.name }</p>
                <button onClick={()=> destroy(task)}>x</button>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default Tasks;
