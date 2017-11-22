import React, { Component } from 'react';

import { 
  withForm, 
  Field, 
} from '../formValidate';

import {
  required, minLength, maxLength, number
} from '../validate';

const categories = [ "Teriyaki", "Deep Fry", "Stir Fry", "Side" ];

class MenuForm extends Component {
  render() {
    const { handleSubmit, validForm, errors } = this.props;
    // console.log(this.props);
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
            <label>Description: </label>
            <Field
              name= 'description'
              validates= {[required, minLength(5), maxLength(20)]}
              placeholder='Description of menu'
              className='form-control'
              component='textarea'
              rows='4'
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
          <div>
            <label>Sex: </label>
            <div className="radio">
              <label className="radio-inline">
                <Field
                  name= 'sex'
                  type='radio'
                  component='radio'
                  validates= {[required]}
                  value='male'
                />{' '}
                Male
              </label>
              <label className="radio-inline">
                <Field
                  name= 'sex'
                  type='radio'
                  component='radio'
                  validates= {[required]}
                  value='female'
                />{' '}
                Female
              </label>
            </div>
            <div>{errors && errors.sex}</div>
          </div>
        <button type="submit" className="btn btn-primary" disabled={!validForm}>Submit</button>
        <br /><br />
        <div><pre>{JSON.stringify(this.props, null, 2) }</pre></div>
        </form> 
            
      </div>
    );
  }
}

export default withForm({ formName: "MenuForm" })(MenuForm);
