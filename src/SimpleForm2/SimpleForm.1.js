import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { withForm } from '../ReactFormValidation';
import {
  required, minLength, maxLength, number
} from '../ReactFormValidation/rules';

import { addItem, updateItem, fetchItem, removeItem } from './firebaseActions';

import { database } from '../config';

const systemName = 'srm';
const currentUser = {
  uid: 'test'
}
const baseRoute = "/lookups";
const formName = "category";

const path = `/${systemName}/${currentUser.uid}${baseRoute}/${formName}`


// const rules = {
//   name: [required(), maxLength(30)()],
//   abbr: [required(), maxLength(10)()],
// }

const fields = [
  { label: "Name: ", name: "name", rules: [required(), maxLength(30)()] },
  { label: "Abbreviation: ", name: "abbr", rules: [required(), maxLength(10)()] },
]

const rules = fields.reduce((acc, field) => {
  acc[field.name] = field.rules;
  return acc;
},{});

console.log(rules)

class SimpleFormInner extends Component {
  handleFetchItem = id => {
    fetchItem(database, path, id)
    .then(snapshot => {
      this.props.handleFetchedData({ ...snapshot.val(), id: snapshot.key });
    })
  }

  componentWillMount(){
    const { params } = this.props.match;
    if (params.id) {
      console.log(this.props)
      this.handleFetchItem(params.id);
    }
  }

  componentWillUpdate(nextProps){
    const id = this.props.match.params.id;
    const nextId = nextProps.match.params.id;
    if (id !== nextId){
      this.handleFetchItem(nextId);
    }
  }

  handleSubmit = (e) => {
    const { validForm, values } = this.props;
    this.props.handleSubmit(e, (res) => {
      if (res) {
        if (validForm){
          const formValues = _.reduce(values, (acc, value, key) => {
            if (typeof value !== 'undefined' && value !== ''){
              acc[key] = typeof value === 'string' ? value.trim() : value;
            }
            return acc;
          }, {});
          if (formValues.id){
            updateItem(database, path, formValues).then(() => { 
              this.props.history.push("/SimplePage");
            });
          }
          else {
            addItem(database, path, formValues).then(() => { 
              this.props.history.push("/SimplePage");
            });
          }
        }
      }
    });
    
  }

  handleClickRemove = () => {
    const { values } = this.props;
    if (!values.id) return;
    removeItem(database, path, values.id).then(() => { 
      this.props.history.push("/SimplePage");
    });
  }

  render(){
    // console.log(this.props);
    const { handleChange, handleBlur, handleSubmit, values, errors, validForm } = this.props;
    const buttonText = values.id ? "Update" : "Submit";
    const deleteButton = values.id ? 
      <button type="button" className="btn btn-warning" onClick={this.handleClickRemove}>Delete</button>
      : '';
    return (
      <form onSubmit={this.handleSubmit}>
        { fields.map(({ label, name, rules }) => {
          // console.log(validates, name)
          return (
            <div className="form-group" key={name}>
              <label>{label}</label>
              <input
                name={name}
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[name] || ''}
              />
              <div className='text-danger'>{errors[name]}</div>          
            </div>
          )
        })}
        <div className="text-center">
          { deleteButton }{' '}
          <button type="submit" className="btn btn-primary" disabled={!validForm}>{buttonText}</button>
        </div>
        <br /><br />
        <div><pre>{JSON.stringify(this.props, null, 2) }</pre></div>
      </form> 
      
    )
  }
}

export const SimpleForm = withForm(rules)(SimpleFormInner);