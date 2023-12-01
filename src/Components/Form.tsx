import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import supabase from "../supabase";

const Form = () => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [tooLong, setTooLong] = useState(false);

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
    if (e.target.value.length > 128) {
      setTooLong(true);
      setDisabled(true);
    } else if (e.target.value.length === 0) {
      setDisabled(true);
      setTooLong(false);
    } else {
      setDisabled(false);
      setTooLong(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("messages").insert({
      text: message,
      time: `${hoursConverted}:${minutesText}:${secondsText} ${ampm} on ${month}/${day}/${
        year % 2000
      } `,
    });

    if (error) {
      console.error("Error inserting data:", error.message);
    }
    setMessage("");
  };

  return (
    <div className="flex flex-col text-center">
      <form
        className="flex justify-center h-10 w-auto"
        onSubmit={handleSubmit}
        onKeyDown={handleKeyPress}
      >
        <input
          autoFocus={true}
          placeholder="Enter a message"
          className="max-w-lg h-full shadow text-sm appearance-none focus:border-blue-400 focus:border-2 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="messageInput"
          value={message}
          onChange={handleInputChange}
        />
        <button
          className="w-[60px] h-full ml-2 text-sm bg-gray-200 hover:bg-gray-400 text-gray-700 rounded-md"
          type="submit"
          disabled={disabled}
        >
          Send
        </button>
      </form>
      <div className="mt-1">
        {tooLong ? (
          <p className="text-xs text-red-500 ml-2">
            Message too long (max 128 characters)
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Form;
