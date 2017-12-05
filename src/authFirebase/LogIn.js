import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './actions';

import {
  required, minLength, maxLength, number, email
} from '../validate';

import { withForm, Field } from '../formValidate';
import { withAuth } from '../authFirebase';

class LogInForm extends Component {
  handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log("Click submit inside")
    const { values, validForm } = this.props.form;
    console.log(this.props)
    const { email, password } = values;
    
    if (validForm){
      this.props.loginUser({ email, password }, () => console.log("login success!!"));
    }
  }
  render(){
    const { validForm } = this.props;
    return (
      <div>
        <h3>Log In</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <Field
              name='email'
              type='email'
              validates= {[required, email]}
              placeholder='email'
              className='form-control'
            />            
          </div>
          <div className="form-group">
            <label>Password: </label>
            <Field
              name='password'
              type='password'
              validates= {[required, minLength(5), maxLength(20)]}
              placeholder='password'
              className='form-control'
            />            
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary" disabled={!validForm}>Submit</button>
          </div>
          <br /><br />
        </form>
        <div><pre>{JSON.stringify(this.props, null, 2) }</pre></div>
      </div>
    )
  }
}

const withRedux = connect(null,{ loginUser })(LogInForm);
export const LogIn = withForm({ formName: "LogIn" })(withRedux);