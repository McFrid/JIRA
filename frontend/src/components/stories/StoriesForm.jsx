import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
} from 'reactstrap';

import LabelInput from '../common/LabelInput';
import LabelDropdown from '../common/LabelDropdown';
import LabelMultiSelect from '../common/LabelMultiSelect';

const StoriesForm = props => (
  <Form>
    <FormGroup>
      <LabelInput
        labelName="Description"
        inputType="text"
        inputName="description"
        inputId="stories-table-description"
        placeholder="Enter user description"
        value={props.description}
        isRequired={true}
        onInputChange={props.onInputChange.bind(this, 'description')}
      />

      {!!props.products.length && (
        <LabelDropdown
          labelName="Product"
          dropdownId="stories-table-product"
          dropdownData={props.products.map(product => ({
            key: product.id,
            value: product.name,
          }))}
          isRequired={true}
          selectedKey={props.product ? props.product.id : null}
          onChange={props.onProductChange}
        />
      )}
    </FormGroup>
  </Form>
);

StoriesForm.propTypes = {
  description: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      authority: PropTypes.string,
      login: PropTypes.string,
    })),
  })),
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      authority: PropTypes.string,
      login: PropTypes.string,
    })),
  }),
  onInputChange: PropTypes.func,
  onProductChange: PropTypes.func,
};

StoriesForm.defaultProps = {
  description: '',
  products: [],
  product: null,
  onInputChange: null,
  onProductChange: null,
};

export default StoriesForm;
