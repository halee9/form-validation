import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchList, fetchItem } from './firebaseActions';

export class SimpleList extends Component {
  state = {
    items: []
  };
  componentDidMount(){
    const { database, path } = this.props;
    fetchList(database, path, snapshot => {
      const items = _.map(snapshot.val(), (item, key) => ({ ...item, id: key }));
      this.setState({ items });
    })
  }

  renderItem = item => {
    const { baseRoute, formName } = this.props;
    return (
      <Link to={`${baseRoute}/${formName}/${item.id}`} className="list-group-item" key={item.id}>
        {item.name}
      </Link>
    )
  }

  render() {
    const { menus, baseRoute, formName } = this.props;
    return (
      <div>
        <Link to={`${baseRoute}/${formName}/new`} className="btn btn-default">New</Link>
        <br/><br/>
        <div className="list-group">
          { this.state.items.map(this.renderItem) }
        </div>
      </div>
    )
  }
}

