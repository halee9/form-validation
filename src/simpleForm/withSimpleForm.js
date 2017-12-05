import React, { Component } from 'react';
import PropTypes from 'prop-types';

export function withSimpleForm(formData) {
  const { formName } = formData;
  return function(WrappedComponent){
    class HOC extends Component {
      render() {
        return 
          <WrappedComponent 
            {...this.props} 
            formName={formName} 
          />;
      }
    }

    return HOC;
  }
}
