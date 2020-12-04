import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import CircularProgress from 'components/ui/CircularProgress';
import ImageLoader from 'components/ui/ImageLoader';
import Input from 'components/ui/Input';

import useFileHandler from 'hooks/useFileHandler';
import { IImageFile, IProduct } from 'types/types';
import InputColor from './InputColor';
// import uuid from 'uuid';

// Default brand names that I used. You can use what you want
const brandOptions = [
	{ value: 'Salt Maalat', label: 'Salt Maalat' },
	{ value: 'Betsin Maalat', label: 'Betsin Maalat' },
	{ value: 'Sexbomb', label: 'Sexbomb' },
	{ value: 'Black Kibal', label: 'Black Kibal' }
];

interface IProps {
	product?: IProduct | undefined;
	onSubmit: (product: IProduct) => void;
	isLoading: boolean;
}

interface IInputState {
	[propName: string]: {
		value: any;
		error?: string | null;
	};
}

interface IImageState {
	thumbnail: Partial<IImageFile>;
	imageCollection: IImageFile[];
}

const ProductForm: React.FC<IProps> = ({ product, onSubmit, isLoading }) => {
	// const product: IProduct = {
	// 	...product as IProduct,
	// 	imageCollection: []
	// };

	const [field, setField] = useState<IInputState>({
		name: { value: product ? product.name : '' },
		brand: { value: product ? product.brand : '' },
		price: { value: product ? product.price : 0 },
		maxQuantity: { value: product ? product.maxQuantity : 0 },
		description: { value: product ? product.description : '' },
		keywords: { value: product ? product.keywords : ['gago'] },
		imageUrl: { value: product ? product.image : '' },
		availableColors: { value: product ? product.availableColors : [] },
		imageCollection: { value: product ? product.imageCollection : [] }
	});

	const {
		imageFile,
		isFileLoading,
		onFileChange,
		removeImage
	} = useFileHandler<IImageState>({ thumbnail: {}, imageCollection: field.imageCollection.value });

	const sanitizeNumber = (num: number) => {
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

	const onSubmitForm = (e) => {
		e.preventDefault();
		// eslint-disable-next-line no-extra-boolean-cast
		const noError = Object.keys(field).every(key => !!!field[key].error);

		if (field.name.value
			&& field.price.value
			&& field.maxQuantity.value
			&& (imageFile.thumbnail.file || field.imageUrl.value)
			&& noError
		) {
			const newProduct = {};

			Object.keys(field).forEach((i) => {
				newProduct[i] = field[i].value;
			});

			onSubmit({
				...newProduct as IProduct,
				quantity: 1,
				dateAdded: new Date().getTime(),
				image: imageFile.thumbnail.file ? imageFile.thumbnail.file : field.imageUrl.value,
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
											onClick={() => removeImage({ id: image.id, propName: 'imageCollection' })}
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
							onChange={e => onFileChange(e, { name: 'thumbnail', type: 'single' })}
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
						{(imageFile.thumbnail.url || field.imageUrl.value) && (
							<ImageLoader
								alt=""
								className="product-form-image-preview"
								src={imageFile.thumbnail.url || field.imageUrl.value}
							/>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default ProductForm;
