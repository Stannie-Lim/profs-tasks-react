import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createUser } from './store';

const SomeRandomComponent = (props) => {
  const onClick = () => {
    props.history.push('/');
  };

  return <h1 onClick={onClick}>this is some random component</h1>
};

class Users extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  render() {
    const { users, createUser, history } = this.props;
    const onSubmit = (event) => {
      event.preventDefault();

      createUser(this.state.name);
    };

    const onChange = (event) => {
      this.setState({ name: event.target.value });
    };

    return (
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </li>
          ))}
        </ul>

        <form onSubmit={onSubmit}>
          <input value={this.state.name} onChange={onChange} placeholder="name" />
          <button>Create person</button>
        </form>

        <SomeRandomComponent history={history} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (name) => {
      dispatch(createUser(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);