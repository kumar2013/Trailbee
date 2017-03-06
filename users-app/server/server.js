import express from 'express';
import expressGraphQL from 'express-graphql';
import cors from 'cors';

import Schema from './schema/schema.js';

const server = express();

server.use(cors());

server.use("/graphql", [
  expressGraphQL({
    schema: Schema,
    pretty: true,
    graphiql: true
  })
]);

server.listen(8000, () =>
  console.log('GraphQL server is listening at http://localhost:8000')
);



