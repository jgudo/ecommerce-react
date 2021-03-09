import React from 'react';

const InputColor = (props) => {
    const [selectedColor, setSelectedColor] = React.useState('');
    const { name, form, push, remove } = props;

    const handleColorChange = (e) => {
        const val = e.target.value;
        setSelectedColor(val);
    };

    const handleAddSelectedColor = () => {
        if (!form.values[name].includes(selectedColor)) {
            push(selectedColor);
            setSelectedColor('');
        }
    }

    return (
        <div className="d-flex">
            <div className="input-group product-form-field">
                <div className="d-flex">
                    {form.touched[name] && form.errors[name] ? (
                        <span className="label-input label-error">{form.errors[name]}</span>
                    ) : (
                        <label className="label-input" htmlFor={name}>Available Colors</label>
                    )}
                    {selectedColor && (
                        <>
                            <div className="color-item" style={{ background: selectedColor }} />
                            <h4
                                className="text-link"
                                onClick={handleAddSelectedColor}
                                style={{ textDecoration: 'underline' }}
                            >
                                <i className="fa fa-check" /> Add Selected Color
                            </h4>
                        </>
                    )
                    }
                </div>
                <input
                    name={name}
                    type="color"
                    value={selectedColor}
                    onChange={handleColorChange}
                    id={name}
                />
            </div>
            <div className="product-form-field">
                <span className="d-block padding-s">Selected Color(s)</span>
                <div className="color-chooser">
                    {form.values[name]?.map((color, index) => (
                        <div
                            key={color}
                            onClick={() => remove(index)}
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
