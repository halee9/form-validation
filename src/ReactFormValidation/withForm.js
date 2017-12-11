import React, { Component } from 'react';
import _ from 'lodash';

const validateField = (value, rules) => {
  let error = false;
  for (let i=0; i<rules.length; i++){
    if (rules[i]){
      error = rules[i](value);
      if (error) {
        return error;
      }
    }
  }
  return error;
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
        validForm: false,
      }
      chainRules = {};
      rules = _.reduce(rules, (acc, rule, key) => {
        if (_.isFunction(rule)){
          this.chainRules[key] = rule;
        }
        else acc[key] = rule;
        // console.log(acc, this.chainRules)
        return acc;
      },{});

      validate = (name, value, callback) => {
        console.log("validate: ", name, value)
        let error = false;
        const rules = this.rules[name];
        if (_.isArray(rules)){
          error = validateField(value, rules);
        }
        if (error) {
          this.validFields[name] = false;
          this.setState({ 
            values: { ...this.state.values, [name]: value },
            errors: { ...this.state.errors, [name]: error },
            validForm: _.every(this.validFields)
          }, () => {
            if (callback) callback();
          })
        }
        else {
          this.validFields[name] = true;
          this.setState({ 
            values: { ...this.state.values, [name]: value },
            errors: { ...this.state.errors, [name]: '' },
            validForm: _.every(this.validFields)
          }, () => {
            if (callback) callback();
          })
        }
      }
      
  
      componentDidMount(){
        this.setState({ validForm: _.every(this.validFields) });
      }

      handleFetchedData = values => {
        let errors = {};
        _.map(values, (value, name) => {
          const error = validateField(value, this.rules[name]);
          if (error){
            errors[name] = error;
            this.validFields[name] = false;
          }
          else this.validFields[name] = true;
          this.onValidates[name] = true;
        });
        this.setState({ values, errors, validForm: _.every(this.validFields)});
        
      }
  
      handleSubmit = (e, callback) => {
        if (e) e.preventDefault();
        const elements = e.target.elements;
        let errors = {};
        _.map(elements, e => {
          if (e.type && e.type != 'submit'){
            const error = validateField(e.value, this.rules[e.name]);
            if (error){
              errors[e.name] = error;
              this.validFields[e.name] = false;
            }
            else this.validFields[e.name] = true;
            this.onValidates[e.name] = true;
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
          this.validate(name, value, () => {
            // TODO: have to able to multi chaining rules!!
            _.map(this.chainRules, (chain, key) => {
              const rule = chain(name, this.state.values[name]);
              if (rule){
                this.rules[key] = rule;
                this.validate(key, this.state.values.description);
              }
            })
          });
        }
        else {
          this.setState({ values: { ...this.state.values, [name]: value }});
        }
      }
    
      handleBlur = (e) => {
        const { name, value } = e.target;
        this.onValidates[name] = true;
        this.validate(name, value);
      }

      ruleChanged = (name, rule) => {
        if (this.rules[name] !== rule){
          this.rules[name] = rule;
        }
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