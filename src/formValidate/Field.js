import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Field.css';

export class Field extends Component {
  blured = false;
  change = (value) => {
    const { name } = this.props;
    this.context.onChange({ 
      formName: this.context.formName,
      fieldName: name,
      value: value, 
      blured: this.blured
    });
    
  }

  componentDidMount(){
    const { name, validates } = this.props;
    const { formName, onLoadField } = this.context;
    // console.log("field mounted: ", formName)
    onLoadField({ formName: formName, fieldName: name, validates });
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
                this.blured = true;
                this.change(e.target.value);
              }}
              {...this.props}
            />
          <div className='error-message'>{form && form.errors && form.errors[name]}</div>
      </div>
    )
  }
}

Field.contextTypes = {
  formName: PropTypes.string,
  form: PropTypes.object,
  onChange: PropTypes.func,
  onLoadField: PropTypes.func,
};

Field.defaultProps = {
  type: 'text',
};

Field.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
};
