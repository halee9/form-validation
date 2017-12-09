import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { withFirebaseCRUD } from './withFirebaseCRUD';
import { withForm } from '../ReactFormValidation';

import {
  required, minLength, maxLength, number
} from '../ReactFormValidation/rules';

import { database } from '../config';

const systemName = 'srm';
const currentUser = {
  uid: 'test'
}
const baseRoute = "/lookups";
const formName = "category";

const path = `/${systemName}/${currentUser.uid}${baseRoute}/${formName}`


const rules = {
  name: [required(), maxLength(30)()],
  abbr: [required(), maxLength(10)()],
}

class SimpleFormInner extends Component {
  render(){
    const { handleChange, handleBlur, values, errors, validForm, handleClickRemove } = this.props;
    const buttonText = values.id ? "Update" : "Submit";
    const deleteButton = values.id ? 
      <button type="button" className="btn btn-warning" onClick={handleClickRemove}>Delete</button>
      : '';
    return (
      <form onSubmit={this.props.handleSubmitFirebaseCRUD}>
        <div className="form-group">
          <label>Name: </label>
          <input
            name='name'
            className='form-control'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name || ''}
          />
          <div className='text-danger'>{errors.name}</div>          
        </div>
        <div className="form-group">
          <label>Abbreviation: </label>
          <input
            name='abbr'
            className='form-control'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.abbr || ''}
          />
          <div className='text-danger'>{errors.abbr}</div>          
        </div>
        <div className="text-center">
          { deleteButton }{' '}
          <button type="submit" className="btn btn-primary" disabled={!validForm}>{buttonText}</button>
        </div>
        <br /><br />
        <div><pre>{JSON.stringify(this.props, null, 2) }</pre></div>
      </form> 
      
    )
  }
}

export const SimpleForm = withForm(rules)(withFirebaseCRUD(database, path, '/simplePage')(SimpleFormInner));