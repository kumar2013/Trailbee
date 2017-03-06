import Relay from 'react-relay';

class RemoveUserMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ removeUser }`;
  }
  
  getVariables() {
    return {
      id: this.props.user.__dataID__
    };
  }
  
  getFatQuery() {
    return Relay.QL`
      fragment on RemoveUserPayload {
        viewer {
          usersList
        }
        deletedId
      }
    `;
  }
  
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'userRelay',
      deletedIDFieldName: 'deletedId',
    }];
  }
  
  getOptimisticResponse() {
    const { viewer, user } = this.props;
    const viewerPayload = { id: viewer.id };

    return {
      viewer: viewerPayload,
      deletedId: user.__dataID__
    };
  }  
}

export default RemoveUserMutation
