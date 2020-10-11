import { useState } from 'react';
import { IImageFile } from 'types/types';
import { v4 as uuidv4 } from 'uuid';

function useFileHandler<T>(initState: T) {
	const [imageFile, setImageFile] = useState(initState);
	const [isFileLoading, setFileLoading] = useState(false);

	const removeImage = ({ id, propName }: { id: string | number; propName: string }) => {
		const items = (imageFile[propName] as any).filter((item: IImageFile) => item.id !== id);

		setImageFile({
			...imageFile,
			[propName]: items
		});
	};

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>, { name, type }) => {
		if (!event.target || !event.target.files) return;

		const val = event.target.value;
		const img = event.target.files[0];
		const size = img.size / 1024 / 1024;
		const regex = /(\.jpg|\.jpeg|\.png)$/i;

		setFileLoading(true);
		if (!regex.exec(val)) {
			alert('File type must be JPEG or PNG');
			setFileLoading(false);
		} else if (size > 0.5) {
			alert('File size exceeded 500kb, consider optimizing your image');
			setFileLoading(false);
		} else if (type === 'multiple') {
			if (event.target.files) {
				Array.from(event.target.files).forEach((file) => {
					const reader = new FileReader();
					reader.addEventListener('load', (e: Event) => {
						if (e.target) {
							setImageFile((oldFiles) => ({
								...oldFiles,
								[name]: [...oldFiles[name], { file, url: reader.result, id: uuidv4() }]
							}));
						}
					});
					reader.readAsDataURL(file);
				});
			}

			setFileLoading(false);
		} else { // type is single
			const reader = new FileReader();

			reader.addEventListener('load', (e: Event) => {
				if (e.target) {
					setImageFile({
						...imageFile,
						[name]: { file: img, url: reader.result }
					});
					setFileLoading(false);
				}
			});
			reader.readAsDataURL(img);
		}

	};

	return {
		imageFile,
		setImageFile,
		isFileLoading,
		onFileChange,
		removeImage
	} as const;
}

export default useFileHandler;
