import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";
import userContext from "../../userContext";

// Mocking the NavLink component
jest.mock("react-router-dom", () => ({
  NavLink: ({ children, to }) => <div data-testid={to}>{children}</div>,
}));

// Mocking the useContext hook
jest.mock("../../userContext", () => ({
  useContext: jest.fn(),
}));

describe("Home Component", () => {
  it("renders login and signup links when user is not logged in", () => {
    userContext.useContext.mockReturnValue({});

    const { getByText } = render(<Home />);

    expect(getByText("login")).toBeInTheDocument();
    expect(getByText("signup")).toBeInTheDocument();
  });
});
