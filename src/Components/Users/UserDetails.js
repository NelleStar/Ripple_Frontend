import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import RippleApi from "../../apiRipple";
import userContext from "../../userContext";
import UserCard from "./UserCard";
import WaveCard from "../Waves/WaveCard";

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

    const handleDeleteWave = async (waveId) => {
      console.log(`handleDeleteWave:`, waveId);
      try {
        await RippleApi.deleteWave(waveId);
        const res = await RippleApi.request(`users/${username}`)
        console.log(`handleDeleteWave res:`, res);
        setUserData(res.user);
      } catch (err) {
        console.error(`Error deleting wave:`, err);
      }
    };

  // Check if userData exists and the current user is viewing their own profile
  const isOwnProfile = userData && currentUser.username === userData.username;

  return (
    <div className="user-details-container">
      <div className="user-details-content">
        <div className="UserProfile">
          <div className="UserInfo">
            <div className="UserDetails">
              <h1>{userData?.username}</h1> <br />
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

            <div className="WaveList">
              <h2>Waves</h2>
              {userData && userData.waves ? (
                userData.waves.map((wave) => (
                  <div key={wave.wave_id}>
                    <WaveCard wave={wave} />
                    {isOwnProfile && (
                      <div>
                        <button onClick={() => handleDeleteWave(wave.wave_id)}>
                          Delete
                        </button>
                        <button onClick={() => console.log("Navigate to edit form")}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No waves found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;