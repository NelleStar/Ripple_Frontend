import { useState } from "react";

function WavesCommentForm({ onSubmit }) {
    const [ comment, setComment ] = useState("");

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(comment);
        setComment("");
    }
}