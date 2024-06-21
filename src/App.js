import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogForm from "./components/BlogForm";
import DisplayPost from "./components/DisplayPost";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data.map((post) => ({ ...post, comments: [] })));
      })
      .catch((error) => {
        console.error("Error posts:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      const updatedPosts = posts.map((post) => {
        if (post.id === editId) {
          return { ...post, title, body };
        }
        return post;
      });
      setPosts(updatedPosts);
      setEditMode(false);
      setEditId(null);
    } else {
      const newPost = {
        id: posts.length + 1,
        title,
        body,
        comments: [],
      };
      setPosts([newPost, ...posts]);
    }

    setTitle("");
    setBody("");
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditMode(true);
    setEditId(post.id);
  };

  const handleAddComment = (postId, comment) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      })
    );
  };

  const handleEditComment = (postId, commentId, updatedComment) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) =>
              comment.id === commentId
                ? { ...comment, text: updatedComment }
                : comment
            ),
          };
        }
        return post;
      })
    );
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.id !== commentId
            ),
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="App">
      <h1>♥ Chat Blog ♥</h1>
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
        handleAddComment={handleAddComment}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
      />
    </div>
  );
}

export default App;
