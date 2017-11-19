import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { onChange, onSubmit } from '../actions/formAction';

const onSubmit = form => {
  return { type: "onsubmit", payload: form }
};

const onChange = value => {
  return { type: "onchange", payload: value }
};

const onLoad = data => {
  return { type: "onload", payload: data }
};

export default function withForm(formData) {
  const { formName, validate, remoteValidate } = formData;
  
  return function(WrappedComponent){
    const mapStateToProps = state => ({form: state.forms[formName]});
    const mapDispatchToProps = (dispatch) => ({
      onSubmit: value => dispatch(onSubmit(value)),
      onChange: value => dispatch(onChange(value)),
      onLoad: value => dispatch(onLoad(value)),
    })
  
    class HOC extends Component {
      getChildContext() {
        // console.log("hoc form: ", this.props.form)
        return { formName: formName, form: this.props.form, onChange: this.props.onChange };
      }
      handleSubmit = (e) => {
        if (e.preventDefault) e.preventDefault();
        this.props.onSubmit({ formName });
      }
      
      componentDidMount(){
        this.props.onLoad({ formName, validate, remoteValidate });
      }
      render() {
        return <WrappedComponent 
          formName={formName} 
          validate={validate} 
          handleSubmit={this.handleSubmit}
          pristine={this.props.form && this.props.form.pristine}
          {...this.props} 
        />;
      }
    }

    HOC.childContextTypes = {
      formName: PropTypes.string,
      form: PropTypes.object,
      onChange: PropTypes.func,
    };

    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(HOC);
  }
}
