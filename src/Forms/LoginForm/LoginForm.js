import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RippleApi from "../../apiRipple";

import "./LoginForm.css";

// LoginForm for returning user being passed logIn prop from App.js
function LoginForm({ logIn }) {
  //create state
  const [formData, setFormData] = useState({ username: "", password: "" });

  // allow for navigations
  const navigate = useNavigate();

  // login using async to Ripple api login method - console.log results - if there is a res and it has a token -- call the prop that was passed down from App.js
  const login = async () => {
    let res = await RippleApi.loginUser(formData);
    console.log(`LoginForm login results:`, res);
    if (res && res.token) {
      logIn({ username: formData.username, token: res.token });
      navigate(`/users/${formData.username}`);
    } else {
      alert(`Invalid username/password`);
    }
  };

  // on change, update the inputs accordingly but targeting the name and values, collecting the rest of known data and updating to new values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // on submit, prevent default, call login method, set form back to empty strings
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    setFormData({ username: "", password: "" });
  };

  return (
    <div className="login-form-container">
      <div className="login-form-content">
        <h3 className="login-form-title">Login</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="input">
            <Label for="userName">Username</Label>
            <Input
              id="userName"
              name="username"
              type="text"
              value={formData.username || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="input">
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <div className="submit-button-wrapper">
            <Button className="submit-button">Submit</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
