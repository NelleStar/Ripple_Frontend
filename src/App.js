import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import userContext from "./userContext";
import NavBar from "./NavBar/NavBar";
import Home from "./Components/Home/Home";
import UsersList from "./Components/Users/UsersList";
import UserDetails from "./Components/Users/UserDetails";
import WavesList from "./Components/Waves/WavesList";

import LoginForm from "./Forms/LoginForm/LoginForm";
import SignUpForm from "./Forms/SignUpForm/SignUpForm";
import UserForm from "./Forms/UserForm/UserForm";

import RippleApi from "./apiRipple";

import "./App.css";
import NewCommentForm from "./Forms/CommentForms/NewCommentForm";
import WaveCard from "./Components/Waves/WaveCard";

// ======================================================================== //

function App() {
  // set state
  const [user, setUser] = useState({});

  // store data for user in state
  const getUser = async (username) => {
    const res = await RippleApi.getUser(username);
    console.log(`App getUser results:`, res);
    setUser({ ...res.user, token: RippleApi.token });
  };

  // collect username and token
  useEffect(() => {
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("token");
    console.log(`App useEffect Username and Token:`, username, token);

    // if both are there update them
    if (username && token) {
      RippleApi.token = token;
      getUser(username);
    } else {
      RippleApi.token = "";
    }
  }, []);

  //update local storage, token and state
  const logIn = (data) => {
    localStorage.setItem("username", data.username);
    localStorage.setItem("token", data.token);
    RippleApi.token = data.token;
    getUser(data.username);
    console.log(`app.js logIn`)
  };

  // log user out
  const logOut = (data) => {
    localStorage.clear();
    RippleApi.token = "";
    setUser({});
    console.log(`app.js logOut`)
  };

  return (
    <div className="App">
      <userContext.Provider value={user}>
        <BrowserRouter>
          <NavBar logOut={logOut} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm logIn={logIn} />} />
              <Route path="/signup" element={<SignUpForm logIn={logIn} />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:username" element={<UserDetails />} />
              <Route
                path="/users/:username/edit"
                element={<UserForm getUser={getUser} />}
              />
              <Route path="/waves" element={<WavesList />} />
              <Route path="*" element={<Navigate to="/"/>}/>            
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
