import React from "react";

export default function BlogForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        placeholder="Enter title..."
        value={props.title}
        onChange={(e) => props.setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Enter content..."
        value={props.body}
        onChange={(e) => props.setBody(e.target.value)}
        required
      />
      <button type="submit">
        {props.editMode ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
}
