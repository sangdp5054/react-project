import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const UiPagination = ({ currentPage, totalPages, handlePageChange }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <BootstrapPagination.Item
                key={i}
                active={i === currentPage}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </BootstrapPagination.Item>
        );
    }

    return (
        <BootstrapPagination>
            <BootstrapPagination.First
                disabled={currentPage === 1}
                onClick={() => handlePageChange(1)}
            />
            <BootstrapPagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
            />
            {pages}
            <BootstrapPagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            />
            <BootstrapPagination.Last
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(totalPages)}
            />
        </BootstrapPagination>
    );
};

UiPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
};

export default UiPagination;
