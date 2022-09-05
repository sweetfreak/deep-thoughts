const express = require('express');
//import apollo server:
const {ApolloServer} = require('apollo-server-express');

//import our typedefs and resolvers:
const {typeDefs, resolvers} = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
//create a new Apollog server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  //integrate out Apollo server with the Express app as middleware
  server.applyMiddleware({app});

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      //log where we can go to test out GQL API:
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};


//Call the async function to start the server
startApolloServer(typeDefs, resolvers);

