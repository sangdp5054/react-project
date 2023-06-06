import React from 'react';
import { Dropdown } from 'react-bootstrap';
import UiFilterConfig from './FilterConfig';
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
                {Object.keys(UiFilterConfig).map((option) => (
                    <Dropdown.Item key={option} eventKey={option}>
                        {UiFilterConfig[option].label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default UiFilter;