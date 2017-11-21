import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  withForm, 
  Field, 
} from '../formValidate';

import {
  required, minLength, maxLength, minValue, maxValue, number
} from '../validate';

const categories = [ "Teriyaki", "Deep Fry", "Stir Fry", "Side" ];

class MenuForm extends Component {
  render() {
    const { handleSubmit, pristine, validForm } = this.props;
    console.log(this.props);
    return (
      <div>
        <h3>Menu Form</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <Field
              name= 'name'
              validates= {[required, minLength(5), maxLength(20)]}
              placeholder='Name of menu'
              className='form-control'
            />
          </div>
          <div className="form-group">
            <label>Price: </label>
            <Field
              name= 'price'
              validates= {[required, number]}
              placeholder='Price of menu'
              className='form-control'
            />
          </div>
          <div className="form-group">
            <label>Category: </label>
            <Field
              name= 'category'
              component='select'
              validates= {[required]}
              className='form-control'
            >
              <option />
              { categories.map( c => <option key={c} value={c}>{c}</option>)}
            </Field>
          </div>
        <button type="submit" className="btn btn-primary" disabled={!validForm}>Submit</button>
          <br />{ validForm ? "true" : "false" }
        </form> 
            
      </div>
    );
  }
}

export default withForm({ formName: "MenuForm" })(MenuForm);
