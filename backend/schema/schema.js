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
} = graphql;

// GraphQL schema 1:
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // return directors.find(director => director.id === parent.id);
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
        // return movies.filter(movie => movie.directorId === parent.id);
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
      },
      resolve(parent, args) {
        const movie = new Movies({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });

        return movie.save();
      },
    },

    deleteDirector: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Directors.findByIdAndDelete(args.id);
        // return director.save();
      },
    },

    deleteMovie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movies.findByIdAndDelete(args.id);
        // return director.save();
      },
    },

    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        const { name, age } = args;
        return Directors.findByIdAndUpdate(
          args.id,
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
      },
      resolve(parent, args) {
        const { name, genre, directorId } = args;
        return Movies.findByIdAndUpdate(
          args.id,
          { $set: { name, genre, directorId } },
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
        // return movies.find(movie => movie.id === args.id);
        return Movies.findById(args.id);
      },
    },
    // subrequest 'movies':
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        return Movies.find({});
      },
    },
    // subrequest 'director':
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find(director => director.id === args.id);
        return Directors.findById(args.id);
      },
    },
    // subrequest 'directors':
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors;
        return Directors.find({});
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
