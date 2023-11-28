function Message(props: { time: string; text: string }) {
  return (
    <div className="border w-[580px] shadow rounded-md p-2 hover:border-gray-400">
      <p className="break-words text-lg text-gray-900">{props.text}</p>
      <p className="text-xs text-gray-700">{props.time}</p>
    </div>
  );
}

export default Message;
