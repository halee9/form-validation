import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMenus } from '../actions/menu';

class MenuList extends Component {
  componentDidMount(){
    this.props.fetchMenus();
  }
  renderMenu = (menu) => {
    return (
      <li key={menu.id}>
        <Link to={`/menus/${menu.id}`}>{ menu.name }</Link>
      </li>
    )
  }
  render() {
    const { menus } = this.props;
    return (
      <div>
        <h3>Menu List</h3>
        <Link to="/new">New</Link>
        <ul>
          { _.map(menus, (menu, key) => this.renderMenu({ ...menu, id: key })) }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ menus }) => {
  return { menus };
};

export default connect(mapStateToProps, { fetchMenus })(MenuList);