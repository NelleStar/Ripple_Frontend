import { useContext } from "react";
import userContext from "../../userContext";
import "./Home.css"

// Home - welcome back or login/signup depending on user status
function Home() {
  const { token, username } = useContext(userContext);
  console.log("Home '/' currentuser :", username);

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <div className="home-content">
          <h1>Ripple</h1>
          <p>Where the smallest drop can make a wave!</p>
          {token ? (
            <p>Welcome Back, {username}!</p>
          ) : (
            <p>
              <a href="/login">Log In</a>
              <a href="/signup">Sign Up</a>
            </p>
          )}

          <h3>Coming Soon</h3>
          <p>Online photo albums. Keep all your favorite memories alive in one space.</p>
          <p>Add Music to your profile. Listen to your favorites while making waves.</p>
          <p>Update your profile to be more personal. Add about me sections to help others learn more about you.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;