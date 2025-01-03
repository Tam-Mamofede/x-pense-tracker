import React from "react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import { useAuth } from "../Contexts/AuthContext";
import Loader from "../components/Loader";

function Homepage() {
  const { openLogin, isLoading } = useAuth();

  return (
    <div>
      {isLoading ? <Loader /> : null}
      {openLogin ? <Login /> : <SignUp />}

      <div className="relative flex h-screen flex-col items-center overflow-hidden bg-[#fffcf9]">
        <div className="mt-0 flex h-2/3 w-full items-start justify-center">
          <img
            src="../../assets/logo-name-dk.png"
            alt="x-pense tracker logo"
            className="mt-12 max-w-44"
          />
        </div>

        {/* Skewed section */}
        <div className="flex h-2/3 w-full flex-grow -skew-y-12 bg-[#1f4529]">
          <div className="flex flex-grow skew-y-12 items-end justify-end">
            <h1 className="relative bottom-64 right-5 skew-y-0 transform text-right text-2xl font-medium text-[#fffcf9] lg:bottom-80 lg:right-10 lg:mb-2 lg:text-4xl">
              Help your wallet
              <br />
              <span className="font-black"> stick to the plan!</span>
            </h1>
            <img
              src="../.../public/assets/3d-img.png"
              alt="Another decorative element"
              className="absolute -bottom-11 -right-5 m-0 max-h-72 min-h-44 min-w-44 max-w-80 lg:bottom-1 lg:right-10 lg:h-[850px] lg:w-[750px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
