import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [message, setMessage] = useState("");

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!message || message.length > 128) {
      alert("Please enter a non-empty message at most 128 characters long.");
      return;
    }
  };

  return (
    <div className="h-10">
      <input
        className="w-[500px] h-full shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="messageInput"
        value={message}
        onChange={handleInputChange}
      />
      <button
        className="w-[60px] h-full mx-2 text-sm bg-gray-200 hover:bg-gray-400 text-black rounded"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
}

export default Form;
