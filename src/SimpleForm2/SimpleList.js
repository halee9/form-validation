import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchList, fetchItem } from './firebaseActions';

import { database } from '../config';

const systemName = 'srm';
const currentUser = {
  uid: 'test'
}
const baseRoute = "/lookups";
const formName = "category";

const path = `/${systemName}/${currentUser.uid}${baseRoute}/${formName}`


export class SimpleList extends Component {
  state = {
    items: []
  };
  componentDidMount(){
    fetchList(database, path, snapshot => {
      const items = _.map(snapshot.val(), (item, key) => ({ ...item, id: key }));
      this.setState({ items });
    })
  }

  renderItem = item => {
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

