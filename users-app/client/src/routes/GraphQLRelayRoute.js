import Relay from 'react-relay';

class GraphQLRelayRoute extends Relay.Route {
  static path = "/";
  static queries = {
    viewer: (Component) => Relay.QL`
      query {
        viewer {
          ${Component.getFragment('viewer')},
        },
      }
    `
  };
  static routeName = "GraphQLRelayRoute";
}

export default GraphQLRelayRoute
