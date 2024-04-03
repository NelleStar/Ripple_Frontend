import { render } from "@testing-library/react";
import UserDetails from "./UserDetails";

it("renders without crashing", () => {
  render(
    <UserDetails />
  );
});

it("matches Snapshot", () => {
  const { asFragment } = render(
    <UserDetails />
  );
  expect(asFragment).toMatchSnapshot();
});
