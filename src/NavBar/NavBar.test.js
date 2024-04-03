import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";

// Smoke Test

it("renders without crashing", () => {
  render(
    <BrowserRouter>
      <NavBar
        user={{ username: "user1", token: "abcdef" }}
        logOut={() => {
          return "logOut";
        }}
      />
    </BrowserRouter>
  );
});

// Snapshot Test

it("matches Snapshot", () => {
  const { asFragement } = render(
    <BrowserRouter>
      <NavBar
        user={{ username: "user1", token: "abcdefg" }}
        logOut={() => {
          return "logOut";
        }}
      />
    </BrowserRouter>
  );
  expect(asFragement).toMatchSnapshot();
});
