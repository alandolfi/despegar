const mongo = require("../modules/mongo");
const uuid = require("uuid");

exports.getAll = () => {
  console.log("entre");
  return mongo.collection("hotels").then(col => {
    return col.find().toArray();
  });
};

exports.getById = id => {
  return mongo.collection("hotels").then(col => {
    return col.findOne({ id });
  });
};
