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
    const { handleSubmit, pristine, formName } = this.props;
    console.log(this.props);
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Field
            name= 'username'
            label= 'UserName: '
            validates= {[username]}
          />
          <Field
            name= 'email'
            label= 'Email: '
            validates= {[email]}
          />
            
          <button type="submit">Submit</button>
        </form> 
            
      </div>
    );
  }
}

export default withForm({ formName: "form2" })(FormValidateFieldLevel);
