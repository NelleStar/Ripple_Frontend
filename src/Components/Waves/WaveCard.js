import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";

import NewCommentForm from "../../Forms/CommentForms/NewCommentForm";
import RippleApi from "../../apiRipple";

import "./WaveCard.css";

function WaveCard({ wave, handleDeleteComment }) {
  // console.log("WaveCard is rendering");

  const navigate = useNavigate();
  const waveId = wave.waveId || wave.wave_id;
  const waveString = wave.waveString || wave.wave_string;
  const createdAt = wave.createdAt || wave.created_at;

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState(wave.comments || []);

  const toggleCommentForm = () => {
    setShowCommentForm((prevState) => !prevState);
  }

  const handleCommentAdded = (newCommentData) => {
    console.log(`newCommentData from handleCommentAdded:`, newCommentData);
    const { comment_string, username } = newCommentData.newComment;
    console.log("New comment added:", comment_string, "by", username)
    setComments((prevComments) => [...prevComments, newCommentData]);
  }

  const handleCommentDelete = async (waveId, commentId) => {
    console.log("WaveCard.handleCommentDelete with commentID:", commentId);
    try {
      const res = await handleDeleteComment(waveId, commentId);
      console.log("WaveCard handleCommentDelete res:", res);
      setComments(res.user)
    } catch (err) {
      console.error("WaveCard Error handleCommentDelete:", err);
    }
  };

  const handleDelete = async () => {
    console.log("WaveCard.handleDelete with ID:", waveId);
    try {
      await RippleApi.deleteWave(waveId)
    } catch(err) {
      console.error(`Error handleDelete:`, err)
    }
  };

  return (
    <Card className="wave-card">
      <CardBody className="wave-content">
        <div className="wave-header">
          <CardTitle className="wave-string">
            <span className="wave-text">{waveString}</span>
          </CardTitle>
          <div className="created-at">
            <span>
              {wave.username} at {new Date(createdAt).toLocaleString()}
            </span>
          </div>
        </div>
        <div>
          <h6>Comments:</h6>
          <ul>
            {wave.comments &&
              wave.comments.map((comment, index) => (
                <div key={index} className="comment-wrapper">
                  <li className="comment-item">
                    <span className="comment-username">{comment.username}</span>{" "}
                    :{" "}
                    <span className="comment-text">
                      {comment.commentString}
                    </span>
                    <div>
                      <Button
                        onClick={() =>
                          handleCommentDelete(waveId, comment.commentId)
                        }
                        className="delete-button"
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                </div>
              ))}
          </ul>
        </div>

        <div className="add-comment-button-container">
          <Button onClick={toggleCommentForm} className="add-comment-button">
            {showCommentForm ? "Hide Comment Form" : "Add Comment"}
          </Button>
        </div>

        {showCommentForm && (
          <NewCommentForm
            waveId={wave.waveId}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </CardBody>
    </Card>
  );
}

export default WaveCard;
