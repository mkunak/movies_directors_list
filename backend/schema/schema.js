const graphql = require('graphql');

// const movies = require('../db/movies');
// const directors = require('../db/directors');
const Movies = require('../models/Movie');
const Directors = require('../models/Director');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;

// GraphQL schema 1:
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    rate: { type: GraphQLInt },
    watched: { type: new GraphQLNonNull(GraphQLBoolean) },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Directors.findById(parent.directorId);
      },
    },
  }),
});

// GraphQL schema 2:
const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movies.find({ directorId: parent.id });
      },
    },
  }),
});

// mutation (POST queries):
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        const director = new Directors({
          name: args.name,
          age: args.age,
        });

        return director.save();
      },
    },

    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
        rate: { type: GraphQLInt },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(parent, args) {
        const movie = new Movies({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
          rate: args.rate,
          watched: args.watched,
        });

        return movie.save();
      },
    },

    deleteDirector: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Directors.findByIdAndDelete(id);
      },
    },

    deleteMovie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Movies.findByIdAndDelete(id);
      },
    },

    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, { id, name, age }) {
        return Directors.findByIdAndUpdate(
          id,
          { $set: { name, age } },
          { new: true },
        );
      },
    },

    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
        rate: { type: GraphQLInt },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(parent, { id, name, genre, directorId, rate, watched }) {
        return Movies.findByIdAndUpdate(
          id,
          { $set: { name, genre, directorId, rate, watched } },
          { new: true },
        );
      },
    },
  },
});

// root query (GET queries):
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    // subrequest 'movie':
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movies.findById(args.id);
      },
    },

    // subrequest 'movies':
    movies: {
      type: new GraphQLList(MovieType),
      args: { name: { type: GraphQLString } },
      resolve(parent, { name }) {
        return Movies.find({ name: { $regex: name, $options: 'i' } });
      },
    },

    // subrequest 'director':
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Directors.findById(args.id);
      },
    },

    // subrequest 'directors':
    directors: {
      type: new GraphQLList(DirectorType),
      args: { name: { type: GraphQLString } },
      resolve(parent, { name }) {
        return Directors.find({ name: { $regex: name, $options: 'i' } });
      },
    },
  },
});

// GQL-schema consist of root queries and mutations.
// GQL-schema export (this instance should be imported into the server/app.js file):
const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

module.exports = schema;
