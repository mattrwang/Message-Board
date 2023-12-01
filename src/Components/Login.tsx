import React, { useState } from "react";
import SignUpScreen from "./SignUpScreen";

interface Props {
  setUsername: (username: string) => void;
  setBlur: (isBlurred: boolean) => void;
}

const Login = (props: Props) => {
  const [visibleSignUp, setVisibleSignUp] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);

  const toggleSignUp = () => {
    setVisibleSignUp(!visibleSignUp);
    props.setBlur(!visibleSignUp);
  };

  const toggleLogin = () => {
    setVisibleLogin(!visibleLogin);
  };

  const setUsername = (username: string) => {
    props.setUsername(username);
  };

  return (
    <div>
      <div className="max-h-0 flex justify-end mr-5">
        <button
          onClick={toggleSignUp}
          className="w-[80px] h-[30px] ml-2 text-sm bg-gray-200 hover:bg-gray-400 text-gray-700 rounded-md"
        >
          Sign Up
        </button>
        <button
          onClick={toggleLogin}
          className="w-[80px] h-[30px] ml-2 text-sm bg-blue-400 hover:bg-blue-600 text-white rounded-md"
        >
          Login
        </button>
      </div>
      {/* make sure both cant be open at the same time */}
      {visibleSignUp ? (
        <div className="flex justify-center">
          <SignUpScreen toggle={toggleSignUp} setUsername={setUsername} />
        </div>
      ) : null}
      {visibleLogin ? <div></div> : null}
    </div>
  );
};

export default Login;
