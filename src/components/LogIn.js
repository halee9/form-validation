import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  required, minLength, maxLength, number, email
} from '../validate';

import { withForm, Field } from '../formValidate';
import { withAuth } from '../authFirebase';

class LogIn extends Component {
  render(){
    const { validForm, handleSubmit } = this.props;
    return (
      <div>
        <h3>Log In</h3>
        <form onSubmit={handleSubmit}>
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

export default withAuth(withForm({ formName: "LogIn" })(LogIn));