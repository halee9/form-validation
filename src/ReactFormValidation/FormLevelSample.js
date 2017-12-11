import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  required, minLength, maxLength, number
} from './rules';

import { withForm } from './withForm';

const categoriesArray = [ "Grocery", "Beverage", "Stationary", "Others" ];

const rules = {
  name: [required("You can set customized message"), minLength(5)(), maxLength(20)()],
  // set false at first index if the field is optional.
  
  // description: [false, minLength(5)()],
  description: (field, value) => {
    if (field === 'name') {
      if (value.length > 7){
        return [required(), minLength(5)()];
      }
      else return [false, minLength(5)()];
    } 
    return false;
  },
  // price: (field, value) => {
  //   if (field === 'name') {
  //     if (value.length > 7){
  //       return [required(), number()];
  //     }
  //     else return [false, number()];
  //   } 
  //   return false;
  // },
  price: [required(), number()],
  category: [required()],
}

const fetchedData = {
  name: "Test",
  description: "description asfdf",
  price: 9.99,
  category: "Others"
}

class FormLevelSample extends Component {
  componentWillMount(){
    const { params } = this.props.match;
    if (params.id) {
      this.props.handleFetchedData(fetchedData);
    }
  }

  handleSubmit = (e) => {
    this.props.handleSubmit(e, (res) => {
      if (res) {
        alert("Form will be submitted!!");
      }
    });
    
  }

  render() {
    const { handleChange, handleBlur, handleSubmit, values, errors, validForm } = this.props;
    return (
      <div>
        <h3>Form Level Validation Sample with HOC</h3>
        <Link className='pull-right' to='/formSample2/11'>Fetch data</Link>
        <hr />
        <form onSubmit={this.handleSubmit}>
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
              onBlur={handleBlur}
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
          <hr/>
          <div><pre>{JSON.stringify(this.props, null, 2) }</pre></div>
        </form> 
            
      </div>
    );
  }
}

export default withForm(rules)(FormLevelSample);
