import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';

import { graphql } from 'react-apollo';

import { addMovieMutation, updateMovie } from './mutations';
import { getDirectors } from './queries';
import { getMovies } from '../MoviesTable/queries';

import { styles } from './styles';

const withGraphQL = compose(
  graphql(addMovieMutation, {
    props: ({ mutate }) => ({
      addMovie: movie => mutate({
        variables: movie,
        refetchQueries: [{
          query: getMovies,
          variables: { name: '' },
        }],
      }),
    }),
  }),
  graphql(updateMovie, {
    props: ({ mutate }) => ({
      updateMovie: movie => mutate({
        variables: movie,
        refetchQueries: [{
          query: getMovies,
          variables: { name: '' },
        }],
      }),
    }),
  }),
  graphql(getDirectors, {
    options: ({ name = '' }) => ({ variables: { name } }),
  }));

export default compose(withStyles(styles), withGraphQL);
