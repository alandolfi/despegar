const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');


const pictureType = new GraphQLObjectType({
  name: 'Image',
  description: 'Representa la imagen del hotel',
  fields: () => ({
    url: {
      type: GraphQLString,
      description: 'url en donde se encuentra la imange'
    },
    id: {
      type: GraphQLString,
      description: 'id de la imagen'
    },
    width: {
      type: GraphQLInt,
      description: 'ancho de la imagen.'
    },
    height: {
        type: GraphQLInt,
        description : "alto de la imange"
    },
    order: {
      type: GraphQLInt
    },
  })
});

exports.pictureType = pictureType;