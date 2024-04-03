import { render } from "@testing-library/react";
import NewWaveForm from "./NewWaveForm";
import userContext from "../../userContext";
import { BrowserRouter } from "react-router-dom";

//smoke test
it("renders without crashing", () => {
  const user = { username: "user1", token: "abcdefg" };
  render(
    <BrowserRouter>
      <userContext.Provider value={user}>
        <NewWaveForm
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
        <NewWaveForm
          getUser={() => {
            return "User";
          }}
        />
      </userContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment).toMatchSnapshot();
});
