import React, { useState, KeyboardEvent } from "react";
import supabase from "../supabase";

interface Props {
  toggle: () => void;
  setUsername: (username: string) => void;
}

const SignUpScreen = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("users").insert({
      username: username,
      password: password,
    });
    if (error) {
      console.error("Error inserting data:", error.message);
      alert("Username already taken.");
    } else {
      props.toggle();
      props.setUsername(username);
    }
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
    if (e.target.value.length > 16 || !/^[a-zA-Z]+$/.test(e.target.value)) {
      setUserError(true);
      setDisabled(true);
    } else {
      setUserError(false);
      setDisabled(false);
    }
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.length < 8 ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(e.target.value)
    ) {
      setPassError(true);
      setDisabled(true);
    } else {
      setPassError(false);
      setDisabled(false);
    }
    setPassword(e.target.value);
  };

  return (
    <div className="absolute mt-[30px] rounded-md h-[400px] w-[400px] bg-gray-200 z-1">
      <form onKeyDown={handleKeyPress} className="flex flex-col items-center">
        <label className="mt-[15px] text-xl">Sign up for Message Board!</label>
        <div className="max-h-1">
          <input
            placeholder="Username"
            value={username}
            id="username"
            onChange={handleUsernameChange}
            className="mt-[20px] w-[200px] h-[40px] shadow text-sm appearance-none focus:border-blue-400 focus:border-2 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ul className="ml-[5px] text-xs mt-1">
            <li>- At most 16 characters long</li>
            <li>- Only alphabetical letters</li>
          </ul>
        </div>
        <div className="max-h-1 mt-[60px]">
          <input
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            id="password"
            type="password"
            className="mt-[40px] w-[200px] h-[40px] shadow text-sm appearance-none focus:border-blue-400 focus:border-2 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ul className="ml-[5px] text-xs mt-1">
            <ul>- At least 8 characters</ul>
            <ul>- At least one special character</ul>
          </ul>
        </div>

        <div className="mt-[170px]">
          {userError ? (
            <p className="max-h-0 text-red-600">Invalid username</p>
          ) : null}
          {passError ? (
            <p className="max-h-0 mt-[30px] text-red-600">Invalid password</p>
          ) : (
            <div className="mt-[30px]"></div>
          )}
          <button
            onClick={handleCancel}
            className="mt-[40px] mr-[40px] w-[80px] h-[30px] text-sm bg-red-400 hover:bg-red-600 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className="w-[80px] h-[30px] text-sm bg-blue-400 hover:bg-blue-600 text-white rounded-md"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpScreen;
