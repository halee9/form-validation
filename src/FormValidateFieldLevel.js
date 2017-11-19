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
    const { handleSubmit, pristine } = this.props;
    console.log(this.props);
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Field
            name= 'username'
            validates= {[required, minLength(2), maxLength(10)]}
            placeholder='User Name'
          />
          <Field
            name= 'email'
            validates= {[email]}
            placeholder='Email'
          />
            
          <button type="submit">Submit</button>
        </form> 
            
      </div>
    );
  }
}

export default withForm({ formName: "form2" })(FormValidateFieldLevel);
