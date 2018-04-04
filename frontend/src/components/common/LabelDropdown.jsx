import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';

class LabelDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.onToggle = this.onToggle.bind(this);

    this.state = {
      isDropdownOpened: false,
    };
  }

  onToggle() {
    this.setState({
      isDropdownOpened: !this.state.isDropdownOpened,
    });
  }

  render() {
    const selectedValue = this.props.dropdownData
      .find(pair => pair.key === this.props.selectedKey)
      .value;

    return (
      <FormGroup>
        <Label for={this.props.dropdownId}>{this.props.labelName}</Label>
        <Dropdown
          isOpen={this.state.isDropdownOpened}
          toggle={this.onToggle}
        >
          <DropdownToggle caret>
            {selectedValue}
          </DropdownToggle>
          <DropdownMenu>
            {this.props.dropdownData.map(pair => (
              <DropdownItem
                id={pair.key}
                key={pair.key}
                onClick={this.props.onChange}
              >
                {pair.value}
              </DropdownItem>))}
          </DropdownMenu>
        </Dropdown>
      </FormGroup>
    );
  }
}

LabelDropdown.propTypes = {
  dropdownId: PropTypes.string,
  labelName: PropTypes.string,
  dropdownData: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  })),
  selectedKey: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
};

LabelDropdown.defaultProps = {
  dropdownId: '',
  labelName: '',
  dropdownData: [],
  selectedKey: 0,
  onChange: null,
};

export default LabelDropdown;

