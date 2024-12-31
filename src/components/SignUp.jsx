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
    openInputs,
    setOpenSignup,
  } = useAuth();

  const handleOpenLogin = () => {
    setOpenLogin(true);
    setOpenSignup(false);
  };

  return (
    <div
      className={classNames(
        "fixed inset-x-0 top-80 z-50 flex max-h-fit items-center justify-center lg:inset-x-1/4 lg:top-96 lg:w-2/4",
        {
          "bg-gray-800 bg-opacity-50 backdrop-blur-sm": blurBg,
        },
      )}
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

        <div className="relative z-20 h-fit w-full space-y-8 rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex flex-col space-y-2">
            <label>Enter your name</label>
            <input
              type="text"
              value={userName}
              onChange={handleSetName}
              className="rounded-xl border px-1 py-1"
            />
            {openInputs && (
              <>
                <div className="flex flex-col space-y-2">
                  <label>Enter your email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl border px-1 py-1"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label>Enter your password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl border px-1 py-1"
                  />
                </div>

                <div className="flex flex-row justify-between">
                  <button
                    onClick={createAccount}
                    className="w-fit rounded-2xl bg-[#1f4529] px-4 py-2 text-center text-[#e3f0af]"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={createAccountWithGoogle}
                    className="w-fit rounded-2xl bg-[#e3f0af] px-4 py-2 text-center"
                  >
                    Google
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
