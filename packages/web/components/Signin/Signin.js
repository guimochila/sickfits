import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/Form';
import Error from '../ErrorMessage';
import { CURRENT_USER_QUERY } from '../User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class Signin extends Component {
  state = {
    email: '',
    password: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { loading, error }) => {
          if (error) return <Error error={error} />;

          return (
            <Form
              method="POST"
              onSubmit={async e => {
                e.preventDefault();
                await signin();
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign into your account:</h2>
                <label htmlFor="email">
                  Email
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Sign In!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
