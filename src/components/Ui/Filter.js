import React from 'react';
import { Dropdown } from 'react-bootstrap';

function UiFilter({ filter, onFilterChange }) {
    const handleFilterChange = (eventKey) => {
        onFilterChange(eventKey);
    };

    return (
        <Dropdown onSelect={handleFilterChange}>
            <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                Filter partnerType
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey='all'>All</Dropdown.Item>
                <Dropdown.Item eventKey='active'>Công ty</Dropdown.Item>
                <Dropdown.Item eventKey='inactive'>Khách lẻ</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default UiFilter;