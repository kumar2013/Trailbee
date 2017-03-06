import React from 'react';
import Relay from 'react-relay';

import RemoveUserMutation from '../mutations/RemoveUserMutation';

import EditUserModal from './EditUserModal';

class UserItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  removeUser() {
    const user = this.props.user;
    const viewer = this.props.viewer;
    
    Relay.Store.commitUpdate(new RemoveUserMutation({viewer, user}));
  }
  
  render() {
    const user = this.props.user;
    const viewer = this.props.viewer;
    const index = this.props.index + 1;
    const userDataId = user.__dataID__;
    const targetId = 'tb_edit_user_modal_' + userDataId.replace(/[^A-Za-z0-9]/g, '');
    const targetIdRef = '#' + targetId;
    
    return(
      <tr>
        <td>{index}</td>
        <td>{user.name}</td>
        <td>{user.age}</td>
        <td>{user.email}</td>
        <td>{user.address}</td>
        <td>
          <span className="btn btn-default btn-sm glyphicon glyphicon-pencil" data-target={targetIdRef} data-toggle="modal"></span>
          <span className="btn btn-default btn-sm glyphicon glyphicon-trash" onClick={this.removeUser.bind(this)}></span>
          <EditUserModal user={this.props.user} modalId={targetId} viewer={viewer}/>
        </td>
      </tr>
    );
  }
}

export default Relay.createContainer(UserItem, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name
        age
        email
        address
      }
    `
  }
});
