import React from "react";
import Form from "./Components/Form";
import MessageStack from "./Components/MessageStack";

function App() {
  return (
    <div className="py-5">
      <h1 className="text-center text-xl pb-2">Message Board</h1>
      <Form />
      <MessageStack />
    </div>
  );
}

export default App;
