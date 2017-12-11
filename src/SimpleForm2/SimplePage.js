import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import _ from 'lodash';

import { fetchList } from '../ReactFormValidation/firebaseActions';
import { withFirebaseCRUD } from '../ReactFormValidation';

import { database } from '../config';

import {
  required, minLength, maxLength, number
} from '../ReactFormValidation/rules';

const systemName = 'srm';
const currentUser = {
  uid: 'test'
}
const baseRoute = "/lookups";
const formName = "category";

const firebasePath = `/${systemName}/${currentUser.uid}${baseRoute}/${formName}`;
const rules = {
  name: [required(), maxLength(30)()],
  abbr: [required(), maxLength(10)()],
}

export const SimplePage = ({ match }) => (
  <div>
    <SimpleList />
    <Route exact path={`${match.url}/new`} component={SimpleForm}/>
    <Route path={`${match.url}/:id`} component={SimpleForm}/>
  </div>
);

class SimpleList extends Component {
  state = {
    items: []
  };
  
  componentDidMount(){
    fetchList(database, firebasePath, snapshot => {
      const items = _.map(snapshot.val(), (item, key) => ({ ...item, id: key }));
      this.setState({ items });
    })
  }

  renderItem = item => {
    const { match } = this.props;
    return (
      <Link 
        to={`/simplePage/${item.id}`} 
        className="list-group-item" 
        key={item.id}>
        {item.name}
      </Link>
    )
  }

  render() {
    const { match } = this.props;
    console.log(match)
    return (
      <div>
        <Link to={`/simplePage/new`} className="btn btn-default">New</Link>
        <br/><br/>
        <div className="list-group">
          { this.state.items.map(this.renderItem) }
        </div>
      </div>
    )
  }
}

class SimpleFormInner extends Component {
  render(){
    const { handleChange, handleBlur, values, errors, validForm, handleClickRemove } = this.props;
    const buttonText = values.id ? "Update" : "Submit";
    const deleteButton = values.id ? 
      <button type="button" className="btn btn-warning" onClick={handleClickRemove}>Delete</button>
      : '';
    return (
      <form onSubmit={this.props.handleSubmitFirebaseCRUD}>
        <div className="form-group">
          <label>Name: </label>
          <input
            name='name'
            className='form-control'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name || ''}
          />
          <div className='text-danger'>{errors.name}</div>          
        </div>
        <div className="form-group">
          <label>Abbreviation: </label>
          <input
            name='abbr'
            className='form-control'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.abbr || ''}
          />
          <div className='text-danger'>{errors.abbr}</div>          
        </div>
        <div className="text-center">
          { deleteButton }{' '}
          <button type="submit" className="btn btn-primary" disabled={!validForm}>{buttonText}</button>
        </div>
        <br /><br />
        <div><pre>{JSON.stringify(this.props, null, 2) }</pre></div>
      </form> 
      
    )
  }
}

const args = { database, firebasePath, urlBackTo: '/simplePage', rules };

export const SimpleForm = withFirebaseCRUD(args)(SimpleFormInner);
