import { useState, useEffect } from "react";
import UserCard from "./UserCard";

import RippleApi from "../../apiRipple";

function UsersList() {
    const [ users, setUsers ] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const usersData = await RippleApi.getUsers();
                console.log(`userData from UsersList:`, usersData);
                setUsers(usersData.users);
            } catch(err) {
                console.error(`Error fetching users:`, err);
                return err;
            }
        }
        fetchUsers();
    }, []);

    return (
        <div className="users-list-container">
            <div className="users-list-content">
                {users && users.map((user) => (
                    <div className="UsersCard" key={user.username}>
                        <UserCard user={user} />
                    </div>    
                ))}
            </div>
        </div>
    )
}

export default UsersList;