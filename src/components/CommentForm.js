import React, { useState } from "react";

function CommentForm({ postId, handleAddComment }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: Date.now(),
      text: comment,
    };
    handleAddComment(postId, newComment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          className="coment"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comments..."
          required
        />
        <button type="submit">Add Comment</button>
      </div>
    </form>
  );
}

export default CommentForm;
