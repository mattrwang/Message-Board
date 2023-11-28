import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import supabase from "../supabase";

function Form() {
  const [message, setMessage] = useState("");
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hoursConverted = hours > 12 ? hours - 12 : hours;
  const minutesText = minutes < 10 ? "0" + minutes : minutes;
  const secondsText = seconds < 10 ? "0" + seconds : seconds;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || message.length > 128) {
      alert("Please enter a non-empty message at most 128 characters long.");
      return;
    }

    const { error } = await supabase.from("messages").insert({
      text: message,
      time: `${month}/${day}/${
        year % 2000
      } ${hoursConverted}:${minutesText}:${secondsText} ${ampm}`,
    });

    if (error) {
      console.error("Error inserting data:", error.message);
    }
    setMessage("");
  };

  return (
    <div className="flex justify-center h-10 w-auto">
      <input
        autoFocus={true}
        placeholder="Enter a message"
        className="max-w-lg h-full shadow text-sm appearance-none focus:border-blue-400 focus:border-2 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="messageInput"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button
        className="w-[60px] h-full ml-2 text-sm bg-gray-200 hover:bg-gray-400 text-gray-700 rounded-md"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
}

export default Form;
