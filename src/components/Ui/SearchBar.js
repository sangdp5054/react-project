import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function UiSearchBar({ onSearchChange }) {
    return (
        <Form>
            <InputGroup className='my-3'>
                <Form.Control
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder='Search contacts'
                />
            </InputGroup>
        </Form>
    );
}

export default UiSearchBar;