import React from "react";
import supabase from "../supabase";

interface Props {
  id: number;
  time: string;
  text: string;
  user: string;
  username: string;
}

const Message = (props: Props) => {
  const handleDelete = async () => {
    const { error } = await supabase
      .from("messages")
      .delete()
      .match({ id: props.id });

    if (error) {
      console.error("Error deleting data:", error.message);
    }
  };

  return (
    <div className="border w-[580px] shadow rounded-md p-2 hover:border-gray-400">
      <p className="break-words text-lg text-gray-900">{props.text}</p>
      <div className="flex">
        <p className="text-xs mt-1 text-gray-500">
          {props.user} at {props.time}
        </p>
        {props.user !== "Anonymous" && props.username === props.user ? (
          <div>
            <button
              onClick={handleDelete}
              className="ml-[335px] text-center text-xs h-[17px] w-[18px] rounded-md bg-red-400 text-white hover:bg-red-600"
            >
              X
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Message;
