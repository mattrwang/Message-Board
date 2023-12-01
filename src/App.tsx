import React, { useState } from "react";
import Form from "./Components/Form";
import MessageStack from "./Components/MessageStack";
import Login from "./Components/Login";

const App = () => {
  const [username, setUsername] = useState("Anonymous");
  const [isBlurred, setIsBlurred] = useState(false);

  const changeUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  const handleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  return (
    <div className="py-5">
      {username !== "Anonymous" ? (
        <p>{username}</p>
      ) : (
        <Login setUsername={changeUsername} setBlur={handleBlur} />
      )}
      <h1 className="text-center text-xl pb-2">Message Board</h1>
      <Form />
      <MessageStack />
    </div>
  );
};

export default App;
