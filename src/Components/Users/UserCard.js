import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { NavLink } from "react-router-dom";

// Default profile picture URL
const defaultProfilePicUrl =
  "https://images.unsplash.com/photo-1556197908-96ed0fa30b65?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function UserCard({ user }) {
  return (
    <Card className="user-card">
      <CardBody>
        <CardTitle tag="h5" className="user-name">
          <NavLink to={`./${user.username}`}>
            {user.firstName} {user.lastName}
          </NavLink>
        </CardTitle>
        <img
          src={user.profilePic || defaultProfilePicUrl} // Use default profile pic if user.profilePic is not available
          alt="Profile"
          className="user-profile-pic"
        />
        <CardSubtitle tag="h6" className="user-description">
          {`@ ${user.username}`}
        </CardSubtitle>
      </CardBody>
    </Card>
  );
}

export default UserCard;
