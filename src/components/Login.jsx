import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import classNames from "classnames";

function Login() {
  const {
    createAccountWithGoogle,
    logIn,
    logInEmail,
    setLogInEmail,
    logInPassword,
    setLogInPassword,
    setOpenSignUp,
    blurBg,
    setBlurBg,
    setOpenLogin,
  } = useAuth();

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
    setBlurBg(true);
    setOpenLogin(false);
  };

  return (
    <div
      className={classNames(
        "fixed inset-x-0 top-52 z-50 flex max-h-fit justify-center lg:inset-x-1/4 lg:top-64 lg:w-2/4",
        {
          "bg-gray-800 bg-opacity-50 backdrop-blur-sm": blurBg,
        },
      )}
      onClick={() => {
        setBlurBg(false);
      }}
    >
      <div className="absolute z-10 mb-[168px] h-[90px] w-3/4 rounded-lg bg-[#e3f0af] shadow-md">
        <div className="mb-2 mt-5 flex flex-row space-x-10 pl-8">
          <h1
            className="text-lg font-semibold text-[#1f4529] opacity-20 hover:cursor-pointer"
            onClick={handleOpenSignUp}
          >
            Sign up
          </h1>
          <h1 className="text-lg font-semibold text-[#1f4529]">Log in</h1>
        </div>

        <div className="relative z-20 flex h-fit w-full flex-col space-y-4 rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex flex-col space-y-2">
            <label>Enter your email</label>
            <input
              type="text"
              value={logInEmail}
              onChange={(e) => setLogInEmail(e.target.value)}
              className="rounded-xl border px-1 py-1"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>Enter your password</label>
            <input
              type="password"
              value={logInPassword}
              onChange={(e) => setLogInPassword(e.target.value)}
              className="rounded-xl border px-1 py-1"
            />
          </div>
          <div className="flex flex-row justify-between">
            <button
              onClick={logIn}
              className="rounded-2xl bg-[#1f4529] px-4 py-2 text-center text-[#e3f0af]"
            >
              Log in
            </button>
            <button
              onClick={createAccountWithGoogle}
              className="rounded-2xl bg-[#e3f0af] px-4 py-2 text-center"
            >
              Log in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
