function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function postReducer(state, action) {
  switch (action.type) {
    case "CREATE_POST":
      const newPost = {
        title: action.title,
        content: action.content,
        author: action.author,
        dateCreated: action.dateCreated,
        dateCompleted: "",
        completed: "False",
      };
      return [newPost, ...state];
    case "FETCH_POSTS":
      return action.posts;
    case "TOGGLE_TODO":
      console.log("Toggle");
      const current = new Date();
      var currentDate = `${current.getDate()}/${current.getMonth() +
        1}/${current.getFullYear()}`;
      state = state.map((x) => {
        if (x.title === action.title) {
          x.completed = action.completed;
          if (action.completed === "True") {
            x.dateCompleted = currentDate;
          } else {
            x.dateCompleted = "";
          }
        }
        return x;
      });
      return state;
    case "DELETE_TODO":
      return action.posts;
    default:
      return state;
  }
}
export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    posts: postReducer(state.posts, action),
  };
}
