import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMenus, fetchLookUps } from '../actions/menu';

class MenuList extends Component {
  componentDidMount(){
    this.props.fetchLookUps();
    this.props.fetchMenus();
  }
  renderMenu = (menu) => {
    const { id, name, price, description, category, cookingType, ingredients } = menu;
    const { lookups } = this.props;
    // console.log(this.props)
    return (
      <Link to={`/menus/${id}`} key={id} className="list-group-item">
        <div className="clearfix">
          <strong>
            { name }
            <div className="pull-right">{ price }</div>
          </strong>
        </div>
        <div>{ description }</div>
        <div>
          { lookups.category[category].name }{' '}
          { lookups.cookingType[cookingType].name }{' '}
        </div>
        <div>
          { ingredients && ingredients.map(ingredient => lookups.ingredients[ingredient].name).join(",") }
        </div>
      </Link>
    )
  }
  render() {
    const { menus } = this.props;
    return (
      <div>
        <h3>Menu List</h3>
        <div className="clearfix">
          <Link to="/new" className="pull-right">New</Link>
        </div>
        <div className="list-group">
          { _.map(menus, (menu, key) => this.renderMenu({ ...menu, id: key })) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ menus, lookups }) => {
  return { menus, lookups };
};

export default connect(mapStateToProps, { fetchMenus, fetchLookUps })(MenuList);