import React, { useContext, useEffect, useState } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../context";

export default function Post({
  id,
  title,
  content,
  author,
  dateCreated,
  isCompleted,
  dateCompleted
}) {

  const { dispatch } = useContext(StateContext);

  const current = new Date();
  const currentDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
 
  const [deleted, deletePost] = useResource(() => ({
    url: "/posts/"+id,
    method: "delete"
  }));

  const [posts, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get",
  }));

  useEffect(() => {
    if (posts && posts.data) {
        dispatch({ type: 'FETCH_POSTS', posts: posts.data })
    }    
  }, [posts]);

  const [post, togglePost] = useResource((author, title, content, isCompleted, dateCreated, dateCompleted) => ({
    url: "/posts/"+id,
    method: "put",
    data: { author, title, content, isCompleted, dateCreated, dateCompleted },
  }));

  useEffect(() => {
    getPosts();
  },[post,deleted]);

  const handleChange = (checked) => {
    console.log(checked);
    isCompleted = checked;
    dateCompleted = checked ? currentDate : "";
    togglePost(author, title, content, isCompleted, dateCreated, dateCompleted);
    //getPosts();
    console.log("Reprint "+post);
    dispatch({
      type: "TOGGLE_TODO",
      title,
      content,
      author: author,
      dateCreated,
      dateCompleted,
    });
  };


  // const deletePost = (e) => {
  //   console.log("Delete post");
  //   e.preventDefault();
  //   dispatch({
  //     type: "DELETE_TODO",
  //     title,
  //     content,
  //     author: author,
  //   });
  // };

  return (
    <div className="container" style={{ marginBottom: "40px" }}>
      <div className="row">
        <div className="col">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(event) => handleChange(event.target.checked)}
          />
        </div>
        <div className="col">
          <h3>{title}</h3>
        </div>
      </div>
      <div className="row">
        <i>
          Description <b>{content}</b>
        </i>
      </div>
      <i>
        Written by <b>{author}</b>
      </i>
      <br></br>
      <i>
        Date Created <b>{dateCreated}</b>
      </i>
      <br></br>
      <i>
        Completed <b>{isCompleted ? "True" : "false"}</b>
      </i>
      <br></br>
      <i>
        Date Completion<b>{dateCompleted}</b>
      </i>
      <div>
        <input
          type="submit"
          value="Delete"
          onClick={(event) => deletePost(id)}
        />
      </div>
    </div>
  );
}
