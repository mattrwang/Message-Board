import { useEffect, useState } from "react";
import supabase from "../supabase";
import Message from "./Message";

function MessageStack() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          getMessages();
        }
      )
      .subscribe();
  }, []);

  async function getMessages() {
    const { data } = await supabase.from("messages").select();
    setMessages(data.reverse());
  }

  return (
    <ul className="flex flex-col items-center mt-5">
      {messages.map((message) => (
        <li className="mb-3" key={message.text}>
          <Message time={message.time} text={message.text} />
        </li>
      ))}
    </ul>
  );
}

export default MessageStack;
