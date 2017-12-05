import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { 
  withForm, 
  Field, 
} from '../formValidate';

import { addItem, updateItem, fetchItem, removeItem } from './firebaseActions';

class SimpleFormInner extends Component {
  componentDidMount(){
    console.log(this.props.match)
    if (!this.props.match) return;
    const { params } = this.props.match;
    if (params.id) {
      const { database, path } = this.props;
      fetchItem(database, path, params.id).then(snapshot => {
        this.props.handleFetchData({ ...snapshot.val(), id: snapshot.key })
      })
    }
  }
  handleSubmit = e => {
    if (e) e.preventDefault();
    const { database, path, handleSubmit, values, validForm, handleComplete } = this.props;
    if (!validForm) handleSubmit();
    
    if (validForm){
      const formValues = _.reduce(values, (acc, value, key) => {
        if (typeof value !== 'undefined' && value !== ''){
          acc[key] = typeof value === 'string' ? value.trim() : value;
        }
        return acc;
      }, {});
      if (formValues.id){
        updateItem(database, path, formValues).then(() => { 
          handleComplete();
          this.props.history.goBack();
        });
      }
      else {
        addItem(database, path, formValues).then(() => { 
          handleComplete(); 
          this.props.history.goBack();
        });
      }
    }
    return;
  }

  handleClickRemove = () => {
    const { database, path, values, handleComplete } = this.props;
    if (!values.id) return;
    removeItem(database, path, values.id).then(() => { 
      handleComplete();
      this.props.history.goBack();
    });
  }

  render(){
    // console.log(this.props);
    const { fields, validForm, values } = this.props;
    console.log("path: ", this.props.path)
    if (!values) return <div/>;
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
              <Field
                name= {name}
                validates= {rules}
                className='form-control'
              />            
            </div>
          )
        })}
        <div className="text-center">
          { deleteButton }{' '}
          <button type="submit" className="btn btn-primary" disabled={!validForm}>{buttonText}</button>
        </div>
        <br /><br />
        <div><pre>{JSON.stringify(this.props.values, null, 2) }</pre></div>
      </form> 
      
    )
  }
}

export const SimpleForm = withForm({ formName: "simpleForm" })(SimpleFormInner);