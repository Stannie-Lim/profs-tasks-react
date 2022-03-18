import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import Tasks from './Tasks';
import Header from './Header'
import Loader from './Loader';
import store, { getUsers, getTasks } from './store';

class App extends React.Component{
  async componentDidMount(){
    this.props.load();
  }
  render(){
    return (
      <div>
        <Header />
        <Tasks />
        <Loader />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    load: () => {
      dispatch(getUsers());
      dispatch(getTasks());
    },
  };
};

const ConnectedApp = connect(null, mapDispatch)(App);

const root = document.querySelector('#root');
ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>, 
  root
);
