import React, { Component } from 'react';
import uuid from 'uuid';

class ProductForm extends Component {
  state = {
    name: this.props.product ? this.props.product.name : '',
    brand: this.props.product ? this.props.product.brand : '',
    price: this.props.product ? this.props.product.price : 0,
    maxQuantity: this.props.product ? this.props.product.maxQuantity : 0,
    description: this.props.product ? this.props.product.description : '',
    keywords: this.props.product ? this.props.product.keywords : ['wala']
  };

  onProductNameInput = (e) => {
    this.setState({ name: e.target.value });
  }

  onProductBrandInput = (e) => {
    this.setState({ brand: e.target.value });
  }

  onProductPriceInput = (e) => {
    this.setState({ price: e.target.value });
  }

  onProductDescriptionInput = (e) => {
    this.setState({ description: e.target.value });
  }

  onProductMaxQuantityInput = (e) => {
    this.setState({ maxQuantity: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, brand, price, description, keywords, maxQuantity } = this.state;
    
    if (name && price && description) {
      const product = {
        id: this.props.product ? this.props.product.id : uuid(),
        name,
        brand,
        description,
        price,
        maxQuantity,
        quantity: 1,
        image: this.props.product ? this.props.product.image : '',
        keywords,
        dateAdded: new Date().getTime()
      };
      
      this.props.onSubmit(product);
    } else {
      alert('all fields are required');
    }
  }

  render() {
    const { name, description, price, brand, maxQuantity } = this.state;

    return (
      <div>
        <form 
            className="product-form" 
            onSubmit={this.onSubmit}
        >
          <div className="product-form-field">
            <span className="d-block padding-s">Product Name</span>
            <input 
                className="input-form d-block"
                onChange={this.onProductNameInput}
                placeholder="Product Name" 
                type="text" 
                value={name}
            />
          </div>
          <div className="product-form-field">
            <span className="d-block padding-s">Brand</span>
            <input 
                className="input-form d-block"
                onChange={this.onProductBrandInput}
                placeholder="Product Brand" 
                type="text" 
                value={brand}
            />
          </div>
          <div className="product-form-field product-textarea">
            <span className="d-block padding-s">Product Description</span>
            <textarea 
                className="input-form d-block"
                onChange={this.onProductDescriptionInput}
                placeholder="Product Description" 
                type="text" 
                value={description}
            />
          </div>
          <div className="product-form-field">
            <span className="d-block padding-s">Price</span>
            <input 
                className="input-form d-block"
                onChange={this.onProductPriceInput}
                placeholder="Product Price"
                type="number" 
                value={price}
            />
          </div>
          <div className="product-form-field">
            <span className="d-block padding-s">Stock Amount</span>
            <input 
                className="input-form d-block"
                onChange={this.onProductMaxQuantityInput}
                placeholder="Max Quantity"
                type="number" 
                value={maxQuantity}
            />
          </div>
          <div className="product-form-field product-form-submit">
            <button 
                className="button button-small"
                type="submit"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProductForm;
