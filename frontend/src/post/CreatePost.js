import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../context";

export default function CreatePost() {
  const current = new Date();
  const dateCreated = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [error, setError] = useState(false);
  const isCompleted = false;
  const dateCompleted = "";

  const [post, createPost] = useResource(({ title, content, author, dateCreated, isCompleted, dateCompleted }) => ({
    url: "/posts",
    method: "post",
    data: { title, content, author, dateCreated, isCompleted, dateCompleted},
  }));

  const [posts, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get",
  }));

  useEffect(getPosts, []);

  useEffect(() => {
    if (posts && posts.data) {
        dispatch({ type: 'FETCH_POSTS', posts: posts.data })
    }    
  }, [posts]);

  // ensure the newly created post didn't return an error, handle if it did
  useEffect(() => {
    if (post?.isLoading === false && post?.data) {
      dispatch({
        type: "CREATE_POST",
        title: post.data.title,
        content: post.data.content,
        author: post.data.author,
        id: post.data.id,
      });
    }
    getPosts();
  }, [post]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost({title, content, author: user, dateCreated , isCompleted, dateCompleted});
      }}
    >
      <div>
        Author: <b>{user}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <textarea
        value={content}
        required
        onChange={(event) => setContent(event.target.value)}
      />
      <input type="submit" value="Create" />
    </form>
  );
}
