const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');


const locationType = new GraphQLObjectType({
  name: 'Location',
  description: 'Representa la ubicacion del hotel',
  fields: () => ({
    address: {
      type: GraphQLString,
      description: 'direccion'
    },
    zipcode: {
      type: GraphQLString,
      description: 'zip code'
    },
    city: {
      type: GraphQLString,
      resolve(obj) {
          console.log(obj);
          return obj.city.id
      }
    },
  })
});

exports.locationType = locationType;