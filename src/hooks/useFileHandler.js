import React, { useState, useEffect } from 'react';

const useFileHandler = (initState) => {
	const [imageFile, setImageFile] = useState(initState);
	const [isFileLoading, setFileLoading] = useState(false);

	const onFileChange = (e, prop) => {
		const val = e.target.value;
	    const img = e.target.files[0];
	    const size = img.size / 1024 / 1024;
	    const regex = /(\.jpg|\.jpeg|\.png)$/i;

	    setFileLoading(true);
	    if (!regex.exec(val)) {
	      alert('File type must be JPEG or PNG', 'error');
	      setFileLoading(false);
	    } else if (size > 0.5) {
	      alert('File size exceeded 500kb, consider optimizing your image', 'error');
	      setFileLoading(false);
	    } else {
	      const reader = new FileReader();
	      reader.addEventListener('load', (e) => {
	      	setImageFile({ 
	      		...imageFile,
	      		[prop]: { file: img, url: e.target.result }
	      	});
	        setFileLoading(false);
	      });
	      reader.readAsDataURL(img);
	    }
	}

	return { imageFile, setImageFile, isFileLoading, onFileChange }
}

export default useFileHandler;
