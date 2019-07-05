import PropTypes from 'prop-types';
import SingleItem from '../components/SingleItem/SingleItem';

function Item({ query }) {
  if (!query.id) {
    return <p>Item not found.</p>;
  }
  return (
    <div>
      <SingleItem id={query.id} />
    </div>
  );
}

Item.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default Item;
