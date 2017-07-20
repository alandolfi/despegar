const express = require("express");
const app = express();
const routesHotels = require("./routes/hotels");
const routesLikes = require("./routes/likes");
const bodyParser = require("body-parser");
const errorHandler = require("./modules/error-handler");
const mongo = require("./modules/mongo");
const logBody = require("./modules/log-body");

app.use(bodyParser.json());
app.use(logBody);
app.use("/hotels", routesHotels);
app.use("/likes", routesLikes);
app.use(errorHandler);

mongo.init().then(res => {  
  app.listen(4001, () => console.log("Example app listening on port 4001!")); 
}).catch((error) =>{
    console.log(error)
});