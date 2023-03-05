import {buildSubgraphSchema} from "@apollo/subgraph";
import {ApolloServer, ContextFunction} from "@apollo/server";
import {
  startStandaloneServer,
} from "@apollo/server/standalone";

const port = process.env.PORT ?? "4000";
const subgraphName = require("../package.json").name;
import {userModule} from "./schema";
import {UserAPI} from "./datasources/user";
const mongoose = require("mongoose");



async function main() {

  mongoose.connect(`mongodb+srv://varshant:${process.env.MONGO_CONF_PASSWORD}@cluster0.rcdu4.mongodb.net/conf-ai`, {poolSize: 10});
  var db = mongoose.connection;
  db.on("error", function () {console.log('Mongo error');});
  db.on('connected', function () {console.log('MongoDB Connected');});
  db.on('disconnected', function () {console.log('MongoDB Disconnected');});

  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  const server = new ApolloServer({
    schema: buildSubgraphSchema([userModule]),
  });
  const {url} = await startStandaloneServer(server, {
    context: async () => ({dataSources: {userAPI: new UserAPI()}}),
    listen: {port: Number.parseInt(port)},
  });

  console.log(`🚀  Subgraph ${subgraphName} ready at ${url}`);
  console.log(`Run 'rover dev --url ${url} --name ${subgraphName}`);
}

main();
