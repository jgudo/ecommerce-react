import React, { Component } from 'react';
import CircularProgress from '../../../components/ui/CircularProgress';
import ImageLoader from '../../../components/ui/ImageLoader';
// import uuid from 'uuid';

class ProductForm extends Component {
  state = {
    name: this.props.product ? this.props.product.name : '',
    brand: this.props.product ? this.props.product.brand : '',
    price: this.props.product ? this.props.product.price : 0,
    maxQuantity: this.props.product ? this.props.product.maxQuantity : 0,
    description: this.props.product ? this.props.product.description : '',
    keywords: this.props.product ? this.props.product.keywords : ['gago'],
    image: null,
    imageUrl: this.props.product ? this.props.product.image : ''
  };

  onProductNameInput = (e) => {
    this.setState({ name: e.target.value });
  }

  onProductBrandInput = (e) => {
    this.setState({ brand: e.target.value });
  }

  onProductPriceInput = (e) => {
    this.setState({ price: Number(e.target.value) });
  }

  onProductDescriptionInput = (e) => {
    this.setState({ description: e.target.value });
  }

  onProductMaxQuantityInput = (e) => {
    this.setState({ maxQuantity: Number(e.target.value) });
  }

  onImageChange = (e) => {
    const img = e.target.files[0];
    const url = URL.createObjectURL(img);

    this.setState({ 
      image: img,
      imageUrl: url 
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, brand, price, description, keywords, maxQuantity, image, imageUrl } = this.state;
    // Object.keys(this.state).every(key => this.state[key] === !!this.state[key])
    if (name && price && maxQuantity && image) {
      const product = {
        // id: this.props.product ? this.props.product.id : uuid(),
        name,
        brand,
        description,
        price,
        maxQuantity,
        quantity: 1,
        keywords,
        dateAdded: new Date().getTime(),
        image: image ? image : imageUrl
      };
      
      this.props.onSubmit(product);
    } else {
      alert('all fields are required');
    }
  }

  render() {
    const { name, description, price, brand, maxQuantity, imageUrl } = this.state;
    const { isLoading } = this.props;

    return (
      <div>
        <form 
            className="product-form" 
            onSubmit={this.onSubmit}
        >
          <div className="product-form-inputs">
            <div className="d-flex">
              <div className="product-form-field">
                <span className="d-block padding-s">Product Name</span>
                <input 
                    className="input-form d-block"
                    onChange={this.onProductNameInput}
                    placeholder="Product Name" 
                    readOnly={isLoading}
                    type="text" 
                    value={name}
                />
              </div>
              &nbsp;
              <div className="product-form-field">
                <span className="d-block padding-s">Brand</span>
                <input 
                    className="input-form d-block"
                    onChange={this.onProductBrandInput}
                    placeholder="Product Brand" 
                    readOnly={isLoading}
                    type="text" 
                    value={brand}
                />
              </div>
            </div>
            <div className="product-form-field product-textarea">
              <span className="d-block padding-s">Product Description</span>
              <textarea 
                  className="input-form d-block"
                  onChange={this.onProductDescriptionInput}
                  placeholder="Product Description" 
                  readOnly={isLoading}
                  type="text" 
                  value={description}
              />
            </div>
            <div className="d-flex">
              <div className="product-form-field">
                <span className="d-block padding-s">Price</span>
                <input 
                    className="input-form d-block"
                    onChange={this.onProductPriceInput}
                    placeholder="Product Price"
                    readOnly={isLoading}
                    type="number" 
                    value={price}
                />
              </div>
              &nbsp;
              <div className="product-form-field">
                <span className="d-block padding-s">Stock Amount</span>
                <input 
                    className="input-form d-block"
                    onChange={this.onProductMaxQuantityInput}
                    placeholder="Max Quantity"
                    readOnly={isLoading}
                    type="number" 
                    value={maxQuantity}
                />
              </div>
            </div>
            <br/>
            <div className="product-form-field product-form-submit">
              <button 
                  className="button"
                  disabled={isLoading}
                  type="submit"
              >
                <CircularProgress visible={isLoading} theme="light" />
                {isLoading ? 'Saving Product' : 'Save Product'}
              </button>
            </div>
          </div>
          <div className="product-form-file">
            <div className="product-form-field">
              <span className="d-block padding-s">Image</span>
              <input 
                  disabled={isLoading}
                  hidden
                  id="product-input-file"
                  onChange={this.onImageChange}
                  readOnly={isLoading}
                  type="file" 
              />
              <label htmlFor="product-input-file">
                Choose image product
              </label>
            </div>
            {imageUrl && (
              <div className="product-form-img-wrapper">
                <ImageLoader
                    alt=""
                    className="product-form-image-preview"
                    src={imageUrl} 
                />
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default ProductForm;
