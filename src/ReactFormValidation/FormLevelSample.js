import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  required, minLength, maxLength, number
} from './rules';

import { withForm } from './withForm';

const categoriesArray = [ "Grocery", "Beverage", "Stationary", "Others" ];

const rules = {
  name: [required("Custom required"), minLength(5)(), maxLength(20)()],
  // set false at first index if the field is optional.
  description: [false, minLength(5)()],
  price: [required(), number()],
  category: [required()],
}

class FormLevelSample2 extends Component {
  render() {
    const { handleChange, handleBlur, handleSubmit, values, errors, validForm } = this.props;
    return (
      <div>
        <h3>Form Level Validation Sample with HOC</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              name='name'
              placeholder='Name of item'
              className='form-control'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name || ''}
            /> 
            <div className='text-danger'>{errors.name}</div>      
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea
              name='description'
              placeholder='Description of item (optional)'
              className='form-control'
              component='textarea'
              rows='4'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description || ''}
            /> 
            <div className='text-danger'>{errors.description}</div>           
          </div>
          <div className="form-group">
            <label>Price: </label>
            <input
              name='price'
              type='text'
              placeholder='Price of item'
              className='form-control'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price || ''}
            />
            <div className='text-danger'>{errors.price}</div>
          </div>
          <div className="form-group">
            <div>
              <label>Category: </label>
            </div>
            <select
              name='category'
              component='select'
              className='form-control'
              onChange={handleChange}
              value={values.category || ''}
            >
              <option />
              { _.map(categoriesArray, value => {
                return (
                  <option 
                    key={value} 
                    value={value}
                  >
                    {value}
                  </option>
                )}
              )}
            </select>
            <div className='text-danger'>{errors.category}</div>
          </div>
          <div className="text-center">
            <button type="submit" 
              className="btn btn-primary" 
              disabled={!validForm}>Submit
            </button>
            {' '}
            <button type="submit" 
              className="btn btn-primary">Submit
            </button>
          </div>
          <div><pre>{JSON.stringify(this.props, null, 2) }</pre></div>
        </form> 
            
      </div>
    );
  }
}

export default withForm(rules)(FormLevelSample2);
