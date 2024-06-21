import React from "react";
import CommentForm from "./CommentForm";
import DisplayComments from "./DisplayComments";

function DisplayPost({
  posts,
  handleEdit,
  handleDelete,
  handleAddComment,
  handleEditComment,
  handleDeleteComment,
}) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => handleEdit(post)}>Edit</button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
          <CommentForm postId={post.id} handleAddComment={handleAddComment} />
          <DisplayComments
            postId={post.id}
            comments={post.comments}
            handleEditComment={handleEditComment}
            handleDeleteComment={handleDeleteComment}
          />
        </div>
      ))}
    </div>
  );
}

export default DisplayPost;
