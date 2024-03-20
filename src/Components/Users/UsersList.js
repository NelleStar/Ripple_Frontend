import { useState, useEffect, useContext } from "react";
import UserCard from "./UserCard";

import RippleApi from "../../apiRipple";
import './UserCard.css'
import userContext from "../../userContext";

function UsersList() {
    const [ users, setUsers ] = useState(null);
    const currentUser = useContext(userContext)

    useEffect(() => {
        async function fetchUsers() {
            try {
                const usersData = await RippleApi.getUsers();
                console.log(`userData from UsersList:`, usersData);

                const filteredUsers = usersData.users.filter(
                    (user) => user.username !== currentUser.username
                )
                setUsers(filteredUsers);
            } catch(err) {
                console.error(`Error fetching users:`, err);
                return err;
            }
        }
        fetchUsers();
    }, [currentUser]);

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