import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import classNames from "classnames";

function SignUp() {
  const {
    userName,
    setEmail,
    email,
    password,
    setPassword,
    createAccount,
    createAccountWithGoogle,
    handleSetName,
    setOpenLogin,
    blurBg,
    setBlurBg,
    openInputs,
    setOpenInputs,
    setUserName,
  } = useAuth();

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  return (
    <div
      className={classNames(
        "fixed inset-0 z-50 flex max-h-fit items-center justify-center",
        {
          "bg-gray-800 bg-opacity-50 backdrop-blur-sm": blurBg,
        },
      )}
      onClick={() => {
        setBlurBg(false);
        setOpenInputs(false);
        setUserName("");
      }}
    >
      <div className="absolute z-10 mb-[168px] h-[90px] w-3/4 rounded-lg bg-[#e3f0af] shadow-md">
        <div className="mb-2 mt-5 flex flex-row space-x-10 pl-8">
          <h1 className="text-lg font-semibold text-[#1f4529]">Sign up</h1>
          <h1
            className="text-lg font-semibold text-[#1f4529] opacity-20 hover:cursor-pointer"
            onClick={handleOpenLogin}
          >
            Log in
          </h1>
        </div>

        <div className="relative z-20 h-fit w-full space-y-1 rounded-2xl bg-white p-6 shadow-lg">
          <input
            type="text"
            value={userName}
            placeholder="What is your name?"
            onChange={handleSetName}
          />
          {openInputs && (
            <>
              <label>Enter your email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Enter your password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={createAccount}>Sign up</button>
              <button onClick={createAccountWithGoogle}>Google</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
