import { CircularProgress, ImageLoader, Input } from 'components/common';
import { useFileHandler } from 'hooks';
import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import InputColor from './InputColor';

// Default brand names that I used. You can use what you want
const brandOptions = [
	{ value: 'Salt Maalat', label: 'Salt Maalat' },
	{ value: 'Betsin Maalat', label: 'Betsin Maalat' },
	{ value: 'Sexbomb', label: 'Sexbomb' },
	{ value: 'Black Kibal', label: 'Black Kibal' },
];

const ProductForm = ({ product, onSubmit, isLoading }) => {
	const defaultProduct = {
		imageCollection: [],
		...product
	};
	const [field, setField] = useState({
		name: { value: product ? defaultProduct.name : '' },
		brand: { value: product ? defaultProduct.brand : '' },
		price: { value: product ? defaultProduct.price : 0 },
		maxQuantity: { value: product ? defaultProduct.maxQuantity : 0 },
		description: { value: product ? defaultProduct.description : '' },
		keywords: { value: product ? defaultProduct.keywords : ['gago'] },
		sizes: { value: product ? defaultProduct.sizes : [] },
		imageUrl: { value: product ? defaultProduct.image : '' },
		isFeatured: { value: product ? defaultProduct.isFeatured : false },
		isRecommended: { value: product ? defaultProduct.isRecommended : false },
		availableColors: { value: product ? defaultProduct.availableColors : [] },
		imageCollection: { value: product ? defaultProduct.imageCollection : [] }
	});

	const {
		imageFile,
		isFileLoading,
		onFileChange,
		removeImage
	} = useFileHandler({ image: {}, imageCollection: field.imageCollection.value });

	const sanitizeNumber = (num) => {
		return Number(num.toString().replace(/^0*/, ''));
	};

	const onProductNameInput = (value, error) => {
		setField({ ...field, name: { value, error } });
	};

	const onBrandChange = (newValue) => {
		setField({ ...field, brand: { value: newValue.value } });
	};

	const onProductPriceInput = (value, error) => {
		setField({ ...field, price: { value: sanitizeNumber(value), error } });
	};

	const onProductDescriptionInput = (value, error) => {
		setField({ ...field, description: { value, error } });
	};

	const onProductMaxQuantityInput = (value, error) => {
		setField({ ...field, maxQuantity: { value: sanitizeNumber(value), error } });
	};

	const onAddSelectedColor = (color) => {
		if (!field.availableColors.value.includes(color)) {
			setField({ ...field, availableColors: { value: [...field.availableColors.value, color] } });
		}
	};

	const onDeleteSelectedColor = (color) => {
		const filteredColors = field.availableColors.value.filter(c => c !== color);

		setField({ ...field, availableColors: { value: filteredColors } });
	};

	const onKeywordChange = (newValue) => {
		const keywords = newValue.map(word => word.value);

		setField({ ...field, keywords: { value: keywords } });
	};

	const onSizesChange = (newValue) => {
		const sizes = newValue.map(size => Number(size.value));
		setField({ ...field, sizes: { value: sizes } });
	};

	const handleNumberOnlyInput = (e) => {
		if (/\D/.test(code) && code !== 'Backspace') {
			e.preventDefault();
		}
	};

	const onFeaturedCheckChange = (e) => {
		setField({ ...field, isFeatured: { value: e.target.checked } });
	}

	const onRecommendedCheckChange = (e) => {
		setField({ ...field, isRecommended: { value: e.target.checked } });
	}

	const onSubmitForm = (e) => {
		e.preventDefault();
		// eslint-disable-next-line no-extra-boolean-cast
		const noError = Object.keys(field).every(key => !!!field[key].error);

		if (field.name.value
			&& field.price.value
			&& field.maxQuantity.value
			&& (imageFile.image.file || field.imageUrl.value)
			&& noError
		) {
			const newProduct = {};

			Object.keys(field).forEach((i) => {
				newProduct[i] = field[i].value;
			});

			onSubmit({
				...newProduct,
				quantity: 1,
				name_lower: newProduct.name.toLowerCase(), // due to firebase function billing policy, let's add lowercase version of name here instead in firebase functions
				dateAdded: new Date().getTime(),
				image: imageFile.image.file ? imageFile.image.file : field.imageUrl.value,
				imageCollection: imageFile.imageCollection
			});
		}
	};

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
								field="name"
								isRequired
								label="* Product Name"
								maxLength={60}
								onInputChange={onProductNameInput}
								placeholder="Takla"
								readOnly={isLoading}
								style={{ textTransform: 'capitalize' }}
								type="text"
								value={field.name.value}
							/>
						</div>
						&nbsp;
						<div className="product-form-field">
							<span className="d-block padding-s">* Create/Select Brand</span>
							<CreatableSelect
								placeholder="Select/Create Brand"
								defaultValue={{ label: field.brand.value, value: field.brand.value }}
								onChange={onBrandChange}
								options={brandOptions}
								styles={{
									menu: provided => ({ ...provided, zIndex: 10 }),
									container: provided => ({ ...provided, marginBottom: '1.2rem' })
								}}
							/>
						</div>
					</div>
					<div className="product-form-field product-textarea">
						<Input
							cols={37}
							field="description"
							isRequired={false}
							label="Product Description"
							maxLength={200}
							onInputChange={onProductDescriptionInput}
							placeholder="Nice Description"
							readOnly={isLoading}
							rows={5}
							type="textarea"
							value={field.description.value}
						/>
					</div>
					<div className="d-flex">
						<div className="product-form-field">
							<Input
								field="price"
								isRequired
								label="* Price"
								onInputChange={onProductPriceInput}
								placeholder="Product Price"
								readOnly={isLoading}
								type="number"
								value={field.price.value}
							/>
						</div>
						&nbsp;
						<div className="product-form-field">
							<Input
								field="maxQuantity"
								isRequired
								label="* Stock Total"
								onInputChange={onProductMaxQuantityInput}
								placeholder="Stock Total"
								readOnly={isLoading}
								type="number"
								value={field.maxQuantity.value}
							/>
						</div>
					</div>
					<div className="d-flex">
						<div className="product-form-field">
							<span className="d-block padding-s">Keyword(s)</span>
							<CreatableSelect
								isMulti
								placeholder="Select/Create Keyword"
								onChange={onKeywordChange}
								defaultValue={field.keywords.value.map(word => ({ value: word, label: word }))}
								// options={field.keywords.value.map(word => ({ value: word, label: word }))}
								styles={{
									menu: provided => ({ ...provided, zIndex: 10 })
								}}
							/>
						</div>
						<div className="product-form-field">
							<span className="d-block padding-s">Sizes (Millimeter)</span>
							<CreatableSelect
								isMulti
								isClearable
								placeholder="Select/Create Size"
								onChange={onSizesChange}
								onKeyDown={handleNumberOnlyInput}
								defaultValue={field.sizes.value.map(size => ({ value: size, label: size }))}
								// options={field.keywords.value.map(word => ({ value: word, label: word }))}
								styles={{
									menu: provided => ({ ...provided, zIndex: 10 })
								}}
							/>
						</div>
					</div>
					<br />
					<InputColor
						availableColors={field.availableColors.value}
						onDeleteSelectedColor={onDeleteSelectedColor}
						onAddSelectedColor={onAddSelectedColor}
					/>
					<br />
					<div className="product-form-field">
						<span className="d-block padding-s">Image Collection</span>
						<input
							disabled={isLoading}
							hidden
							id="product-input-file-collection"
							multiple
							onChange={e => onFileChange(e, { name: 'imageCollection', type: 'multiple' })}
							readOnly={isLoading}
							type="file"
						/>
						{!isFileLoading && (
							<label htmlFor="product-input-file-collection">
								Choose Images
							</label>
						)}
					</div>
					<div className="product-form-collection">
						<>
							{imageFile.imageCollection.length >= 1 && (
								imageFile.imageCollection.map(image => (
									<div
										className="product-form-collection-image"
										key={image.id}
									>
										<ImageLoader
											alt=""
											src={image.url}
										/>
										<button
											className="product-form-delete-image"
											onClick={() => removeImage({ id: image.id, name: 'imageCollection' })}
											title="Delete Image"
											type="button"
										>
											<i className="fa fa-times-circle" />
										</button>
									</div>
								))
							)}
						</>
					</div>
					<br />
					<div className="d-flex">
						<div className="product-form-field">
							<input
								checked={field.isFeatured.value}
								className=""
								id="featured"
								onChange={onFeaturedCheckChange}
								type="checkbox"
							/>
							<label htmlFor="featured">
								<h5 className="d-flex-grow-1 margin-0">
									&nbsp; Add to Featured &nbsp;
							</h5>
							</label>
						</div>
						<div className="product-form-field">
							<input
								checked={field.isRecommended.value}
								className=""
								id="recommended"
								onChange={onRecommendedCheckChange}
								type="checkbox"
							/>
							<label htmlFor="recommended">
								<h5 className="d-flex-grow-1 margin-0">
									&nbsp; Add to Recommended &nbsp;
							</h5>
							</label>
						</div>
					</div>
					<br />
					<br />
					<div className="product-form-field product-form-submit">
						<button
							className="button"
							disabled={isLoading}
							type="submit"
						>
							<CircularProgress
								theme="light"
								visible={isLoading}
							/>
							{isLoading ? 'Saving Product' : 'Save Product'}
						</button>
					</div>
				</div>
				<div className="product-form-file">
					<div className="product-form-field">
						<span className="d-block padding-s">* Thumbnail</span>
						<input
							disabled={isLoading}
							hidden
							id="product-input-file"
							onChange={e => onFileChange(e, { name: 'image', type: 'single' })}
							readOnly={isLoading}
							type="file"
						/>
						{!isFileLoading && (
							<label htmlFor="product-input-file">
								Choose Image
							</label>
						)}
					</div>
					<div className="product-form-image-wrapper">
						{(imageFile.image.url || field.imageUrl.value) && (
							<ImageLoader
								alt=""
								className="product-form-image-preview"
								src={imageFile.image.url || field.imageUrl.value}
							/>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};


export default ProductForm;
