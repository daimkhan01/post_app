import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogForm from "./components/BlogForm";
import DisplayPost from "./components/DisplayPost";

function App() {
  // State to manage posts
  const [posts, setPosts] = useState([]);

  // State to manage form input
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // State to manage editing mode
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // posts from API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error("Error posts:", error);
      });
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      // Update existing post
      const updatedPosts = posts.map((post) => {
        if (post.id === editId) {
          return {
            ...post,
            title,
            body,
          };
        }
        return post;
      });
      setPosts(updatedPosts);
      setEditMode(false);
      setEditId(null);
    } else {
      // Create new post
      const newPost = {
        id: posts.length + 1,
        title: title,
        body: body,
      };
      setPosts([newPost, ...posts]);
    }
    // Clear the form fields
    setTitle("");
    setBody("");
  };

  // Function to delete a post
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // Function to edit a post
  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditMode(true);
    setEditId(post.id);
  };

  return (
    <div className="App">
      <h1>Simple Blog</h1>
      <BlogForm
        body={body}
        title={title}
        setBody={setBody}
        setTitle={setTitle}
        editMode={editMode}
        handleSubmit={handleSubmit}
      />
      <DisplayPost
        posts={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
