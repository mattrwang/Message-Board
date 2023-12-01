import React, { useState, KeyboardEvent, useEffect } from "react";
import supabase from "../supabase";
import { compareSync } from "bcrypt-ts";

interface Props {
  toggle: () => void;
  setUsername: (username: string) => void;
}

interface UserInfo {
  username: string;
  password: string;
}

const LoginScreen = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const { data } = await supabase.from("users").select();
    setUsers(data ? data : []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkUserExists(username) !== -1) {
      if (compareSync(password, users[checkUserExists(username)].password)) {
        props.toggle();
        props.setUsername(username);
      } else {
        alert("Incorrect password.");
      }
    } else {
      alert("User does not exist.");
    }
  };

  const checkUserExists = (username: string) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        return i;
      }
    }
    return -1;
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    props.toggle();
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="shadow-2xl absolute mt-[30px] rounded-md h-[400px] w-[400px] bg-gray-200 z-1">
      <form onKeyDown={handleKeyPress} className="flex flex-col items-center">
        <label className="mt-[15px] text-xl">Log in to Message Board!</label>
        <div className="max-h-1">
          <input
            placeholder="Username"
            value={username}
            id="username"
            onChange={handleUsernameChange}
            className="mt-[20px] w-[200px] h-[40px] shadow text-sm appearance-none focus:border-blue-400 focus:border-2 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="max-h-1 mt-[30px]">
          <input
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            id="password"
            type="password"
            className="mt-[40px] w-[200px] h-[40px] shadow text-sm appearance-none focus:border-blue-400 focus:border-2 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-[230px]">
          <button
            onClick={handleCancel}
            className="mt-[40px] mr-[40px] w-[80px] h-[30px] text-sm bg-red-400 hover:bg-red-600 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-[80px] h-[30px] text-sm bg-blue-400 hover:bg-blue-600 text-white rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
