import { useContext } from "react";
import userContext from "../../userContext";

// Home - welcome back or login/signup depending on user status
function Home() {
  const { token, username } = useContext(userContext);
  console.log("Home '/' currentuser :", username);

  return (
    <div className="home-container">
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
      </div>
    </div>
  );
}

export default Home;