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
  price: [required(), number],
  category: [required()],
}

class FormLevelSample2 extends Component {
  render() {
    return (
      <div>
        <h3>Form Level Validation Sample</h3>
        <hr />
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <Field
              name= 'name'
              placeholder='Name of item'
              className='form-control'
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              value={this.props.values.name}
              message={this.props.errors.name}
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
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              value={this.props.values.description}
              message={this.props.errors.description}
            />            
          </div>
          <div className="form-group">
            <label>Price: </label>
            <Field
              name= 'price'
              type='number'
              placeholder='Price of item'
              className='form-control'
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              value={this.props.values.price}
              message={this.props.errors.price}
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
              onChange={this.props.handleChange}
              value={this.props.values.category}
              message={this.props.errors.category}
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
              disabled={!this.props.validForm}>Submit
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

export default withForm(FormLevelSample2, rules);
