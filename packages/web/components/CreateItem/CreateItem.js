import gql from 'graphql-tag';
import Router from 'next/router';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Error from '../ErrorMessage';
import Form from '../styles/Form';

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
    $price: Int
  ) {
    createItem(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      price: $price
    ) {
      id
      title
      description
      image
      largeImage
      price
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: 'Shoes',
    description: 'Amazing shoes',
    image: 'dog.jpeg',
    largeImage: 'dog.jpeg',
    price: 0,
    isImageBeingUpload: false,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const _value = type === 'number' ? parseFloat(value) : value;

    this.setState({ [name]: _value });
  };

  uploadFile = async e => {
    this.setState({ isImageBeingUpload: true });
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/connectdevs/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );

    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
      isImageBeingUpload: false,
    });
  };

  onFormSubmit = async (e, createItem) => {
    e.preventDefault();
    const res = await createItem();
    Router.push({
      pathname: '/item',
      query: { id: res.data.createItem.id },
    });
  };

  render() {
    const { title, price, description, image, isImageBeingUpload } = this.state;

    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form onSubmit={e => this.onFormSubmit(e, createItem)}>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                File
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload image"
                  required
                  onChange={this.uploadFile}
                />
                {image && <img src={image} alt={title} />}
              </label>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter a description"
                  required
                  value={description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit" disabled={isImageBeingUpload}>
                Submit
              </button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
