import React, { Component } from 'react';
import { connect } from 'react-redux';

import withForm from './helpers/withForm';
import { onChange, onSubmit } from './actions/formAction';
import { username, email, required } from './helpers/validate';

import Field from './components/Field';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
  return sleep(1000).then(() => {
    // simulate server latency
    const errors = {}
    if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      errors.username = 'User does not exist'
      // throw new SubmissionError({
      //   username: 'User does not exist',
      //   _error: 'Login failed!'
      // })
    } else if (values.email !== 'john@gmail.com') {
      errors.email = 'Email does not exist'
      // throw new SubmissionError({
      //   password: 'Wrong password',
      //   _error: 'Login failed!'
      // })
    } else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    }
    return errors;
  })
}

class FormValidateFormLevel extends Component {
  render() {
    const { handleSubmit, formName } = this.props;
    console.log(this.props);
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Field
            name= 'username'
            label= 'UserName: '
          />
          <Field
            name= 'email'
            label= 'Email: '
          />
          <button type="submit">Submit</button>
        </form>      
      </div>
    );
  }
}

export default withForm({ formName: "form3", remoteValidate: submit })(FormValidateFormLevel);
