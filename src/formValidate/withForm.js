import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const onSubmit = form => {
  return { type: "onsubmit", payload: form }
};

const onChange = value => {
  return { type: "onchange", payload: value }
};

const onLoad = data => {
  return { type: "onload", payload: data }
};

const onLoadField = data => {
  return { type: "onloadField", payload: data }
};

const fetchData = (formName, data) => {
  return { type: "fetchData", payload: {formName, data }}
};

export function withForm(formData) {
  const { formName, validate, remoteValidate } = formData;
  
  return function(WrappedComponent){
    const mapStateToProps = state => ({form: state.forms[formName]});
    const mapDispatchToProps = (dispatch) => ({
      onSubmit: value => dispatch(onSubmit(value)),
      onChange: value => dispatch(onChange(value)),
      onLoad: value => dispatch(onLoad(value)),
      onLoadField: value => dispatch(onLoadField(value)),
      fetchData: value => dispatch(fetchData(formName, value)),
    })
  
    class HOC extends Component {
      getChildContext() {
        return { formName, form: this.props.form, onChange: this.props.onChange, onLoadField: this.props.onLoadField };
      }
      handleSubmit = () => {
        this.props.onSubmit({ formName });
      }
      handleFetchData = (data) => {
        console.log("handleFetchData: ", data)
        this.props.fetchData(data);
      }
      
      componentWillMount(){
        this.props.onLoad({ formName, validate, remoteValidate });
      }
      render() {
        return <WrappedComponent 
          formName={formName} 
          validate={validate} 
          handleSubmit={this.handleSubmit}
          handleFetchData={this.handleFetchData}
          validForm={this.props.form && this.props.form.validForm}
          errors={this.props.form && this.props.form.errors}
          values={this.props.form && this.props.form.values}
          {...this.props} 
        />;
      }
    }

    HOC.childContextTypes = {
      formName: PropTypes.string,
      form: PropTypes.object,
      onChange: PropTypes.func,
      onLoadField: PropTypes.func,
    };

    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(HOC);
  }
}
