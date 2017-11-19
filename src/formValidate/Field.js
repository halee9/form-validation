import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Field extends Component {
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
    const { name, type, label } = this.props;
    const { form } = this.context;
    return (
      <div>
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
              {...this.props}
            />
          <div>{form && form.errors && form.errors[name]}</div>
      </div>
    )
  }
}

Field.contextTypes = {
  form: PropTypes.object,
  onChange: PropTypes.func,
};

Field.defaultProps = {
  type: 'text',
};

Field.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
};

