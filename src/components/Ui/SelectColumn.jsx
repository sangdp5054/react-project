const UiSelectColumn = () => {
    return (
        <select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)}>
            <option value="">Select Column</option>
            {tableHeaders.map((header, index) => (
                <option key={index} value={header}>
                    {header}
                </option>
            ))}
        </select>
    );
};
export default UiSelectColumn;