const mongo = require("../modules/mongo");
const uuid = require("uuid");


exports.add = like => {
  return mongo.collection("hotelslike").then(col => {
    like.id = uuid.v4();
    return col.insert(like);
  });
};

exports.update = like => {
  return mongo.collection("hotelslike").then(col => {
    return col.findOneAndUpdate({ hotelId: like.hotelId }, like);
  });
};
