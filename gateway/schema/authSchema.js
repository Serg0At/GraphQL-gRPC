import { gql } from 'apollo-server';
import userClient from '../../services/user/client.js';

export const typeDefs = gql`
  type LoginResponse {
    success: Boolean
    message: String
    token: String
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse
  }
`;

export const resolvers = {
  Mutation: {
    login: (_, { email, password }) => {
      return new Promise((resolve, reject) => {
        userClient.LoginThroughAuth({ email, password }, (err, response) => {
          if (err) reject(err);
          else resolve(response);
        });
      });
    }
  }
};
