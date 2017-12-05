import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field } from './Field';

import {
  required, minLength, maxLength, number
} from './rules';

const categoriesArray = [ "Grocery", "Beverage", "Stationary", "Others" ];

class Sample extends Component {
  state = {
    values: {},
    errors: {}
  }
  handleSubmit = e => {
    if (e) e.preventDefault();
    console.log("values: ", this.state.values);
    return;
  }

  handleChange = (name, value, error) => {
    this.setState({ 
      values: { ...this.state.values, [name]: value },
      errors: { ...this.state.errors, [name]: error }
    })
  }

  render() {
    return (
      <div>
        <h3>Field Level Validation Sample</h3>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <Field
              name= 'name'
              rules= {[required, minLength(5), maxLength(20)]}
              placeholder='Name of item'
              className='form-control'
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />            
          </div>
          <div className="form-group">
            <label>Price: </label>
            <Field
              name= 'price'
              type='number'
              rules= {[required, number]}
              placeholder='Price of item'
              className='form-control'
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <div>
              <label>Category: </label>
            </div>
            <Field
              name= 'category'
              component='select'
              rules= {[required]}
              className='form-control'
              onChange={this.handleChange}
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
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          <div><pre>{JSON.stringify(this.state, null, 2) }</pre></div>
        </form> 
            
      </div>
    );
  }
}

export default Sample;
