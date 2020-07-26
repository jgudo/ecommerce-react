import React, { useState } from 'react';
import { v3 as uuidv3 } from 'uuid';

const useFileHandler = (initState) => {
	const [imageFile, setImageFile] = useState(initState);
	const [isFileLoading, setFileLoading] = useState(false);

	const onFileChange = (event, { name, type }) => {
		const val = event.target.value;
		const img = event.target.files[0];
		const size = img.size / 1024 / 1024;
		const regex = /(\.jpg|\.jpeg|\.png)$/i;

		setFileLoading(true);
		if (!regex.exec(val)) {
			alert('File type must be JPEG or PNG', 'error');
			setFileLoading(false);
		} else if (size > 0.5) {
			alert('File size exceeded 500kb, consider optimizing your image', 'error');
			setFileLoading(false);
		} else if (type === 'multiple') {
			const reader = new FileReader();

			Array.from(event.target.files).forEach((file) => {
				reader.addEventListener('load', (e) => {
					setImageFile({
						...imageFile,
						[name]: [...imageFile[name], { file, url: e.target.result, id: uuidv3() }] // id used for deleting the image from array
					});
					setFileLoading(false);
				});
				reader.readAsDataURL(img);
			});
		} else {
			const reader = new FileReader();

			reader.addEventListener('load', (e) => {
				setImageFile({
					...imageFile,
					[name]: { file: img, url: e.target.result }
				});
				setFileLoading(false);
			});
			reader.readAsDataURL(img);
		}
	};

	return {
		imageFile,
		setImageFile,
		isFileLoading,
		onFileChange
	};
};

export default useFileHandler;
