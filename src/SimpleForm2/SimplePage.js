import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { SimpleList } from './SimpleList';
import { SimpleForm } from './SimpleForm';

export const SimplePage = ({ match }) => (
  <div>
    <SimpleList />
    <Route exact path={`${match.url}/new`} component={SimpleForm}/>
    <Route path={`${match.url}/:id`} component={SimpleForm}/>
    <Route exact path={match.url} />
  </div>
);

