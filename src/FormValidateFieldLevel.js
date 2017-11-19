import React, { Component } from 'react';
import { connect } from 'react-redux';

import withForm from './helpers/withForm';
import { username, email, required } from './helpers/validate';

import Field from './components/Field';

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
