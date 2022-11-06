import React from "react";
import { useEffect, useState, useReducer } from "react";

import UserBar from "./user/UserBar";
import PostList from "./post/PostList";
import CreatePost from "./post/CreatePost";

import appReducer from "./reducers";
import { StateContext } from "./context";
import { useResource } from "react-request-hook";

function App() {
  //var initialPosts = [];
  var [initialPosts ,setInitialPosts] = useState([]);

  // Don't manage global state like this in a real app
  // const [globalState, updateGlobalState] = useState({
  //   user: "",
  //   posts: [],
  //   comments: []
  // })
  // updateGlobalState({ ...globalState, user: "Shashank" })

  //const [user, setUser] = useState("");
  //const [user, dispatchUser] = useReducer(userReducer, "");

  //const [posts, setPosts] = useState(initialPosts);
  //const [posts, dispatchPosts] = useReducer(postReducer, initialPosts);

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: initialPosts,
  });

  const { user } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user}’s Blog`;
    } else {
      document.title = "Blog";
    }
  }, [user]);

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

  // useEffect(() => {
  //   setInitialPosts(posts.data);
  // });

  // useEffect(() => {
  //   setInitialPosts(posts);
  //   console.log("Initial post "+ posts);
  // });

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <React.Suspense fallback={"Loading..."}>
          <UserBar user={state.user} dispatch={dispatch} />
        </React.Suspense>
        {state.user && <PostList />}
        {state.user && <CreatePost />}
      </StateContext.Provider>
    </div>
  );
}

export default App;
