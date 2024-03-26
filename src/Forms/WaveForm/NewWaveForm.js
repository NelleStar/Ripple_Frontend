import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import RippleApi from "../../apiRipple";
import userContext from "../../userContext";

import "./NewWaveForm.css"

function NewWaveForm( {addWave} ) {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const { username, token } = useContext(userContext);

    const newWave = async () => {
        try {
            if (!formData || !formData.waveString) {
                console.error("Wave string is missing in formData:", formData);
                return;
            }

            let res = await RippleApi.postWave(formData);
            console.log(`NewWaveForm newWave res:`, res.wave);

            if (res) {
                console.log(`Wave created successfully`);
                addWave(res.wave)
                setFormData({});
            } else {
                alert(`Failed to create new wave`);
            }
        } catch (err) {
            console.error(`Error creating new wave:`, err);
            alert(`Failed to create new wave`);
        }
    };



    // on change, update the inputs accordingly by targeting the name and values, collecting the rest of the known data and updating to new values
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`NAME: ${name} VALUE:${value}`)
        setFormData((data) => ({ ...data, [name]:value }));
        console.log("Updated formData:", { ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("NewWaveForm Data:", formData);
        newWave();
        setFormData({});
    }

    return (
      <div className="new-wave-form-container">
        <div className="new-wave-form-content">
          <h3 className="form-title">New Wave</h3>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="waveString">Add your drop: </Label>
              <Input
                id="waveString"
                name="waveString"
                type="text"
                value={formData.waveString || ""}
                onChange={handleChange}
              />
            </FormGroup>
            <Button className="submit-button">Submit</Button>
          </Form>
        </div>
      </div>
    );
}

export default NewWaveForm;