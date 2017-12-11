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

export function withForm(rules){
  return function(WrappedComponent){
    return class extends Component {
      onValidates = _.reduce(rules, (acc, rule, key) => {
        acc[key] = false;
        return acc;
      },{});
      validFields = _.reduce(rules, (acc, rule, key) => {
        acc[key] = rule[0] ? false : true;
        return acc;
      },{});
      state = {
        values: {},
        errors: {},
        validForm: false
      }
      rules = rules;
  
      componentDidMount(){
        this.setState({ validForm: _.every(this.validFields) });
      }

      handleFetchedData = values => {
        let errors = {};
        _.map(values, (value, name) => {
          validate(value, this.rules[name], error => {
            if (error){
              errors[name] = error;
              this.validFields[name] = false;
            }
            else this.validFields[name] = true;
            this.onValidates[name] = true;
          })
        });
        this.setState({ values, errors, validForm: _.every(this.validFields)});
        
      }
  
      handleSubmit = (e, callback) => {
        if (e) e.preventDefault();
        const elements = e.target.elements;
        let errors = {};
        _.map(elements, e => {
          if (e.type && e.type != 'submit'){
            validate(e.value, this.this.rules[e.name], error => {
              if (error){
                errors[e.name] = error;
                this.validFields[e.name] = false;
              }
              else this.validFields[e.name] = true;
              this.onValidates[e.name] = true;
            })
          }
        })
        const validForm = _.every(this.validFields);
        this.setState({ errors, validForm }, () => {
          if (callback) callback(validForm);
        });
      }
    
      handleChange = e => {
        const { name, value } = e.target;
        if (this.onValidates[name]) {
          validate(value, this.rules[name], error => {
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
        this.onValidates[name] = true;
        validate(value, this.rules[name], error => {
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

      ruleChanged = (name, rule) => {
        this.rules[name] = rule;
        console.log("this.rules: ", this.rules)
      }
  
      render(){
        return (
          <WrappedComponent
            { ...this.props }
            values={this.state.values}
            errors={this.state.errors}
            validFields={this.validFields}
            validForm={this.state.validForm}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            handleSubmit={this.handleSubmit}
            handleFetchedData={this.handleFetchedData}
            ruleChanged={this.ruleChanged}
          />
        )
      }
    }  
  }
}