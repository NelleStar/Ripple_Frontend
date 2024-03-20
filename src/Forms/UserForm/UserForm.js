import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import RippleApi from "../../apiRipple";
import userContext from "../../userContext";

function UserForm({ getUser }) {
    // create state for form, use the params and bring is the user context object
    const [ formData, setFormData ] = useState({});
    const { username } = useParams();
    const user = useContext(userContext);

    // set the initial form data based on the user context
    useEffect(() => {
        setFormData({
            username: user.username,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            profilePic: user.profilePic || "",
        });
    }, [user]);

    // create an object with only the fields that are allowed to be updated
    const patch = async () => {
        const updateData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          profilePic: formData.profilePic
        };

        let res = await RippleApi.patchUser(user.username, updateData);
        console.log(`UserForm patch results`, res);
        getUser(username);
    };

    // on change, update the inputs accordingly by targeting the name and values --- collect the rest of the known data and update to new values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({ ...data, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(formData);
        setFormData({});
    };

    return (
        <div className="UserForm">
            <div className="user-form-container">
                <h3>Update Profile</h3>
                <Form className="user-form-context" onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="userName">Username (cannot change)</Label>
                        <Input 
                            id="userName" 
                            name="userName" 
                            type="text" 
                            value={formData.username || ""} 
                            readOnly 
                        />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input 
                            id="firstName" 
                            name="firstName" 
                            type="text" 
                            value={formData.firstName || ""} 
                            onChange={handleChange} 
                        />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="lasttName">Last Name</Label>
                        <Input 
                            id="lastName" 
                            name="lastName" 
                            type="text" 
                            value={formData.lastName || ""} 
                            onChange={handleChange} 
                        />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email || ""} 
                            onChange={handleChange} 
                        />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="profilePic">Profile Picture URL</Label>
                        <Input 
                            id="profilePic" 
                            name="profilePic" 
                            type="text" 
                            value={formData.profilePic || ""} 
                            onChange={handleChange} 
                        />
                    </FormGroup>
                    <br />
                    <Button>Submit</Button>
                </Form>
            </div>
        </div>
    );
}

export default UserForm;