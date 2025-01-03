import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useBudget } from "../Contexts/BudgetContext";

function Navigation() {
  const { logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { handleChangeMonth } = useBudget();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-10 shadow-md">
      <nav className="flex items-center justify-between bg-[#fffcf9] px-10 py-2 text-white">
        <img src="../../assets/logo-dk.png" className="h-14 w-14" />

        {/* Hamburger Menu */}
        <button
          className="focus:outline-none sm:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <img src="../../assets/hamburger-dk.png" className="h-12 w-12" />
        </button>

        {/* Menu Items */}
        <div
          className={`absolute right-0 top-[75px] z-10 flex h-fit w-2/5 flex-col space-y-6 rounded-md bg-[#e3f0af] py-4 pr-8 text-right text-[#1f4529] shadow-lg transition-all duration-300 md:w-1/5 md:flex-row md:space-x-6 md:bg-transparent md:pr-0 md:shadow-transparent lg:w-1/5 lg:flex-row lg:space-x-6 lg:bg-transparent lg:pr-0 lg:shadow-transparent ${
            isOpen ? "opacity-90" : "pointer-events-none opacity-0"
          } sm:pointer-events-auto sm:static sm:flex-row sm:space-x-4 sm:space-y-0 sm:opacity-100`}
        >
          <p
            className="hover:cursor-pointer hover:underline"
            onClick={handleChangeMonth}
          >
            Create new budget
          </p>

          <p onClick={logOut} className="hover:cursor-pointer hover:underline">
            Log out
          </p>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
