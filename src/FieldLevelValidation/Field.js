import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './Field.css';

export class Field extends Component {
  constructor(props){
    // console.log(props)
    super(props);
    this.state = {
      value: props.value || '',
      message: ''
    }
    this.onValidate = false;
  }

  handleParent = () => {
    this.props.onChange(this.props.name, this.state.value, this.state.message); 
  }

  validate = (value, rules) => {
    // console.log(value, rules)
    if (_.isArray(rules)){
      for (let i=0; i<rules.length; i++){
        const error = rules[i](value);
        if (error) {
          this.setState({ message: error }, this.handleParent);
          return;
        }
      }
      this.setState({ message: '' }, this.handleParent);
    }
    this.setState({ message: '' }, this.handleParent);
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value }, () => {
      if (this.onValidate) this.validate(this.state.value, this.props.rules);
      else this.handleParent();
    });
  }

  handleBlur = (e) => {
    this.validate(this.state.value, this.props.rules);
    this.onValidate = true;
  }

  renderInput = () => {
    return (
      <div>
        <input 
          {...this.props}
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <div className='error-message'>{this.state.message}</div>
      </div>
    );
  }

  renderSelect = () => {
    const { children, name } = this.props;
    const { form } = this.context;
    // console.log("form.values[name]: ", form.values[name])
    return (
      <div>
        <select 
          {...this.props}
          value={this.state.value}
          onChange={(e) => {
            this.onValidate = true;
            this.handleChange(e);
          }}
        >
          { children }
        </select>
        <div className='error-message'>{this.state.message}</div>
      </div>
    )
  }

  renderTextarea = () => {
    const { children, name } = this.props;
    const { form } = this.context;
    return (
      <div>
        <textarea 
          {...this.props}
          value={this.state.value}
          onChange={(e) => {
            this.onValidate = true;
            this.handleChange(e);
          }}         
        >
        </textarea>
        <div className='error-message'>{this.state.message}</div>
      </div>
    )
  }

  render() {
    // console.log("render: ", this.props.name)
    const { component } = this.props;
    const input = 
      component === 'input' ? this.renderInput() :
      component === 'select' ? this.renderSelect() : 
      component === 'textarea' ? this.renderTextarea() : this.renderInput();
    return input;
  }
}

Field.defaultProps = {
  type: 'text',
  component: 'input',
};

Field.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
};
