import React, { Component } from 'react';
import uuid from 'uuid';

class ProductForm extends Component {
  state = {
    productName: this.props.product ? this.props.product.productName : '',
    productPrice: this.props.product ? this.props.product.productPrice : 0,
    productDescription: this.props.product ? this.props.product.productDescription : ''
  };

  onProductNameInput = (e) => {
    this.setState({ productName: e.target.value });
  }

  onProductPriceInput = (e) => {
    this.setState({ productPrice: e.target.value });
  }

  onProductDescriptionInput = (e) => {
    this.setState({ productDescription: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { productName, productPrice, productDescription } = this.state;
    
    if (productName && productPrice && productDescription) {
      const product = {
        productId: this.props.product ? this.props.product.productId : uuid(),
        productName,
        productDescription,
        productPrice,
        dateAdded: new Date().getTime()
      };
      
      this.props.onSubmit(product);
    } else {
      alert('all fields are required');
    }
  }

  render() {
    const { productName, productDescription, productPrice } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input 
              onChange={this.onProductNameInput}
              placeholder="Product Name" 
              type="text" 
              value={productName}
          />
          <input 
              onChange={this.onProductDescriptionInput}
              placeholder="Product Description" 
              type="text" 
              value={productDescription}
          />
          <input 
              onChange={this.onProductPriceInput}
              placeholder="Product Price"
              type="number" 
              value={productPrice}
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    );
  }
}

export default ProductForm;
