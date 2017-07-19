const mongodb = require("mongodb"), client = mongodb.MongoClient;
const user = 'malandolfi';//process.env.DBUSER;
const psw = 'Agml1402';//process.env.DBPSW;
const connectionString = `mongodb://${user}:${psw}@ds135519.mlab.com:35519/despegar`;
const path = require("path");
const rp = require('request-promise');

let promise;
let db;
let options = {
    method: 'GET',
    uri: 'https://api.despegar.com/v3/hotels',
    qs: {
        offset: 50000,
        limit:  1000
    },
    headers: {
        'User-Agent': 'Request-Promise',
        'X-ApiKey': '9b5c64a0f58c44fd999df79202b136a4',
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/json; charset=UTF-8'
    },
    gzip: true // Automatically parses the JSON string in the response 
};


const dbConnector = connectionString => {
  if (promise) {
    return promise;
  }
  console.log(`Mongo connect: ${connectionString}`);
  promise = client.connect(connectionString).then(function (database) {
    db = database;
    return db;
  });

  return promise;
};

const collection = name => {
  return dbConnector(connectionString).then(db => db.collection(name));
};

const init = () => {
  return rp(options).then(res => {
    collection("hotels")
    .then(coll => {
      col = coll;
      return col.find().toArray();
    })
    .then(elementsDB => {
      if (!elementsDB.length) {
        console.log(`MongoDB collection (Hoteles) not found, import...`);
        return col.insert(JSON.parse(res));
      }
      console.log(`MongoDB collection (Hoteles) found...`);
      return Promise.resolve();
    });
  })  
}

exports.dbConnector = dbConnector;
exports.collection = collection;
exports.init = init;
