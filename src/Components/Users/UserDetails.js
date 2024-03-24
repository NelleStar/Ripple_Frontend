import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import RippleApi from "../../apiRipple";
import userContext from "../../userContext";
import UserCard from "./UserCard";
import WaveCard from "../Waves/WaveCard";
import NewWaveForm from "../../Forms/WaveForm/NewWaveForm";

import "./UserDetails.css";

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

    const handleDeleteComment = async (waveId, commentId) => {
      console.log(`UserDetails handleDeleteComment commentId and waveId:`, commentId, waveId);
      try {
        console.log(`Entering handleDeleteComment in UserDetails.js`, commentId)
        const res = await RippleApi.request(`users/${username}`);
        
        if (res && res.user) {
          console.log(`UserDetails handleDeleteComment res:`, res);
          setUserData(res.user);
        } else {
          console.error(`UserDetails error: invalid response received`)
        }
      } catch (err) {
        console.error(`Error deleting comment:`, err);
      }
    };

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
          <div className="columns-container">
            <div className="UserDetails">
              <h1 className="UserDetails-title">
                Welcome back, {userData?.username}
              </h1>{" "}
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

            <div className="WaveList">
              <h2 className="WaveList-title">Waves</h2>
              <div className="waves-list-new-form">
                <NewWaveForm />
              </div>
              <div className="waves-list">
                {userData && userData.waves ? (
                  userData.waves.map((wave) => (
                    <div key={wave.wave_id}>
                      <WaveCard
                        key={wave.wave_id}
                        wave={wave}
                        handleDeleteComment={(commentId) =>
                          handleDeleteComment(wave.wave_id, commentId)
                        }
                      />

                      {isOwnProfile && (
                        <div>
                          <button
                            onClick={() => handleDeleteWave(wave.wave_id)}
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => console.log("Navigate to edit form")}
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
    </div>
  );
}

export default UserDetails;