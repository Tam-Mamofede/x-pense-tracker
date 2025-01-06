import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useBudget } from "../Contexts/BudgetContext";

function Navigation() {
  const { logOut, darkmode, handleToggleDarkmode } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { handleChangeMonth } = useBudget();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-10 shadow-md">
      <nav
        className={`flex items-center justify-between px-10 py-2 ${darkmode ? "bg-[#1a3521] text-[#1f4529]" : "bg-[#fffcf9]"}`}
      >
        {darkmode ? (
          <img src="../../assets/logo-lt.png" className="h-14 w-14" />
        ) : (
          <img src="../../assets/logo-dk.png" className="h-14 w-14" />
        )}

        {darkmode ? (
          <img
            src="../../assets/sun.png"
            alt="dark-light mode icon"
            className="h-8 w-8"
            onClick={handleToggleDarkmode}
          />
        ) : (
          <img
            src="../../assets/moon.png"
            alt="dark-light mode icon"
            className="h-8 w-8"
            onClick={handleToggleDarkmode}
          />
        )}

        {/* Hamburger Menu */}
        <button
          className="focus:outline-none sm:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {darkmode ? (
            <img src="../../assets/hamburger-lt.png" className="h-12 w-12" />
          ) : (
            <img src="../../assets/hamburger-dk.png" className="h-12 w-12" />
          )}
        </button>

        {/* Menu Items */}
        <div
          className={`absolute right-0 top-[75px] z-10 flex h-fit w-2/5 flex-col space-y-6 rounded-md bg-[#e3f0af] py-4 pr-8 text-right shadow-lg transition-all duration-300 md:w-1/5 md:flex-row md:space-x-6 md:bg-transparent md:pr-0 md:shadow-transparent lg:w-1/5 lg:flex-row lg:space-x-6 lg:bg-transparent lg:pr-0 lg:shadow-transparent ${
            isOpen ? "opacity-90" : "pointer-events-none opacity-0"
          } sm:pointer-events-auto sm:static sm:flex-row sm:space-x-4 sm:space-y-0 sm:opacity-100`}
        >
          <p
            className={`hover:cursor-pointer hover:underline ${darkmode && "text-[#1f4529] lg:text-[#e3f0af]"}`}
            onClick={handleChangeMonth}
          >
            Create new budget
          </p>

          <p
            onClick={logOut}
            className={`hover:cursor-pointer hover:underline ${darkmode && "text-[#1f4529] lg:text-[#e3f0af]"}`}
          >
            Log out
          </p>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
