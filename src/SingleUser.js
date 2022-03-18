import React from 'react';
import { connect } from 'react-redux';

const SingleUser = (props) => {
  return <h1>{props.user?.name}</h1>
};

const mapStateToProps = (state, kenneth) => {
  const id = +kenneth.match.params.id;
  return {
    user: state.users.find((user) => user.id === id),
  };
};

export default connect(mapStateToProps)(SingleUser);