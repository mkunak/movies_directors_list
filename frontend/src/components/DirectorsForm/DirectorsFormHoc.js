import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { addDirectorMutation, updateDirector } from './mutations';
import { getDirectors } from '../DirectorsTable/queries';

import { styles } from './styles';

const withGraphqlAdd = graphql(addDirectorMutation, {
  props: ({ mutate }) => ({
    addDirector: director => mutate({
      variables: director,
      refetchQueries: [{
        query: getDirectors,
        variables: { name: '' },
      }],
    }),
  }),
});

const withGraphqlUpdate = graphql(updateDirector, {
  props: ({ mutate }) => ({
    updateDirector: director => mutate({
      variables: director,
      refetchQueries: [{
        query: getDirectors,
        variables: { name: '' },
      }],
    }),
  }),
});

const withGraphQL = compose(withGraphqlAdd, withGraphqlUpdate);

export default compose(withStyles(styles), withGraphQL);
