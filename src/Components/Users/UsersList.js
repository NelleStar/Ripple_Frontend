import { useState, useEffect, useContext } from "react";
import UserCard from "./UserCard";
import userContext from "../../userContext";

import RippleApi from "../../apiRipple";
import './UserCard.css'

import "./UserList.css"

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
          <div className="users-list-header">
            <h1 className="users-list-title">User Pool</h1>
            <p>Come splash around!</p>
          </div>
          <div className="users-list-map">
            {users &&
              users.map((user) => (
                <div className="UsersCard" key={user.username}>
                  <UserCard user={user} />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
}

export default UsersList;