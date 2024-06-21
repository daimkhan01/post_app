import React, { useState } from "react";

function DisplayComments({
  postId,
  comments,
  handleEditComment,
  handleDeleteComment,
}) {
  const [editMode, setEditMode] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [commentText, setCommentText] = useState("");

  const handleEdit = (comment) => {
    setCommentText(comment.text);
    setEditMode(true);
    setEditCommentId(comment.id);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    handleEditComment(postId, editCommentId, commentText);
    setEditMode(false);
    setEditCommentId(null);
    setCommentText("");
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          {editMode && editCommentId === comment.id ? (
            <form onSubmit={handleSubmitEdit}>
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <>
              <p>{comment.text}</p>
              <button className="btn" onClick={() => handleEdit(comment)}>
                Edit
              </button>
              <button
                className="btn"
                onClick={() => handleDeleteComment(postId, comment.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default DisplayComments;
