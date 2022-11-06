import React, { useEffect, useState } from "react";
import { useResource } from "react-request-hook";

export default function Login({ dispatch }) {
  const [username, setUsername] = useState("");
  const [ loginFailed, setLoginFailed ] = useState(false);
  const [ password, setPassword ] = useState('');
  
  function handlePassword (evt) {
    setPassword(evt.target.value);
}

const [user, login] = useResource((username, password) => ({
  url: "/login",
  method: "post",
  data: { email:username, password },
}));

function handlePassword(evt) {
  setPassword(evt.target.value);
}

//   function handleUsername(evt) {
//     setUsername(evt.target.value);
//   }

useEffect(() => {
  if (user?.data?.user) {
    setLoginFailed(false);
    dispatch({ type: "LOGIN", username: user.data.user.email });
  }

  if (user?.error) {
    console.log(user?.error);
    setLoginFailed(true);
  }
}, [user]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login(username, password);
      }}
    >
      <label htmlFor="login-username">Username:</label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        name="login-username"
        id="login-username"
      />
      <label htmlFor="login-password">Password:</label>
      <input type="password"
          value={password}
          onChange={handlePassword} name="login-password" id="login-password" />
      <input type="submit" value="Login" disabled={username.length === 0} />
    </form>
  );
}
