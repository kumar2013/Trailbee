import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import AdminPanel from './src/components/AdminPanel';
import GraphQLRelayRoute from './src/routes/GraphQLRelayRoute';


Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:8000/graphql')
);

ReactDOM.render(
  <Relay.RootContainer Component={AdminPanel} route={new GraphQLRelayRoute()} forceFetch={true} />, document.getElementById('app')
);