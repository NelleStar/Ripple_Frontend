import React, { useContext } from "react";
import { Navbar, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import userContext from "../userContext";
import logoImage from "../Assets/image/Ripple.png";
import profileImage from "../Assets/image/app_icon.png";
import wavesImage from "../Assets/image/waves.png";
import usersImage from "../Assets/image/people.png";
import "./NavBar.css"; 

function NavBar({ logOut }) {
  const { token, username } = useContext(userContext);

  return (
    <div className="navbar-container">
      <Navbar expand="md" className="custom-navbar">
        <div className="NavbarBrand">
          <div className="links-container-left">
            {token && (
              <>
                <div className="nav-item-wrapper-about">
                  <NavLink to={`/`}>
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="profile-image"
                    />
                  </NavLink>
                </div>
                <div className="nav-item-wrapper-waves">
                  {" "}
                  <NavLink to="/waves">
                    <img src={wavesImage} alt="waves" className="waves-image" />
                  </NavLink>
                </div>
              </>
            )}
          </div>
          <div className="logo-container"></div>
          {token && (
            <NavLink to={`/users/${username}`} className="logo-wrapper">
              <img src={logoImage} alt="Ripple Logo" className="logo-image" />
            </NavLink>
          )}
          <div className="links-container-right">
            {token && (
              <>
                <div className="nav-item-wrapper-users">
                  <NavLink to="/users">
                    <img src={usersImage} alt="users" className="users-image" />
                  </NavLink>
                </div>
                <div className="nav-item-wrapper-logout">
                  <NavItem className="logout-link">
                    <NavLink to="/" onClick={logOut}>
                      Log out, {username}
                    </NavLink>
                  </NavItem>
                </div>
              </>
            )}
            {!token && (
              <>
                <div className="nav-item-wrapper-login">
                  <NavItem className="login-link">
                    <NavLink to="/login">Login</NavLink>
                  </NavItem>
                </div>
                <div className="nav-item-wrapper-signup">
                  <NavItem className="signup-link">
                    <NavLink to="/signup">Signup</NavLink>
                  </NavItem>
                </div>
              </>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;
