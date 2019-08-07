import React, { Component } from 'react';
import uuid from 'uuid';

class ProductForm extends Component {
  state = {
    name: this.props.product ? this.props.product.name : '',
    price: this.props.product ? this.props.product.price : 0,
    description: this.props.product ? this.props.product.description : ''
  };

  onProductNameInput = (e) => {
    this.setState({ name: e.target.value });
  }

  onProductPriceInput = (e) => {
    this.setState({ price: e.target.value });
  }

  onProductDescriptionInput = (e) => {
    this.setState({ description: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, price, description } = this.state;
    
    if (name && price && description) {
      const product = {
        id: this.props.product ? this.props.product.id : uuid(),
        name,
        description,
        price,
        dateAdded: new Date().getTime()
      };
      
      this.props.onSubmit(product);
    } else {
      alert('all fields are required');
    }
  }

  render() {
    const { name, description, price } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input 
              onChange={this.onProductNameInput}
              placeholder="Product Name" 
              type="text" 
              value={name}
          />
          <input 
              onChange={this.onProductDescriptionInput}
              placeholder="Product Description" 
              type="text" 
              value={description}
          />
          <input 
              onChange={this.onProductPriceInput}
              placeholder="Product Price"
              type="number" 
              value={price}
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    );
  }
}

export default ProductForm;
