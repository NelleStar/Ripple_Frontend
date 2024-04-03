import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import userContext from "../../userContext";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

//smoke test
it("renders without crashing", () => {
  const user = { username: "user1", token: "abcdefg" };
  render(
    <BrowserRouter>
      <userContext.Provider value={user}>
        <LoginForm
          getUser={() => {
            return "User";
          }}
        />
      </userContext.Provider>
    </BrowserRouter>
  );
});

//snapshot test
it("matches snapshot", () => {
  const user = { username: "user1", token: "abcdefg" };
  const { asFragment } = render(
    <BrowserRouter>
      <userContext.Provider value={user}>
        <LoginForm
          getUser={() => {
            return "User";
          }}
        />
      </userContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment).toMatchSnapshot();
});
