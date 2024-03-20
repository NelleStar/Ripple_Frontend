import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import RippleApi from "../../apiRipple";
import userContext from "../../userContext";

function UserDetails() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const currentUser = useContext(userContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await RippleApi.request(`users/${username}`);
        console.log(`getUserData results:`, res);
        setUserData(res.user);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };
    fetchUserData();
  }, [username]);

  // Check if userData exists and the current user is viewing their own profile
  const isOwnProfile = userData && currentUser.username === userData.username;

  return (
    <div className="user-details-container">
      <div className="user-details-content">
        <div className="UserDetails">
          <div className="UserInfo">
            <h1>{userData?.username}</h1>{" "}
            <br />
            <img
              className="user-profile-pic"
              src={userData?.profilePic}
              alt="profilePic"
            />
            <br />
            {isOwnProfile && ( // Show "Edit Profile" link only if it's the user's own profile
              <Link to={`/users/${username}/edit`}>Edit Profile</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;