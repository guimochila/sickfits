import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from '../Items';

export const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  onDeleteItem = deleteItem => {
    /* eslint-disable-next-line */
    if (confirm('Are you sure you want to delete it?')) {
      deleteItem().catch(error => {
        console.log(error);
      });
    }
  };

  updateCache = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id,
    );
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  render() {
    const { children, id } = this.props;
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id }}
        update={this.updateCache}
      >
        {deleteItem => (
          <button type="button" onClick={() => this.onDeleteItem(deleteItem)}>
            {children}
          </button>
        )}
      </Mutation>
    );
  }
}

DeleteItem.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default DeleteItem;
