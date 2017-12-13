import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './InputPhoneNumberWithCountry.css';

import { asYouType } from 'libphonenumber-js'
import { ReactInput, templateFormatter, templateParser, parseDigit } from 'input-format'

const DEFAULT_TEMPLATE = 'xxx-xxx-xxxx';
const DEFAULT_COUNTRY_CODE = 'US';

const countryCodes = [
  { code: 'US', name: 'United States' },
  { code: 'KR', name: 'South Korea' },
  { code: 'JP', name: 'Japan' }
];

const flagsPath = 'https://lipis.github.io/flag-icon-css/flags/4x3/';

export class InputPhoneNumberWithCountry extends Component {
  state = {
    value: '',
    ccode: DEFAULT_COUNTRY_CODE,
    formatter: {},
    template: DEFAULT_TEMPLATE
  }

  handleChangePhoneNumber = (value) => {
    const formatter = new asYouType(this.state.ccode);
    formatter.input(value);
    this.setState({ value, formatter, template: formatter.template || DEFAULT_TEMPLATE });
    this.props.onChangeInput({ target: {name: this.props.inputName, value, type: 'input' }})
  }

  handleChangeCode = (e) => {
    this.setState({ ccode: e.target.value },() => {
        this.handleChangePhoneNumber(this.state.value);
    });
    this.phoneInput.focus();
  }

  render(){
    const { selectName, inputName, inputClassName, withFlag, selectClassName } = this.props;
    let container, selectContainer, selectClass;
    if (withFlag) {
      container = 'container-flex';
      selectContainer = 'select-flag-container';
      selectClass = 'select';
    }
    else {
      container = '';
      selectContainer = '';
      selectClass = selectClassName;
    }
    return (
      <div className={container}>
        <div className={selectContainer}>
          <select
            name={selectName}
            className={selectClass}
            value={this.state.ccode}
            onChange={this.handleChangeCode}
          >
            { countryCodes.map(country => (
              <option value={country.code} key={country.code}>{country.name}</option>
            ))}
          </select>
          { withFlag && 
            <div className='flag-container'>
              <img
                className='flag-image'
                src={`${flagsPath}${this.state.ccode.toLowerCase()}.svg`}
              />
              <div className='select-arrow'></div>
            </div>
          }
        </div>
        <ReactInput
          name={inputName}
          className={inputClassName}
          value={ this.state.value }
          onChange={this.handleChangePhoneNumber}
          onBlur={(e) => this.props.onBlurInput({ target: { value: e.target.value, name: inputName }})}
          format={ templateFormatter(this.state.template) }
          parse={ templateParser(this.state.template, parseDigit) }
          ref={input => this.phoneInput = input}
        />
      </div>
    )
  }
}

InputPhoneNumberWithCountry.propTypes = {
  withFlag: PropTypes.bool,
  selectName: PropTypes.string,
  inputName: PropTypes.string,
  selectClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  onChangeInput: PropTypes.func,
  onBlurInput: PropTypes.func,
};

InputPhoneNumberWithCountry.defaultProps = {
  withFlag: false
};