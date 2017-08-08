const mongo = require("../modules/mongo");
const uuid = require("uuid");
const itemsByPag = 10;
exports.getAll = (pag) => {
  return mongo.collection("hotels").then(col => {
    if(pag == 1){
        return col.find().limit(itemsByPag -1).toArray();
    }
  
    var skip = (pag * itemsByPag);
    var totalItems = (pag * itemsByPag) - 1;
    return col.find().skip(skip).limit(totalItems).toArray();
  });
};

exports.getById = id => {
  return mongo.collection("hotels").then(col => {
    return col.findOne({ id });
  });
};
