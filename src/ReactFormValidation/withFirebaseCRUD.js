import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { withForm } from '../ReactFormValidation';

import { addItem, updateItem, fetchItem, removeItem } from './firebaseActions';

export function withFirebaseCRUD(database, path, urlBackTo) {
  return function(WrappedComponent){
    return class extends Component {
        handleFetchItem = id => {
        fetchItem(database, path, id)
        .then(snapshot => {
          this.props.handleFetchedData({ ...snapshot.val(), id: snapshot.key });
        })
      }

      componentWillMount(){
        const { params } = this.props.match;
        if (params.id) {
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

      handleSubmitFirebaseCRUD = (e) => {
        if (e) e.preventDefault();
        const { validForm, values } = this.props;
        console.log(this.props);
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
                  this.props.history.push(urlBackTo);
                });
              }
              else {
                addItem(database, path, formValues).then(() => { 
                  this.props.history.push(urlBackTo);
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
          this.props.history.push(urlBackTo);
        });
      }

      render() {
        return (
          <WrappedComponent
            { ...this.props }
            handleClickRemove={this.handleClickRemove}
            handleSubmitFirebaseCRUD={this.handleSubmitFirebaseCRUD}
          />
        )
      }
    }

  }
}
