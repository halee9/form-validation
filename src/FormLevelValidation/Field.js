import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './Field.css';

export class Field extends Component {
  renderInput = () => {
    return (
      <div>
        <input 
          {...this.props}
        />
        <div className='error-message'>{this.props.message}</div>
      </div>
    );
  }

  renderSelect = () => {
    return (
      <div>
        <select 
          {...this.props}
        >
          { this.props.children }
        </select>
        <div className='error-message'>{this.props.message}</div>
      </div>
    )
  }

  renderTextarea = () => {
    return (
      <div>
        <textarea 
          {...this.props}
        >
        </textarea>
        <div className='error-message'>{this.props.message}</div>
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
