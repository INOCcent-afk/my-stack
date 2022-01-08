import { GraphQLClient } from "graphql-request";

const graphqlRequestClient = new GraphQLClient("http://localhost:4000/graphql");

export default graphqlRequestClient;
