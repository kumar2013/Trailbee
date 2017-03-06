import Relay from 'react-relay';

class EditUserMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ editUser }`;
  }
  
  getVariables() {
    return {
      id: this.props.user.id,
      name: this.props.user.name,
      age: this.props.user.age,
      email: this.props.user.email,
      address: this.props.user.address
    };
  }
  
  getFatQuery() {
    return Relay.QL`
      fragment on EditUserPayload {
        viewer
        user {
          name
          age
          email
          address
        }
      }
    `;
  }
  
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id,
        viewer: this.props.viewer.id
      }
    }];
  }
  
  getOptimisticResponse() {
    return {
      viewer: this.props.viewer.id,
      user: {
        id: this.props.user.id,
        name: this.props.user.name,
        age: this.props.user.age,
        email: this.props.user.email,
        address: this.props.user.address
      }
    };
  }
}

export default EditUserMutation
