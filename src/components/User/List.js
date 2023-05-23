import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import _ from 'lodash';


import 'bootstrap/dist/css/bootstrap.min.css';

import ApiUser from '../Api/User';
import { UiExcel } from '../Ui/Excel';
import UiSearchBar from '../Ui/SearchBar';
import UiFilter from '../Ui/Filter';
import UiPagination from '../Ui/Pagination';
import UiSelect from '../Ui/Select';
function UserList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const tableHeaders = users.length > 0 ? Object.keys(users[0]) : [];
    const [selectedUsers, setSelectedUsers] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [groupByAttribute, setGroupByAttribute] = useState('');
    const [expandedGroups, setExpandedGroups] = useState([]);


    // Fetch users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await ApiUser.getAll();
            const initialSelectedUsers = response.data.reduce((acc, user) => {
                acc[user.id] = false;
                return acc;
            }, {});
            setSelectedUsers(initialSelectedUsers);
            setUsers(response.data);
            console.log(response)
        };
        fetchUsers();
    }, []);

    // Handle filter change
    const handleFilterChange = (eventKey) => {
        setFilter(eventKey);
    };

    // Apply search and filter on users
    const filteredUsers = users.filter((user) => {
        if (filter === 'all') {
            return true;
        } else if (filter === 'active') {
            return user.statusConfirm === 'Đã Xác nhận';
        } else if (filter === 'inactive') {
            return user.statusConfirm === 'Bản nháp';
        }
    }).filter((user) =>
        user.partnerName.toLowerCase().includes(search.toLowerCase())
    )

    // Pagination
    //Tính tổng số trang
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    //Lấy danh sách người dùng hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle user selection
    const handleUserSelect = (userId) => {
        setSelectedUsers((prevState) => ({
            ...prevState,
            [userId]: !prevState[userId]
        }));
    };
    // Handle "Select All" checkbox
    const handleSelectAll = () => {
        const allSelected = !selectAll;
        setSelectAll(allSelected);
        const updatedSelectedUsers = {};
        Object.keys(selectedUsers).forEach((userId) => {
            updatedSelectedUsers[userId] = allSelected;
        });
        setSelectedUsers(updatedSelectedUsers);
    };
    // Export selected users to Excel   
    const handleExportToExcel = () => {
        const selectedUserIds = Object.keys(selectedUsers).filter((userId) => selectedUsers[userId]);
        const selectedUsersData = users.filter((user) => selectedUserIds.includes(user.id));
        UiExcel(selectedUsersData);
    };

    // Group users by the selected attribute
    const groupedData = _.groupBy(users, groupByAttribute);

    // Handle group by attribute change
    const handleGroupByChange = (event) => {
        const attribute = event.target.value;
        setGroupByAttribute(attribute);
    };
    // Handle expanding/collapsing a group
    const toggleGroup = (groupKey) => {
        if (expandedGroups.includes(groupKey)) {
            setExpandedGroups((prevExpandedGroups) =>
                prevExpandedGroups.filter((key) => key !== groupKey)
            );
        } else {
            setExpandedGroups((prevExpandedGroups) => [...prevExpandedGroups, groupKey]);
        }
    };
    return (
        <div>
            <Container>

                <h1>Danh sách</h1>
                <div className='d-flex justify-content-between align-items-center'>
                    {/* Search */}
                    <UiSearchBar onSearchChange={setSearch} />
                    {/* Excel */}
                    <button onClick={handleExportToExcel}>Export to Excel</button>
                    {/* Filter */}
                    <UiFilter filter={filter} onFilterChange={handleFilterChange} />
                    {/* Group By */}
                    <select value={groupByAttribute} onChange={handleGroupByChange}>
                        <option value="">Group By</option>
                        {tableHeaders.map((header, index) => (
                            <option key={index} value={header}>
                                {header}
                            </option>
                        ))}
                    </select>

                </div>

                <div className='table-responsive'>
                    <Table striped bordered hover>
                        <thead class="table-dark">
                            <tr>
                                <th>
                                    <UiSelect
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                {tableHeaders.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {groupByAttribute
                                ? Object.entries(groupedData).map(([groupKey, groupUsers], index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <th colSpan={tableHeaders.length + 1} className="group-row">
                                                <div
                                                    className={`group-toggle ${expandedGroups.includes(groupKey) ? 'expanded' : ''}`}
                                                    onClick={() => toggleGroup(groupKey)}
                                                >
                                                    {groupKey}
                                                </div>
                                            </th>
                                        </tr>
                                        {expandedGroups.includes(groupKey) &&
                                            groupUsers.map((user, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <UiSelect
                                                            checked={selectedUsers[user.id]}
                                                            onChange={() => handleUserSelect(user.id)}
                                                        />
                                                    </td>
                                                    {tableHeaders.map((header, index) => (
                                                        <td key={index}>{user[header]}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                    </React.Fragment>
                                ))
                                : currentUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>
                                            <UiSelect
                                                checked={selectedUsers[user.id]}
                                                onChange={() => handleUserSelect(user.id)}
                                            />
                                        </td>
                                        {tableHeaders.map((header, index) => (
                                            <td key={index}>{user[header]}</td>
                                        ))}
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>

                <div class="pagination justify-content-center">
                    <UiPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </Container>
        </div>

    );
}

export default UserList;





