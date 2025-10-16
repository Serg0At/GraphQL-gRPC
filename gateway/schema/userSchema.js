import { gql } from 'apollo-server';
import userClient from '../../services/user/client.js';

export const typeDefs = gql`
  type User {
    id: Int
    name: String
    email: String
  }

  type Query {
    getUser(id: Int!): User
  }
`;

export const resolvers = {
  Query: {
    getUser: (_, { id }) => {
      return new Promise((resolve, reject) => {
        userClient.GetUser({ id }, (err, response) => {
          if (err) reject(err);
          else resolve(response);
        });
      });
    }
  }
};
