import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ItemStyles from '../styles/ItemStyles';
import PriceTag from '../styles/PriceTag';
import Title from '../styles/Title';
import formatMoney from '../../lib/formatMoney';
import DeleteItem from '../DeleteItem';

class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { item } = this.props;

    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link href={{ pathname: '/item', query: { id: item.id } }}>
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link href={{ pathname: 'update', query: { id: item.id } }}>
            <a>
              Edit{' '}
              <span role="img" aria-label="Edit">
                ✏️
              </span>
            </a>
          </Link>
          <button type="button">Add To Cart</button>
          <DeleteItem id={item.id}>Delete This Item</DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}

export default Item;
