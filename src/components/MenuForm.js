import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { 
  withForm, 
  Field, 
} from '../formValidate';

import {
  required, minLength, maxLength, number
} from '../validate';

import { addMenu, fetchMenu, updateMenu, removeMenu } from '../actions/menu';

const categoriesArray = [ "Teriyaki", "Deep Fry", "Stir Fry", "Side" ];
const cookingTypesArray = [ "Grill", "Wok", "Deep-fry", "Others"];
const ingredientsArray = [ "Broccoli", "Mushrooms", "Cabbages", "Onions", "Green Onions", "Carrots", "Bean Sprout" ];

class MenuForm extends Component {
  componentDidMount(){
    const { params } = this.props.match;
    if (params.id) {
      this.props.fetchMenu(params.id).then(snapshot => {
        this.props.handleFetchData({ ...snapshot.val(), id: snapshot.key })
      })
    }
  }
  handleSubmit = e => {
    if (e) e.preventDefault();
    const { handleSubmit, values, addMenu, validForm, updateMenu } = this.props;
    if (!validForm) handleSubmit();
    console.log("value: ", values);
    if (validForm){
      const formValues = _.reduce(values, (acc, value, key) => {
        if (typeof value !== 'undefined' && value !== ''){
          acc[key] = typeof value === 'string' ? value.trim() : value;
        }
        return acc;
      }, {});
      if (formValues.id){
        updateMenu(formValues).then(() => { this.props.history.push("/") });
      }
      else {
        addMenu(formValues).then(() => { this.props.history.push("/") });
      }
    }
    return;
  }

  handleClickRemove = () => {
    const { values, removeMenu } = this.props;
    if (!values.id) return;
    removeMenu(values.id).then(() => { this.props.history.push("/") });
  }

  render() {
    const { handleSubmit, validForm, errors, values } = this.props;
    if (!values) return <div/>;
    const formTitle = values.id ? "Menu Update" : "New Menu";
    const buttonText = values.id ? "Update" : "Submit";
    const deleteButton = values.id ? 
      <button type="button" className="btn btn-default" onClick={this.handleClickRemove}>Delete</button>
      : '';
    // if (this.props.match.params.id){
    //   if (this.props.menu) this.setInitValue(this.props.menu);
    //   //TODO: loading icon
    //   else return <div/>
    // }
    console.log("render form: ", this.props)
    return (
      <div>
        <h3>{formTitle}</h3>
        <hr />
        <form onSubmit={this.handleSubmit}>
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
              type='number'
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
              { categoriesArray.map( value => {
                const val = _.camelCase(value);
                return (
                  <option 
                    key={value} 
                    value={val}
                  >
                    {value}
                  </option>
                )}
              )}
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
              { cookingTypesArray.map( value => {
                console.log("this.props.values.cookingType: ", this.props.values.cookingType)
                return ( 
                  <label className="radio-inline" key={value}>
                    <input 
                      type='radio' 
                      name='cookingType' 
                      value={_.camelCase(value)} 
                      checked={_.camelCase(value) === this.props.values.cookingType}
                      onChange={() => {}}
                    />{' '}{value}
                  </label>
                )}
              )}
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
              { ingredientsArray.map( value => {
                const val = _.camelCase(value);
                return (
                  <label className="radio-inline" key={value}>
                    <input type='checkbox' 
                      name='ingredients' 
                      value={val} 
                      checked={_.includes(this.props.values.ingredients, val)} 
                      onChange={() => {}}
                    />{' '}{value}
                  </label>
                )}
              )}
            </Field>
          </div>
        { deleteButton }{' '}
        <button type="submit" className="btn btn-primary" disabled={!validForm}>{buttonText}</button>
        <br /><br />
        <div><pre>{JSON.stringify(this.props, null, 2) }</pre></div>
        </form> 
            
      </div>
    );
  }
}

const mapStateToProps = ({ menus }, ownProps) => {
  const menu = menus[ownProps.match.params.id];
  return { menu };
};

const enhanced = connect(mapStateToProps, { addMenu, fetchMenu, updateMenu, removeMenu })(MenuForm);

export default withForm({ formName: "MenuForm" })(enhanced);
