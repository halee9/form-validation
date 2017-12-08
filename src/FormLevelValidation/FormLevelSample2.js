import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field } from './Field';

import {
  required, minLength, maxLength, number
} from './rules';

import { withForm } from './withForm';

const categoriesArray = [ "Grocery", "Beverage", "Stationary", "Others" ];

const rules = {
  name: [required("Custom required"), minLength(5), maxLength(20)],
  description: [false, minLength(5)],
  price: [required(), number],
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
            <Field
              name= 'name'
              placeholder='Name of item'
              className='form-control'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              message={errors.name}
            />            
          </div>
          <div className="form-group">
            <label>Description: </label>
            <Field
              name= 'description'
              placeholder='Description of item (optional)'
              className='form-control'
              component='textarea'
              rows='4'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              message={errors.description}
            />            
          </div>
          <div className="form-group">
            <label>Price: </label>
            <Field
              name= 'price'
              type='number'
              placeholder='Price of item'
              className='form-control'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              message={errors.price}
            />
          </div>
          <div className="form-group">
            <div>
              <label>Category: </label>
            </div>
            <Field
              name= 'category'
              component='select'
              className='form-control'
              onChange={handleChange}
              value={values.category}
              message={errors.category}
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
            </Field>
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
