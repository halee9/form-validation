import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field } from './Field';

import {
  required, minLength, maxLength, number
} from './rules';

const categoriesArray = [ "Grocery", "Beverage", "Stationary", "Others" ];

const rules = {
  name: [required("Custom required"), minLength(5), maxLength(20)],
  price: [required(), number],
  category: [required()],
}

const validate = (value, rules) => {
  if (_.isArray(rules)){
    for (let i=0; i<rules.length; i++){
      const error = rules[i](value);
      if (error) {
        return error;
      }
    }
    return false;
  }
  return false;
}

class Sample extends Component {
  state = {
    values: {},
    errors: {}
  }
  handleSubmit = e => {
    if (e) e.preventDefault();
    const elements = e.target.elements;
    let errors = {};
    _.map(elements, e => {
      if (e.type && e.type != 'submit'){
        const error = validate(e.value, rules[e.name]);
        console.log(e.name, e.value, error)
        if (error) errors[e.name] = error;
      }
    })
    this.setState({ errors });
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
              rules= {[minLength(5), maxLength(20)]}
              placeholder='Name of item'
              className='form-control'
              onChange={this.handleChange}
              message={this.state.errors.name}
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
              rules= {[required(), number]}
              placeholder='Price of item'
              className='form-control'
              onChange={this.handleChange}
              message={this.state.errors.price}
            />
          </div>
          <div className="form-group">
            <div>
              <label>Category: </label>
            </div>
            <Field
              name= 'category'
              component='select'
              rules= {[required()]}
              className='form-control'
              onChange={this.handleChange}
              message={this.state.errors.category}
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
