import React, { useState, useEffect } from 'react';
import userApi from '../api/userApi';

function ListUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await userApi.getAll();
            setUsers(response.data);
            console.log(response)
        };

        fetchUsers();
    }, []);
    return (
        <div>
            {users.map((user) => (
                <div key={user.id}>
                    <p>Card Id</p>
                    <p>{user.cardID}</p>
                    <p>partner Name</p>
                    <p>{user.partnerName}</p>
                </div>
            ))}
        </div>
    );
}

export default ListUser;






