import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from './actions';

export function withAuth(WrappedComponent) {
  const mapStateToProps = state => ({form: state.forms["LogIn"]});
  class authHOC extends Component {
    handleSubmit = (e) => {
      if (e) e.preventDefault();
      console.log("Click submit inside")
      const { form, loginUser } = this.props;
      const { values, validForm } = form;
      console.log(this.props)
      const { email, password } = values;
      
      if (validForm){
        loginUser({ email, password }, () => console.log("login success!!"));
      }
    }
    render(){
      return (
        <WrappedComponent
          handleSubmit={this.handleSubmit}
          { ...this.props }
        />
      );
    }
  }
  return connect(mapStateToProps, { loginUser })(authHOC);
}
