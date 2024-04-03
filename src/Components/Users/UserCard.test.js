import React from "react";
import { render } from "@testing-library/react";
import UserCard from "./UserCard";

// Mocking the NavLink component
jest.mock("react-router-dom", () => ({
  NavLink: ({ children, to }) => <a href={to}>{children}</a>,
}));

describe("UserCard Component", () => {
  it("renders user information correctly", () => {
    const user = {
      username: "user1",
      firstName: "Test",
      lastName: "User1",
      profilePic: "https://images.unsplash.com/photo-1556197908-96ed0fa30b65?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };

    const { getByText, getByAltText } = render(<UserCard user={user} />);

    expect(getByText("Test User1")).toBeInTheDocument();
    expect(getByAltText("Profile")).toBeInTheDocument();
    expect(getByText("@ user1")).toBeInTheDocument();
  });
});
