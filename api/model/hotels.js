const mongo = require("../modules/mongo");
const uuid = require("uuid");
const itemsByPag = 10;
exports.getAll = (pag,city) => {
  return mongo.collection("hotels").then(col => {
    if(pag == 1){
        var result = col.find().limit(100).toArray();
        return result;
    }
  
    //var skip = (pag * itemsByPag);
    //return col.find({ 'location.city.id' : city }).skip(skip).limit(itemsByPag).toArray();
  });
};

exports.getById = id => {
  return mongo.collection("hotels").then(col => {
    return col.findOne({ id });
  });
};
