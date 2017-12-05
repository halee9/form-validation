import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { 
  withForm, 
  Field, 
} from '../formValidate';

import {
  required, minLength, maxLength, number
} from '../validate';

import { addMenu, fetchMenu, updateMenu, removeMenu, fetchLookUps } from '../actions/menu';

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
    this.props.fetchLookUps();
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
    const { handleSubmit, validForm, errors, values, lookups } = this.props;
    if (!values) return <div/>;
    const formTitle = values.id ? "Menu Update" : "New Menu";
    const buttonText = values.id ? "Update" : "Submit";
    const deleteButton = values.id ? 
      <button type="button" className="btn btn-warning" onClick={this.handleClickRemove}>Delete</button>
      : '';
    // if (this.props.match.params.id){
    //   if (this.props.menu) this.setInitValue(this.props.menu);
    //   //TODO: loading icon
    //   else return <div/>
    // }
    // console.log("render form: ", this.props)
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
            <div>
              <label>Category: </label>
              <Link className="pull-right" to={`/lookups/category`}>Edit</Link>
            </div>
            <Field
              name= 'category'
              component='select'
              validates= {[required]}
              className='form-control'
            >
              <option />
              { _.map(lookups.category, (item, key) => {
                return (
                  <option 
                    key={key} 
                    value={key}
                  >
                    {item.name}
                  </option>
                )}
              )}
            </Field>
          </div>

          <div>
            <div>
              <label>Type of Cooking: </label>
              <Link className="pull-right" to={`/lookups/cookingType`}>Edit</Link>
            </div>
            <Field 
              className="radio"
              name= 'cookingType'
              type='radio'
              component='radio'
              validates= {[required]}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              { _.map(lookups.cookingType, (item, key) => {
                return ( 
                  <label className="radio-inline" key={key}>
                    <input 
                      type='radio' 
                      name='cookingType' 
                      value={key} 
                      checked={key === this.props.values.cookingType}
                      onChange={() => {}}
                    />{' '}{item.name}
                  </label>
                )}
              )}
              </div>
            </Field>
          </div>

          <div>
            <div>
              <label>Ingredients: </label>
              <Link className="pull-right" to={`/lookups/ingredients`}>Edit</Link>
            </div>
            <Field 
              className="checkbox"
              name= 'ingredients'
              type='checkbox'
              component='checkboxes'
            >
              { _.map(lookups.ingredients, (item, key) => {
                return (
                  <label className="radio-inline" key={key}>
                    <input type='checkbox' 
                      name='ingredients' 
                      value={key} 
                      checked={_.includes(this.props.values.ingredients, key)} 
                      onChange={() => {}}
                    />{' '}{item.name}
                  </label>
                )}
              )}
            </Field>
          </div>
          <div className="text-center">
            { deleteButton }{' '}
            <button type="submit" className="btn btn-primary" disabled={!validForm}>{buttonText}</button>
          </div>
          <br /><br />
        </form> 
        <div><pre>{JSON.stringify(this.props, null, 2) }</pre></div>
            
      </div>
    );
  }
}

const mapStateToProps = state => ({lookups: state.lookups});

const enhanced = connect(mapStateToProps, 
  { addMenu, fetchMenu, updateMenu, removeMenu, fetchLookUps })(MenuForm);

export default withForm({ formName: "MenuForm" })(enhanced);
