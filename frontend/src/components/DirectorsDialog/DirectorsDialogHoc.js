import { compose } from 'recompose';

import { graphql } from 'react-apollo';

import { deleteDirector } from './mutations';
import {getDirectors} from '../DirectorsTable/queries';

const propsObj = {
  props: ({ mutate }) => ({
    deleteDirector: id => mutate({
      variables: id,
      refetchQueries: [{
        query: getDirectors,
        variables: { name: '' },
      }],
    }),
  }),
};

const withGraphqlDelete = graphql(deleteDirector, propsObj);

export default compose(withGraphqlDelete);
