import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";

import NewCommentForm from "../../Forms/CommentForms/NewCommentForm";
import RippleApi from "../../apiRipple";

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
      <CardBody>
        <CardTitle tag="h5" className="wave-string">
          {waveString}
        </CardTitle>
        <CardSubtitle tag="h6" className="created-at">
          {wave.username} at 
          {new Date(createdAt).toLocaleString()}
        </CardSubtitle>
        <div>
          <h6>Comments:</h6>
          <ul>
            {wave.comments &&
              wave.comments.map((comment, index) => (
                <li key={index}>
                  <strong>{comment.username}</strong> : {comment.commentString}
                  <Button onClick={() => handleCommentDelete(waveId, comment.commentId)}>
                    Delete Comment
                  </Button>
                </li>
              ))}
          </ul>
        </div>

        <Button onClick={toggleCommentForm}>
          {showCommentForm ? "Hide Comment Form" : "Add Comment"}
        </Button>

        {/* Render the comment form if showCommentForm is true */}
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
