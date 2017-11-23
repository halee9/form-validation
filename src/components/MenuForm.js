import React, { Component } from 'react';
import _ from 'lodash';

import { 
  withForm, 
  Field, 
} from '../formValidate';

import {
  required, minLength, maxLength, number
} from '../validate';

const categories = [ "Teriyaki", "Deep Fry", "Stir Fry", "Side" ];
const cookingTypes = [ "Grill", "Wok", "Deep-fry", "others"];
const ingredients = [ "Broccoli", "Mushrooms", "Cabbages", "Onions", "Green Onions", "Carrots", "Bean Sprout" ];

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
              { categories.map( value => (
                <option key={value} value={_.camelCase(value)}>{value}</option>
              ))}
            </Field>
          </div>

          <div>
            <label>Type of Cooking: </label>
            <Field 
              className="radio"
              name= 'cookingType'
              type='radio'
              component='radio'
              validates= {[required]}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              { cookingTypes.map( value => (
                <label className="radio-inline" key={value}>
                  <input type='radio' name='cookingType' value={_.camelCase(value)} />{' '}{value}
                </label>
              ))}
              </div>
            </Field>
          </div>

          <div>
            <label>Ingredients: </label>
            <Field 
              className="checkbox"
              name= 'ingredients'
              type='checkbox'
              component='checkboxes'
              validates= {[required]}
            >
              { ingredients.map( value => (
                <label className="radio-inline" key={value}>
                  <input type='checkbox' name='ingredients' value={_.camelCase(value)} />{' '}{value}
                </label>
              ))}
            </Field>
          </div>
            
        <button type="submit" className="btn btn-primary" disabled={!validForm}>Submit(disable)</button>
        {' '}
        <button type="submit" className="btn btn-primary" >Submit</button>
        <br /><br />
        <div><pre>{JSON.stringify(this.props, null, 2) }</pre></div>
        </form> 
            
      </div>
    );
  }
}

export default withForm({ formName: "MenuForm" })(MenuForm);
