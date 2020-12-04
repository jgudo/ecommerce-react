import React from 'react';

const InputColor = ({ availableColors, onColorSelectChange, onDeleteSelectedColor, onAddSelectedColor }) => {
    const [selectedColor, setSelectedColor] = React.useState('');

    const handleColorChange = (e) => {
        const color = e.target.value;
        console.log(color)
        setSelectedColor(color);
    };

    const handleAddSelectedColor = () => {
        onAddSelectedColor(selectedColor);
        setSelectedColor('');
    }

    return (
        <div className="d-flex">
            <div className="product-form-field">
                <span className="d-block padding-s">Available Color(s)</span>
                <div className="d-flex">
                    <label htmlFor="color-chooser">Select Color</label>
                    {selectedColor && (
                        <>
                            <div className="color-item" style={{ background: selectedColor }} />
                            <h4 className="text-link" onClick={handleAddSelectedColor} style={{ textDecoration: 'underline' }}>
                                <i className="fa fa-check" /> Add Selected Color
                            </h4>
                        </>
                    )
                    }
                </div>
                <input type="color" value={selectedColor} hidden onChange={handleColorChange} id="color-chooser" />
            </div>
            <div className="product-form-field">
                <span className="d-block padding-s">Selected Color(s)</span>
                <div className="color-chooser">
                    {availableColors.map(color => (
                        <div
                            key={color}
                            onClick={() => onDeleteSelectedColor(color)}
                            className="color-item color-item-deletable"
                            title={`Remove ${color}`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InputColor;
