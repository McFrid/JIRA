import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
} from 'reactstrap';

import LabelInput from '../common/LabelInput';
import LabelDropdown from '../common/LabelDropdown';
import LabelMultiSelect from '../common/LabelMultiSelect';

const ProductsForm = props => (
  <Form>
    <FormGroup>
      <LabelInput
        labelName="Name"
        inputType="text"
        inputName="name"
        inputId="products-table-name"
        placeholder="Enter user name"
        value={props.name}
        onInputChange={props.onInputChange.bind(this, 'name')}
      />

      {!!props.developers.length && (
        <LabelMultiSelect
          labelName="Developers"
          inputName="developers"
          inputId="products-table-developers"
          options={props.developers.map(developer => ({
            key: developer.id,
            value: `${developer.firstName} ${developer.lastName}`,
          }))}
          value={props.currentDevelopers.map(developer => developer.id)}
          onOptionClick={props.onDevelopersChange}
        />
      )}

      {!!props.customers.length && (
        <LabelDropdown
          labelName="Customer"
          dropdownId="products-table-customer"
          dropdownData={props.customers.map(customer => ({
            key: customer.id,
            value: `${customer.firstName} ${customer.lastName}`,
          }))}
          selectedKey={props.currentCustomer ? props.currentCustomer.id : null}
          onChange={props.onCustomerChange}
        />
      )}
    </FormGroup>
  </Form>
);

ProductsForm.propTypes = {
  name: PropTypes.string,
  developers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    authority: PropTypes.string,
    login: PropTypes.string,
  })),
  currentDevelopers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    authority: PropTypes.string,
    login: PropTypes.string,
  })),
  customers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    authority: PropTypes.string,
    login: PropTypes.string,
  })),
  currentCustomer: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    authority: PropTypes.string,
    login: PropTypes.string,
  }),
  onInputChange: PropTypes.func,
  onDevelopersChange: PropTypes.func,
  onCustomerChange: PropTypes.func,
};

ProductsForm.defaultProps = {
  name: '',
  developers: [],
  currentDevelopers: [],
  customers: [],
  currentCustomer: null,
  onInputChange: null,
  onDevelopersChange: null,
  onCustomerChange: null,
};

export default ProductsForm;
