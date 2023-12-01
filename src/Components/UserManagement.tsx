import React from "react";

interface Props {
  username: string;
  logOut: () => void;
}

const UserManagement = (props: Props) => {
  const handleLogOut = (e: React.MouseEvent) => {
    e.preventDefault();
    props.logOut();
  };
  return (
    <div className="max-h-0 flex justify-end">
      <button disabled={true} className="h-[30px] px-2 rounded-md bg-gray-200">
        {props.username}
      </button>
      <button
        onClick={handleLogOut}
        className="mr-5 ml-2 w-[80px] h-[30px] text-sm bg-red-400 hover:bg-red-600 text-white rounded-md"
      >
        Log Out
      </button>
    </div>
  );
};

export default UserManagement;
