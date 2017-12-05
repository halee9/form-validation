import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field } from './Field';

import {
  required, minLength, maxLength, number
} from './rules';

const categoriesArray = [ "Teriyaki", "Deep Fry", "Stir Fry", "Side" ];

class Sample extends Component {
  handleSubmit = e => {
    if (e) e.preventDefault();
    return;
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
              placeholder='Name of menu'
              className='form-control'
            />            
          </div>
          <div className="form-group">
            <label>Description: </label>
            <Field
              name= 'description'
              placeholder='Description of menu (optional)'
              className='form-control'
              component='textarea'
              rows='4'
            />            
          </div>
          <div className="form-group">
            <label>Price: </label>
            <Field
              name= 'price'
              type='number'
              rules= {[required, number]}
              placeholder='Price of menu'
              className='form-control'
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
          <br /><br />
        </form> 
            
      </div>
    );
  }
}

export default Sample;
