import React, { useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../context";
import Post from "./Post";

export default function PostList() {
  const { state } = useContext(StateContext);
  const { user } = state;
  const { posts } = state;
  return (
    <div>
      <div>
        {posts.map(
          (p, i) => user === p.author && <Post {...p} key={"post-" + i} />
        )}
      </div>
    </div>
  );
}
