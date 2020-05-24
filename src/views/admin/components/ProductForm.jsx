import React, { useState, useEffect } from 'react';
import CircularProgress from 'components/ui/CircularProgress';
import ImageLoader from 'components/ui/ImageLoader';
import Input from 'components/ui/Input';

import useFileHandler from 'hooks/useFileHandler';
// import uuid from 'uuid';

const ProductForm = ({ product, onSubmit, isLoading }) => {
  const [field, setField] = useState({
    name: { value: product ? product.name : ''} ,
    brand: { value: product ? product.brand : '' },
    price: { value: product ? product.price : 0 },
    maxQuantity: { value: product ? product.maxQuantity : 0 },
    description: { value: product ? product.description : '' },
    keywords: { value: product ? product.keywords : ['gago']},
    imageUrl: { value: product ? product.image : '' }
  });

  const { 
    imageFile, 
    setImageFile, 
    isFileLoading, 
    onFileChange 
  } = useFileHandler({ image: {}});

  const onProductNameInput = (e, value, error) => {
    setField({ ...field,  name: { value, error } });
  }

  const onProductBrandInput = (e, value, error) => {
    setField({ ...field,  brand: { value, error } });
  }

  const onProductPriceInput = (e, value, error) => {
    setField({ ...field,  price: { value: sanitizeNumber(value), error } });
  }

  const onProductDescriptionInput = (e, value, error) => {
    setField({ ...field,  description: { value, error } });
  }

  const onProductMaxQuantityInput = (e, value, error) =>  {
    setField({ ...field,  maxQuantity: { value: sanitizeNumber(value), error } });
  }

  const sanitizeNumber = (num) =>{
    return Number(num.toString().replace(/^0*/, ''));
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    const noError = Object.keys(field).every(key => !!!field[key].error);

    if (field.name.value 
      && field.price.value 
      && field.maxQuantity.value 
      && (imageFile.image.file || field.imageUrl.value)
      && noError
    ) {
      const product = {};

      for (let i in field) {
        product[i] = field[i].value;
      }

      onSubmit({ 
        ...product, 
        quantity: 1,
        dateAdded: new Date().getTime(),
        image: imageFile.image.file ? imageFile.image.file : field.imageUrl.value
      });
    }
  }

  return (
      <div>
        <form 
            className="product-form" 
            onSubmit={onSubmitForm}
        >
          <div className="product-form-inputs">
            <div className="d-flex">
              <div className="product-form-field">
                <Input 
                    label="* Product Name"
                    maxLength={60}
                    readOnly={isLoading}
                    placeholder="Takla"
                    onInputChange={onProductNameInput}
                    isRequired={true}
                    field="name"
                    style={{ textTransform: 'capitalize' }}
                    type="text"
                    value={field.name.value}
                />
              </div>
              &nbsp;
              <div className="product-form-field">
                <Input 
                    label="* Product Brand"
                    maxLength={40}
                    readOnly={isLoading}
                    placeholder="Bulus"
                    onInputChange={onProductBrandInput}
                    isRequired={true}
                    field="brand"
                    style={{ textTransform: 'capitalize' }}
                    type="text"
                    value={field.brand.value}
                />
              </div>
            </div>
            <div className="product-form-field product-textarea">
              <Input 
                  label="Product Description"
                  maxLength={200}
                  cols={37}
                  rows={5}
                  readOnly={isLoading}
                  placeholder="Nice Description"
                  onInputChange={onProductDescriptionInput}
                  isRequired={false}
                  field="description"
                  type="textarea"
                  value={field.description.value}
              />
            </div>
            <div className="d-flex">
              <div className="product-form-field">
                <Input 
                    label="* Price"
                    readOnly={isLoading}
                    placeholder="Product Price"
                    onInputChange={onProductPriceInput}
                    isRequired={true}
                    field="price"
                    type="number"
                    value={field.price.value}
                />
              </div>
              &nbsp;
              <div className="product-form-field">
                <Input 
                    label="* Stock Total"
                    readOnly={isLoading}
                    placeholder="Stock Total"
                    onInputChange={onProductMaxQuantityInput}
                    isRequired={true}
                    field="maxQuantity"
                    type="number"
                    value={field.maxQuantity.value}
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
              <span className="d-block padding-s">* Image</span>
              <input 
                  disabled={isLoading}
                  hidden
                  id="product-input-file"
                  onChange={(e) => onFileChange(e, 'image')}
                  readOnly={isLoading}
                  type="file" 
              />
              {!isFileLoading && (
                <label htmlFor="product-input-file">
                  Choose Image
                </label>
              )}
            </div>
            {(imageFile.image.url || field.imageUrl.value) && (
              <div className="product-form-img-wrapper">
                <ImageLoader
                    alt=""
                    className="product-form-image-preview"
                    src={imageFile.image.url || field.imageUrl.value} 
                />
                </div>
            )}
          </div>
        </form>
      </div>
    );
}

export default ProductForm;
