import React from 'react';
import Form from 'react-bootstrap/Form';

function UiPerPage({ value, options, onSelectChange }) {
    const handleSelectChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        onSelectChange(selectedValue);
    };

    return (
        <Form.Group controlId="selectControl">
            <Form.Control as="select" value={value} onChange={handleSelectChange}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
}

export default UiPerPage;
