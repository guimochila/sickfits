import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { perPage } from '../../lib/config';
import PaginationStyles from '../styles/PaginationStyles';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

export default function Pagination({ page }) {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

        const { count } = data.itemsConnection.aggregate;
        const pages = Math.ceil(count / perPage);

        return (
          <PaginationStyles>
            <Head>
              <title>
                Sickfits! Page {page} of {pages};
              </title>
            </Head>
            <Link
              prefetch
              href={{ pathname: 'items', query: { page: page - 1 } }}
            >
              <a className="prev" aria-disabled={page <= 1}>
                Prev
              </a>
            </Link>
            <p>
              Page {page} of {pages}
            </p>
            <p>Items total: {count}</p>
            <Link
              prefetch
              href={{ pathname: 'items', query: { page: page + 1 } }}
            >
              <a className="prev" aria-disabled={page >= pages}>
                Next
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
};
