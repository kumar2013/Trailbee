import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} from 'graphql';

import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  mutationWithClientMutationId
} from 'graphql-relay';

import DB from '../database/db.js'


const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'User') {
      return DB.models.user.findById(id);
    }
    return null;
  },
  (obj) => {
    return userType;
  }
);

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user',
  fields: () => {
    return {
      id: globalIdField('User'),
      name: {
        type: GraphQLString,
        resolve: (user) => user.name
      },
      age: {
        type: GraphQLInt,
        resolve: (user) => user.age 
      },
      email: {
        type: GraphQLString,
        resolve: (user) => user.email
      },
      address: {
        type: GraphQLString,
        resolve: (user) => user.address
      }
    };
  },
  interfaces: [nodeInterface]
});

const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
  name: 'User',
  nodeType: userType
});

const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => {
    return {
      id: globalIdField(),
      userRelay: {
        type: UserConnection,
        args: connectionArgs,
        resolve: (root, args) => {
          return connectionFromPromisedArray(DB.models.user.findAll(), args);
        }
      },
      user: {
        type: userType,
        resolve: (root, args) => {
          return DB.models.user.findOne({where: args});
        }
      },
      usersList: {
        type: new GraphQLList(userType),
        args: {
          name: {
            type: GraphQLString
          },
          age: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          },
          address: {
            type: GraphQLString
          }
        },
        resolve: (root, args) => {
          return DB.models.user.findAll({where: args});
        }
      } 
    };
  },
  interfaces: [nodeInterface]
});

const queryType = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'This is a root query',
  fields: () => {
    return {
      viewer: {
        type: Viewer,
        resolve: () => ({})
      },
      node: nodeField
    }
  }
});

const addUserMutation = mutationWithClientMutationId({
  name: 'AddUser',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    viewer: {
      type: Viewer,
      resolve: () => ({})
    },
    userEdge: {
      type: UserEdge,
      resolve: ({ user }) => {
        return {
          cursor: cursorForObjectInConnection(DB.models.user.findById(user.id)),
          node: user
        };
      }
    }
  },
  mutateAndGetPayload: ({ name, age, email, address }) => {
    return DB.models.user.create({
      name: name,
      age: age,
      email: email,
      address: address
    })
    .then((newUser) => newUser);
  }
});

const removeUserMutation = mutationWithClientMutationId({
  name: 'RemoveUser',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    viewer: {
      type: Viewer,
      resolve: () => ({})
    },
    deletedId: {
      type: GraphQLID,
      resolve: ({ id }) => id
    }
  },
  mutateAndGetPayload: ({ id }) => {
    const { id: userId } = fromGlobalId(id);
    return DB.models.user.destroy({
      where: { id: userId }
    })
    .then(() => {
      return { id };
    });
  }
});

const editUserMutation = mutationWithClientMutationId({
  name: 'EditUser',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    viewer: {
      type: Viewer,
      resolve: () => ({})
    },
    user: {
      type: userType,
      resolve: ({ id }) => DB.models.user.findOne({where: {id: id}})
    }
  },
  mutateAndGetPayload: ({ id, name, age, email, address }) => {
    const { id: userId } = fromGlobalId(id);
    return DB.models.user.update({
      name: name,
      age: age,
      email: email,
      address: address
    }, {
      where: {id: userId}
    })
    .then(() => {
      return { userId };
    });
  }
});

const mutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addUser: addUserMutation,
    removeUser: removeUserMutation,
    editUser: editUserMutation
  }
});
  
const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
  
export default Schema
