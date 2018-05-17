import React from 'react';
import { Button } from 'reactstrap';

import LabelDropdown from '../../components/common/LabelDropdown';

import account from '../../utils/account';
import auth from '../../utils/auth';

import './HomePage.css';

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
        color="success"
        onClick={() => {
          const headers = new Headers();
          headers.append('Authorization', `Bearer ${auth.getAccessToken()}`);
          fetch(`http://localhost:8080/api${url}?format=${this.state[name]}`, {
            headers,
          })
            .then(response => response.blob())
            .then(blob => {
              const objectUrl = URL.createObjectURL(blob);
              window.open(objectUrl);
            });
        }}
      >
        Download
      </Button>
    );

    const selectFormat = (name, label, url) => (
      <div className="home-container__document">

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
      <div className="home-container">
        {selectFormat('products', 'Products Statistics', '/products/statistics')}
        {selectFormat('solutions', 'Solutions Statistics', '/solutions/statistics')}
        {selectFormat('users', 'Users Statistics', '/users/statistics')}
        {selectFormat('contributions', 'Contributions', `/users/${account.getAccountUsername()}/contributions`)}
        {selectFormat('resolved', 'Resolved', `/users/${account.getAccountUsername()}/resolved`)}
      </div>
    );
  }
}

export default HomePage;
