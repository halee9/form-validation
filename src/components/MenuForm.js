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
              { categories.map( c => <option key={c} value={c}>{c}</option>)}
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
              <label className="radio-inline">
                <input type='radio' name='cookingType' value='grill' />{' '}Grill
              </label>
              <label className="radio-inline">
                <input type='radio' name='cookingType' value='wok' />{' '}Wok
              </label>
              <label className="radio-inline">
                <input type='radio' name='cookingType' value='deepFry' />{' '}Deep-fry
              </label>
              <label className="radio-inline">
                <input type='radio' name='cookingType' value='others' />{' '}Others
              </label>
            </Field>
            <div>{errors && errors.cookingType}</div>
          </div>

          <div>
            <label>Ingredients: </label>
            <Field 
              className="checkbox"
              name= 'ingredients'
              type='checkbox'
              component='checkbox'
              validates= {[required]}
            >
              <label className="radio-inline">
                <input type='checkbox' name='ingredients' value='broccoli' />{' '}Brocolli
              </label>
              <label className="checkbox-inline">
                <input type='checkbox' name='ingredients' value='mushrooms' />{' '}Mushrooms
              </label>
              <label className="checkbox-inline">
                <input type='checkbox' name='ingredients' value='cabbages' />{' '}Cabbages
              </label>
              <label className="checkbox-inline">
                <input type='checkbox' name='ingredients' value='onoins' />{' '}Onions
              </label>
              <label className="checkbox-inline">
                <input type='checkbox' name='ingredients' value='carrots' />{' '}Carrots
              </label>
              <label className="checkbox-inline">
                <input type='checkbox' name='ingredients' value='beanSprount' />{' '}Bean Sprout
              </label>
              <label className="checkbox-inline">
                <input type='checkbox' name='ingredients' value='greenOnions' />{' '}Green Onions
              </label>
            </Field>
            <div>{errors && errors.ingredients}</div>
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
