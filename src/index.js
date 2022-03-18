import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Tasks from './Tasks';
import Header from './Header'
import SingleUser from './SingleUser';
import Users from './Users';
import store, { getUsers, getTasks } from './store';

class App extends React.Component{
  async componentDidMount(){
    this.props.load();
  }
  render(){
    return (
      <HashRouter>
        <Switch>
          <Route path='/' component={Header} />
          <Route exact path='/tasks' component={Tasks} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/users/:id' component={SingleUser} />
        </Switch>
      </HashRouter>
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
