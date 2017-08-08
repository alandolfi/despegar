const mongo = require("../modules/mongo");
const uuid = require("uuid");
const itemsByPag = 10;
exports.getAll = (pag) => {
  return mongo.collection("hotels").then(col => {
    if(pag == 1){
       //{ 'location.city.id' : city }
        var result = col.find().limit(100).toArray();
        return result;
    }
  
    var skip = (pag * itemsByPag);
    return col.find().skip(skip).limit(itemsByPag).toArray();
  });
};

exports.getById = id => {
  return mongo.collection("hotels").then(col => {
    return col.findOne({ id });
  });
};
