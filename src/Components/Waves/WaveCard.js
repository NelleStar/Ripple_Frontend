import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";

import NewCommentForm from "../../Forms/CommentForms/NewCommentForm";
import RippleApi from "../../apiRipple";

import "./WaveCard.css";

function WaveCard({ wave, loggedInUser }) {
  const navigate = useNavigate();
  const waveId = wave.waveId || wave.wave_id;
  const waveString = wave.waveString || wave.wave_string;
  const createdAt = wave.createdAt || wave.created_at || wave.createdat;

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState(wave.comments || []);

  const toggleCommentForm = () => {
    setShowCommentForm((prevState) => !prevState);
  };

  const handleCommentAdded = (newCommentData) => {
    const { comment_string, username } = newCommentData;
    setComments([...comments, newCommentData]);
  };

  const handleDelete = async (commentId) => {
    try {
      await RippleApi.deleteComment(waveId, commentId);
      setComments(comments.filter(comment => (comment.commentId || comment.comment_id) !== commentId))
    } catch (err) {
      console.error(`Error handleDelete:`, err);
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
            {comments &&
            comments.map((comment, index) => (
                <div key={index} className="comment-wrapper">
                  <li className="comment-item">
                    <span className="comment-username">{comment.username}</span>{" "}
                    :{" "}
                    <span className="comment-text">
                      {comment.commentString || comment.comment_string}
                    </span>
                    <div>
                      {comment.username === loggedInUser && (
                        <Button
                          onClick={() =>
                            handleDelete(comment.commentId || comment.comment_id)
                          }
                          className="delete-button"
                        >
                          Delete
                        </Button>
                      )}
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
