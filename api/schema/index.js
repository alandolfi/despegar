const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const { hotelType } = require('./types/hotel');

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hotels: {
      type: new GraphQLList(hotelType)
    }
  })
});

const schema = new GraphQLSchema({
  query: queryType
});

module.exports = schema;