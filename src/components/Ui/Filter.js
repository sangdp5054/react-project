import React from 'react';
import { Dropdown } from 'react-bootstrap';

function UiFilter({ filter, onFilterChange }) {
    const handleFilterChange = (eventKey) => {
        onFilterChange(eventKey);
    };

    return (
        <Dropdown onSelect={handleFilterChange}>
            <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey='all'>All</Dropdown.Item>
                <Dropdown.Item eventKey='active'>Đã xác nhận</Dropdown.Item>
                <Dropdown.Item eventKey='inactive'>Bản nháp</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default UiFilter;