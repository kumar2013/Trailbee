import React from 'react';
import Relay from 'react-relay';

import UserItem from './UserItem';

class UsersList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  filterUsers() {
    const users = this.state.users;
    let filteredUsers = users.filter((user) => user.age >= 30);
    //TODO finish the filter user
  }
  
  checkboxChange(e) {
    const showUserAboveAge30 = e.target.checked;
    if (showUserAboveAge30) {
      this.filterUsers();
    }
  }
  
  render() {
    let users = this.props.users.map(
      (user, index) => <UserItem index={index} user={user} viewer={this.props.viewer}/>
    );
      
    return (
      <div className="row" id="tb_users_table">
        <div className="col-lg-8 col-lg-offset-2">
          <div className="panel panel-default">
            <div className="panel-heading">
              <span>
                <h3 className="panel-title">
                  Users Admin Panel
                </h3>
              </span>
              <span className="tb-checkbox-span">
                <div className="checkbox">
                  <label>
                    <input type="checkbox" onChange={this.checkboxChange.bind(this)} /> Show users above age 30
                  </label>
                </div>
              </span>
            </div>
            <div className="panel-body">
              <table className="table table-responsive table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(UsersList, {
  fragments: {
    users: () => Relay.QL`
      fragment on User @relay(plural: true) {
        ${UserItem.getFragment('user')}
      }
    `
  }
});
  