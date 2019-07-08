import PropTypes from 'prop-types';
import { Items } from '../components/Items';

function Home({ query }) {
  return (
    <div>
      <Items page={parseFloat(query.page) || 1} />
    </div>
  );
}

Home.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default Home;
