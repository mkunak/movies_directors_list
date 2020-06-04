import { gql } from 'apollo-boost';

export const getDirectors = gql`
  query getDirectors($name: String) {
    directors(name: $name) {
      id
      name
    }
  }
`;
