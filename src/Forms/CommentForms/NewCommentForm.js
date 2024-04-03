import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RippleApi from "../../apiRipple";
import "./NewCommentForm"

function NewCommentForm({ waveId, onCommentAdded }) {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const newComment = async () => {
    try {
        let res = await RippleApi.postComment(waveId, formData);
        
        
        if (res) {
            onCommentAdded(res.newComment);
            setFormData({})
        } else {
            alert(`NewCommentForm.newComment(): failed to make new comment`);
        }
    } catch(err) {
        console.error(`Error creating new comment:`, err);
        alert(`Failed to create new comment`);
    }
  }

  // on change, update the inputs accordingly but targeting the name and values, collecting the rest of known data and updating to new values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newComment();
    setFormData({});
  };

  return (
    <div className="new-comment-form-container">
      <div className="new-comment-form-content">
        <h3>New Comment</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="commentString">Comment:</Label>
            <Input
              id="commentString"
              name="commentString"
              type="text"
              value={formData.commentString || ""}
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

export default NewCommentForm;