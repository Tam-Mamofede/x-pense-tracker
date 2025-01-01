import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import { NavLink } from "react-router-dom";
import Budget from "../components/Budget";
import Expense from "../components/Expense";
import { useExpense } from "../Contexts/ExpenseContext";
import { useBudget } from "../Contexts/BudgetContext";
import BudgetChart from "../components/BudgetGraph";
import Navigation from "../components/Navigation";
import CreateBudget from "../components/CreateBudget";

function Dashboard() {
  const { selectedMonth } = useAuth();
  const { handleChangeMonth, categories, popupOpen, setPopupOpen } =
    useBudget();
  const { showExpense } = useExpense();

  const handleShowPopup = () => setPopupOpen(!popupOpen);
  const buttonStyles =
    "w-fit rounded-xl bg-[#e3f0af] px-4 py-2 text-center font-semibold text-[#1f4529] shadow-md";

  return (
    <div className="scrollable-container relative flex flex-col overflow-hidden bg-[#fffcf9] pb-8">
      <Navigation />

      <div className="flex flex-col items-center">
        {selectedMonth ? (
          <>
            <BudgetChart />
            <Budget />

            <div className="mt-6 flex flex-col items-center space-y-4">
              {categories.length <= 0 ? (
                <NavLink to="/create-budget">
                  <button className={buttonStyles}>Create a budget</button>
                </NavLink>
              ) : (
                <button onClick={handleShowPopup} className={buttonStyles}>
                  {popupOpen === false ? "Add more" : "Close"}
                </button>
              )}
              <button onClick={handleChangeMonth} className={buttonStyles}>
                Change month
              </button>
            </div>
            <div>{popupOpen && <CreateBudget />}</div>
          </>
        ) : (
          <>
            <p>
              Start you budgeting journey.
              <NavLink to="/create-budget"> Click here!</NavLink>{" "}
              <button onClick={handleChangeMonth} className={buttonStyles}>
                change month
              </button>
            </p>
          </>
        )}
        <> {showExpense == true && <Expense />}</>
      </div>
    </div>
  );
}
export default Dashboard;
