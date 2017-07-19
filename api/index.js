const express = require("express");
const app = express();
const routesCategories = require("./routes/categories");
const routesHotels = require("./routes/hotels");
const bodyParser = require("body-parser");
const errorHandler = require("./modules/error-handler");
const mongo = require("./modules/mongo");
const logBody = require("./modules/log-body");

app.use(bodyParser.json());
app.use(logBody);
app.use("/categories", routesCategories);
app.use("/hotels", routesHotels);
app.use(errorHandler);

mongo.init().then(res => {  
  app.listen(4001, () => console.log("Example app listening on port 4001!")); 
}).catch((error) =>{
    console.log(error)
});