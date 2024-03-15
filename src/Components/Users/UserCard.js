import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { NavLink } from "react-router-dom";


function UserCard({ user }) {
  return (
    <Card className="user-card">
      <CardBody>
        <CardTitle tag="h5" className="user-name">
          <NavLink to={`./${user.username}`}>{user.firstName} {user.lastName}</NavLink>
        </CardTitle>
        <CardSubtitle tag="h6" className="user-description">
          {`@ ${user.username}`}
        </CardSubtitle>
      </CardBody>
    </Card>
  );
}

export default UserCard;
