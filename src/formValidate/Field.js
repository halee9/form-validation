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

  renderInput = () => {
    const { name } = this.props;
    const { form } = this.context;
    return (
      <div>
        <input 
          value={form ? form.values && form.values[name] : ''}
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
    );
  }

  renderSelect = () => {
    const { children, name } = this.props;
    const { form } = this.context;
    return (
      <div>
        <select 
          value={form ? form.values && form.values[name] : ''}
          onChange={(e) => {
            this.blured = true;
            this.change(e.target.value);
          }}
          {...this.props}
        >
          { children }
        </select>
        <div className='error-message'>{form && form.errors && form.errors[name]}</div>
      </div>
    )
  }

  renderTextarea = () => {
    const { children, name } = this.props;
    const { form } = this.context;
    return (
      <div>
        <textarea 
          value={form ? form.values && form.values[name] : ''}
          onChange={(e) => {
            this.blured = true;
            this.change(e.target.value);
          }}
          {...this.props}
        >
          { children }
        </textarea>
        <div className='error-message'>{form && form.errors && form.errors[name]}</div>
      </div>
    )
  }

  renderRadio = () => {
    const { name } = this.props;
    const { form } = this.context;
    return (
      <input 
        value={form ? form.values && form.values[name] : ''}
        onChange={(e) => {
          this.change(e.target.value);
        }}
        {...this.props}
      />
    )
  }

  renderCheckbox = () => {
    const { name } = this.props;
    const { form } = this.context;
    return (
      <input 
        value={form ? form.values && form.values[name] : ''}
        onChange={(e) => {
          this.change(e.target.value);
        }}
        {...this.props}
      />
    )
  }

  render() {
    const { component } = this.props;
    const input = 
      component === 'input' ? this.renderInput() :
      component === 'select' ? this.renderSelect() : 
      component === 'textarea' ? this.renderTextarea() : 
      component === 'radio' ? this.renderRadio() : 
      component === 'checkbox' ? this.renderCheckbox() : this.renderInput();
    return input;
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
  component: 'input',
};

Field.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
};
