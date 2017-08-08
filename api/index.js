const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./modules/error-handler");
const mongo = require("./modules/mongo");
const logBody = require("./modules/log-body");
const schema = require('./schema');
const graphqlHTTP = require('express-graphql');
const model = require('./model');
const routesHotels = require("./routes/hotels");
const routesLikes = require("./routes/likes");
const app = express();

const queryResolver = {
  hotels: () => model.hotels.getAll()
};

app.use(bodyParser.json());
app.use(logBody);
app.use("/hotels", routesHotels);
app.use("/likes", routesLikes);
/*app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: queryResolver,
    graphiql: true
  })
)*/
app.use(errorHandler);

mongo.init().then(res => {  
  app.listen(4001, () => console.log("Running a GraphQL API server at localhost:4001/graphql")); 
}).catch((error) =>{
    console.log(error)
});