import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Field extends Component {
  touched = false;
  change = (value) => {
    const { name, validates } = this.props;
    this.context.onChange({ 
      formName: this.context.form.name,
      fieldName: name,
      value: value, 
      validates: validates,
      touched: this.touched
    });
    
  }
  render() {
    const { name, type, label, required } = this.props;
    const { form } = this.context;
    // const form = forms[formName];
    // console.log("form: ", form);
    // console.log("context: ", this.context.formName)
    return (
      <div>
        <label>
          <div>{ label }</div>
          <input 
              type={type} 
              name={name}
              value={form && form.values && form.values[name] || ''}
              onChange={(e) => {
                this.change(e.target.value);
              }}
              onBlur={(e) => {
                this.touched = true;
                this.change(e.target.value);
              }}
              required={required}
            />
          <div>{form && form.errors && form.errors[name]}</div>
        </label>
        <div></div>
      </div>
    )
  }
}

Field.contextTypes = {
  formName: PropTypes.string,
  form: PropTypes.object,
  onChange: PropTypes.func,
};

Field.defaultProps = {
  type: 'text',
};

Field.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  validates: PropTypes.array,
  label: PropTypes.string,
};

export default Field;