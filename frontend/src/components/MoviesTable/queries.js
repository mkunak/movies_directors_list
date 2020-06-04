import { gql } from 'apollo-boost';

export const getMovies = gql`
  query getMovies($name: String) {
    movies(name: $name) {
      id
      name
      genre
      rate
      watched
      director {
        id
        name
      }
    }
  }
`;
