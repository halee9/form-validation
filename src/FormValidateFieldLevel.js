import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  withForm, 
  Field, 
  username, 
  email, 
  required, 
  minLength, 
  maxLength 
} from './formValidate';

class FormValidateFieldLevel extends Component {
  render() {
    const { handleSubmit, pristine, validForm } = this.props;
    console.log(this.props);
    return (
      <div>
        <h3>Form Validation Test</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Name: </label>
            <Field
              name= 'username'
              validates= {[required, minLength(2), maxLength(10)]}
              placeholder='User Name'
              className='form-control'
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <Field
              name= 'email'
              validates= {[email]}
              placeholder='Email'
              className='form-control'
            />
          </div>
          <button type="submit" className="btn btn-default" disabled={!validForm}>Submit</button>
          <br />{ validForm ? "true" : "false" }
        </form> 
            
      </div>
    );
  }
}

export default withForm({ formName: "form2" })(FormValidateFieldLevel);
