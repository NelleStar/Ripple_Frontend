import { render } from "@testing-library/react";
import UserForm from './UserForm';
import userContext from "../../userContext";
import { BrowserRouter } from "react-router-dom";

//smoke test
it ('renders without crashing', () => {
    const user = { username: "user1", token: "abcdefg"};
    render (
        <BrowserRouter>
            <userContext.Provider value={user}>
                <UserForm getUser={() => {return "User"}}/>
            </userContext.Provider>
        </BrowserRouter>
    )
});

it('matches snapshot', () => {
    const user = { username: "user1", token: "abcdefg" };
    const {asFragment} = render(
        <BrowserRouter>
            <userContext.Provider value={user}>
                <UserForm getUser={() => {return "User"}}/>
            </userContext.Provider>
        </BrowserRouter>
    )
    expect(asFragment).toMatchSnapshot();
})