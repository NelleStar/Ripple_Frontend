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
  const defaultProfilePicUrl = "https://images.unsplash.com/photo-1556197908-96ed0fa30b65?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await RippleApi.request(`users/${username}`);
        setUserData(res.user);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };
    fetchUserData();
  }, [username]);

    const handleDeleteComment = async (waveId, commentId) => {
      try {
        const res = await RippleApi.request(`users/${username}`);
        
        if (res && res.user) {
          setUserData(res.user);
        } else {
          console.error(`UserDetails error: invalid response received`)
        }
      } catch (err) {
        console.error(`Error deleting comment:`, err);
      }
    };

    const handleDeleteWave = async (waveId) => {
      try {
        await RippleApi.deleteWave(waveId);
        const res = await RippleApi.request(`users/${username}`)
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
              <h1 className="UserDetails-title">{userData?.username}</h1> <br />
              <img
                className="user-profile-pic"
                src={userData?.profilePic || defaultProfilePicUrl}
                alt="profilePic"
              />
              <br />
              {isOwnProfile && ( // Show "Edit Profile" link only if it's the user's own profile
                <Link to={`/users/${username}/edit`}>Edit Profile</Link>
              )}
            </div>

            <div className="WaveList">
              <h2 className="WaveList-title">Waves</h2>
              {isOwnProfile && ( 
                <div className="waves-list-new-form">
                  <NewWaveForm />
                </div>
              )}
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
                        <div className="delete-button-wrapper">
                          <button
                            className="delete-button"
                            onClick={() =>
                              handleDeleteWave(wave.wave_id || wave.waveId)
                            }
                          >
                            Delete
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