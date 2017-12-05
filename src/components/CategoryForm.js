import React, { Component } from 'react';
import { SimpleFormLayout } from '../simpleForm';
import { database } from '../config';
import {
  required, minLength, maxLength, number
} from '../validate';

const systemName = 'srm';
const currentUser = {
  uid: 'test'
}
const baseRoute = "/lookups";
const formName = "category";

const path = `/${systemName}/${currentUser.uid}${baseRoute}/${formName}`

const fields = [
  { label: "Name: ", name: "name", rules: [required] },
  { label: "Abbreviation: ", name: "abbr", rules: [required] },
]

const CategoryForm = () => (
  <div>
    <h3>Category Management</h3>
    <hr />
    <SimpleFormLayout
      baseRoute={baseRoute}
      formName={formName}
      path={path}
      fields={fields}
      database={database}
    >
    </SimpleFormLayout>
  </div>
);

export default CategoryForm;