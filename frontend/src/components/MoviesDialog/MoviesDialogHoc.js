import { compose } from 'recompose';

import { graphql } from 'react-apollo';

import { deleteMovie } from './mutations';
import { getMovies } from '../MoviesTable/queries';

const withGraphqlDelete = graphql(deleteMovie, {
  props: ({ mutate }) => ({
    deleteMovie: id => mutate({
      variables: id,
      refetchQueries: [{
        query: getMovies,
        variables: { name: '' },
      }],
    }),
  }),
});

export default compose(withGraphqlDelete);
