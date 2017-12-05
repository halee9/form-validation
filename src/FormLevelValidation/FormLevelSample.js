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

const validate = (value, rules, callback) => {
  if (_.isArray(rules)){
    for (let i=0; i<rules.length; i++){
      const error = rules[i](value);
      if (error) {
        return callback(error);
      }
    }
    return callback(false);
  }
  return callback(false);
}

class FormLevelSample extends Component {
  onValidate = false;
  state = {
    values: {},
    errors: {},
    validForm: false
  }

  componentDidMount(){
    const validForm = rules.length > 0 ? false : true;
    this.setState={ validForm }
  }

  handleSubmit = e => {
    if (e) e.preventDefault();
    const elements = e.target.elements;
    let errors = {};
    _.map(elements, e => {
      if (e.type && e.type != 'submit'){
        validate(e.value, rules[e.name], error => {
          errors[e.name] = error;
        })
      }
    })
    this.setState({ errors });
    return;
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.onValidate = true;
    if (this.onValidate) {
      validate(value, rules[name], error => {
        if (error) {
          this.setState({ 
            values: { ...this.state.values, [name]: value },
            errors: { ...this.state.errors, [name]: error }
          })
        }
        else {
          this.setState({ 
            values: { ...this.state.values, [name]: value },
            errors: { ...this.state.errors, [name]: '' }
          })
        }
      });
    }
    else {
      this.setState({ values: { ...this.state.values, [name]: value }});
    }
  }

  handleBlur = (e) => {
    const { name, value } = e.target;
    validate(value, rules[name], error => {
      if (error) {
        this.setState({ 
          values: { ...this.state.values, [name]: value },
          errors: { ...this.state.errors, [name]: error }
        })
      }
    });
    this.onValidate = true;
  }

  render() {
    return (
      <div>
        <h3>Form Level Validation Sample</h3>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <Field
              name= 'name'
              placeholder='Name of item'
              className='form-control'
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.values.name}
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
              onBlur={this.handleBlur}
              value={this.state.values.description}
              message={this.state.errors.description}
            />            
          </div>
          <div className="form-group">
            <label>Price: </label>
            <Field
              name= 'price'
              type='number'
              placeholder='Price of item'
              className='form-control'
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.values.price}
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
              className='form-control'
              onChange={this.handleChange}
              value={this.state.values.category}
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
            <button type="submit" 
              className="btn btn-primary" 
              disabled={!this.state.validForm}>Submit
            </button>
            {' '}
            <button type="submit" 
              className="btn btn-primary">
            </button>
          </div>
          <div><pre>{JSON.stringify(this.state, null, 2) }</pre></div>
        </form> 
            
      </div>
    );
  }
}

export default FormLevelSample;
