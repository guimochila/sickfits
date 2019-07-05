import PropTypes from 'prop-types';
import UpdateItem from '../components/UpdateItem';

function Update({ query }) {
  return (
    <div>
      <UpdateItem id={query.id} />
    </div>
  );
}

Update.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

export default Update;
