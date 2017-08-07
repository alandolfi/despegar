const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const model = require('../../model');

const hotelType = new GraphQLObjectType({
  name: 'Hotel',
  description: 'Representa un hotels',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'El id del hotel'
    },
    name: {
      type: GraphQLString,
      description: 'El nombre del Hotel'
    },
    stars: {
      type: GraphQLInt,
      description: 'Cantidad estrella de un hotel.'
    },
    location: {
        type: GraphQLString,
        description : "ubicacion del hotel"
    }
  })
});

exports.hotelType = hotelType;