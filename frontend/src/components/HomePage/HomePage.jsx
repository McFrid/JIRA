import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';

import LabelDropdown from '../../components/common/LabelDropdown';

import request from '../../utils/request';
import account from '../../utils/account';

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding-top: 100px;
  justify-content: space-around;
`;

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: 'pdf',
      solutions: 'pdf',
      users: 'pdf',
      contributions: 'pdf',
      resolved: 'pdf',
    };
  }

  onFormatChange(name, event) {
    this.setState({
      [name]: event.target.id,
    });
  }

  render() {
    const download = (name, url) => (
      <Button
        onClick={() => request.get(url, {
          format: this.state[name],
        })}
      >
        Download
      </Button>
    );

    const selectFormat = (name, label, url) => (
      <div>

        <h2>{label}</h2><br />

        <LabelDropdown
          labelName="Document Format"
          dropdownId={`document-${name}`}
          dropdownData={['pdf', 'csv', 'xls'].map(story => ({
            key: story,
            value: story.toUpperCase(),
          }))}
          selectedKey={this.state[name]}
          onChange={this.onFormatChange.bind(this, name)}
        />

        {download(name, url)}
      </div>
    );

    return (
      <Wrapper>
        {selectFormat('products', 'Products Statistics', '/products/statistics')}
        {selectFormat('solutions', 'Solutions Statistics', '/solutions/statistics')}
        {selectFormat('users', 'Users Statistics', '/users/statistics')}
        {selectFormat('contributions', 'Contributions', `/users/${account.getAccountUsername()}/contributions`)}
        {selectFormat('resolved', 'Resolved', `/users/${account.getAccountUsername()}/resolved`)}
      </Wrapper>
    );
  }
}

export default HomePage;
