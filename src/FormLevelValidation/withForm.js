import React, { Component } from 'react';
import _ from 'lodash';

const validate = (value, rules, callback) => {
  if (_.isArray(rules)){
    for (let i=0; i<rules.length; i++){
      if (rules[i]){
        const error = rules[i](value);
        if (error) {
          return callback(error);
        }
      }
    }
    return callback(false);
  }
  return callback(false);
}

export function withForm(WrappedComponent, rules){
  return class extends Component {
    onValidate = false;
    validFields = _.reduce(rules, (acc, rule, key) => {
      acc[key] = rule[0] ? false : true;
      console.log(acc)
      return acc;
    },{});
    state = {
      values: {},
      errors: {},
      validForm: false
    }

    componentDidMount(){
      this.setState({ validForm: _.every(this.validFields) });
    }

    handleSubmit = e => {
      if (e) e.preventDefault();
      const elements = e.target.elements;
      let errors = {};
      _.map(elements, e => {
        if (e.type && e.type != 'submit'){
          validate(e.value, rules[e.name], error => {
            errors[e.name] = error;
            this.validFields[e.name] = false;
          })
        }
      })
      this.setState({ errors, validForm: _.every(this.validFields) });
      this.onValidate = true;
      if (this.state.validForm){
        alert("The form was submitted!")
      }
      return;
    }
  
    handleChange = e => {
      const { name, value } = e.target;
      if (this.onValidate) {
        validate(value, rules[name], error => {
          if (error) {
            this.validFields[name] = false;
            this.setState({ 
              values: { ...this.state.values, [name]: value },
              errors: { ...this.state.errors, [name]: error },
              validForm: _.every(this.validFields)
            })
          }
          else {
            this.validFields[name] = true;
            this.setState({ 
              values: { ...this.state.values, [name]: value },
              errors: { ...this.state.errors, [name]: '' },
              validForm: _.every(this.validFields)
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

    render(){
      return (
        <WrappedComponent
          { ...this.props }
          values={this.state.values}
          errors={this.state.errors}
          validForm={this.state.validForm}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }
}