import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import UiFavorite from '../Ui/Favorite';
import UicolumnConfig from '../Ui/columnConfig';
import UiFilterConfig from '../Ui/FilterConfig';
import UiPerPage from '../Ui/PerPage';
function UserList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [selectedUsers, setSelectedUsers] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [groupByAttribute, setGroupByAttribute] = useState('');
    const [expandedGroups, setExpandedGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [favoriteName, setFavoriteName] = useState('');
    // // Fetch users from the API
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const response = await ApiUser.getAll();
    //         const initialSelectedUsers = response.data.reduce((acc, user) => {
    //             acc[user.id] = false;
    //             return acc;
    //         }, {});
    //         setSelectedUsers(initialSelectedUsers);
    //         setUsers(response.data);
    //         console.log(response)
    //     };
    //     fetchUsers();
    // }, []);

    // Fetch users from the API
    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/data');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();

            const initialSelectedUsers = data.reduce((acc, user) => {
                acc[user.id] = false;
                return acc;
            }, {});
            setSelectedUsers(initialSelectedUsers);
            setUsers(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Handle filter change
    const handleFilterChange = useCallback((eventKey) => {
        setFilter(eventKey);
    }, []);


    // Apply search and filter on users
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const filterFunction = UiFilterConfig[filter]?.filterFunction;
            return filterFunction ? filterFunction(user) : true;
        }).filter((user) =>
            user.partnerName.toLowerCase().includes(search.toLowerCase())
        );
    }, [users, filter, search]);
    // Pagination
    //Tính tổng số trang
    const totalPages = useMemo(() => {
        return Math.ceil(filteredUsers.length / usersPerPage);
    }, [filteredUsers.length, usersPerPage]);
    //Lấy danh sách người dùng hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = useMemo(() => {
        return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    }, [filteredUsers, indexOfFirstUser, indexOfLastUser]);
    // Handle page change
    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);
    // Handle users per page change
    const handleUsersPerPageChange = useCallback((value) => {
        setUsersPerPage(value);
        setCurrentPage(1);// Reset current page when the number of users per page changes
    }, []);
    // Handle user selection
    const handleUserSelect = useCallback((userId) => {
        setSelectedUsers((prevState) => ({
            ...prevState,
            [userId]: !prevState[userId]
        }));
    }, []);
    // Handle "Select All" checkbox
    const handleSelectAll = useCallback(() => {
        const allSelected = !selectAll;
        setSelectAll(allSelected);
        const updatedSelectedUsers = {};
        Object.keys(selectedUsers).forEach((userId) => {
            updatedSelectedUsers[userId] = allSelected;
        });
        setSelectedUsers(updatedSelectedUsers);
    }, [selectAll, selectedUsers]);
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
    // Filter grouped data based on search and filter
    const filterGroupedData = () => {
        const filteredData = {};

        Object.entries(groupedData).forEach(([groupKey, groupUsers]) => {
            const filteredUsers = groupUsers.filter(user =>
                user.partnerName.toLowerCase().includes(search.toLowerCase())
            );

            if (filter === 'all') {
                if (filteredUsers.length > 0) {
                    filteredData[groupKey] = filteredUsers;
                }
            } else {
                const filterFunction = UiFilterConfig[filter]?.filterFunction;
                if (filterFunction) {
                    const filteredGroupUsers = filteredUsers.filter(filterFunction);
                    if (filteredGroupUsers.length > 0) {
                        filteredData[groupKey] = filteredGroupUsers;
                    }
                }
            }
        });

        setFilteredGroups(filteredData);
    };
    useEffect(() => {
        filterGroupedData();
    }, [search, filter, groupedData]);
    // Save favorite
    const saveFavorite = () => {
        const newFavorite = {
            name: favoriteName,
            search,
            filter,
            groupBy: groupByAttribute,
        };
        setFavorites([...favorites, newFavorite]);
        setFavoriteName('');
    };

    // Load favorite
    const loadFavorite = (favorite) => {
        setSearch(favorite.search);
        setFilter(favorite.filter);
        setGroupByAttribute(favorite.groupBy);
    };
    // Before the return statement
    const handleFavoriteNameChange = useCallback((event) => {
        setFavoriteName(event.target.value);
    }, []);
    // Reset tìm kiếm, bộ lọc và nhóm theo
    const resetFilters = () => {
        setSearch('');
        setFilter('all');
        setGroupByAttribute('');
        setExpandedGroups([]);
        setFilteredGroups({});
    };
    // Reset danh sách người dùng đã lọc về danh sách ban đầu
    const handleReset = () => {
        setUsers(users);
        setCurrentPage(1);
        resetFilters();
    };

    // Get table headers from the column configuration
    const tableHeaders = Object.keys(UicolumnConfig);
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

                    {/* Save and Load Favorites */}
                    <UiFavorite
                        favorites={favorites}
                        favoriteName={favoriteName}
                        onFavoriteNameChange={handleFavoriteNameChange}
                        saveFavorite={saveFavorite}
                        loadFavorite={loadFavorite}
                        reset={resetFilters}
                    />
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
                                    <th key={index}>{UicolumnConfig[header]}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {groupByAttribute
                                ? Object.entries(filteredGroups).map(([groupKey, groupUsers], index) => (
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
                    {/* Users Per Page */}
                    <UiPerPage
                        value={usersPerPage}
                        options={[5, 10, 15]}
                        onSelectChange={handleUsersPerPageChange}
                    />
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






