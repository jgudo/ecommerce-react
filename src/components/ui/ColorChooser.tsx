import React, { useState } from 'react';

interface IProps {
	availableColors: [string];
	onSelectedColorChange: (color: string) => void;
}

const ColorChooser: React.FC<IProps> = ({ availableColors, onSelectedColorChange }) => {
	const [selectedColor, setSelectedColor] = useState('');

	const setColor = (color: string) => {
		setSelectedColor(color);
		onSelectedColorChange(color);
	};

	return (
		<div className="color-chooser">
			{availableColors.map(color =>
				<div
					className={selectedColor === color ? 'color-item color-item-selected' : 'color-item'}
					key={color}
					onClick={() => setColor(color)}
					style={{ backgroundColor: color }}
				/>
			)}
		</div>
	);
};

export default ColorChooser;