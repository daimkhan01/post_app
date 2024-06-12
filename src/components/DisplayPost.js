import React from "react";

export default function DisplayPost(props) {
  return (
    <div className="posts">
      {props.posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => props.handleEdit(post)}>Edit</button>
          <button onClick={() => props.handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
