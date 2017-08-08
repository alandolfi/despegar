const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const { pictureType } = require('./picture');
const { locationType } = require('./location');

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
    main_picture: {
        type: pictureType,
        description : "imagenes",
    },
    location : {
      type : locationType,
      description : "ubicacion del hotel"
    }
  })
});

exports.hotelType = hotelType;