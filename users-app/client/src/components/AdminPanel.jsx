import React from 'react';
import Relay from 'react-relay';

import NavBar from './NavBar';
import NewUser from './NewUser';
import UsersList from './UsersList';

import AddUserMutation from '../mutations/AddUserMutation';

class AdminPanel extends React.Component {
  constructor () {
    super();
  }
  
  render() {
    const viewer = this.props.viewer;
    const users = this.props.viewer.usersList;
    
    return(
      <div>
        <NavBar />
        <div className="container">
          <NewUser viewer={viewer}/>
          <UsersList users={users} viewer={viewer}/>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(AdminPanel, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        usersList {
          ${UsersList.getFragment('users')}
        }
      }
    `
  }
});
  