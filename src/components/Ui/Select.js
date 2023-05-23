import React from 'react';

const UiSelect = ({ checked, onChange }) => {
    return (
        <input type="checkbox" checked={checked} onChange={onChange} />
    );
};

export default UiSelect;
