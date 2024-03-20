import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { NavLink } from "react-router-dom";

function WaveCard({ wave }) {
    return (
      <Card className="wave-card">
        <CardBody>
          <CardTitle tag="h5" className="wave-string">
            {wave.waveString}
          </CardTitle>
          <CardSubtitle tag="h6" className="created-at">
            {new Date(wave.createdAt).toLocaleString()}
          </CardSubtitle>
          <div>
            <h6>Comments:</h6>
            <ul>
                {wave.comments.map((comment, index) => ( 
                    <li key={index}>
                        <strong>{comment.username}</strong> : {comment.commentString}
                    </li>
                ))}
            </ul>
          </div>
        </CardBody>
      </Card>
    );
}

export default WaveCard;