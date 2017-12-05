import React, { Component } from 'react';
import { SimpleForm, SimpleList } from '../simpleForm';

import { Switch, Route, Link } from 'react-router-dom';

export const SimpleFormLayout = (props) => {
  const { path, fields, formName, baseRoute } = props;
  console.log("path: ", path)
  return (
    <Switch>
      <Route exact path={`${baseRoute}/${formName}`} component={(routeProps) => (
        <SimpleList {...props} {...routeProps} />
      )}/>
      <Route path={`${baseRoute}/${formName}/new`} component={(routeProps) => (
        <SimpleForm {...props} {...routeProps} />
      )}/>
      <Route path={`${baseRoute}/${formName}/:id`} component={(routeProps) => (
        <SimpleForm {...props} {...routeProps} />
      )}/>
    </Switch>
  )
};
