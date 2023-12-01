import { useEffect, useState } from "react";
import supabase from "../supabase";
import Message from "./Message";

interface MessageInfo {
  id: number;
  text: string;
  time: string;
  user: string;
}

interface Props {
  username: string;
}

const MessageStack = (props: Props) => {
  const [messages, setMessages] = useState<MessageInfo[]>([]);

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

  const getMessages = async () => {
    const { data } = await supabase.from("messages").select();
    setMessages(data ? data.sort((a, b) => b.id - a.id) : []);
  };

  return (
    <ul className="flex flex-col items-center mt-5">
      {messages.map((message) => (
        <li className="mb-3" key={message.text}>
          <Message
            id={message.id}
            time={message.time}
            text={message.text}
            user={message.user}
            username={props.username}
          />
        </li>
      ))}
    </ul>
  );
};

export default MessageStack;
