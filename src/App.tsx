import React, { useState } from "react";
import Form from "./Components/Form";
import MessageStack from "./Components/MessageStack";
import Login from "./Components/Login";
import UserManagement from "./Components/UserManagement";

const App = () => {
  const [username, setUsername] = useState("Anonymous");
  const [isBlurred, setIsBlurred] = useState(false);

  const changeUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  const handleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  const handleLogOut = () => {
    setUsername("Anonymous");
  };

  return (
    <div className="py-5">
      {username !== "Anonymous" ? (
        <UserManagement username={username} logOut={handleLogOut} />
      ) : (
        <Login
          setUsername={changeUsername}
          setBlur={handleBlur}
          isBlurred={isBlurred}
        />
      )}
      <h1 className="text-center text-xl pb-2">Message Board</h1>
      <Form username={username} />
      <MessageStack username={username} />
    </div>
  );
};

export default App;
