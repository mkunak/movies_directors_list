import { gql } from 'apollo-boost';

export const addMovieMutation = gql`
  mutation addMovie($name: String!, $genre: String!, $watched: Boolean!, $directorId: ID, $rate: Int) {
    addMovie(name: $name, genre: $genre, watched: $watched, directorId: $directorId, rate:$rate) {
      name
    }
  }
`;

export const updateMovie = gql`
  mutation updateMovie($id: ID, $name: String!, $genre: String!, $watched: Boolean!, $directorId: ID, $rate: Int) {
    updateMovie(id: $id, name: $name, genre: $genre, watched: $watched, directorId: $directorId, rate:$rate) {
      name
    }
  }
`;
