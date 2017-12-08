import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export function withAuth(WrappedComponent) {
  
  class authHOC extends Component {
    static contextTypes = {
      router: PropTypes.object
    }
    componentWillMount() {
      console.log(this.context)
      if (!this.props.auth.user) {
        this.context.router.history.push('/login');
      }
    }
    componentWillUpdate(nextProps) {
      if (!this.props.auth.user) {
        this.context.router.history.push('/login');
      }
    }
    render(){
      return (
        <WrappedComponent
          { ...this.props }
        />
      );
    }
  }

  const mapStateToProps = ({ auth }) => ({ auth });
  return connect(mapStateToProps)(authHOC);
}
