import PropType from 'prop-types';
import React, { useState } from 'react';

const ColorChooser = ({ availableColors, onSelectedColorChange }) => {
  const [selectedColor, setSelectedColor] = useState('');

  const setColor = (color) => {
    setSelectedColor(color);
    onSelectedColorChange(color);
  };
  return (
    <div className="color-chooser">
      {availableColors.map((color) => (
        <div
          className={selectedColor === color ? 'color-item color-item-selected' : 'color-item'}
          key={color}
          onClick={() => setColor(color)}
          style={{ backgroundColor: color }}
          role="presentation"
        />
      ))}
    </div>
  );
};

ColorChooser.propTypes = {
  availableColors: PropType.arrayOf(PropType.string).isRequired,
  onSelectedColorChange: PropType.func.isRequired
};

export default ColorChooser;
