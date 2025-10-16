import { ApolloServer } from 'apollo-server';
import { typeDefs as userTypeDefs, resolvers as userResolvers } from './schema/userSchema.js';
import { typeDefs as authTypeDefs, resolvers as authResolvers } from './schema/authSchema.js';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const typeDefs = mergeTypeDefs([userTypeDefs, authTypeDefs]);
const resolvers = mergeResolvers([userResolvers, authResolvers]);

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 GraphQL Gateway ready at ${url}`);
});
