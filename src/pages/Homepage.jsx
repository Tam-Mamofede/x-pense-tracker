import React from "react";
import { NavLink } from "react-router-dom";

function Homepage() {
  return (
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
        <h1 className="bottom-15 absolute right-10 skew-y-0 transform">
          Help your wallet
          <span className="font-extrabold"> stick to the plan!</span>
        </h1>

        <div className="flex flex-grow skew-y-12 items-end justify-end">
          <img
            src="../../assets/3d-img.png"
            alt="Another decorative element"
            className="absolute -bottom-5 -right-5 m-0 max-h-80 min-h-44 min-w-44 max-w-80"
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
