const mongo = require("../modules/mongo");
const uuid = require("uuid");


exports.add = like => {
  return mongo.collection("hotelslike").then(col => {
    like.id = uuid.v4();
    like.countLike = 1;
    return col.insert(like);
  });
};

exports.update = like => {
  return mongo.collection("hotelslike").then(col => {
    return col.findOneAndUpdate({ hotelId: like.hotelId }, like);
  });
};

exports.getById = like => {
  return mongo.collection("hotelslike").then(col => {
    return col.findOne({ hotelId: like.hotelId });
  });
};
