import Relay from 'react-relay';

class AddUserMutation extends Relay.Mutation {   
  getMutation() {
    return Relay.QL `
      mutation {
        addUser
      }
    `;
  }
  
  getVariables() {
    return {
      name: this.props.user.name,
      age: this.props.user.age,
      email: this.props.user.email,
      address: this.props.user.address
    };
  }
  
  getFatQuery() {
    return Relay.QL `
      fragment on AddUserPayload @relay(pattern: true) {
        viewer {
          usersList
        }
        userEdge
      }
    `;
  }
  
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'userRelay',
      edgeName: 'UserEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
  }
  
  getOptimisticResponse() {
    return {
      user: this.props.user
    };
  }
}

export default AddUserMutation
